# Testen

Eine $mol-View ist eine Funktion ihres Zustands, und das ändert, wie ein Test aussieht. Ein Benutzerszenario wird als Aufrufe der eigenen Methoden der View geschrieben: den Entwurf setzen, die Aktion ausführen, lesen, was der Benutzer sehen würde.

```typescript
app.draft( 'Milk' )
app.add()
$mol_assert_equal( app.item_title( 0 ), 'Milk' )
```

Keine Selektoren, kein Browser, kein Playwright oder Cypress, kein Warten auf irgendetwas. Dieselbe Datei bringt Ihnen außerdem:

- **Tempo.** Tests laufen in Node in Millisekunden; tausend davon brauchen etwa eine Minute. `node my/hello/-/node.test.js` führt die eines Moduls aus.
- **Keine Einrichtung.** Eine `hello.test.ts` neben der Komponente wird vom Builder aufgesammelt und in `-/node.test.js` kompiliert. Die kontinuierliche Integration mit `mam_build` führt sie aus und lässt den Build scheitern, wenn ein Test fehlschlägt.
- **Dienste über den Kontext austauschen.** Jeder Test bekommt sein eigenes `$`, und alles, was eine Komponente über `this.$.X` erreicht, wird ausgetauscht, indem man diesem `$` ein Test-Double zuweist. Das ist der Grund, `this.$.$mol_fetch` statt `$mol_fetch` zu schreiben: Das erste ist ersetzbar, das zweite nicht.
- **Gemockte Zeit.** Über den Kontext erzeugte Timer ticken nicht von selbst; `$mol_after_mock_warp()` führt aus, was in der Warteschlange steht.
- **Ein echtes DOM, wenn Sie eines brauchen.** Das Node-Bundle trägt jsdom mit sich, also funktionieren `dom_node()` und `querySelectorAll` in derselben Testdatei.

## Ein Szenario über View-Methoden

