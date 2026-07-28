# Ricettario

Ricette brevi e pronte da copiare per le attività che ricorrono in quasi ogni app. Ognuna è vero codice $mol: adatta i nomi e inseriscila.

## Un input con binding bidirezionale

Tieni un input e un valore derivato sincronizzati senza cablare alcun handler: `<=>` collega in entrambe le direzioni, e qualsiasi proprietà calcolata che legge il valore si aggiorna da sola.

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

## Una lista a cui aggiungere e da cui rimuovere

Tieni la collezione in una proprietà reattiva e riscrivila in modo immutabile dalle azioni. Un `Row*` con chiave rende una riga per elemento e — grazie al [rendering virtualizzato](#!section=docs/page=rendering) — vengono costruite solo le righe visibili.

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

## Recuperare dati con stati di caricamento ed errore

Un valore asincrono è solo una proprietà reattiva che restituisce una promise. `$mol_fetch` sospende la fibra mentre la richiesta è in corso, così qualsiasi vista che lo legge mostra lo stato di caricamento integrato — e una richiesta fallita emerge come stato di errore. Non scrivi alcun flag `isLoading` né `try`/`catch`.

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

## Persistere lo stato locale

Per uno stato che deve sopravvivere a un ricaricamento ma non intasare l'URL — una barra laterale ripiegata, una bozza, una preferenza — usa `$mol_state_local`. Ha la stessa forma getter/setter di qualsiasi proprietà reattiva e memorizza in `localStorage`.

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

## Leggere e scrivere un parametro di rotta

Per rendere un valore condivisibile e aggiungibile ai preferiti, appoggialo invece a `$mol_state_arg`. La lettura restituisce il valore corrente dell'URL; passare un argomento naviga, e il pulsante indietro del browser aggiorna la cella per te.

```typescript
@ $mol_mem
page( next?: string ) {
	return $mol_state_arg.value( 'page', next ) ?? 'home'
}
```

Un `$mol_link` può impostare lo stesso argomento in modo dichiarativo, così un semplice clic naviga senza handler:

```tree
<= Home_link $mol_link
	arg *
		page \home
	sub / <= home_label \Home
```

Per cambiare schermata in base al valore di rotta, vedi [Routing](#!section=docs/page=routing).

## Aggiungere un tema chiaro/scuro automatico

Aggancia `$mol_theme_auto` come [plugin](#!section=docs/page=plugins) — un componente senza elemento, elencato sotto `plugins /`. Applica un tema chiaro o scuro al sottoalbero dell'host, seguendo la preferenza del sistema, senza avvolgere il tuo layout in nulla.

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
	sub /
		<= Content $my_content
```

## Avanti

Vuoi provarle dal vivo? Apri il [Playground](#!section=playground) e incollaci qualsiasi ricetta, oppure segui [Getting Started](#!section=docs/page=getting-started) per costruire un'app completa.
