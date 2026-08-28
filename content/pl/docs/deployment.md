# Wdrożenie

Zbudowana aplikacja $mol to katalog plików statycznych. Nie ma serwera do uruchomienia, procesu Node do utrzymywania przy życiu ani adaptera do wyboru: co hostuje katalog, to hostuje aplikację.

## Co właściwie wdrażasz

Build zapisuje wszystko do katalogu `-/` wewnątrz modułu:

```
my/hello/-/
├── index.html                 przepisany pod ścieżkę wdrożenia
├── web.js                     cała aplikacja, jeden plik
├── web.css
├── web.locale=en.json         po jednym na język
├── manifest.json
└── …                          wszystko, co wciągnęła dyrektywa `deploy`
```

Ten katalog to jest strona. Podaj go dowolnym hostingiem statycznym, a aplikacja działa.

Cała reszta w `my/hello/` to źródła, a `-/` jest generowany: `.gitignore` workspace'u ignoruje `-*`, więc wynik builda nigdy nie trafia do historii samego projektu. Do sieci jedzie z gałęzi wdrożeniowej.

## Krótko

Workflow pisze scaffolder, więc nowy projekt publikuje się przy pushu:

```bash
npx create-view-tree-lsp my/hello
git push
```

`.github/workflows/deploy.yml` buduje moduł i wypycha `my/hello/-/` na gałąź `gh-pages`. GitHub serwuje tę gałąź, gdy tylko w **Settings → Pages → Source** stoi *Deploy from a branch* z `gh-pages` — a to właśnie domyślne ustawienie repozytorium, w którym taka gałąź powstała. Jeśli adres zwraca 404, od tego ustawienia zaczynaj.

Strona żyje wtedy pod `https://<user>.github.io/<repo>/`.

## Co robi workflow

Niosą go dwie akcje, każda z paroma wejściami:

```yaml
- uses: hyoo-ru/mam_build@master2
  with:
      package: "my/hello"     # katalog do zbudowania, względem workspace'u
      modules: "app"          # które moduły w środku

- uses: hyoo-ru/gh-deploy@v4.4.1
  if: github.ref == 'refs/heads/main'
  with:
      folder: "my/hello/app/-"
```

`mam_build` rozwija wokół twojego pakietu workspace MAM, zamienia tokeny `$name` z kodu na repozytoria, w których te nazwy mieszkają, i buduje. Nie potrzebuje ani lockfile'a, ani kroku `npm install`: listą zależności jest rejestr w `.meta.tree`, jak opisuje [Struktura projektu](#!section=docs/page=structure).

`gh-deploy` commituje zbudowany katalog na `gh-pages`. `target-folder` kładzie go w podkatalogu zamiast w korzeniu — tak powstaje podgląd gałęzi:

```yaml
- name: Deploy feature branch
  if: startsWith(github.ref, 'refs/heads/feature/')
  uses: hyoo-ru/gh-deploy@v4.4.1
  with:
      folder: "my/hello/app/-"
      target-folder: ${{ github.ref_name }}
```

Każda gałąź `feature/*` dostaje wtedy własny adres na tej samej stronie Pages, a wyzwalacz `delete` usuwa katalog, gdy gałąź znika.

## Jeden plik, którego wdrożenie potrzebuje

Pakiet, który się wdraża, potrzebuje obok `.gitattributes` z jedną linią:

```
* -text
```

Wdrożenie to commit wyniku builda na gałąź, a w tym wyniku nie jest sam tekst. Fonty i obrazy znormalizowane po drodze do tego commita docierają do czytelnika popsute, podczas gdy sam build zostaje zielony. Scaffolder pisze ten plik sam; w repozytorium założonym ręcznie dodaj go ręcznie.

## Pliki, którym miejsce w korzeniu strony

`deploy \/path` w `meta.tree` kopiuje plik do `-/`, **zachowując ścieżkę względem workspace'u**. Dla zasobów, do których odwołuje się kod, to jest w porządku; dla plików, których hosting szuka w korzeniu — nie. `CNAME`, `robots.txt`, strona weryfikacyjna wyszukiwarki: te kopiuje się krokiem workflow po buildzie, a przed krokiem wdrożenia.

```yaml
- name: Copy root-level files
  run: cp my/hello/public/CNAME my/hello/app/-/CNAME
```

## Głębokie linki na hostingu statycznym

Aplikacja z routingiem po ścieżce (`/section=docs/page=views`, a nie `#!section=docs`) prosi hosting o jedno: każda nieznana ścieżka pod montowaniem ma zwracać `index.html` aplikacji. Inaczej pierwsze wejście z głębokiego linku to 404 i działa tylko nawigacja ze strony głównej.

GitHub Pages nie ma reguł przepisywania, więc droga wiedzie przez jego `404.html`: jest podawany na każdą nieznaną ścieżkę, a kilka linii w środku oddaje adres do `index.html`, który router rozwija w prawdziwą trasę. Kopiuje się go obok wyniku builda, tym samym krokiem co pliki wyżej.

Reszta hostingów mówi to jedną linią: `try_files $uri /index.html` w nginx, `try_files {path} /index.html` w Caddy, reguła `/* /index.html 200` w Netlify.

Aplikacji na routerze hashowym (domyślnym) nic z tego nie trzeba: to, co po `#`, do serwera nie dojeżdża.

## Sprawdzić przed pushem

Build jest ten sam lokalnie i w CI, więc zielony audyt na maszynie oznacza zielone wdrożenie:

```bash
npx mam my/hello/app
cat my/hello/app/-/web.audit.js
```

`Audit passed` to cały raport. Żeby zobaczyć rzecz na żywo, podaj katalog dowolnym serwerem statycznym:

```bash
npx serve my/hello/app/-
```

## Nie tylko GitHub Pages

Nic z powyższego nie jest związane z GitHubem. Na wyjściu jest katalog, wdrożenie to kopiowanie. Netlify, Cloudflare Pages, S3 za CDN-em, nginx na VPS-ie, obraz Dockera z tym katalogiem w środku — krok builda to wciąż `npx mam my/hello/app`, a wgrywasz `my/hello/app/-`.

Dla instalacji działającej bez sieci [Offline](#!section=docs/page=offline) dokłada service workera, który cachuje bundle, i ten sam katalog staje się aplikacją do zainstalowania.
