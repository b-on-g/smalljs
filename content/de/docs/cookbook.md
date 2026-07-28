# Kochbuch

Kurze, kopierfertige Rezepte für Aufgaben, die in fast jeder App auftauchen. Jedes ist echter $mol-Code — passe die Namen an und setze es ein.

## Ein beidseitig gebundenes Eingabefeld

Halte ein Eingabefeld und einen abgeleiteten Wert synchron, ohne einen Handler zu verdrahten: `<=>` bindet in beide Richtungen, und jede berechnete Eigenschaft, die den Wert liest, aktualisiert sich von selbst.

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

## Eine Liste zum Hinzufügen und Entfernen

Halte die Sammlung in einer reaktiven Eigenschaft und schreibe sie aus Aktionen unveränderlich neu. Ein indiziertes `Row*` rendert eine Zeile pro Element, und — dank [virtualisiertem Rendering](#!section=docs/page=rendering) — werden nur die sichtbaren Zeilen gebaut.

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

## Daten laden mit Lade- und Fehlerzuständen

Ein asynchroner Wert ist einfach eine reaktive Eigenschaft, die ein Promise zurückgibt. `$mol_fetch` pausiert die Fiber, solange die Anfrage unterwegs ist, sodass jede View, die ihn liest, den eingebauten Ladezustand zeigt — und eine fehlgeschlagene Anfrage erscheint als Fehlerzustand. Du schreibst kein `isLoading`-Flag und kein `try`/`catch`.

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

## Lokalen Zustand persistieren

Für Zustand, der einen Neuladen überstehen, aber die URL nicht zumüllen soll — eine eingeklappte Seitenleiste, einen Entwurf, eine Einstellung — nimm `$mol_state_local`. Es hat dieselbe Getter/Setter-Form wie jede reaktive Eigenschaft und speichert in `localStorage`.

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

## Einen Routen-Parameter lesen und schreiben

Um einen Wert teilbar und mit Lesezeichen versehbar zu machen, hinterlege ihn stattdessen mit `$mol_state_arg`. Lesen gibt den aktuellen URL-Wert zurück; das Übergeben eines Arguments navigiert, und der Zurück-Button des Browsers aktualisiert die Zelle für dich.

```typescript
@ $mol_mem
page( next?: string ) {
	return $mol_state_arg.value( 'page', next ) ?? 'home'
}
```

Ein `$mol_link` kann dasselbe Argument deklarativ setzen, sodass ein einfacher Klick ohne Handler navigiert:

```tree
<= Home_link $mol_link
	arg *
		page \home
	sub / <= home_label \Home
```

Wie man anhand des Routenwerts zwischen Screens umschaltet, steht unter [Routing](#!section=docs/page=routing).

## Ein automatisches Hell/Dunkel-Theme hinzufügen

Hänge `$mol_theme_auto` als [Plugin](#!section=docs/page=plugins) an — eine elementlose Komponente, die unter `plugins /` gelistet wird. Es wendet ein helles oder dunkles Theme auf den Teilbaum des Hosts an, folgt der Betriebssystem-Einstellung und umhüllt dein Layout mit nichts.

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
	sub /
		<= Content $my_content
```

## Weiter

Willst du das live ausprobieren? Öffne den [Playground](#!section=playground) und füge ein beliebiges Rezept ein, oder arbeite dich durch [Getting Started](#!section=docs/page=getting-started), um eine vollständige App zu bauen.
