# Modello mentale

Se arrivi da React o Vue, i primi giorni in $mol li passi a cercare cose che non ci sono: `computed`, `watch`, `useEffect`, `onMounted`, una `fetch` dentro un hook del ciclo di vita. Non sono nascoste da qualche parte nell'API; il modello non ha un posto dove metterle. Questa pagina è la versione in cinque minuti di quel modello. Leggila prima di [Viste](#!section=docs/page=views), e tornaci quando un nome familiare non si trova più.

## Pull, non push

Nulla viene calcolato finché qualcuno non lo legge. Una vista si renderizza leggendo le sue proprietà; ogni proprietà legge ciò che le serve; la catena delle dipendenze si compone da sola a partire da quelle letture. Non c'è alcuna sottoscrizione da dichiarare né alcun `watch` da registrare: la lettura è la sottoscrizione.

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

Renderizzare `Name` legge `name()`, `name()` legge `user()`, `user()` va in rete. Nessuno ha parlato alla vista della richiesta e nessuno ha parlato della vista alla richiesta. Quando `user()` cambia, si ricalcola tutto ciò che l'ha letto, e nient'altro.

## Nessun ciclo di vita

Non c'è `mounted`, non c'è `useEffect`, non c'è `created`. I dati si richiedono leggendo una proprietà, e una vista legge le sue proprietà quando si renderizza. Così l'esempio qui sopra carica l'utente nel momento in cui `$my_profile` compare sullo schermo, e non prima. Quando la vista esce dallo schermo, nessuno legge più `user()`, e la cella viene rilasciata insieme alla vista.

Questo è tutto ciò che sostituisce il pattern «fetch al mount»: la vista chiede ciò che le serve e il framework decide quando chiederlo. Il caricamento non è agganciato a un evento della pagina; è agganciato all'essere visibile.

## Una proprietà è una cella

Un solo metodo con un argomento opzionale è al contempo getter, setter, valore calcolato e stato:

```typescript
@ $mol_mem
count( next?: number ) {
	return next ?? 0
}
```

Chiamato senza argomenti legge, chiamato con un argomento scrive. `@ $mol_mem` trasforma il metodo in una cella memorizzata nella cache che si ricalcola quando qualcosa che ha letto è cambiato. Un valore calcolato è solo un metodo `@ $mol_mem` che legge altri metodi. Un watcher non serve: un effetto collaterale appartiene a un evento, e un gestore di evento è un metodo marcato `@ $mol_action`.

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

