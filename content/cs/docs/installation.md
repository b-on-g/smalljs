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

Odkažte na balíček pomocí `require` a MAM jej nainstaluje při dalším sestavení a vloží do bundlu:

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

### Načtení balíčku za běhu

Těžká knihovna, kterou potřebuje jedna obrazovka, nemusí ležet ve `web.js`. Dodejte její hotový prohlížečový soubor vedle bundlu a načtěte jej při prvním použití.

Uveďte soubor v `meta.tree` modulu:

```tree
deploy \/node_modules/@turf/turf/turf.min.js
```

`deploy` balíček nainstaluje, pokud chybí, a zkopíruje soubor do `-/node_modules/@turf/turf/turf.min.js`, na vývojovém serveru stejně jako v produkčním sestavení. Načtěte jej pomocí `$mol_import.script`:

```typescript
namespace $ {
	export class $my_app_turf extends $mol_object {

		@ $mol_mem
		static api() {
			$mol_import.script( './node_modules/@turf/turf/turf.min.js' )
			return ( globalThis as any ).turf as typeof import(
				'@turf/turf'
			)
		}

	}
}
```

- Cesta je relativní a vyhodnocuje se vůči stránce v `-/`, takže stejný kód funguje na vývojovém serveru, v `test.html` i při nasazení pod podcestou. Úvodní `/` funguje jen, dokud aplikace leží v kořeni domény.
- `$mol_import.script` pozastaví fiber, dokud se skript nenačte, a kešuje podle URL: soubor se stáhne jednou a vše, co čte `$my_app_turf.api()` uvnitř `$mol_mem`, na něj prostě počká.
- Globální jméno, zde `turf`, je to, které přiděluje prohlížečové sestavení knihovny. Jaké, uvádí její README.
- `typeof import( … )` dává plné typování. Nechte název balíčku na samostatném řádku: sestavovač považuje `require( '…' )` a `import( '…' )` zapsané na jednom řádku za závislost a nakonec by celý balíček vložil do `web.js`.

## Dále

S připraveným pracovním prostorem se naučte, jak se popisuje samotné rozhraní — pokračujte na [Pohledy](#!section=docs/page=views).
