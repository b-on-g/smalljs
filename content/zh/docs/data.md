# 数据获取

在 $mol 中加载远程数据不是一个特殊的 API——异步值只是一个恰好返回 promise 的响应式属性。视图会等待它，显示加载状态，并在它解析时重新渲染。

## 异步属性

从 `@ $mol_mem` 返回一个 promise，然后像读取任何其他值一样读取它：

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
	}
}
```

`$mol_fetch` 会挂起纤程，直到响应到达。在它处于挂起状态时，任何读取 `users()` 的视图都会自动显示内置的加载状态——你无需编写 `isLoading` 标志。

## 渲染结果

把解析后的数据直接绑定到列表中：

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

当 promise 解析时，`users()` 更新，`user_names()` 重新计算，列表随之渲染。没有回调，没有 `useEffect`。

## 重新加载

因为它只是一个响应式单元，你通过使其失效来重新获取。依赖一个你可以自增的令牌：

```typescript
		@ $mol_mem
		reload_token( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		users() {
			this.reload_token() // subscribe
			return $mol_fetch.json( 'https://api.example.com/users' ) as unknown[]
		}

		@ $mol_action
		reload() {
			this.reload_token( this.reload_token() + 1 )
		}
```

调用 `reload()` 会改变令牌，从而使 `users()` 失效，从而重新获取。

## 错误

在响应式属性内部抛出会传播到最近的视图，视图会渲染错误状态而不是内容。若要自己处理，捕获并返回一个回退值：

```typescript
		@ $mol_mem
		users_safe() {
			try {
				return this.users()
			} catch( error ) {
				if( error instanceof Promise ) throw error // still loading
				return []
			}
		}
```

重新抛出 `Promise` 是一种既让加载状态继续流动、又只捕获真正错误的方式。

## 下一步

对于无需后端就能在客户端之间持久化并同步的数据，请继续前往 [Giper Baza](#!section=docs/page=giper-baza)。
