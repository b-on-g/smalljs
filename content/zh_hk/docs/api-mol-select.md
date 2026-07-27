# $mol_select

繼承自 `$mol_pick`。[在 GitHub 上查看原始碼](https://github.com/hyoo-ru/mam_mol/tree/master/select)

本參考由元件的帶型別 `.view.tree` 介面生成。

## 屬性

| 屬性 | 存取 | 型別 |
|---|---|---|
| `enabled` | 讀 | `boolean` |
| `filter_pattern` | 讀 / 寫 | `string` |
| `no_options_message` | 讀 | `string` |
| `nav_components` | 讀 | `readonly($mol_view)[]` |
| `nav_cycle` | 讀 / 寫 | `boolean` |
| `Nav` | 讀 | `$mol_nav` |
| `menu_content` | 讀 | `readonly($mol_view)[]` |
| `Menu` | 讀 | `$mol_list` |
| `Bubble_pane` | 讀 | `$mol_scroll` |
| `filter_hint` | 讀 | `string` |
| `dictionary` | 讀 / 寫 | `Record<string, any>` |
| `options` | 讀 | `readonly(string)[]` |
| `value` | 讀 / 寫 | `string` |
| `option_label_default` | 讀 | `string` |
| `No_options` | 讀 | `$mol_view` |
| `plugins` | 讀 | `readonly(any)[]` |
| `hint` | 讀 | `string` |
| `bubble_content` | 讀 | `readonly(any)[]` |
| `Filter` | 讀 | `$mol_search` |
| `Trigger_icon` | 讀 | `$mol_icon_dots_vertical` |
| `trigger_enabled` | 讀 | `as 'enabled'` |
