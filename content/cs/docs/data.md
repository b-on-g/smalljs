# Načítání dat

Načítání vzdálených dat v $mol není zvláštní API — asynchronní hodnota je prostě reaktivní vlastnost, která náhodou vrací příslib. Pohled na ni čeká, zobrazí stav načítání a překreslí se, když se vyřeší.

## Asynchronní vlastnost

Vraťte příslib z `@ $mol_mem` a čtěte jej jako jakoukoli jinou hodnotu:

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

`$mol_fetch` pozastaví vlákno, dokud nedorazí odpověď. Dokud čeká, každý pohled, který čte `users()`, automaticky zobrazí vestavěný stav načítání — nepíšete žádný příznak `isLoading`.

## Vykreslení výsledku

Navažte vyřešená data přímo do seznamu:

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

Když se příslib vyřeší, `users()` se aktualizuje, `user_names()` se přepočítá a seznam se vykreslí. Žádné callbacky, žádný `useEffect`.

## Znovunačtení

Protože je to jen reaktivní buňka, znovu načtete tím, že ji zneplatníte. Závisejte na tokenu, který můžete zvyšovat:

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

Volání `reload()` změní token, což zneplatní `users()`, což znovu načte.

## Chyby

Vyhození uvnitř reaktivní vlastnosti se propaguje k nejbližšímu pohledu, který místo obsahu vykreslí chybový stav. Abyste jej ošetřili sami, zachyťte a vraťte záložní hodnotu:

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

Opětovné vyhození `Promise` je způsob, jak nechat stav načítání dál plynout a zachytit jen skutečné chyby.

## Dále

Pro data, která přetrvávají a synchronizují se mezi klienty bez backendu, pokračujte na [Giper Baza](#!section=docs/page=giper-baza).
