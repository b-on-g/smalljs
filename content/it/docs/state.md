# Stato e reattività

Lo stato di $mol si comporta come un foglio di calcolo: dichiari come viene calcolato un valore e tutto ciò che ne dipende si aggiorna da solo. Niente store, niente dispatch, niente hook di effetto — il grafo delle dipendenze traccia cosa ricalcolare.

## Proprietà reattive

Un metodo decorato con `@ $mol_mem` è una cella reattiva memorizzata nella cache. Viene eseguito una volta, ricorda il suo risultato e ricalcola solo quando qualcosa che ha letto è cambiato.

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

`doubled` legge `count`, quindi si iscrive automaticamente a `count`. Modifica `count` e ogni vista che mostra `doubled` si aggiorna — non c'è nulla da iscrivere a mano.

## Lettura e scrittura

Una proprietà è sia getter che setter: chiamala senza argomenti per leggere, con un argomento per scrivere.

```typescript
@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

## Azioni vs. calcoli

Questa sola distinzione mantiene prevedibile il codice reattivo:

- `@ $mol_mem` è un **calcolo puro** — legge solo altre celle e restituisce un valore.
- `@ $mol_action` è un **effetto** — scritture nello stato, chiamate di rete e timer vanno qui.

Scrivere in una cella dall'interno di un `@ $mol_mem` crea un ciclo di feedback (la scrittura invalida una dipendenza, che ricalcola, che riscrive). $mol lo segnala come *iscrizione circolare*. La correzione è sempre la stessa: tieni gli effetti collaterali nelle azioni, mantieni puri i calcoli.

| In `@ $mol_mem` puoi | ma non |
|---|---|
| leggere altre celle | scrivere altre celle |
| `new SomeClass()` | `fetch()`, `await` |
| restituire un valore | `setTimeout`, scritture DOM |

I gestori dei pulsanti sono generati come `@ $mol_mem` sulla classe base; sovrascrivili con `@ $mol_action` affinché possano scrivere in sicurezza:

```typescript
@ $mol_action
submit() {
	this.saved( true )
}
```

## Lo stato derivato si compone

Poiché le dipendenze sono tracciate automaticamente, i valori derivati si concatenano senza alcun cablaggio. Ognuno legge il precedente; una modifica alla radice si propaga esattamente fin dove serve:

```typescript
@ $mol_mem full_name() {
	return `${ this.first() } ${ this.last() }`.trim()
}

@ $mol_mem greeting() {
	return this.full_name() ? `Hello, ${ this.full_name() }!` : 'Hello!'
}
```

## Stato con chiave

`@ $mol_mem_key` è un calcolo parametrizzato da una chiave — una cella in cache per chiave. Ideale per i valori per riga:

```typescript
@ $mol_mem_key
task_done( id: string, next?: boolean ) {
	const task = this.task( id )
	if ( next !== undefined ) task.Done( null )!.val( next )
	return task.Done()?.val() ?? false
}
```

## L'asincrono è solo un valore

Restituisci una promise da un `@ $mol_mem` e la vista mostra uno stato di caricamento finché non si risolve — senza un flag di caricamento esplicito:

```typescript
@ $mol_mem
async data() {
	const res = await fetch( '/api/data' )
	return await res.json()
}
```

[Recupero dati](#!section=docs/page=data) si basa su questo modello.

## Stato transitorio tra eventi

Lo stato dichiarato in `view.tree` si azzera tra gestori di eventi distinti (sequenze di trascinamento/spostamento/gesto), perché $mol avvolge ogni gestore nella propria fibra. Per i valori che devono sopravvivere da un evento al successivo, usa un semplice campo TypeScript invece di una proprietà reattiva:

```typescript
export class $my_canvas extends $.$my_canvas {
	// plain field — survives across events, not reactive
	drag_id = ''

	@ $mol_action pan_start() { this.drag_id = 'node_42' }
	@ $mol_action pan_move() { if ( this.drag_id ) { /* ... */ } }
}
```

Usa una cella reattiva quando la vista deve reagire al valore; usa un semplice campo per lo stato transitorio letto solo dai gestori.

## Avanti

Lo stato reattivo è più utile quando è indirizzabile — collegalo all'URL in [Routing](#!section=docs/page=routing).
