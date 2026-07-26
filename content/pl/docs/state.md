# Stan i reaktywność

Stan $mol zachowuje się jak arkusz kalkulacyjny: deklarujesz, jak obliczana jest wartość, a wszystko, co od niej zależy, aktualizuje się samo. Bez store'ów, bez dispatch, bez hooków efektów — graf zależności śledzi, co przeliczyć.

## Właściwości reaktywne

Metoda ozdobiona `@ $mol_mem` to buforowana, reaktywna komórka. Wykonuje się raz, zapamiętuje swój wynik i przelicza tylko wtedy, gdy zmieniło się coś, co przeczytała.

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

`doubled` czyta `count`, więc automatycznie subskrybuje `count`. Zmień `count`, a każdy widok pokazujący `doubled` się odświeży — nie ma nic do ręcznego subskrybowania.

## Odczyt i zapis

Właściwość jest zarówno getterem, jak i setterem: wywołaj ją bez argumentu, aby odczytać, z argumentem, aby zapisać.

```typescript
@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

## Akcje kontra obliczenia

To jedno rozróżnienie utrzymuje kod reaktywny przewidywalnym:

- `@ $mol_mem` to **czyste obliczenie** — tylko czyta inne komórki i zwraca wartość.
- `@ $mol_action` to **efekt** — zapisy do stanu, wywołania sieciowe i timery należą tutaj.

Zapis do komórki z wnętrza `@ $mol_mem` tworzy pętlę sprzężenia zwrotnego (zapis unieważnia zależność, która się przelicza, która znów zapisuje). $mol zgłasza to jako *cykliczną subskrypcję*. Poprawka jest zawsze ta sama: trzymaj efekty uboczne w akcjach, utrzymuj obliczenia czyste.

| W `@ $mol_mem` możesz | ale nie |
|---|---|
| czytać inne komórki | zapisywać inne komórki |
| `new SomeClass()` | `fetch()`, `await` |
| zwrócić wartość | `setTimeout`, zapisy DOM |

Handlery przycisków są generowane jako `@ $mol_mem` na klasie bazowej; nadpisz je przez `@ $mol_action`, aby mogły bezpiecznie zapisywać:

```typescript
@ $mol_action
submit() {
	this.saved( true )
}
```

## Stan pochodny się komponuje

Ponieważ zależności są śledzone automatycznie, wartości pochodne łączą się w łańcuch bez żadnego okablowania. Każda czyta poprzednią; zmiana w korzeniu rozchodzi się dokładnie tak daleko, jak trzeba:

```typescript
@ $mol_mem full_name() {
	return `${ this.first() } ${ this.last() }`.trim()
}

@ $mol_mem greeting() {
	return this.full_name() ? `Hello, ${ this.full_name() }!` : 'Hello!'
}
```

## Stan z kluczem

`@ $mol_mem_key` to obliczenie sparametryzowane kluczem — jedna buforowana komórka na klucz. Idealne dla wartości per wiersz:

```typescript
@ $mol_mem_key
task_done( id: string, next?: boolean ) {
	const task = this.task( id )
	if ( next !== undefined ) task.Done( null )!.val( next )
	return task.Done()?.val() ?? false
}
```

## Asynchroniczność to tylko wartość

Zwróć obietnicę z `@ $mol_mem`, a widok pokaże stan ładowania, dopóki się nie rozwiąże — bez jawnej flagi ładowania:

```typescript
@ $mol_mem
async data() {
	const res = await fetch( '/api/data' )
	return await res.json()
}
```

[Pobieranie danych](#!section=docs/page=data) opiera się na tym wzorcu.

## Stan przejściowy między zdarzeniami

Stan zadeklarowany w `view.tree` resetuje się między oddzielnymi handlerami zdarzeń (sekwencje przeciągania/przesuwania/gestów), ponieważ $mol owija każdy handler we własne włókno. Dla wartości, które muszą przetrwać od jednego zdarzenia do następnego, użyj zwykłego pola TypeScript zamiast właściwości reaktywnej:

```typescript
export class $my_canvas extends $.$my_canvas {
	// plain field — survives across events, not reactive
	drag_id = ''

	@ $mol_action pan_start() { this.drag_id = 'node_42' }
	@ $mol_action pan_move() { if ( this.drag_id ) { /* ... */ } }
}
```

Użyj komórki reaktywnej, gdy widok musi reagować na wartość; użyj zwykłego pola dla stanu przejściowego, który czytają tylko handlery.

## Dalej

Stan reaktywny jest najbardziej użyteczny, gdy jest adresowalny — połącz go z URL w [Routing](#!section=docs/page=routing).
