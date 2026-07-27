# 模組元資料

在模組的元件之外，一個 `name.meta.tree` 檔案宣告**建構和部署元資料**——這些是關於整個模組、而非某個具體視圖的內容。應用模組是放置它的常見位置。

下面是本站的 `app.meta.tree`：

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

## 指令

- **`deploy \/path`**——把指定的檔案或資料夾複製到生產建構輸出中。用於部署需要攜帶、但沒有程式碼匯入的靜態資源——圖片、字型、圖示。這裏 `\/bog/smalljs/assets` 會隨套件發出 logo 以及 `assets/` 下的其他檔案。
- **`require \/path`**——即使沒有程式碼引用某個模組，也把它強制放入套件中，用於該模組的程式碼必須在持有此 `meta.tree` 的模組程式碼**之前**執行的情況。它作為一個普通的高優先級相依被引入。模組路徑（`\/mol/wire/patch`）或單個檔案都可以。
- **`include \/path`**——同樣是強制引入，但用於載入順序無所謂的情況。模組被引入但被降低優先級，因此它在依賴它的程式碼之後載入。範例：`include \/mol/offline/install`（作為副作用註冊一個 service worker）和 `include \/bog/builderui/theme.css`（一份原始樣式表）。
- **`pack <name> git \<url>`**——把一個命名空間映射到 MAM 從中獲取它的 git 儲存庫，例如 `pack mol git \https://github.com/hyoo-ru/mam_mol.git`。`$mol_*`、`$hyoo_*` 以及你自己的套件正是透過它解析到真實程式碼的。

到底為什麼要強制引入？建構器會自動推斷相依，並只打包你的程式碼實際使用的東西。偶爾你需要一個你的程式碼*並不*引用的模組——例如一個把整套元件目錄都打包進來、以便它們在執行期存在的應用。`require` 和 `include` 恰好覆蓋這種情況；它們只在載入順序上有區別。

## 它放在哪裏

`pack` 宣告屬於**工作區根目錄**的 `.meta.tree`——那是工作區能拉取的每一個套件的登錄表。把它們放在那裏，而不是子模組裏；子模組自己的 `meta.tree` 只應攜帶對它而言特有的 `require`/`include`/`deploy`。
