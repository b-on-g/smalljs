# Metadane modułu

Obok komponentów modułu plik `name.meta.tree` deklaruje **metadane budowania i wdrożenia** — rzeczy dotyczące modułu jako całości, a nie pojedynczego widoku. Moduł aplikacji to zwykłe miejsce na to.

Oto `app.meta.tree` tej strony:

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

## Dyrektywy

- **`deploy \/path`** — kopiuje wskazany plik lub folder do wyjścia budowania produkcyjnego. Użyj go dla zasobów statycznych, które wdrożenie ma nieść, ale których żaden kod nie importuje — obrazów, czcionek, ikon. Tutaj `\/bog/smalljs/assets` dostarcza logo i inne pliki pod `assets/`.
- **`require \/path`** — wymusza moduł w bundlu, nawet gdy żaden kod się do niego nie odwołuje, na wypadek gdy kod tego modułu musi wykonać się **przed** kodem modułu zawierającego ten `meta.tree`. Jest dołączany jako zwykła zależność o wysokim priorytecie. Działają zarówno ścieżka modułu (`\/mol/wire/patch`), jak i pojedynczy plik.
- **`include \/path`** — to samo wymuszone dołączenie, ale na wypadek gdy kolejność ładowania nie ma znaczenia. Moduł jest dołączany, ale zdeprioryzowany, więc ładuje się po kodzie, który od niego zależy. Przykłady: `include \/mol/offline/install` (rejestruje service worker jako efekt uboczny) oraz `include \/bog/builderui/theme.css` (surowy arkusz stylów).
- **`pack <name> git \<url>`** — mapuje przestrzeń nazw na repozytorium git, z którego MAM ją pobiera, np. `pack mol git \https://github.com/hyoo-ru/mam_mol.git`. Tak `$mol_*`, `$hyoo_*` i twoje własne pakiety rozwiązują się do prawdziwego kodu.

Po co w ogóle wymuszać dołączenie? Builder ustala zależności automatycznie i pakuje tylko to, czego twój kod faktycznie używa. Czasem potrzebujesz modułu, do którego twój kod się *nie* odwołuje — na przykład aplikacji, która pakuje cały katalog komponentów, aby istniały w czasie wykonania. `require` i `include` obejmują dokładnie ten przypadek; różnią się tylko kolejnością ładowania.

## Gdzie to żyje

Deklaracje `pack` należą do `.meta.tree` w **korzeniu przestrzeni roboczej** — to rejestr każdego pakietu, który przestrzeń robocza może pobrać. Trzymaj je tam, nie w submodułach; własny `meta.tree` submodułu powinien nieść tylko `require`/`include`/`deploy` specyficzne dla niego.
