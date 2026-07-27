# Pobieranie danych

Ładowanie zdalnych danych w $mol nie jest specjalnym API — wartość asynchroniczna to po prostu właściwość reaktywna, która akurat zwraca obietnicę. Widok na nią czeka, pokazuje stan ładowania i renderuje się ponownie, gdy się rozwiąże.

## Właściwość asynchroniczna

Zwróć obietnicę z `@ $mol_mem` i czytaj ją jak każdą inną wartość:

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

`$mol_fetch` zawiesza włókno do nadejścia odpowiedzi. Gdy jest w toku, każdy widok czytający `users()` automatycznie pokazuje wbudowany stan ładowania — nie piszesz żadnej flagi `isLoading`.

## Renderowanie wyniku

Powiąż rozwiązane dane bezpośrednio z listą:

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

Gdy obietnica się rozwiąże, `users()` się aktualizuje, `user_names()` się przelicza, a lista renderuje. Bez callbacków, bez `useEffect`.

## Ponowne ładowanie

Ponieważ to tylko reaktywna komórka, przeładowujesz, unieważniając ją. Zależ od tokenu, który możesz zwiększać:

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

Wywołanie `reload()` zmienia token, co unieważnia `users()`, co przeładowuje.

## Błędy

Rzut wewnątrz właściwości reaktywnej propaguje się do najbliższego widoku, który renderuje stan błędu zamiast treści. Aby obsłużyć go samodzielnie, złap i zwróć wartość zastępczą:

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

Ponowne rzucenie `Promise` to sposób, by pozwolić stanowi ładowania płynąć dalej, łapiąc tylko prawdziwe błędy.

## Dalej

Dla danych, które utrzymują się i synchronizują między klientami bez backendu, przejdź do [Giper Baza](#!section=docs/page=giper-baza).
