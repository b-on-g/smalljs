# Data Fetching

Loading remote data in $mol is not a special API — an async value is just a reactive property written as if the response were already there. The view waits for it, shows a loading state, and re-renders when the data arrives.

## An async property

Call the network inside a `@ $mol_mem` and return the parsed result. There is no promise, no `await` and no callback in the code:

```typescript
namespace $.$$ {
	export class $my_users extends $.$my_users {
		@ $mol_mem
		users() {
			return this.$.$mol_fetch.json( 'https://api.example.com/users' ) as {
				id: number
				name: string
			}[]
		}
	}
}
```

`$mol_fetch` suspends the fiber until the response arrives, then the computation restarts and `users()` returns the array. While it is pending, any view that reads `users()` automatically shows the built-in loading state — you write no `isLoading` flag. Do not return a promise from a `@ $mol_mem` yourself: a promise stored as a value keeps the cell in the loading state forever, see [Troubleshooting](#!section=docs/page=troubleshooting).

`this.$` is the component's context. Every service comes through it: `$mol_fetch` for the network, `$mol_state_arg` for the URL, `$mol_after_timeout` for time. In a test the context is replaced, so the same `users()` sends its request to a mock instead of the network, without a line of the component changing. [Testing](#!section=docs/page=testing) shows that mock.

## Rendering the result

Bind the resolved data straight into a list:

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

When the response arrives, `users()` updates, `user_names()` recomputes, and the list renders. No callbacks, no `useEffect`.

## Reloading

Because it is just a reactive cell, you refetch by invalidating it. Depend on a token you can bump:

```typescript
		@ $mol_mem
		reload_token( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		users() {
			this.reload_token() // subscribe
			return this.$.$mol_fetch.json( 'https://api.example.com/users' ) as unknown[]
		}

		@ $mol_action
		reload() {
			this.reload_token( this.reload_token() + 1 )
		}
```

Calling `reload()` changes the token, which invalidates `users()`, which refetches.

## Errors

A throw inside a reactive property propagates to the nearest view, which renders an error state instead of the content. To handle it yourself, catch and return a fallback:

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

Re-throwing a `Promise` is how you let the loading state keep flowing while catching only real errors.

## Next

For data that persists and syncs across clients without a backend, continue to [Giper Baza](#!section=docs/page=giper-baza).
