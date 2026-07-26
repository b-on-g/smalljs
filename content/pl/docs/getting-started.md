# Pierwsze kroki

Ta strona przeprowadzi cię od pustego folderu do działającej, reaktywnej aplikacji $mol. Powinno to zająć około piętnastu minut. Każdy fragment poniżej to prawdziwy, działający kod — skopiuj go bez zmian.

## Czego potrzebujesz

- **Node.js 18+** i **git**. To cała lista.

Nie instalujesz globalnego CLI ani nie generujesz szablonowego kodu, który później musisz zrozumieć. Aplikacje $mol żyją wewnątrz przestrzeni roboczej MAM, która już wie, jak je budować i serwować.

## 1. Pobierz przestrzeń roboczą

MAM to narzędzie budujące i rejestr modułów dla $mol. Sklonuj je i zainstaluj raz.

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` uruchamia serwer deweloperski pod adresem `http://localhost:9080/`. Obserwuje twoje pliki i przebudowuje automatycznie — zostaw go działającego we własnym terminalu.

## 2. Utwórz moduł

Aplikacja $mol to po prostu folder. Wybierz przestrzeń nazw (własną, np. `my`) i nazwę (`hello`).

```bash
mkdir -p my/hello
```

> **Jedna zasada do zapamiętania:** podkreślenia w nazwie komponentu to separatory folderów. `$my_hello` mieszka w `my/hello/`, a `$my_hello_form` mieszkałby w `my/hello/form/`. Nazwy folderów modułów nigdy nie zawierają podkreślenia.

Teraz dodaj trzy pliki wewnątrz `my/hello/`.

### index.html — punkt wejścia

```html
<!doctype html>
<html mol_view_root>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>
	<body mol_view_root>
		<div mol_view_root="$my_hello"></div>
		<script src="web.js"></script>
	</body>
</html>
```

Atrybut `mol_view_root="$my_hello"` montuje twój komponent podczas ładowania strony.

### hello.view.tree — układ

```tree
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

Kilka rzeczy wartych nazwania.

- `$mol_page` i `$mol_string` to komponenty wbudowane — powłoka strony i pole tekstowe.
- `<=` wiąże właściwość w jedną stronę; `<=>` wiąże w obie strony. Więc `value? <=> name?` utrzymuje pole wejściowe i twój stan `name` w synchronizacji.
- `@` oznacza ciąg podlegający lokalizacji; `\` rozpoczyna surowy ciąg.

### hello.view.ts — zachowanie

```typescript
namespace $.$$ {
	export class $my_hello extends $.$my_hello {
		@ $mol_mem
		greeting() {
			const name = this.name()
			return name ? `Hello, ${name}!` : 'Please enter your name'
		}
	}
}
```

`@ $mol_mem` czyni `greeting` reaktywną, buforowaną właściwością. Czyta ona `name()`, więc w chwili, gdy `name` się zmienia, `greeting` jest przeliczane, a wiadomość na ekranie się aktualizuje. Nigdy nie napisałeś subskrypcji, efektu ani wywołania ponownego renderowania.

## 3. Uruchom

Serwer deweloperski z kroku 1 już obserwuje. Wystarczy otworzyć:

```
http://localhost:9080/my/hello/
```

Wpisz swoje imię — powitanie aktualizuje się w miarę pisania. To reaktywność $mol: stan sam płynie do widoku.

## 4. Dodaj drugą reaktywną wartość

Reaktywność się komponuje. Dodaj licznik długości zależny od tego samego `name`, bez dodatkowego okablowania.

W `hello.view.tree` dodaj wiersz pod `Message`:

```tree
		<= Counter $mol_view
			sub / <= counter \
```

W `hello.view.ts` dodaj metodę:

```typescript
		@ $mol_mem
		counter() {
			return `${this.name().length} characters`
		}
}
```

Zarówno `greeting`, jak i `counter` czytają `name`; oba aktualizują się razem. Dodaj trzeci, dodaj dziesiąty — wzorzec się nie zmienia. Dlatego kod $mol pozostaje płaski, gdy funkcje się nawarstwiają.

## 5. Sprawdź swój build

MAM zapisuje plik diagnostyczny obok każdej aplikacji. Po zbudowaniu otwórz:

```
http://localhost:9080/my/hello/-/web.audit.js
```

Czysty audyt oznacza brak nieużywanych zależności, brak problemów z typami, nic do naprawienia. Wyrób sobie nawyk zerkania na niego — łapie błędy, zanim dotrą do przeglądarki.

## Zbudowałeś aplikację $mol

Masz reaktywny komponent, dwukierunkowe wiązanie i stan pochodny — z trzema małymi plikami i zerową konfiguracją.

Idź dalej: **[Przewodnik](#!section=docs/page=installation)** szczegółowo omawia instalację, widoki, stan, routing i dane — i zamienia ten Hello World w coś prawdziwego.
