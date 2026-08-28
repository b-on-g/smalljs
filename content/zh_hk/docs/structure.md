# 專案結構

$mol 專案有四層巢狀：你複製下來的**工作區**、其中的**套件**、套件裡的**模組**，以及模組裡的**檔案**。這套版面回答一個很實際的問題——新專案放在哪裡、它的歷史歸誰——建置所做的幾乎一切都由此而來。

```structure
mam/                         工作區 —— 複製下來的 MAM
├── .meta.tree               登記表：哪個套件來自哪個儲存庫
├── mol/                     套件 —— 框架本身，自己的 git 儲存庫
└── my/                      套件 —— 你的，你自己的 git 儲存庫
    ├── .gitattributes       讓建置出的二進位檔保持完好
    ├── my.meta.tree         你自己專案的登記表
    └── hello/               專案 —— 一個模組，也是自己的 git 儲存庫
        ├── index.html       入口（只有應用模組需要）
        ├── hello.view.tree  標記
        └── form/            子模組 —— $my_hello_form
```

在本頁，這份清單的每一行都帶一個問號，說明它為什麼在那裡；下面的小節把同樣的事講得更細。

## 開一個專案

五步。只有第一步會重複，後三步可以交給鷹架工具。

**1. 複製工作區，一次。** 從此以後你寫的一切都住在裡面。

```bash
git clone https://github.com/hyoo-ru/mam.git
cd mam
```

**2. 建一個屬於你的套件。** 一個短名目錄——你的名字、你的公司、你的 ID——而且是一個獨立的 git 儲存庫。它是你今後所有專案的容器：

```bash
mkdir my
cd my
git init
```

把它推到你放程式的地方，公開或私有都行。順手加一個只有 `* -text` 一行的 `.gitattributes`；原因見下面關於套件的小節。

**3. 加上登記表。** `my/my.meta.tree` 是你套件裡專案的清單。它一開始是空的，每個專案一行：

```tree
pack hello git \https://github.com/you/hello.git
```

MAM 讀它的方式，和讀上一層工作區的 `.meta.tree` 完全一樣，所以同事複製 `my/` 時也會拿到這些專案。

**4. 建專案，並給它自己的儲存庫。** 目錄就是元件——`my/hello/` 就是 `$my_hello`——它的歷史屬於它自己，不屬於你的套件，也不屬於 $mol：

```bash
mkdir hello
cd hello
git init
```

這種分離正是版面的用意：`my/hello/` 裡的提交進入 `hello` 儲存庫，永遠不會進 `my`，也不會進 `mol`。

**5. 登記它。** 把第 3 步的 `pack` 行寫進 `my/my.meta.tree`，之後新的檢出就會按名字把專案取回來。

