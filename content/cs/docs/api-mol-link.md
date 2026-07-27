# $mol_link

Rozšiřuje `$mol_view`. [Zobrazit zdroj na GitHubu](https://github.com/hyoo-ru/mam_mol/tree/master/link)

Tato reference je generována z typovaného rozhraní `.view.tree` komponenty.

## Vlastnosti

| Vlastnost | Přístup | Typ |
|---|---|---|
| `uri_toggle` | čtení | `string` |
| `hint` | čtení | `string` |
| `hint_safe` | čtení | `as 'hint'` |
| `target` | čtení | `string` |
| `file_name` | čtení | `string` |
| `current` | čtení | `boolean` |
| `relation` | čtení | `string` |
| `click` | čtení / zápis | `as 'event_click'` |
| `uri` | čtení | `string` |
| `dom_name` | čtení | `string` |
| `uri_off` | čtení | `string` |
| `external` | čtení | `boolean` |
| `attr` | čtení | `({` |
| `sub` | čtení | `readonly($mol_view_content)[]` |
| `arg` | čtení | `Record<string, any>` |
| `event` | čtení | `({` |
