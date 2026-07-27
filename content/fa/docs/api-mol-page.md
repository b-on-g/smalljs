# $mol_page

`$mol_view` را گسترش می‌دهد. [دیدنِ سورس در GitHub](https://github.com/hyoo-ru/mam_mol/tree/master/page)

این مرجع از واسطِ نوع‌دارِ `.view.tree`ِ کامپوننت تولید شده است.

## ویژگی‌ها

| ویژگی | دسترسی | نوع |
|---|---|---|
| `tabindex` | خواندن | `number` |
| `title_content` | خواندن | `readonly(any)[]` |
| `Title` | خواندن | `$mol_view` |
| `tools` | خواندن | `readonly($mol_view_content)[]` |
| `Tools` | خواندن | `$mol_view` |
| `head` | خواندن | `readonly(any)[]` |
| `Head` | خواندن | `$mol_view` |
| `body_scroll_top` | خواندن / نوشتن | `ReturnType< as 'Body'['scroll_top'] >` |
| `body` | خواندن | `readonly($mol_view)[]` |
| `Body_content` | خواندن | `$mol_view` |
| `body_content` | خواندن | `readonly(any)[]` |
| `Body` | خواندن | `$mol_scroll` |
| `foot` | خواندن | `readonly($mol_view)[]` |
| `Foot` | خواندن | `$mol_view` |
| `dom_name` | خواندن | `string` |
| `attr` | خواندن | `({` |
| `sub` | خواندن | `readonly(any)[]` |
