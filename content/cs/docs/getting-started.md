# Začínáme

Tato stránka vás provede od prázdné složky až po běžící, reaktivní aplikaci $mol. Mělo by to zabrat asi patnáct minut. Každý úryvek níže je skutečný, funkční kód — zkopírujte ho tak, jak je.

Komponentu napíšete v obyčejném TypeScriptu. $mol má i kratší formát pro popis komponent, `view.tree`, a potkáte ho na další stránce. Tady ho není potřeba: komponenta $mol je tak jako tak obyčejná třída.

## Co budete potřebovat

- **Node.js 18+** a **git**. To je celý seznam.

Neinstalujete globální CLI ani negenerujete šablonový kód, kterému budete muset později porozumět. Aplikace $mol žijí uvnitř pracovního prostoru MAM, který už umí, jak je sestavit a servírovat.

## 1. Získejte pracovní prostor

MAM je sestavovací nástroj a registr modulů pro $mol. Naklonujte ho a jednou nainstalujte.

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` spustí vývojový server na `http://localhost:9080/`. Sleduje vaše soubory a automaticky přestavuje — nechte ho běžet ve vlastním terminálu.

## 2. Vytvořte modul

Aplikace $mol je jen složka. Vyberte jmenný prostor (svůj, například `my`) a jméno (`hello`).

```bash
mkdir -p my/hello
```

> **Jedno pravidlo k zapamatování:** podtržítka ve jménu komponenty jsou oddělovače složek. `$my_hello` bydlí v `my/hello/`, `$my_hello_form` by bydlel v `my/hello/form/`. Názvy složek modulů nikdy neobsahují podtržítko.

Teď přidejte do `my/hello/` dva soubory.

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

### hello.view.ts — komponenta

```typescript
namespace $ {

	export class $my_hello extends $mol_page {

		title() {
			return 'Greeting'
		}

		body() {
			return [ this.Name(), this.Message() ]
		}

		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}

		@ $mol_mem
		name( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.greeting() ]
			return obj
		}

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

Čtěme shora dolů:

- `$my_hello` bydlí v `namespace $`, okolním jmenném prostoru, kde žije každá komponenta $mol. Rozšiřuje `$mol_page`, vestavěnou skořápku stránky s titulkem a tělem. `$mol_string` níže je vestavěné textové pole.
- `body()` vrací potomky. Potomek tu není značka, ale vlastnost: `Name` a `Message` jsou metody, které můžete zavolat, přepsat v potomkovi nebo zacílit jménem ze stylopisu.
- `Name()` sestaví pole a zapojí ho. Každá jeho vlastnost dostane **šipku**, ne hodnotu. Potomek tu šipku zavolá ve chvíli, kdy data potřebuje, takže čte vždy ta aktuální.
- `name( next?: string )` je stav. Zavolána bez argumentu čte, s argumentem zapisuje. Právě předání celé této funkce do `obj.value` způsobí, že psaní v poli aktualizuje `name`.
- `@ $mol_mem` kešuje vlastnost na instanci. U `name` to znamená, že hodnota se uchová a všechno, co ji četlo, se při změně přepočítá. U `Name` a `Message` to znamená jednu potomkovskou komponentu, sestavenou jednou, místo nové při každém volání.
- `greeting()` čte `name()`. To čtení *je* odběr. Když se `name` změní, `greeting` se přepočítá a text na obrazovce ho následuje, bez deklarovaného efektu, bez seznamu závislostí a bez volání překreslení.

## 3. Spusťte to

Vývojový server z kroku 1 už sleduje. Stačí otevřít:

```
http://localhost:9080/my/hello/
```

Napište své jméno a pozdrav se aktualizuje během psaní. To je reaktivita $mol: stav teče do pohledu sám.

## 4. Přidejte druhou reaktivní hodnotu

Reaktivita se skládá. Přidejte počítadlo délky, které čte stejný `name`, bez jakéhokoli dalšího propojování.

Vložte ho do `body()`:

```typescript
		body() {
			return [ this.Name(), this.Message(), this.Counter() ]
		}
```

a doplňte dvě vlastnosti za ním:

```typescript
		@ $mol_mem
		Counter() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.counter() ]
			return obj
		}

		counter() {
			return `${ this.name().length } characters`
		}
```

`greeting` i `counter` čtou `name` a obě se aktualizují společně. Přidejte třetí, přidejte desátou: reaktivní polovina nikdy nemění tvar.

Ta druhá ano. Tři řádky logiky přišly se šesti řádky instalatérské práce okolo — továrna, `new`, šipka, `return obj`. Vynásobte to každým potomkem na skutečné obrazovce a máte důvod, proč `view.tree` existuje.

## 5. Zkontrolujte sestavení

MAM zapisuje diagnostický soubor vedle každé aplikace. Po sestavení otevřete:

```
http://localhost:9080/my/hello/-/web.audit.js
```

Čistý audit znamená žádné nepoužité závislosti, žádné problémy s typy, nic k opravě. Zvykněte si na něj nakouknout — zachytí chyby dřív, než se dostanou do prohlížeče.

## Sestavili jste aplikaci $mol

Reaktivní komponenta s obousměrným vázáním a odvozeným stavem, v jediném souboru, s nulovou konfigurací.

Teď vezměte přesně ten samý soubor a sledujte, jak se scvrkne: **[Z TypeScriptu do view.tree](#!section=docs/page=from-ts-to-view-tree)**.
