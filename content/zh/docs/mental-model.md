# 心智模型

如果你从 React 或 Vue 过来，在 $mol 的头几天多半会花在寻找那些根本不存在的东西上：`computed`、`watch`、`useEffect`、`onMounted`、生命周期钩子里的 `fetch`。它们不是被藏在 API 的某个角落，而是这套模型里压根没有它们的位置。本页是这套模型的五分钟版本。请在读[视图](#!section=docs/page=views)之前先看它，日后每当一个熟悉的名字不见了，就回来翻翻。

## 拉取，而非推送

在有人读取之前，什么都不会被计算。视图通过读取自己的属性来渲染；每个属性再读取它需要的东西；依赖链就从这些读取中自行装配起来。没有订阅要声明，也没有 `watch` 要注册：读取本身就是订阅。

```tree
$my_profile $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
```

```typescript
namespace $.$$ {
	export class $my_profile extends $.$my_profile {
		@ $mol_mem
		user() {
			return this.$.$mol_fetch.json( 'https://api.example.com/me' ) as { name: string }
		}
		name() {
			return this.user().name
		}
	}
}
```

渲染 `Name` 会读取 `name()`，`name()` 读取 `user()`，`user()` 发出网络请求。没有人告诉视图有这个请求，也没有人告诉请求有这个视图。当 `user()` 变化时，读取过它的一切都会重新计算，别的什么都不会。

## 没有生命周期

没有 `mounted`，没有 `useEffect`，也没有 `created`。数据是靠读取一个属性来请求的，而视图在渲染时会读取自己的属性。所以上面的例子会在 `$my_profile` 出现在屏幕上的那一刻加载用户，不会更早。当视图离开屏幕，就再没有人读取 `user()`，那个单元会随视图一起被释放。

这就是“在 mount 时 fetch”这一模式的全部替代品：视图索取它需要的东西，框架决定何时去要。加载不是挂在页面事件上的，而是挂在“是否可见”上的。

## 属性就是一个单元

一个带可选参数的方法，同时是 getter、setter、计算值和状态：

```typescript
@ $mol_mem
count( next?: number ) {
	return next ?? 0
}
```

不带参数调用它就是读取，带一个参数调用它就是写入。`@ $mol_mem` 把方法变成一个带缓存的单元，当它读取过的东西发生变化时重新计算。所谓计算值，不过是一个读取了其他方法的 `@ $mol_mem` 方法。watcher 是不需要的：副作用属于事件，而事件处理器就是一个标了 `@ $mol_action` 的方法。

```typescript
@ $mol_mem
doubled() {
	return this.count() * 2
}

@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

[状态与响应式](#!section=docs/page=state) 讲清了这两者各自内部允许发生什么。

## 会等待的同步代码

上面的 `user()` 看起来是同步的，写起来就像响应已经摆在那里了。它之所以行得通，是因为每次计算都跑在一条纤程里。`this.$.$mol_fetch.json()` 会挂起那条纤程，等响应到达后框架再重启这次计算。在那之前，读取了 `user()` 的视图显示加载状态；如果请求失败，同一个视图显示错误。你既不用写 `isLoading` 标志，也不用写 `try`/`catch`。

同一套机制服务于任何异步来源。[数据获取](#!section=docs/page=data) 会逐步讲解重新加载与错误处理。

## 一切都是覆盖

一个 `view.tree` 文件就是一份方法声明清单。组件下面的每一行都是这个组件的一个属性，带着默认值；而任何嵌套组件的属性，都可以就在它被使用的地方、用一行重新定义。文本输入框的 placeholder 就是 `$mol_string` 的 `hint` 属性：

```tree
$my_search $mol_view
	sub /
		<= Query $mol_string
			hint \Search
			value? <=> query? \
```

没有 prop 清单要扩展，没有包装组件要写，也没有分叉要维护。只要组件有这个属性，你就能从外面设置它。

## 如何阅读源码

上一节引出了真正的问题：你怎么知道这个属性叫 `hint`？答案是去看，而这个框架的构造本身就让“去看”变得廉价。

**框架的源码就在你的源码旁边。** 在 MAM 工作区里，`mol/string/string.view.tree` 离 `my/hello/` 只隔一个文件夹。它不在 `node_modules` 里，也不在某个打包产物里；它和你自己写的文件是同一种东西。

**类名就是路径。** `$mol_string` 住在 `mol/string/`，`$mol_button_major` 住在 `mol/button/major/`。每个下划线都是一个文件夹分隔符，所以你树里的任何一个名字都能还原成一个可以打开的文件夹。[工具链](#!section=docs/page=tooling)页面介绍的编辑器支持会替你补全这些名字。

**组件的 `.view.tree` 就是它全部属性的清单，连同默认值。** 值的形态告诉你类型：`\` 开始一个字符串，`/` 是列表，`*` 是字典，裸数字就是数字，`true` 和 `false` 是布尔值，`null` 表示缺省，而 `<=` 引入一个子视图，或一个取自所有者的属性。下面是 `mol/string/string.view.tree` 中与输入框有关的那部分：

```tree
$mol_string $mol_view
	dom_name \input
	enabled true
	field *
		^
		disabled <= disabled false
		value <= value_changed? <=> value? \
		placeholder <= hint_visible <= hint \
	attr *
		^
		type <= type? \text
```

把它念出来。`dom_name \input`：这个组件渲染成一个 `input` 元素。`enabled true`：一个布尔属性，默认开启。`field *` 是 DOM 元素字段的字典；左边的名字属于 DOM，右边的名字属于组件，而最右边那个才是你要设置的。于是 DOM 的 `placeholder` 来自 `hint`，默认是空字符串；DOM 的 `value` 是可写的 `value?` 属性，而 `type` 属性是可写的 `type?`，默认为 `text`。于是在你的树里，一个 placeholder、一个禁用的输入框和一个密码框，分别就是 `hint`、`enabled false` 和 `type \password`。

**带类型的接口由同一棵树生成。** `mol/string/-view.tree/string.view.tree.d.ts` 用 TypeScript 签名列出同样的属性，而本站的 [API 参考](#!section=docs/page=api-mol-string) 就是从那个文件产出的。三者一致，因为三者同源。

**大多数组件都自带 `demo/` 文件夹和 `readme.md`。** `mol/string/demo/demo.view.tree` 展示了带 hint 的、禁用的、以及带预设值的输入框。当你需要某个组件处于某种状态时，找到最接近的那个 demo，把那一行抄过来。

合起来，搞定一个 placeholder 大约一分钟：

```bash
ls mol | grep string
cat mol/string/string.view.tree
```

你在 `$mol_string` 下面看到 `hint \`，于是在你自己的 `$mol_string` 下面写上 `hint \Search`。

## 命名

一切都是 `snake_case`：`view.tree` 里的属性名、TypeScript 里的方法名、框架为了样式而挂到 DOM 节点上的属性。子视图以大写字母开头（`Query`），值以小写字母开头（`query`）。

树里的名字和类里方法的名字必须逐字母一致。树里的 `exchange_form` 和类里的 `exchangeForm` 是两个毫不相干的属性：类里的那个永远不会被读取，树里的那个保持默认值，而且没有任何错误提示你。当某个覆盖看起来毫无作用时，这是第一个要检查的地方。[故障排查](#!section=docs/page=troubleshooting) 列出了这一条，以及其他屏幕不对而编译器沉默的情况。

## 下一步

模型立住之后，[视图](#!section=docs/page=views) 讲组件如何声明与组合，而[来自 React、Vue 和 Svelte](#!section=docs/page=rosetta) 把你已经熟悉的名字对应到这里的名字上。
