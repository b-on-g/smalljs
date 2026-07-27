# Wtyczki

**Wtyczka** to komponent bez własnego elementu DOM. Zamiast renderować się na stronie, dołącza zachowanie do elementu komponentu, który ją gości — podobnie jak dyrektywa. Wtyczki wymieniasz pod `plugins /` w view.tree; działają obok widoku, ale nigdy nie pojawiają się w jego `sub`.

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

Ponieważ wtyczka współdzieli element swojego gospodarza, może dodać do tego elementu nasłuchiwacze zdarzeń, atrybuty lub reaktywne efekty uboczne, nie owijając go w dodatkowy markup.

## Wtyczki, których będziesz często używać

- **`$mol_hotkey`** — wiąże skróty klawiszowe. `key * escape? <=> close?` uruchamia `close` po Escape; ustaw `mod_ctrl true`, aby wymagać Ctrl/⌘.
- **`$mol_theme_auto`** — stosuje jasny/ciemny motyw do poddrzewa gospodarza.
- **`$mol_nav`** — nawigacja strzałkami po liście komponentów (`keys_y`, `current_y`).
- **`$mol_speech`** — wejście przez rozpoznawanie mowy.

## Pisanie własnej

Wtyczka rozszerza `$mol_plugin` (które samo jest bez elementu) i zwykle łączy `event` z handlerem:

```tree
$my_autosave $mol_plugin
	event *
		^
		input? <=> save? null
```

Dołącz ją do dowolnego widoku przez listę `plugins /` tego widoku, a wzbogaci ona element tego widoku.
