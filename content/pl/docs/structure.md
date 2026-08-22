# Struktura projektu

Projekt $mol ma cztery zagnieżdżone poziomy: **przestrzeń roboczą**, którą sklonowałeś, **pakiety** w jej wnętrzu, **moduły** wewnątrz nich oraz **pliki** wewnątrz modułu. Każdy poziom odpowiada na inne pytanie, a większość tego, co robi build, wynika z rozróżnienia, co jest czym.

```
mam/                            przestrzeń robocza — sklonowany MAM
├── .meta.tree                  rejestr: który pakiet z którego repozytorium
├── package.json
├── mol/                        pakiet — sam framework, osobne repo git
│   └── button/                 moduł — komponent $mol_button
│       ├── button.view.tree
│       ├── button.view.ts
│       ├── major/              submoduł — $mol_button_major
│       └── minor/              submoduł — $mol_button_minor
└── my/                         pakiet — twój
    ├── .gitattributes          `* -text` — zachowuje zbudowane binaria nietknięte
    └── hello/                  moduł — komponent $my_hello
        ├── index.html          punkt wejścia (tylko moduły aplikacji)
        ├── hello.view.tree     układ
        ├── hello.view.ts       zachowanie
        ├── hello.view.css.ts   style, w TypeScripcie
        ├── hello.locale=ru.json
        ├── hello.meta.tree     dyrektywy builda i deployu
        ├── form/               submoduł — $my_hello_form
        ├── -view.tree/         wygenerowane z hello.view.tree
        └── -/                  wynik builda
```

## Przestrzeń robocza

MAM klonujesz raz i pracujesz w środku. To nie jest katalog, do którego kopiowane są zależności: każdy pakiet leży tam jako własny checkout gita, z historią, więc możesz czytać źródła frameworka, wstawić w nie `debugger` i otworzyć pull request z tej samej kopii roboczej.

Główny `.meta.tree` jest rejestrem, który to umożliwia:

```tree
pack mol git \https://github.com/hyoo-ru/mam_mol.git
pack hyoo git \https://github.com/hyoo-ru/mam_hyoo.git
pack lib git \https://github.com/hyoo-ru/mam_lib.git
```

Gdy build natrafia na `$mol_view`, a katalogu `mol/` jeszcze nie ma, szuka nazwy tutaj i klonuje repozytorium. Nic nie jest wendorowane i nic nie jest spłaszczane.

## Pakiety

Katalog najwyższego poziomu to pakiet, a pakiet to repozytorium git. Twój własny pakiet jest po prostu katalogiem, który nazywasz: dopóki żyje lokalnie, nie potrzebuje rejestracji, a linia `pack` przyda się w dniu, w którym zechcesz pobierać go po nazwie.

Pakiety się zagnieżdżają. Pakiet może nieść własne deklaracje `pack` dla katalogów w swoim wnętrzu, a MAM czyta je z `meta.tree` tego katalogu, który będzie zawierał pakiet. Ta strona żyje w `bog/smalljs/` i jest osobnym repozytorium, wymienionym w `bog/bog.meta.tree`, który sam leży w checkoucie `bog/` wymienionym w głównym `.meta.tree`.

### Jeden plik, którego potrzebuje każdy pakiet

Pakiet, który jest deployowany, potrzebuje `.gitattributes` z jedną linią:

```
* -text
```

To wyłącza normalizację końców linii przez gita. Ma to znaczenie, bo deploy oznacza commitowanie wyniku builda do gałęzi, a ten wynik to nie tylko tekst: ta strona wiezie 57 plików binarnych, czcionki, które hostuje u siebie, oraz obrazek podglądu dla każdej strony. Znormalizowane na wejściu, docierają do czytelnika jako popsute obrazki i czcionki, podczas gdy sam build pozostaje zielony. Checkout MAM ma taki sam plik w swoim korzeniu, z formatami czcionek dodatkowo oznaczonymi jako `binary`.

Generator zapisuje go za ciebie; w repozytorium, które założyłeś sam, dodaj go ręcznie.

## Moduły

Moduł to katalog, a katalog to komponent. Nie ma ani instrukcji importu, ani mapy modułów: nazwa klasy *jest* adresem, a każdy podkreślnik w niej to separator katalogów:

```
$my_hello          →  my/hello/
$my_hello_form     →  my/hello/form/
$mol_button_major  →  mol/button/major/
$mol_after_frame   →  mol/after/frame/
```

To cała reguła rozwiązywania nazw. Builder skanuje twój tekst źródłowy w poszukiwaniu tokenów `$name`, rozbija każdy po `_` i idzie po katalogach. Nic nie deklaruje zależności; użycie nazwy jest deklaracją.

Praktyczny wniosek: **nazwy folderów modułów nigdy nie zawierają podkreślnika.** Katalog o nazwie `my/hello_form/` byłby szukany pod `my/hello/form/` i nigdy nie znaleziony — objawem jest klasa, która kompiluje się w edytorze, ale brakuje jej w bundlu.

Moduł, który ma submoduły, wciąż może sam być komponentem, w jednej z dwóch postaci. `$mol_button` żyje wprost w `mol/button/`, obok `major/` i `minor/`. `$mol_view` żyje poziom głębiej, w `mol/view/view/`, bo `mol/view/` mieści też `component/`, `selection/` i `tree2/`. MAM najpierw próbuje podwojonej ścieżki, a potem cofa się do krótszej, więc oba układy się rozwiązują.

## Pliki w module

Każdy plik jest opcjonalny. Moduł to te pliki, które akurat w nim są.

