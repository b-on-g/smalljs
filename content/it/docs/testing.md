# Testing

Una vista $mol è una funzione del suo stato, e questo cambia l'aspetto di un test. Uno scenario utente si scrive come una serie di chiamate ai metodi della vista stessa: imposta la bozza, esegui l'azione, leggi ciò che l'utente vedrebbe.

```typescript
app.draft( 'Milk' )
app.add()
$mol_assert_equal( app.item_title( 0 ), 'Milk' )
```

Nessun selettore, nessun browser, niente Playwright né Cypress, nessuna attesa. Lo stesso file ti dà anche:

- **Velocità.** I test girano in Node in millisecondi; un migliaio richiede circa un minuto. `node my/hello/-/node.test.js` esegue quelli di un modulo.
- **Zero configurazione.** Un `hello.test.ts` accanto al componente viene raccolto dal builder e compilato in `-/node.test.js`. L'integrazione continua con `mam_build` lo esegue e fa fallire la build quando un test fallisce.
- **Sostituzione dei servizi tramite il contesto.** Ogni test riceve il proprio `$`, e tutto ciò che un componente raggiunge attraverso `this.$.X` si scambia assegnando un sostituto a quel `$`. È questa la ragione per scrivere `this.$.$mol_fetch` invece di `$mol_fetch`: il primo è sostituibile, il secondo no.
- **Tempo simulato.** I timer creati attraverso il contesto non scorrono da soli; `$mol_after_mock_warp()` esegue ciò che è in coda.
- **Un DOM vero quando serve.** Il bundle Node porta con sé jsdom, così `dom_node()` e `querySelectorAll` funzionano nello stesso file di test.

## Uno scenario attraverso i metodi della vista

