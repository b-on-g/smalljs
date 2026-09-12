# Řešení problémů

Každá položka na této stránce má stejný tvar: build je zelený, audit čistý, konzole mlčí a obrazovka je prázdná nebo ukazuje něco jiného, než jste zamýšleli. Překladač tyhle chyby nevidí, protože každá z nich je platný program, který jen popisuje jinou komponentu. Najděte nadpis, který zní jako to, co vidíte; pod ním je příčina a náprava.

## Přepsání vlastnosti nic nedělá a žádná chyba se nehlásí

Název ve `view.tree` a název metody ve třídě se liší, nejčastěji velikostí písmen: `exchange_form` ve stromě, `exchangeForm` ve třídě. To jsou dvě vlastnosti. Tu ze třídy nikdo nevolá, ta ze stromu zůstane u výchozí hodnoty a nic to nehlásí.

Názvy jsou všude `snake_case` a musí se shodovat písmeno po písmenu. Po úpravě `.view.ts` zkontrolujte, že každé přepsání pořád pojmenovává existující vlastnost; vygenerovaný `-view.tree/*.view.tree.d.ts` vedle stromu je ten seznam k porovnání.

## Potřebuji placeholder, zakázání nebo typ u vstupu

Tohle jsou vlastnosti `$mol_string`: `hint` pro placeholder, `enabled` pro zakázaný stav, `type` pro typ vstupu. Nastavte je tam, kde se vstup používá:

```tree
<= Password $mol_string
	hint \Password
	type \password
	enabled <= can_edit true
	value? <=> password? \
```

