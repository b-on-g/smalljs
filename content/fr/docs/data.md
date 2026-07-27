# Récupération de données

Charger des données distantes dans $mol n'est pas une API spéciale — une valeur asynchrone n'est qu'une propriété réactive qui se trouve renvoyer une promesse. La vue l'attend, affiche un état de chargement et se re-rend quand elle se résout.

## Une propriété asynchrone

Renvoyez une promesse depuis un `@ $mol_mem` et lisez-la comme n'importe quelle autre valeur :

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

`$mol_fetch` suspend la fibre jusqu'à l'arrivée de la réponse. Pendant qu'elle est en attente, toute vue qui lit `users()` affiche automatiquement l'état de chargement intégré — vous n'écrivez aucun drapeau `isLoading`.

## Rendre le résultat

Liez les données résolues directement dans une liste :

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

Quand la promesse se résout, `users()` se met à jour, `user_names()` se recalcule et la liste s'affiche. Pas de callbacks, pas de `useEffect`.

## Recharger

Comme ce n'est qu'une cellule réactive, vous rechargez en l'invalidant. Dépendez d'un jeton que vous pouvez incrémenter :

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

Appeler `reload()` change le jeton, ce qui invalide `users()`, ce qui recharge.

## Erreurs

Un lancer à l'intérieur d'une propriété réactive se propage à la vue la plus proche, qui rend un état d'erreur au lieu du contenu. Pour le gérer vous-même, attrapez et renvoyez une valeur de repli :

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

Relancer une `Promise` est la façon de laisser l'état de chargement continuer de circuler tout en n'attrapant que les vraies erreurs.

## Suite

Pour des données qui persistent et se synchronisent entre clients sans backend, continuez vers [Giper Baza](#!section=docs/page=giper-baza).
