# $mol_list

`$mol_view` を継承。[GitHub でソースを見る](https://github.com/hyoo-ru/mam_mol/tree/master/list)

このリファレンスはコンポーネントの型付き `.view.tree` インターフェイスから生成されています。

## プロパティ

| プロパティ | アクセス | 型 |
|---|---|---|
| `gap_before` | 読み取り | `number` |
| `Gap_before` | 読み取り | `$mol_view` |
| `Empty` | 読み取り | `$mol_view` |
| `gap_after` | 読み取り | `number` |
| `Gap_after` | 読み取り | `$mol_view` |
| `rows` | 読み取り | `readonly($mol_view)[]` |
| `render_visible_only` | 読み取り | `boolean` |
| `render_over` | 読み取り | `number` |
| `sub` | 読み取り | `as 'rows'` |
| `view_window_shift` | 読み取り / 書き込み | `number` |
| `view_window` | 読み取り | `readonly(any)[]` |
