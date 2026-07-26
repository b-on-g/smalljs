# Plugins

A **plugin** is a component with no DOM element of its own. Instead of rendering into the page, it attaches behaviour to the element of the component that hosts it — much like a directive. You list plugins under `plugins /` in a view.tree; they run alongside the view but never show up in its `sub`.

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
		<= Search_key $mol_hotkey
			key *
				K? <=> open_search?
	sub /
		<= Content $my_content
```

Because a plugin shares its host's element, it can add event listeners, attributes, or reactive side-effects to that element without wrapping it in extra markup.

## Plugins you'll use often

- **`$mol_hotkey`** — bind keyboard shortcuts. `key * escape? <=> close?` runs `close` on Escape; set `mod_ctrl true` to require Ctrl/⌘.
- **`$mol_theme_auto`** — apply a light/dark theme to the host subtree.
- **`$mol_nav`** — arrow-key navigation across a list of components (`keys_y`, `current_y`).
- **`$mol_speech`** — speech recognition input.

## Writing one

A plugin extends `$mol_plugin` (which is itself element-less) and typically wires an `event` to a handler:

```tree
$my_autosave $mol_plugin
	event *
		^
		input? <=> save? null
```

Attach it to any view via that view's `plugins /` list, and it augments that view's element.
