# Časté dotazy

## Co je smalljs?

smalljs je dokumentační web pro **$mol** — reaktivní UI framework s typovanými pohledy, automatickou reaktivitou a bez virtuálního DOM. Samotný framework vyvíjí otevřeně komunita hyoo-ru; tento web shromažďuje průvodce, interaktivní kurz, živé hřiště a referenci API na jednom místě.

## Je $mol připravený pro produkci?

Ano. $mol pohání skutečné aplikace a interní nástroje — viz [Výkladní skříň](#!section=docs/page=showcase). Dodává se z jediného monorepa (MAM) a jeho autoři i komunita jej denně používají.

## Jak velký je runtime?

Malý. Typická $mol aplikace dodá kolem 100 KB kódu frameworku a vykreslování je ve výchozím stavu virtualizované — komponenty mimo viditelnou oblast se nikdy nevytvoří. Podrobnosti a benchmarky viz [Vykreslování](#!section=docs/page=rendering).

## Musím se učit nový šablonovací jazyk?

Naučíte se `view.tree`, kompaktní stromovou syntaxi pro deklaraci rozvržení komponent. Je záměrně malá — kapitola [Pohledy](#!section=docs/page=views) pokryje vše potřebné na jedno posezení. Logika zůstává v čistém TypeScriptu a styly jsou také typované.

## Čím se liší od Reactu, Vue nebo Svelte?

Reaktivita je automatická — není žádné `useState`, `useEffect` ani ruční přihlašování. Popisujete, *co* UI je; $mol rozhoduje, *jak* a *kdy* jej aktualizovat. [Překladová tabulka pojmů](#!section=docs/page=rosetta) mapuje myšlenky jiných frameworků na $mol.

## Kde získám pomoc?

- Ptejte se v [komunitě DEV](https://dev.to/t/mol)
- Procházejte [zdrojový kód a issues $mol na GitHubu](https://github.com/hyoo-ru/mam_mol)
- Čtěte referenční dokumentaci na [mol.hyoo.ru](https://mol.hyoo.ru/)

## Pod jakou licencí je?

MIT. $mol můžete volně používat v komerčních i open-source projektech.
