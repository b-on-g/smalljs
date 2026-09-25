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

Odwołaj się do pakietu przez `require`, a MAM zainstaluje go przy następnym budowaniu i umieści w bundlu:

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

### Ładowanie pakietu w czasie działania

Ciężka biblioteka potrzebna jednemu ekranowi nie musi leżeć w `web.js`. Dostarcz jej gotowy plik przeglądarkowy obok bundla i ładuj go przy pierwszym użyciu.

Wpisz plik do `meta.tree` modułu:

```tree
deploy \/node_modules/@turf/turf/turf.min.js
```

`deploy` instaluje pakiet, jeśli go brakuje, i kopiuje plik do `-/node_modules/@turf/turf/turf.min.js`, zarówno na serwerze deweloperskim, jak i w buildzie produkcyjnym. Załaduj go przez `$mol_import.script`:

```typescript
namespace $ {
	export class $my_app_turf extends $mol_object {

		@ $mol_mem
		static api() {
			$mol_import.script( './node_modules/@turf/turf/turf.min.js' )
			return ( globalThis as any ).turf as typeof import(
				'@turf/turf'
			)
		}

	}
}
```

- Ścieżka jest względna i rozwiązywana względem strony w `-/`, więc ten sam kod działa na serwerze deweloperskim, w `test.html` i przy wdrożeniu pod podścieżką. Wiodący `/` działa tylko, dopóki aplikacja leży w korzeniu domeny.
- `$mol_import.script` wstrzymuje fiber do załadowania skryptu i cache'uje po URL: plik jest pobierany raz, a wszystko, co czyta `$my_app_turf.api()` wewnątrz `$mol_mem`, po prostu na niego czeka.
- Nazwa globalna, tu `turf`, to ta, którą nadaje przeglądarkowy build biblioteki. Jaka to nazwa, mówi jej README.
- `typeof import( … )` daje pełne typowanie. Trzymaj nazwę pakietu w osobnej linii: builder traktuje `require( '…' )` i `import( '…' )` zapisane w jednej linii jako zależność i mimo wszystko umieściłby cały pakiet w `web.js`.

## Dalej

Gdy przestrzeń robocza jest gotowa, poznaj sposób opisywania samego interfejsu — przejdź do [Widoków](#!section=docs/page=views).
