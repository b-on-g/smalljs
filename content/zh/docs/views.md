# 视图

视图就是一个组件：UI 树中的一个节点，拥有自己的布局、行为和样式。本章介绍视图如何声明、如何与逻辑连接、如何组合与复用。

> 第一次接触 `view.tree`：[从 TypeScript 到 view.tree](#!section=docs/page=from-ts-to-view-tree) 把同一个组件写两遍——一遍手写类，一遍树——并展示树最终编译成的代码。如果下面的语法读起来像一门新语言而不是一种简写，先看那一页。

## 三个文件，一个组件

组件 `$my_card` 位于 `my/card/`，由最多三个文件描述，每个文件职责清晰：

- `card.view.tree` —— 组件**是什么**：它的结构和默认绑定。
- `card.view.ts` —— 它**如何**运作：TypeScript 方法、响应式状态。
- `card.view.css.ts` —— 它长什么样：由编译器检查的带类型样式。

把结构、行为和样式分开是刻意为之——每个文件都保持短小易读，布局永远不会和逻辑纠缠在一起。

这三个文件没有哪一个是单独必需的。去掉 `card.view.tree`，把类直接写进 `namespace $`：结构变成普通方法，组件照样能用。本章接下来用树，因为管道由别人替你生成之后，结构看起来就是这个样子。

## view.tree 语言

`view.tree` 以声明式描述结构。缩进即嵌套；没有闭合标签。

```tree
$my_card $mol_view
	sub /
		<= Title $mol_view
			sub / <= title \
		<= Body $mol_view
			sub / <= text \
```

- `$my_card $mol_view` —— 你的组件继承自基类 `$mol_view`。
- `sub /` —— 子节点列表。
- `<= Title $mol_view` —— 一个命名子视图，在 TypeScript 中可通过 `this.Title()` 访问。
- `<= title \` —— 一个可绑定属性，带一个默认的原始字符串值（`\` 开始一个原始字符串）。

每个大写名称（`Title`、`Body`）都会成为一个真实属性，你可以访问、覆盖或为它设置样式。每个小写绑定（`title`、`text`）都会成为一个你可以在 `.view.ts` 中计算的值。

## 绑定属性

两个运算符把属性连接到它的来源：

- `<=` **单向**：子节点从所有者读取一个值。
- `<=>` **双向**：值在两个方向上流动——用于输入控件。

```tree-no-run
$my_form $mol_view
	sub /
		<= Field $mol_string
			value? <=> text? \
```

这里输入控件的 `value` 和所有者的 `text` 会自动保持同步：在字段中输入，`text` 就更新；在代码中设置 `text`，字段就反映出来。

## 连接到行为

没有默认值的绑定在 `.view.ts` 中实现。类继承自同名的生成基类：

```typescript
namespace $.$$ {
	export class $my_card extends $.$my_card {
		@ $mol_mem
		title() {
			return 'Untitled'
		}
	}
}
```

模板绑定的任何东西——`title`、`text`、某个子视图的属性——都可以在这里赋予逻辑。响应式让这些值变得鲜活。

## 属性与元素类型

用 `dom_name` 更改底层 HTML 元素，用 `attr` 设置属性：

```tree
$my_banner $mol_view
	dom_name \section
	attr *
		^
		role \note
```

`^` 会继承父级的属性，这样你就不会丢掉 `$mol_view` 已经设置的那些。

## 列表与带键视图

结尾的 `*` 把一个子视图变成一个族——每个键对应一个实例。用它来做行：

```tree
$my_list $mol_list
	rows /
		<= Row* $mol_view
			sub / <= row_title* \
```

框架会为你提供的每个键创建一个 `Row`，并且借助[虚拟化渲染](#!section=docs/page=rendering)，只构建屏幕上可见的那些。

> 当一个带键视图本身包含带键的子节点时，用 `Name*` 而不是 `Name*0` 给外层加键——带索引的形式会导致嵌套子节点不被渲染。

## 条件视图

赋值 `null` 会把一个视图从渲染中移除。派生子类并把某个变体不需要的东西置空：

```tree
$my_page_readonly $my_page
	Edit_button null
```

## 组合与复用

视图通过嵌套来组合，通过扩展来特化。一个用在列表里的卡片：

```tree
$my_user_card $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
		<= Email $mol_view
			sub / <= email \

$my_users_list $mol_list
	rows /
		<= User* $my_user_card
			name <= user_name* \
			email <= user_email* \
```

`$my_users_list` 从不重新定义卡片长什么样——它复用 `$my_user_card` 并给每个实例喂入数据。这就是整个组合模型：小视图，连接在一起，需要变体时用 `extends` 特化。

## 下一步

视图描述结构；让它们活起来的是响应式数据。继续阅读 [状态与响应式](#!section=docs/page=state)。
