# Datenabruf

Entfernte Daten in $mol zu laden ist keine spezielle API — ein asynchroner Wert ist einfach eine reaktive Eigenschaft, die so geschrieben ist, als wäre die Antwort schon da. Die Ansicht wartet darauf, zeigt einen Ladezustand und rendert neu, wenn die Daten eintreffen.

## Eine asynchrone Eigenschaft

Rufen Sie das Netz innerhalb eines `@ $mol_mem` auf und geben Sie das geparste Ergebnis zurück. Im Code steht kein Promise, kein `await` und kein Callback:

```typescript
namespace $.$$ {
	export class $my_users extends $.$my_users {
		@ $mol_mem
		users() {
			return this.$.$mol_fetch.json( 'https://api.example.com/users' ) as {
				id: number
				name: string
			}[]
		}
	}
}
```

`$mol_fetch` suspendiert die Fiber, bis die Antwort eintrifft, dann startet die Berechnung neu und `users()` gibt das Array zurück. Während sie aussteht, zeigt jede Ansicht, die `users()` liest, automatisch den eingebauten Ladezustand — Sie schreiben kein `isLoading`-Flag. Geben Sie nicht selbst ein Promise aus einem `@ $mol_mem` zurück: Ein als Wert abgelegtes Promise hält die Zelle für immer im Ladezustand, siehe [Fehlerbehebung](#!section=docs/page=troubleshooting).

`this.$` ist der Kontext der Komponente. Jeder Dienst kommt durch ihn: `$mol_fetch` für das Netz, `$mol_state_arg` für die URL, `$mol_after_timeout` für die Zeit. In einem Test wird der Kontext ersetzt, sodass dasselbe `users()` seine Anfrage an einen Mock statt ins Netz schickt, ohne dass sich eine Zeile der Komponente ändert. [Testen](#!section=docs/page=testing) zeigt diesen Mock.

## Das Ergebnis rendern

Binden Sie die aufgelösten Daten direkt in eine Liste:

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

Wenn die Antwort eintrifft, aktualisiert sich `users()`, `user_names()` wird neu berechnet und die Liste rendert. Keine Callbacks, kein `useEffect`.

## Neu laden

Weil es nur eine reaktive Zelle ist, laden Sie neu, indem Sie sie invalidieren. Hängen Sie von einem Token ab, das Sie hochzählen können:

```typescript
		@ $mol_mem
		reload_token( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		users() {
			this.reload_token() // subscribe
			return this.$.$mol_fetch.json( 'https://api.example.com/users' ) as unknown[]
		}

		@ $mol_action
		reload() {
			this.reload_token( this.reload_token() + 1 )
		}
```

`reload()` aufzurufen ändert das Token, was `users()` invalidiert, was neu lädt.

## Fehler

Ein Wurf innerhalb einer reaktiven Eigenschaft breitet sich zur nächsten Ansicht aus, die statt des Inhalts einen Fehlerzustand rendert. Um ihn selbst zu behandeln, fangen Sie ihn und geben Sie einen Rückfallwert zurück:

```typescript
		@ $mol_mem
		users_safe() {
			try {
				return this.users()
			} catch( error ) {
				if( error instanceof Promise ) throw error // still loading
				return []
			}
		}
```

Ein `Promise` erneut zu werfen ist die Art, den Ladezustand weiterfließen zu lassen und dabei nur echte Fehler zu fangen.

## Weiter

Für Daten, die ohne Backend über Clients hinweg bestehen bleiben und synchronisiert werden, fahren Sie mit [Giper Baza](#!section=docs/page=giper-baza) fort.
