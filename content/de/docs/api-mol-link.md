# $mol_link

Erweitert `$mol_view`. [Quellcode auf GitHub ansehen](https://github.com/hyoo-ru/mam_mol/tree/master/link)

Diese Referenz wird aus der typisierten `.view.tree`-Schnittstelle der Komponente generiert.

## Eigenschaften

| Eigenschaft | Zugriff | Typ |
|---|---|---|
| `uri_toggle` | Lesen | `string` |
| `hint` | Lesen | `string` |
| `hint_safe` | Lesen | `as 'hint'` |
| `target` | Lesen | `string` |
| `file_name` | Lesen | `string` |
| `current` | Lesen | `boolean` |
| `relation` | Lesen | `string` |
| `click` | Lesen / Schreiben | `as 'event_click'` |
| `uri` | Lesen | `string` |
| `dom_name` | Lesen | `string` |
| `uri_off` | Lesen | `string` |
| `external` | Lesen | `boolean` |
| `attr` | Lesen | `({` |
| `sub` | Lesen | `readonly($mol_view_content)[]` |
| `arg` | Lesen | `Record<string, any>` |
| `event` | Lesen | `({` |
