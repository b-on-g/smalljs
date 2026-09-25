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

用 `require` 引用一个包，MAM 会在下次构建时安装它并放进 bundle：

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

### 在运行时加载包

只有一个页面用到的重型库不必放在 `web.js` 里。把它预构建好的浏览器文件放在 bundle 旁边，首次使用时再加载。

在模块的 `meta.tree` 中列出该文件：

```tree
deploy \/node_modules/@turf/turf/turf.min.js
```

`deploy` 会在包缺失时安装它，并把文件复制到 `-/node_modules/@turf/turf/turf.min.js`，开发服务器和生产构建都一样。用 `$mol_import.script` 加载它：

```typescript
namespace $ {
	export class $my_app_turf extends $mol_object {

		@ $mol_mem
		static api() {
			$mol_import.script( './node_modules/@turf/turf/turf.min.js' )
			return ( globalThis as any ).turf as typeof import(
				'@turf/turf'
			)
		}

	}
}
```

- 路径是相对的，相对于 `-/` 中的页面解析，因此同一份代码在开发服务器、`test.html` 以及部署到子路径时都能工作。开头的 `/` 只在应用位于域名根目录时有效。
- `$mol_import.script` 会挂起 fiber 直到脚本加载完成，并按 URL 缓存：文件只获取一次，在 `$mol_mem` 中读取 `$my_app_turf.api()` 的一切只需等待它。
- 全局名称（这里是 `turf`）由库的浏览器构建指定，具体是哪个见它的 README。
- `typeof import( … )` 提供完整的类型。把包名单独放一行：构建器会把写在同一行的 `require( '…' )` 和 `import( '…' )` 当作依赖，最终还是会把整个包放进 `web.js`。

## 下一步

工作区就绪后，接下来了解 UI 本身是如何描述的——继续阅读 [视图](#!section=docs/page=views)。
