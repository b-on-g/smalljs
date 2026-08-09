# Pierwsze kroki

Ta strona przeprowadzi cię od pustego folderu do działającej, reaktywnej aplikacji $mol. Powinno to zająć około piętnastu minut. Każdy fragment poniżej to prawdziwy, działający kod — skopiuj go bez zmian.

Komponent napiszesz w zwykłym TypeScripcie. $mol ma też krótszy format opisu komponentów, `view.tree`, i spotkasz go na następnej stronie. Tutaj nie jest potrzebny: komponent $mol tak czy inaczej pozostaje zwykłą klasą.

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

`npm start` uruchamia serwer deweloperski pod `http://localhost:9080/`. Obserwuje twoje pliki i przebudowuje automatycznie — zostaw go działającego we własnym terminalu.

## 2. Utwórz moduł

Aplikacja $mol to po prostu folder. Wybierz przestrzeń nazw (własną, np. `my`) i nazwę (`hello`).

```bash
mkdir -p my/hello
```

> **Jedna zasada do zapamiętania:** podkreślenia w nazwie komponentu to separatory folderów. `$my_hello` mieszka w `my/hello/`, a `$my_hello_form` mieszkałby w `my/hello/form/`. Nazwy folderów modułów nigdy nie zawierają podkreślenia.

Teraz dodaj dwa pliki wewnątrz `my/hello/`.

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

Atrybut `mol_view_root="$my_hello"` montuje twój komponent przy ładowaniu strony.

### hello.view.ts — komponent

```typescript
namespace $ {

	export class $my_hello extends $mol_page {

		title() {
			return 'Greeting'
		}

		body() {
			return [ this.Name(), this.Message() ]
		}

		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}

		@ $mol_mem
		name( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.greeting() ]
			return obj
		}

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

Czytając od góry:

- `$my_hello` mieszka w `namespace $`, otaczającej przestrzeni nazw, w której żyje każdy komponent $mol. Rozszerza `$mol_page`, wbudowaną skorupę strony z tytułem i treścią. `$mol_string` niżej to wbudowane pole tekstowe.
- `body()` zwraca dzieci. Dziecko nie jest tu znacznikiem, tylko właściwością: `Name` i `Message` to metody, które możesz wywołać, nadpisać w podklasie albo dosięgnąć po nazwie z arkusza stylów.
- `Name()` buduje pole i je podłącza. Każda jego właściwość dostaje **strzałkę**, a nie wartość. Dziecko woła tę strzałkę wtedy, gdy potrzebuje danych, więc zawsze czyta bieżące.
- `name( next?: string )` to stan. Wywołana bez argumentu czyta, z argumentem zapisuje. To właśnie przekazanie całej tej funkcji do `obj.value` sprawia, że pisanie w polu aktualizuje `name`.
- `@ $mol_mem` buforuje właściwość na instancję. Przy `name` znaczy to, że wartość jest przechowywana, a wszystko, co ją odczytało, przelicza się przy zmianie. Przy `Name` i `Message` znaczy to jeden komponent potomny, zbudowany raz, zamiast nowego przy każdym wywołaniu.
- `greeting()` czyta `name()`. Ten odczyt *jest* subskrypcją. Gdy `name` się zmienia, `greeting` przelicza się, a tekst na ekranie za nim podąża — bez deklarowania efektu, bez listy zależności, bez wywołania ponownego renderu.

## 3. Uruchom

Serwer deweloperski z kroku 1 już obserwuje. Wystarczy otworzyć:

```
http://localhost:9080/my/hello/
```

Wpisz swoje imię, a powitanie aktualizuje się w trakcie pisania. To jest reaktywność $mol: stan sam płynie do widoku.

## 4. Dodaj drugą reaktywną wartość

Reaktywność się składa. Dodaj licznik długości, który czyta ten sam `name`, bez żadnego dodatkowego okablowania.

Wstaw go do `body()`:

```typescript
		body() {
			return [ this.Name(), this.Message(), this.Counter() ]
		}
```

i dopisz dwie właściwości za nim:

```typescript
		@ $mol_mem
		Counter() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.counter() ]
			return obj
		}

		counter() {
			return `${ this.name().length } characters`
		}
```

Zarówno `greeting`, jak i `counter` czytają `name`, i oba aktualizują się razem. Dodaj trzeci, dodaj dziesiąty: reaktywna połowa nigdy nie zmienia kształtu.

Druga połowa zmienia. Trzy linie logiki przyszły z sześcioma liniami hydrauliki wokół — fabryka, `new`, strzałka, `return obj`. Pomnóż to przez każde dziecko na prawdziwym ekranie, a masz powód, dla którego istnieje `view.tree`.

## 5. Sprawdź swój build

MAM zapisuje plik diagnostyczny obok każdej aplikacji. Po zbudowaniu otwórz:

```
http://localhost:9080/my/hello/-/web.audit.js
```

Czysty audyt oznacza brak nieużywanych zależności, brak problemów z typami, nic do naprawienia. Wyrób sobie nawyk zerkania na niego — łapie błędy, zanim dotrą do przeglądarki.

## Zbudowałeś aplikację $mol

Reaktywny komponent z dwukierunkowym wiązaniem i stanem pochodnym, w jednym pliku, z zerową konfiguracją.

Teraz weź ten sam plik i zobacz, jak się kurczy: **[Z TypeScriptu do view.tree](#!section=docs/page=from-ts-to-view-tree)**.
