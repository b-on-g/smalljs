# 来自 React、Vue 和 Svelte

如果你用 React、Vue 或 Svelte 构建过界面，你已经理解 $mol 所做的大部分事情——只是名字不同而已。这些框架优秀且流行是有充分理由的；本页是一张翻译对照表，而不是一场竞赛，帮你快速找到熟悉感。

## 概念对照

| 概念 | React | Vue | Svelte | $mol |
|------|-------|-----|--------|------|
| 组件 | 函数 / 类 | SFC（`.vue`） | `.svelte` 文件 | `.view.tree` + `.view.ts` |
| 局部状态 | `useState` | `ref` / `reactive` | `let x` | `@ $mol_mem` |
| 派生值 | `useMemo` | `computed` | `$: y = …` | `@ $mol_mem`（读取其他单元） |
| 副作用 | `useEffect` | `watchEffect` | `$: { … }` | `@ $mol_action`（显式，永不自动） |
| Props | props | props | `export let` | `view.tree` 中的绑定 |
| 事件 | `onClick` | `@click` | `on:click` | `click? <=> handler?` |
| 双向输入 | 受控输入 | `v-model` | `bind:value` | `value? <=> field?` |
| 列表 | `items.map()` | `v-for` | `{#each}` | 带键的 `Row*` |
| 条件 | `cond && …` | `v-if` | `{#if}` | 赋值 `null` 以移除 |
| 共享状态 | Redux / Context | Pinia / provide | store | 任何带 `@ $mol_mem` 的对象 |
| 路由 | React Router | Vue Router | SvelteKit | `$mol_state_arg` |
| 样式 | CSS-in-JS | 带作用域的 `<style>` | `<style>` | 带类型的 `.view.css.ts` |

## 通常会感到新鲜的地方

- **响应式是自动的，而且不可选。** 就像 Vue 的 `ref` 或 Svelte 的 `$:`，一个 `@ $mol_mem` 值会自行更新它的读取者——但没有依赖数组要维护，任何地方也没有手动订阅。
- **副作用与计算是分开的。** React 把派生和副作用都塞进 hook；$mol 把它们分开：`@ $mol_mem` 只做计算，`@ $mol_action` 执行副作用。正是这种拆分消除了大多数“为什么这运行了两次？”的谜题。
- **状态就是对象。** 没有专门的 store 库需要采用——一个共享值就是任意对象上的一个响应式属性，因此全局状态和组件状态的工作方式相同。

## 由你解决 vs. 由框架解决

更深层的差别不在于上面的词汇，而在于*谁*来解决那些反复出现的问题。在 React、Vue 或 Svelte 中，它们大多是你在每个组件里重新实现、并以各自方式弄坏的模式。在 $mol 中，它们是同一套机制的属性，因此整类工作直接消失，而不是换来一个更好用的 API。

- **状态存储** — React 中的五套存储子系统（Redux + RTK Query + `useState` + `useReducer` + Context）合并为一套：组件上的响应式字段。
- **响应式** — 别处是事后加装的（MobX、signals）；在这里它位于底层，无需任何 opt-in。
- **崩溃隔离** — 手动放置的 `<ErrorBoundary>`，对比每个组件默认自成一个边界。
- **副作用** — 横跨十几种场景的 `useEffect`/`useMemo`/deps 清单，对比一个方法（或带 action 的方法）。树上只有一个分叉，而不是十二个。
- **虚拟化** — 每个列表一个第三方组件，对比视口之外的一切根本不存在。

上面的表格只是重命名了这些概念——而在这里，$mol 真正把它们移除了。

## 试试这种翻译

内化这套对应关系最快的方法是两边都写一点：打开[游乐场](#!section=playground)，移植一个你熟悉的小组件，看看效果如何。或者从[快速上手](#!section=docs/page=getting-started)开始。
