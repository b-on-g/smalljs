# 食谱

针对几乎每个应用都会遇到的任务，提供简短、可直接复制的食谱。每一条都是真实的 $mol 代码——改一下名字就能用。

## 双向绑定的输入框

无需接线任何处理器，就让输入框和派生值保持同步：`<=>` 双向绑定，任何读取该值的计算属性都会自动更新。

```tree
$my_greeter $mol_view
	sub /
		<= Name $mol_string
			value? <=> name?
		<= Hello $mol_view
			sub / <= greeting \
```

```typescript
namespace $.$$ {
	export class $my_greeter extends $.$my_greeter {
		@ $mol_mem name( next?: string ) { return next ?? '' }

		@ $mol_mem greeting() {
			return this.name() ? `Hello, ${ this.name() }!` : 'Type your name'
		}
	}
}
```

## 可增删的列表

把集合保存在响应式属性里，并在动作中以不可变方式重写它。带键的 `Row*` 为每个条目渲染一行——得益于[虚拟化渲染](#!section=docs/page=rendering)——只有可见的行才会被构建。

```tree
$my_todo $mol_view
	draft? \
	items /
	sub /
		<= Input $mol_string
			value? <=> draft?
			hint \New item
		<= Add $mol_button_major
			click? <=> add?
			sub / <= add_label \Add
		<= List $mol_list
			rows <= item_rows /
	Row* $mol_row
		sub /
			<= Label* $mol_view
				sub / <= item_title* \
			<= Delete* $mol_button_minor
				click? <=> delete*?
				sub / <= delete_label \✕
```

```typescript
namespace $.$$ {
	export class $my_todo extends $.$my_todo {
		@ $mol_mem draft( next?: string ) { return next ?? '' }
		@ $mol_mem items( next?: readonly string[] ) { return next ?? [] }

		@ $mol_action add() {
			const title = this.draft().trim()
			if( !title ) return
			this.items([ ... this.items(), title ])
			this.draft( '' )
		}

		@ $mol_action delete( id: number ) {
			this.items( this.items().filter( ( _, i ) => i !== id ) )
		}

		item_title( id: number ) { return this.items()[ id ] }

		item_rows() {
			return this.items().map( ( _, id ) => this.Row( id ) )
		}
	}
}
```

## 带加载与错误状态的数据获取

异步值只是一个返回 promise 的响应式属性。`$mol_fetch` 在请求进行期间挂起纤程，因此任何读取它的视图都会显示内置的加载状态——而失败的请求会浮现为错误状态。你不必写任何 `isLoading` 标志，也不必写 `try`/`catch`。

```typescript
namespace $.$$ {
	export class $my_users extends $.$my_users {
		@ $mol_mem
		users() {
			return $mol_fetch.json( 'https://api.example.com/users' ) as {
				id: number
				name: string
			}[]
		}

		@ $mol_mem
		names() {
			return this.users().map( user => user.name )
		}
	}
}
```

## 持久化本地状态

对于需要熬过刷新、但不该污染 URL 的状态——折叠的侧边栏、草稿、偏好设置——用 `$mol_state_local`。它与任何响应式属性有相同的取值/赋值形态，并存入 `localStorage`。

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

## 读写路由参数

要让一个值可分享、可加书签，改用 `$mol_state_arg` 作为其后端。读取返回当前 URL 值；传入参数即导航，浏览器的后退按钮会替你更新该单元。

```typescript
@ $mol_mem
page( next?: string ) {
	return $mol_state_arg.value( 'page', next ) ?? 'home'
}
```

`$mol_link` 可以声明式地设置同一个参数，于是普通一次点击就能导航，无需处理器：

```tree
<= Home_link $mol_link
	arg *
		page \home
	sub / <= home_label \Home
```

按路由值切换屏幕的方法，参见[路由](#!section=docs/page=routing)。

## 添加自动的浅色/深色主题

把 `$mol_theme_auto` 作为[插件](#!section=docs/page=plugins)挂上——一个没有自身元素的组件，列在 `plugins /` 下。它跟随操作系统偏好，为宿主子树应用浅色或深色主题，而不会用任何东西包裹你的布局。

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
	sub /
		<= Content $my_content
```

## 下一步

想现场试试？打开[演练场](#!section=playground)粘贴任意一条食谱，或跟着 [Getting Started](#!section=docs/page=getting-started) 走一遍，搭出一个完整的应用。
