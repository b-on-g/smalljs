# Pluginy

**Plugin** je komponenta bez vlastního DOM elementu. Místo aby se vykreslila do stránky, připojí chování k elementu komponenty, která ji hostí — podobně jako direktiva. Pluginy vypisujete pod `plugins /` ve view.tree; běží vedle pohledu, ale nikdy se neobjeví v jeho `sub`.

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

Protože plugin sdílí element svého hostitele, může tomuto elementu přidávat posluchače událostí, atributy nebo reaktivní vedlejší efekty, aniž by jej obaloval do dalšího markupu.

## Pluginy, které budete používat často

- **`$mol_hotkey`** — váže klávesové zkratky. `key * escape? <=> close?` spustí `close` při Escape; nastavte `mod_ctrl true`, chcete-li vyžadovat Ctrl/⌘.
- **`$mol_theme_auto`** — aplikuje světlé/tmavé téma na podstrom hostitele.
- **`$mol_nav`** — navigace šipkami po seznamu komponent (`keys_y`, `current_y`).
- **`$mol_speech`** — vstup pomocí rozpoznávání řeči.

## Jak nějaký napsat

Plugin rozšiřuje `$mol_plugin` (který je sám bez elementu) a obvykle propojí `event` s obsluhou:

```tree
$my_autosave $mol_plugin
	event *
		^
		input? <=> save? null
```

Připojte jej k libovolnému pohledu přes seznam `plugins /` daného pohledu a rozšíří element tohoto pohledu.
