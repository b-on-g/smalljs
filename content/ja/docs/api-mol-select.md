# $mol_select

`$mol_pick` を継承。[GitHub でソースを見る](https://github.com/hyoo-ru/mam_mol/tree/master/select)

このリファレンスはコンポーネントの型付き `.view.tree` インターフェイスから生成されています。

## プロパティ

| プロパティ | アクセス | 型 |
|---|---|---|
| `enabled` | 読み取り | `boolean` |
| `filter_pattern` | 読み取り / 書き込み | `string` |
| `no_options_message` | 読み取り | `string` |
| `nav_components` | 読み取り | `readonly($mol_view)[]` |
| `nav_cycle` | 読み取り / 書き込み | `boolean` |
| `Nav` | 読み取り | `$mol_nav` |
| `menu_content` | 読み取り | `readonly($mol_view)[]` |
| `Menu` | 読み取り | `$mol_list` |
| `Bubble_pane` | 読み取り | `$mol_scroll` |
| `filter_hint` | 読み取り | `string` |
| `dictionary` | 読み取り / 書き込み | `Record<string, any>` |
| `options` | 読み取り | `readonly(string)[]` |
| `value` | 読み取り / 書き込み | `string` |
| `option_label_default` | 読み取り | `string` |
| `No_options` | 読み取り | `$mol_view` |
| `plugins` | 読み取り | `readonly(any)[]` |
| `hint` | 読み取り | `string` |
| `bubble_content` | 読み取り | `readonly(any)[]` |
| `Filter` | 読み取り | `$mol_search` |
| `Trigger_icon` | 読み取り | `$mol_icon_dots_vertical` |
| `trigger_enabled` | 読み取り | `as 'enabled'` |