Nehmen Sie die Todo-Liste aus dem [Kochbuch](#!section=docs/page=cookbook): eine Zeichenkette `draft?`, eine Liste `items`, eine Aktion `add` und eine Aktion `delete`. Ihr Test liegt in `my/todo/todo.test.ts`:

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

Ein paar Dinge fallen auf:

- Die Testdatei benutzt `namespace $`, nicht `$.$$`. Der Kontext `$` kommt als Argument herein, frisch für jeden Test, und die Komponente wird mit `Klass.make({ $ })` erzeugt, damit sie ihre Dienste aus diesem Kontext bezieht.
- Ein Klick ist ein Aufruf des Handlers. `app.add()` ist das, was der Button tut; `app.Add().click( event )` nimmt denselben Weg, wenn Sie die Bindung mit einbeziehen wollen.
- Prüfen Sie, was der Benutzer sieht: `items()`, `item_rows()`, `sub()`, das `title()` einer Sub-View. Ein über den Bildschirm geprüftes Modell fängt auch eine Überschreibung ab, die aus der Klasse gefallen ist — was ein Test des Modells allein nicht täte.
- `$mol_assert_equal` vergleicht über die Identität, `$mol_assert_like` vergleicht die Struktur, `$mol_assert_fail( ()=> ..., 'message' )` erwartet einen Wurf.
- Der Name des Tests ist die Beschreibung. Im Rumpf stehen keine Kommentare.

## Einen Dienst mocken

Jeder Test bekommt einen frischen Kontext, der vom globalen abgeleitet ist. Weisen Sie einem Dienst auf diesem `$` eine Unterklasse zu, bevor Sie die Komponente erzeugen, und jedes `this.$.X` innerhalb der Komponente löst zum Ersatz auf. Hier ist das Fetch-Double für die Komponente `$my_users` aus [Datenabruf](#!section=docs/page=data):

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

`users()` in der Komponente ruft `this.$.$mol_fetch.json( ... )` auf, also geht die Anfrage an den Mock und der Wert steht synchron bereit, ohne jedes Warten. Hätte die Komponente `$mol_fetch.json( ... )` auf dem globalen Objekt aufgerufen, wäre der Mock nie befragt worden. Die eingebauten Mocks ersetzen das globale `fetch` und `XMLHttpRequest` auf dem Kontext bereits durch Proxys, die werfen — eine Anfrage, die am Kontext vorbeirutscht, scheitert also laut, statt das Netz anzufassen.

Dasselbe Muster deckt `$mol_state_arg` für die URL ab, `$mol_state_local` für den Speicher und alles andere, was Ihre Komponente aus `this.$` bezieht.

Es gibt außerdem `$mol_test_mocks`, eine Liste von Funktionen, die vor jedem Test im Bundle gegen den Kontext laufen, auch vor Tests anderer Module. Dort gehören Regeln hin, die überall gelten — so, wie das Framework seine eigenen Mocks registriert: ein Speicher-Double, das behält, was man ihm gibt, eine Locale, die ein leeres Wörterbuch liefert, das Netzverbot von oben. Fixture-Daten für eine einzelne Komponente gehören nicht dorthin.

## Zeit

Die eigenen Tests des Frameworks registrieren Mocks für `$mol_after_timeout`, `$mol_after_frame` und ihre Verwandten, und diese Mocks stecken auch in Ihrem Bundle. Ein über `new this.$.$mol_after_timeout( ms, task )` erzeugter Timer wird eingereiht statt eingeplant, und `$mol_after_mock_warp()` arbeitet die Warteschlange ab. Für einen Toast, der sich selbst wieder ausblendet:

```typescript
@ $mol_mem toast( next?: string ) { return next ?? '' }

@ $mol_action notify( text: string ) {
	this.toast( text )
	new this.$.$mol_after_timeout( 3000, ()=> this.toast( '' ) )
}
```

bewegt der Test die Zeit von Hand:

```typescript
'toast hides after the timer'( $ ) {
	const app = $my_greeter.make({ $ })
	app.notify( 'Saved' )
	$mol_assert_equal( app.toast(), 'Saved' )
	$mol_after_mock_warp()
	$mol_assert_equal( app.toast(), '' )
},
```

Ein nacktes `setTimeout` in einer View wird nicht gemockt und überlebt den Test; das ist einer der Gründe, Timer über den Kontext zu erzeugen.

## Über das DOM

Im Node-Bundle ist `$mol_dom_context` ein jsdom-Fenster, also rendert eine View in echte Elemente. Nutzen Sie das, wenn die Prüfung dem Markup gilt und nicht dem Zustand:

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

`dom_node()` erzeugt das Element, `dom_tree()` rendert den Teilbaum, und `destructor()` gibt die View frei, damit ihre Zellen den Test nicht überleben. Das Attribut, das eine Sub-View von ihrem Namen bekommt, hier `[my_greeter_hello]`, ist der Selektor, wenn Ihnen `querySelector` lieber ist als der Aufruf der Sub-View.

jsdom fehlen zwei globale Objekte, nach denen Eingabefelder und Gesten greifen: `ShadowRoot` und `PointerEvent`. Ein ohne sie gerendertes `$mol_string` protokolliert einen `ReferenceError` und bleibt leer, während der Rest des Baums rendert. Borgen Sie sie sich vom jsdom-Fenster; das ist eine datenfreie Regel für jeden Test und gehört daher in `$mol_test_mocks`:

```typescript
$mol_test_mocks.push( $ => {
	const win = $.$mol_dom_context
	Object.assign( globalThis, {
		ShadowRoot: win.ShadowRoot,
		PointerEvent: win.PointerEvent ?? win.MouseEvent,
	} )
} )
```

## Was ein Node-Test nicht abdeckt

Geometrie und Styling. Ob zwei Blöcke bündig sitzen, ob ein Panel über den Bildschirm hinausläuft, ob sich das dunkle Thema gut liest: Nichts davon existiert in jsdom. Für Layout, das Sie angefasst haben, öffnen Sie die `-/test.html` des Moduls im Browser — sie hängt die App ein und führt dort dieselben Tests aus — und schauen hin.

## Praktische Hinweise

- **Stille ist ein Fehlschlag.** Ein Test, der an einer Prüfung gescheitert ist, und ein Test, der hängt, sehen gleich aus: keine Ausgabe und ein Prozess, der am Leben bleibt. Halten Sie am Ende nach `All tests passed` Ausschau; fehlt es, prüfen Sie zuerst die letzte Zusicherung. Ein `async`-Test ist auf eine Sekunde begrenzt.
- **Machen Sie absichtlich einen kaputt.** Wenn ein Lauf nichts ausgibt, drehen Sie eine Zusicherung um und vergewissern Sie sich, dass der Fehlschlag erscheint. Eine Testsuite, die nicht scheitern kann, misst nichts.
- **Prüfen Sie keine lokalisierten Zeichenketten.** Im Baum mit `@` markierte Werte werden über die Locale aufgelöst, die sich in jedem frischen Kontext neu aufwärmt. Prüfen Sie die Struktur, nicht den Text eines Labels.

## Weiter

[Fehlerbehebung](#!section=docs/page=troubleshooting) listet die Fehler auf, die Tests grün und Bildschirme leer lassen, und [Datenabruf](#!section=docs/page=data) zeigt die Komponente, für die der Mock oben geschrieben wurde.
