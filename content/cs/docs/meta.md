# Metadata modulu

Vedle komponent modulu deklaruje soubor `name.meta.tree` **metadata pro sestavení a nasazení** — věci, které se týkají modulu jako celku, ne jednoho pohledu. Modul aplikace je pro ně obvyklé místo.

Zde je `app.meta.tree` tohoto webu:

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

## Direktivy

- **`deploy \/path`** — zkopíruje uvedený soubor nebo složku do výstupu produkčního sestavení. Použijte pro statické assety, které má nasazení nést, ale žádný kód je neimportuje — obrázky, písma, ikony. Zde `\/bog/smalljs/assets` dodá logo a další soubory pod `assets/`.
- **`require \/path`** — vynutí modul do balíčku, i když na něj žádný kód neodkazuje, pro případ, kdy kód tohoto modulu musí běžet **před** kódem modulu obsahujícího tento `meta.tree`. Je zahrnut jako běžná závislost s vysokou prioritou. Funguje jak cesta k modulu (`\/mol/wire/patch`), tak jednotlivý soubor.
- **`include \/path`** — totéž vynucené zahrnutí, ale pro případ, kdy na pořadí načítání nezáleží. Modul se zahrne, ale s nižší prioritou, takže se načte až po kódu, který na něm závisí. Příklady: `include \/mol/offline/install` (registruje service worker jako vedlejší efekt) a `include \/bog/builderui/theme.css` (surový stylopis).
- **`pack <name> git \<url>`** — mapuje jmenný prostor na git repozitář, ze kterého jej MAM stáhne, např. `pack mol git \https://github.com/hyoo-ru/mam_mol.git`. Takto se `$mol_*`, `$hyoo_*` a vaše vlastní balíčky rozřeší na skutečný kód.

Proč vůbec vynucovat zahrnutí? Builder zjistí závislosti automaticky a zabalí jen to, co váš kód skutečně používá. Občas potřebujete modul, na který váš kód *neodkazuje* — například aplikaci, která zabalí celý katalog komponent, aby existovaly za běhu. `require` a `include` pokrývají přesně tento případ; liší se jen pořadím načítání.

## Kde to žije

Deklarace `pack` patří do `.meta.tree` v **kořeni pracovního prostoru** — to je registr každého balíčku, který pracovní prostor může stáhnout. Držte je tam, ne v submodulech; vlastní `meta.tree` submodulu by měl nést jen `require`/`include`/`deploy` specifické pro něj.
