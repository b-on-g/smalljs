# Plugin

Un **plugin** è un componente senza un proprio elemento DOM. Invece di renderizzarsi nella pagina, aggancia un comportamento all'elemento del componente che lo ospita — proprio come una direttiva. Elenchi i plugin sotto `plugins /` in un view.tree; girano accanto alla vista ma non compaiono mai nel suo `sub`.

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

Poiché un plugin condivide l'elemento del suo host, può aggiungere a quell'elemento listener di eventi, attributi o effetti collaterali reattivi senza avvolgerlo in markup aggiuntivo.

## Plugin che userai spesso

- **`$mol_hotkey`** — associa scorciatoie da tastiera. `key * escape? <=> close?` esegue `close` su Esc; imposta `mod_ctrl true` per richiedere Ctrl/⌘.
- **`$mol_theme_auto`** — applica un tema chiaro/scuro al sottoalbero host.
- **`$mol_nav`** — navigazione con i tasti freccia su una lista di componenti (`keys_y`, `current_y`).
- **`$mol_speech`** — input tramite riconoscimento vocale.

## Scriverne uno

Un plugin estende `$mol_plugin` (che è esso stesso senza elemento) e tipicamente collega un `event` a un gestore:

```tree
$my_autosave $mol_plugin
	event *
		^
		input? <=> save? null
```

Aggancialo a qualsiasi vista tramite la lista `plugins /` di quella vista, e arricchisce l'elemento di quella vista.
