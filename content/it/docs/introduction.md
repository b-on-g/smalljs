# Introduzione

## Che cos'è $mol?

$mol è un framework di interfaccia reattivo: descrivi **cosa** è l'interfaccia e il framework capisce **come** e **quando** aggiornarla. Nessun DOM virtuale, nessuna sottoscrizione manuale, nessun `useEffect`. Scrivi i componenti come un albero; $mol renderizza solo ciò che è visibile e ricalcola solo ciò che è realmente cambiato.

Un componente ha tre file:

- `name.view.tree` — il layout dichiarativo (un linguaggio ad albero compatto)
- `name.view.ts` — il comportamento (semplici classi TypeScript)
- `name.view.css.ts` — gli stili tipizzati (controllati dal compilatore)

Questa separazione è l'idea centrale: il layout resta leggibile, la logica resta testabile, gli stili restano type-safe.

## A chi è rivolto?

- Vuoi un'app **piccola** che resti piccola mentre cresce — il runtime è compatto e il rendering è virtualizzato per impostazione predefinita.
- Ti piacciono **i tipi ovunque** — persino gli stili sono controllati da TypeScript.
- Sei stanco di cablare la reattività a mano — lo stato in $mol è automaticamente reattivo, come un foglio di calcolo.

## Un assaggio

Un contatore, per intero:

```tree
$my_counter $mol_view
	sub /
		<= Count $mol_view
			sub / <= count \
		<= Increment $mol_button
			click? <=> increment?
			sub / <= label \+
```

```typescript
namespace $.$$ {
	export class $my_counter extends $.$my_counter {
		@ $mol_mem count() { return 0 }
		@ $mol_action increment() { this.count( this.count() + 1 ) }
	}
}
```

`count` è reattivo: tutto ciò che lo legge viene ri-renderizzato automaticamente quando cambia. Nessun `setState`, nessun array di dipendenze, nessuno store da registrare.

## Dove andare ora?

Pronto a eseguire qualcosa sulla tua macchina? Vai a [Primi passi](#!section=docs/page=getting-started) e costruisci un'app funzionante in meno di quindici minuti.
