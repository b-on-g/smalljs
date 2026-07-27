# $mol_list

`$mol_view`을(를) 확장합니다. [GitHub에서 소스 보기](https://github.com/hyoo-ru/mam_mol/tree/master/list)

이 레퍼런스는 컴포넌트의 타입이 있는 `.view.tree` 인터페이스에서 생성됩니다.

## 속성

| 속성 | 접근 | 타입 |
|---|---|---|
| `gap_before` | 읽기 | `number` |
| `Gap_before` | 읽기 | `$mol_view` |
| `Empty` | 읽기 | `$mol_view` |
| `gap_after` | 읽기 | `number` |
| `Gap_after` | 읽기 | `$mol_view` |
| `rows` | 읽기 | `readonly($mol_view)[]` |
| `render_visible_only` | 읽기 | `boolean` |
| `render_over` | 읽기 | `number` |
| `sub` | 읽기 | `as 'rows'` |
| `view_window_shift` | 읽기 / 쓰기 | `number` |
| `view_window` | 읽기 | `readonly(any)[]` |
