# State & Reactivity

$mol state behaves like a spreadsheet: you declare how a value is computed, and everything that depends on it updates by itself. No stores, no dispatch, no effect hooks — the dependency graph tracks what to recompute.

## Reactive properties

A method decorated with `@ $mol_mem` is a cached, reactive cell. It runs once, remembers its result, and recomputes only when something it read has changed.

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

`doubled` reads `count`, so it subscribes to `count` automatically. Change `count` and every view showing `doubled` refreshes — there is nothing to subscribe to by hand.

## Reading and writing

A property is both getter and setter: call it with no argument to read, with an argument to write.

```typescript
@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

## Actions vs. computations

This one distinction keeps reactive code predictable:

- `@ $mol_mem` is a **pure computation** — only read other cells and return a value.
- `@ $mol_action` is an **effect** — writes to state, network calls, and timers belong here.

Writing to a cell from inside a `@ $mol_mem` creates a feedback loop (the write invalidates a dependency, which recomputes, which writes again). $mol reports this as a *circular subscription*. The fix is always the same: keep side effects in actions, keep computations pure.

| In `@ $mol_mem` you may | but not |
|---|---|
| read other cells | write other cells |
| `new SomeClass()` | `fetch()`, `await` |
| return a value | `setTimeout`, DOM writes |

Button handlers are generated as `@ $mol_mem` on the base class; override them with `@ $mol_action` so they can write safely:

```typescript
@ $mol_action
submit() {
	this.saved( true )
}
```

## Derived state composes

Because dependencies are tracked automatically, derived values chain without any wiring. Each reads the one before it; a change at the root ripples out exactly as far as it needs to:

```typescript
@ $mol_mem full_name() {
	return `${ this.first() } ${ this.last() }`.trim()
}

@ $mol_mem greeting() {
	return this.full_name() ? `Hello, ${ this.full_name() }!` : 'Hello!'
}
```

## Keyed state

`@ $mol_mem_key` is a computation parameterized by a key — one cached cell per key. Ideal for per-row values:

```typescript
@ $mol_mem_key
task_done( id: string, next?: boolean ) {
	const task = this.task( id )
	if ( next !== undefined ) task.Done( null )!.val( next )
	return task.Done()?.val() ?? false
}
```

## Async is just a value

Return a promise from a `@ $mol_mem` and the view shows a loading state until it resolves — no explicit loading flag:

```typescript
@ $mol_mem
async data() {
	const res = await fetch( '/api/data' )
	return await res.json()
}
```

[Data Fetching](#!section=docs/page=data) builds on this pattern.

## Transient state between events

State declared in `view.tree` resets between separate event handlers (drag/pan/gesture sequences), because $mol wraps each handler in its own fiber. For values that must survive from one event to the next, use a plain TypeScript field instead of a reactive property:

```typescript
export class $my_canvas extends $.$my_canvas {
	// plain field — survives across events, not reactive
	drag_id = ''

	@ $mol_action pan_start() { this.drag_id = 'node_42' }
	@ $mol_action pan_move() { if ( this.drag_id ) { /* ... */ } }
}
```

Use a reactive cell when the view must react to the value; use a plain field for transient state only the handlers read.

## Next

Reactive state is most useful when it's addressable — connect it to the URL in [Routing](#!section=docs/page=routing).
