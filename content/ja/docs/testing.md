# テスト

$mol のビューは自分の状態の関数であり、そのことがテストの見た目を変えます。ユーザーのシナリオは、ビュー自身のメソッドの呼び出しとして書かれます。下書きを入れ、アクションを走らせ、ユーザーが見るはずのものを読む。

```typescript
app.draft( 'Milk' )
app.add()
$mol_assert_equal( app.item_title( 0 ), 'Milk' )
```

セレクタもブラウザーもなく、Playwright も Cypress もなく、何かを待つこともありません。同じファイルがさらに次のものをくれます。

- **速さ。** テストは Node でミリ秒のうちに走り、1000 本でおよそ 1 分です。`node my/hello/-/node.test.js` がモジュールの分を実行します。
- **セットアップ不要。** コンポーネントの隣の `hello.test.ts` はビルダーに拾われ、`-/node.test.js` にコンパイルされます。`mam_build` による継続的インテグレーションがそれを実行し、テストが落ちればビルドも落とします。
- **コンテキストを通したサービスの差し替え。** テストはどれも自分の `$` を受け取り、コンポーネントが `this.$.X` で辿るものはすべて、その `$` へテストダブルを代入すれば入れ替わります。`$mol_fetch` ではなく `this.$.$mol_fetch` と書く理由がこれです。こちらは差し替えられますが、素のほうは差し替えられません。
- **モックされた時間。** コンテキストを通して作られたタイマーは自分では進みません。待ち行列に入っているものは `$mol_after_mock_warp()` が実行します。
- **必要なときには本物の DOM。** Node バンドルは jsdom を積んでいるので、同じテストファイルで `dom_node()` と `querySelectorAll` が動きます。

## ビューのメソッドを通したシナリオ

