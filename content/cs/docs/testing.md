# Testování

Pohled $mol je funkcí svého stavu, a to mění podobu testu. Uživatelský scénář se zapisuje jako volání vlastních metod pohledu: nastavte rozepsaný text, spusťte akci, přečtěte, co by uživatel viděl.

```typescript
app.draft( 'Milk' )
app.add()
$mol_assert_equal( app.item_title( 0 ), 'Milk' )
```

Žádné selektory, žádný prohlížeč, žádný Playwright ani Cypress, žádné čekání na cokoli. Tentýž soubor vám navíc dává:

- **Rychlost.** Testy běží v Node v milisekundách; tisíc jich zabere zhruba minutu. `node my/hello/-/node.test.js` spustí ty pro jeden modul.
- **Nulová konfigurace.** `hello.test.ts` vedle komponenty builder posbírá a přeloží do `-/node.test.js`. Průběžná integrace s `mam_build` jej spustí a při neúspěšném testu shodí build.
- **Záměna služeb přes kontext.** Každý test dostane vlastní `$` a všechno, po čem komponenta sáhne přes `this.$.X`, se zamění přiřazením testovací náhrady do toho `$`. To je ten důvod psát `this.$.$mol_fetch` a ne `$mol_fetch`: to první jde nahradit, to druhé ne.
- **Mockovaný čas.** Časovače vytvořené přes kontext netikají samy od sebe; `$mol_after_mock_warp()` spustí to, co je ve frontě.
- **Skutečný DOM, když je potřeba.** Bundl pro Node nese jsdom, takže `dom_node()` i `querySelectorAll` fungují ve stejném testovacím souboru.

## Scénář přes metody pohledu

