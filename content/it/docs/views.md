# Viste

Una vista è un componente: un nodo nell'albero dell'interfaccia con il proprio layout, comportamento e stili. Questo capitolo tratta come le viste vengono dichiarate, collegate alla logica, composte e riutilizzate.

## Tre file, un componente

Un componente `$my_card` vive in `my/card/` ed è descritto da un massimo di tre file, ciascuno con un compito chiaro:

- `card.view.tree` — **cosa** è il componente: la sua struttura e i binding predefiniti.
- `card.view.ts` — **come** si comporta: metodi TypeScript, stato reattivo.
- `card.view.css.ts` — come appare: stili tipizzati verificati dal compilatore.

Tenere separati struttura, comportamento e stile è voluto — ogni file rimane piccolo e leggibile, e il layout non si aggroviglia mai con la logica.

## Il linguaggio view.tree

`view.tree` descrive la struttura in modo dichiarativo. L'indentazione è annidamento; non ci sono tag di chiusura.

```tree
$my_card $mol_view
	sub /
		<= Title $mol_view
			sub / <= title \
		<= Body $mol_view
			sub / <= text \
```

- `$my_card $mol_view` — il tuo componente estende la base `$mol_view`.
- `sub /` — l'elenco dei figli.
- `<= Title $mol_view` — una sotto-vista con nome, accessibile come `this.Title()` in TypeScript.
- `<= title \` — una proprietà associabile con un valore stringa grezza predefinito (`\` inizia una stringa grezza).

Ogni nome con l'iniziale maiuscola (`Title`, `Body`) diventa una proprietà reale che puoi raggiungere, sovrascrivere o stilizzare. Ogni binding in minuscolo (`title`, `text`) diventa un valore che puoi calcolare in `.view.ts`.

## Associare proprietà

Due operatori collegano una proprietà alla sua sorgente:

- `<=` **unidirezionale**: il figlio legge un valore dal proprietario.
- `<=>` **bidirezionale**: il valore scorre in entrambe le direzioni — usato per gli input.

```tree-no-run
$my_form $mol_view
	sub /
		<= Field $mol_string
			value? <=> text? \
```

Qui il `value` dell'input e il `text` del proprietario restano sincronizzati automaticamente: digita nel campo e `text` si aggiorna; imposta `text` nel codice e il campo lo riflette.

## Collegamento al comportamento

Un binding senza valore predefinito viene implementato in `.view.ts`. La classe estende la base generata con lo stesso nome:

```typescript
namespace $.$$ {
	export class $my_card extends $.$my_card {
		@ $mol_mem
		title() {
			return 'Untitled'
		}
	}
}
```

Tutto ciò che il template associa — `title`, `text`, la proprietà di una sotto-vista — può ricevere logica qui. La reattività rende vivi questi valori.

## Attributi e tipo di elemento

Cambia l'elemento HTML sottostante con `dom_name` e imposta gli attributi tramite `attr`:

```tree
$my_banner $mol_view
	dom_name \section
	attr *
		^
		role \note
```

Il `^` eredita gli attributi del genitore, così non perdi quelli che `$mol_view` imposta già.

## Elenchi e viste con chiave

Un `*` finale trasforma una sotto-vista in una famiglia — un'istanza per chiave. Usalo per le righe:

```tree
$my_list $mol_list
	rows /
		<= Row* $mol_view
			sub / <= row_title* \
```

Il framework crea un `Row` per ogni chiave che fornisci e, grazie al [rendering virtualizzato](#!section=docs/page=rendering), costruisce solo quelli sullo schermo.

> Quando una vista con chiave contiene a sua volta figli con chiave, assegna la chiave a quella esterna con `Name*`, non `Name*0` — la forma indicizzata lascia i figli annidati non renderizzati.

## Viste condizionali

Assegnare `null` rimuove una vista dal rendering. Crea una sottoclasse e annulla ciò di cui una variante non ha bisogno:

```tree
$my_page_readonly $my_page
	Edit_button null
```

## Composizione e riuso

Le viste si compongono per annidamento e si specializzano per estensione. Una scheda usata dentro un elenco:

```tree
$my_user_card $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
		<= Email $mol_view
			sub / <= email \

$my_users_list $mol_list
	rows /
		<= User* $my_user_card
			name <= user_name* \
			email <= user_email* \
```

`$my_users_list` non ridefinisce mai l'aspetto di una scheda — riutilizza `$my_user_card` e alimenta ogni istanza con i suoi dati. Questo è l'intero modello di composizione: viste piccole, collegate insieme, specializzate con `extends` quando serve una variante.

## Avanti

Le viste descrivono la struttura; ciò che le rende vive sono i dati reattivi. Continua con [Stato e reattività](#!section=docs/page=state).
