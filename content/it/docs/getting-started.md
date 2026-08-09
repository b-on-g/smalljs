# Per iniziare

Questa pagina ti porta da una cartella vuota a un'app $mol reattiva e funzionante. Dovrebbe richiedere circa quindici minuti. Ogni frammento qui sotto è codice reale e funzionante — copialo così com'è.

Il componente lo scriverai in TypeScript normale. $mol ha anche un formato più breve per descrivere i componenti, `view.tree`, che incontrerai nella pagina successiva. Qui non serve: un componente $mol resta una classe ordinaria in entrambi i casi.

## Cosa ti serve

- **Node.js 18+** e **git**. La lista è tutta qui.

Non installi una CLI globale né generi codice boilerplate che dovrai capire in seguito. Le app $mol vivono all'interno del workspace MAM, che sa già come costruirle e servirle.

## 1. Ottenere il workspace

MAM è lo strumento di build e il registro dei moduli di $mol. Clonalo e installalo una volta.

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` avvia il server di sviluppo su `http://localhost:9080/`. Osserva i tuoi file e ricostruisce automaticamente — lascialo in esecuzione nel suo terminale.

## 2. Creare un modulo

Un'app $mol è solo una cartella. Scegli uno spazio dei nomi (il tuo, ad es. `my`) e un nome (`hello`).

```bash
mkdir -p my/hello
```

> **Una regola da ricordare:** i trattini bassi in un nome di componente sono separatori di cartelle. `$my_hello` sta in `my/hello/`, `$my_hello_form` starebbe in `my/hello/form/`. I nomi delle cartelle dei moduli non contengono mai un trattino basso.

Ora aggiungi due file dentro `my/hello/`.

### index.html — il punto di ingresso

```html
<!doctype html>
<html mol_view_root>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>
	<body mol_view_root>
		<div mol_view_root="$my_hello"></div>
		<script src="web.js"></script>
	</body>
</html>
```

L'attributo `mol_view_root="$my_hello"` monta il tuo componente al caricamento della pagina.

### hello.view.ts — il componente

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

Leggilo dall'alto in basso:

- `$my_hello` vive in `namespace $`, lo spazio dei nomi ambiente che contiene ogni componente $mol. Estende `$mol_page`, un guscio di pagina integrato con titolo e corpo. `$mol_string` più sotto è il campo di testo integrato.
- `body()` restituisce i figli. Qui un figlio non è markup ma una proprietà: `Name` e `Message` sono metodi che puoi chiamare, ridefinire in una sottoclasse o raggiungere per nome da un foglio di stile.
- `Name()` costruisce il campo e lo collega. Ogni sua proprietà riceve una **freccia**, non un valore. Il figlio chiama quella freccia quando gli servono i dati, quindi legge sempre quelli correnti.
- `name( next?: string )` è lo stato. Chiamato senza argomenti legge, con un argomento scrive. È proprio il passaggio di questa intera funzione a `obj.value` a far sì che digitare nel campo aggiorni `name`.
- `@ $mol_mem` mette in cache una proprietà per istanza. Su `name` significa che il valore viene conservato e che tutto ciò che l'ha letto si ricalcola quando cambia. Su `Name` e `Message` significa un solo componente figlio, costruito una volta, invece di uno nuovo a ogni chiamata.
- `greeting()` legge `name()`. Quella lettura *è* la sottoscrizione. Quando `name` cambia, `greeting` si ricalcola e il testo a schermo segue, senza effetti da dichiarare, senza liste di dipendenze e senza chiamate di re-render.

## 3. Eseguirla

Il server di sviluppo del passo 1 sta già osservando. Basta aprire:

```
http://localhost:9080/my/hello/
```

Digita il tuo nome e il saluto si aggiorna mentre scrivi. Questa è la reattività di $mol: lo stato scorre verso la vista da solo.

## 4. Aggiungere un secondo valore reattivo

La reattività si compone. Aggiungi un contatore di lunghezza che legge lo stesso `name`, senza cablaggio aggiuntivo.

Mettilo in `body()`:

```typescript
		body() {
			return [ this.Name(), this.Message(), this.Counter() ]
		}
```

e aggiungi le due proprietà che stanno dietro:

```typescript
		@ $mol_mem
		Counter() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.counter() ]
			return obj
		}

		counter() {
			return `${ this.name().length } characters`
		}
```

Sia `greeting` sia `counter` leggono `name`, e si aggiornano insieme. Aggiungine un terzo, aggiungine un decimo: la metà reattiva non cambia mai forma.

L'altra metà sì. Tre righe di logica sono arrivate con sei righe di impalcatura attorno — una fabbrica, un `new`, una freccia, un `return obj`. Moltiplicalo per ogni figlio di uno schermo vero e hai il motivo per cui esiste `view.tree`.

## 5. Controllare la build

MAM scrive un file di diagnostica accanto a ogni app. Dopo una build, apri:

```
http://localhost:9080/my/hello/-/web.audit.js
```

Un audit pulito significa nessuna dipendenza inutilizzata, nessun problema di tipo, niente da correggere. Prendi l'abitudine di darci un'occhiata — cattura gli errori prima che raggiungano un browser.

## Hai costruito un'app $mol

Un componente reattivo con binding bidirezionale e stato derivato, in un file solo, con zero configurazione.

Ora prendi quello stesso file e guardalo restringersi: **[Da TypeScript a view.tree](#!section=docs/page=from-ts-to-view-tree)**.
