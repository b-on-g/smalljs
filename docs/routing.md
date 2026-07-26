# Routing

Routing in $mol is not a separate library — the URL is just another piece of reactive state. Read it, write it, and views react the same way they react to any cell. The back button, deep links, and shareable URLs all come for free.

## The URL as state

`$mol_state_arg` exposes URL parameters as reactive values. Bind one to a property and the address bar becomes your source of truth:

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

Reading `page()` returns the current value; calling `page('about')` navigates. Anything that reads `page()` re-renders on change — including the browser's back button, which updates the cell for you.

## Switching screens

Combine a routed value with a plain `switch` to choose what renders. Because views are [lazy](#!section=docs/page=rendering), the screens you don't show are never built:

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

## Links that set arguments

In `view.tree`, a link can set URL arguments declaratively — clicking it navigates with no handler:

```tree
<= About_link $mol_link
	arg *
		page \about
	sub / <= about_label \About
```

`$mol_link` also marks itself active (`mol_link_current`) when its arguments match the current URL, so highlighting the current page needs no extra state.

## Multiple parameters

Arguments are independent, so a screen can route on several at once. This very docs site routes on both `section` and `page`:

```tree
<= Guide_link $mol_link
	arg *
		section \docs
		page \views
```

Each key round-trips through the URL, so any view is shareable and bookmarkable by construction. Setting one argument leaves the others untouched, which makes deep links — a specific section *and* page *and* anchor — just a matter of setting the keys you care about.

## State that shouldn't be in the URL

Not every piece of state belongs in the address bar. For values that should persist locally but not pollute links — a collapsed sidebar, a draft — use `$mol_state_local`, which stores to `localStorage` with the same getter/setter shape:

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

Reach for `$mol_state_arg` when the state should be shareable; `$mol_state_local` when it should merely be remembered.

## Next

You've covered how $mol turns state into UI and URLs. See how it all reaches the screen efficiently in [Rendering](#!section=docs/page=rendering).
