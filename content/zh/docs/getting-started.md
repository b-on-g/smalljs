# 快速上手

本页带你从一个空文件夹走到一个可运行的响应式 $mol 应用，大约需要十五分钟。下面每段代码都是真实可用的——原样复制即可。

组件你会用普通的 TypeScript 写。$mol 还有一种更短的组件描述格式 `view.tree`，下一页你就会遇到它。这里用不上：无论哪种写法，$mol 组件都只是一个普通的类。

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

现在在 `my/hello/` 里添加两个文件。

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

### hello.view.ts — 组件

```typescript
namespace $ {

	export class $my_hello extends $mol_page {

		title() {
			return 'Greeting'
		}

		body() {
			return [ this.Name(), this.Message() ]
		}

		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}

		@ $mol_mem
		name( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.greeting() ]
			return obj
		}

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

从上往下读：

- `$my_hello` 位于 `namespace $`，也就是承载所有 $mol 组件的环境命名空间。它继承 `$mol_page`，一个自带标题和主体的内置页面外壳。下面的 `$mol_string` 是内置的文本输入框。
- `body()` 返回子组件。这里的子组件不是标记，而是属性：`Name` 和 `Message` 都是方法，你可以调用它们、在子类里覆盖它们，或者在样式表里按名字选中它们。
- `Name()` 创建输入框并把它接上。它的每个属性拿到的是一个**箭头函数**，而不是一个值。子组件需要数据时才去调用这个箭头，因此读到的总是当前值。
- `name( next?: string )` 是状态。不带参数调用是读，带参数调用是写。正是把这整个函数交给 `obj.value`，才让在输入框里打字能更新 `name`。
- `@ $mol_mem` 按实例缓存一个属性。用在 `name` 上，意味着值会被保存下来，读过它的一切都会在它变化时重新计算。用在 `Name` 和 `Message` 上，意味着子组件只创建一次，而不是每次调用都新建一个。
- `greeting()` 读取 `name()`。这一次读取*就是*订阅。`name` 变了，`greeting` 就重新计算，屏幕上的文字随之改变；不用声明副作用，不用写依赖数组，也不用调用重渲染。

## 3. 运行

第 1 步启动的开发服务器已经在监视了。直接打开：

```
http://localhost:9080/my/hello/
```

输入你的名字，问候语会随你的输入而更新。这就是 $mol 的响应式：状态自行流向视图。

## 4. 添加第二个响应式值

响应式是可组合的。添加一个读取同一个 `name` 的长度计数器，无需任何额外接线。

把它放进 `body()`：

```typescript
		body() {
			return [ this.Name(), this.Message(), this.Counter() ]
		}
```

再补上它背后的两个属性：

```typescript
		@ $mol_mem
		Counter() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.counter() ]
			return obj
		}

		counter() {
			return `${ this.name().length } characters`
		}
```

`greeting` 和 `counter` 都读取 `name`，两者一起更新。再加第三个、加第十个：响应式的这一半永远不变形。

另一半会变。三行逻辑带来了六行管道——一个工厂、一个 `new`、一个箭头、一个 `return obj`。把它乘以真实界面上的每一个子组件，你就得到了 `view.tree` 存在的理由。

## 5. 检查你的构建

MAM 会在每个应用旁边写一个诊断文件。构建之后，打开：

```
http://localhost:9080/my/hello/-/web.audit.js
```

干净的审计意味着没有未使用的依赖、没有类型问题、没有要修的东西。养成瞟一眼的习惯——它会在错误抵达浏览器之前就抓住它们。

## 你构建了一个 $mol 应用

一个带双向绑定和派生状态的响应式组件，写在一个文件里，零配置。

现在拿这同一个文件，看它如何缩小：**[从 TypeScript 到 view.tree](#!section=docs/page=from-ts-to-view-tree)**。
