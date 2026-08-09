# Z TypeScriptu do view.tree

Komponent, który napisałeś w [Pierwszych krokach](#!section=docs/page=getting-started), to zwykła klasa TypeScriptu. Kompiluje się, działa i jest wspieranym sposobem opisania komponentu $mol — jednym z kilku, które framework przyjmuje.

Kazał ci też trzymać w głowie cztery rzeczy niemające nic wspólnego z tym, co komponent robi. Ta strona bierze je po kolei i pokazuje linię `view.tree`, która usuwa każdą z nich. Potem pokazuje kod generowany przez kompilator, żebyś mógł sprawdzić, że drzewo nie jest drugim środowiskiem uruchomieniowym: wytwarza tę samą klasę, którą już napisałeś.

Oto ten plik jeszcze raz, do porównania:

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

## Dziecko budujesz ty i ty je buforujesz

Sześć z tych linii to fabryka:

```typescript
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}
```

Usuń `@ $mol_mem`, a nadal się skompiluje. Przestanie za to być jednym komponentem: `this.Name() !== this.Name()`, bo ciało wykonuje `new` przy każdym wywołaniu. Wygrywa ten, kto odczytał właściwość jako ostatni, wcześniejsze instancje zostają ze wszystkim, co uzbierały, i nikt ich nie sprząta — $mol jest właścicielem tylko tych obiektów, które sam ci zbuforował.

W `view.tree` to samo dziecko to jedna linia:

```tree
		<= Name $mol_string
```

Nazwa z wielkiej litery oznacza, że właściwość trzyma komponent, a `<=` ją deklaruje. Nie ma krótszego zapisu, który zapomina o dekoratorze, bo fabryki nie piszesz ty.

## Kierunek danych mówi operator

Nakarmić dziecko to przypisać, po jednej właściwości naraz:

```typescript
			obj.sub = () => [ this.greeting() ]
```

Trzy ruchome części: obiekt dziecka, nazwa właściwości i strzałka, żeby odczyt nastąpił później, a nie teraz. Ta linia mówi, co jest połączone, ale nie w którą stronę; żeby to ustalić, musisz przeczytać ciało strzałki i sprawdzić, czy coś wraca.

Drzewo wkłada kierunek w operator:

```tree
		<= Message $mol_view
			sub / <= greeting \
```

`<=` jest jednokierunkowe, z `greeting` do `sub` dziecka. `/` to lista, `\` zaczyna surowy łańcuch znaków, a `greeting \` deklaruje właściwość z pustym łańcuchem jako wartością domyślną — tą, którą nadpiszesz w TypeScripcie.

## Wiązanie dwukierunkowe dzieli jeden klawisz od cichego tylko-do-odczytu

Pole potrzebuje danych w obie strony i za to odpowiada parametr `next`:

```typescript
			obj.value = ( next?: string ) => this.name( next )
```

Teraz usuń `next`:

```typescript
			obj.value = () => this.name()
```

TypeScript to przyjmie. Funkcja bez argumentów pasuje tam, gdzie oczekiwany jest jeden opcjonalny, więc typy się zgadzają, a audyt zostaje zielony. Pole się renderuje, pokazuje właściwą wartość i po cichu ignoruje wszystko, co wpiszesz.

W drzewie takiego półpołączenia nie da się zapisać:

```tree
		<= Name $mol_string
			value? <=> name? \
```

`<=>` wiąże w obie strony. Nagie `?` oznacza właściwość, która przyjmuje argument, czyli taką, do której można pisać. Tutaj stoi po obu stronach, więc wartość płynie do pola i z powrotem.

## Lokalizowalny napis pozostaje napisem, dopóki nie zrobisz z niego klucza

```typescript
		title() {
			return 'Greeting'
		}
```

Żeby to przetłumaczyć, wymyślasz klucz, zamieniasz literał na wywołanie `$mol_locale.text`, piszesz json i do końca życia projektu ręcznie trzymasz jedno w zgodzie z drugim.

```tree
	title @ \Greeting
```

`@` oznacza napis jako lokalizowalny, resztę robi build. Po zbudowaniu w `my/hello/-/web.locale=en.json` leży:

```json
{
	"$my_hello_Name_hint": "Enter your name",
	"$my_hello_title": "Greeting"
}
```

Tłumacze dostają plik json ze wszystkimi napisami aplikacji. Ty nie piszesz ani jednego klucza.

## Cały komponent

```tree-no-run
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

To jest `hello.view.tree`. W `hello.view.ts` zostaje ta część, która nigdy nie była strukturą:

```typescript
namespace $.$$ {

	export class $my_hello extends $.$my_hello {

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

Klasa rozszerza teraz `$.$my_hello`, bazę wygenerowaną przez drzewo, i nadpisuje jedną właściwość. `$.$$` to przestrzeń nazw dla takich nadpisań.

## Co wypuszcza kompilator

`view.tree` to generator kodu bez własnego środowiska uruchomieniowego. Zbuduj moduł i przeczytaj `my/hello/-view.tree/hello.view.tree.js`:

```javascript
	($.$my_hello) = class $my_hello extends ($.$mol_page) {
		name(next){
			if(next !== undefined) return next;
			return "";
		}
		Name(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this.$.$mol_locale.text("$my_hello_Name_hint")));
			(obj.value) = (next) => ((this.name(next)));
			return obj;
		}
		greeting(){
			return "";
		}
		Message(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.greeting())]);
			return obj;
		}
		title(){
			return (this.$.$mol_locale.text("$my_hello_title"));
		}
		body(){
			return [(this.Name()), (this.Message())];
		}
	};
	($mol_mem(($.$my_hello.prototype), "name"));
	($mol_mem(($.$my_hello.prototype), "Name"));
	($mol_mem(($.$my_hello.prototype), "Message"));
