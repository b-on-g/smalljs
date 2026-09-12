# 测试

$mol 的视图是它自身状态的函数，这也改变了测试的样子。一个用户场景就写成对视图自己方法的调用：设置草稿、执行动作、读取用户会看到的东西。

```typescript
app.draft( 'Milk' )
app.add()
$mol_assert_equal( app.item_title( 0 ), 'Milk' )
```

没有选择器，没有浏览器，没有 Playwright 或 Cypress，也不用等待任何东西。同一个文件还给你：

- **速度。** 测试在 Node 里以毫秒计地跑完；一千个大约一分钟。`node my/hello/-/node.test.js` 跑的是某个模块的那些测试。
- **零配置。** 组件旁边的 `hello.test.ts` 会被构建器捡起来，编译进 `-/node.test.js`。用 `mam_build` 做持续集成时会运行它，测试失败就让构建失败。
- **通过上下文替换服务。** 每个测试都拿到自己的 `$`，组件经由 `this.$.X` 取到的一切，都可以通过往那个 `$` 上赋一个测试替身来换掉。这正是要写 `this.$.$mol_fetch` 而不是 `$mol_fetch` 的理由：前者可替换，后者不可。
- **被模拟的时间。** 经由上下文创建的定时器不会自己走动；`$mol_after_mock_warp()` 会把排队的东西跑掉。
- **需要时有真实的 DOM。** Node 的打包产物自带 jsdom，所以 `dom_node()` 和 `querySelectorAll` 在同一个测试文件里就能用。

## 用视图方法走一遍场景

