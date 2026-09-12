# 測試

$mol 的視圖是它自身狀態的函式，這也改變了測試的樣子。一個用戶場景就寫成對視圖自己方法的呼叫：設定草稿、執行動作、讀取用戶會看到的東西。

```typescript
app.draft( 'Milk' )
app.add()
$mol_assert_equal( app.item_title( 0 ), 'Milk' )
```

沒有選擇器，沒有瀏覽器，沒有 Playwright 或 Cypress，也不用等待任何東西。同一個檔案還給你：

- **速度。** 測試在 Node 裏以毫秒計地跑完；一千個大約一分鐘。`node my/hello/-/node.test.js` 跑的是某個模組的那些測試。
- **零設定。** 元件旁邊的 `hello.test.ts` 會被建構器收錄，編譯進 `-/node.test.js`。用 `mam_build` 做持續整合時會執行它，測試失敗就讓建置失敗。
- **透過上下文替換服務。** 每個測試都拿到自己的 `$`，元件經由 `this.$.X` 取到的一切，都可以透過往那個 `$` 上指派一個測試替身來換掉。這正是要寫 `this.$.$mol_fetch` 而不是 `$mol_fetch` 的理由：前者可替換，後者不可。
- **被模擬的時間。** 經由上下文建立的計時器不會自己走動；`$mol_after_mock_warp()` 會把排隊的東西跑掉。
- **需要時有真實的 DOM。** Node 的打包結果自帶 jsdom，所以 `dom_node()` 和 `querySelectorAll` 在同一個測試檔案裏就能用。

## 用視圖方法走一遍場景

