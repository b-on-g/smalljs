# Views

A view is a component: a node in the UI tree with its own layout, behaviour, and styles. This page covers how views are declared and composed.

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
- `<= title \` — a bindable property with a default raw-string value.

## Binding properties

Two operators connect a property to its source:

- `<=` one-way: the child reads a value from the owner.
- `<=>` two-way: value flows both directions, for inputs.

```tree
$my_form $mol_view
	sub /
		<= Field $mol_string
			value? <=> text? \
```

Here the input's `value` and the owner's `text` stay in sync automatically.

## Lists and keyed views

A trailing `*` turns a sub-view into a family — one instance per key. Use it for rows:

```tree
$my_list $mol_list
	rows /
		<= Row* $mol_view
			sub / <= row_title* \
```

The framework creates a `Row` for each key you provide and renders only the ones on screen — long lists stay fast because off-screen rows are never built.

## Conditional views

Assigning `null` removes a view from rendering. Subclass and null out what you do not need:

```tree
$my_page_readonly $my_page
	Edit_button null
```

## Next

State and reactivity are what make these bindings live — continue to [State & Reactivity](#!section=docs/page=state).
