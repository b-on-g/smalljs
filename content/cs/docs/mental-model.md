# Myšlenkový model

Pokud přicházíte z Reactu nebo Vue, první dny v $mol strávíte hledáním věcí, které tu nejsou: `computed`, `watch`, `useEffect`, `onMounted`, `fetch` v hooku životního cyklu. Nejsou schované někde v API; model pro ně nemá místo. Tato stránka je pětiminutová verze toho modelu. Přečtěte si ji před [Pohledy](#!section=docs/page=views) a vraťte se sem, kdykoli vám bude chybět nějaký známý název.

## Pull, ne push

Nic se nepočítá, dokud si to někdo nepřečte. Pohled se vykreslí tím, že čte své vlastnosti; každá vlastnost čte, co potřebuje; řetězec závislostí se z těchto čtení poskládá sám. Není co deklarovat jako odběr a není žádný `watch` k registraci: čtení je ten odběr.

```tree
$my_profile $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
```

```typescript
namespace $.$$ {
	export class $my_profile extends $.$my_profile {
		@ $mol_mem
		user() {
			return this.$.$mol_fetch.json( 'https://api.example.com/me' ) as { name: string }
		}
		name() {
			return this.user().name
		}
	}
}
```

Vykreslení `Name` čte `name()`, `name()` čte `user()` a `user()` sáhne do sítě. Nikdo neřekl pohledu o požadavku a nikdo neřekl požadavku o pohledu. Když se `user()` změní, přepočítá se všechno, co jej četlo — a nic jiného.

## Bez životního cyklu

Není tu `mounted`, není `useEffect`, není `created`. Data se objednávají čtením vlastnosti a pohled čte své vlastnosti tehdy, když se vykresluje. Příklad výše tedy načte uživatele ve chvíli, kdy se `$my_profile` objeví na obrazovce, a ani o chvíli dřív. Když pohled z obrazovky zmizí, `user()` už nikdo nečte a buňka se uvolní spolu s pohledem.

To je celá náhrada za vzor „fetch on mount“: pohled si řekne o to, co potřebuje, a framework rozhodne, kdy se zeptat. Načítání není připnuté k události stránky, ale k tomu, že je něco vidět.

## Vlastnost je buňka

Jedna metoda s volitelným argumentem je zároveň getter, setter, odvozená hodnota i stav:

```typescript
@ $mol_mem
count( next?: number ) {
	return next ?? 0
}
```

Zavolaná bez argumentu čte, zavolaná s argumentem zapisuje. `@ $mol_mem` promění metodu v cachovanou buňku, která se přepočítá, když se změní něco, co přečetla. Odvozená hodnota je prostě metoda `@ $mol_mem`, která čte jiné metody. Pozorovatel není potřeba: vedlejší efekt patří k události a obslužná rutina události je metoda označená `@ $mol_action`.

```typescript
@ $mol_mem
doubled() {
	return this.count() * 2
}

@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

[Stav a reaktivita](#!section=docs/page=state) popisuje pravidla toho, co se smí dít uvnitř každého z těch dvou.

## Synchronní kód, který čeká

`user()` výše vypadá synchronně a je napsaný tak, jako by odpověď už byla na místě. Funguje to proto, že každý výpočet běží ve vlákně. `this.$.$mol_fetch.json()` to vlákno pozastaví a framework výpočet spustí znovu, jakmile odpověď dorazí. Do té doby pohled, který `user()` přečetl, zobrazuje stav načítání; pokud požadavek selže, tentýž pohled zobrazí chybu. Nepíšete ani příznak `isLoading`, ani `try`/`catch`.

Tentýž mechanismus obsluhuje libovolný asynchronní zdroj. [Načítání dat](#!section=docs/page=data) projde znovunačtení a ošetření chyb.

## Všechno je přepsání

Soubor `view.tree` je seznam deklarací metod. Každý řádek pod komponentou je vlastností té komponenty s výchozí hodnotou a vlastnost kterékoli vnořené komponenty lze předefinovat přímo tam, kde se používá, jediným řádkem. Placeholder textového vstupu je vlastnost `hint` komponenty `$mol_string`:

```tree
$my_search $mol_view
	sub /
		<= Query $mol_string
			hint \Search
			value? <=> query? \
```

Není tu žádný seznam props k rozšíření, žádný wrapper k napsání ani fork k udržování. Pokud má komponenta vlastnost, můžete ji nastavit zvenčí.

## Jak číst zdrojové kódy

Předchozí sekce otevírá tu pravou otázku: jak víte, že se ta vlastnost jmenuje `hint`? Odpověď zní: podíváte se — a framework je postavený tak, aby dívání bylo levné.

**Zdrojové kódy frameworku leží vedle vašich.** V pracovním prostoru MAM je `mol/string/string.view.tree` jednu složku od `my/hello/`. Není v `node_modules` ani uvnitř bundlu; je to úplně stejný druh souboru, jaký píšete sami.

**Název třídy je cesta.** `$mol_string` žije v `mol/string/`, `$mol_button_major` v `mol/button/major/`. Každé podtržítko je oddělovač složek, takže název z vašeho stromu jde vždy převést na složku, kterou otevřete. Podpora editorů ze stránky [Nástroje](#!section=docs/page=tooling) vám tyto názvy doplní.

**`.view.tree` komponenty je úplný seznam jejích vlastností i s výchozími hodnotami.** Tvar hodnoty prozradí typ: `\` zahajuje řetězec, `/` seznam, `*` slovník, holé číslo je číslo, `true` a `false` jsou booleany, `null` znamená nepřítomnost a `<=` uvozuje podpohled nebo vlastnost převzatou od vlastníka. Tady je ta část `mol/string/string.view.tree`, na které u vstupu záleží:

```tree
$mol_string $mol_view
	dom_name \input
	enabled true
	field *
		^
		disabled <= disabled false
		value <= value_changed? <=> value? \
		placeholder <= hint_visible <= hint \
	attr *
		^
		type <= type? \text
```

Přečtěte si to nahlas. `dom_name \input`: tato komponenta vykresluje element `input`. `enabled true`: booleovská vlastnost, ve výchozím stavu zapnutá. `field *` je slovník polí DOM elementu; názvy vlevo patří DOM, názvy vpravo komponentě a ten úplně vpravo je ten, který nastavujete. DOM `placeholder` se tedy bere z `hint`, ve výchozím stavu prázdného řetězce; DOM `value` je zapisovatelná vlastnost `value?` a atribut `type` je zapisovatelné `type?`, ve výchozím stavu `text`. Placeholder, zakázaný vstup a pole pro heslo jsou ve vašem stromě `hint`, `enabled false` a `type \password`.

**Typované rozhraní se generuje z téhož stromu.** `mol/string/-view.tree/string.view.tree.d.ts` vypisuje tytéž vlastnosti jako signatury TypeScriptu a [API reference](#!section=docs/page=api-mol-string) na tomto webu vzniká z toho souboru. Všechny tři se shodují, protože všechny tři pocházejí z jednoho zdroje.

**Většina komponent má složku `demo/` a `readme.md`.** `mol/string/demo/demo.view.tree` ukazuje vstup s nápovědou, zakázaný a s přednastavenou hodnotou. Když potřebujete komponentu v nějakém stavu, najděte nejbližší demo a zkopírujte řádek.

Dohromady zabere placeholder asi minutu:

```bash
ls mol | grep string
cat mol/string/string.view.tree
```

Pod `$mol_string` uvidíte `hint \` a pod svůj `$mol_string` napíšete `hint \Search`.

## Názvy

Všechno je `snake_case`: názvy vlastností ve `view.tree`, názvy metod v TypeScriptu i atributy, které framework dává DOM uzlům kvůli stylování. Podpohledy začínají velkým písmenem (`Query`), hodnoty malým (`query`).

Název ve stromě a název metody ve třídě se musí shodovat písmeno po písmenu. `exchange_form` ve stromě a `exchangeForm` ve třídě jsou dvě nesouvisející vlastnosti: tu ze třídy nikdo nikdy nečte, ta ze stromu zůstane u výchozí hodnoty a není žádná chyba, která by vám to řekla. Když se zdá, že přepsání nic nedělá, je tohle první věc ke kontrole. [Řešení problémů](#!section=docs/page=troubleshooting) vypisuje tento i ostatní případy, kdy je obrazovka špatně a překladač mlčí.

## Dále

Když je model na místě, [Pohledy](#!section=docs/page=views) ukazují, jak se komponenty deklarují a skládají, a [Z React, Vue a Svelte](#!section=docs/page=rosetta) mapuje názvy, které už znáte, na ty zdejší.
