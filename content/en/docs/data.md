# Data Fetching

Loading remote data in $mol is not a special API — an async value is just a reactive property that happens to return a promise. The view waits for it, shows a loading state, and re-renders when it resolves.

## An async property

Return a promise from a `@ $mol_mem` and read it like any other value:

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

`$mol_fetch` suspends the fiber until the response arrives. While it is pending, any view that reads `users()` automatically shows the built-in loading state — you write no `isLoading` flag.

## Rendering the result

Bind the resolved data straight into a list:

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

When the promise resolves, `users()` updates, `user_names()` recomputes, and the list renders. No callbacks, no `useEffect`.

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
			return $mol_fetch.json( 'https://api.example.com/users' ) as unknown[]
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
