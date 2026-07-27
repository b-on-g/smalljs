# $mol_select

继承自 `$mol_pick`。[在 GitHub 上查看源码](https://github.com/hyoo-ru/mam_mol/tree/master/select)

本参考由组件的带类型 `.view.tree` 接口生成。

## 属性

| 属性 | 访问 | 类型 |
|---|---|---|
| `enabled` | 读 | `boolean` |
| `filter_pattern` | 读 / 写 | `string` |
| `no_options_message` | 读 | `string` |
| `nav_components` | 读 | `readonly($mol_view)[]` |
| `nav_cycle` | 读 / 写 | `boolean` |
| `Nav` | 读 | `$mol_nav` |
| `menu_content` | 读 | `readonly($mol_view)[]` |
| `Menu` | 读 | `$mol_list` |
| `Bubble_pane` | 读 | `$mol_scroll` |
| `filter_hint` | 读 | `string` |
| `dictionary` | 读 / 写 | `Record<string, any>` |
| `options` | 读 | `readonly(string)[]` |
| `value` | 读 / 写 | `string` |
| `option_label_default` | 读 | `string` |
| `No_options` | 读 | `$mol_view` |
| `plugins` | 读 | `readonly(any)[]` |
| `hint` | 读 | `string` |
| `bubble_content` | 读 | `readonly(any)[]` |
| `Filter` | 读 | `$mol_search` |
| `Trigger_icon` | 读 | `$mol_icon_dots_vertical` |
| `trigger_enabled` | 读 | `as 'enabled'` |
