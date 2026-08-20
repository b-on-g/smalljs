# 工具链

$mol 在任何编辑器中都能工作，但一小套工具能让 `.view.tree` 和带类型的样式舒适得多：一个项目脚手架、一个语言服务器、面向 Zed 和 VS Code 的编辑器集成，以及一个把框架教给 LLM 助手的技能。

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

## 翻译

翻译文件跟自己的模块放在一起，位于 `<模块>/<名称>.locale=<lang>.json`。这对代码很方便，对译者却不然：他拿到的不是一份句子清单，而是三十个零碎文件。

**[$yuf_localizer](https://zerkalica.github.io/yuf/#!demo=yuf_localizer_demo)** 正是为此而生。把项目地址和语言代码告诉它，它就会把所有键汇成一份可搜索的列表，并标出尚未处理的部分：只有英文的键、改动过但还没提交的键，以及项目中已不存在的过期键。译文保存在浏览器里，直到你导出为止，因此两次会话之间不会丢失。

译者完成后，导出结果并把它拆回各个模块：

```bash
# 在 MAM 根目录下执行
npx view-tree-lsp locale bog/myapp/app/- --exclude=mol --update
```

参数可以是目录，也可以是单个语言文件。选项：

- `--include=` 接受一段路径片段，只保留路径中包含它的模块；可以重复任意多次
- `--exclude=` 则相反，跳过这些模块 — `--exclude=mol` 可让框架自身的包保持原样
- `--update` 合并进已有文件：来源中的值优先，来源中没有的键保留不动
- `--dry` 只打印计划，不写入任何内容

每个键自身带着所属模块的路径，所以 `$my_page_greeting` 会落到 `my/page/page.locale=ru.json`，就在它所属的源码旁边。不过要算出这个模块，比看上去更微妙：`_` 既分隔目录也分隔单词，因此「最长匹配路径」是错误答案。`$my_page_lang_hint` 的属性名以 `lang` 开头，若旁边真的存在 `my/page/lang` 子模块，这个键就会被它吞掉。因此该命令会逐个询问候选模块声明了哪些键——MAM 正是把这些键写进它在 `-view.tree` 下的语言文件——再把键交给真正的归属者。

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

## LLM 技能

`mol_skill` 为 AI 助手补上写 $mol 所需的上下文：`view.tree` 语法、MAM 模块结构、`view.ts` 与 `view.css.ts` 的分工、Giper Baza 的数据建模，以及 Tauri 打包。它就是一个普通的技能目录，一份 `SKILL.md` 工作流加上若干参考文档，因此任何能读 skills 格式的 LLM 工具都可以加载它，包括 Claude Code 和 Cursor。用 skills CLI 安装：

```bash
npx skills add b-on-g/mol_skill --all -g
```

之后用自己的话提问（“MAM 模块结构”“Giper Baza 的 CRUD 和角色”），助手会在回答前打开对应的参考文档，写出的代码也就遵循本文档中的约定。[源码](https://github.com/b-on-g/mol_skill)在 GitHub 上；如果你更想自己读，这些参考文档单独看也很完整。

## 链接

- 脚手架 — [create-view-tree-lsp](https://github.com/Dev-cmyser/create-view-tree-lsp)
- 语言服务器 — [view-tree-lsp](https://github.com/Dev-cmyser/view.tree)
- Zed 扩展 — [zed-view.tree-mol-support](https://github.com/Dev-cmyser/zed-view.tree-mol-support)
- LLM 技能 — [mol_skill](https://github.com/b-on-g/mol_skill)
