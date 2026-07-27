# Plugins

Ein **Plugin** ist eine Komponente ohne eigenes DOM-Element. Statt sich in die Seite zu rendern, hängt es Verhalten an das Element der Komponente an, die es beherbergt — ganz ähnlich einer Direktive. Sie listen Plugins unter `plugins /` in einer view.tree auf; sie laufen neben der Ansicht, tauchen aber nie in deren `sub` auf.

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

Weil ein Plugin das Element seines Hosts teilt, kann es diesem Element Event-Listener, Attribute oder reaktive Seiteneffekte hinzufügen, ohne es in zusätzliches Markup zu hüllen.

## Plugins, die Sie oft verwenden

- **`$mol_hotkey`** — bindet Tastenkürzel. `key * escape? <=> close?` führt `close` bei Escape aus; setzen Sie `mod_ctrl true`, um Strg/⌘ zu verlangen.
- **`$mol_theme_auto`** — wendet ein helles/dunkles Theme auf den Host-Teilbaum an.
- **`$mol_nav`** — Pfeiltastennavigation über eine Liste von Komponenten (`keys_y`, `current_y`).
- **`$mol_speech`** — Eingabe per Spracherkennung.

## Eines schreiben

Ein Plugin erweitert `$mol_plugin` (das selbst element-los ist) und verdrahtet typischerweise ein `event` mit einem Handler:

```tree
$my_autosave $mol_plugin
	event *
		^
		input? <=> save? null
```

Hängen Sie es über die `plugins /`-Liste dieser Ansicht an eine beliebige Ansicht an, und es erweitert das Element dieser Ansicht.
