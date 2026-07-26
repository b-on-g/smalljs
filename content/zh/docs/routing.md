# 路由

$mol 中的路由不是一个独立的库——URL 只是响应式状态的又一部分。读取它、写入它，视图就会像对任何单元一样作出反应。后退按钮、深层链接和可分享的 URL 都是免费附送的。

## URL 即状态

`$mol_state_arg` 将 URL 参数暴露为响应式的值。把其中一个绑定到属性上，地址栏就成了你的真相之源：

```typescript
namespace $.$$ {
	export class $my_app extends $.$my_app {
		@ $mol_mem
		page( next?: string ) {
			return $mol_state_arg.value( 'page', next ) ?? 'home'
		}
	}
}
```

读取 `page()` 返回当前值；调用 `page('about')` 进行导航。任何读取 `page()` 的东西都会在变化时重新渲染——包括浏览器的后退按钮，它会替你更新这个单元。

## 切换屏幕

把一个路由值与一个普通的 `switch` 结合起来，选择渲染什么。由于视图是[惰性的](#!section=docs/page=rendering)，你不显示的屏幕永远不会被构建：

```typescript
@ $mol_mem
body_content() {
	switch ( this.page() ) {
		case 'about': return [ this.About() ]
		case 'docs': return [ this.Docs() ]
		default: return [ this.Home() ]
	}
}
```

## 设置参数的链接

在 `view.tree` 中，链接可以声明式地设置 URL 参数——点击它便会导航，无需任何处理器：

```tree
<= About_link $mol_link
	arg *
		page \about
	sub / <= about_label \About
```

当 `$mol_link` 的参数与当前 URL 匹配时，它也会把自己标记为激活（`mol_link_current`），因此高亮当前页面无需额外的状态。

## 多个参数

参数彼此独立，所以一个屏幕可以同时按多个参数路由。正是这个文档站点同时按 `section` 和 `page` 路由：

```tree
<= Guide_link $mol_link
	arg *
		section \docs
		page \views
```

每个键都会经由 URL 往返，因此任何视图从构造上就是可分享、可加书签的。设置一个参数会让其他参数保持不变，这使得深层链接——特定的章节*和*页面*和*锚点——只是设置你在意的那些键的问题。

## 不该放进 URL 的状态

并非每一部分状态都属于地址栏。对于应当在本地保留、但不应污染链接的值——折叠的侧边栏、草稿——请使用 `$mol_state_local`，它以相同的 getter/setter 形态存储到 `localStorage`：

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

当状态应当可分享时，选择 `$mol_state_arg`；当它只需被记住时，选择 `$mol_state_local`。

## 下一步

你已经了解了 $mol 如何把状态变成 UI 和 URL。在[渲染](#!section=docs/page=rendering)中看看这一切如何高效地到达屏幕。
