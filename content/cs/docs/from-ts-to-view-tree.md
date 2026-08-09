# Z TypeScriptu do view.tree

Komponenta, kterou jste napsali v kapitole [Začínáme](#!section=docs/page=getting-started), je obyčejná třída TypeScriptu. Přeloží se, běží a je to podporovaný způsob, jak popsat komponentu $mol — jeden z několika, které framework přijímá.

Zároveň vás donutila držet v hlavě čtyři věci, které s prací komponenty nemají nic společného. Tato stránka je bere jednu po druhé a ukazuje řádek `view.tree`, který každou z nich odstraní. Pak ukáže kód, který generuje překladač, abyste si ověřili, že strom není druhé běhové prostředí: vyrábí přesně tu třídu, kterou jste už napsali.

Tady je ten soubor znovu, pro srovnání:

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

## Potomka si vytváříte sami a sami ho i kešujete

Šest z těch řádků je továrna:

```typescript
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}
```

Smažte `@ $mol_mem` a pořád se to přeloží. Přestane to ale být jedna komponenta: `this.Name() !== this.Name()`, protože tělo při každém volání spustí `new`. Vyhrává ten, kdo vlastnost přečetl poslední, dřívější instance zůstanou se vším, co nasbíraly, a nikdo je neuklidí — $mol vlastní jen ty objekty, které vám sám nakešoval.

Ve `view.tree` je stejný potomek jeden řádek:

```tree
		<= Name $mol_string
```

Jméno s velkým písmenem znamená, že vlastnost drží komponentu, a `<=` ji deklaruje. Neexistuje kratší zápis, který by zapomněl dekorátor, protože továrnu nepíšete vy.

## Směr dat udává operátor

Nakrmit potomka znamená přiřazovat, vlastnost po vlastnosti:

```typescript
			obj.sub = () => [ this.greeting() ]
```

Tři pohyblivé části: objekt potomka, jméno vlastnosti a šipka, aby se čtení odehrálo později, ne teď. Řádek říká, co je propojeno, ale ne kterým směrem; abyste to zjistili, musíte přečíst tělo šipky a ověřit, jestli se něco vrací.

Strom vkládá směr do operátoru:

```tree
		<= Message $mol_view
			sub / <= greeting \
```

`<=` je jednosměrné, z `greeting` do `sub` potomka. `/` je seznam, `\` začíná surový řetězec a `greeting \` deklaruje vlastnost s prázdným řetězcem jako výchozí hodnotou — tou, kterou přepíšete v TypeScriptu.

## Obousměrné vázání je jednu klávesu od tichého jen-pro-čtení

Pole potřebuje data oběma směry a přesně to dělá parametr `next`:

```typescript
			obj.value = ( next?: string ) => this.name( next )
```

Teď `next` vypusťte:

```typescript
			obj.value = () => this.name()
```

TypeScript to přijme. Funkce bez argumentů je přiřaditelná tam, kde se čeká jeden nepovinný, takže typy sedí a audit zůstává zelený. Pole se vykreslí, ukáže správnou hodnotu a tiše ignoruje všechno, co napíšete.

Ve stromu se takové poloviční spojení zapsat nedá:

```tree
		<= Name $mol_string
			value? <=> name? \
```

`<=>` váže oběma směry. Holý `?` označuje vlastnost, která přijímá argument, tedy vlastnost, do níž lze zapisovat. Tady je na obou koncích, takže hodnota teče do pole a zase zpátky.

## Lokalizovatelný řetězec zůstává řetězcem, dokud z něj neuděláte klíč

```typescript
		title() {
			return 'Greeting'
		}
```

Abyste to přeložili, vymyslíte klíč, nahradíte literál voláním `$mol_locale.text`, napíšete json a po zbytek života projektu držíte obojí ručně v souladu.

```tree
	title @ \Greeting
```

`@` označí řetězec jako lokalizovatelný, zbytek udělá build. Po sestavení je v `my/hello/-/web.locale=en.json`:

```json
{
	"$my_hello_Name_hint": "Enter your name",
	"$my_hello_title": "Greeting"
}
```

Překladatelé dostanou json se všemi řetězci aplikace. Vy nenapíšete jediný klíč.

## Celá komponenta

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

To je `hello.view.tree`. V `hello.view.ts` zůstává ta část, která nikdy nebyla strukturou:

```typescript
namespace $.$$ {

	export class $my_hello extends $.$my_hello {

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

Třída nyní rozšiřuje `$.$my_hello`, základ vygenerovaný stromem, a přepisuje jednu vlastnost. `$.$$` je jmenný prostor pro tyhle přepisy.

## Co překladač vydá

`view.tree` je generátor kódu bez vlastního běhového prostředí. Sestavte modul a přečtěte si `my/hello/-view.tree/hello.view.tree.js`:

```javascript
	($.$my_hello) = class $my_hello extends ($.$mol_page) {
		name(next){
			if(next !== undefined) return next;
			return "";
		}
		Name(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this.$.$mol_locale.text("$my_hello_Name_hint")));
			(obj.value) = (next) => ((this.name(next)));
			return obj;
		}
		greeting(){
			return "";
		}
		Message(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.greeting())]);
			return obj;
		}
		title(){
			return (this.$.$mol_locale.text("$my_hello_title"));
		}
		body(){
			return [(this.Name()), (this.Message())];
		}
	};
	($mol_mem(($.$my_hello.prototype), "name"));
	($mol_mem(($.$my_hello.prototype), "Name"));
	($mol_mem(($.$my_hello.prototype), "Message"));
```

Stejné továrny, stejné šipky, stejná tři volání `$mol_mem`, k tomu dva klíče lokalizace, které jste nemuseli pojmenovat. Než balíček dorazí do prohlížeče, strom je pryč.

Proto se také oba formáty bez potíží mísí. Komponenta psaná stromem a komponenta psaná třídou vyrobí stejný druh objektu, takže jedna aplikace může držet obojí a nikdo rozdíl nepozná.

## Co ručně psaná třída žádnému nástroji nepředá

Vedle vygenerovaného JS zapíše překladač i `hello.view.tree.d.ts`:

```typescript
declare namespace $ {

	type $mol_string__hint_my_hello_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_my_hello_2 = $mol_type_enforce<
		ReturnType< $my_hello['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_view__sub_my_hello_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $my_hello extends $mol_page {
		name( next?: string ): string
		Name( ): $mol_string
		greeting( ): string
		Message( ): $mol_view
		title( ): string
		body( ): readonly(any)[]
	}

}
```

Dvojice `$mol_type_enforce` prověřují každé vázání proti vlastnosti, kterou napájí, takže nesouhlas typů se ohlásí přímo na vázání, ne někde uvnitř potomka. Tělo třídy pod nimi je strojově čitelný popis povrchu komponenty a opravdu se čte: soubor lokalizace výše vzniká ze stejného rozboru a [stránky API](#!section=docs/page=api-mol-string) na tomto webu se generují z `.view.tree.d.ts` každé základní komponenty.

Ručně psaná třída nenabízí nic z toho. Je to kód a jediné, co ho umí přečíst, je TypeScript.

## Kolik toho je

Hello World výše: 31 řádků TypeScriptu se změní v 8 řádků stromu plus 8 řádků TypeScriptu.

S velikostí komponenty rozdíl roste. `$mol_app_users` — vyhledávací pole, seznam, čtyři tlačítka a stavový řádek — má jako strom 30 řádků a 840 znaků a jako třída 125 řádků a 3046 znaků. Obě verze jsou v úplnosti vytištěné na wiki stránce [srovnání formátů](https://github.com/hyoo-ru/mam_mol/wiki/View-Formats), takže si výměnu můžete zvážit sami.

## Co psát

Obojí, po jednotlivých komponentách.

`view.ts` je podporovaný formát. Je to to, do čeho se strom překládá, a takto psaná komponenta se chová jako každá jiná. Když je komponenta hlavně logika s jedním nebo dvěma potomky, třída je poctivá volba a strom moc nepřinese.

Strom se vyplatí tam, kde se obřad opakuje: obrazovky složené hlavně ze struktury, dlouhé řady vázání, cokoli s textem, který bude chtít vidět překladatel. To popisuje většinu uživatelského rozhraní, a proto jsou vlastní komponenty $mol psané právě takhle.

Dále přijde samotný jazyk stromu — seznamy, slovníky, potomci s klíčem a specializace komponenty děděním: **[Pohledy](#!section=docs/page=views)**.
