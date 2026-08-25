# Narzędzia

$mol działa w każdym edytorze, ale niewielki zestaw narzędzi sprawia, że `.view.tree` i typowane style są znacznie wygodniejsze: generator projektu, serwer języka, integracje z edytorami Zed i VS Code oraz skill, który uczy asystentów LLM tego frameworka.

## Wygenerowanie projektu

`create-view-tree-lsp` generuje gotowy do uruchomienia moduł $mol, byś nie musiał składać szablonowego kodu ręcznie:

```bash
npx create-view-tree-lsp bog/myapp
```

Uruchamiaj z katalogu głównego swojej kopii MAM: stamtąd liczone są ścieżki modułów i tam projekt ma mieszkać. Poza workspace'em polecenie ostrzeże, zamiast zostawiać to do odkrycia przy pierwszym budowaniu.

Argumentem jest ścieżka modułu (`namespace/name` lub równoważne `bog_myapp`). Zapisuje `view.tree`, `view.ts`, `view.css.ts` i `index.html` działającej aplikacji, a także GitHub Actions do jej wdrożenia.

Wszystko, co generator potrafi dodać, jest domyślnie w środku. Wymieniasz tylko to, czego nie chcesz:

```bash
npx create-view-tree-lsp bog/myapp --no-tauri --no-backend
```

