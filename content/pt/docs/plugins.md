# Plugins

Um **plugin** é um componente sem elemento DOM próprio. Em vez de se renderizar na página, ele anexa comportamento ao elemento do componente que o hospeda — muito como uma diretiva. Você lista plugins sob `plugins /` em um view.tree; eles rodam ao lado da vista, mas nunca aparecem no seu `sub`.

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

Como um plugin compartilha o elemento do seu host, ele pode adicionar ouvintes de eventos, atributos ou efeitos colaterais reativos a esse elemento sem envolvê-lo em marcação extra.

## Plugins que você usará com frequência

- **`$mol_hotkey`** — associa atalhos de teclado. `key * escape? <=> close?` executa `close` no Esc; defina `mod_ctrl true` para exigir Ctrl/⌘.
- **`$mol_theme_auto`** — aplica um tema claro/escuro à subárvore host.
- **`$mol_nav`** — navegação por setas do teclado por uma lista de componentes (`keys_y`, `current_y`).
- **`$mol_speech`** — entrada por reconhecimento de fala.

## Escrevendo um

Um plugin estende `$mol_plugin` (que é ele mesmo sem elemento) e normalmente conecta um `event` a um manipulador:

```tree
$my_autosave $mol_plugin
	event *
		^
		input? <=> save? null
```

Anexe-o a qualquer vista pela lista `plugins /` dessa vista, e ele aumenta o elemento dessa vista.
