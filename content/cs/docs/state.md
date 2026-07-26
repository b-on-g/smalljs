# Stav a reaktivita

Stav v $mol se chová jako tabulkový procesor: deklarujete, jak se hodnota vypočítá, a vše, co na ní závisí, se aktualizuje samo. Žádné úložiště, žádný dispatch, žádné effect hooky — graf závislostí sleduje, co přepočítat.

## Reaktivní vlastnosti

Metoda ozdobená `@ $mol_mem` je uložená (cachovaná) reaktivní buňka. Spustí se jednou, zapamatuje si výsledek a přepočítá se jen tehdy, když se změnilo něco, co přečetla.

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

`doubled` čte `count`, takže se k `count` automaticky přihlásí. Změňte `count` a každý pohled zobrazující `doubled` se obnoví — není třeba se ničeho přihlašovat ručně.

## Čtení a zápis

Vlastnost je zároveň getter i setter: zavolejte ji bez argumentu pro čtení, s argumentem pro zápis.

```typescript
@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

## Akce vs. výpočty

Toto jediné rozlišení udržuje reaktivní kód předvídatelný:

- `@ $mol_mem` je **čistý výpočet** — jen čte jiné buňky a vrací hodnotu.
- `@ $mol_action` je **efekt** — zápisy do stavu, síťová volání a časovače patří sem.

Zápis do buňky zevnitř `@ $mol_mem` vytvoří zpětnovazební smyčku (zápis znehodnotí závislost, která se přepočítá a znovu zapíše). $mol to hlásí jako *cyklické přihlášení*. Oprava je vždy stejná: držte vedlejší efekty v akcích, výpočty udržujte čisté.

| V `@ $mol_mem` můžete | ale ne |
|---|---|
| číst jiné buňky | zapisovat jiné buňky |
| `new SomeClass()` | `fetch()`, `await` |
| vrátit hodnotu | `setTimeout`, zápisy do DOM |

Obslužné rutiny tlačítek se generují jako `@ $mol_mem` na základní třídě; přepište je pomocí `@ $mol_action`, aby mohly bezpečně zapisovat:

```typescript
@ $mol_action
submit() {
	this.saved( true )
}
```

## Odvozený stav se skládá

Protože se závislosti sledují automaticky, odvozené hodnoty se řetězí bez jakéhokoli propojování. Každá čte tu předchozí; změna v kořeni se šíří přesně tak daleko, jak je potřeba:

```typescript
@ $mol_mem full_name() {
	return `${ this.first() } ${ this.last() }`.trim()
}

@ $mol_mem greeting() {
	return this.full_name() ? `Hello, ${ this.full_name() }!` : 'Hello!'
}
```

## Stav s klíčem

`@ $mol_mem_key` je výpočet parametrizovaný klíčem — jedna cachovaná buňka na klíč. Ideální pro hodnoty na řádek:

```typescript
@ $mol_mem_key
task_done( id: string, next?: boolean ) {
	const task = this.task( id )
	if ( next !== undefined ) task.Done( null )!.val( next )
	return task.Done()?.val() ?? false
}
```

## Asynchronní hodnota je jen hodnota

Vraťte z `@ $mol_mem` příslib a pohled zobrazí stav načítání, dokud se nevyřeší — bez explicitního příznaku načítání:

```typescript
@ $mol_mem
async data() {
	const res = await fetch( '/api/data' )
	return await res.json()
}
```

[Načítání dat](#!section=docs/page=data) na tomto vzoru staví.

## Přechodný stav mezi událostmi

Stav deklarovaný ve `view.tree` se mezi jednotlivými obslužnými rutinami událostí resetuje (sekvence tažení/posunu/gesta), protože $mol každou rutinu obalí do vlastního vlákna. Pro hodnoty, které musí přežít z jedné události do druhé, použijte prosté pole v TypeScriptu místo reaktivní vlastnosti:

```typescript
export class $my_canvas extends $.$my_canvas {
	// plain field — survives across events, not reactive
	drag_id = ''

	@ $mol_action pan_start() { this.drag_id = 'node_42' }
	@ $mol_action pan_move() { if ( this.drag_id ) { /* ... */ } }
}
```

Použijte reaktivní buňku, když pohled musí na hodnotu reagovat; použijte prosté pole pro přechodný stav, který čtou jen obslužné rutiny.

## Dále

Reaktivní stav je nejužitečnější, když je adresovatelný — připojte jej k URL v [Směrování](#!section=docs/page=routing).
