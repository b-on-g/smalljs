# 部署

建置好的 $mol 應用就是一個靜態檔案目錄。沒有服務要跑，沒有 Node 行程要守著，也沒有轉接器要挑：能託管一個目錄的地方，就能託管這個應用。

## 你部署的到底是什麼

建置把所有東西寫進模組裡的 `-/` 目錄：

```
my/hello/-/
├── index.html                 按部署路徑改寫過
├── web.js                     整個應用，一個檔案
├── web.css
├── web.locale=en.json         每種語言一個
├── manifest.json
└── …                          `deploy` 指令複製進來的任何東西
```

這個目錄就是網站。用任何靜態託管把它送出去，應用就跑起來了。

`my/hello/` 裡的其他東西都是原始碼，而 `-/` 是產生的：工作區的 `.gitignore` 忽略 `-*`，所以建置產物從不進入專案自己的歷史。它是從部署分支上網的。

## 最短的版本

鷹架工具會寫好工作流程，所以新專案一推送就發佈：

```bash
npx create-view-tree-lsp my/hello
git push
```

`.github/workflows/deploy.yml` 建置模組，並把 `my/hello/-/` 推到 `gh-pages` 分支。只要 **Settings → Pages → Source** 是 *Deploy from a branch* 並選了 `gh-pages`，GitHub 就會提供這個分支——而對已經有該分支的儲存庫來說，這正是預設值。如果網址回 404，先查這一項。

之後網站就住在 `https://<user>.github.io/<repo>/`。

## 工作流程到底做了什麼

兩個 action 撐起全部，各自只要幾個輸入：

```yaml
- uses: hyoo-ru/mam_build@master2
  with:
      package: "my/hello"     # 要建置的目錄，相對工作區
      modules: "app"          # 其中的哪些模組

- uses: hyoo-ru/gh-deploy@v4.4.1
  if: github.ref == 'refs/heads/main'
  with:
      folder: "my/hello/app/-"
```

`mam_build` 在你的套件周圍鋪開 MAM 工作區，把程式裡的 `$name` 記號解析成存放它們的儲存庫，然後建置。它不需要 lockfile，也不需要 `npm install` 這一步：相依清單就是 `.meta.tree` 裡的登記表，[專案結構](#!section=docs/page=structure)已經講過。

`gh-deploy` 把建置好的目錄提交到 `gh-pages`。`target-folder` 讓它落在子目錄而不是根目錄——分支預覽就是這麼來的：

```yaml
- name: Deploy feature branch
  if: startsWith(github.ref, 'refs/heads/feature/')
  uses: hyoo-ru/gh-deploy@v4.4.1
  with:
      folder: "my/hello/app/-"
      target-folder: ${{ github.ref_name }}
```

於是每個 `feature/*` 分支在同一個 Pages 站台上都有自己的網址，而 `delete` 觸發器會在分支消失時清掉那個目錄。

## 部署離不開的一個檔案

要發佈的套件，旁邊需要一個只有一行的 `.gitattributes`：

```
* -text
```

部署就是把建置產物提交到一個分支，而產物不只是文字。字型和圖片在進入這次提交的路上被正規化，到讀者那裡就是壞的，而建置本身照樣是綠的。鷹架工具會寫好這個檔案；自己開的儲存庫，請手動補上。

## 必須待在站台根目錄的檔案

`meta.tree` 裡的 `deploy \/path` 把檔案複製進 `-/`，並**保留它相對工作區的路徑**。對程式引用的資源來說這是對的，對託管方要在根目錄找的檔案來說就不對了。`CNAME`、`robots.txt`、搜尋主控台的驗證頁：這些要在建置之後、部署步驟之前，用一個工作流程步驟複製過去。

```yaml
- name: Copy root-level files
  run: cp my/hello/public/CNAME my/hello/app/-/CNAME
```

## 靜態託管上的深連結

使用路徑路由的應用（`/section=docs/page=views` 而不是 `#!section=docs`）只向託管方要一件事：掛載點下任何未知路徑都必須回傳應用的 `index.html`。否則深連結的第一次造訪就是 404，只有從首頁點進去才管用。

GitHub Pages 沒有重寫規則，所以路要繞它的 `404.html`：任何未知路徑都會拿到它，而裡面幾行程式把網址交還給 `index.html`，再由路由器展開成真正的路由。像上面那些檔案一樣，把它複製到建置產物旁邊。

別的託管一行就說清了：nginx 裡 `try_files $uri /index.html`，Caddy 裡 `try_files {path} /index.html`，Netlify 上一條 `/* /index.html 200`。

用雜湊路由（預設那個）的應用完全不需要這些：`#` 之後的一切根本到不了伺服器。

## 推送前先看一眼

本機和 CI 的建置是同一套，所以本機稽核是綠的，部署就是綠的：

```bash
npx mam my/hello/app
cat my/hello/app/-/web.audit.js
```

`Audit passed` 就是全部報告。想看真東西，用任意靜態伺服器把目錄送出去：

```bash
npx serve my/hello/app/-
```

## 不只 GitHub Pages

上面這些都不是 GitHub 專屬。產出是一個目錄，部署就是一次複製。Netlify、Cloudflare Pages、CDN 後面的 S3、VPS 上的 nginx、把目錄裝進去的 Docker 映像——建置這一步還是 `npx mam my/hello/app`，你上傳的還是 `my/hello/app/-`。

想要能離線的安裝版，[離線](#!section=docs/page=offline)會加上快取 bundle 的 service worker，同一個目錄就變成可安裝的應用。