拿[食譜](#!section=docs/page=cookbook)裏的待辦清單來說：一個 `draft?` 字串、一個 `items` 清單、一個 `add` 動作和一個 `delete` 動作。它的測試住在 `my/todo/todo.test.ts`：

```typescript
namespace $ {
	$mol_test({

		'add an item and delete it'( $ ) {
			const app = $my_todo.make({ $ })

			app.draft( 'Milk' )
			app.add()
			$mol_assert_equal( app.items().length, 1 )
			$mol_assert_equal( app.item_title( 0 ), 'Milk' )
			$mol_assert_equal( app.draft(), '' )

			app.delete( 0 )
			$mol_assert_like( app.item_rows(), [] )
		},

		'blank draft adds nothing'( $ ) {
			const app = $my_todo.make({ $ })

			app.draft( '   ' )
			app.add()
			$mol_assert_like( app.items(), [] )
		},

	})
}
```

有幾點值得注意：

- 測試檔案用的是 `namespace $`，不是 `$.$$`。上下文 `$` 作為參數傳進來，每個測試都是全新的；元件用 `Klass.make({ $ })` 建立，於是它從那個上下文裏讀取服務。
- 一次點擊就是一次對處理器的呼叫。`app.add()` 就是按鈕所做的事；當你想把繫結也一併走一遍時，`app.Add().click( event )` 走的是同一條路徑。
- 斷言用戶看到的東西：`items()`、`item_rows()`、`sub()`、某個子視圖的 `title()`。透過畫面來檢查模型，還能順帶抓住從類別裏掉出去的覆寫，而只測模型是抓不到的。
- `$mol_assert_equal` 按同一性比較，`$mol_assert_like` 比較結構，`$mol_assert_fail( ()=> ..., 'message' )` 期待一次拋出。
- 測試的名字就是描述。函式體裏沒有註解。

## 模擬一個服務

每個測試都會收到一個從全域上下文衍生出來的全新上下文。在建立元件之前，往那個 `$` 上的某個服務指派一個子類別，元件內部的每一處 `this.$.X` 就都會解析到這個替身。下面是給[資料獲取](#!section=docs/page=data)裏的 `$my_users` 元件寫的 fetch 替身：

```typescript
namespace $ {
	$mol_test({

		'user names come from the response'( $ ) {
			$.$mol_fetch = class extends $.$mol_fetch {
				static override json( input: RequestInfo ) {
					if( String( input ).endsWith( '/users' ) ) return [ { id: 1, name: 'Ada' } ]
					return $mol_fail( new Error( 'Unexpected request: ' + input ) )
				}
			}
			const app = $my_users.make({ $ })
			$mol_assert_like( app.user_names(), [ 'Ada' ] )
		},

	})
}
```

元件裏的 `users()` 呼叫的是 `this.$.$mol_fetch.json( ... )`，於是請求走到了這個 mock，而值是同步就能拿到的，不需要任何等待。假如元件呼叫的是全域上的 `$mol_fetch.json( ... )`，這個 mock 就不會被問到。內建的 mock 已經把上下文上的全域 `fetch` 和 `XMLHttpRequest` 換成了會拋例外的代理，所以一個繞過上下文的請求會響亮地失敗，而不是真的碰到網絡。

同一套做法也適用於管 URL 的 `$mol_state_arg`、管儲存的 `$mol_state_local`，以及你的元件從 `this.$` 裏取的任何其他東西。

還有 `$mol_test_mocks`，它是一份函式清單，會在打包結果裏每個測試之前對上下文執行一遍，其中也包括別的模組的測試。它是放那些處處成立的規則的地方，框架註冊自己的 mock 就是這麼做的：一個把交給它的東西都存下來的儲存替身、一個回傳空字典的語言環境，以及上面那條網絡禁令。某一個元件的測試資料不屬於那裏。

## 時間

框架自己的測試為 `$mol_after_timeout`、`$mol_after_frame` 及其同類註冊了 mock，而這些 mock 也在你的打包結果裏。透過 `new this.$.$mol_after_timeout( ms, task )` 建立的計時器只是排進佇列，而不是真的被排程，`$mol_after_mock_warp()` 會把這個佇列跑掉。給定一個會自己消失的提示條：

```typescript
@ $mol_mem toast( next?: string ) { return next ?? '' }

@ $mol_action notify( text: string ) {
	this.toast( text )
	new this.$.$mol_after_timeout( 3000, ()=> this.toast( '' ) )
}
```

測試就手動推動時間：

```typescript
'toast hides after the timer'( $ ) {
	const app = $my_greeter.make({ $ })
	app.notify( 'Saved' )
	$mol_assert_equal( app.toast(), 'Saved' )
	$mol_after_mock_warp()
	$mol_assert_equal( app.toast(), '' )
},
```

視圖裏裸寫的 `setTimeout` 不會被模擬，而且會活得比測試還久；這也是要透過上下文建立計時器的理由之一。

## 穿過 DOM

在 Node 的打包結果裏，`$mol_dom_context` 是一個 jsdom 視窗，所以視圖會渲染成真實的元素。當要檢查的是標記而不是狀態時，就用它：

```typescript
'greets by name'( $ ) {
	const app = $my_greeter.make({ $ })
	app.name( 'Ada' )
	$.$mol_dom_context.document.body.appendChild( app.dom_node() )
	app.dom_tree()
	$mol_assert_equal( app.Hello().dom_node().textContent, 'Hello, Ada!' )
	app.destructor()
},
```

`dom_node()` 建立元素，`dom_tree()` 渲染子樹，`destructor()` 釋放視圖，好讓它的單元不會活得比測試還久。子視圖從自己的名字得到的那個屬性——這裏是 `[my_greeter_hello]`——就是選擇器，供你在更想用 `querySelector` 而不是呼叫子視圖的時候使用。

jsdom 缺兩個輸入框和手勢會用到的全域物件：`ShadowRoot` 和 `PointerEvent`。缺了它們，渲染出的 `$mol_string` 會印出一個 `ReferenceError` 並保持空白，而樹的其餘部分照常渲染。從 jsdom 視窗把它們借過來；這是一條不含測試資料、對每個測試都成立的規則，所以它歸 `$mol_test_mocks`：

```typescript
$mol_test_mocks.push( $ => {
	const win = $.$mol_dom_context
	Object.assign( globalThis, {
		ShadowRoot: win.ShadowRoot,
		PointerEvent: win.PointerEvent ?? win.MouseEvent,
	} )
} )
```

## Node 測試覆蓋不到甚麼

幾何與樣式。兩個區塊是否對齊、面板會不會溢出畫面、深色主題讀起來舒不舒服：這些在 jsdom 裏統統不存在。對你動過的版面，請在瀏覽器裏打開模組的 `-/test.html`，它會掛載應用並在那裏跑同樣的測試，然後親眼看看。

## 實用提示

- **沉默就是失敗。** 斷言失敗的測試和卡住的測試長得一模一樣：沒有輸出，行程還活着。請在末尾找 `All tests passed`；如果它不在，先檢查最後一處斷言。`async` 測試有一秒的時限。
- **故意弄壞一個。** 當一次執行甚麼都沒印出時，把某個斷言反過來寫，確認失敗會顯示出來。一套不會失敗的測試甚麼也沒有在衡量。
- **不要斷言在地化的字串。** 樹裏標了 `@` 的值要經過語言環境解析，而語言環境在每個全新的上下文裏都會重新預熱。請斷言結構，而不是標籤的文字。

## 下一步

[疑難排解](#!section=docs/page=troubleshooting) 列出了那些讓測試保持綠色、畫面保持空白的錯誤，而[資料獲取](#!section=docs/page=data) 展示了上面那個 mock 是為哪個元件寫的。
