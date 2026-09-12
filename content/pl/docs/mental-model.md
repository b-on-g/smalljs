# Model mentalny

Jeśli przychodzisz z React albo Vue, pierwsze dni w $mol spędzasz na szukaniu rzeczy, których tu nie ma: `computed`, `watch`, `useEffect`, `onMounted`, `fetch` w haku cyklu życia. Nie są schowane gdzieś w API — model nie ma dla nich miejsca. Ta strona to pięciominutowa wersja tego modelu. Przeczytaj ją przed [Widokami](#!section=docs/page=views) i wróć tu, gdy zabraknie ci znajomej nazwy.

## Pull, nie push

Nic nie jest obliczane, dopóki ktoś tego nie przeczyta. Widok renderuje się, czytając swoje właściwości; każda właściwość czyta to, czego potrzebuje; łańcuch zależności składa się sam z tych odczytów. Nie ma subskrypcji do zadeklarowania ani `watch` do zarejestrowania: odczyt jest subskrypcją.

```tree
$my_profile $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
```

```typescript
namespace $.$$ {
	export class $my_profile extends $.$my_profile {
		@ $mol_mem
		user() {
			return this.$.$mol_fetch.json( 'https://api.example.com/me' ) as { name: string }
		}
		name() {
			return this.user().name
		}
	}
}
```

Renderowanie `Name` czyta `name()`, `name()` czyta `user()`, a `user()` sięga do sieci. Nikt nie powiedział widokowi o żądaniu i nikt nie powiedział żądaniu o widoku. Gdy `user()` się zmieni, przeliczy się wszystko, co je czytało — i nic poza tym.

## Bez cyklu życia

Nie ma `mounted`, nie ma `useEffect`, nie ma `created`. Dane zamawia się, czytając właściwość, a widok czyta swoje właściwości wtedy, gdy się renderuje. Dlatego przykład powyżej ładuje użytkownika w chwili, gdy `$my_profile` pojawia się na ekranie, i ani chwili wcześniej. Gdy widok znika z ekranu, nikt już nie czyta `user()`, a komórka jest zwalniana razem z widokiem.

To cały zamiennik wzorca „fetch on mount”: widok prosi o to, czego potrzebuje, a framework decyduje, kiedy zapytać. Ładowanie nie jest podpięte do zdarzenia strony, tylko do tego, że coś jest widoczne.

## Właściwość to komórka

Jedna metoda z opcjonalnym argumentem jest naraz getterem, setterem, wartością pochodną i stanem:

```typescript
@ $mol_mem
count( next?: number ) {
	return next ?? 0
}
```

Wywołana bez argumentu czyta, wywołana z argumentem zapisuje. `@ $mol_mem` zamienia metodę w buforowaną komórkę, która przelicza się, gdy zmieniło się coś, co przeczytała. Wartość pochodna to po prostu metoda `@ $mol_mem` czytająca inne metody. Obserwator nie jest potrzebny: efekt uboczny należy do zdarzenia, a handler zdarzenia to metoda oznaczona `@ $mol_action`.

```typescript
@ $mol_mem
doubled() {
	return this.count() * 2
}

@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

[Stan i reaktywność](#!section=docs/page=state) opisuje reguły tego, co może się dziać wewnątrz każdego z tych dwóch.

## Synchroniczny kod, który czeka

`user()` powyżej wygląda synchronicznie i jest napisane tak, jakby odpowiedź już tam była. Działa, bo każde obliczenie biegnie we włóknie. `this.$.$mol_fetch.json()` zawiesza to włókno, a framework uruchamia obliczenie od nowa, gdy odpowiedź nadejdzie. Do tego czasu widok, który przeczytał `user()`, pokazuje stan ładowania; jeśli żądanie się nie powiedzie, ten sam widok pokaże błąd. Nie piszesz ani flagi `isLoading`, ani `try`/`catch`.

Ten sam mechanizm obsługuje dowolne źródło asynchroniczne. [Pobieranie danych](#!section=docs/page=data) przechodzi przez przeładowywanie i obsługę błędów.

## Wszystko jest nadpisaniem

Plik `view.tree` to lista deklaracji metod. Każda linia pod komponentem jest jego właściwością z wartością domyślną, a właściwość dowolnego zagnieżdżonego komponentu można zdefiniować na nowo dokładnie tam, gdzie jest użyty — jedną linią. Placeholder pola tekstowego to właściwość `hint` komponentu `$mol_string`:

```tree
$my_search $mol_view
	sub /
		<= Query $mol_string
			hint \Search
			value? <=> query? \
```

Nie ma listy propsów do rozszerzenia, nie ma wrappera do napisania ani forka do utrzymywania. Jeśli komponent ma właściwość, możesz ustawić ją z zewnątrz.

## Jak czytać źródła

Poprzednia sekcja rodzi prawdziwe pytanie: skąd wiesz, że właściwość nazywa się `hint`? Odpowiedź brzmi: sprawdzasz — a framework jest zbudowany tak, żeby sprawdzanie było tanie.

**Źródła frameworka leżą obok twoich.** W przestrzeni roboczej MAM `mol/string/string.view.tree` dzieli od `my/hello/` jeden folder. Nie ma go w `node_modules` ani wewnątrz bundle'a; to dokładnie taki sam plik, jakie piszesz sam.

**Nazwa klasy jest ścieżką.** `$mol_string` mieszka w `mol/string/`, `$mol_button_major` w `mol/button/major/`. Każde podkreślenie to separator folderów, więc nazwę z twojego drzewa zawsze da się zamienić na folder do otwarcia. Wsparcie dla edytorów ze strony [Narzędzia](#!section=docs/page=tooling) uzupełnia te nazwy za ciebie.

**`.view.tree` komponentu to pełna lista jego właściwości wraz z wartościami domyślnymi.** Kształt wartości mówi o typie: `\` zaczyna ciąg znaków, `/` listę, `*` słownik, goła liczba to liczba, `true` i `false` to wartości logiczne, `null` oznacza brak, a `<=` wprowadza podwidok albo właściwość wziętą od właściciela. Oto ta część `mol/string/string.view.tree`, która ma znaczenie dla pola wejściowego:

```tree
$mol_string $mol_view
	dom_name \input
	enabled true
	field *
		^
		disabled <= disabled false
		value <= value_changed? <=> value? \
		placeholder <= hint_visible <= hint \
	attr *
		^
		type <= type? \text
```

Przeczytaj to na głos. `dom_name \input`: ten komponent renderuje element `input`. `enabled true`: właściwość logiczna, domyślnie włączona. `field *` to słownik pól elementu DOM; nazwy po lewej należą do DOM, nazwy po prawej do komponentu, a ta skrajnie po prawej jest tą, którą ustawiasz. Czyli `placeholder` z DOM bierze się z `hint`, domyślnie pustego ciągu znaków; `value` z DOM to zapisywalna właściwość `value?`, a atrybut `type` to zapisywalne `type?`, domyślnie `text`. Placeholder, wyłączone pole i pole hasła to w twoim drzewie `hint`, `enabled false` i `type \password`.

**Typowany interfejs jest generowany z tego samego drzewa.** `mol/string/-view.tree/string.view.tree.d.ts` wypisuje te same właściwości jako sygnatury TypeScriptu, a [dokumentacja API](#!section=docs/page=api-mol-string) na tej stronie powstaje z tego pliku. Wszystkie trzy się zgadzają, bo wszystkie trzy pochodzą z jednego źródła.

**Większość komponentów ma folder `demo/` i `readme.md`.** `mol/string/demo/demo.view.tree` pokazuje pole z podpowiedzią, wyłączone i z wstępnie ustawioną wartością. Gdy potrzebujesz komponentu w jakimś stanie, znajdź najbliższe mu demo i skopiuj linię.

Razem wzięte — placeholder zajmuje jakąś minutę:

```bash
ls mol | grep string
cat mol/string/string.view.tree
```

Widzisz `hint \` pod `$mol_string` i piszesz `hint \Search` pod swoim `$mol_string`.

## Nazwy

Wszystko jest w `snake_case`: nazwy właściwości w `view.tree`, nazwy metod w TypeScripcie, atrybuty, które framework nadaje węzłom DOM na potrzeby stylowania. Podwidoki zaczynają się wielką literą (`Query`), wartości małą (`query`).

Nazwa w drzewie i nazwa metody w klasie muszą zgadzać się co do litery. `exchange_form` w drzewie i `exchangeForm` w klasie to dwie niezwiązane ze sobą właściwości: tej z klasy nikt nigdy nie czyta, ta z drzewa zostaje przy wartości domyślnej i nie ma błędu, który by ci o tym powiedział. Gdy nadpisanie wygląda, jakby nic nie robiło, to jest pierwsza rzecz do sprawdzenia. [Rozwiązywanie problemów](#!section=docs/page=troubleshooting) wypisuje ten i pozostałe przypadki, w których ekran jest zły, a kompilator milczy.

## Dalej

Gdy model jest już na miejscu, [Widoki](#!section=docs/page=views) pokazują, jak deklaruje się i komponuje komponenty, a [Z React, Vue i Svelte](#!section=docs/page=rosetta) mapuje nazwy, które już znasz, na te tutejsze.
