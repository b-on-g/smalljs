# Testowanie

Widok $mol jest funkcją swojego stanu, a to zmienia postać testu. Scenariusz użytkownika zapisuje się jako wywołania własnych metod widoku: ustaw wersję roboczą, uruchom akcję, przeczytaj to, co zobaczyłby użytkownik.

```typescript
app.draft( 'Milk' )
app.add()
$mol_assert_equal( app.item_title( 0 ), 'Milk' )
```

Bez selektorów, bez przeglądarki, bez Playwrighta czy Cypressa, bez czekania na cokolwiek. Ten sam plik daje ci też:

- **Szybkość.** Testy biegną w Node w milisekundach; tysiąc z nich zajmuje jakąś minutę. `node my/hello/-/node.test.js` uruchamia te dla jednego modułu.
- **Zero konfiguracji.** `hello.test.ts` obok komponentu jest podchwytywany przez builder i kompilowany do `-/node.test.js`. Ciągła integracja z `mam_build` uruchamia go i wywala build, gdy test nie przejdzie.
- **Podmiana serwisów przez kontekst.** Każdy test dostaje własne `$`, a wszystko, po co komponent sięga przez `this.$.X`, podmienia się, przypisując do tego `$` atrapę. To właśnie powód, żeby pisać `this.$.$mol_fetch`, a nie `$mol_fetch`: pierwsze da się podmienić, drugie nie.
- **Zamockowany czas.** Timery tworzone przez kontekst nie tykają same z siebie; `$mol_after_mock_warp()` wykonuje to, co stoi w kolejce.
- **Prawdziwy DOM, gdy jest potrzebny.** Bundle Node niesie jsdom, więc `dom_node()` i `querySelectorAll` działają w tym samym pliku testowym.

## Scenariusz przez metody widoku

