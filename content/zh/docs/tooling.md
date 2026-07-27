# 工具链

$mol 在任何编辑器中都能工作，但一小套工具能让 `.view.tree` 和带类型的样式舒适得多：一个项目脚手架、一个语言服务器，以及面向 Zed 和 VS Code 的编辑器集成。

## 脚手架生成项目

`create-view-tree-lsp` 生成一个开箱即用的 $mol 模块，这样你就不必手工拼装样板代码：

```bash
npx create-view-tree-lsp bog/myapp
```

参数是模块路径（`namespace/name`，或等价的 `bog_myapp`）。它会为一个可运行的应用写出 `view.tree`、`view.ts`、`view.css.ts` 和 `index.html`，外加用于部署的 GitHub Actions。默认情况下，它还包含一个 local-first 存储 **Giper Baza**、一套 **Docker** 配置和一个 **Tauri** 桌面外壳。任意一项都可以用标志关闭：

```bash
npx create-view-tree-lsp bog/myapp --no-baza --no-docker --no-tauri
```

相反，还有几项是按需启用的：

- `--backend` 添加一个 `$mol_server` REST 后端，配有 `node:sqlite` 存储和共享的 TypeScript item 类型
- `--prerender` 和 `--seo` 添加搜索引擎可见性，详见下文的 [持续集成](#!section=docs/page=tooling/Docs.Body=%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90)

脚手架只是语言服务器中 CLI 的一层薄封装，所以 `npx view-tree-lsp create bog/myapp` 会直接做同样的事。

## 持续集成

脚手架会把 GitHub Actions 写入 `.github/workflows/`，于是新项目无需额外配置即可部署和发布。

`deploy.yml` 在每次 push 时运行。它用 `hyoo-ru/mam_build` 构建应用，从 `main` 把 `app/-` 发布到 **GitHub Pages**，并给每个 `feature/*` 分支各自的预览文件夹——分支被删除时会自动移除。

### SEO

两个独立选项，都由 `v*` 标签触发：

- **`--prerender`** 用 `b-on-g/mol-prerender-action` 把你列出的屏幕（例如 `home`）渲染成静态 HTML，这样爬虫和链接预览就能看到真实内容。
- **`--seo`** 添加 `$bog_seo` 运行时：一个基于 pathname 的路由器，带有站点地图、`robots.txt`、`llms.txt` 以及每页的 meta 注入。该任务会服务构建产物，导出规范的预渲染 HTML，并将其折回部署中。

当少数公开屏幕需要可爬取时，选用 prerender action；当你需要站点地图和每页元数据时，选用 `$bog_seo`。

### Tauri 桌面

启用 Tauri 选项后，`tauri.yml` 会通过可复用工作流 `b-on-g/tauri-mol-workflow-template`，在 `v*` 标签上（或按需）从你部署到 Web 的同一个模块构建桌面二进制文件。

## 语言服务器

`view-tree-lsp` 是针对 `view.tree` 格式的 Language Server Protocol 实现。用 npx 按需运行，无需全局安装：

```bash
npx view-tree-lsp@latest
```

它扫描你的工作区，为任何支持 LSP 的编辑器提供：

- 对 `$mol_*` 组件，以及你自己项目中定义的组件和属性的补全
- 限定在光标所在组件范围内的属性建议
- 用于导航的组件声明大纲
- 随文件变化的实时更新

因为它讲 LSP，你可以把任何编辑器的语言客户端指向 `npx view-tree-lsp`。下面两个集成会替你接好。

## Zed

**View Tree Syntax Highlighting for $mol** 扩展打包了 tree-sitter 语法、语言服务器和一个可选的图标主题。从 Zed 的扩展管理器安装：

1. 打开命令面板（`Cmd+Shift+P` / `Ctrl+Shift+P`）
2. 运行 **zed: extensions**
3. 搜索 `view.tree` 或 `mol` 并安装该扩展

你会获得 `.view.tree` 文件的语法高亮、补全和大纲。[源码](https://github.com/Dev-cmyser/zed-view.tree-mol-support) 和配套的 [图标主题](https://github.com/Dev-cmyser/zed-viewtree-icon-theme) 都在 GitHub 上。

## VS Code

MAM 工作区已经自带 VS Code 配置。当你打开克隆下来的 `mam` 文件夹时，VS Code 会提示从 `.vscode/extensions.json` 安装推荐扩展：

- `nin-jin.vscode-language-tree` — `view.tree` 语言支持
- `stan-donarise.view-tree-language` — 语法和文法
- `editorconfig.editorconfig` — 一致的格式化

同一个文件夹还附带 `mol.code-snippets`，因此组件和绑定的代码片段无需任何额外配置即可使用。接受提示后，`.view.tree` 和 TypeScript 文件便开箱即用地高亮显示。

## 链接

- 脚手架 — [create-view-tree-lsp](https://github.com/Dev-cmyser/create-view-tree-lsp)
- 语言服务器 — [view-tree-lsp](https://github.com/Dev-cmyser/view.tree)
- Zed 扩展 — [zed-view.tree-mol-support](https://github.com/Dev-cmyser/zed-view.tree-mol-support)