Prendi la lista di cose da fare dal [Ricettario](#!section=docs/page=cookbook): una stringa `draft?`, una lista `items`, un'azione `add` e un'azione `delete`. Il suo test vive in `my/todo/todo.test.ts`:

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

Qualche cosa da notare:

- Il file di test usa `namespace $`, non `$.$$`. Il contesto `$` arriva come argomento, nuovo per ogni test, e il componente si crea con `Klass.make({ $ })` così legge i servizi da quel contesto.
- Un clic è una chiamata al gestore. `app.add()` è ciò che fa il pulsante; `app.Add().click( event )` passa per la stessa strada quando vuoi includere anche il binding.
- Verifica ciò che vede l'utente: `items()`, `item_rows()`, `sub()`, il `title()` di una sotto-vista. Un modello controllato attraverso lo schermo intercetta anche una sovrascrittura caduta fuori dalla classe, cosa che un test del solo modello non farebbe.
- `$mol_assert_equal` confronta per identità, `$mol_assert_like` confronta la struttura, `$mol_assert_fail( ()=> ..., 'message' )` si aspetta un lancio.
- Il nome del test è la descrizione. Nel corpo non ci sono commenti.

## Sostituire un servizio con un mock

Ogni test riceve un contesto nuovo derivato da quello globale. Assegna una sottoclasse a un servizio su quel `$` prima di creare il componente, e ogni `this.$.X` dentro il componente si risolve nel sostituto. Ecco il finto fetch per il componente `$my_users` di [Recupero dati](#!section=docs/page=data):

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

`users()` nel componente chiama `this.$.$mol_fetch.json( ... )`, quindi la richiesta arriva al mock e il valore è disponibile in modo sincrono, senza alcuna attesa. Se il componente avesse chiamato `$mol_fetch.json( ... )` sul globale, il mock non sarebbe stato consultato. I mock integrati sostituiscono già nel contesto le `fetch` e `XMLHttpRequest` globali con proxy che lanciano, così una richiesta che sfugge al contesto fallisce rumorosamente invece di toccare la rete.

Lo stesso schema copre `$mol_state_arg` per l'URL, `$mol_state_local` per lo storage, e qualsiasi altra cosa il tuo componente prenda da `this.$`.

C'è anche `$mol_test_mocks`, un elenco di funzioni eseguite sul contesto prima di ogni test del bundle, compresi i test di altri moduli. È il posto per le regole che valgono ovunque, il modo in cui il framework registra i propri mock: uno storage finto che conserva ciò che gli viene dato, un locale che restituisce un dizionario vuoto, il divieto di rete qui sopra. I dati di prova di un singolo componente non hanno posto lì.

## Il tempo

I test del framework stesso registrano mock per `$mol_after_timeout`, `$mol_after_frame` e i loro parenti, e quei mock sono anche nel tuo bundle. Un timer creato con `new this.$.$mol_after_timeout( ms, task )` viene messo in coda invece che pianificato, e `$mol_after_mock_warp()` esegue la coda. Dato un toast che si nasconde da solo:

```typescript
@ $mol_mem toast( next?: string ) { return next ?? '' }

@ $mol_action notify( text: string ) {
	this.toast( text )
	new this.$.$mol_after_timeout( 3000, ()=> this.toast( '' ) )
}
```

il test muove il tempo a mano:

```typescript
'toast hides after the timer'( $ ) {
	const app = $my_greeter.make({ $ })
	app.notify( 'Saved' )
	$mol_assert_equal( app.toast(), 'Saved' )
	$mol_after_mock_warp()
	$mol_assert_equal( app.toast(), '' )
},
```

Un `setTimeout` nudo dentro una vista non viene sostituito da un mock e sopravvive al test; è una delle ragioni per creare i timer attraverso il contesto.

## Attraverso il DOM

Nel bundle Node `$mol_dom_context` è una finestra jsdom, così una vista si renderizza in elementi veri. Usalo quando il controllo riguarda il markup invece dello stato:

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

`dom_node()` crea l'elemento, `dom_tree()` renderizza il sottoalbero, e `destructor()` rilascia la vista perché le sue celle non sopravvivano al test. L'attributo che una sotto-vista riceve dal proprio nome, qui `[my_greeter_hello]`, è il selettore per quando preferisci `querySelector` alla chiamata della sotto-vista.

A jsdom mancano due globali a cui i campi di input e i gesti attingono, `ShadowRoot` e `PointerEvent`. Un `$mol_string` renderizzato senza di essi registra un `ReferenceError` e resta vuoto mentre il resto dell'albero si renderizza. Prendili in prestito dalla finestra jsdom; è una regola senza dati, valida per ogni test, quindi va in `$mol_test_mocks`:

```typescript
$mol_test_mocks.push( $ => {
	const win = $.$mol_dom_context
	Object.assign( globalThis, {
		ShadowRoot: win.ShadowRoot,
		PointerEvent: win.PointerEvent ?? win.MouseEvent,
	} )
} )
```

## Cosa non copre un test in Node

La geometria e lo stile. Se due blocchi sono allineati, se un pannello esce dallo schermo, se il tema scuro si legge bene: niente di tutto questo esiste in jsdom. Per il layout che hai toccato, apri nel browser il `-/test.html` del modulo, che monta l'app e vi esegue gli stessi test, e guarda.

## Note pratiche

- **Il silenzio è un fallimento.** Un test che ha fallito un'asserzione e un test che si è bloccato hanno lo stesso aspetto: nessun output e un processo che resta vivo. Cerca `All tests passed` alla fine; se manca, controlla prima l'ultima asserzione. Un test `async` ha un limite di un secondo.
- **Rompine uno apposta.** Quando un'esecuzione non stampa nulla, ribalta un'asserzione e verifica che il fallimento compaia. Una suite di test che non può fallire non sta misurando niente.
- **Non verificare le stringhe localizzate.** I valori marcati `@` nell'albero si risolvono attraverso il locale, che si riscalda di nuovo in ogni contesto nuovo. Verifica la struttura, non il testo di un'etichetta.

## Avanti

[Risoluzione dei problemi](#!section=docs/page=troubleshooting) elenca gli errori che tengono i test verdi e gli schermi vuoti, e [Recupero dati](#!section=docs/page=data) mostra il componente per cui è stato scritto il mock qui sopra.
