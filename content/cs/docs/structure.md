# Struktura projektu

Projekt v $mol má čtyři vnořené úrovně: **workspace**, který jste naklonovali, **balíky** uvnitř, **moduly** v balících a **soubory** v modulu. Rozvržení odpovídá na jednu praktickou otázku — kam patří nový projekt a komu patří jeho historie — a skoro všechno, co build dělá, z toho plyne.

```structure
mam/                         workspace — naklonovaný MAM
├── .meta.tree               rejstřík: který balík z kterého repozitáře
├── mol/                     balík — samotný framework, vlastní git repozitář
└── my/                      balík — váš, váš vlastní git repozitář
    ├── .gitattributes       udrží sestavené binárky nedotčené
    ├── my.meta.tree         rejstřík vašich projektů
    └── hello/               projekt — modul a vlastní git repozitář
        ├── index.html       vstupní bod (jen moduly aplikací)
        ├── hello.view.tree
        └── form/            podmodul — $my_hello_form
```

Na této stránce nese každý řádek výpisu otazník s důvodem, proč tam je; sekce níž říkají totéž obšírněji.

## Jak založit projekt

Pět kroků. Opakuje se jen první a poslední tři za vás zvládne scaffolder.

**1. Naklonujte workspace, jednou.** Všechno, co od teď napíšete, žije uvnitř.

```bash
git clone https://github.com/hyoo-ru/mam.git
cd mam
```

**2. Založte si vlastní balík.** Jedna krátká složka — vaše jméno, vaše firma, vaše přezdívka — a vlastní git repozitář. Je to kontejner na každý projekt, který začnete:

```bash
mkdir my
cd my
git init
```

Vystavte ho tam, kde držíte kód, veřejně nebo privátně. Rovnou k němu přidejte `.gitattributes` s jediným řádkem `* -text`; proč, je níž v sekci o balících.

**3. Přidejte rejstřík.** `my/my.meta.tree` je seznam projektů uvnitř vašeho balíku. Začíná prázdný a dostává řádek na projekt:

```tree
pack hello git \https://github.com/you/hello.git
```

MAM ho čte stejně jako `.meta.tree` workspace o úroveň výš, takže kolega, který naklonuje `my/`, dostane i projekty.

**4. Vytvořte projekt s vlastním repozitářem.** Složka je komponenta — `my/hello/` je `$my_hello` — a historie patří jí, ne vašemu balíku ani $mol:

```bash
mkdir hello
cd hello
git init
```

V tom oddělení je smysl rozvržení: commit v `my/hello/` jde do repozitáře `hello`, nikdy do `my` a nikdy do `mol`.

**5. Zapište ho.** Přidejte řádek `pack` z kroku 3 do `my/my.meta.tree` a čerstvý checkout vašeho balíku si projekt stáhne podle jména.

