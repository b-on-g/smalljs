# Da TypeScript a view.tree

Il componente che hai scritto in [Per iniziare](#!section=docs/page=getting-started) è una normale classe TypeScript. Compila, funziona, ed è un modo supportato di descrivere un componente $mol — uno dei diversi che il framework accetta.

Ti ha però anche chiesto di tenere a mente quattro cose che non hanno nulla a che vedere con quello che il componente fa. Questa pagina le affronta una alla volta e mostra la riga di `view.tree` che elimina ciascuna. Poi mostra il codice generato dal compilatore, così puoi verificare che l'albero non sia un secondo runtime: produce la classe che hai già scritto.

Ecco di nuovo quel file, per il confronto:

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

## Il figlio lo costruisci tu, e lo metti in cache tu

Sei di quelle righe sono una fabbrica:

```typescript
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}
```

Togli `@ $mol_mem` e continua a compilare. Smette però di essere un componente solo: `this.Name() !== this.Name()`, perché il corpo esegue `new` a ogni chiamata. Vince chi legge la proprietà per ultimo, le istanze precedenti si tengono tutto quello che avevano accumulato e nessuno le smaltisce: $mol possiede soltanto gli oggetti che ha messo in cache per te.

In `view.tree` lo stesso figlio è una riga:

```tree
		<= Name $mol_string
```

Un nome con l'iniziale maiuscola vuol dire che la proprietà contiene un componente; `<=` la dichiara. Non esiste una scrittura più breve che dimentichi il decoratore, perché la fabbrica non la scrivi tu.

## La direzione dei dati sta nell'operatore

Alimentare un figlio significa assegnare, una proprietà alla volta:

```typescript
			obj.sub = () => [ this.greeting() ]
```

Tre parti mobili: l'oggetto figlio, il nome della proprietà e una freccia perché la lettura avvenga dopo, non adesso. La riga dice cosa è collegato, non in che direzione; per scoprirlo devi leggere il corpo della freccia e controllare se qualcosa torna indietro.

L'albero mette la direzione nell'operatore:

```tree
		<= Message $mol_view
			sub / <= greeting \
```

`<=` è unidirezionale, da `greeting` al `sub` del figlio. `/` è una lista, `\` inizia una stringa grezza e `greeting \` dichiara una proprietà con la stringa vuota come valore predefinito: quello che poi ridefinirai in TypeScript.

## Il binding bidirezionale è a un tasto dal sola-lettura silenzioso

Al campo servono dati in entrambe le direzioni, ed è quello che fa il parametro `next`:

```typescript
			obj.value = ( next?: string ) => this.name( next )
```

Ora togli `next`:

```typescript
			obj.value = () => this.name()
```

TypeScript lo accetta. Una funzione senza argomenti è assegnabile dove se ne attende uno opzionale, quindi i tipi tornano e l'audit resta verde. Il campo si disegna, mostra il valore giusto e ignora in silenzio tutto quello che digiti.

Nell'albero quella mezza connessione non si può scrivere:

```tree
		<= Name $mol_string
			value? <=> name? \
```

`<=>` collega in entrambe le direzioni. Il `?` nudo segna una proprietà che accetta un argomento, cioè una proprietà su cui si può scrivere. Qui sta a entrambi i capi, perciò il valore scende nel campo e risale.

## Una stringa localizzabile resta una stringa finché non ne fai una chiave

```typescript
		title() {
			return 'Greeting'
		}
```

Per tradurla ti inventi una chiave, sostituisci il letterale con una chiamata a `$mol_locale.text`, scrivi il json e per il resto della vita del progetto tieni le due cose allineate a mano.

```tree
	title @ \Greeting
```

`@` segna la stringa come localizzabile, il resto lo fa la build. Dopo una build, `my/hello/-/web.locale=en.json` contiene:

```json
{
	"$my_hello_Name_hint": "Enter your name",
	"$my_hello_title": "Greeting"
}
```

I traduttori ricevono un file json con tutte le stringhe dell'app. Tu non scrivi nemmeno una chiave.

## Il componente intero

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

Questo è `hello.view.tree`. In `hello.view.ts` resta la parte che struttura non è mai stata:

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

La classe ora estende `$.$my_hello`, la base generata dall'albero, e ridefinisce una proprietà. `$.$$` è lo spazio dei nomi di queste ridefinizioni.

## Cosa emette il compilatore

`view.tree` è un generatore di codice senza runtime proprio. Costruisci il modulo e leggi `my/hello/-view.tree/hello.view.tree.js`:

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

Le stesse fabbriche, le stesse frecce, le stesse tre chiamate a `$mol_mem`, più le due chiavi di locale che non hai dovuto inventare. Quando il bundle arriva al browser, dell'albero non resta nulla.

È anche il motivo per cui i due formati convivono senza attriti. Un componente scritto ad albero e uno scritto a classe producono lo stesso tipo di oggetto: una sola app può contenerli entrambi senza che nessuno noti la differenza.

## Cosa una classe scritta a mano non può consegnare a uno strumento

Accanto al JS generato il compilatore scrive `hello.view.tree.d.ts`:

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

Le coppie `$mol_type_enforce` verificano ogni binding rispetto alla proprietà che alimenta, così un tipo sbagliato viene segnalato sul binding stesso invece che da qualche parte dentro il figlio. Il corpo della classe sotto è una descrizione leggibile da una macchina della superficie del componente, e c'è chi la legge: il file di locale qui sopra nasce dalla stessa analisi, e le [pagine di API](#!section=docs/page=api-mol-string) di questo sito sono generate dal `.view.tree.d.ts` di ogni componente di base.

Una classe scritta a mano non offre niente di tutto questo. È codice, e l'unica cosa capace di leggerlo è TypeScript.

## Quanto pesa

L'Hello World qui sopra: 31 righe di TypeScript diventano 8 righe di albero più 8 righe di TypeScript.

Con il componente il divario cresce. `$mol_app_users` — un campo di ricerca, una lista, quattro bottoni e una riga di stato — sta in 30 righe e 840 caratteri come albero, e in 125 righe e 3046 caratteri come classe. Entrambe le versioni sono riportate per intero nella pagina wiki di [confronto tra formati](https://github.com/hyoo-ru/mam_mol/wiki/View-Formats), così puoi valutare lo scambio da solo.

## Quale scrivere

Entrambi, scegliendo componente per componente.

`view.ts` è un formato supportato. È ciò in cui l'albero compila, e un componente scritto così si comporta come qualunque altro. Quando un componente è soprattutto logica con uno o due figli, la classe è la scelta onesta e l'albero aggiunge poco.

L'albero si ripaga dove la cerimonia si ripete: schermi fatti soprattutto di struttura, lunghe file di binding, tutto ciò che contiene testo che un traduttore vorrà vedere. Descrive la maggior parte di un'interfaccia, ed è per questo che i componenti di $mol stessi sono scritti così.

Adesso il linguaggio dell'albero vero e proprio — liste, dizionari, viste con chiave e specializzazione di un componente per estensione: **[Viste](#!section=docs/page=views)**.
