# $mol_page

Rozšiřuje `$mol_view`. [Zobrazit zdroj na GitHubu](https://github.com/hyoo-ru/mam_mol/tree/master/page)

Tato reference je generována z typovaného rozhraní `.view.tree` komponenty.

## Vlastnosti

| Vlastnost | Přístup | Typ |
|---|---|---|
| `tabindex` | čtení | `number` |
| `title_content` | čtení | `readonly(any)[]` |
| `Title` | čtení | `$mol_view` |
| `tools` | čtení | `readonly($mol_view_content)[]` |
| `Tools` | čtení | `$mol_view` |
| `head` | čtení | `readonly(any)[]` |
| `Head` | čtení | `$mol_view` |
| `body_scroll_top` | čtení / zápis | `ReturnType< as 'Body'['scroll_top'] >` |
| `body` | čtení | `readonly($mol_view)[]` |
| `Body_content` | čtení | `$mol_view` |
| `body_content` | čtení | `readonly(any)[]` |
| `Body` | čtení | `$mol_scroll` |
| `foot` | čtení | `readonly($mol_view)[]` |
| `Foot` | čtení | `$mol_view` |
| `dom_name` | čtení | `string` |
| `attr` | čtení | `({` |
| `sub` | čtení | `readonly(any)[]` |