- `--no-baza` — local-first magazyn **Giper Baza**
- `--no-docker` — konfiguracja **Docker** z `docker-compose.yml` i configiem nginx
- `--no-tauri` — desktopowa powłoka **Tauri**
- `--no-backend` — backend REST `$mol_server` z magazynem `node:sqlite` i współdzielonym typem elementu w TypeScript
- `--no-prerender`, `--no-seo` — widoczność w wyszukiwarkach, opisana poniżej w sekcji [Ciągła integracja](#!section=docs/page=tooling/Docs.Body=Ci%C4%85g%C5%82a%20integracja)

Nieznana flaga przerywa uruchomienie, więc literówka nie zostawi czegoś w projekcie po cichu.

Generator to cienka nakładka na CLI serwera języka, więc `npx view-tree-lsp create bog/myapp` robi to samo bezpośrednio.

## Tłumaczenia

Tłumaczenia leżą obok swojego modułu, w `<moduł>/<nazwa>.locale=<lang>.json`. Kodowi jest tak wygodnie, tłumaczowi już mniej: zamiast jednej listy zdań dostaje trzydzieści małych plików.

**[$yuf_localizer](https://zerkalica.github.io/yuf/#!demo=yuf_localizer_demo)** zasypuje tę przepaść. Podaj mu adresy projektów i kody języków, a pokaże wszystkie klucze na jednej liście z wyszukiwaniem, oznaczając to, co jeszcze zostało: klucze istniejące tylko po angielsku, zmienione, ale niezatwierdzone, oraz przeterminowane, których projekt już nie ma. Tłumaczenia trzymają się w przeglądarce do czasu eksportu, więc nic nie ginie między sesjami.

Gdy tłumacz skończy, wyeksportuj wynik i rozdziel go z powrotem na moduły:

```bash
# z katalogu głównego MAM
npx view-tree-lsp locale bog/myapp/app/- --exclude=mol --update
```

Argumentem jest katalog albo pojedynczy plik lokalizacji. Flagi:

- `--include=` przyjmuje fragment ścieżki i zostawia tylko moduły, których ścieżka go zawiera; można powtarzać dowolnie wiele razy
- `--exclude=` przeciwnie, pomija takie — `--exclude=mol` zostawia pakiety samego frameworka nietknięte
- `--update` scala z istniejącymi plikami: wartości ze źródła wygrywają, a klucze nieobecne w źródle zostają
- `--dry` pokazuje plan i nic nie zapisuje

Każdy klucz niesie ścieżkę swojego modułu, więc `$my_page_greeting` trafi do `my/page/page.locale=ru.json` — obok źródeł, do których należy. Ustalenie tego modułu jest jednak subtelniejsze, niż wygląda: `_` rozdziela zarówno katalogi, jak i słowa, więc najdłuższa pasująca ścieżka to zła odpowiedź. W `$my_page_lang_hint` właściwość zaczyna się od `lang`, a prawdziwy sąsiedni podmoduł `my/page/lang` połknąłby klucz. Dlatego polecenie pyta każdy moduł-kandydat, jakie klucze deklaruje — MAM zapisuje dokładnie te w jego pliku lokalizacji w `-view.tree` — i oddaje klucz właścicielowi.

## Ciągła integracja

Generator zapisuje GitHub Actions w `.github/workflows/`, dzięki czemu nowy projekt wdraża się i wydaje bez dodatkowej konfiguracji.

`deploy.yml` uruchamia się przy każdym pushu. Buduje aplikację za pomocą `hyoo-ru/mam_build`, publikuje `app/-` na **GitHub Pages** z `main` i daje każdej gałęzi `feature/*` własny folder podglądu — usuwany automatycznie po skasowaniu gałęzi.

### SEO

Oba są domyślnie włączone i oba odpalają się na tagach `v*`:

- **`--no-prerender`** usuwa krok, który renderuje wymienione przez ciebie ekrany (na przykład `home`) do statycznego HTML-a przez `b-on-g/mol-prerender-action` — właśnie to sprawia, że crawlery i podglądy linków widzą prawdziwą treść.
- **`--no-seo`** usuwa runtime `$bog_seo`: router po pathname z mapą strony, `robots.txt`, `llms.txt` i wstrzykiwaniem meta na każdą stronę. Zadanie serwuje build, zrzuca kanoniczny prerenderowany HTML i zawija go z powrotem do wdrożenia.

Robią to samo i piszą do tego samego katalogu, więc do `deploy.yml` trafia tylko jedno: `$bog_seo`, dopóki jest włączone, i prerender-action, gdy tylko podasz `--no-seo`. Zostaw `$bog_seo`, gdy potrzebujesz map strony i metadanych na stronę, a zejdź do prerender-action, gdy całą robotą jest garstka publicznych ekranów.

### Pulpit Tauri

Z opcją Tauri `tauri.yml` buduje binaria desktopowe na tagach `v*` (lub na żądanie) przez wielokrotnego użytku workflow `b-on-g/tauri-mol-workflow-template`, z tego samego modułu, który wdrażasz do sieci.

## Serwer języka

`view-tree-lsp` to implementacja Language Server Protocol dla formatu `view.tree`. Uruchamiaj go na żądanie przez npx, bez globalnej instalacji:

```bash
npx view-tree-lsp@latest
```

Skanuje Twój workspace i daje każdemu edytorowi obsługującemu LSP:

- uzupełnianie dla komponentów `$mol_*` oraz komponentów i właściwości zdefiniowanych w Twoim własnym projekcie
- podpowiedzi właściwości ograniczone do komponentu pod kursorem
- zarys deklaracji komponentów do nawigacji
- aktualizacje na żywo w miarę zmian plików

Ponieważ mówi w LSP, możesz skierować klienta języka dowolnego edytora na `npx view-tree-lsp`. Dwie poniższe integracje podłączają go za Ciebie.

## Zed

Rozszerzenie **View Tree Syntax Highlighting for $mol** łączy gramatykę tree-sitter, serwer języka oraz opcjonalny motyw ikon. Zainstaluj je z menedżera rozszerzeń Zeda:

1. Otwórz paletę poleceń (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Uruchom **zed: extensions**
3. Wyszukaj `view.tree` lub `mol` i zainstaluj rozszerzenie

Otrzymujesz podświetlanie składni, uzupełnianie i zarys dla plików `.view.tree`. [Źródła](https://github.com/Dev-cmyser/zed-view.tree-mol-support) i pasujący [motyw ikon](https://github.com/Dev-cmyser/zed-viewtree-icon-theme) są na GitHubie.

## VS Code

Workspace MAM już niesie swoją konfigurację VS Code. Gdy otworzysz sklonowany folder `mam`, VS Code zaproponuje instalację zalecanych rozszerzeń z `.vscode/extensions.json`:

- `nin-jin.vscode-language-tree` — obsługa języka `view.tree`
- `stan-donarise.view-tree-language` — składnia i gramatyka
- `editorconfig.editorconfig` — spójne formatowanie

Ten sam folder dostarcza `mol.code-snippets`, więc snippety komponentów i bindingów są dostępne bez żadnej dodatkowej konfiguracji. Zaakceptuj monit, a pliki `.view.tree` i TypeScript są podświetlane od ręki.

## Skill dla LLM

`mol_skill` daje asystentowi AI kontekst potrzebny do pisania w $mol: składnię `view.tree`, budowę modułu MAM, podział między `view.ts` i `view.css.ts`, modelowanie danych w Giper Baza oraz pakowanie w Tauri. To zwykły folder ze skillem, przepływ `SKILL.md` plus przewodniki referencyjne, więc wczytać go może dowolne narzędzie LLM czytające format skills, w tym Claude Code i Cursor. Zainstaluj go przez CLI skills:

```bash
npx skills add b-on-g/mol_skill --all -g
```

Potem pytaj własnymi słowami („budowa modułu MAM”, „CRUD i role w Giper Baza”), a asystent otworzy odpowiedni przewodnik przed odpowiedzią, dzięki czemu pisany kod trzyma się konwencji z tej dokumentacji. [Źródła](https://github.com/b-on-g/mol_skill) są na GitHubie, a same pliki referencyjne czyta się dobrze również osobno, jeśli wolisz przejrzeć je samodzielnie.

## Linki

- Generator — [create-view-tree-lsp](https://github.com/Dev-cmyser/create-view-tree-lsp)
- Serwer języka — [view-tree-lsp](https://github.com/Dev-cmyser/view.tree)
- Rozszerzenie Zed — [zed-view.tree-mol-support](https://github.com/Dev-cmyser/zed-view.tree-mol-support)
- Skill dla LLM — [mol_skill](https://github.com/b-on-g/mol_skill)
