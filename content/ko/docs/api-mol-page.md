# $mol_page

`$mol_view`을(를) 확장합니다. [GitHub에서 소스 보기](https://github.com/hyoo-ru/mam_mol/tree/master/page)

이 레퍼런스는 컴포넌트의 타입이 있는 `.view.tree` 인터페이스에서 생성됩니다.

## 속성

| 속성 | 접근 | 타입 |
|---|---|---|
| `tabindex` | 읽기 | `number` |
| `title_content` | 읽기 | `readonly(any)[]` |
| `Title` | 읽기 | `$mol_view` |
| `tools` | 읽기 | `readonly($mol_view_content)[]` |
| `Tools` | 읽기 | `$mol_view` |
| `head` | 읽기 | `readonly(any)[]` |
| `Head` | 읽기 | `$mol_view` |
| `body_scroll_top` | 읽기 / 쓰기 | `ReturnType< as 'Body'['scroll_top'] >` |
| `body` | 읽기 | `readonly($mol_view)[]` |
| `Body_content` | 읽기 | `$mol_view` |
| `body_content` | 읽기 | `readonly(any)[]` |
| `Body` | 읽기 | `$mol_scroll` |
| `foot` | 읽기 | `readonly($mol_view)[]` |
| `Foot` | 읽기 | `$mol_view` |
| `dom_name` | 읽기 | `string` |
| `attr` | 읽기 | `({` |
| `sub` | 읽기 | `readonly(any)[]` |
