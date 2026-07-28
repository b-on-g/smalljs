# Ghost pohledy

`$mol_ghost` je pohled **bez uzlu**. Místo aby vytvořil vlastní DOM element, vypůjčí si element svého `Sub()` a přimíchá do něj vlastní atributy, styly a chování. Jedním řádkem ze zdrojového kódu: *„přimíchat logiku pohledu do DOM uzlu jiné komponenty."*

```tree
$mol_ghost $mol_view
	Sub $mol_view
```

Normální `$mol_view` vykreslí vlastní element. Ghost nevykreslí **žádný** — znovu použije element potomka, takže se do DOM stromu nic navíc nepřidá.

## Kdy po něm sáhnout

Použijte ghost, když chcete připojit chování k existující komponentě *bez* zabalení do dalšího elementu — tažení, upuštění, sledování-při-scrollování, přechody. Několik komponent frameworku je na něm postaveno:

- **`$mol_drag`** / **`$mol_drop`** — drag-and-drop ukazatelem
- **`$mol_transit`** — přechody při vstupu/výstupu
- **`$mol_follower`** — udržuje element zarovnaný s jiným během scrollování
- **`$mol_book_page`** — stránka uvnitř navigace `$mol_book`

## Vztah k pluginům

`$mol_plugin` — základ, který každý [plugin](#!section=docs/page=plugins) rozšiřuje — je bez elementu ze stejného důvodu: rozšiřuje element hostitele, místo aby přidával nový. Ghost je obecná forma (zabalit jednoho potomka a převzít jeho uzel); plugin je specializovaná forma, kterou vypisujete pod `plugins /`.
