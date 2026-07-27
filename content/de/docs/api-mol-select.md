# $mol_select

Erweitert `$mol_pick`. [Quellcode auf GitHub ansehen](https://github.com/hyoo-ru/mam_mol/tree/master/select)

Diese Referenz wird aus der typisierten `.view.tree`-Schnittstelle der Komponente generiert.

## Eigenschaften

| Eigenschaft | Zugriff | Typ |
|---|---|---|
| `enabled` | Lesen | `boolean` |
| `filter_pattern` | Lesen / Schreiben | `string` |
| `no_options_message` | Lesen | `string` |
| `nav_components` | Lesen | `readonly($mol_view)[]` |
| `nav_cycle` | Lesen / Schreiben | `boolean` |
| `Nav` | Lesen | `$mol_nav` |
| `menu_content` | Lesen | `readonly($mol_view)[]` |
| `Menu` | Lesen | `$mol_list` |
| `Bubble_pane` | Lesen | `$mol_scroll` |
| `filter_hint` | Lesen | `string` |
| `dictionary` | Lesen / Schreiben | `Record<string, any>` |
| `options` | Lesen | `readonly(string)[]` |
| `value` | Lesen / Schreiben | `string` |
| `option_label_default` | Lesen | `string` |
| `No_options` | Lesen | `$mol_view` |
| `plugins` | Lesen | `readonly(any)[]` |
| `hint` | Lesen | `string` |
| `bubble_content` | Lesen | `readonly(any)[]` |
| `Filter` | Lesen | `$mol_search` |
| `Trigger_icon` | Lesen | `$mol_icon_dots_vertical` |
| `trigger_enabled` | Lesen | `as 'enabled'` |
