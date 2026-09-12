# Risoluzione dei problemi

Ogni voce di questa pagina ha la stessa forma: la build è verde, l'audit è pulito, la console tace, e lo schermo è vuoto o non è quello che intendevi. Il compilatore non vede questi errori perché ognuno di essi è un programma valido che però descrive un altro componente. Trova il titolo che assomiglia a ciò che vedi; sotto ci sono la causa e la soluzione.

## La mia sovrascrittura di una proprietà non fa nulla, nessun errore

Il nome in `view.tree` e il nome del metodo nella classe non coincidono, il più delle volte per via delle maiuscole: `exchange_form` nell'albero, `exchangeForm` nella classe. Sono due proprietà. Quella della classe non viene mai chiamata, quella dell'albero mantiene il suo valore predefinito, e niente lo segnala.

I nomi sono `snake_case` ovunque e devono coincidere lettera per lettera. Dopo aver modificato un `.view.ts`, controlla che ogni sovrascrittura nomini ancora una proprietà esistente; il file generato `-view.tree/*.view.tree.d.ts` accanto all'albero è l'elenco con cui confrontarsi.

## Mi serve un placeholder, disabled o type su un input

Sono proprietà di `$mol_string`: `hint` per il placeholder, `enabled` per lo stato disabilitato, `type` per il tipo di input. Impostale dove l'input viene usato:

```tree
<= Password $mol_string
	hint \Password
	type \password
	enabled <= can_edit true
	value? <=> password? \
```

