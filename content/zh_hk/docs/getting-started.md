# 快速開始

本頁帶你從一個空資料夾走到一個可執行的響應式 $mol 應用，大約需要十五分鐘。下面每段程式碼都是真實可用的——原樣複製即可。

元件你會用普通的 TypeScript 來寫。$mol 另有一種更短的元件描述格式 `view.tree`，下一頁你就會遇到它。這裡用不上：不管哪種寫法，$mol 元件都只是一個普通的類別。

## 你需要什麼

- **Node.js 18+** 和 **git**。就這些。

你無需安裝全域 CLI，也無需產生日後還得費力理解的樣板程式碼。$mol 應用位於 MAM 工作區內，而它已經知道如何建構和執行它們。

## 1. 取得工作區

MAM 是 $mol 的建構工具和模組登錄表。複製一次並安裝：

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` 會在 `http://localhost:9080/` 啟動開發伺服器。它會監看你的檔案並自動重新建構——讓它在自己的終端機裡一直執行。

## 2. 建立一個模組

一個 $mol 應用就是一個資料夾。選一個命名空間（你自己的，例如 `my`）和一個名字（`hello`）：

```bash
mkdir -p my/hello
```

> **要記住的一條規則：** 元件名中的底線是資料夾分隔符。`$my_hello` 位於 `my/hello/`，而 `$my_hello_form` 會位於 `my/hello/form/`。模組資料夾名永遠不含底線。

現在在 `my/hello/` 裡加入兩個檔案。

### index.html — 進入點

```html
<!doctype html>
<html mol_view_root>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>
	<body mol_view_root>
		<div mol_view_root="$my_hello"></div>
		<script src="web.js"></script>
	</body>
</html>
```

`mol_view_root="$my_hello"` 屬性會在頁面載入時掛載你的元件。

### hello.view.ts — 元件

```typescript
namespace $ {

	export class $my_hello extends $mol_page {

		title() {
			return 'Greeting'
		}

		body() {
			return [ this.Name(), this.Message() ]
		}

		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}

		@ $mol_mem
		name( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.greeting() ]
			return obj
		}

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

從上往下讀：

- `$my_hello` 位於 `namespace $`，也就是承載所有 $mol 元件的環境命名空間。它繼承 `$mol_page`，一個自帶標題和主體的內建頁面外殼。下面的 `$mol_string` 是內建的文字輸入框。
- `body()` 回傳子元件。這裡的子元件不是標記，而是屬性：`Name` 和 `Message` 都是方法，你可以呼叫它們、在子類別裡覆寫它們，或者在樣式表裡按名字選中它們。
- `Name()` 建立輸入框並把它接上。它的每個屬性拿到的是一個**箭頭函式**，而不是一個值。子元件需要資料時才去呼叫這個箭頭，因此讀到的總是當前值。
- `name( next?: string )` 是狀態。不帶參數呼叫是讀，帶參數呼叫是寫。正是把這整個函式交給 `obj.value`，才讓在輸入框裡打字能更新 `name`。
- `@ $mol_mem` 按實例快取一個屬性。用在 `name` 上，代表值會被保存下來，讀過它的一切都會在它變化時重新計算。用在 `Name` 和 `Message` 上，代表子元件只建立一次，而不是每次呼叫都新建一個。
- `greeting()` 讀取 `name()`。這一次讀取*就是*訂閱。`name` 變了，`greeting` 就重新計算，畫面上的文字隨之改變；不用宣告副作用，不用寫相依陣列，也不用呼叫重繪。

## 3. 執行

第 1 步啟動的開發伺服器已經在監看了。直接開啟：

```
http://localhost:9080/my/hello/
```

輸入你的名字，問候語會隨你的輸入而更新。這就是 $mol 的響應式：狀態自行流向視圖。

## 4. 加入第二個響應式值

響應式是可組合的。加入一個讀取同一個 `name` 的長度計數器，無需任何額外接線。

把它放進 `body()`：

```typescript
		body() {
			return [ this.Name(), this.Message(), this.Counter() ]
		}
```

再補上它背後的兩個屬性：

```typescript
		@ $mol_mem
		Counter() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.counter() ]
			return obj
		}

		counter() {
			return `${ this.name().length } characters`
		}
```

`greeting` 和 `counter` 都讀取 `name`，兩者一起更新。再加第三個、加第十個：響應式的這一半永遠不變形。

另一半會變。三行邏輯帶來了六行管線——一個工廠、一個 `new`、一個箭頭、一個 `return obj`。把它乘以真實畫面上的每一個子元件，你就得到了 `view.tree` 存在的理由。

## 5. 檢查你的建構

MAM 會在每個應用旁邊寫一個診斷檔案。建構之後，開啟：

```
http://localhost:9080/my/hello/-/web.audit.js
```

乾淨的稽核意味著沒有未使用的相依、沒有型別問題、沒有要修的東西。養成瞄一眼的習慣——它會在錯誤抵達瀏覽器之前就抓住它們。

## 你建構了一個 $mol 應用

一個帶雙向繫結和衍生狀態的響應式元件，寫在一個檔案裡，零設定。

現在拿這同一個檔案，看它如何縮小：**[從 TypeScript 到 view.tree](#!section=docs/page=from-ts-to-view-tree)**。
