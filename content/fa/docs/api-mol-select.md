# $mol_select

`$mol_pick` را گسترش می‌دهد. [دیدنِ سورس در GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/select)

این مرجع از واسطِ نوع‌دارِ `.view.tree`ِ کامپوننت تولید شده است.

## ویژگی‌ها

| ویژگی | دسترسی | نوع |
|---|---|---|
| `enabled` | خواندن | `boolean` |
| `filter_pattern` | خواندن / نوشتن | `string` |
| `no_options_message` | خواندن | `string` |
| `nav_components` | خواندن | `readonly($mol_view)[]` |
| `nav_cycle` | خواندن / نوشتن | `boolean` |
| `Nav` | خواندن | `$mol_nav` |
| `menu_content` | خواندن | `readonly($mol_view)[]` |
| `Menu` | خواندن | `$mol_list` |
| `Bubble_pane` | خواندن | `$mol_scroll` |
| `filter_hint` | خواندن | `string` |
| `dictionary` | خواندن / نوشتن | `Record<string, any>` |
| `options` | خواندن | `readonly(string)[]` |
| `value` | خواندن / نوشتن | `string` |
| `option_label_default` | خواندن | `string` |
| `No_options` | خواندن | `$mol_view` |
| `plugins` | خواندن | `readonly(any)[]` |
| `hint` | خواندن | `string` |
| `bubble_content` | خواندن | `readonly(any)[]` |
| `Filter` | خواندن | `$mol_search` |
| `Trigger_icon` | خواندن | `$mol_icon_dots_vertical` |
| `trigger_enabled` | خواندن | `as 'enabled'` |
