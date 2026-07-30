# 快速開始

本頁帶你從一個空資料夾走到一個可執行的響應式 $mol 應用，大約需要十五分鐘。下面每段程式碼都是真實可用的——原樣複製即可。

## 你需要什麼

- **Node.js 18+** 和 **git**。就這些。

你無需安裝全域 CLI，也無需產生日後還得費力理解的樣板程式碼。$mol 應用位於 MAM 工作區內，而它已經知道如何建構和執行它們。

## 1. 取得工作區

MAM 是 $mol 的建構工具和模組登錄檔。複製一次並安裝：

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

現在在 `my/hello/` 裡新增三個檔案。

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

### hello.view.tree — 版面

```tree-no-run
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

有幾點值得點明：

- `$mol_page` 和 `$mol_string` 是內建元件——一個頁面外殼和一個文字輸入框。
- `<=` 是單向繫結；`<=>` 是雙向繫結。所以 `value? <=> name?` 會讓輸入框與你的 `name` 狀態保持同步。
- `@` 標記可本地化的字串；`\` 開始一個原始字串。

### hello.view.ts — 行為

```typescript
namespace $.$$ {
	export class $my_hello extends $.$my_hello {
		@ $mol_mem
		greeting() {
			const name = this.name()
			return name ? `Hello, ${name}!` : 'Please enter your name'
		}
	}
}
```

`@ $mol_mem` 讓 `greeting` 成為一個響應式、具快取的屬性。它讀取 `name()`，所以一旦 `name` 變化，`greeting` 就會重新計算，畫面上的訊息也隨之更新。你從沒寫過訂閱、副作用或重新渲染的呼叫。

## 3. 執行它

第 1 步的開發伺服器已經在監看了。直接開啟：

```
http://localhost:9080/my/hello/
```

輸入你的名字——問候語會隨你的輸入而更新。這就是 $mol 的響應式：狀態自行流向視圖。

## 4. 新增第二個響應式值

響應式是可組合的。新增一個依賴同一個 `name` 的長度計數器，無需任何額外接線。

在 `hello.view.tree` 中，在 `Message` 下方加一行：

```tree
		<= Counter $mol_view
			sub / <= counter \
```

在 `hello.view.ts` 中，加上這個方法：

```typescript
		@ $mol_mem
		counter() {
			return `${this.name().length} characters`
		}
}
```

`greeting` 和 `counter` 都讀取 `name`；兩者一起更新。再加第三個、加第十個——模式都不變。這正是為什麼隨著功能堆疊，$mol 程式碼依然保持扁平。

## 5. 檢查你的建構

MAM 會在每個應用旁邊寫一個診斷檔案。建構之後，開啟：

```
http://localhost:9080/my/hello/-/web.audit.js
```

乾淨的稽核意味著沒有未使用的相依、沒有型別問題、沒有要修的東西。養成瞄一眼的習慣——它會在錯誤抵達瀏覽器之前就抓住它們。

## 你建構了一個 $mol 應用

你已經擁有一個響應式元件、雙向繫結和衍生狀態——只用了三個小檔案，零設定。

繼續前進：**[指南](#!section=docs/page=installation)** 深入講解安裝、視圖、狀態、路由和資料——並把這個 Hello World 變成真正的東西。