第 2 步之後的任何時候，[鷹架工具](#!section=docs/page=tooling)都能替你寫出一個能跑的模組：

```bash
npx create-view-tree-lsp my/hello
```

## 工作區

MAM 只複製一次，然後就在裏面工作。它不是一個把相依複製進來的資料夾：每個套件都以自己的 git 複製形式待在那裏，帶着完整歷史，所以你可以讀框架的原始碼、往裏面放一個 `debugger`，並從同一份工作副本發起 pull request。

根目錄的 `.meta.tree` 就是讓這一切成立的登錄表：

```tree
pack mol git \https://github.com/hyoo-ru/mam_mol.git
pack hyoo git \https://github.com/hyoo-ru/mam_hyoo.git
pack lib git \https://github.com/hyoo-ru/mam_lib.git
```

當建置遇到 `$mol_view` 而 `mol/` 資料夾還不存在時，它會到這裏查這個名字並複製儲存庫。沒有任何東西被 vendor 進來，也沒有任何東西被壓平。

## 套件

頂層資料夾就是一個套件，而套件就是一個 git 儲存庫。你自己的套件只是一個由你命名的資料夾：只要它還留在本機，就不需要任何登記；等到你想按名字拉取它的那天，再加一行 `pack`。

套件可以巢狀。一個套件能為自己內部的資料夾攜帶自己的 `pack` 宣告，MAM 從將要容納該套件的那個資料夾的 `meta.tree` 中讀取它們。本站位於 `bog/smalljs/`，本身就是一個儲存庫，登記在 `bog/bog.meta.tree` 裏；而後者又位於根 `.meta.tree` 所列的 `bog/` 複製之中。

### 每個套件都需要的一個檔案

會被部署的套件需要一個只有一行內容的 `.gitattributes`：

```
* -text
```

這會關掉 git 的行尾正規化。它之所以重要，是因為部署意味着把建置產物提交到某個分支，而產物不只是文字：本站帶有 57 個二進位檔案——它自行託管的字型，以及每個頁面的預覽圖。如果在入庫時被正規化，讀者拿到的就是壞掉的圖片和字型，而建置本身卻依舊是綠的。MAM 的複製在自己的根目錄裏也有同一個檔案，其中字型格式還額外標了 `binary`。

生成器會替你寫好它；在你自己起的儲存庫裏，請手動加上。

## 模組

模組就是資料夾，資料夾就是元件。這裏沒有 import 陳述式，也沒有模組對照表：類別名*本身*就是位址，而其中的每個底線都是資料夾分隔符：

```
$my_hello          →  my/hello/
$my_hello_form     →  my/hello/form/
$mol_button_major  →  mol/button/major/
$mol_after_frame   →  mol/after/frame/
```

這就是全部的解析規則。建構器掃描你的原始碼文字，找出 `$name` 記號，按 `_` 切開每一個，然後沿着資料夾走下去。沒有任何東西宣告相依；用到某個名字就是宣告。

由此帶來的實際後果：**模組資料夾名永遠不包含底線。** 名為 `my/hello_form/` 的資料夾會被去 `my/hello/form/` 找，然後永遠找不到——症狀是某個類別在編輯器裏能編譯，卻在打包結果中缺席。

有子模組的模組自己仍然可以是元件，形態有兩種。`$mol_button` 直接住在 `mol/button/` 裏，與 `major/` 和 `minor/` 並列。`$mol_view` 則往下一層，住在 `mol/view/view/`，因為 `mol/view/` 裏還放着 `component/`、`selection/` 和 `tree2/`。MAM 會先嘗試加倍的路徑，再回退到較短的那條，所以兩種佈局都能解析。

## 模組裏的檔案

每個檔案都是選用的。模組就是它恰好包含的那些檔案。

| 檔案 | 用途 |
|------|---------|
| `hello.view.tree` | 宣告式版面 |
| `hello.view.ts` | 行為：繼承生成基底類別的那個類別 |
| `hello.view.css.ts` | 帶型別的樣式。注意結尾的 `.ts`：這是呼叫 `$mol_style_define` 的 TypeScript，而不是樣式表 |
| `hello.ts` | 完全沒有視圖的模組——模型、工具函式、純邏輯 |
| `hello.test.ts` | 測試，由建構器執行 |
| `hello.locale=ru.json` | 翻譯；任何以 `.locale=<lang>.json` 結尾的檔案都會被收錄 |
| `hello.meta.tree` | 建置與部署指令 |
| `index.html` | 進入點——只有應用模組需要 |

副檔名之前的後綴把檔案限定在一個環境裏：

- `frame.web.ts`——只進瀏覽器產物，如 `mol/after/frame/frame.web.ts`
- `build.node.ts`——只進 Node 產物，如 MAM 建構器自身
- `hello.test.ts`——只進測試產物

建構器為每個應用產出一份 `web` 產物和一份 `node` 產物，並丟掉標給另一邊的檔案，所以平台相關的程式碼永遠不必在執行期自我保護。

模組旁邊也接受原始 `.css` 檔案——框架用它們來處理帶型別的樣式表達不了的少數東西，比如 `@keyframes` 和 `content:`。其餘一切都屬於 `.view.css.ts`，那裏的屬性名會被檢查。

## 生成的資料夾以短橫線開頭

只有當一個名字以字母或數字開頭時，MAM 才把它當作原始碼。其餘的對建置不可見，這正是每個生成資料夾都帶 `-` 前綴的原因：產物可以就放在它的輸入旁邊，而不會被當作輸入重新讀回去。工作區的 `.gitignore` 忽略 `-*` 也是同樣的道理。

**`-view.tree/`** 出現在任何 `.view.tree` 檔案旁邊，裝着這棵樹編譯出來的東西：

```
my/hello/-view.tree/
├── hello.view.tree.js            生成的基底類別
├── hello.view.tree.d.ts          它的帶型別介面
└── hello.view.tree.locale=en.json  抽取出來的 @ 字串
```

你的 `hello.view.ts` 繼承裏面那個類別。這就是兩個檔案之間的全部關係——[從 TypeScript 到 view.tree](#!section=docs/page=from-ts-to-view-tree) 會逐行走一遍生成的程式碼。

**`-css/`** 出現在原始 `.css` 檔案旁邊，裝着一個生成的 `.ts`，它把樣式表包進一次 `$mol_style_attach` 呼叫，於是樣式表隨產物一起走，而不需要 `<link>`。

**`-/`** 是你建置過的模組的產物目錄。對一個應用來說，裏面有 `web.js`、`web.css`、`web.audit.js`、`web.d.ts`、`web.deps.json`、每種語言各一份 `web.locale=<lang>.json`、對應的 `node` 版本、重寫過的 `index.html`，以及生成的 `package.json` 和 `manifest.json`。這個資料夾就是你要部署的東西：把 `app/-` 發佈到靜態主機，就是全部的部署步驟。

這些都不由手工編輯。只要來源變了，建構器就會重寫它們，所以在那裏做的改動會在下一次儲存時消失，而且不會有任何報錯告訴你為甚麼。改 `.view.tree`、改 `.css` 或改原始碼，然後重新建置。

## meta.tree 實際做的事

`meta.tree` 不是套件清單，也不列相依——相依來自程式碼，在那裏一個 `$mol_view` 記號本身就是完整的宣告。它承載的是程式碼自己說不出來的那少數幾件事。本站的 `app/app.meta.tree` 就是完整的檔案：

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

- **`deploy \/path`** 把一個檔案或資料夾複製進 `-/`，並保留它相對於工作區的路徑：`\/bog/smalljs/assets` 會落在 `app/-/bog/smalljs/assets/`。用於那些部署必須帶上、卻沒有程式碼去匯入的靜態檔案：圖片、字型、圖示。
- **`include \/path`** 和 **`require \/path`** 強行拉進一個沒人引用的模組，比如 `\/mol/offline/install`，它存在的全部意義就是載入時註冊的那個 service worker。兩者只在順序上有別：`require` 把模組放在拉它進來的程式碼之前，`include` 放在之後。
- **`pack <name> git \<url>`** 就是上面說的登錄表條目，從將要容納該套件的那個資料夾的 meta 檔案裏讀取。

MAM 會讀取一個資料夾裏的每一個 `*.meta.tree` 檔案，所以名字除了慣例之外不帶任何含義：模組旁邊叫 `<module>.meta.tree`，工作區根目錄叫 `.meta.tree`。

實務中 `deploy`、`include` 和 `require` 屬於應用模組，因為被建置和部署的正是它；普通元件從自己的程式碼裏就能解析出一切，根本不需要 meta 檔案。函式庫模組只有在確實存在無人引用的相依時才會拿到一個：`mol/assert/assert.meta.tree` 只有 `include \/mol/dev/format` 這一行，而這就是典型的體量。

關於這些指令的更多內容，參見[模組元資料](#!section=docs/page=meta)。

## 下一步

[安裝](#!section=docs/page=installation)講開發伺服器和生產建置，[工具鏈](#!section=docs/page=tooling)裏有一個生成器，能替你寫出正確的模組佈局。
