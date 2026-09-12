# Récupération de données

Charger des données distantes dans $mol n'est pas une API spéciale — une valeur asynchrone n'est qu'une propriété réactive écrite comme si la réponse était déjà là. La vue l'attend, affiche un état de chargement et se re-rend quand les données arrivent.

## Une propriété asynchrone

Appelez le réseau à l'intérieur d'un `@ $mol_mem` et renvoyez le résultat analysé. Il n'y a dans le code ni promesse, ni `await`, ni callback :

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

`$mol_fetch` suspend la fibre jusqu'à l'arrivée de la réponse, puis le calcul repart et `users()` renvoie le tableau. Pendant qu'elle est en attente, toute vue qui lit `users()` affiche automatiquement l'état de chargement intégré — vous n'écrivez aucun drapeau `isLoading`. Ne renvoyez pas vous-même une promesse depuis un `@ $mol_mem` : une promesse stockée comme valeur garde la cellule en chargement pour toujours, voyez [Dépannage](#!section=docs/page=troubleshooting).

`this.$` est le contexte du composant. Chaque service passe par lui : `$mol_fetch` pour le réseau, `$mol_state_arg` pour l'URL, `$mol_after_timeout` pour le temps. Dans un test, le contexte est remplacé, si bien que le même `users()` envoie sa requête à une simulation au lieu du réseau, sans qu'une seule ligne du composant change. [Tests](#!section=docs/page=testing) montre cette simulation.

## Rendre le résultat

Liez les données résolues directement dans une liste :

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

Quand la réponse arrive, `users()` se met à jour, `user_names()` se recalcule et la liste s'affiche. Pas de callbacks, pas de `useEffect`.

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
			return this.$.$mol_fetch.json( 'https://api.example.com/users' ) as unknown[]
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
