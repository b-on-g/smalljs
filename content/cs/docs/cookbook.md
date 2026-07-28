# Kuchařka

Krátké, ke kopírování připravené recepty na úlohy, které se objevují téměř v každé aplikaci. Každý je skutečný kód $mol — uprav názvy a vlož k sobě.

## Obousměrně vázaný vstup

Udrž vstup a odvozenou hodnotu synchronizované bez zapojování handleru: `<=>` váže oběma směry a jakákoli vypočtená vlastnost, která hodnotu čte, se aktualizuje sama.

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

## Seznam, do kterého lze přidávat a z něhož odebírat

Drž kolekci v reaktivní vlastnosti a přepisuj ji z akcí neměnně. Klíčovaný `Row*` vykreslí jeden řádek na položku a — díky [virtualizovanému vykreslování](#!section=docs/page=rendering) — se sestaví jen viditelné řádky.

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

## Načtení dat se stavy načítání a chyby

Asynchronní hodnota je jen reaktivní vlastnost, která vrací promise. `$mol_fetch` pozastaví vlákno po dobu, kdy je požadavek na cestě, takže jakýkoli pohled, který ji čte, zobrazí vestavěný stav načítání — a neúspěšný požadavek vyplyne jako stav chyby. Nepíšeš žádný příznak `isLoading` ani `try`/`catch`.

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

## Uchování lokálního stavu

Pro stav, který má přežít znovunačtení, ale nezaneřádit URL — sbalený postranní panel, koncept, předvolbu — použij `$mol_state_local`. Má stejný tvar getteru/setteru jako jakákoli reaktivní vlastnost a ukládá do `localStorage`.

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

## Čtení a zápis parametru trasy

Aby byla hodnota sdílitelná a možná uložit do záložek, podepři ji místo toho `$mol_state_arg`. Čtení vrací aktuální hodnotu z URL; předání argumentu naviguje a tlačítko zpět prohlížeče aktualizuje buňku za tebe.

```typescript
@ $mol_mem
page( next?: string ) {
	return $mol_state_arg.value( 'page', next ) ?? 'home'
}
```

`$mol_link` může nastavit tentýž argument deklarativně, takže prosté kliknutí naviguje bez handleru:

```tree
<= Home_link $mol_link
	arg *
		page \home
	sub / <= home_label \Home
```

O přepínání obrazovek podle hodnoty trasy viz [Směrování](#!section=docs/page=routing).

## Přidání automatického světlého/tmavého motivu

Připoj `$mol_theme_auto` jako [plugin](#!section=docs/page=plugins) — komponentu bez elementu, uvedenou pod `plugins /`. Aplikuje světlý nebo tmavý motiv na podstrom hostitele, řídí se nastavením OS a nic ve tvém rozvržení neobaluje.

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
	sub /
		<= Content $my_content
```

## Dále

Chceš to vyzkoušet naživo? Otevři [Playground](#!section=playground) a vlož jakýkoli recept, nebo projdi [Getting Started](#!section=docs/page=getting-started) a postav celou aplikaci.
