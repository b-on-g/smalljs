# 部署

构建好的 $mol 应用就是一个静态文件目录。没有服务要跑，没有 Node 进程要守着，也没有适配器要挑：能托管一个目录的地方，就能托管这个应用。

## 你部署的到底是什么

构建把所有东西写进模块里的 `-/` 目录：

```
my/hello/-/
├── index.html                 按部署路径重写过
├── web.js                     整个应用，一个文件
├── web.css
├── web.locale=en.json         每种语言一个
├── manifest.json
└── …                          `deploy` 指令拷进来的任何东西
```

这个目录就是网站。用任何静态托管把它发出去，应用就跑起来了。

`my/hello/` 里的其他东西都是源码，而 `-/` 是生成的：工作区的 `.gitignore` 忽略 `-*`，所以构建产物从不进入项目自己的历史。它是从部署分支上网的。

## 最短的版本

脚手架会写好工作流，所以新项目一推送就发布：

```bash
npx create-view-tree-lsp my/hello
git push
```

`.github/workflows/deploy.yml` 构建模块，并把 `my/hello/-/` 推到 `gh-pages` 分支。只要 **Settings → Pages → Source** 是 *Deploy from a branch* 并选中 `gh-pages`，GitHub 就会提供这个分支——而对已经有该分支的仓库来说，这正是默认值。如果地址返回 404，先查这一项。

之后网站就住在 `https://<user>.github.io/<repo>/`。

## 工作流到底做了什么

两个 action 撑起全部，各自只要几个输入：

```yaml
- uses: hyoo-ru/mam_build@master2
  with:
      package: "my/hello"     # 要构建的目录，相对工作区
      modules: "app"          # 其中的哪些模块

- uses: hyoo-ru/gh-deploy@v4.4.1
  if: github.ref == 'refs/heads/main'
  with:
      folder: "my/hello/app/-"
```

`mam_build` 在你的包周围铺开 MAM 工作区，把代码里的 `$name` 记号解析成存放它们的仓库，然后构建。它不需要 lockfile，也不需要 `npm install` 这一步：依赖清单就是 `.meta.tree` 里的登记表，[项目结构](#!section=docs/page=structure)已经讲过。

`gh-deploy` 把构建好的目录提交到 `gh-pages`。`target-folder` 让它落在子目录而不是根目录——分支预览就是这么来的：

```yaml
- name: Deploy feature branch
  if: startsWith(github.ref, 'refs/heads/feature/')
  uses: hyoo-ru/gh-deploy@v4.4.1
  with:
      folder: "my/hello/app/-"
      target-folder: ${{ github.ref_name }}
```

于是每个 `feature/*` 分支在同一个 Pages 站点上都有自己的地址，而 `delete` 触发器会在分支消失时清掉那个目录。

## 部署离不开的一个文件

要发布的包，旁边需要一个只有一行的 `.gitattributes`：

```
* -text
```

部署就是把构建产物提交到一个分支，而产物不只是文本。字体和图片在进入这次提交的路上被规范化，到读者那里就是坏的，而构建本身照样是绿的。脚手架会写好这个文件；自己开的仓库，请手动补上。

## 必须待在站点根目录的文件

`meta.tree` 里的 `deploy \/path` 把文件拷进 `-/`，并**保留它相对工作区的路径**。对代码引用的资源来说这是对的，对托管方要在根目录找的文件来说就不对了。`CNAME`、`robots.txt`、搜索资源平台的验证页：这些要在构建之后、部署步骤之前，用一个工作流步骤拷过去。

```yaml
- name: Copy root-level files
  run: cp my/hello/public/CNAME my/hello/app/-/CNAME
```

## 静态托管上的深链接

使用路径路由的应用（`/section=docs/page=views` 而不是 `#!section=docs`）只向托管方要一件事：挂载点下任何未知路径都必须返回应用的 `index.html`。否则深链接的第一次访问就是 404，只有从首页点进去才管用。

GitHub Pages 没有重写规则，所以路要绕它的 `404.html`：任何未知路径都会拿到它，而里面几行代码把地址交还给 `index.html`，再由路由器展开成真正的路由。像上面那些文件一样，把它拷到构建产物旁边。

别的托管一行就说清了：nginx 里 `try_files $uri /index.html`，Caddy 里 `try_files {path} /index.html`，Netlify 上一条 `/* /index.html 200`。

用哈希路由（默认那个）的应用完全不需要这些：`#` 之后的一切根本到不了服务器。

## 推送前先看一眼

本地和 CI 的构建是同一套，所以本地审计是绿的，部署就是绿的：

```bash
npx mam my/hello/app
cat my/hello/app/-/web.audit.js
```

`Audit passed` 就是全部报告。想看真东西，用任意静态服务器把目录发出去：

```bash
npx serve my/hello/app/-
```

## 不止 GitHub Pages

上面这些都不是 GitHub 专属。产出是一个目录，部署就是一次拷贝。Netlify、Cloudflare Pages、CDN 后面的 S3、VPS 上的 nginx、把目录装进去的 Docker 镜像——构建这一步还是 `npx mam my/hello/app`，你上传的还是 `my/hello/app/-`。

想要能离线的安装版，[离线](#!section=docs/page=offline)会加上缓存 bundle 的 service worker，同一个目录就变成可安装的应用。