Kteroukoli jinou vlastnost kterékoli jiné komponenty najdete stejně: otevřete její `.view.tree`, jak ukazuje [Jak číst zdrojové kódy](#!section=docs/page=mental-model/Docs.Body=Jak%20%C4%8D%C3%ADst%20zdrojov%C3%A9%20k%C3%B3dy).

`attr *` slouží pro skutečné DOM atributy, které komponenta ještě nemodeluje, a má vlastní past: blok bez `^` na prvním řádku nahradí celý slovník atributů základu, takže `$mol_button` napsaný takhle přijde o `disabled`, `role` a `tabindex`. Začněte blok znakem `^`, ať zdědíte, a pak přidejte své klíče:

```tree
attr *
	^
	data_kind \primary
```

## Slovo se vykreslí po písmenech

Řetězec se dostal tam, kde se čeká seznam, a byl rozložen znak po znaku. Řetězce začínají `\`, seznamy `/`. Obvyklý případ je `sub`, což je seznam:

```tree
sub / <= label \Hello
```

## Obrazovka je prázdná, testy zelené

Přepsání vypadlo z `.view.ts`. Strom dává každé vlastnosti výchozí hodnotu, takže když třída přestane předefinovávat `rows()`, TypeScript je spokojený a seznam se vykreslí prázdný. Testy, které kontrolují jen model, zůstanou zelené, protože s modelem je všechno v pořádku.

Pro každé přepsání, na kterém obrazovka závisí, napište test, který čte to, co vidí uživatel: `rows()`, `sub()`, `title()` podpohledů nebo DOM. [Testování](#!section=docs/page=testing) ukazuje obojí.

## Data se nikdy nenačtou, komponenta uvízla ve stavu načítání

Metoda `@ $mol_mem` vrátila jako hodnotu příslib: `fetch( uri ).then( ... )`, metodu `async` nebo výsledek `$mol_wire_async( this ).load()`. Příslib v buňce se pro všechny čte jako „ještě počítám“ a jakmile se vyřeší, buňka se přepočítá a vyrobí čerstvý příslib. Síť funguje; pohled výsledek nikdy neuvidí.

Správný tvar je synchronní: zavolejte `this.$.$mol_fetch.json( uri )` uvnitř buňky a vraťte rozparsovanou hodnotu. Vlákno se pozastaví, dokud odpověď nedorazí, a pak buňku spustí znovu, takže se příslib ve vašem kódu vůbec neobjeví. Tam, kde se asynchronní práce musí odehrát jinde, odložte její výsledek do samostatné stavové buňky a efekt ať vrací příznak nebo klíč, nikdy příslib.

Druhá příčina je spolknutá chyba: `try`/`catch` uvnitř buňky, který chytí pozastavení spolu se skutečnými selháními. Vše, co je `Promise`, vyhoďte dál, nebo použijte `$mol_fail_catch`, které tuto kontrolu udělá za vás.

## Cyklické přihlášení

Metoda `@ $mol_mem` zapsala do jiné buňky nebo provedla vedlejší efekt, který nakonec zneplatnil něco, co předtím přečetla. Výpočty jen čtou a vracejí; zápisy, síť, časovače a DOM patří do obslužných rutin `@ $mol_action`. Druhý zdroj téhož hlášení je vazba `<=>` na potomka v kombinaci s metodou ve třídě, která deleguje na téhož potomka — popsáno níže.

## Maximum call stack — přetečení zásobníku volání

Vyvolávají ho dva tvary. První: strom má na potomkovi `tab? <=> tab?` a třída má `tab() { return this.Head().tab() }` — potomek se ptá vlastníka, vlastník se ptá potomka. Odeberte `<=>` vedoucí k potomkovi, na kterého delegujete.

Druhý: podpohled byl přetypován na vaši vlastní třídu a třída volá `super` na vlastnosti uvedené ve stromě. Tohle `super` není základní implementace, ale záslepka, kterou strom vygeneroval pro uvedenou vazbu, a záslepka deleguje zpátky na vlastníka. Místo toho delegujte výslovně na původní implementaci — viz položka o přetypování níže.

## Hodnotu psanou velkým písmenem nelze přepsat z TypeScriptu

`<= Label* \` generuje metodu jménem `Label` a `label()` ve třídě je jiná metoda. Podpohledy se píšou velkým písmenem, hodnoty malým a velikost písmen ve stromě rozhoduje o názvu vygenerované metody.

## Každý řádek vnořeného seznamu ukazuje tutéž položku

Klíčovaný podpohled uvnitř jiného klíčovaného podpohledu svůj klíč nedostane. `Cell*0` uvnitř `Row*0` se v každém řádku vykreslí s klíčem `0`. Přesuňte řádek do vlastní komponenty a data jí předejte přes vlastnosti; vnější pohled oklíčujte jako `Row*`, ne `Row*0`.

## Změnil jsem třídu podpohledu a jeho obsah zmizel

Přetypování `Pre* $mol_text_code` na `Pre* $my_code` zahodí vazby, které pro něj deklaroval základní strom, takže je nutné je vypsat znovu. Vypsání `text <= pre_text* \` vytvoří prázdnou záslepku, která zastíní skutečné `pre_text` z `$mol_text`. Delegujte ve třídě místo spoléhání na `super`, kterým je právě tahle záslepka:

```typescript
pre_text( index: number ) {
	return $mol_text.prototype.pre_text.call( this, index )
}
```

## Metody z view.ts základní komponenty chybí v podtřídě

`$my_child $my_base` ve stromě rozšiřuje třídu vygenerovanou z `base.view.tree`, ne třídu, kterou jste napsali v `base.view.ts`. Metody tam definované se k potomkovi nedostanou a TypeScript je hlásí jako chybějící. Logika sdílená několika pohledy žije v obyčejném souboru `.ts` v `namespace $`, bez stromu — tak, jak je napsaný sám `$mol_view`.

## Základní komponenta deklarovaná ve stejném souboru view.tree ztrácí své chování

Když soubor stromu deklaruje jak základ, tak třídu, která jej rozšiřuje, tělo `.view.ts` základu se pro potomka přeskočí. Základu, který má `.view.ts`, dejte vlastní složku.

## Styly prosakují mezi podpohledem a komponentou uvnitř něj

`Nav $my_app_nav` uvnitř `$my_app` dá tentýž atribut `my_app_nav` podpohledu i komponentě, takže jeden selektor trefí oba. Pojmenujte podpohled tak, aby neopakoval konec názvu třídy — třeba `Nav_row`.

## Selektor na atributu s hodnotou false nikdy nesedí

Booleovský atribut nastavený na `false` se z elementu odebere, takže `[expanded="false"]` neodpovídá ničemu. Podmíněné vykreslování není práce pro CSS; přepište továrnu podpohledu a pro variantu, která takový pohled nemá, vraťte `null`.

## Číslo ve stylu nic nemění

Ke každému číslu ve `style *` se připíše `px`: `flexGrow 1` se stane `flex-grow: 1px`, což prohlížeč zahodí. Hodnoty bez jednotek pište jako řetězce: `flexGrow \1`.

## Dva potomci posuvného pohledu leží přes sebe

`$mol_scroll` drží přesně jednoho potomka. Zabalte potomky do `$mol_view` nebo `$mol_list` a ten dejte posouvání.

## minimal_height nemá viditelný efekt

`minimal_height` je číslo, které virtualizovaný `$mol_list` používá k odhadu řádků, než se vykreslí; výšku nenastavuje. Výška se nastavuje v `.view.css.ts`.

## Vložená komponenta roztlačuje stránku do stran

Pohled připojený do cizího rozvržení se ve výchozím stavu nesmrští pod velikost svého obsahu. Dejte kořeni ve stylech `minWidth: 0`, aby šel stlačit jako okolní elementy.

## Cizí CSS moji komponentu nestyluje

Komponenta bez `dom_name` se vykreslí jako element pojmenovaný podle své třídy, což je pro CSS framework neznámý řádkový element. Nastavte značku výslovně: `$mol_button` žádnou nemá, takže tlačítko, které má stylovat cizí CSS, potřebuje `dom_name \button`.

## Kliknutí na odkaz na aktuální stránku vymaže URL

`$mol_link` s `arg *` funguje jako přepínač: na stránce, jejíž URL už odpovídá, kliknutí ty klíče odebere. Pro odkaz, který jen naviguje, z něj udělejte podtřídu s `uri_off <= uri`. Chcete-li po kliknutí znovu načíst tutéž trasu, zavolejte z obslužné rutiny `$mol_state_arg.value()` a na události proveďte `preventDefault`.

## Moje obslužná rutina vstupu se spouští při každém vykreslení

`prop?`, které jste přidali do podtřídy `$mol_string`, má název vlastnosti, kterou základ už používá: `enter`, `submit`, `hint`, `value`, `keyboard`. Než nové názvy přidáte, porovnejte je se základním stromem.

## Chyba vyhozená ze setteru hodnoty se nikdy nezobrazí

`$mol_string` zachytí výjimku z `value?` a předá ji do `setCustomValidity` vstupu, takže se objeví jen jako nativní validace formuláře. Ohlaste chybu vlastním kanálem — stavovým řádkem nebo podpohledem na zprávu.

## Klíčovaná vazba obslužné rutiny je hlášena jako chybějící

`event_click? <=> pick*? null` na klíčovaném podpohledu nevygeneruje záslepku pro `pick`. Deklarujte ji sami v kořeni stromu, `pick*? null`, a implementujte ji ve třídě.

## Bundl obsahuje modul, který nikdy nepoužívám

Builder hledá závislosti tím, že prochází zdrojový text a hledá tokeny `$mol_name`, a token v řetězcovém literálu nebo v dokumentačním komentáři `/** */` se počítá stejně jako ten v kódu. Název zmíněný v komentáři jako příklad vtáhne celý svůj modul a selhání vyskočí v souboru, kterého jste se nikdy nedotkli. Příklady a poznámky pište bez prefixu `$`, nebo místo toho uvádějte název složky.

## Dále

Většina z toho se scvrkne na jediné pravidlo: název ve stromě je smlouva a překladač kontroluje typy, ale ne názvy. [Myšlenkový model](#!section=docs/page=mental-model) vysvětluje, proč je strom seznamem přepsání, a [Testování](#!section=docs/page=testing) ukazuje test, který ty tiché chyby chytí.
