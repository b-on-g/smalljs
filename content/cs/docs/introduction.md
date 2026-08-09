# Úvod

## Co je $mol?

$mol je reaktivní UI framework: popíšeš, **co** rozhraní je, a framework zjistí, **jak** a **kdy** ho aktualizovat. Žádné virtuální DOM, žádné ruční odběry, žádný `useEffect`. Komponenty píšeš jako strom; $mol vykresluje jen to, co je vidět, a přepočítává jen to, co se skutečně změnilo.

Komponenta se skládá ze tří souborů:

- `name.view.tree` — deklarativní rozvržení (kompaktní stromový jazyk)
- `name.view.ts` — chování (obyčejné třídy TypeScriptu)
- `name.view.css.ts` — typované styly (kontrolované překladačem)

Toto oddělení je celá myšlenka: rozvržení zůstává čitelné, logika testovatelná a styly typově bezpečné.

Povinný sám o sobě není ani jeden ze tří. Strom je zkratka pro strukturu, kterou lze napsat i ručně: [Z TypeScriptu do view.tree](#!section=docs/page=from-ts-to-view-tree) staví jednu komponentu oběma způsoby a ukazuje kód, do kterého se strom překládá.

## Pro koho je?

- Chceš **malou** aplikaci, která zůstane malá i když roste — runtime je kompaktní a vykreslování je ve výchozím stavu virtualizované.
- Máš rád **typy všude** — i styly kontroluje TypeScript.
- Jsi unavený z ručního propojování reaktivity — stav v $mol je reaktivní automaticky, jako v tabulkovém procesoru.

## Ochutnávka

Počítadlo, celé:

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

`count` je reaktivní: vše, co ho čte, se automaticky překreslí, když se změní. Žádné `setState`, žádné pole závislostí, žádný store k registraci.

## Kam dál?

Připraven spustit něco na vlastním stroji? Zamiř na [Začínáme](#!section=docs/page=getting-started) a postav funkční aplikaci za méně než patnáct minut.
