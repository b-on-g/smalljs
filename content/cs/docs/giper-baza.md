# Giper Baza

Giper Baza je local-first datová vrstva $mol: CRDT úložiště, které přetrvává lokálně a automaticky se synchronizuje mezi klienty. Data modelujete jako entity; čtení a zápisy vypadají jako běžné reaktivní vlastnosti a replikace se prostě děje.

> Tato stránka představuje podobu API. Giper Baza je rozsáhlé téma — berte to jako mapu, ne celé území.

## Definujte entitu

Entita je **čisté schéma** — sada typovaných polí. Chování držte stranou; čtení a zápis dělejte ve svých pohledech.

```typescript
namespace $ {
	export class $my_task extends $giper_baza_entity.with( {
		Title: $giper_baza_atom_text,
		Done: $giper_baza_atom_bool,
		CreatedAt: $giper_baza_atom_time,
	} ) {}
}
```

Každé pole je **atom** — synchronizovaná buňka s typovanou hodnotou.

## Čtení a zápis

Získejte úložiště, dosáhněte na seznam entit a reaktivně je zmapujte:

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

Čtení `Done()?.val()` dá aktuální hodnotu; zápis `Done(null)!.val(next)` ji nastaví. Každý pohled, který atom čte, se překreslí, když jej — nebo vzdálený peer — změní.

## Vytváření a odebírání

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

## Synchronizace je automatická

Není co konfigurovat. Změny se v reálném čase replikují k ostatním klientům a stejná data jsou dostupná offline — úložiště se sesouhlasí, jakmile se vrátí spojení. Protože zápisy jsou CRDT sloučení, souběžné úpravy z různých zařízení se spojí bez konfliktů.

## Kam dál?

Nyní máte celý oblouk: [Pohledy](#!section=docs/page=views), [Stav](#!section=docs/page=state), [Směrování](#!section=docs/page=routing), [Načítání dat](#!section=docs/page=data) a local-first úložiště. Vyzkoušejte to vše v [Hřišti](#!section=playground).
