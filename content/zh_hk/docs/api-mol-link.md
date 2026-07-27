# $mol_link

繼承自 `$mol_view`。[在 GitHub 上查看原始碼](https://github.com/hyoo-ru/mam_mol/tree/master/link)

本參考由元件的帶型別 `.view.tree` 介面生成。

## 屬性

| 屬性 | 存取 | 型別 |
|---|---|---|
| `uri_toggle` | 讀 | `string` |
| `hint` | 讀 | `string` |
| `hint_safe` | 讀 | `as 'hint'` |
| `target` | 讀 | `string` |
| `file_name` | 讀 | `string` |
| `current` | 讀 | `boolean` |
| `relation` | 讀 | `string` |
| `click` | 讀 / 寫 | `as 'event_click'` |
| `uri` | 讀 | `string` |
| `dom_name` | 讀 | `string` |
| `uri_off` | 讀 | `string` |
| `external` | 讀 | `boolean` |
| `attr` | 讀 | `({` |
| `sub` | 讀 | `readonly($mol_view_content)[]` |
| `arg` | 讀 | `Record<string, any>` |
| `event` | 讀 | `({` |
