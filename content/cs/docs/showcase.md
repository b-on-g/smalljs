# Výkladní skříň

Skutečné věci postavené na $mol — komunitní aplikace, komerční produkty a nástroje pro vývojáře. Každá je funkční aplikace, ne ukázka.

## Aplikace

- **[Bog Music](https://b-on-g.github.io/music/)** — hudební přehrávač, který běží jako rozšíření Chrome i jako webová aplikace, s přehráváním na pozadí a offline cachováním. $mol pohání rozhraní a local-first stav.
- **[Blitz Quiz](https://b-on-g.github.io/blitz/)** — živý kvíz ve stylu Kahoot postavený na $mol a Giper Baza. Místnosti se synchronizují v reálném čase přes vrstvu CRDT, takže není třeba provozovat žádný herní server.
- **[VDO Rebalance](https://b-on-g.github.io/invest/)** — local-first investiční nástroj: vložte portfolio `.xlsx` a získáte obchody, které ho vyváží. Stav žije v prohlížeči nad Giper Baza.
- **[RAGU](https://raguteam.github.io/web/#!screen=summary)** — webové rozhraní k open-source GraphRAG enginu: procházejte indexy dokumentů, ptejte se a dostávejte odpovědi se zdroji a zkoumejte znalostní graf z nich vytěžený. Silově řízený graf je vykreslen primitivy `$mol_svg_*`, včetně rozvržení i posouvání a přiblížení, bez jakékoli grafové knihovny.
- **[$hyoo_budget](https://budget.hyoo.ru)** — kolaborativní, local-first aplikace osobního rozpočtu. Získala první místo na hackathonu Beautiful Code.
- **[$hyoo_talks](https://talks.hyoo.ru)** — vestavitelný messenger. Prototyp postavený pro Sberbank obsadil druhé místo na Moscow City Hack.

## Design systém a nástroje

- **[BuilderUI](https://b-on-g.github.io/builderui/)** — design systém ve stylu shadcn pro $mol: typované komponenty — tlačítka, dialogy, selecty, karty, grafy a další — plus Studio pro živé motivy (základní barva, akcent, paleta grafů, poloměr, písma, světlý/tmavý). Tento web dokumentace je na něm postavený.
- **Tento web** — dokumentace, kterou čtete, včetně [Hřiště](#!section=playground) a [kurzu](#!section=course), je aplikace $mol. Vyhledávání, živý editor kódu a TypeScript v prohlížeči jsou postavené na frameworku, který dokumentují.
- **MAM** — nástroj pro sestavení a registr modulů, v němž žije každá aplikace $mol, a sám o sobě projekt $mol. Je to nástroj pro vývojáře, ne hostovaná aplikace; zdrojový kód je na GitHubu.
- **view.tree LSP** — jazykové nástroje a generátor `npm create view-tree-lsp`, který zakládá nové aplikace $mol. Editorový nástroj, takže není žádná běžící aplikace k otevření.

## V produkci

Kromě open-source a hackathonových projektů $mol jede i v komerčních systémech, které vydělávají. Několik z nich (některé běží pod NDA, takže bez odkazů a log):

- **Řízení protidronové obrany** — komplex „Tamerlan" provozuje na každém řadiči zařízení (radar, rušička, kamera) $mol mikroslužbu a spojuje je do sdílené decentralizované sítě. Webové rozhraní, lokální nebo centralizované, ukazuje situaci na obloze v reálném čase: co kde letí, co se ruší, kam míří kamery.
- **[Virtuální avatar](https://avatar.ocas.ai)** — 3D postava, se kterou si můžete povídat, hrát šachy nebo ji požádat o prezentaci snímků. Komerční produkt, kde $mol pohání rozhraní nad knihovnami třetích stran.
- **Admin panel pro testování promptů** — umožňuje firmě vybírat a testovat prompty pro neuronové sítě k hromadnému zpracování řádků katalogu: přepisování názvů, popisů a SEO polí. Také čistí textové soubory pro bezpečný export do jiných CMS.
- **Admin panel pro odečty měřičů** — měřiče nahrávají odečty na FTP; operátoři vytvářejí uživatele, udělují jim práva ke čtení konkrétních měřičů a vedou e-mailové kampaně, zatímco běžní odběratelé vidí jen své objekty a stránku jen pro čtení.
- **Back office e-shopu** — správa katalogu produktů a seznamu objednávek pro online obchod.
- **Widget pro vědecká data** — vizualizuje mikroprvky a jejich sloučeniny. Vykreslování grafů zůstává na D3; vše ostatní bylo přepsáno z čistého JS na $mol a zabaleno do Web Componenty.

## Hackathony

$mol opakovaně vyhrával na hackathonech: první místo na Beautiful Code ([$hyoo_budget](https://budget.hyoo.ru)), první místo na AC-VO-PPR-Hackathonu (ovládání městské tabule gesty a hlasem) a oceněné prototypy na More Tech, Moscow City Hack a Dev Hack. [Stránka příběhů úspěchu](https://mol.hyoo.ru/#!section=docs/=xanlom_yimh6x) $mol má podrobnosti.

## Více

[Katalog komponent $mol](https://mol.hyoo.ru/#!section=demos) má desítky živých komponent a ukázek, které si můžete otevřít a prohlédnout.

Stavíte něco na $mol? Nejlepší další krok je [Hřiště](#!section=playground) — vyzkoušejte nápad během pár vteřin a pak sdílejte URL.
