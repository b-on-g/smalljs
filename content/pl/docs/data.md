# Pobieranie danych

Ładowanie zdalnych danych w $mol nie jest specjalnym API — wartość asynchroniczna to po prostu właściwość reaktywna napisana tak, jakby odpowiedź już tam była. Widok na nią czeka, pokazuje stan ładowania i renderuje się ponownie, gdy dane nadejdą.

## Właściwość asynchroniczna

Wywołaj sieć wewnątrz `@ $mol_mem` i zwróć sparsowany wynik. W kodzie nie ma obietnicy, nie ma `await` ani callbacka:

```typescript
namespace $.$$ {
	export class $my_users extends $.$my_users {
		@ $mol_mem
		users() {
			return this.$.$mol_fetch.json( 'https://api.example.com/users' ) as {
				id: number
				name: string
			}[]
		}
	}
}
```

`$mol_fetch` zawiesza włókno do nadejścia odpowiedzi, po czym obliczenie startuje od nowa, a `users()` zwraca tablicę. Gdy jest w toku, każdy widok czytający `users()` automatycznie pokazuje wbudowany stan ładowania — nie piszesz żadnej flagi `isLoading`. Nie zwracaj obietnicy z `@ $mol_mem` samodzielnie: obietnica przechowana jako wartość zostawia komórkę w stanie ładowania na zawsze, patrz [Rozwiązywanie problemów](#!section=docs/page=troubleshooting).

`this.$` to kontekst komponentu. Każdy serwis idzie przez niego: `$mol_fetch` do sieci, `$mol_state_arg` do URL, `$mol_after_timeout` do czasu. W teście kontekst jest podmieniany, więc to samo `users()` wysyła swoje żądanie do mocka zamiast do sieci, i to bez zmiany choćby jednej linii komponentu. [Testowanie](#!section=docs/page=testing) pokazuje takiego mocka.

## Renderowanie wyniku

Powiąż rozwiązane dane bezpośrednio z listą:

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

Gdy nadejdzie odpowiedź, `users()` się aktualizuje, `user_names()` się przelicza, a lista renderuje. Bez callbacków, bez `useEffect`.

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
			return this.$.$mol_fetch.json( 'https://api.example.com/users' ) as unknown[]
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
