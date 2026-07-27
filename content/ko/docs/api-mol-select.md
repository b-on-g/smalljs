# $mol_select

`$mol_pick`을(를) 확장합니다. [GitHub에서 소스 보기](https://github.com/hyoo-ru/mam_mol/tree/master/select)

이 레퍼런스는 컴포넌트의 타입이 있는 `.view.tree` 인터페이스에서 생성됩니다.

## 속성

| 속성 | 접근 | 타입 |
|---|---|---|
| `enabled` | 읽기 | `boolean` |
| `filter_pattern` | 읽기 / 쓰기 | `string` |
| `no_options_message` | 읽기 | `string` |
| `nav_components` | 읽기 | `readonly($mol_view)[]` |
| `nav_cycle` | 읽기 / 쓰기 | `boolean` |
| `Nav` | 읽기 | `$mol_nav` |
| `menu_content` | 읽기 | `readonly($mol_view)[]` |
| `Menu` | 읽기 | `$mol_list` |
| `Bubble_pane` | 읽기 | `$mol_scroll` |
| `filter_hint` | 읽기 | `string` |
| `dictionary` | 읽기 / 쓰기 | `Record<string, any>` |
| `options` | 읽기 | `readonly(string)[]` |
| `value` | 읽기 / 쓰기 | `string` |
| `option_label_default` | 읽기 | `string` |
| `No_options` | 읽기 | `$mol_view` |
| `plugins` | 읽기 | `readonly(any)[]` |
| `hint` | 읽기 | `string` |
| `bubble_content` | 읽기 | `readonly(any)[]` |
| `Filter` | 읽기 | `$mol_search` |
| `Trigger_icon` | 읽기 | `$mol_icon_dots_vertical` |
| `trigger_enabled` | 읽기 | `as 'enabled'` |