Weź listę zadań ze [Zbioru przepisów](#!section=docs/page=cookbook): ciąg `draft?`, lista `items`, akcja `add` i akcja `delete`. Jej test mieszka w `my/todo/todo.test.ts`:

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

Kilka rzeczy wartych uwagi:

- Plik testu używa `namespace $`, nie `$.$$`. Kontekst `$` przychodzi jako argument, świeży dla każdego testu, a komponent tworzy się przez `Klass.make({ $ })`, żeby czytał serwisy właśnie z tego kontekstu.
- Kliknięcie to wywołanie handlera. `app.add()` robi to, co robi przycisk; `app.Add().click( event )` przechodzi tą samą drogą, gdy chcesz objąć testem także powiązanie.
- Sprawdzaj to, co widzi użytkownik: `items()`, `item_rows()`, `sub()`, `title()` podwidoku. Model sprawdzany przez ekran wyłapuje też nadpisanie, które wypadło z klasy — czego test samego modelu by nie zrobił.
- `$mol_assert_equal` porównuje po tożsamości, `$mol_assert_like` porównuje strukturę, `$mol_assert_fail( ()=> ..., 'message' )` oczekuje rzutu.
- Nazwa testu jest opisem. W ciele nie ma komentarzy.

## Mockowanie serwisu

Każdy test dostaje świeży kontekst wywiedziony z globalnego. Przypisz podklasę do serwisu na tym `$` przed utworzeniem komponentu, a każde `this.$.X` wewnątrz komponentu rozwiąże się do podmianki. Oto atrapa fetcha dla komponentu `$my_users` z [Pobierania danych](#!section=docs/page=data):

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

`users()` w komponencie woła `this.$.$mol_fetch.json( ... )`, więc żądanie idzie do mocka, a wartość jest dostępna synchronicznie, bez żadnego czekania. Gdyby komponent zawołał globalne `$mol_fetch.json( ... )`, mock nie zostałby w ogóle wzięty pod uwagę. Wbudowane mocki już podmieniają w kontekście globalne `fetch` i `XMLHttpRequest` na proxy, które rzucają, więc żądanie, które prześlizgnie się obok kontekstu, głośno pada, zamiast dotknąć sieci.

Ten sam wzorzec obejmuje `$mol_state_arg` dla URL, `$mol_state_local` dla magazynu i wszystko inne, co twój komponent bierze z `this.$`.

Jest jeszcze `$mol_test_mocks`, lista funkcji uruchamianych na kontekście przed każdym testem w bundle'u, także przed testami innych modułów. To miejsce na reguły obowiązujące wszędzie — tak framework rejestruje własne mocki: atrapę magazynu, która trzyma to, co dostanie, lokalizację zwracającą pusty słownik, powyższy zakaz sieci. Dane testowe jednego komponentu tam nie należą.

## Czas

Własne testy frameworka rejestrują mocki dla `$mol_after_timeout`, `$mol_after_frame` i ich krewnych, a te mocki są też w twoim bundle'u. Timer utworzony przez `new this.$.$mol_after_timeout( ms, task )` trafia do kolejki, zamiast zostać zaplanowany, a `$mol_after_mock_warp()` wykonuje tę kolejkę. Dla toasta, który sam się chowa:

```typescript
@ $mol_mem toast( next?: string ) { return next ?? '' }

@ $mol_action notify( text: string ) {
	this.toast( text )
	new this.$.$mol_after_timeout( 3000, ()=> this.toast( '' ) )
}
```

test przesuwa czas ręcznie:

```typescript
'toast hides after the timer'( $ ) {
	const app = $my_greeter.make({ $ })
	app.notify( 'Saved' )
	$mol_assert_equal( app.toast(), 'Saved' )
	$mol_after_mock_warp()
	$mol_assert_equal( app.toast(), '' )
},
```

Gołe `setTimeout` w widoku nie jest zamockowane i przeżywa test; to jeden z powodów, żeby tworzyć timery przez kontekst.

## Przez DOM

W bundle'u Node `$mol_dom_context` to okno jsdom, więc widok renderuje się do prawdziwych elementów. Sięgaj po to, gdy sprawdzasz znaczniki, a nie stan:

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

`dom_node()` tworzy element, `dom_tree()` renderuje poddrzewo, a `destructor()` zwalnia widok, żeby jego komórki nie przeżyły testu. Atrybut, który podwidok dostaje od swojej nazwy — tutaj `[my_greeter_hello]` — jest selektorem, gdy wolisz `querySelector` od wywołania podwidoku.

W jsdom brakuje dwóch globali, po które sięgają pola wejściowe i gesty: `ShadowRoot` i `PointerEvent`. `$mol_string` wyrenderowany bez nich wypisuje `ReferenceError` i zostaje pusty, podczas gdy reszta drzewa się renderuje. Pożycz je z okna jsdom; to reguła bez żadnych danych, obowiązująca w każdym teście, więc idzie do `$mol_test_mocks`:

```typescript
$mol_test_mocks.push( $ => {
	const win = $.$mol_dom_context
	Object.assign( globalThis, {
		ShadowRoot: win.ShadowRoot,
		PointerEvent: win.PointerEvent ?? win.MouseEvent,
	} )
} )
```

## Czego test w Node nie obejmuje

Geometrii i stylowania. Czy dwa bloki się równają, czy panel wychodzi poza ekran, czy ciemny motyw dobrze się czyta — nic z tego w jsdom nie istnieje. Dla układu, który ruszyłeś, otwórz w przeglądarce `-/test.html` modułu, które montuje aplikację i uruchamia tam te same testy, i popatrz.

## Uwagi praktyczne

- **Cisza oznacza porażkę.** Test, który oblał asercję, i test, który zawisł, wyglądają tak samo: brak wyjścia i proces, który nadal żyje. Szukaj `All tests passed` na końcu; jeśli tego nie ma, sprawdź najpierw ostatnią asercję. Test `async` ma limit jednej sekundy.
- **Zepsuj jeden celowo.** Gdy przebieg nic nie wypisuje, odwróć asercję i upewnij się, że porażka jest widoczna. Zestaw testów, który nie umie oblać, niczego nie mierzy.
- **Nie sprawdzaj zlokalizowanych ciągów.** Wartości oznaczone w drzewie przez `@` rozwiązują się przez lokalizację, która w każdym świeżym kontekście rozgrzewa się od nowa. Sprawdzaj strukturę, a nie tekst etykiety.

## Dalej

[Rozwiązywanie problemów](#!section=docs/page=troubleshooting) wypisuje pomyłki, przy których testy zostają zielone, a ekrany puste, a [Pobieranie danych](#!section=docs/page=data) pokazuje komponent, dla którego napisano powyższy mock.