[Stato e reattività](#!section=docs/page=state) tratta le regole su cosa può accadere dentro l'uno e dentro l'altro.

## Codice sincrono che aspetta

`user()` qui sopra sembra sincrono ed è scritto come se la risposta fosse già lì. Funziona perché ogni calcolo gira dentro una fibra. `this.$.$mol_fetch.json()` sospende quella fibra, e il framework riavvia il calcolo appena la risposta è arrivata. Fino ad allora la vista che ha letto `user()` mostra uno stato di caricamento; se la richiesta fallisce, la stessa vista mostra l'errore. Non scrivi né un flag `isLoading` né un `try`/`catch`.

Lo stesso meccanismo serve qualsiasi sorgente asincrona. [Recupero dati](#!section=docs/page=data) ripercorre il ricaricamento e la gestione degli errori.

## Tutto è una sovrascrittura

Un file `view.tree` è un elenco di dichiarazioni di metodi. Ogni riga sotto un componente è una proprietà di quel componente con un valore predefinito, e la proprietà di qualsiasi componente annidato può essere ridefinita proprio dove viene usata, con una riga. Il placeholder di un campo di testo è la proprietà `hint` di `$mol_string`:

```tree
$my_search $mol_view
	sub /
		<= Query $mol_string
			hint \Search
			value? <=> query? \
```

Non c'è alcuna lista di prop da estendere, nessun wrapper da scrivere e nessun fork da mantenere. Se un componente ha una proprietà, puoi impostarla dall'esterno.

## Come leggere i sorgenti

La sezione precedente solleva la vera domanda: come fai a sapere che la proprietà si chiama `hint`? La risposta è che guardi, e il framework è costruito perché guardare costi poco.

**I sorgenti del framework stanno accanto ai tuoi.** Nel workspace MAM, `mol/string/string.view.tree` è a una cartella di distanza da `my/hello/`. Non è dentro `node_modules` e non è dentro un bundle; è lo stesso tipo di file che scrivi tu.

**Il nome della classe è il percorso.** `$mol_string` vive in `mol/string/`, `$mol_button_major` in `mol/button/major/`. Ogni underscore è un separatore di cartella, così un nome nel tuo albero si può sempre trasformare in una cartella da aprire. Il supporto per gli editor della pagina [Strumenti](#!section=docs/page=tooling) completa quei nomi al posto tuo.

**Il `.view.tree` di un componente è l'elenco completo delle sue proprietà, con i valori predefiniti.** La forma del valore ti dice il tipo: `\` inizia una stringa, `/` una lista, `*` un dizionario, un numero nudo è un numero, `true` e `false` sono booleani, `null` significa assente, e `<=` introduce una sotto-vista o una proprietà presa dal proprietario. Ecco la parte di `mol/string/string.view.tree` che conta per un campo di input:

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

Leggilo ad alta voce. `dom_name \input`: questo componente renderizza un elemento `input`. `enabled true`: una proprietà booleana, attiva per impostazione predefinita. `field *` è il dizionario dei campi dell'elemento DOM; i nomi a sinistra appartengono al DOM, i nomi a destra appartengono al componente, e quello più a destra è quello che imposti tu. Così il `placeholder` del DOM viene da `hint`, una stringa vuota per impostazione predefinita; il `value` del DOM è la proprietà scrivibile `value?`, e l'attributo `type` è la scrivibile `type?`, `text` per impostazione predefinita. Un placeholder, un input disabilitato e un campo password sono `hint`, `enabled false` e `type \password` nel tuo albero.

**L'interfaccia tipizzata è generata dallo stesso albero.** `mol/string/-view.tree/string.view.tree.d.ts` elenca le stesse proprietà come firme TypeScript, e il [riferimento API](#!section=docs/page=api-mol-string) su questo sito è prodotto da quel file. Tutti e tre concordano perché tutti e tre vengono da un'unica sorgente.

**La maggior parte dei componenti porta con sé una cartella `demo/` e un `readme.md`.** `mol/string/demo/demo.view.tree` mostra l'input con un hint, disabilitato e con un valore preimpostato. Quando ti serve un componente in un certo stato, trova la demo più vicina e copiane la riga.

Messo tutto insieme, un placeholder richiede circa un minuto:

```bash
ls mol | grep string
cat mol/string/string.view.tree
```

Vedi `hint \` sotto `$mol_string`, e scrivi `hint \Search` sotto il tuo `$mol_string`.

## Nomi

Tutto è `snake_case`: i nomi delle proprietà in `view.tree`, i nomi dei metodi in TypeScript, gli attributi che il framework mette sui nodi DOM per lo stile. Le sotto-viste iniziano con la lettera maiuscola (`Query`), i valori con la minuscola (`query`).

Il nome nell'albero e il nome del metodo nella classe devono coincidere lettera per lettera. `exchange_form` nell'albero e `exchangeForm` nella classe sono due proprietà senza alcun rapporto: quella della classe non viene mai letta, quella dell'albero mantiene il suo valore predefinito, e non c'è alcun errore a dirtelo. Quando una sovrascrittura sembra non fare nulla, è la prima cosa da controllare. [Risoluzione dei problemi](#!section=docs/page=troubleshooting) elenca questo e gli altri casi in cui lo schermo è sbagliato e il compilatore tace.

## Avanti

Con il modello a posto, [Viste](#!section=docs/page=views) mostra come i componenti si dichiarano e si compongono, e [Da React, Vue e Svelte](#!section=docs/page=rosetta) mappa i nomi che già conosci su quelli di qui.
