# Giper Baza

[Giper Baza](https://github.com/giper-dev/baza) ist ein **eigenständiges, optionales Projekt** — kein fester Bestandteil von $mol. Seine Autoren beschreiben es als *dezentrale, hochverfügbare Datenbank mit konfliktfreier Echtzeit-Synchronisation*: ein CRDT-Speicher, der lokal persistiert und ohne zentralen Server zwischen Clients repliziert, mit digitalen Signaturen und Ende-zu-Ende-Verschlüsselung. Für den Bau einer $mol-App brauchen Sie es nie; greifen Sie nur dann darauf zurück, wenn mehrere Clients oder Geräte dieselben Live-Daten teilen müssen.

> Sie möchten nur, dass Ihre App ohne Netzwerk weiterläuft? Das ist einfaches Offline, und $mol erledigt es mit einem Service Worker — siehe [Offline](#!section=docs/page=offline). Giper Baza geht einen Schritt weiter: Daten *zwischen* Clients synchronisieren, statt die Assets eines einzelnen Clients zwischenzuspeichern.

Wenn Sie damit tatsächlich Daten modellieren, sehen Entitäten aus wie gewöhnliche reaktive Eigenschaften, und die Replikation geschieht einfach.

> Diese Seite stellt die Form der API vor. Giper Baza ist ein großes Thema — betrachten Sie dies als Karte, nicht als das gesamte Gebiet.

## Eine Entität definieren

Eine Entität ist ein **reines Schema** — eine Menge typisierter Felder. Halten Sie Verhalten heraus; erledigen Sie Lesen und Schreiben in Ihren Ansichten.

```typescript
namespace $ {
	export class $my_task extends $giper_baza_entity.with( {
		Title: $giper_baza_atom_text,
		Done: $giper_baza_atom_bool,
		CreatedAt: $giper_baza_atom_time,
	} ) {}
}
```

Jedes Feld ist ein **Atom** — eine synchronisierte Zelle mit typisiertem Wert.

## Lesen und schreiben

Holen Sie sich den Speicher, erreichen Sie eine Liste von Entitäten und mappen Sie reaktiv über sie:

```typescript
		@ $mol_mem
		tasks() {
			return this.tasks_list().remote_list()
		}

		@ $mol_mem_key
		task_done( id: string, next?: boolean ) {
			const task = this.task( id )
			if( next !== undefined ) task.Done( null )!.val( next )
			return task.Done()?.val() ?? false
		}
```

`Done()?.val()` zu lesen gibt den aktuellen Wert; `Done(null)!.val(next)` zu schreiben setzt ihn. Jede Ansicht, die das Atom liest, wird neu gerendert, wenn sie — oder ein entfernter Peer — es ändert.

## Erstellen und entfernen

```typescript
		@ $mol_action
		task_add( title: string ) {
			const task = this.tasks_list().make( [ [ null, $giper_baza_rank_read ] ] )!
			task.Title( null )!.val( title )
			task.Done( null )!.val( false )
		}

		@ $mol_action
		task_remove( id: string ) {
			this.tasks_list().cut( this.task( id ).link() )
		}
```

## Synchronisation ist automatisch

Es gibt nichts zu konfigurieren. Änderungen replizieren in Echtzeit zu anderen Clients, und dieselben Daten sind offline verfügbar — der Speicher gleicht ab, wenn eine Verbindung zurückkehrt. Da Schreibvorgänge CRDT-Zusammenführungen sind, kombinieren sich gleichzeitige Änderungen von verschiedenen Geräten ohne Konflikte.

## Wohin als Nächstes?

Sie haben jetzt den vollständigen Bogen: [Ansichten](#!section=docs/page=views), [Zustand](#!section=docs/page=state), [Routing](#!section=docs/page=routing), [Datenabruf](#!section=docs/page=data) und local-first Speicherung. Probieren Sie alles im [Playground](#!section=playground) aus.
