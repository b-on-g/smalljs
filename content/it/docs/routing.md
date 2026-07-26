# Routing

Il routing in $mol non è una libreria separata — l'URL è solo un altro pezzo di stato reattivo. Leggilo, scrivilo, e le viste reagiscono nello stesso modo in cui reagiscono a qualsiasi cella. Il pulsante indietro, i deep link e gli URL condivisibili sono tutti gratuiti.

## L'URL come stato

`$mol_state_arg` espone i parametri dell'URL come valori reattivi. Collegane uno a una proprietà e la barra degli indirizzi diventa la tua fonte di verità:

```typescript
namespace $.$$ {
	export class $my_app extends $.$my_app {
		@ $mol_mem
		page( next?: string ) {
			return $mol_state_arg.value( 'page', next ) ?? 'home'
		}
	}
}
```

Leggere `page()` restituisce il valore corrente; chiamare `page('about')` naviga. Tutto ciò che legge `page()` viene ri-renderizzato al cambiamento — incluso il pulsante indietro del browser, che aggiorna la cella per te.

## Cambiare schermata

Combina un valore instradato con un semplice `switch` per scegliere cosa renderizzare. Poiché le viste sono [pigre](#!section=docs/page=rendering), le schermate che non mostri non vengono mai costruite:

```typescript
@ $mol_mem
body_content() {
	switch ( this.page() ) {
		case 'about': return [ this.About() ]
		case 'docs': return [ this.Docs() ]
		default: return [ this.Home() ]
	}
}
```

## Link che impostano argomenti

In `view.tree`, un link può impostare argomenti dell'URL in modo dichiarativo — cliccarlo naviga senza alcun gestore:

```tree
<= About_link $mol_link
	arg *
		page \about
	sub / <= about_label \About
```

`$mol_link` si contrassegna anche come attivo (`mol_link_current`) quando i suoi argomenti corrispondono all'URL corrente, quindi evidenziare la pagina corrente non richiede alcuno stato aggiuntivo.

## Parametri multipli

Gli argomenti sono indipendenti, quindi una schermata può instradare su più d'uno alla volta. Proprio questo sito di documentazione instrada sia su `section` sia su `page`:

```tree
<= Guide_link $mol_link
	arg *
		section \docs
		page \views
```

Ogni chiave fa il giro completo attraverso l'URL, quindi ogni vista è condivisibile e aggiungibile ai preferiti per costruzione. Impostare un argomento lascia gli altri intatti, il che rende i deep link — una specifica sezione *e* pagina *e* àncora — solo una questione di impostare le chiavi che ti interessano.

## Stato che non dovrebbe stare nell'URL

Non ogni pezzo di stato appartiene alla barra degli indirizzi. Per i valori che dovrebbero persistere localmente senza inquinare i link — una barra laterale ripiegata, una bozza — usa `$mol_state_local`, che memorizza in `localStorage` con la stessa forma getter/setter:

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

Ricorri a `$mol_state_arg` quando lo stato dovrebbe essere condivisibile; a `$mol_state_local` quando dovrebbe soltanto essere ricordato.

## Avanti

Hai visto come $mol trasforma lo stato in UI e URL. Guarda come tutto ciò raggiunge lo schermo in modo efficiente in [Rendering](#!section=docs/page=rendering).
