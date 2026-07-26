# Zustand und Reaktivität

$mol-Zustand verhält sich wie eine Tabellenkalkulation: Sie deklarieren, wie ein Wert berechnet wird, und alles, was davon abhängt, aktualisiert sich von selbst. Keine Stores, kein Dispatch, keine Effect-Hooks — der Abhängigkeitsgraph verfolgt, was neu berechnet werden muss.

## Reaktive Eigenschaften

Eine mit `@ $mol_mem` dekorierte Methode ist eine zwischengespeicherte, reaktive Zelle. Sie läuft einmal, merkt sich ihr Ergebnis und berechnet nur dann neu, wenn sich etwas geändert hat, das sie gelesen hat.

```typescript
namespace $.$$ {
	export class $my_counter extends $.$my_counter {
		@ $mol_mem count() { return 0 }

		@ $mol_mem doubled() {
			return this.count() * 2
		}
	}
}
```

`doubled` liest `count` und abonniert `count` daher automatisch. Ändern Sie `count`, und jede Ansicht, die `doubled` zeigt, wird aktualisiert — es gibt nichts von Hand zu abonnieren.

## Lesen und Schreiben

Eine Eigenschaft ist sowohl Getter als auch Setter: Rufen Sie sie ohne Argument auf, um zu lesen, mit einem Argument, um zu schreiben.

```typescript
@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

## Aktionen vs. Berechnungen

Diese eine Unterscheidung hält reaktiven Code vorhersehbar:

- `@ $mol_mem` ist eine **reine Berechnung** — liest nur andere Zellen und gibt einen Wert zurück.
- `@ $mol_action` ist ein **Effekt** — Schreibvorgänge in den Zustand, Netzwerkaufrufe und Timer gehören hierher.

Das Schreiben in eine Zelle aus einem `@ $mol_mem` heraus erzeugt eine Rückkopplungsschleife (das Schreiben invalidiert eine Abhängigkeit, die neu berechnet und erneut schreibt). $mol meldet dies als *zirkuläres Abonnement*. Die Lösung ist immer dieselbe: Halten Sie Seiteneffekte in Aktionen, halten Sie Berechnungen rein.

| In `@ $mol_mem` dürfen Sie | aber nicht |
|---|---|
| andere Zellen lesen | andere Zellen schreiben |
| `new SomeClass()` | `fetch()`, `await` |
| einen Wert zurückgeben | `setTimeout`, DOM-Schreibvorgänge |

Button-Handler werden als `@ $mol_mem` auf der Basisklasse generiert; überschreiben Sie sie mit `@ $mol_action`, damit sie sicher schreiben können:

```typescript
@ $mol_action
submit() {
	this.saved( true )
}
```

## Abgeleiteter Zustand komponiert

Da Abhängigkeiten automatisch verfolgt werden, verketten sich abgeleitete Werte ohne jegliche Verdrahtung. Jeder liest den vorherigen; eine Änderung an der Wurzel breitet sich genau so weit aus, wie es nötig ist:

```typescript
@ $mol_mem full_name() {
	return `${ this.first() } ${ this.last() }`.trim()
}

@ $mol_mem greeting() {
	return this.full_name() ? `Hello, ${ this.full_name() }!` : 'Hello!'
}
```

## Zustand mit Schlüssel

`@ $mol_mem_key` ist eine durch einen Schlüssel parametrisierte Berechnung — eine zwischengespeicherte Zelle pro Schlüssel. Ideal für Werte pro Zeile:

```typescript
@ $mol_mem_key
task_done( id: string, next?: boolean ) {
	const task = this.task( id )
	if ( next !== undefined ) task.Done( null )!.val( next )
	return task.Done()?.val() ?? false
}
```

## Asynchron ist nur ein Wert

Geben Sie aus einem `@ $mol_mem` ein Promise zurück, und die Ansicht zeigt einen Ladezustand, bis es aufgelöst ist — ohne explizites Lade-Flag:

```typescript
@ $mol_mem
async data() {
	const res = await fetch( '/api/data' )
	return await res.json()
}
```

[Datenabruf](#!section=docs/page=data) baut auf diesem Muster auf.

## Transienter Zustand zwischen Ereignissen

In `view.tree` deklarierter Zustand wird zwischen separaten Ereignis-Handlern zurückgesetzt (Zieh-/Schwenk-/Gestensequenzen), weil $mol jeden Handler in seine eigene Fiber einwickelt. Für Werte, die von einem Ereignis zum nächsten überleben müssen, verwenden Sie ein einfaches TypeScript-Feld statt einer reaktiven Eigenschaft:

```typescript
export class $my_canvas extends $.$my_canvas {
	// plain field — survives across events, not reactive
	drag_id = ''

	@ $mol_action pan_start() { this.drag_id = 'node_42' }
	@ $mol_action pan_move() { if ( this.drag_id ) { /* ... */ } }
}
```

Verwenden Sie eine reaktive Zelle, wenn die Ansicht auf den Wert reagieren muss; verwenden Sie ein einfaches Feld für transienten Zustand, den nur die Handler lesen.

## Weiter

Reaktiver Zustand ist am nützlichsten, wenn er adressierbar ist — verbinden Sie ihn mit der URL im [Routing](#!section=docs/page=routing).
