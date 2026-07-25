# State & Reactivity

$mol state behaves like a spreadsheet: you declare how a value is computed, and everything that depends on it updates by itself. No stores, no actions dispatch, no effect hooks.

## Reactive properties

A method decorated with `@ $mol_mem` is a cached, reactive cell. It recomputes only when something it read has changed.

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

`doubled` reads `count`, so it tracks `count` automatically. Change `count` and any view showing `doubled` refreshes — nothing to subscribe to.

## Reading and writing

A property is both getter and setter. Call it with no argument to read, with an argument to write:

```typescript
@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

## Actions vs. computations

This distinction keeps reactive code predictable:

- `@ $mol_mem` is a **pure computation**. Only read other cells and return a value.
- `@ $mol_action` is an **effect**. Writes to state, network calls, and timers belong here.

Writing to a cell from inside a `@ $mol_mem` creates a feedback loop; keep side effects in actions.

## Keyed state

`@ $mol_mem_key` is a computation parameterized by a key — one cached cell per key:

```typescript
@ $mol_mem_key
task_done( id: string, next?: boolean ) {
	const task = this.task( id )
	if ( next !== undefined ) task.Done( null )!.val( next )
	return task.Done()?.val() ?? false
}
```

## Async is just a value

Return a promise from a `@ $mol_mem` and the view shows a loading state until it resolves — no explicit loading flags:

```typescript
@ $mol_mem
async data() {
	const res = await fetch( '/api/data' )
	return await res.json()
}
```

## Next

Now connect state to the URL with [Routing](#!section=docs/page=routing).
