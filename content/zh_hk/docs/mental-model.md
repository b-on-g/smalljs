# 心智模型

如果你從 React 或 Vue 過來，在 $mol 的頭幾天多半會花在尋找那些根本不存在的東西上：`computed`、`watch`、`useEffect`、`onMounted`、生命週期鉤子裏的 `fetch`。它們不是被藏在 API 的某個角落，而是這套模型裏壓根沒有它們的位置。本頁是這套模型的五分鐘版本。請在讀[視圖](#!section=docs/page=views)之前先看它，日後每當一個熟悉的名字不見了，就回來翻翻。

## 拉取，而非推送

在有人讀取之前，甚麼都不會被計算。視圖透過讀取自己的屬性來渲染；每個屬性再讀取它需要的東西；依賴鏈就從這些讀取中自行組裝起來。沒有訂閱要宣告，也沒有 `watch` 要註冊：讀取本身就是訂閱。

```tree
$my_profile $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
```

```typescript
namespace $.$$ {
	export class $my_profile extends $.$my_profile {
		@ $mol_mem
		user() {
			return this.$.$mol_fetch.json( 'https://api.example.com/me' ) as { name: string }
		}
		name() {
			return this.user().name
		}
	}
}
```

渲染 `Name` 會讀取 `name()`，`name()` 讀取 `user()`，`user()` 發出網絡請求。沒有人告訴視圖有這個請求，也沒有人告訴請求有這個視圖。當 `user()` 變化時，讀取過它的一切都會重新計算，別的甚麼都不會。

## 沒有生命週期

沒有 `mounted`，沒有 `useEffect`，也沒有 `created`。資料是靠讀取一個屬性來請求的，而視圖在渲染時會讀取自己的屬性。所以上面的例子會在 `$my_profile` 出現在畫面上的那一刻載入用戶，不會更早。當視圖離開畫面，就再沒有人讀取 `user()`，那個單元會隨視圖一起被釋放。

這就是「在 mount 時 fetch」這一模式的全部替代品：視圖索取它需要的東西，框架決定何時去要。載入不是掛在頁面事件上的，而是掛在「是否可見」上的。

## 屬性就是一個單元

一個帶選用參數的方法，同時是 getter、setter、計算值和狀態：

```typescript
@ $mol_mem
count( next?: number ) {
	return next ?? 0
}
```

不帶參數呼叫它就是讀取，帶一個參數呼叫它就是寫入。`@ $mol_mem` 把方法變成一個帶快取的單元，當它讀取過的東西發生變化時重新計算。所謂計算值，不過是一個讀取了其他方法的 `@ $mol_mem` 方法。watcher 是不需要的：副作用屬於事件，而事件處理器就是一個標了 `@ $mol_action` 的方法。

```typescript
@ $mol_mem
doubled() {
	return this.count() * 2
}

@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

[狀態與響應式](#!section=docs/page=state) 講清了這兩者各自內部容許發生甚麼。

## 會等待的同步程式碼

上面的 `user()` 看起來是同步的，寫起來就像回應已經擺在那裏了。它之所以行得通，是因為每次計算都跑在一條纖程裏。`this.$.$mol_fetch.json()` 會暫停那條纖程，等回應到達後框架再重啟這次計算。在那之前，讀取了 `user()` 的視圖顯示載入狀態；如果請求失敗，同一個視圖顯示錯誤。你既不用寫 `isLoading` 旗標，也不用寫 `try`/`catch`。

同一套機制服務於任何非同步來源。[資料獲取](#!section=docs/page=data) 會逐步講解重新載入與錯誤處理。

## 一切都是覆寫

一個 `view.tree` 檔案就是一份方法宣告清單。元件下面的每一行都是這個元件的一個屬性，帶着預設值；而任何巢狀元件的屬性，都可以就在它被使用的地方、用一行重新定義。文字輸入框的 placeholder 就是 `$mol_string` 的 `hint` 屬性：

```tree
$my_search $mol_view
	sub /
		<= Query $mol_string
			hint \Search
			value? <=> query? \
```

沒有 prop 清單要擴充，沒有包裝元件要寫，也沒有分支要維護。只要元件有這個屬性，你就能從外面設定它。

## 如何閱讀原始碼

上一節引出了真正的問題：你怎麼知道這個屬性叫 `hint`？答案是去看，而這個框架的構造本身就讓「去看」變得廉價。

**框架的原始碼就在你的原始碼旁邊。** 在 MAM 工作區裏，`mol/string/string.view.tree` 離 `my/hello/` 只隔一個資料夾。它不在 `node_modules` 裏，也不在某個打包結果裏；它和你自己寫的檔案是同一種東西。

**類別名就是路徑。** `$mol_string` 住在 `mol/string/`，`$mol_button_major` 住在 `mol/button/major/`。每個底線都是一個資料夾分隔符，所以你樹裏的任何一個名字都能還原成一個可以打開的資料夾。[工具鏈](#!section=docs/page=tooling)頁面介紹的編輯器支援會替你補全這些名字。

**元件的 `.view.tree` 就是它全部屬性的清單，連同預設值。** 值的形態告訴你型別：`\` 開始一個字串，`/` 是清單，`*` 是字典，裸數字就是數字，`true` 和 `false` 是布林值，`null` 表示缺席，而 `<=` 引入一個子視圖，或一個取自擁有者的屬性。下面是 `mol/string/string.view.tree` 中與輸入框有關的那部分：

```tree
$mol_string $mol_view
	dom_name \input
	enabled true
	field *
		^
		disabled <= disabled false
		value <= value_changed? <=> value? \
		placeholder <= hint_visible <= hint \
	attr *
		^
		type <= type? \text
```

把它唸出來。`dom_name \input`：這個元件渲染成一個 `input` 元素。`enabled true`：一個布林屬性，預設開啟。`field *` 是 DOM 元素欄位的字典；左邊的名字屬於 DOM，右邊的名字屬於元件，而最右邊那個才是你要設定的。於是 DOM 的 `placeholder` 來自 `hint`，預設是空字串；DOM 的 `value` 是可寫的 `value?` 屬性，而 `type` 屬性是可寫的 `type?`，預設為 `text`。於是在你的樹裏，一個 placeholder、一個停用的輸入框和一個密碼欄位，分別就是 `hint`、`enabled false` 和 `type \password`。

**帶型別的介面由同一棵樹產生。** `mol/string/-view.tree/string.view.tree.d.ts` 用 TypeScript 簽章列出同樣的屬性，而本站的 [API 參考](#!section=docs/page=api-mol-string) 就是從那個檔案產出的。三者一致，因為三者同源。

**大多數元件都自帶 `demo/` 資料夾和 `readme.md`。** `mol/string/demo/demo.view.tree` 展示了帶 hint 的、停用的、以及帶預設值的輸入框。當你需要某個元件處於某種狀態時，找到最接近的那個 demo，把那一行抄過來。

合起來，搞定一個 placeholder 大約一分鐘：

```bash
ls mol | grep string
cat mol/string/string.view.tree
```

你在 `$mol_string` 下面看到 `hint \`，於是在你自己的 `$mol_string` 下面寫上 `hint \Search`。

## 命名

一切都是 `snake_case`：`view.tree` 裏的屬性名、TypeScript 裏的方法名、框架為了樣式而掛到 DOM 節點上的屬性。子視圖以大寫字母開頭（`Query`），值以小寫字母開頭（`query`）。

樹裏的名字和類別裏方法的名字必須逐字母一致。樹裏的 `exchange_form` 和類別裏的 `exchangeForm` 是兩個毫不相干的屬性：類別裏的那個永遠不會被讀取，樹裏的那個保持預設值，而且沒有任何錯誤提示你。當某個覆寫看起來毫無作用時，這是第一個要檢查的地方。[疑難排解](#!section=docs/page=troubleshooting) 列出了這一條，以及其他畫面不對而編譯器沉默的情況。

## 下一步

模型立住之後，[視圖](#!section=docs/page=views) 講元件如何宣告與組合，而[來自 React、Vue 和 Svelte](#!section=docs/page=rosetta) 把你已經熟悉的名字對應到這裏的名字上。
