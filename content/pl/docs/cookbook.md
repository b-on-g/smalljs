# Zbiór przepisów

Krótkie, gotowe do skopiowania przepisy na zadania, które pojawiają się niemal w każdej aplikacji. Każdy to prawdziwy kod $mol — zmień nazwy i wstaw u siebie.

## Dwukierunkowo powiązane pole wejściowe

Utrzymuj pole wejściowe i wartość pochodną w synchronizacji bez podłączania handlera: `<=>` wiąże w obie strony, a każda właściwość obliczana, która czyta wartość, aktualizuje się sama.

```tree
$my_greeter $mol_view
	sub /
		<= Name $mol_string
			value? <=> name?
		<= Hello $mol_view
			sub / <= greeting \
```

```typescript
namespace $.$$ {
	export class $my_greeter extends $.$my_greeter {
		@ $mol_mem name( next?: string ) { return next ?? '' }

		@ $mol_mem greeting() {
			return this.name() ? `Hello, ${ this.name() }!` : 'Type your name'
		}
	}
}
```

## Lista z dodawaniem i usuwaniem

Trzymaj kolekcję w reaktywnej właściwości i przepisuj ją niezmiennie z akcji. Kluczowany `Row*` renderuje jeden wiersz na element, a — dzięki [wirtualizowanemu renderowaniu](#!section=docs/page=rendering) — budowane są tylko widoczne wiersze.

```tree
$my_todo $mol_view
	draft? \
	items /
	sub /
		<= Input $mol_string
			value? <=> draft?
			hint \New item
		<= Add $mol_button_major
			click? <=> add?
			sub / <= add_label \Add
		<= List $mol_list
			rows <= item_rows /
	Row* $mol_row
		sub /
			<= Label* $mol_view
				sub / <= item_title* \
			<= Delete* $mol_button_minor
				click? <=> delete*?
				sub / <= delete_label \✕
```

```typescript
namespace $.$$ {
	export class $my_todo extends $.$my_todo {
		@ $mol_mem draft( next?: string ) { return next ?? '' }
		@ $mol_mem items( next?: readonly string[] ) { return next ?? [] }

		@ $mol_action add() {
			const title = this.draft().trim()
			if( !title ) return
			this.items([ ... this.items(), title ])
			this.draft( '' )
		}

		@ $mol_action delete( id: number ) {
			this.items( this.items().filter( ( _, i ) => i !== id ) )
		}

		item_title( id: number ) { return this.items()[ id ] }

		item_rows() {
			return this.items().map( ( _, id ) => this.Row( id ) )
		}
	}
}
```

## Pobieranie danych ze stanami ładowania i błędu

Wartość asynchroniczna to po prostu reaktywna właściwość zwracająca promise. `$mol_fetch` wstrzymuje włókno na czas trwania żądania, więc każdy widok, który je czyta, pokazuje wbudowany stan ładowania — a nieudane żądanie wypływa jako stan błędu. Nie piszesz żadnej flagi `isLoading` ani `try`/`catch`.

```typescript
namespace $.$$ {
	export class $my_users extends $.$my_users {
		@ $mol_mem
		users() {
			return $mol_fetch.json( 'https://api.example.com/users' ) as {
				id: number
				name: string
			}[]
		}

		@ $mol_mem
		names() {
			return this.users().map( user => user.name )
		}
	}
}
```

## Utrwalanie stanu lokalnego

Dla stanu, który ma przetrwać przeładowanie, lecz nie zaśmiecać URL — zwiniętego panelu bocznego, wersji roboczej, preferencji — użyj `$mol_state_local`. Ma tę samą postać gettera/settera co każda reaktywna właściwość i przechowuje w `localStorage`.

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

## Odczyt i zapis parametru trasy

Aby wartość była współdzielona i możliwa do dodania do zakładek, podeprzyj ją zamiast tego `$mol_state_arg`. Odczyt zwraca bieżącą wartość z URL; przekazanie argumentu nawiguje, a przycisk wstecz przeglądarki aktualizuje komórkę za ciebie.

```typescript
@ $mol_mem
page( next?: string ) {
	return $mol_state_arg.value( 'page', next ) ?? 'home'
}
```

`$mol_link` może ustawić ten sam argument deklaratywnie, więc zwykłe kliknięcie nawiguje bez handlera:

```tree
<= Home_link $mol_link
	arg *
		page \home
	sub / <= home_label \Home
```

O przełączaniu ekranów według wartości trasy przeczytasz w [Routingu](#!section=docs/page=routing).

## Dodanie automatycznego motywu jasny/ciemny

Dołącz `$mol_theme_auto` jako [wtyczkę](#!section=docs/page=plugins) — komponent bez elementu, wymieniony pod `plugins /`. Stosuje jasny lub ciemny motyw do poddrzewa hosta, podążając za ustawieniem systemu, niczego nie owijając w twoim układzie.

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
	sub /
		<= Content $my_content
```

## Dalej

Chcesz spróbować na żywo? Otwórz [Piaskownicę](#!section=playground) i wklej dowolny przepis, albo przejdź przez [Getting Started](#!section=docs/page=getting-started), by zbudować pełną aplikację.
