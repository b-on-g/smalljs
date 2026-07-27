# $mol_page

Erweitert `$mol_view`. [Quellcode auf GitHub ansehen](https://github.com/hyoo-ru/mam_mol/tree/master/page)

Diese Referenz wird aus der typisierten `.view.tree`-Schnittstelle der Komponente generiert.

## Eigenschaften

| Eigenschaft | Zugriff | Typ |
|---|---|---|
| `tabindex` | Lesen | `number` |
| `title_content` | Lesen | `readonly(any)[]` |
| `Title` | Lesen | `$mol_view` |
| `tools` | Lesen | `readonly($mol_view_content)[]` |
| `Tools` | Lesen | `$mol_view` |
| `head` | Lesen | `readonly(any)[]` |
| `Head` | Lesen | `$mol_view` |
| `body_scroll_top` | Lesen / Schreiben | `ReturnType< as 'Body'['scroll_top'] >` |
| `body` | Lesen | `readonly($mol_view)[]` |
| `Body_content` | Lesen | `$mol_view` |
| `body_content` | Lesen | `readonly(any)[]` |
| `Body` | Lesen | `$mol_scroll` |
| `foot` | Lesen | `readonly($mol_view)[]` |
| `Foot` | Lesen | `$mol_view` |
| `dom_name` | Lesen | `string` |
| `attr` | Lesen | `({` |
| `sub` | Lesen | `readonly(any)[]` |