拿[食谱](#!section=docs/page=cookbook)里的待办列表来说：一个 `draft?` 字符串、一个 `items` 列表、一个 `add` 动作和一个 `delete` 动作。它的测试住在 `my/todo/todo.test.ts`：

```typescript
namespace $ {
	$mol_test({

		'add an item and delete it'( $ ) {
			const app = $my_todo.make({ $ })

			app.draft( 'Milk' )
			app.add()
			$mol_assert_equal( app.items().length, 1 )
			$mol_assert_equal( app.item_title( 0 ), 'Milk' )
			$mol_assert_equal( app.draft(), '' )

			app.delete( 0 )
			$mol_assert_like( app.item_rows(), [] )
		},

		'blank draft adds nothing'( $ ) {
			const app = $my_todo.make({ $ })

			app.draft( '   ' )
			app.add()
			$mol_assert_like( app.items(), [] )
		},

	})
}
```

有几点值得注意：

- 测试文件用的是 `namespace $`，不是 `$.$$`。上下文 `$` 作为参数传进来，每个测试都是全新的；组件用 `Klass.make({ $ })` 创建，于是它从那个上下文里读取服务。
- 一次点击就是一次对处理器的调用。`app.add()` 就是按钮所做的事；当你想把绑定也一并走一遍时，`app.Add().click( event )` 走的是同一条路径。
- 断言用户看到的东西：`items()`、`item_rows()`、`sub()`、某个子视图的 `title()`。透过屏幕来检查模型，还能顺带抓住从类里掉出去的覆盖，而只测模型是抓不到的。
- `$mol_assert_equal` 按同一性比较，`$mol_assert_like` 比较结构，`$mol_assert_fail( ()=> ..., 'message' )` 期待一次抛出。
- 测试的名字就是描述。函数体里没有注释。

## 模拟一个服务

每个测试都会收到一个从全局上下文派生出来的全新上下文。在创建组件之前，往那个 `$` 上的某个服务赋一个子类，组件内部的每一处 `this.$.X` 就都会解析到这个替身。下面是给[数据获取](#!section=docs/page=data)里的 `$my_users` 组件写的 fetch 替身：

```typescript
namespace $ {
	$mol_test({

		'user names come from the response'( $ ) {
			$.$mol_fetch = class extends $.$mol_fetch {
				static override json( input: RequestInfo ) {
					if( String( input ).endsWith( '/users' ) ) return [ { id: 1, name: 'Ada' } ]
					return $mol_fail( new Error( 'Unexpected request: ' + input ) )
				}
			}
			const app = $my_users.make({ $ })
			$mol_assert_like( app.user_names(), [ 'Ada' ] )
		},

	})
}
```

组件里的 `users()` 调用的是 `this.$.$mol_fetch.json( ... )`，于是请求走到了这个 mock，而值是同步就能拿到的，不需要任何等待。假如组件调用的是全局上的 `$mol_fetch.json( ... )`，这个 mock 就不会被问到。内置的 mock 已经把上下文上的全局 `fetch` 和 `XMLHttpRequest` 换成了会抛异常的代理，所以一个绕过上下文的请求会响亮地失败，而不是真的碰到网络。

同一套做法也适用于管 URL 的 `$mol_state_arg`、管存储的 `$mol_state_local`，以及你的组件从 `this.$` 里取的任何其他东西。

还有 `$mol_test_mocks`，它是一份函数清单，会在打包产物里每个测试之前对上下文执行一遍，其中也包括别的模块的测试。它是放那些处处成立的规则的地方，框架注册自己的 mock 就是这么做的：一个把交给它的东西都存下来的存储替身、一个返回空字典的语言环境，以及上面那条网络禁令。某一个组件的测试数据不属于那里。

## 时间

框架自己的测试为 `$mol_after_timeout`、`$mol_after_frame` 及其同类注册了 mock，而这些 mock 也在你的打包产物里。通过 `new this.$.$mol_after_timeout( ms, task )` 创建的定时器只是排进队列，而不是真的被调度，`$mol_after_mock_warp()` 会把这个队列跑掉。给定一个会自己消失的提示条：

```typescript
@ $mol_mem toast( next?: string ) { return next ?? '' }

@ $mol_action notify( text: string ) {
	this.toast( text )
	new this.$.$mol_after_timeout( 3000, ()=> this.toast( '' ) )
}
```

测试就手动推动时间：

```typescript
'toast hides after the timer'( $ ) {
	const app = $my_greeter.make({ $ })
	app.notify( 'Saved' )
	$mol_assert_equal( app.toast(), 'Saved' )
	$mol_after_mock_warp()
	$mol_assert_equal( app.toast(), '' )
},
```

视图里裸写的 `setTimeout` 不会被模拟，而且会活得比测试还久；这也是要通过上下文创建定时器的理由之一。

## 穿过 DOM

在 Node 的打包产物里，`$mol_dom_context` 是一个 jsdom 窗口，所以视图会渲染成真实的元素。当要检查的是标记而不是状态时，就用它：

```typescript
'greets by name'( $ ) {
	const app = $my_greeter.make({ $ })
	app.name( 'Ada' )
	$.$mol_dom_context.document.body.appendChild( app.dom_node() )
	app.dom_tree()
	$mol_assert_equal( app.Hello().dom_node().textContent, 'Hello, Ada!' )
	app.destructor()
},
```

`dom_node()` 创建元素，`dom_tree()` 渲染子树，`destructor()` 释放视图，好让它的单元不会活得比测试还久。子视图从自己的名字得到的那个属性——这里是 `[my_greeter_hello]`——就是选择器，供你在更想用 `querySelector` 而不是调用子视图的时候使用。

jsdom 缺两个输入框和手势会用到的全局对象：`ShadowRoot` 和 `PointerEvent`。缺了它们，渲染出的 `$mol_string` 会打出一个 `ReferenceError` 并保持空白，而树的其余部分照常渲染。从 jsdom 窗口把它们借过来；这是一条不含测试数据、对每个测试都成立的规则，所以它归 `$mol_test_mocks`：

```typescript
$mol_test_mocks.push( $ => {
	const win = $.$mol_dom_context
	Object.assign( globalThis, {
		ShadowRoot: win.ShadowRoot,
		PointerEvent: win.PointerEvent ?? win.MouseEvent,
	} )
} )
```

## Node 测试覆盖不到什么

几何与样式。两个块是否对齐、面板会不会溢出屏幕、深色主题读起来舒不舒服：这些在 jsdom 里统统不存在。对你动过的布局，请在浏览器里打开模块的 `-/test.html`，它会挂载应用并在那里跑同样的测试，然后亲眼看看。

## 实用提示

- **沉默就是失败。** 断言失败的测试和卡住的测试长得一模一样：没有输出，进程还活着。请在末尾找 `All tests passed`；如果它不在，先检查最后一处断言。`async` 测试有一秒的时限。
- **故意弄坏一个。** 当一次运行什么都没打印时，把某个断言反过来写，确认失败会显示出来。一套不会失败的测试什么也没有在衡量。
- **不要断言本地化的字符串。** 树里标了 `@` 的值要经过语言环境解析，而语言环境在每个全新的上下文里都会重新预热。请断言结构，而不是标签的文字。

## 下一步

[故障排查](#!section=docs/page=troubleshooting) 列出了那些让测试保持绿色、屏幕保持空白的错误，而[数据获取](#!section=docs/page=data) 展示了上面那个 mock 是为哪个组件写的。
