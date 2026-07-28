# Views

A view is a component: a node in the UI tree with its own layout, behaviour, and styles. This chapter covers how views are declared, wired to logic, composed, and reused.

## Three files, one component

A component `$my_card` lives in `my/card/` and is described by up to three files, each with a clear job:

- `card.view.tree` — **what** the component is: its structure and default bindings.
- `card.view.ts` — **how** it behaves: TypeScript methods, reactive state.
- `card.view.css.ts` — how it looks: typed styles checked by the compiler.

Keeping structure, behaviour, and style apart is deliberate — each file stays small and readable, and the layout is never tangled with logic.

## The view.tree language

`view.tree` describes structure declaratively. Indentation is nesting; there are no closing tags.

```tree
$my_card $mol_view
	sub /
		<= Title $mol_view
			sub / <= title \
		<= Body $mol_view
			sub / <= text \
```

- `$my_card $mol_view` — your component extends the base `$mol_view`.
- `sub /` — the list of children.
- `<= Title $mol_view` — a named sub-view, addressable as `this.Title()` in TypeScript.
- `<= title \` — a bindable property with a default raw-string value (`\` starts a raw string).

Every capitalized name (`Title`, `Body`) becomes a real property you can reach, override, or style. Every lowercase binding (`title`, `text`) becomes a value you can compute in `.view.ts`.

## Binding properties

Two operators connect a property to its source:

- `<=` **one-way**: the child reads a value from the owner.
- `<=>` **two-way**: the value flows both directions — used for inputs.

```tree
$my_form $mol_view
	sub /
		<= Field $mol_string
			value? <=> text? \
```

Here the input's `value` and the owner's `text` stay in sync automatically: type in the field and `text` updates; set `text` in code and the field reflects it.

## Wiring to behaviour

A binding with no default is implemented in `.view.ts`. The class extends the generated base of the same name:

```typescript
namespace $.$$ {
	export class $my_card extends $.$my_card {
		@ $mol_mem
		title() {
			return 'Untitled'
		}
	}
}
```

Anything the template binds — `title`, `text`, a sub-view's property — can be given logic here, and reactivity keeps those values live.

## Attributes and element type

Change the underlying HTML element with `dom_name`, and set attributes through `attr`:

```tree
$my_banner $mol_view
	dom_name \section
	attr *
		^
		role \note
```

The `^` inherits the parent's attributes so you don't drop the ones `$mol_view` already sets.

## Lists and keyed views

A trailing `*` turns a sub-view into a family — one instance per key. Use it for rows:

```tree
$my_list $mol_list
	rows /
		<= Row* $mol_view
			sub / <= row_title* \
```

The framework creates a `Row` for each key you supply and, thanks to [virtualized rendering](#!section=docs/page=rendering), builds only the ones on screen.

> When a keyed view itself contains keyed children, key the outer one with `Name*`, not `Name*0` — the indexed form leaves nested children unrendered.

## Conditional views

Assigning `null` removes a view from rendering. Subclass and null out what a variant doesn't need:

```tree
$my_page_readonly $my_page
	Edit_button null
```

## Composition and reuse

Views compose by nesting, and specialize by extension. A card used inside a list:

```tree
$my_user_card $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
		<= Email $mol_view
			sub / <= email \

$my_users_list $mol_list
	rows /
		<= User* $my_user_card
			name <= user_name* \
			email <= user_email* \
```

`$my_users_list` never redefines what a card looks like — it reuses `$my_user_card` and feeds each instance its data. This is the whole composition model: small views, wired together, specialized by `extends` when a variant is needed.

## Next

Views describe structure; what makes them come alive is reactive data. Continue to [State & Reactivity](#!section=docs/page=state).
