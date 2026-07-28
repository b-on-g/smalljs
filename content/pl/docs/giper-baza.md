# Giper Baza

[Giper Baza](https://github.com/giper-dev/baza) to **osobny, opcjonalny projekt** — nie jest wbudowaną częścią $mol. Jego autorzy opisują go jako *zdecentralizowaną, wysokodostępną bazę danych z bezkonfliktową synchronizacją w czasie rzeczywistym*: magazyn CRDT, który utrwala się lokalnie i replikuje między klientami bez centralnego serwera, z podpisami cyfrowymi i szyfrowaniem end-to-end. Do zbudowania aplikacji $mol nigdy go nie potrzebujesz; sięgaj po niego tylko wtedy, gdy wielu klientów lub urządzeń musi współdzielić te same dane na żywo.

> Chcesz tylko, aby aplikacja działała dalej bez sieci? To zwykły tryb offline, a $mol obsługuje go za pomocą service workera — zobacz [Offline](#!section=docs/page=offline). Giper Baza idzie o krok dalej: synchronizuje dane *między* klientami, zamiast buforować zasoby jednego klienta.

Gdy faktycznie modelujesz nim dane, encje wyglądają jak zwykłe właściwości reaktywne, a replikacja po prostu się dzieje.

> Ta strona przedstawia kształt API. Giper Baza to obszerny temat — potraktuj to jako mapę, a nie całe terytorium.

## Zdefiniuj encję

Encja to **czysty schemat** — zestaw typowanych pól. Trzymaj zachowanie z dala; odczyt i zapis rób w swoich widokach.

```typescript
namespace $ {
	export class $my_task extends $giper_baza_entity.with( {
		Title: $giper_baza_atom_text,
		Done: $giper_baza_atom_bool,
		CreatedAt: $giper_baza_atom_time,
	} ) {}
}
```

Każde pole to **atom** — zsynchronizowana komórka z typowaną wartością.

## Odczyt i zapis

Pobierz magazyn, sięgnij do listy encji i mapuj po nich reaktywnie:

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

Odczyt `Done()?.val()` daje bieżącą wartość; zapis `Done(null)!.val(next)` ją ustawia. Każdy widok czytający atom renderuje się ponownie, gdy on — lub zdalny peer — go zmieni.

## Tworzenie i usuwanie

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

## Synchronizacja jest automatyczna

Nie ma nic do skonfigurowania. Zmiany replikują się do innych klientów w czasie rzeczywistym, a te same dane są dostępne offline — magazyn uzgadnia się, gdy połączenie wróci. Ponieważ zapisy to scalenia CRDT, równoczesne edycje z różnych urządzeń łączą się bez konfliktów.

## Dokąd dalej?

Masz teraz pełny łuk: [Widoki](#!section=docs/page=views), [Stan](#!section=docs/page=state), [Routing](#!section=docs/page=routing), [Pobieranie danych](#!section=docs/page=data) i pamięć local-first. Wypróbuj to wszystko w [Playground](#!section=playground).
