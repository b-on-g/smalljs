# Začínáme

Tato stránka vás provede od prázdné složky až po běžící, reaktivní aplikaci $mol. Mělo by to zabrat asi patnáct minut. Každý úryvek níže je skutečný, funkční kód — zkopírujte ho tak, jak je.

## Co budete potřebovat

- **Node.js 18+** a **git**. To je celý seznam.

Neinstalujete globální CLI ani negenerujete šablonový kód, kterému budete muset později porozumět. Aplikace $mol žijí uvnitř pracovního prostoru MAM, který už umí, jak je sestavit a servírovat.

## 1. Získejte pracovní prostor

MAM je nástroj pro sestavení a registr modulů pro $mol. Naklonujte ho a jednou nainstalujte.

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` spustí vývojový server na `http://localhost:9080/`. Sleduje vaše soubory a automaticky přesestavuje — nechte ho běžet ve vlastním terminálu.

## 2. Vytvořte modul

Aplikace $mol je jen složka. Vyberte jmenný prostor (svůj vlastní, např. `my`) a název (`hello`).

```bash
mkdir -p my/hello
```

> **Jedno pravidlo k zapamatování:** podtržítka v názvu komponenty jsou oddělovače složek. `$my_hello` žije v `my/hello/`, `$my_hello_form` by žil v `my/hello/form/`. Názvy složek modulů nikdy neobsahují podtržítko.

Nyní přidejte tři soubory do `my/hello/`.

### index.html — vstupní bod

```html
<!doctype html>
<html mol_view_root>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>
	<body mol_view_root>
		<div mol_view_root="$my_hello"></div>
		<script src="web.js"></script>
	</body>
</html>
```

Atribut `mol_view_root="$my_hello"` připojí vaši komponentu při načtení stránky.

### hello.view.tree — rozvržení

```tree-no-run
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

Pár věcí, které stojí za zmínku.

- `$mol_page` a `$mol_string` jsou vestavěné komponenty — obal stránky a textové vstupní pole.
- `<=` váže vlastnost jedním směrem; `<=>` váže oběma směry. Takže `value? <=> name?` udržuje vstup a váš stav `name` synchronizované.
- `@` označuje lokalizovatelný řetězec; `\` zahajuje surový řetězec.

### hello.view.ts — chování

```typescript
namespace $.$$ {
	export class $my_hello extends $.$my_hello {
		@ $mol_mem
		greeting() {
			const name = this.name()
			return name ? `Hello, ${name}!` : 'Please enter your name'
		}
	}
}
```

`@ $mol_mem` dělá z `greeting` reaktivní, mezipaměťovanou vlastnost. Čte `name()`, takže v okamžiku, kdy se `name` změní, `greeting` se přepočítá a zpráva na obrazovce se aktualizuje. Nikdy jste nenapsali odběr, efekt ani volání překreslení.

## 3. Spusťte to

Vývojový server z kroku 1 už sleduje. Stačí otevřít:

```
http://localhost:9080/my/hello/
```

Napište své jméno — pozdrav se aktualizuje během psaní. To je reaktivita $mol: stav sám plyne do pohledu.

## 4. Přidejte druhou reaktivní hodnotu

Reaktivita se skládá. Přidejte počítadlo délky, které závisí na stejném `name`, bez jakéhokoli dalšího propojování.

V `hello.view.tree` přidejte řádek pod `Message`:

```tree
		<= Counter $mol_view
			sub / <= counter \
```

V `hello.view.ts` přidejte metodu:

```typescript
		@ $mol_mem
		counter() {
			return `${this.name().length} characters`
		}
}
```

`greeting` i `counter` čtou `name`; oba se aktualizují společně. Přidejte třetí, přidejte desátý — vzor se nemění. Proto zůstává kód $mol plochý, jak se funkce hromadí.

## 5. Zkontrolujte svůj build

MAM zapisuje diagnostický soubor vedle každé aplikace. Po sestavení otevřete:

```
http://localhost:9080/my/hello/-/web.audit.js
```

Čistý audit znamená žádné nepoužité závislosti, žádné problémy s typy, nic k opravě. Zvykněte si na něj nakouknout — zachytí chyby dřív, než se dostanou do prohlížeče.

## Sestavili jste aplikaci $mol

Máte reaktivní komponentu, obousměrné vázání a odvozený stav — se třemi malými soubory a nulovou konfigurací.

Pokračujte dál: **[Průvodce](#!section=docs/page=installation)** do hloubky pokrývá instalaci, pohledy, stav, směrování a data — a promění tento Hello World v něco skutečného.
