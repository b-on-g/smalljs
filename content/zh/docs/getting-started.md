# 快速上手

本页带你从一个空文件夹走到一个可运行的响应式 $mol 应用，大约需要十五分钟。下面每段代码都是真实可用的——原样复制即可。

## 你需要什么

- **Node.js 18+** 和 **git**。就这些。

你无需安装全局 CLI，也无需生成日后还得费力理解的样板代码。$mol 应用位于 MAM 工作区内，而它已经知道如何构建和运行它们。

## 1. 获取工作区

MAM 是 $mol 的构建工具和模块注册表。克隆一次并安装：

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` 会在 `http://localhost:9080/` 启动开发服务器。它会监视你的文件并自动重新构建——让它在自己的终端里一直运行。

## 2. 创建一个模块

一个 $mol 应用就是一个文件夹。选一个命名空间（你自己的，例如 `my`）和一个名字（`hello`）：

```bash
mkdir -p my/hello
```

> **要记住的一条规则：** 组件名中的下划线是文件夹分隔符。`$my_hello` 位于 `my/hello/`，而 `$my_hello_form` 会位于 `my/hello/form/`。模块文件夹名永远不含下划线。

现在在 `my/hello/` 里添加三个文件。

### index.html — 入口点

```html
<!doctype html>
<html mol_view_root>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>
	<body mol_view_root>
		<div mol_view_root="$my_hello"></div>
		<script src="web.js"></script>
	</body>
</html>
```

`mol_view_root="$my_hello"` 属性会在页面加载时挂载你的组件。

### hello.view.tree — 布局

```tree-no-run
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

有几点值得点明：

- `$mol_page` 和 `$mol_string` 是内置组件——一个页面外壳和一个文本输入框。
- `<=` 是单向绑定；`<=>` 是双向绑定。所以 `value? <=> name?` 会让输入框与你的 `name` 状态保持同步。
- `@` 标记可本地化的字符串；`\` 开始一个原始字符串。

### hello.view.ts — 行为

```typescript
namespace $.$$ {
	export class $my_hello extends $.$my_hello {
		@ $mol_mem
		greeting() {
			const name = this.name()
			return name ? `Hello, ${name}!` : 'Please enter your name'
		}
	}
}
```

`@ $mol_mem` 让 `greeting` 成为一个响应式、带缓存的属性。它读取 `name()`，所以一旦 `name` 变化，`greeting` 就会重新计算，屏幕上的消息也随之更新。你从没写过订阅、副作用或重新渲染的调用。

## 3. 运行它

第 1 步的开发服务器已经在监视了。直接打开：

```
http://localhost:9080/my/hello/
```

输入你的名字——问候语会随你的输入而更新。这就是 $mol 的响应式：状态自行流向视图。

## 4. 添加第二个响应式值

响应式是可组合的。添加一个依赖同一个 `name` 的长度计数器，无需任何额外接线。

在 `hello.view.tree` 中，在 `Message` 下方加一行：

```tree
		<= Counter $mol_view
			sub / <= counter \
```

在 `hello.view.ts` 中，加上这个方法：

```typescript
		@ $mol_mem
		counter() {
			return `${this.name().length} characters`
		}
}
```

`greeting` 和 `counter` 都读取 `name`；两者一起更新。再加第三个、加第十个——模式都不变。这正是为什么随着功能堆叠，$mol 代码依然保持扁平。

## 5. 检查你的构建

MAM 会在每个应用旁边写一个诊断文件。构建之后，打开：

```
http://localhost:9080/my/hello/-/web.audit.js
```

干净的审计意味着没有未使用的依赖、没有类型问题、没有要修的东西。养成瞟一眼的习惯——它会在错误抵达浏览器之前就抓住它们。

## 你构建了一个 $mol 应用

你已经拥有一个响应式组件、双向绑定和派生状态——只用了三个小文件，零配置。

继续前进：**[指南](#!section=docs/page=installation)** 深入讲解安装、视图、状态、路由和数据——并把这个 Hello World 变成真正的东西。
