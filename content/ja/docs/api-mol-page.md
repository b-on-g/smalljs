# $mol_page

`$mol_view` を継承。[GitHub でソースを見る](https://github.com/hyoo-ru/mam_mol/tree/master/page)

このリファレンスはコンポーネントの型付き `.view.tree` インターフェイスから生成されています。

## プロパティ

| プロパティ | アクセス | 型 |
|---|---|---|
| `tabindex` | 読み取り | `number` |
| `title_content` | 読み取り | `readonly(any)[]` |
| `Title` | 読み取り | `$mol_view` |
| `tools` | 読み取り | `readonly($mol_view_content)[]` |
| `Tools` | 読み取り | `$mol_view` |
| `head` | 読み取り | `readonly(any)[]` |
| `Head` | 読み取り | `$mol_view` |
| `body_scroll_top` | 読み取り / 書き込み | `ReturnType< as 'Body'['scroll_top'] >` |
| `body` | 読み取り | `readonly($mol_view)[]` |
| `Body_content` | 読み取り | `$mol_view` |
| `body_content` | 読み取り | `readonly(any)[]` |
| `Body` | 読み取り | `$mol_scroll` |
| `foot` | 読み取り | `readonly($mol_view)[]` |
| `Foot` | 読み取り | `$mol_view` |
| `dom_name` | 読み取り | `string` |
| `attr` | 読み取り | `({` |
| `sub` | 読み取り | `readonly(any)[]` |
