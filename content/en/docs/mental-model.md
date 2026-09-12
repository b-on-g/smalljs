# Mental model

If you come from React or Vue, the first days in $mol are spent looking for things that are not there: `computed`, `watch`, `useEffect`, `onMounted`, a `fetch` in a lifecycle hook. They are not hidden somewhere in the API; the model has no place for them. This page is the five-minute version of that model. Read it before [Views](#!section=docs/page=views), and come back when a familiar name goes missing.

## Pull, not push

Nothing is computed until someone reads it. A view renders by reading its properties; each property reads whatever it needs; the dependency chain assembles itself from those reads. There is no subscription to declare and no `watch` to register: the read is the subscription.

```tree
$my_profile $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
```

```typescript
namespace $.$$ {
	export class $my_profile extends $.$my_profile {
		@ $mol_mem
		user() {
			return this.$.$mol_fetch.json( 'https://api.example.com/me' ) as { name: string }
		}
		name() {
			return this.user().name
		}
	}
}
```

Rendering `Name` reads `name()`, `name()` reads `user()`, `user()` hits the network. Nobody told the view about the request and nobody told the request about the view. When `user()` changes, everything that read it recomputes, and nothing else does.

## No lifecycle

There is no `mounted`, no `useEffect`, no `created`. Data is requested by reading a property, and a view reads its properties when it renders. So the example above loads the user the moment `$my_profile` appears on screen, and not before. When the view leaves the screen, nothing reads `user()` any more, and the cell is released along with the view.

That is the whole replacement for the "fetch on mount" pattern: the view asks for what it needs, and the framework decides when to ask. Loading is not attached to a page event; it is attached to being visible.

## A property is a cell

One method with an optional argument is at once getter, setter, computed value and state:

```typescript
@ $mol_mem
count( next?: number ) {
	return next ?? 0
}
```

Called without an argument it reads, called with one it writes. `@ $mol_mem` turns the method into a cached cell that recomputes when something it read has changed. A computed value is just a `@ $mol_mem` method that reads other methods. A watcher is not needed: a side effect belongs to an event, and an event handler is a method marked `@ $mol_action`.

```typescript
@ $mol_mem
doubled() {
	return this.count() * 2
}

@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

[State & Reactivity](#!section=docs/page=state) covers the rules for what may happen inside each of the two.

## Sync code that waits

`user()` above looks synchronous and is written as if the response were already there. It works because every computation runs in a fiber. `this.$.$mol_fetch.json()` suspends that fiber, and the framework restarts the computation once the response has arrived. Until then the view that read `user()` shows a loading state; if the request fails, the same view shows the error. You write neither an `isLoading` flag nor a `try`/`catch`.

The same mechanism serves any asynchronous source. [Data Fetching](#!section=docs/page=data) walks through reloading and error handling.

## Everything is an override

A `view.tree` file is a list of method declarations. Every line under a component is a property of that component with a default value, and any nested component's property can be redefined right where it is used, by one line. A placeholder on a text input is the `hint` property of `$mol_string`:

```tree
$my_search $mol_view
	sub /
		<= Query $mol_string
			hint \Search
			value? <=> query? \
```

There is no prop list to extend, no wrapper to write and no fork to maintain. If a component has a property, you can set it from the outside.

## How to read the sources

The previous section raises the real question: how do you know the property is called `hint`? The answer is that you look, and the framework is built to make looking cheap.

**The framework's source sits next to yours.** In the MAM workspace, `mol/string/string.view.tree` is a folder away from `my/hello/`. It is not in `node_modules` and not inside a bundle; it is the same kind of file you write yourself.

**The class name is the path.** `$mol_string` lives in `mol/string/`, `$mol_button_major` in `mol/button/major/`. Every underscore is a folder separator, so a name in your tree can always be turned into a folder to open. The editor support on the [Tooling](#!section=docs/page=tooling) page completes those names for you.

**The `.view.tree` of a component is the full list of its properties, with defaults.** The shape of the value tells you the type: `\` starts a string, `/` a list, `*` a dictionary, a bare number is a number, `true` and `false` are booleans, `null` means absent, and `<=` introduces a sub-view or a property taken from the owner. Here is the part of `mol/string/string.view.tree` that matters for an input:

```tree
$mol_string $mol_view
	dom_name \input
	enabled true
	field *
		^
		disabled <= disabled false
		value <= value_changed? <=> value? \
		placeholder <= hint_visible <= hint \
	attr *
		^
		type <= type? \text
```

Read it aloud. `dom_name \input`: this component renders an `input` element. `enabled true`: a boolean property, on by default. `field *` is the dictionary of DOM element fields; the names on the left belong to the DOM, the names on the right belong to the component, and the right-most one is the one you set. So the DOM `placeholder` comes from `hint`, an empty string by default; the DOM `value` is the writable `value?` property, and the `type` attribute is the writable `type?`, `text` by default. A placeholder, a disabled input and a password field are `hint`, `enabled false` and `type \password` in your tree.

**The typed interface is generated from the same tree.** `mol/string/-view.tree/string.view.tree.d.ts` lists the same properties as TypeScript signatures, and the [API reference](#!section=docs/page=api-mol-string) on this site is produced from that file. All three agree because all three come from one source.

**Most components ship a `demo/` folder and a `readme.md`.** `mol/string/demo/demo.view.tree` shows the input with a hint, disabled, and with a preset value. When you need a component in some state, find the demo closest to it and copy the line.

Put together, a placeholder takes about a minute:

```bash
ls mol | grep string
cat mol/string/string.view.tree
```

You see `hint \` under `$mol_string`, and you write `hint \Search` under your own `$mol_string`.

## Names

Everything is `snake_case`: property names in `view.tree`, method names in TypeScript, the attributes the framework puts on DOM nodes for styling. Sub-views start with a capital letter (`Query`), values with a lowercase one (`query`).

The name in the tree and the name of the method in the class must match letter for letter. `exchange_form` in the tree and `exchangeForm` in the class are two unrelated properties: the class one is never read, the tree one keeps its default, and there is no error to tell you so. When an override seems to do nothing, that is the first thing to check. [Troubleshooting](#!section=docs/page=troubleshooting) lists this and the other cases where the screen is wrong and the compiler is silent.

## Next

With the model in place, [Views](#!section=docs/page=views) shows how components are declared and composed, and [From React, Vue & Svelte](#!section=docs/page=rosetta) maps the names you already know onto the ones here.