[クックブック](#!section=docs/page=cookbook)の todo リストを取り上げます。`draft?` という文字列、`items` というリスト、`add` アクション、`delete` アクション。そのテストは `my/todo/todo.test.ts` にあります。

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

気に留めておくことがいくつかあります。

- テストファイルが使うのは `$.$$` ではなく `namespace $` です。コンテキストの `$` は引数として渡され、テストごとに新しく、コンポーネントは `Klass.make({ $ })` で作られるので、そのコンテキストからサービスを読みます。
- クリックはハンドラーの呼び出しです。`app.add()` がボタンのすることであり、バインディングまで含めたいときは `app.Add().click( event )` が同じ経路を通ります。
- ユーザーが見るものをアサートしてください。`items()`、`item_rows()`、`sub()`、サブビューの `title()` です。画面を通してモデルを調べれば、クラスから抜け落ちたオーバーライドも捕まります。モデルだけのテストでは捕まりません。
- `$mol_assert_equal` は同一性で、`$mol_assert_like` は構造で比べ、`$mol_assert_fail( ()=> ..., 'message' )` はスローを期待します。
- テストの名前が説明です。本体にコメントはありません。

## サービスをモックする

テストはそれぞれ、グローバルなものから派生した新しいコンテキストを受け取ります。コンポーネントを作る前にその `$` のサービスへサブクラスを代入すれば、コンポーネントの中のすべての `this.$.X` が差し替え先に解決されます。[データ取得](#!section=docs/page=data)の `$my_users` コンポーネント向けの fetch のダブルはこうです。

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

コンポーネントの `users()` は `this.$.$mol_fetch.json( ... )` を呼ぶので、リクエストはモックへ行き、値は同期的に手に入ります。待つ必要はありません。コンポーネントがグローバルの `$mol_fetch.json( ... )` を呼んでいたら、モックは参照されなかったでしょう。組み込みのモックは、コンテキスト上のグローバルな `fetch` と `XMLHttpRequest` を、投げるだけのプロキシにすでに置き換えています。ですからコンテキストをすり抜けたリクエストは、ネットワークに触れる代わりに大きな音を立てて失敗します。

同じパターンが、URL の `$mol_state_arg`、ストレージの `$mol_state_local`、そのほかコンポーネントが `this.$` から取るすべてに当てはまります。

`$mol_test_mocks` というものもあります。バンドルの中のすべてのテストの前に——他のモジュールのテストも含めて——コンテキストに対して走る関数の一覧です。フレームワークが自分のモックを登録しているのと同じで、どこでも成り立つ規則の置き場所です。渡されたものを何でも保持するストレージのダブル、空の辞書を返すロケール、上に出てきたネットワークの禁止など。一つのコンポーネントのための固定データは、そこには属しません。

## 時間

フレームワーク自身のテストが `$mol_after_timeout`、`$mol_after_frame` とその仲間のモックを登録しており、そのモックはあなたのバンドルにも入っています。`new this.$.$mol_after_timeout( ms, task )` で作られたタイマーは、予約される代わりに待ち行列へ入り、`$mol_after_mock_warp()` がその行列を実行します。自分で消えるトーストがあるとします。

```typescript
@ $mol_mem toast( next?: string ) { return next ?? '' }

@ $mol_action notify( text: string ) {
	this.toast( text )
	new this.$.$mol_after_timeout( 3000, ()=> this.toast( '' ) )
}
```

テストは時間を手で動かします。

```typescript
'toast hides after the timer'( $ ) {
	const app = $my_greeter.make({ $ })
	app.notify( 'Saved' )
	$mol_assert_equal( app.toast(), 'Saved' )
	$mol_after_mock_warp()
	$mol_assert_equal( app.toast(), '' )
},
```

ビューの中の素の `setTimeout` はモックされず、テストより長く生き残ります。タイマーをコンテキスト越しに作る理由の一つがこれです。

## DOM を通して

Node バンドルでは `$mol_dom_context` は jsdom のウィンドウなので、ビューは本物の要素として描画されます。確かめたいのが状態ではなくマークアップのときに使ってください。

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

`dom_node()` が要素を作り、`dom_tree()` が部分木を描画し、`destructor()` がビューを解放して、そのセルがテストより長く生き残らないようにします。サブビューがその名前から得る属性——ここでは `[my_greeter_hello]`——が、サブビューを呼ぶより `querySelector` を使いたいときのセレクタです。

jsdom には、入力欄とジェスチャーが手を伸ばす二つのグローバル、`ShadowRoot` と `PointerEvent` がありません。それらなしで描画された `$mol_string` は `ReferenceError` をログに出し、ツリーの残りが描画される一方で空のままになります。jsdom のウィンドウから借りてきてください。これはデータを含まない、どのテストにも当てはまる規則なので、`$mol_test_mocks` に入れます。

```typescript
$mol_test_mocks.push( $ => {
	const win = $.$mol_dom_context
	Object.assign( globalThis, {
		ShadowRoot: win.ShadowRoot,
		PointerEvent: win.PointerEvent ?? win.MouseEvent,
	} )
} )
```

## Node のテストが覆わないもの

ジオメトリとスタイルです。二つのブロックが揃っているか、パネルが画面からはみ出していないか、ダークテーマが読みやすいか。そのどれも jsdom には存在しません。手を入れたレイアウトについては、モジュールの `-/test.html` をブラウザーで開いてください。アプリをマウントし、そこで同じテストを走らせてくれるので、自分の目で確かめられます。

## 実務上のメモ

- **沈黙は失敗です。** アサーションに落ちたテストと、ハングしたテストは同じに見えます。出力はなく、プロセスは生きたまま。最後に `All tests passed` が出ているか探してください。なければ、まず最後のアサーションを疑います。`async` なテストは 1 秒までです。
- **わざと一つ壊してみる。** 実行しても何も出ないときは、アサーションを反転させて失敗が現れるか確かめてください。落ちようのないテストスイートは、何も測っていません。
- **ローカライズされた文字列をアサートしない。** ツリーで `@` の付いた値はロケールを通して解決され、ロケールは新しいコンテキストのたびに温め直されます。ラベルの文言ではなく、構造をアサートしてください。

## 次へ

[トラブルシューティング](#!section=docs/page=troubleshooting)には、テストを緑のまま画面を空のままにする間違いが並んでいます。そして[データ取得](#!section=docs/page=data)は、上のモックが書かれた相手のコンポーネントを示します。
