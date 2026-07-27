# Giper Baza

Giper Baza è il livello dati local-first di $mol: un archivio CRDT che persiste localmente e si sincronizza automaticamente tra i client. Modelli i dati come entità; letture e scritture sembrano proprietà reattive ordinarie, e la replica avviene da sola.

> Questa pagina introduce la forma dell'API. Giper Baza è un argomento vasto — considerala una mappa, non l'intero territorio.

## Definire un'entità

Un'entità è uno **schema puro** — un insieme di campi tipizzati. Tieni fuori il comportamento; fai la lettura e la scrittura nelle tue viste.

```typescript
namespace $ {
	export class $my_task extends $giper_baza_entity.with( {
		Title: $giper_baza_atom_text,
		Done: $giper_baza_atom_bool,
		CreatedAt: $giper_baza_atom_time,
	} ) {}
}
```

Ogni campo è un **atomo** — una cella sincronizzata con un valore tipizzato.

## Leggere e scrivere

Ottieni l'archivio, raggiungi una lista di entità e mappale in modo reattivo:

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

Leggere `Done()?.val()` dà il valore corrente; scrivere `Done(null)!.val(next)` lo imposta. Ogni vista che legge l'atomo si ri-renderizza quando lei — o un peer remoto — lo modifica.

## Creare e rimuovere

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

## La sincronizzazione è automatica

Non c'è nulla da configurare. Le modifiche si replicano agli altri client in tempo reale, e gli stessi dati sono disponibili offline — l'archivio si riconcilia quando torna una connessione. Poiché le scritture sono fusioni CRDT, le modifiche concorrenti da dispositivi diversi si combinano senza conflitti.

## Dove andare adesso?

Ora hai l'arco completo: [Viste](#!section=docs/page=views), [Stato](#!section=docs/page=state), [Routing](#!section=docs/page=routing), [Recupero dati](#!section=docs/page=data) e archiviazione local-first. Prova tutto nel [Playground](#!section=playground).