[Scaffolder](#!section=docs/page=tooling) vám kdykoli po druhém kroku napíše funkční modul:

```bash
npx create-view-tree-lsp my/hello
```

## Pracovní prostor

MAM naklonujete jednou a pracujete uvnitř něj. Není to složka, do které se kopírují závislosti: každý balíček tam leží jako vlastní git checkout, s historií, takže si můžete číst zdrojáky frameworku, vložit do nich `debugger` a otevřít pull request ze stejné pracovní kopie.

Kořenový `.meta.tree` je registr, který to umožňuje:

```tree
pack mol git \https://github.com/hyoo-ru/mam_mol.git
pack hyoo git \https://github.com/hyoo-ru/mam_hyoo.git
pack lib git \https://github.com/hyoo-ru/mam_lib.git
```

Když build narazí na `$mol_view` a složka `mol/` ještě neexistuje, vyhledá jméno tady a naklonuje repozitář. Nic se nevendoruje a nic se nezplošťuje.

## Balíčky

Složka nejvyšší úrovně je balíček a balíček je git repozitář. Váš vlastní balíček je prostě složka, kterou pojmenujete: dokud zůstává lokální, žádnou registraci nepotřebuje, a řádek `pack` až v den, kdy ho budete chtít stahovat podle jména.

Balíčky se vnořují. Balíček může nést vlastní deklarace `pack` pro složky uvnitř sebe a MAM je čte z `meta.tree` té složky, která bude balíček obsahovat. Tento web žije v `bog/smalljs/` a je samostatným repozitářem uvedeným v `bog/bog.meta.tree`, který sám leží uvnitř checkoutu `bog/` uvedeného v kořenovém `.meta.tree`.

### Jeden soubor, který potřebuje každý balíček

Balíček, který se nasazuje, potřebuje `.gitattributes` s jediným řádkem:

```
* -text
```

To vypne normalizaci konců řádků v gitu. Záleží na tom proto, že nasazení znamená commitnout výstup buildu do větve, a ten výstup není jen text: tento web veze 57 binárních souborů, písma, která si hostuje sám, a náhledový obrázek pro každou stránku. Znormalizované na vstupu dorazí ke čtenáři jako rozbité obrázky a písma, zatímco samotný build zůstane zelený. Checkout MAM má stejný soubor ve svém kořeni, kde jsou formáty písem navíc označené jako `binary`.

Generátor jej napíše za vás; do repozitáře, který jste založili sami, jej přidejte ručně.

## Moduly

Modul je složka a složka je komponenta. Neexistuje žádný příkaz import ani mapa modulů: jméno třídy *je* adresa a každé podtržítko v něm je oddělovač složek:

```
$my_hello          →  my/hello/
$my_hello_form     →  my/hello/form/
$mol_button_major  →  mol/button/major/
$mol_after_frame   →  mol/after/frame/
```

To je celé pravidlo rozlišení. Builder prochází váš zdrojový text a hledá tokeny `$name`, každý rozdělí podle `_` a projde složky. Nic nedeklaruje závislost; použití jména je ta deklarace.

Praktický důsledek: **názvy složek modulů nikdy neobsahují podtržítko.** Složka pojmenovaná `my/hello_form/` by se hledala pod `my/hello/form/` a nikdy by se nenašla — příznakem je třída, která se ve vašem editoru přeloží, ale v bundlu chybí.

Modul, který má submoduly, může být komponentou i sám, a to ve dvou podobách. `$mol_button` žije přímo v `mol/button/`, vedle `major/` a `minor/`. `$mol_view` žije o úroveň hlouběji, v `mol/view/view/`, protože `mol/view/` obsahuje i `component/`, `selection/` a `tree2/`. MAM zkusí nejdřív zdvojenou cestu a spadne zpět na kratší, takže se vyřeší obě uspořádání.

## Soubory v modulu

Každý soubor je volitelný. Modul jsou přesně ty soubory, které se v něm shodou okolností nacházejí.

| Soubor | Účel |
|------|---------|
| `hello.view.tree` | Deklarativní rozvržení |
| `hello.view.ts` | Chování: třída rozšiřující vygenerovaný základ |
| `hello.view.css.ts` | Typované styly. Všimněte si koncového `.ts`: je to TypeScript volající `$mol_style_define`, ne stylopis |
| `hello.ts` | Modul zcela bez pohledu — modely, utility, čistá logika |
| `hello.test.ts` | Testy, spouštěné builderem |
| `hello.locale=ru.json` | Překlady; posbírá se každý soubor končící na `.locale=<lang>.json` |
| `hello.meta.tree` | Direktivy buildu a nasazení |
| `index.html` | Vstupní bod — potřebuje ho jen modul aplikace |

Přípona před koncovkou omezuje soubor na jedno prostředí:

- `frame.web.ts` — jen prohlížečový bundle, jako `mol/after/frame/frame.web.ts`
- `build.node.ts` — jen Node bundle, jako samotný builder MAM
- `hello.test.ts` — jen testovací bundly

Builder vyrábí pro každou aplikaci bundle `web` a bundle `node` a zahazuje soubory označené pro ten druhý, takže se platformový kód nikdy nemusí bránit za běhu.

Vedle modulu se přijímají i syrové soubory `.css` — framework je používá pro těch pár věcí, které typované styly nedokážou vyjádřit, jako `@keyframes` a `content:`. Všechno ostatní patří do `.view.css.ts`, kde se názvy vlastností kontrolují.

## Vygenerované složky začínají pomlčkou

MAM považuje jméno za zdroj jen tehdy, začíná-li písmenem nebo číslicí. Cokoli jiného je pro build neviditelné, a proto má každá vygenerovaná složka prefix `-`: výstup může ležet přímo vedle svého vstupu, aniž by se načetl zpátky jako vstup. `.gitignore` pracovního prostoru ignoruje `-*` ze stejného důvodu.

**`-view.tree/`** se objeví vedle každého souboru `.view.tree` a drží to, do čeho se strom přeloží:

```
my/hello/-view.tree/
├── hello.view.tree.js            vygenerovaná bázová třída
├── hello.view.tree.d.ts          její typované rozhraní
└── hello.view.tree.locale=en.json  vytažené @-řetězce
```

Váš `hello.view.ts` rozšiřuje třídu, která tam leží. To je celý vztah mezi těmi dvěma soubory — [Z TypeScriptu do view.tree](#!section=docs/page=from-ts-to-view-tree) prochází vygenerovaný kód řádek po řádku.

**`-css/`** se objeví vedle syrového souboru `.css` a drží vygenerovaný `.ts`, který stylopis zabalí do volání `$mol_style_attach`, takže cestuje s bundlem místo toho, aby vyžadoval `<link>`.

**`-/`** je výstup buildu modulu, který jste sestavili. Pro aplikaci obsahuje `web.js`, `web.css`, `web.audit.js`, `web.d.ts`, `web.deps.json`, jeden `web.locale=<lang>.json` na jazyk, protějšky pro `node`, přepsaný `index.html` a vygenerované `package.json` a `manifest.json`. Právě tuhle složku nasazujete: publikovat `app/-` na statický hosting je celý krok nasazení.

Nic z toho se needituje ručně. Builder tyhle soubory přepíše pokaždé, když se změní jejich zdroj, takže úprava tam zmizí při dalším uložení, aniž by vám nějaká chyba řekla proč. Změňte `.view.tree`, `.css` nebo zdroje a přebuildujte.

## Co meta.tree vlastně dělá

`meta.tree` není manifest balíčku a neuvádí závislosti — ty přicházejí z kódu, kde token `$mol_view` je už celá deklarace. Nese tu hrstku věcí, které kód nedokáže říct sám. `app/app.meta.tree` tohoto webu je celý soubor:

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

- **`deploy \/path`** zkopíruje soubor nebo složku do `-/` a zachová přitom cestu relativní k pracovnímu prostoru: `\/bog/smalljs/assets` přistane v `app/-/bog/smalljs/assets/`. Pro statické soubory, které nasazení musí vézt, ale žádný kód je neimportuje: obrázky, písma, ikony.
- **`include \/path`** a **`require \/path`** vynutí modul, na který nic neodkazuje, třeba `\/mol/offline/install`, jehož celým smyslem je service worker, který registruje při načtení. Liší se jen pořadím: `require` staví modul před kód, který si ho vtáhl, `include` za něj.
- **`pack <name> git \<url>`** je záznam registru popsaný výše, čtený z meta souboru té složky, která bude balíček obsahovat.

MAM čte ve složce každý soubor `*.meta.tree`, takže jméno nenese význam nad rámec konvence: `<module>.meta.tree` vedle modulu, `.meta.tree` v kořeni pracovního prostoru.

V praxi patří `deploy`, `include` a `require` modulu aplikace, protože to je ta věc, která se buildí a nasazuje; obyčejné komponenty si vše odvodí ze svého kódu a meta soubor nepotřebují vůbec. Knihovní modul ho dostane, jen když má opravdu neodkazovanou závislost: `mol/assert/assert.meta.tree` je jediný řádek `include \/mol/dev/format`, a to je typická velikost.

Více o direktivách viz [Metadata modulu](#!section=docs/page=meta).

## Dále

[Instalace](#!section=docs/page=installation) pokrývá vývojový server a produkční build a [Nástroje](#!section=docs/page=tooling) mají generátor, který za vás napíše správné rozvržení modulu.
