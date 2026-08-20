# 工具鏈

$mol 在任何編輯器中都能運作，但一小套工具能讓 `.view.tree` 和帶型別的樣式舒適得多：一個專案腳手架、一個語言伺服器、面向 Zed 和 VS Code 的編輯器整合，以及一個把框架教給 LLM 助手的技能。

## 用腳手架產生專案

`create-view-tree-lsp` 會產生一個開箱即用的 $mol 模組，這樣你就不必手工拼湊樣板程式碼：

```bash
npx create-view-tree-lsp bog/myapp
```

參數是模組路徑（`namespace/name`，或等價的 `bog_myapp`）。它會為一個可運行的應用寫出 `view.tree`、`view.ts`、`view.css.ts` 和 `index.html`，外加用於部署的 GitHub Actions。預設情況下，它還包含一個 local-first 儲存 **Giper Baza**、一套 **Docker** 設定和一個 **Tauri** 桌面外殼。任何一項都可以用旗標關閉：

```bash
npx create-view-tree-lsp bog/myapp --no-baza --no-docker --no-tauri
```

相反，還有幾項是按需啟用的：

- `--backend` 加入一個 `$mol_server` REST 後端，配有 `node:sqlite` 儲存和共用的 TypeScript item 型別
- `--prerender` 和 `--seo` 加入搜尋引擎可見性，詳見下文的 [持續整合](#!section=docs/page=tooling/Docs.Body=%E6%8C%81%E7%BA%8C%E6%95%B4%E5%90%88)

腳手架只是語言伺服器中 CLI 的一層薄封裝，所以 `npx view-tree-lsp create bog/myapp` 會直接做同樣的事。

## 翻譯

翻譯檔案跟自己的模組放在一起，位於 `<模組>/<名稱>.locale=<lang>.json`。這對程式碼很方便，對譯者卻不然：他拿到的不是一份句子清單，而是三十個零碎檔案。

**[$yuf_localizer](https://zerkalica.github.io/yuf/#!demo=yuf_localizer_demo)** 正是為此而生。把專案網址和語言代碼告訴它，它就會把所有鍵匯成一份可搜尋的清單，並標出尚未處理的部分：只有英文的鍵、改動過但還沒提交的鍵，以及專案中已不存在的過期鍵。譯文保存在瀏覽器裡，直到你匯出為止，因此兩次工作之間不會遺失。

譯者完成後，匯出結果並把它拆回各個模組：

```bash
# 在 MAM 根目錄下執行
npx view-tree-lsp locale bog/myapp/app/- --exclude=mol --update
```

參數可以是資料夾，也可以是單一語言檔案。選項：

- `--include=` 接受一段路徑片段，只保留路徑中包含它的模組；可以重複任意多次
- `--exclude=` 則相反，略過這些模組 — `--exclude=mol` 可讓框架本身的套件維持原樣
- `--update` 合併進既有檔案：來源中的值優先，來源中沒有的鍵保持不動
- `--dry` 只印出計畫，不寫入任何內容

每個鍵本身帶著所屬模組的路徑，所以 `$my_page_greeting` 會落到 `my/page/page.locale=ru.json`，就在它所屬的原始碼旁邊。不過要算出這個模組，比看起來更微妙：`_` 既分隔資料夾也分隔字詞，因此「最長相符路徑」是錯誤答案。`$my_page_lang_hint` 的屬性名以 `lang` 開頭，若旁邊真的存在 `my/page/lang` 子模組，這個鍵就會被它吞掉。因此指令會逐一詢問候選模組宣告了哪些鍵——MAM 正是把這些鍵寫進它在 `-view.tree` 下的語言檔案——再把鍵交給真正的擁有者。

## 持續整合

腳手架會把 GitHub Actions 寫入 `.github/workflows/`，於是新專案無需額外設定即可部署和發布。

`deploy.yml` 在每次 push 時運行。它用 `hyoo-ru/mam_build` 建置應用，從 `main` 把 `app/-` 發布到 **GitHub Pages**，並給每個 `feature/*` 分支各自的預覽資料夾——分支被刪除時會自動移除。

### SEO

兩個獨立選項，都由 `v*` 標籤觸發：

- **`--prerender`** 用 `b-on-g/mol-prerender-action` 把你列出的畫面（例如 `home`）算繪成靜態 HTML，這樣爬蟲和連結預覽就能看到真實內容。
- **`--seo`** 加入 `$bog_seo` 執行期：一個基於 pathname 的路由器，帶有網站地圖、`robots.txt`、`llms.txt` 以及每頁的 meta 注入。該工作會服務建置產物，匯出正規的預算繪 HTML，並將其折回部署中。

當少數公開畫面需要可被爬取時，選用 prerender action；當你需要網站地圖和每頁中繼資料時，選用 `$bog_seo`。

### Tauri 桌面

啟用 Tauri 選項後，`tauri.yml` 會透過可重用工作流程 `b-on-g/tauri-mol-workflow-template`，在 `v*` 標籤上（或按需）從你部署到 Web 的同一個模組建置桌面二進位檔。

## 語言伺服器

`view-tree-lsp` 是針對 `view.tree` 格式的 Language Server Protocol 實作。用 npx 按需運行，無需全域安裝：

```bash
npx view-tree-lsp@latest
```

它會掃描你的工作區，為任何支援 LSP 的編輯器提供：

- 對 `$mol_*` 元件，以及你自己專案中定義的元件和屬性的補全
- 限定在游標所在元件範圍內的屬性建議
- 用於導覽的元件宣告大綱
- 隨檔案變動的即時更新

因為它講 LSP，你可以把任何編輯器的語言用戶端指向 `npx view-tree-lsp`。下面兩個整合會替你接好。

## Zed

**View Tree Syntax Highlighting for $mol** 擴充功能打包了 tree-sitter 文法、語言伺服器和一個可選的圖示主題。從 Zed 的擴充功能管理員安裝：

1. 開啟命令面板（`Cmd+Shift+P` / `Ctrl+Shift+P`）
2. 執行 **zed: extensions**
3. 搜尋 `view.tree` 或 `mol` 並安裝該擴充功能

你會獲得 `.view.tree` 檔案的語法高亮、補全和大綱。[原始碼](https://github.com/Dev-cmyser/zed-view.tree-mol-support) 和搭配的 [圖示主題](https://github.com/Dev-cmyser/zed-viewtree-icon-theme) 都在 GitHub 上。

## VS Code

MAM 工作區已經自帶 VS Code 設定。當你開啟複製下來的 `mam` 資料夾時，VS Code 會提示從 `.vscode/extensions.json` 安裝推薦擴充功能：

- `nin-jin.vscode-language-tree` — `view.tree` 語言支援
- `stan-donarise.view-tree-language` — 語法和文法
- `editorconfig.editorconfig` — 一致的格式化

同一個資料夾還附帶 `mol.code-snippets`，因此元件和繫結的程式碼片段無需任何額外設定即可使用。接受提示後，`.view.tree` 和 TypeScript 檔案便開箱即用地高亮顯示。

## LLM 技能

`mol_skill` 為 AI 助手補上寫 $mol 所需的脈絡：`view.tree` 語法、MAM 模組結構、`view.ts` 與 `view.css.ts` 的分工、Giper Baza 的資料建模，以及 Tauri 打包。它就是一個普通的技能資料夾，一份 `SKILL.md` 工作流加上若干參考文件，因此任何能讀 skills 格式的 LLM 工具都可以載入它，包括 Claude Code 和 Cursor。用 skills CLI 安裝：

```bash
npx skills add b-on-g/mol_skill --all -g
```

之後用自己的話提問（「MAM 模組結構」「Giper Baza 的 CRUD 和角色」），助手會在回答前打開對應的參考文件，寫出的程式碼也就遵循本文件中的慣例。[原始碼](https://github.com/b-on-g/mol_skill)在 GitHub 上；如果你更想自己讀，這些參考文件單獨看也很完整。

## 連結

- 腳手架 — [create-view-tree-lsp](https://github.com/Dev-cmyser/create-view-tree-lsp)
- 語言伺服器 — [view-tree-lsp](https://github.com/Dev-cmyser/view.tree)
- Zed 擴充功能 — [zed-view.tree-mol-support](https://github.com/Dev-cmyser/zed-view.tree-mol-support)
- LLM 技能 — [mol_skill](https://github.com/b-on-g/mol_skill)
