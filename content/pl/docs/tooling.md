# Narzędzia

$mol działa w każdym edytorze, ale niewielki zestaw narzędzi sprawia, że `.view.tree` i typowane style są znacznie wygodniejsze: generator projektu, serwer języka, integracje z edytorami Zed i VS Code oraz skill, który uczy asystentów LLM tego frameworka.

## Wygenerowanie projektu

`create-view-tree-lsp` generuje gotowy do uruchomienia moduł $mol, byś nie musiał składać szablonowego kodu ręcznie:

```bash
npx create-view-tree-lsp bog/myapp
```

Argumentem jest ścieżka modułu (`namespace/name` lub równoważne `bog_myapp`). Zapisuje `view.tree`, `view.ts`, `view.css.ts` i `index.html` działającej aplikacji, a także GitHub Actions do jej wdrożenia. Domyślnie dołącza też local-first magazyn **Giper Baza**, konfigurację **Docker** oraz desktopową powłokę **Tauri**. Każde z nich możesz wyłączyć flagą:

```bash
npx create-view-tree-lsp bog/myapp --no-baza --no-docker --no-tauri
```

Kilka elementów jest natomiast opcjonalnych:

- `--backend` dodaje backend REST `$mol_server` z magazynem `node:sqlite` i współdzielonym typem elementu w TypeScript
- `--prerender` i `--seo` dodają widoczność w wyszukiwarkach, opisaną poniżej w sekcji [Ciągła integracja](#!section=docs/page=tooling/Docs.Body=Ci%C4%85g%C5%82a%20integracja)

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

Dwie niezależne opcje, obie wyzwalane tagami `v*`:

- **`--prerender`** renderuje wskazane przez Ciebie ekrany (na przykład `home`) do statycznego HTML za pomocą `b-on-g/mol-prerender-action`, dzięki czemu roboty i podglądy linków widzą prawdziwą treść.
- **`--seo`** dodaje runtime `$bog_seo`: router po pathname z mapą witryny, `robots.txt`, `llms.txt` oraz wstrzykiwaniem meta na każdą stronę. Zadanie serwuje build, zrzuca kanoniczny prerenderowany HTML i wplata go z powrotem do wdrożenia.

Sięgnij po prerender action, gdy garstka publicznych ekranów musi być indeksowalna, a po `$bog_seo`, gdy potrzebujesz map witryny i metadanych na każdą stronę.

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
