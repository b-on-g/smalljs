# Per iniziare

Questa pagina ti porta da una cartella vuota a un'app $mol reattiva e funzionante. Dovrebbe richiedere circa quindici minuti. Ogni frammento qui sotto è codice reale e funzionante — copialo così com'è.

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

Ora aggiungi tre file dentro `my/hello/`.

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

### hello.view.tree — il layout

```tree
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

Alcune cose che vale la pena nominare.

- `$mol_page` e `$mol_string` sono componenti integrati — un guscio di pagina e un campo di input di testo.
- `<=` lega una proprietà in un solo senso; `<=>` la lega in entrambi i sensi. Così `value? <=> name?` mantiene sincronizzati l'input e il tuo stato `name`.
- `@` contrassegna una stringa localizzabile; `\` inizia una stringa grezza.

### hello.view.ts — il comportamento

```typescript
namespace $.$$ {
	export class $my_hello extends $.$my_hello {
		@ $mol_mem
		greeting() {
			const name = this.name()
			return name ? `Hello, ${name}!` : 'Please enter your name'
		}
	}
}
```

`@ $mol_mem` rende `greeting` una proprietà reattiva e memorizzata nella cache. Legge `name()`, quindi nel momento in cui `name` cambia, `greeting` viene ricalcolato e il messaggio sullo schermo si aggiorna. Non hai mai scritto una sottoscrizione, un effetto o una chiamata di re-render.

## 3. Eseguirla

Il server di sviluppo del passo 1 sta già osservando. Basta aprire:

```
http://localhost:9080/my/hello/
```

Digita il tuo nome — il saluto si aggiorna mentre scrivi. Questa è la reattività di $mol: lo stato scorre verso la vista da solo.

## 4. Aggiungere un secondo valore reattivo

La reattività si compone. Aggiungi un contatore di lunghezza che dipende dallo stesso `name`, senza cablaggio aggiuntivo.

In `hello.view.tree`, aggiungi una riga sotto `Message`:

```tree
		<= Counter $mol_view
			sub / <= counter \
```

In `hello.view.ts`, aggiungi il metodo:

```typescript
		@ $mol_mem
		counter() {
			return `${this.name().length} characters`
		}
}
```

Sia `greeting` sia `counter` leggono `name`; entrambi si aggiornano insieme. Aggiungine un terzo, aggiungine un decimo — lo schema non cambia. Ecco perché il codice $mol resta piatto man mano che le funzionalità si accumulano.

## 5. Controllare la build

MAM scrive un file di diagnostica accanto a ogni app. Dopo una build, apri:

```
http://localhost:9080/my/hello/-/web.audit.js
```

Un audit pulito significa nessuna dipendenza inutilizzata, nessun problema di tipo, niente da correggere. Prendi l'abitudine di darci un'occhiata — cattura gli errori prima che raggiungano un browser.

## Hai costruito un'app $mol

Hai un componente reattivo, un binding bidirezionale e uno stato derivato — con tre piccoli file e zero configurazione.

Continua: la **[Guida](#!section=docs/page=installation)** copre in profondità installazione, viste, stato, routing e dati — e trasforma questo Hello World in qualcosa di reale.
