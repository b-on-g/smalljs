# Instalace

[Začínáme](#!section=docs/page=getting-started) vás krok za krokem provede vaší první aplikací. Tato stránka je referenční: jak je projekt $mol uspořádán a jak funguje sestavení.

## Požadavky

- **Node.js 18+** a **git**. Nic dalšího se globálně neinstaluje.

## Pracovní prostor MAM

Aplikace $mol žijí uvnitř **MAM** — nástroje pro sestavení a registru modulů. Naklonujete jej jednou a vyvíjíte své moduly uvnitř:

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` spustí sledovací vývojový server na `http://localhost:9080/`. Při uložení znovu sestaví a automaticky vyřeší závislosti — nikdy neudržujete konfiguraci bundleru.

## Jak se moduly pojmenovávají

Každý název komponenty odpovídá cestě ke složce a **každé podtržítko je oddělovač složek**:

```
$my_app          →  my/app/
$my_app_header   →  my/app/header/
```

Názvy složek modulů nikdy neobsahují podtržítko — pro víceslovné názvy použijte vnořené složky. Pokud se komponenta, kterou používáte, nikdy neobjeví v bundlu, téměř vždy cesta ke složce neodpovídá názvu třídy.

## Anatomie modulu

Komponenta je složka až se čtyřmi soubory:

| Soubor | Účel |
|------|------|
| `name.view.tree` | Deklarativní rozvržení |
| `name.view.ts` | Chování (TypeScript) |
| `name.view.css.ts` | Typované styly |
| `name.view.tree`, `index.html` | Vstupní bod modulu aplikace |

`index.html` aplikace připojí kořenovou komponentu:

```html
<body mol_view_root>
	<div mol_view_root="$my_app"></div>
	<script src="web.js"></script>
</body>
```

## Sestavení pro produkci

Vývojový server sestavuje za běhu, ale libovolný modul můžete sestavit i výslovně z kořene pracovního prostoru:

```bash
npm run start my/app
```

Výstup se objeví v `my/app/-/` — včetně `web.js`, `web.css` a `web.audit.js`. **Vždy zkontrolujte audit:** čistý `web.audit.js` znamená žádné nepoužité závislosti a žádné typové chyby.

## Přidávání npm balíčků

Odkažte na balíček pomocí `require` a MAM jej nainstaluje při dalším sestavení:

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

## Dále

S připraveným pracovním prostorem se naučte, jak se popisuje samotné rozhraní — pokračujte na [Pohledy](#!section=docs/page=views).