Qualsiasi altra proprietà di qualsiasi altro componente si trova allo stesso modo: apri il suo `.view.tree`, come mostra [Come leggere i sorgenti](#!section=docs/page=mental-model/Docs.Body=Come%20leggere%20i%20sorgenti).

`attr *` serve per gli attributi DOM veri che il componente non modella già, e ha una trappola tutta sua: un blocco che non ha `^` come prima riga sostituisce l'intero dizionario di attributi della base, così un `$mol_button` scritto in quel modo perde `disabled`, `role` e `tabindex`. Inizia il blocco con `^` per ereditare, poi aggiungi le tue chiavi:

```tree
attr *
	^
	data_kind \primary
```

## Una parola viene renderizzata lettera per lettera

Una stringa è stata passata dove ci si aspetta una lista, e la stringa è stata distribuita carattere per carattere. Le stringhe iniziano con `\`, le liste con `/`. Il caso tipico è `sub`, che è una lista:

```tree
sub / <= label \Hello
```

## Lo schermo è vuoto, i test sono verdi

Una sovrascrittura è caduta fuori dal `.view.ts`. L'albero dà a ogni proprietà un valore predefinito, così quando la classe smette di ridefinire `rows()`, TypeScript è soddisfatto e la lista si renderizza vuota. I test che controllano solo il modello restano verdi perché il modello sta bene.

Per ogni sovrascrittura da cui dipende lo schermo, scrivi un test che legga ciò che vede l'utente: `rows()`, `sub()`, `title()` delle sotto-viste, oppure il DOM. [Testing](#!section=docs/page=testing) mostra entrambe le strade.

## I dati non si caricano mai, un componente resta bloccato nello stato di caricamento

Un metodo `@ $mol_mem` ha restituito una promise come proprio valore: `fetch( uri ).then( ... )`, un metodo `async`, o il risultato di `$mol_wire_async( this ).load()`. Una promise dentro la cella per tutti significa «sto ancora calcolando», e quando si risolve la cella si ricalcola e produce una promise nuova. La rete funziona; la vista non vede mai un risultato.

La forma giusta è sincrona: chiama `this.$.$mol_fetch.json( uri )` dentro la cella e restituisci il valore già parsato. La fibra si sospende finché la risposta non è arrivata e poi riesegue la cella, così la promise non compare mai nel tuo codice. Dove il lavoro asincrono deve per forza avvenire altrove, metti il suo risultato in una cella di stato separata e fai in modo che l'effetto restituisca un flag o una chiave, mai la promise.

Una seconda causa è un errore inghiottito: un `try`/`catch` dentro una cella che cattura la sospensione insieme ai guasti veri. Rilancia tutto ciò che è una `Promise`, oppure usa `$mol_fail_catch`, che fa quel controllo al posto tuo.

## Iscrizione circolare

Un metodo `@ $mol_mem` ha scritto in un'altra cella, oppure ha eseguito un effetto collaterale che ha finito per invalidare qualcosa che aveva letto. I calcoli si limitano a leggere e restituire; scritture, rete, timer e DOM appartengono ai gestori `@ $mol_action`. L'altra origine dello stesso messaggio è un binding `<=>` verso un figlio combinato con un metodo nella classe che delega a quello stesso figlio, descritto qui sotto.

## Maximum call stack

Due forme lo producono. La prima: l'albero ha `tab? <=> tab?` su un figlio e la classe ha `tab() { return this.Head().tab() }`: il figlio chiede al proprietario, il proprietario chiede al figlio. Togli il `<=>` verso il figlio a cui deleghi.

La seconda: una sotto-vista è stata ritipizzata alla tua classe e la classe chiama `super` su una proprietà elencata nell'albero. Quel `super` non è l'implementazione della base ma lo stub che l'albero ha generato per il binding elencato, e lo stub delega di nuovo al proprietario. Delega invece esplicitamente all'implementazione originale, vedi più sotto la voce sulla ritipizzazione.

## Un valore scritto con l'iniziale maiuscola non si lascia sovrascrivere da TypeScript

`<= Label* \` genera un metodo di nome `Label`, e `label()` nella classe è un altro metodo. Le sotto-viste hanno l'iniziale maiuscola, i valori la minuscola, e nell'albero è proprio quella lettera a decidere il nome del metodo generato.

## Ogni riga di una lista annidata mostra lo stesso elemento

Una sotto-vista con chiave dentro un'altra sotto-vista con chiave non riceve la propria chiave. `Cell*0` dentro `Row*0` si renderizza con la chiave `0` in ogni riga. Sposta la riga in un componente a sé e passale i dati attraverso le proprietà, e dai la chiave alla vista esterna come `Row*`, non `Row*0`.

## Ho cambiato la classe di una sotto-vista e il suo contenuto è sparito

Ritipizzare `Pre* $mol_text_code` in `Pre* $my_code` fa cadere i binding che l'albero della base aveva dichiarato per essa, quindi vanno elencati di nuovo. Elencare `text <= pre_text* \` crea uno stub vuoto che oscura il vero `pre_text` di `$mol_text`. Delega dentro la classe invece di affidarti a `super`, che è proprio quello stub:

```typescript
pre_text( index: number ) {
	return $mol_text.prototype.pre_text.call( this, index )
}
```

## I metodi dal view.ts di un componente base mancano nella sottoclasse

`$my_child $my_base` in un albero estende la classe generata da `base.view.tree`, non la classe che hai scritto in `base.view.ts`. I metodi definiti lì non arrivano al figlio, e TypeScript li segnala come mancanti. La logica condivisa da più viste vive in un semplice file `.ts` dentro `namespace $`, senza albero, come è scritto `$mol_view` stesso.

## Un componente base dichiarato nello stesso file view.tree perde il suo comportamento

Quando un file albero dichiara sia una base sia una classe che la estende, il corpo del `.view.ts` della base viene saltato per il figlio. Dai una cartella tutta sua a una base che ha un `.view.ts`.

## Gli stili si mescolano tra una sotto-vista e il componente che sta dentro

`Nav $my_app_nav` dentro `$my_app` mette lo stesso attributo `my_app_nav` sia sulla sotto-vista sia sul componente, e un solo selettore li colpisce entrambi. Dai alla sotto-vista un nome che non ripeta la coda della classe, per esempio `Nav_row`.

## Un selettore su un attributo false non corrisponde mai

Un attributo booleano impostato a `false` viene rimosso dall'elemento, quindi `[expanded="false"]` non corrisponde a nulla. Il rendering condizionale non è un lavoro per il CSS; sovrascrivi la factory della sotto-vista e restituisci `null` per la variante che quella vista non ce l'ha.

## Un numero in uno stile non cambia nulla

A ogni numero in `style *` viene appeso `px`: `flexGrow 1` diventa `flex-grow: 1px`, che il browser scarta. Scrivi i valori senza unità come stringhe, `flexGrow \1`.

## Due figli di una vista scroll finiscono uno sopra l'altro

`$mol_scroll` tiene esattamente un figlio. Avvolgi i figli in un `$mol_view` o in un `$mol_list` e dai quello allo scroll.

## minimal_height non ha alcun effetto visibile

`minimal_height` è un numero che il `$mol_list` virtualizzato usa per stimare le righe prima che si renderizzino; non imposta un'altezza. L'altezza si imposta nel `.view.css.ts`.

## Un componente incorporato allarga la pagina di lato

Una vista montata dentro un layout estraneo, per impostazione predefinita, non si restringe sotto il proprio contenuto. Dai alla radice `minWidth: 0` nei suoi stili, così può essere compressa come gli elementi attorno.

## Un CSS di terze parti non stila il mio componente

Un componente senza `dom_name` si renderizza come un elemento che porta il nome della sua classe, e per un framework CSS quello è un elemento inline sconosciuto. Imposta il tag esplicitamente: `$mol_button` non ne ha uno, quindi un pulsante che vuoi stilato da un CSS esterno ha bisogno di `dom_name \button`.

## Cliccare un link alla pagina corrente svuota l'URL

Un `$mol_link` con `arg *` fa da interruttore: su una pagina il cui URL già corrisponde, un clic rimuove quelle chiavi. Per un link che si limita a navigare, estendilo con `uri_off <= uri`. Per ricaricare la stessa rotta al clic, chiama `$mol_state_arg.value()` da un gestore e fai `preventDefault` sull'evento.

## Il mio gestore dell'input scatta a ogni render

Una `prop?` che hai aggiunto a una sottoclasse di `$mol_string` ha il nome di una proprietà che la base già usa: `enter`, `submit`, `hint`, `value`, `keyboard`. Confronta i tuoi nomi nuovi con l'albero della base prima di aggiungerli.

## L'errore lanciato dal mio setter di value non compare mai

`$mol_string` cattura un'eccezione da `value?` e la passa al `setCustomValidity` dell'input, così compare solo come validazione nativa del form. Comunica l'errore attraverso un canale tuo, una riga di stato o una sotto-vista di messaggio.

## Un binding di gestore con chiave risulta mancante

`event_click? <=> pick*? null` su una sotto-vista con chiave non genera uno stub per `pick`. Dichiaralo tu stesso alla radice dell'albero, `pick*? null`, e implementalo nella classe.

## Il bundle contiene un modulo che non uso mai

Il builder trova le dipendenze scansionando il testo sorgente alla ricerca di token `$mol_name`, e un token dentro un letterale di stringa o dentro un commento di documentazione `/** */` conta quanto uno nel codice. Un nome citato come esempio in un commento di documentazione si trascina dietro tutto il suo modulo, e il guasto salta fuori in un file che non hai mai toccato. Scrivi esempi e note senza il prefisso `$`, oppure nomina la cartella al suo posto.

## Avanti

Quasi tutti questi casi si riducono a una regola sola: il nome nell'albero è il contratto, e il compilatore controlla i tipi ma non i nomi. [Modello mentale](#!section=docs/page=mental-model) spiega perché l'albero è un elenco di sovrascritture, e [Testing](#!section=docs/page=testing) mostra il test che intercetta quelle silenziose.
