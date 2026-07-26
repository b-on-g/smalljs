# Instalacja

[Pierwsze kroki](#!section=docs/page=getting-started) prowadzą Cię krok po kroku przez pierwszą aplikację. Ta strona to materiał referencyjny: jak zorganizowany jest projekt $mol i jak działa budowanie.

## Wymagania

- **Node.js 18+** i **git**. Nic więcej nie jest instalowane globalnie.

## Przestrzeń robocza MAM

Aplikacje $mol żyją wewnątrz **MAM** — narzędzia budującego i rejestru modułów. Klonujesz je raz i rozwijasz swoje moduły w środku:

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` uruchamia obserwujący serwer deweloperski pod adresem `http://localhost:9080/`. Przebudowuje przy zapisie i automatycznie rozwiązuje zależności — nigdy nie utrzymujesz konfiguracji bundlera.

## Jak nazywane są moduły

Każda nazwa komponentu odpowiada ścieżce folderu, a **każdy podkreślnik jest separatorem folderów**:

```
$my_app          →  my/app/
$my_app_header   →  my/app/header/
```

Nazwy folderów modułów nigdy nie zawierają podkreślnika — dla nazw wielowyrazowych używaj zagnieżdżonych folderów. Jeśli używany komponent nigdy nie pojawia się w bundlu, prawie zawsze ścieżka folderu nie odpowiada nazwie klasy.

## Anatomia modułu

Komponent to folder zawierający maksymalnie cztery pliki:

| Plik | Przeznaczenie |
|------|------|
| `name.view.tree` | Deklaratywny układ |
| `name.view.ts` | Zachowanie (TypeScript) |
| `name.view.css.ts` | Typowane style |
| `name.view.tree`, `index.html` | Punkt wejścia modułu aplikacji |

`index.html` aplikacji montuje komponent główny:

```html
<body mol_view_root>
	<div mol_view_root="$my_app"></div>
	<script src="web.js"></script>
</body>
```

## Budowanie na produkcję

Serwer deweloperski buduje w locie, ale możesz zbudować dowolny moduł jawnie z katalogu głównego przestrzeni roboczej:

```bash
npm run start my/app
```

Wynik trafia do `my/app/-/` — w tym `web.js`, `web.css` i `web.audit.js`. **Zawsze sprawdzaj audyt:** czysty `web.audit.js` oznacza brak nieużywanych zależności i brak błędów typów.

## Dodawanie pakietów npm

Odwołaj się do pakietu przez `require`, a MAM zainstaluje go przy następnym budowaniu:

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

## Dalej

Gdy przestrzeń robocza jest gotowa, poznaj sposób opisywania samego interfejsu — przejdź do [Widoków](#!section=docs/page=views).
