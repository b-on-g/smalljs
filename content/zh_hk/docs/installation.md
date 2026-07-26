# 安裝

[快速上手](#!section=docs/page=getting-started) 會一步步帶你完成第一個應用程式。本頁是參考手冊：$mol 專案如何組織，以及建置是如何運作的。

## 環境需求

- **Node.js 18+** 和 **git**。不需要全域安裝其他任何東西。

## MAM 工作區

$mol 應用程式運行在 **MAM** 之中——它是建置工具和模組註冊表。你只需複製一次，然後在其中開發你的模組：

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` 會在 `http://localhost:9080/` 啟動一個帶監聽的開發伺服器。它在儲存時重新建置，並自動解析相依性——你永遠不用維護打包器設定。

## 模組如何命名

每個元件名都對應到一個資料夾路徑，且**每個底線都是資料夾分隔符**：

```
$my_app          →  my/app/
$my_app_header   →  my/app/header/
```

模組資料夾名永遠不包含底線——多詞名稱請使用巢狀資料夾。如果你用到的某個元件始終沒有出現在打包結果中，幾乎總是因為資料夾路徑與類別名不相符。

## 模組剖析

一個元件就是一個資料夾，最多包含四個檔案：

| 檔案 | 用途 |
|------|------|
| `name.view.tree` | 宣告式版面 |
| `name.view.ts` | 行為（TypeScript） |
| `name.view.css.ts` | 帶型別的樣式 |
| `name.view.tree`、`index.html` | 應用模組的進入點 |

應用程式的 `index.html` 會掛載根元件：

```html
<body mol_view_root>
	<div mol_view_root="$my_app"></div>
	<script src="web.js"></script>
</body>
```

## 建置生產版本

開發伺服器會即時建置，但你也可以從工作區根目錄明確建置任意模組：

```bash
npm run start my/app
```

產物會輸出到 `my/app/-/`——包括 `web.js`、`web.css` 和 `web.audit.js`。**務必檢查稽核檔案：** 乾淨的 `web.audit.js` 表示沒有未使用的相依性，也沒有型別錯誤。

## 加入 npm 套件

用 `require` 引用一個套件，MAM 會在下次建置時安裝它：

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

## 下一步

工作區就緒後，接下來了解 UI 本身是如何描述的——繼續閱讀 [視圖](#!section=docs/page=views)。