| Plik | Przeznaczenie |
|------|---------|
| `hello.view.tree` | Deklaratywny układ |
| `hello.view.ts` | Zachowanie: klasa rozszerzająca wygenerowaną bazę |
| `hello.view.css.ts` | Typowane style. Zwróć uwagę na końcowe `.ts`: to TypeScript wołający `$mol_style_define`, a nie arkusz stylów |
| `hello.ts` | Moduł zupełnie bez widoku — modele, narzędzia, czysta logika |
| `hello.test.ts` | Testy, uruchamiane przez builder |
| `hello.locale=ru.json` | Tłumaczenia; podchwytywany jest każdy plik kończący się na `.locale=<lang>.json` |
| `hello.meta.tree` | Dyrektywy builda i deployu |
| `index.html` | Punkt wejścia — potrzebuje go tylko moduł aplikacji |

Przyrostek przed rozszerzeniem ogranicza plik do jednego środowiska:

- `frame.web.ts` — tylko bundle przeglądarkowy, jak `mol/after/frame/frame.web.ts`
- `build.node.ts` — tylko bundle Node, jak sam builder MAM
- `hello.test.ts` — tylko bundle testowe

Builder produkuje dla każdej aplikacji bundle `web` i bundle `node` i odrzuca pliki oznaczone dla tego drugiego, więc kod platformowy nigdy nie musi bronić się w runtime.

Obok modułu przyjmowane są też surowe pliki `.css` — framework używa ich do tych nielicznych rzeczy, których typowane style nie wyrażą, jak `@keyframes` i `content:`. Cała reszta należy do `.view.css.ts`, gdzie nazwy właściwości są sprawdzane.

## Wygenerowane katalogi zaczynają się od myślnika

MAM traktuje nazwę jako źródło tylko wtedy, gdy zaczyna się od litery lub cyfry. Wszystko inne jest dla builda niewidzialne, dlatego każdy wygenerowany katalog dostaje prefiks `-`: wynik może leżeć tuż obok swojego wejścia, nie wracając na wejście. Z tego samego powodu `.gitignore` przestrzeni roboczej ignoruje `-*`.

**`-view.tree/`** pojawia się obok każdego pliku `.view.tree` i trzyma to, do czego kompiluje się drzewo:

```
my/hello/-view.tree/
├── hello.view.tree.js            wygenerowana klasa bazowa
├── hello.view.tree.d.ts          jej typowany interfejs
└── hello.view.tree.locale=en.json  wyciągnięte łańcuchy @
```

Twój `hello.view.ts` rozszerza klasę, która tam leży. To cała relacja między tymi dwoma plikami — [Z TypeScriptu do view.tree](#!section=docs/page=from-ts-to-view-tree) przechodzi wygenerowany kod linia po linii.

**`-css/`** pojawia się obok surowego pliku `.css` i trzyma wygenerowany `.ts`, który owija arkusz stylów w wywołanie `$mol_style_attach`, więc jedzie on razem z bundlem, zamiast wymagać `<link>`.

**`-/`** to wynik builda modułu, który zbudowałeś. Dla aplikacji leżą tam `web.js`, `web.css`, `web.audit.js`, `web.d.ts`, `web.deps.json`, po jednym `web.locale=<lang>.json` na język, odpowiedniki `node`, przepisany `index.html` oraz wygenerowane `package.json` i `manifest.json`. To właśnie ten katalog deployujesz: opublikowanie `app/-` na statycznym hostingu jest całym krokiem deployu.

Żadnego z nich nie edytuje się ręcznie. Builder przepisuje je za każdym razem, gdy zmienia się ich źródło, więc poprawka tam znika przy następnym zapisie i żaden błąd nie powie ci dlaczego. Zmieniaj `.view.tree`, `.css` albo źródła i przebuduj.

## Co naprawdę robi meta.tree

`meta.tree` nie jest manifestem pakietu i nie wymienia zależności — te biorą się z kodu, gdzie token `$mol_view` jest już całą deklaracją. Niesie tę garść rzeczy, których kod nie potrafi powiedzieć sam. `app/app.meta.tree` tej strony to cały plik:

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

- **`deploy \/path`** kopiuje plik lub katalog do `-/`, zachowując ścieżkę względem przestrzeni roboczej: `\/bog/smalljs/assets` ląduje w `app/-/bog/smalljs/assets/`. Dla plików statycznych, które deploy musi wieźć, a których żaden kod nie importuje: obrazki, czcionki, ikony.
- **`include \/path`** i **`require \/path`** wciągają moduł, do którego nic się nie odwołuje, jak `\/mol/offline/install`, którego cały sens to service worker rejestrowany przy ładowaniu. Różnią się wyłącznie kolejnością: `require` stawia moduł przed kodem, który go wciągnął, `include` po nim.
- **`pack <name> git \<url>`** to opisany wyżej wpis rejestru, czytany z pliku meta tego katalogu, który będzie zawierał pakiet.

MAM czyta w katalogu każdy plik `*.meta.tree`, więc nazwa nie niesie znaczenia poza konwencją: `<module>.meta.tree` obok modułu, `.meta.tree` w korzeniu przestrzeni roboczej.

W praktyce `deploy`, `include` i `require` należą do modułu aplikacji, bo to on jest budowany i deployowany; zwykłe komponenty rozwiązują wszystko ze swojego kodu i nie potrzebują pliku meta w ogóle. Moduł biblioteczny dostaje go tylko wtedy, gdy naprawdę ma nieodwoływaną zależność: `mol/assert/assert.meta.tree` to pojedyncza linia `include \/mol/dev/format`, i taki rozmiar jest typowy.

Więcej o dyrektywach w [Metadanych modułu](#!section=docs/page=meta).

## Dalej

[Instalacja](#!section=docs/page=installation) omawia serwer deweloperski i build produkcyjny, a [Narzędzia](#!section=docs/page=tooling) mają generator, który napisze ci poprawny układ modułu.
