# Giper Baza

[Giper Baza](https://github.com/giper-dev/baza) is a **separate, optional project** — not a built-in part of $mol. Its authors describe it as a *decentralized, high-availability database with conflict-free real-time synchronization*: a CRDT store that persists locally and replicates between clients without a central server, with digital signatures and end-to-end encryption. You never need it to build a $mol app; reach for it only when several clients or devices must share the same live data.

> Just want your app to keep working without a network? That is plain offline, and $mol handles it with a service worker — see [Offline](#!section=docs/page=offline). Giper Baza is the next step up: syncing data *between* clients, not caching one client's assets.

When you do model data with it, entities look like ordinary reactive properties, and replication just happens.

> This page introduces the shape of the API. Giper Baza is a large topic — treat this as a map, not the full territory.

## Define an entity

An entity is a **pure schema** — a set of typed fields. Keep behaviour out of it; do the reading and writing in your views.

```typescript
namespace $ {
	export class $my_task extends $giper_baza_entity.with( {
		Title: $giper_baza_atom_text,
		Done: $giper_baza_atom_bool,
		CreatedAt: $giper_baza_atom_time,
	} ) {}
}
```

Each field is an **atom** — a synced cell with a typed value.

## Read and write

Get the store, reach a list of entities, and map over them reactively:

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

Reading `Done()?.val()` gives the current value; writing `Done(null)!.val(next)` sets it. Any view reading the atom re-renders when it — or a remote peer — changes it.

## Create and remove

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

## Sync is automatic

There is nothing to configure. Changes replicate to other clients in real time, and the same data is available offline — the store reconciles when a connection returns. Because writes are CRDT merges, concurrent edits from different devices combine without conflicts.

## Where to next?

You now have the full arc: [Views](#!section=docs/page=views), [State](#!section=docs/page=state), [Routing](#!section=docs/page=routing), [Data Fetching](#!section=docs/page=data), and local-first storage. Try it all in the [Playground](#!section=playground).
