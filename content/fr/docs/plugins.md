# Plugins

Un **plugin** est un composant sans élément DOM propre. Au lieu de se rendre dans la page, il attache un comportement à l'élément du composant qui l'héberge — un peu comme une directive. Vous listez les plugins sous `plugins /` dans un view.tree ; ils s'exécutent aux côtés de la vue mais n'apparaissent jamais dans son `sub`.

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

Parce qu'un plugin partage l'élément de son hôte, il peut ajouter des écouteurs d'événements, des attributs ou des effets de bord réactifs à cet élément sans l'envelopper dans un balisage supplémentaire.

## Plugins que vous utiliserez souvent

- **`$mol_hotkey`** — lie des raccourcis clavier. `key * escape? <=> close?` exécute `close` sur Échap ; mettez `mod_ctrl true` pour exiger Ctrl/⌘.
- **`$mol_theme_auto`** — applique un thème clair/sombre au sous-arbre hôte.
- **`$mol_nav`** — navigation au clavier (flèches) à travers une liste de composants (`keys_y`, `current_y`).
- **`$mol_speech`** — saisie par reconnaissance vocale.

## En écrire un

Un plugin étend `$mol_plugin` (qui est lui-même sans élément) et relie généralement un `event` à un gestionnaire :

```tree
$my_autosave $mol_plugin
	event *
		^
		input? <=> save? null
```

Attachez-le à n'importe quelle vue via la liste `plugins /` de cette vue, et il enrichit l'élément de cette vue.