Vezměte seznam úkolů z [Kuchařky](#!section=docs/page=cookbook): řetězec `draft?`, seznam `items`, akci `add` a akci `delete`. Jeho test žije v `my/todo/todo.test.ts`:

```typescript
namespace $ {
	$mol_test({

		'add an item and delete it'( $ ) {
			const app = $my_todo.make({ $ })

			app.draft( 'Milk' )
			app.add()
			$mol_assert_equal( app.items().length, 1 )
			$mol_assert_equal( app.item_title( 0 ), 'Milk' )
			$mol_assert_equal( app.draft(), '' )

			app.delete( 0 )
			$mol_assert_like( app.item_rows(), [] )
		},

		'blank draft adds nothing'( $ ) {
			const app = $my_todo.make({ $ })

			app.draft( '   ' )
			app.add()
			$mol_assert_like( app.items(), [] )
		},

	})
}
```

Pár věcí, kterých si všimnout:

- Testovací soubor používá `namespace $`, ne `$.$$`. Kontext `$` přichází jako argument, čerstvý pro každý test, a komponenta se vytvoří přes `Klass.make({ $ })`, aby služby četla z toho kontextu.
- Kliknutí je volání obslužné rutiny. `app.add()` dělá to, co dělá tlačítko; `app.Add().click( event )` jde toutéž cestou, když chcete zahrnout i vazbu.
- Ověřujte to, co vidí uživatel: `items()`, `item_rows()`, `sub()`, `title()` podpohledu. Model kontrolovaný přes obrazovku chytí i přepsání, které vypadlo ze třídy — což by test samotného modelu neudělal.
- `$mol_assert_equal` porovnává podle totožnosti, `$mol_assert_like` porovnává strukturu, `$mol_assert_fail( ()=> ..., 'message' )` očekává vyhození.
- Název testu je popis. V těle nejsou žádné komentáře.

## Mockování služby

Každý test dostane čerstvý kontext odvozený z globálního. Přiřaďte na tom `$` službě podtřídu ještě před vytvořením komponenty a každé `this.$.X` uvnitř komponenty se rozřeší na náhradu. Tady je náhrada za fetch pro komponentu `$my_users` z [Načítání dat](#!section=docs/page=data):

```typescript
namespace $ {
	$mol_test({

		'user names come from the response'( $ ) {
			$.$mol_fetch = class extends $.$mol_fetch {
				static override json( input: RequestInfo ) {
					if( String( input ).endsWith( '/users' ) ) return [ { id: 1, name: 'Ada' } ]
					return $mol_fail( new Error( 'Unexpected request: ' + input ) )
				}
			}
			const app = $my_users.make({ $ })
			$mol_assert_like( app.user_names(), [ 'Ada' ] )
		},

	})
}
```

`users()` v komponentě volá `this.$.$mol_fetch.json( ... )`, takže požadavek jde na mock a hodnota je dostupná synchronně, bez jakéhokoli čekání. Kdyby komponenta zavolala globální `$mol_fetch.json( ... )`, mock by se vůbec nevzal v potaz. Vestavěné mocky už v kontextu nahrazují globální `fetch` a `XMLHttpRequest` proxy objekty, které vyhazují chybu, takže požadavek, který kontextu proklouzne, hlasitě selže, místo aby sáhl na síť.

Tentýž vzor pokrývá `$mol_state_arg` pro URL, `$mol_state_local` pro úložiště a cokoli dalšího, co si vaše komponenta bere z `this.$`.

Je tu ještě `$mol_test_mocks`, seznam funkcí, které se na kontextu spustí před každým testem v bundlu, i před testy jiných modulů. Je to místo pro pravidla platná všude — takhle si framework registruje vlastní mocky: náhradu úložiště, která si podrží, co dostane, lokalizaci vracející prázdný slovník, výše zmíněný zákaz sítě. Testovací data jedné komponenty tam nepatří.

## Čas

Vlastní testy frameworku registrují mocky pro `$mol_after_timeout`, `$mol_after_frame` a jejich příbuzné a tyto mocky jsou i ve vašem bundlu. Časovač vytvořený přes `new this.$.$mol_after_timeout( ms, task )` se zařadí do fronty místo naplánování a `$mol_after_mock_warp()` tu frontu spustí. Pro toast, který se sám schová:

```typescript
@ $mol_mem toast( next?: string ) { return next ?? '' }

@ $mol_action notify( text: string ) {
	this.toast( text )
	new this.$.$mol_after_timeout( 3000, ()=> this.toast( '' ) )
}
```

test posouvá čas ručně:

```typescript
'toast hides after the timer'( $ ) {
	const app = $my_greeter.make({ $ })
	app.notify( 'Saved' )
	$mol_assert_equal( app.toast(), 'Saved' )
	$mol_after_mock_warp()
	$mol_assert_equal( app.toast(), '' )
},
```

Holé `setTimeout` v pohledu mockované není a test přežije; to je jeden z důvodů vytvářet časovače přes kontext.

## Přes DOM

V bundlu pro Node je `$mol_dom_context` okno jsdom, takže se pohled vykreslí do skutečných elementů. Sáhněte po tom, když kontrolujete značkování, a ne stav:

```typescript
'greets by name'( $ ) {
	const app = $my_greeter.make({ $ })
	app.name( 'Ada' )
	$.$mol_dom_context.document.body.appendChild( app.dom_node() )
	app.dom_tree()
	$mol_assert_equal( app.Hello().dom_node().textContent, 'Hello, Ada!' )
	app.destructor()
},
```

`dom_node()` vytvoří element, `dom_tree()` vykreslí podstrom a `destructor()` pohled uvolní, aby jeho buňky test nepřežily. Atribut, který podpohled dostane od svého názvu — tady `[my_greeter_hello]` — je tím selektorem, když dáváte přednost `querySelector` před voláním podpohledu.

V jsdom chybí dva globály, po kterých vstupní pole a gesta sahají: `ShadowRoot` a `PointerEvent`. `$mol_string` vykreslený bez nich vypíše `ReferenceError` a zůstane prázdný, zatímco zbytek stromu se vykreslí. Půjčte si je z okna jsdom; tohle je pravidlo bez jakýchkoli dat, platné pro každý test, takže patří do `$mol_test_mocks`:

```typescript
$mol_test_mocks.push( $ => {
	const win = $.$mol_dom_context
	Object.assign( globalThis, {
		ShadowRoot: win.ShadowRoot,
		PointerEvent: win.PointerEvent ?? win.MouseEvent,
	} )
} )
```

## Co test v Node nepokryje

Geometrii a stylování. Jestli dva bloky lícují, jestli panel přetéká obrazovku, jestli se tmavý motiv dobře čte — nic z toho v jsdom neexistuje. Pro rozvržení, kterého jste se dotkli, otevřete v prohlížeči `-/test.html` daného modulu, které aplikaci připojí a spustí tam tytéž testy, a podívejte se.

## Praktické poznámky

- **Ticho znamená selhání.** Test, který neprošel asercí, a test, který zamrzl, vypadají stejně: žádný výstup a proces, který dál žije. Hledejte na konci `All tests passed`; pokud chybí, zkontrolujte nejdřív poslední aserci. Test `async` má limit jedné sekundy.
- **Jeden schválně rozbijte.** Když běh nic nevypíše, obraťte jednu aserci a ověřte, že se selhání ukáže. Sada testů, která neumí selhat, nic neměří.
- **Neověřujte lokalizované řetězce.** Hodnoty označené ve stromě `@` se rozřeší přes lokalizaci, která se v každém čerstvém kontextu zahřívá znovu. Ověřujte strukturu, ne text popisku.

## Dále

[Řešení problémů](#!section=docs/page=troubleshooting) vypisuje chyby, při kterých testy zůstávají zelené a obrazovky prázdné, a [Načítání dat](#!section=docs/page=data) ukazuje komponentu, pro kterou byl výše uvedený mock napsán.
