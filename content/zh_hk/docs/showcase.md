# 展示

用 $mol 建構的真實作品——社群應用、商業產品和開發者工具。每一個都是能用的應用，而不是示範。

## 應用

- **[Bog Music](https://b-on-g.github.io/music/)**——一個既可作為 Chrome 擴充功能、也可作為網頁應用執行的音樂播放器，帶背景播放和離線快取。$mol 驅動介面和本地優先的狀態。
- **[Blitz Quiz](https://b-on-g.github.io/blitz/)**——一個基於 $mol 和 Giper Baza 建構的 Kahoot 風格即時問答。房間透過 CRDT 層即時同步，因此沒有遊戲伺服器需要執行。
- **[VDO Rebalance](https://b-on-g.github.io/invest/)**——一個本地優先的投資工具：放入一個 `.xlsx` 投資組合，得到用於再平衡的交易。狀態在瀏覽器中透過 Giper Baza 存續。
- **[RAGU](https://raguteam.github.io/web/#!screen=summary)**——一個開源 GraphRAG 引擎的網頁介面：瀏覽文件索引、提問並獲得帶來源的回答、探索從中抽取的知識圖譜。力導向圖由 `$mol_svg_*` 原語繪製，連佈局和縮放平移一起，沒有用圖形庫。
- **[$hyoo_budget](https://budget.hyoo.ru)**——一個協作式、本地優先的個人預算應用。它在 Beautiful Code 黑客松上獲得第一名。
- **[$hyoo_talks](https://talks.hyoo.ru)**——一個可嵌入的即時通訊。為 Sberbank 建構的一個原型在 Moscow City Hack 上獲得第二名。

## 設計系統與工具

- **[BuilderUI](https://b-on-g.github.io/builderui/)**——一個面向 $mol 的 shadcn 風格設計系統：帶型別的元件——按鈕、對話框、下拉選擇、卡片、圖表等等——外加一個用於即時主題化的 Studio（基礎色、強調色、圖表配色、圓角、字型、明/暗）。本文件網站正是基於它建構的。
- **本站**——你正在閱讀的文件，包括[遊樂場](#!section=playground)和[課程](#!section=course)，就是一個 $mol 應用。搜尋、即時程式碼編輯器和瀏覽器內的 TypeScript，全都用它們所記錄的這個框架建構。
- **MAM**——每個 $mol 應用賴以存在的建構工具和模組登錄，其本身也是一個 $mol 專案。它是開發者工具，而不是託管應用；原始碼在 GitHub 上。
- **view.tree LSP**——語言工具，以及一個用於啟動新 $mol 應用的 `npm create view-tree-lsp` 鷹架。這是編輯器工具，因此沒有可開啟的執行中應用。

## 生產環境中

除了開源和黑客松專案，$mol 也運行在能帶來營收的商業系統中。其中幾個（部分在 NDA 之下運行，因此沒有連結或標誌）：

- **反無人機防禦控制**——「Tamerlan」綜合體在每個裝置控制器（雷達、干擾器、攝影機）上運行一個 $mol 微服務，把它們連成一個共享的去中心化網路。網頁介面（本地或集中式）即時顯示空情——什麼在哪裡飛、什麼正被干擾、攝影機指向何處。
- **[虛擬頭像](https://avatar.ocas.ai)**——一個可以與之交談、下棋或請其展示投影片的 3D 角色。這是一個商業產品，$mol 在第三方函式庫之上驅動其介面。
- **提示詞測試管理面板**——讓企業為批次處理目錄列挑選並測試神經網路提示詞：改寫標題、描述和 SEO 欄位。它還會清理文字檔，以便安全匯出到其他 CMS。
- **抄錶管理面板**——儀錶把讀數上傳到 FTP；營運者建立使用者，授予他們查看特定儀錶的權限並開展電郵行銷，而一般使用者只能看到自己的物件和一個唯讀的查看頁面。
- **電商後台**——為一家網店管理商品目錄和訂單列表。
- **科學資料小工具**——視覺化微量元素及其化合物。圖形渲染仍留在 D3；其餘全部從原生 JS 重寫為 $mol，並打包進一個 Web Component。

## 黑客松

$mol 在黑客松上屢獲佳績：Beautiful Code 第一名（[$hyoo_budget](https://budget.hyoo.ru)）、AC-VO-PPR-Hackathon 第一名（用手勢和語音控制一塊街頭顯示屏），以及在 More Tech、Moscow City Hack 和 Dev Hack 上的獲獎原型。$mol 的[成功案例頁面](https://mol.hyoo.ru/#!section=docs/=xanlom_yimh6x)有詳細內容。

## 更多

[$mol 元件目錄](https://mol.hyoo.ru/#!section=demos)裏有幾十個可以開啟並查看的即時元件和示範。

在用 $mol 建構什麼嗎？最好的下一步是[遊樂場](#!section=playground)——幾秒鐘試一個想法，然後分享 URL。