```

Te same fabryki, te same strzałki, te same trzy wywołania `$mol_mem`, plus dwa klucze lokalizacji, których nie musiałeś nazywać. Zanim bundle dotrze do przeglądarki, drzewa już nie ma.

To także powód, dla którego oba formaty mieszają się bez tarć. Komponent napisany drzewem i komponent napisany klasą dają ten sam rodzaj obiektu, więc jedna aplikacja może trzymać oba i żaden nie zauważy różnicy.

## Czego ręcznie napisana klasa nie odda żadnemu narzędziu

Obok wygenerowanego JS kompilator zapisuje `hello.view.tree.d.ts`:

```typescript
declare namespace $ {

	type $mol_string__hint_my_hello_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_my_hello_2 = $mol_type_enforce<
		ReturnType< $my_hello['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_view__sub_my_hello_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $my_hello extends $mol_page {
		name( next?: string ): string
		Name( ): $mol_string
		greeting( ): string
		Message( ): $mol_view
		title( ): string
		body( ): readonly(any)[]
	}

}
```

Pary `$mol_type_enforce` sprawdzają każde wiązanie względem właściwości, którą karmi, więc niezgodność typów jest zgłaszana przy samym wiązaniu, a nie gdzieś w środku dziecka. Ciało klasy poniżej to czytelny dla maszyny opis powierzchni komponentu i naprawdę są tacy, którzy go czytają: plik lokalizacji powyżej pochodzi z tego samego parsowania, a [strony API](#!section=docs/page=api-mol-string) na tej witrynie są generowane z `.view.tree.d.ts` każdego komponentu bazowego.

Ręcznie napisana klasa nie oferuje nic z tego. To kod, a jedyne, co potrafi go przeczytać, to TypeScript.

## Rozmiar tego wszystkiego

Hello World powyżej: 31 linii TypeScriptu zamienia się w 8 linii drzewa plus 8 linii TypeScriptu.

Wraz z komponentem różnica rośnie. `$mol_app_users` — pole wyszukiwania, lista, cztery przyciski i wiersz statusu — ma 30 linii i 840 znaków jako drzewo oraz 125 linii i 3046 znaków jako klasa. Obie wersje są w całości wydrukowane na wiki, na stronie [porównania formatów](https://github.com/hyoo-ru/mam_mol/wiki/View-Formats), więc możesz sam zważyć ten kompromis.

## Co pisać

Jedno i drugie, wybierając komponent po komponencie.

`view.ts` to wspierany format. To do niego kompiluje się drzewo, a komponent napisany w ten sposób zachowuje się jak każdy inny. Gdy komponent to głównie logika z jednym lub dwoma dziećmi, klasa jest uczciwym wyborem, a drzewo niewiele daje.

Drzewo zwraca się tam, gdzie ceremonia się powtarza: ekrany złożone głównie ze struktury, długie serie wiązań, wszystko z tekstem, który tłumacz zechce zobaczyć. To opisuje większość interfejsu i dlatego własne komponenty $mol są pisane właśnie tak.

Dalej sam język drzewa — listy, słowniki, dzieci z kluczem i specjalizowanie komponentu przez dziedziczenie: **[Widoki](#!section=docs/page=views)**.
