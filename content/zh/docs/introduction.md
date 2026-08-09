# 介绍

## 什么是 $mol？

$mol 是一个响应式 UI 框架：你描述界面**是什么**，框架来决定**如何**以及**何时**更新它。没有虚拟 DOM，没有手动订阅，没有 `useEffect`。你把组件写成一棵树；$mol 只渲染可见的部分，只重新计算真正发生变化的部分。

一个组件由三个文件组成：

- `name.view.tree` — 声明式布局（一种紧凑的树形语言）
- `name.view.ts` — 行为逻辑（纯 TypeScript 类）
- `name.view.css.ts` — 带类型的样式（由编译器检查）

这种分离正是核心思想：布局保持可读，逻辑保持可测，样式保持类型安全。

这三个文件没有哪一个是单独必需的。树只是结构的一种简写，那结构你也可以手写：[从 TypeScript 到 view.tree](#!section=docs/page=from-ts-to-view-tree) 把同一个组件用两种方式各写一遍，并展示树最终编译成的代码。

## 它适合谁？

- 你想要一个**小巧**的应用，并且随着它成长依然保持小巧——运行时很紧凑，渲染默认虚拟化。
- 你喜欢**处处皆类型**——连样式都由 TypeScript 检查。
- 你厌倦了手工接线响应式——$mol 中的状态像电子表格一样自动响应。

## 尝个鲜

一个完整的计数器：

```tree
$my_counter $mol_view
	sub /
		<= Count $mol_view
			sub / <= count \
		<= Increment $mol_button
			click? <=> increment?
			sub / <= label \+
```

```typescript
namespace $.$$ {
	export class $my_counter extends $.$my_counter {
		@ $mol_mem count() { return 0 }
		@ $mol_action increment() { this.count( this.count() + 1 ) }
	}
}
```

`count` 是响应式的：任何读取它的地方都会在它变化时自动重新渲染。没有 `setState`，没有依赖数组，也没有需要注册的 store。

## 接下来去哪？

想在自己的机器上跑起来吗？前往[快速上手](#!section=docs/page=getting-started)，在十五分钟内构建一个可运行的应用。
