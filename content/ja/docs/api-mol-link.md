# $mol_link

`$mol_view` を継承。[GitHub でソースを見る](https://github.com/hyoo-ru/mam_mol/tree/master/link)

このリファレンスはコンポーネントの型付き `.view.tree` インターフェイスから生成されています。

## プロパティ

| プロパティ | アクセス | 型 |
|---|---|---|
| `uri_toggle` | 読み取り | `string` |
| `hint` | 読み取り | `string` |
| `hint_safe` | 読み取り | `as 'hint'` |
| `target` | 読み取り | `string` |
| `file_name` | 読み取り | `string` |
| `current` | 読み取り | `boolean` |
| `relation` | 読み取り | `string` |
| `click` | 読み取り / 書き込み | `as 'event_click'` |
| `uri` | 読み取り | `string` |
| `dom_name` | 読み取り | `string` |
| `uri_off` | 読み取り | `string` |
| `external` | 読み取り | `boolean` |
| `attr` | 読み取り | `({` |
| `sub` | 読み取り | `readonly($mol_view_content)[]` |
| `arg` | 読み取り | `Record<string, any>` |
| `event` | 読み取り | `({` |
