# 安装

[快速上手](#!section=docs/page=getting-started) 会一步步带你完成第一个应用。本页是参考手册：$mol 项目如何组织，以及构建是如何工作的。

## 环境要求

- **Node.js 18+** 和 **git**。不需要全局安装其他任何东西。

## MAM 工作区

$mol 应用运行在 **MAM** 之中——它是构建工具和模块注册表。你只需克隆一次，然后在其中开发你的模块：

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` 会在 `http://localhost:9080/` 启动一个带监听的开发服务器。它在保存时重新构建，并自动解析依赖——你永远不用维护打包器配置。

## 模块如何命名

每个组件名都映射到一个文件夹路径，且**每个下划线都是文件夹分隔符**：

```
$my_app          →  my/app/
$my_app_header   →  my/app/header/
```

模块文件夹名永远不包含下划线——多词名称请使用嵌套文件夹。如果你用到的某个组件始终没有出现在打包结果中，几乎总是因为文件夹路径与类名不匹配。

## 模块剖析

一个组件就是一个文件夹，最多包含四个文件：

| 文件 | 用途 |
|------|------|
| `name.view.tree` | 声明式布局 |
| `name.view.ts` | 行为（TypeScript） |
| `name.view.css.ts` | 带类型的样式 |
| `name.view.tree`、`index.html` | 应用模块的入口 |

应用的 `index.html` 会挂载根组件：

```html
<body mol_view_root>
	<div mol_view_root="$my_app"></div>
	<script src="web.js"></script>
</body>
```

## 生产环境构建

开发服务器会即时构建，但你也可以从工作区根目录显式构建任意模块：

```bash
npm run start my/app
```

产物会输出到 `my/app/-/`——包括 `web.js`、`web.css` 和 `web.audit.js`。**务必检查审计文件：** 干净的 `web.audit.js` 意味着没有未使用的依赖，也没有类型错误。

## 添加 npm 包

用 `require` 引用一个包，MAM 会在下次构建时安装它：

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

## 下一步

工作区就绪后，接下来了解 UI 本身是如何描述的——继续阅读 [视图](#!section=docs/page=views)。
