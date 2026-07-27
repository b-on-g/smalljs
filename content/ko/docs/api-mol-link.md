# $mol_link

`$mol_view`을(를) 확장합니다. [GitHub에서 소스 보기](https://github.com/hyoo-ru/mam_mol/tree/master/link)

이 레퍼런스는 컴포넌트의 타입이 있는 `.view.tree` 인터페이스에서 생성됩니다.

## 속성

| 속성 | 접근 | 타입 |
|---|---|---|
| `uri_toggle` | 읽기 | `string` |
| `hint` | 읽기 | `string` |
| `hint_safe` | 읽기 | `as 'hint'` |
| `target` | 읽기 | `string` |
| `file_name` | 읽기 | `string` |
| `current` | 읽기 | `boolean` |
| `relation` | 읽기 | `string` |
| `click` | 읽기 / 쓰기 | `as 'event_click'` |
| `uri` | 읽기 | `string` |
| `dom_name` | 읽기 | `string` |
| `uri_off` | 읽기 | `string` |
| `external` | 읽기 | `boolean` |
| `attr` | 읽기 | `({` |
| `sub` | 읽기 | `readonly($mol_view_content)[]` |
| `arg` | 읽기 | `Record<string, any>` |
| `event` | 읽기 | `({` |
