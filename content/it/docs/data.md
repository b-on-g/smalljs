# Recupero dati

Caricare dati remoti in $mol non è un'API speciale — un valore asincrono è solo una proprietà reattiva che per caso restituisce una promise. La vista l'attende, mostra uno stato di caricamento e si ri-renderizza quando si risolve.

## Una proprietà asincrona

Restituisci una promise da un `@ $mol_mem` e leggila come qualsiasi altro valore:

```typescript
namespace $.$$ {
	export class $my_users extends $.$my_users {
		@ $mol_mem
		users() {
			return $mol_fetch.json( 'https://api.example.com/users' ) as {
				id: number
				name: string
			}[]
		}
	}
}
```

`$mol_fetch` sospende la fibra finché non arriva la risposta. Mentre è in attesa, ogni vista che legge `users()` mostra automaticamente lo stato di caricamento integrato — non scrivi alcun flag `isLoading`.

## Renderizzare il risultato

Collega i dati risolti direttamente in una lista:

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

Quando la promise si risolve, `users()` si aggiorna, `user_names()` si ricalcola e la lista si renderizza. Niente callback, niente `useEffect`.

## Ricaricare

Poiché è solo una cella reattiva, ricarichi invalidandola. Dipendi da un token che puoi incrementare:

```typescript
		@ $mol_mem
		reload_token( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		users() {
			this.reload_token() // subscribe
			return $mol_fetch.json( 'https://api.example.com/users' ) as unknown[]
		}

		@ $mol_action
		reload() {
			this.reload_token( this.reload_token() + 1 )
		}
```

Chiamare `reload()` cambia il token, che invalida `users()`, che ricarica.

## Errori

Un lancio all'interno di una proprietà reattiva si propaga alla vista più vicina, che renderizza uno stato di errore invece del contenuto. Per gestirlo tu stesso, cattura e restituisci un valore di riserva:

```typescript
		@ $mol_mem
		users_safe() {
			try {
				return this.users()
			} catch( error ) {
				if( error instanceof Promise ) throw error // still loading
				return []
			}
		}
```

Rilanciare una `Promise` è il modo per lasciare che lo stato di caricamento continui a fluire, catturando solo gli errori reali.

## Avanti

Per dati che persistono e si sincronizzano tra client senza un backend, prosegui verso [Giper Baza](#!section=docs/page=giper-baza).
