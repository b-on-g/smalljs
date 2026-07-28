# Cookbook

Short, copy-ready recipes for tasks that come up in almost every app. Each one is real $mol code — adapt the names and drop it in.

## A two-way bound input

Keep an input and a derived value in sync with no handler wiring: `<=>` binds both directions, and any computed property that reads the value updates on its own.

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

## A list you can add to and remove from

Hold the collection in a reactive property and rewrite it immutably from actions. A keyed `Row*` renders one row per item, and — thanks to [virtualized rendering](#!section=docs/page=rendering) — only the visible rows are built.

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

## Fetch data with loading and error states

An async value is just a reactive property that returns a promise. `$mol_fetch` suspends the fiber while the request is in flight, so any view reading it shows the built-in loading state — and a failed request surfaces as an error state. You write no `isLoading` flag and no `try`/`catch`.

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

## Persist local state

For state that should survive a reload but not clutter the URL — a collapsed sidebar, a draft, a preference — use `$mol_state_local`. It has the same getter/setter shape as any reactive property and stores to `localStorage`.

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

## Read and write a route parameter

To make a value shareable and bookmarkable, back it with `$mol_state_arg` instead. Reading returns the current URL value; passing an argument navigates, and the browser back button updates the cell for you.

```typescript
@ $mol_mem
page( next?: string ) {
	return $mol_state_arg.value( 'page', next ) ?? 'home'
}
```

A `$mol_link` can set the same argument declaratively, so a plain click navigates with no handler:

```tree
<= Home_link $mol_link
	arg *
		page \home
	sub / <= home_label \Home
```

See [Routing](#!section=docs/page=routing) for switching screens on the routed value.

## Add an automatic light/dark theme

Attach `$mol_theme_auto` as a [plugin](#!section=docs/page=plugins) — an element-less component listed under `plugins /`. It applies a light or dark theme to the host's subtree, following the OS preference, without wrapping your layout in anything.

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
	sub /
		<= Content $my_content
```

## Next

Want to try these live? Open the [Playground](#!section=playground) and paste any recipe in, or work through the [Getting Started](#!section=docs/page=getting-started) walkthrough to build a full app.
