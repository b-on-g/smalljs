# $mol_select

Estende `$mol_pick`. [Ver o código-fonte no GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/select)

Esta referência é gerada a partir da interface tipada `.view.tree` do componente.

## Propriedades

| Propriedade | Acesso | Tipo |
|---|---|---|
| `enabled` | leitura | `boolean` |
| `filter_pattern` | leitura / escrita | `string` |
| `no_options_message` | leitura | `string` |
| `nav_components` | leitura | `readonly($mol_view)[]` |
| `nav_cycle` | leitura / escrita | `boolean` |
| `Nav` | leitura | `$mol_nav` |
| `menu_content` | leitura | `readonly($mol_view)[]` |
| `Menu` | leitura | `$mol_list` |
| `Bubble_pane` | leitura | `$mol_scroll` |
| `filter_hint` | leitura | `string` |
| `dictionary` | leitura / escrita | `Record<string, any>` |
| `options` | leitura | `readonly(string)[]` |
| `value` | leitura / escrita | `string` |
| `option_label_default` | leitura | `string` |
| `No_options` | leitura | `$mol_view` |
| `plugins` | leitura | `readonly(any)[]` |
| `hint` | leitura | `string` |
| `bubble_content` | leitura | `readonly(any)[]` |
| `Filter` | leitura | `$mol_search` |
| `Trigger_icon` | leitura | `$mol_icon_dots_vertical` |
| `trigger_enabled` | leitura | `as 'enabled'` |
