# 状态与响应式

$mol 的状态像电子表格一样运作：你声明一个值如何计算，所有依赖它的东西都会自动更新。没有 store，没有 dispatch，没有 effect 钩子——依赖图会追踪需要重新计算的内容。

## 响应式属性

用 `@ $mol_mem` 装饰的方法是一个带缓存的响应式单元。它只运行一次，记住结果，仅当它读取过的某个值发生变化时才重新计算。

```typescript
namespace $.$$ {
	export class $my_counter extends $.$my_counter {
		@ $mol_mem count() { return 0 }

		@ $mol_mem doubled() {
			return this.count() * 2
		}
	}
}
```

`doubled` 读取了 `count`，所以它会自动订阅 `count`。改变 `count`，每个显示 `doubled` 的视图都会刷新——无需手动订阅任何东西。

## 读取与写入

一个属性既是 getter 也是 setter：不带参数调用它来读取，带一个参数调用它来写入。

```typescript
@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

## 动作与计算

这一个区别让响应式代码保持可预测：

- `@ $mol_mem` 是**纯计算**——只读取其他单元并返回一个值。
- `@ $mol_action` 是**副作用**——写入状态、网络调用和定时器都属于这里。

在 `@ $mol_mem` 内部写入单元会造成反馈循环（写入使某个依赖失效，从而重新计算，又再次写入）。$mol 会将其报告为*循环订阅*。修复方法始终相同：把副作用放在动作里，让计算保持纯净。

| 在 `@ $mol_mem` 中你可以 | 但不能 |
|---|---|
| 读取其他单元 | 写入其他单元 |
| `new SomeClass()` | `fetch()`、`await` |
| 返回一个值 | `setTimeout`、写入 DOM |

按钮处理器在基类上生成为 `@ $mol_mem`；用 `@ $mol_action` 覆盖它们，使它们能安全地写入：

```typescript
@ $mol_action
submit() {
	this.saved( true )
}
```

## 派生状态可组合

由于依赖会被自动追踪，派生值无需任何接线即可链式组合。每个都读取前一个；根部的一次变化恰好传播到需要的范围：

```typescript
@ $mol_mem full_name() {
	return `${ this.first() } ${ this.last() }`.trim()
}

@ $mol_mem greeting() {
	return this.full_name() ? `Hello, ${ this.full_name() }!` : 'Hello!'
}
```

## 带键状态

`@ $mol_mem_key` 是以键为参数的计算——每个键一个缓存单元。非常适合按行的值：

```typescript
@ $mol_mem_key
task_done( id: string, next?: boolean ) {
	const task = this.task( id )
	if ( next !== undefined ) task.Done( null )!.val( next )
	return task.Done()?.val() ?? false
}
```

## 异步只是一个值

从 `@ $mol_mem` 返回一个 promise，视图便会显示加载状态，直到它解析——无需显式的加载标志：

```typescript
@ $mol_mem
async data() {
	const res = await fetch( '/api/data' )
	return await res.json()
}
```

[数据获取](#!section=docs/page=data) 就建立在这个模式之上。

## 事件之间的瞬时状态

在 `view.tree` 中声明的状态会在不同的事件处理器之间重置（拖动/平移/手势序列），因为 $mol 将每个处理器包裹在各自的纤程中。对于必须从一个事件保留到下一个事件的值，请使用普通的 TypeScript 字段，而不是响应式属性：

```typescript
export class $my_canvas extends $.$my_canvas {
	// plain field — survives across events, not reactive
	drag_id = ''

	@ $mol_action pan_start() { this.drag_id = 'node_42' }
	@ $mol_action pan_move() { if ( this.drag_id ) { /* ... */ } }
}
```

当视图必须对该值作出反应时，使用响应式单元；当瞬时状态只被处理器读取时，使用普通字段。

## 下一步

响应式状态在可寻址时最有用——在[路由](#!section=docs/page=routing)中把它连接到 URL。
