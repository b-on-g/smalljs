# Routing

Routing in $mol is not a separate library — the URL is just another piece of reactive state. Read it, write it, and views react the same way they react to any cell.

## The URL as state

`$mol_state_arg` exposes URL parameters as reactive values. Bind one to a property and the browser address bar becomes your source of truth:

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

Reading `page()` gives the current value; calling `page('about')` navigates. Anything that reads `page()` re-renders on change — including the browser back button, which updates the cell for free.

## Switching screens

Combine a routed value with a plain `switch` to choose what renders:

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

In `view.tree`, a link can set URL arguments declaratively. Clicking it navigates without any handler:

```tree
<= About_link $mol_link
	arg *
		page \about
	sub / <= about_label \About
```

`$mol_link` also marks itself active when its arguments match the current URL, so highlighting the current page needs no extra state.

## Multiple parameters

Arguments are independent. A docs site might route on both `section` and `page`:

```tree
<= Guide_link $mol_link
	arg *
		section \docs
		page \views
```

Each key round-trips through the URL, so any screen is shareable and bookmarkable by design.

## Next

You now have views, reactive state, and routing — the core of every $mol app. Next, load real data with [Data Fetching](#!section=docs/page=data).
