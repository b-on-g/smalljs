# $mol_select

Rozšiřuje `$mol_pick`. [Zobrazit zdroj na GitHubu](https://github.com/hyoo-ru/mam_mol/tree/master/select)

Tato reference je generována z typovaného rozhraní `.view.tree` komponenty.

## Vlastnosti

| Vlastnost | Přístup | Typ |
|---|---|---|
| `enabled` | čtení | `boolean` |
| `filter_pattern` | čtení / zápis | `string` |
| `no_options_message` | čtení | `string` |
| `nav_components` | čtení | `readonly($mol_view)[]` |
| `nav_cycle` | čtení / zápis | `boolean` |
| `Nav` | čtení | `$mol_nav` |
| `menu_content` | čtení | `readonly($mol_view)[]` |
| `Menu` | čtení | `$mol_list` |
| `Bubble_pane` | čtení | `$mol_scroll` |
| `filter_hint` | čtení | `string` |
| `dictionary` | čtení / zápis | `Record<string, any>` |
| `options` | čtení | `readonly(string)[]` |
| `value` | čtení / zápis | `string` |
| `option_label_default` | čtení | `string` |
| `No_options` | čtení | `$mol_view` |
| `plugins` | čtení | `readonly(any)[]` |
| `hint` | čtení | `string` |
| `bubble_content` | čtení | `readonly(any)[]` |
| `Filter` | čtení | `$mol_search` |
| `Trigger_icon` | čtení | `$mol_icon_dots_vertical` |
| `trigger_enabled` | čtení | `as 'enabled'` |
