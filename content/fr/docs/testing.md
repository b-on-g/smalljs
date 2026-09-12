# Tests

Une vue $mol est une fonction de son état, et cela change ce à quoi ressemble un test. Un scénario utilisateur s'écrit comme des appels aux méthodes de la vue elle-même : poser le brouillon, lancer l'action, lire ce que l'utilisateur verrait.

```typescript
app.draft( 'Milk' )
app.add()
$mol_assert_equal( app.item_title( 0 ), 'Milk' )
```

Pas de sélecteurs, pas de navigateur, pas de Playwright ni de Cypress, aucune attente. Le même fichier vous donne aussi :

- **La vitesse.** Les tests tournent dans Node en quelques millisecondes ; un millier d'entre eux prend environ une minute. `node my/hello/-/node.test.js` exécute ceux d'un module.
- **Zéro configuration.** Un `hello.test.ts` posé à côté du composant est ramassé par le builder et compilé dans `-/node.test.js`. L'intégration continue avec `mam_build` l'exécute et fait échouer la compilation quand un test échoue.
- **La substitution de services par le contexte.** Chaque test reçoit son propre `$`, et tout ce qu'un composant atteint via `this.$.X` se remplace en affectant un double de test à ce `$`. C'est la raison d'écrire `this.$.$mol_fetch` plutôt que `$mol_fetch` : le premier est remplaçable, le second non.
- **Un temps simulé.** Les minuteries créées par le contexte ne s'écoulent pas toutes seules ; `$mol_after_mock_warp()` exécute ce qui est en file d'attente.
- **Un vrai DOM quand il vous en faut un.** Le bundle Node embarque jsdom, donc `dom_node()` et `querySelectorAll` fonctionnent dans le même fichier de test.

## Un scénario passant par les méthodes de la vue

Prenez la liste de tâches des [Recettes](#!section=docs/page=cookbook) : une chaîne `draft?`, une liste `items`, une action `add` et une action `delete`. Son test vit dans `my/todo/todo.test.ts` :

```typescript
namespace $ {
	$mol_test({

		'add an item and delete it'( $ ) {
			const app = $my_todo.make({ $ })

			app.draft( 'Milk' )
			app.add()
			$mol_assert_equal( app.items().length, 1 )
			$mol_assert_equal( app.item_title( 0 ), 'Milk' )
			$mol_assert_equal( app.draft(), '' )

			app.delete( 0 )
			$mol_assert_like( app.item_rows(), [] )
		},

		'blank draft adds nothing'( $ ) {
			const app = $my_todo.make({ $ })

			app.draft( '   ' )
			app.add()
			$mol_assert_like( app.items(), [] )
		},

	})
}
```

Quelques points à remarquer :

- Le fichier de test utilise `namespace $`, pas `$.$$`. Le contexte `$` arrive en argument, neuf pour chaque test, et le composant est créé avec `Klass.make({ $ })` pour qu'il lise ses services depuis ce contexte.
- Un clic est un appel au gestionnaire. `app.add()` est ce que fait le bouton ; `app.Add().click( event )` emprunte le même chemin quand vous voulez inclure la liaison.
- Vérifiez ce que voit l'utilisateur : `items()`, `item_rows()`, `sub()`, le `title()` d'une sous-vue. Un modèle vérifié à travers l'écran attrape aussi une redéfinition tombée de la classe, ce qu'un test du seul modèle ne ferait pas.
- `$mol_assert_equal` compare par identité, `$mol_assert_like` compare la structure, `$mol_assert_fail( ()=> ..., 'message' )` attend un lancer.
- Le nom du test est la description. Il n'y a pas de commentaires dans le corps.

## Simuler un service

Chaque test reçoit un contexte neuf dérivé du contexte global. Affectez une sous-classe à un service sur ce `$` avant de créer le composant, et chaque `this.$.X` dans le composant se résout vers le remplaçant. Voici le double de fetch pour le composant `$my_users` de [Récupération de données](#!section=docs/page=data) :

```typescript
namespace $ {
	$mol_test({

		'user names come from the response'( $ ) {
			$.$mol_fetch = class extends $.$mol_fetch {
				static override json( input: RequestInfo ) {
					if( String( input ).endsWith( '/users' ) ) return [ { id: 1, name: 'Ada' } ]
					return $mol_fail( new Error( 'Unexpected request: ' + input ) )
				}
			}
			const app = $my_users.make({ $ })
			$mol_assert_like( app.user_names(), [ 'Ada' ] )
		},

	})
}
```

`users()` dans le composant appelle `this.$.$mol_fetch.json( ... )`, donc la requête va vers la simulation et la valeur est disponible de façon synchrone, sans la moindre attente. Si le composant avait appelé `$mol_fetch.json( ... )` sur le global, la simulation n'aurait jamais été consultée. Les simulations intégrées remplacent déjà le `fetch` et le `XMLHttpRequest` globaux du contexte par des proxys qui lèvent une erreur, si bien qu'une requête qui échappe au contexte échoue bruyamment au lieu de toucher le réseau.

Le même motif couvre `$mol_state_arg` pour l'URL, `$mol_state_local` pour le stockage, et tout ce que votre composant prend dans `this.$`.

Il y a aussi `$mol_test_mocks`, une liste de fonctions qui s'exécutent sur le contexte avant chaque test du bundle, y compris les tests des autres modules. C'est l'endroit des règles qui valent partout, à la manière dont le framework enregistre ses propres simulations : un double de stockage qui garde ce qu'on lui donne, une locale qui renvoie un dictionnaire vide, l'interdiction de réseau ci-dessus. Les données de fixture d'un composant particulier n'y ont pas leur place.

## Le temps

Les tests du framework lui-même enregistrent des simulations pour `$mol_after_timeout`, `$mol_after_frame` et leurs proches, et ces simulations sont aussi dans votre bundle. Une minuterie créée par `new this.$.$mol_after_timeout( ms, task )` est mise en file plutôt que programmée, et `$mol_after_mock_warp()` vide la file. Étant donné un toast qui se masque tout seul :

```typescript
@ $mol_mem toast( next?: string ) { return next ?? '' }

@ $mol_action notify( text: string ) {
	this.toast( text )
	new this.$.$mol_after_timeout( 3000, ()=> this.toast( '' ) )
}
```

le test fait avancer le temps à la main :

```typescript
'toast hides after the timer'( $ ) {
	const app = $my_greeter.make({ $ })
	app.notify( 'Saved' )
	$mol_assert_equal( app.toast(), 'Saved' )
	$mol_after_mock_warp()
	$mol_assert_equal( app.toast(), '' )
},
```

Un `setTimeout` nu dans une vue n'est pas simulé et survit au test ; c'est l'une des raisons de créer les minuteries par le contexte.

## Par le DOM

Dans le bundle Node, `$mol_dom_context` est une fenêtre jsdom, donc une vue se rend dans de vrais éléments. Servez-vous-en quand la vérification porte sur le balisage plutôt que sur l'état :

```typescript
'greets by name'( $ ) {
	const app = $my_greeter.make({ $ })
	app.name( 'Ada' )
	$.$mol_dom_context.document.body.appendChild( app.dom_node() )
	app.dom_tree()
	$mol_assert_equal( app.Hello().dom_node().textContent, 'Hello, Ada!' )
	app.destructor()
},
```

`dom_node()` crée l'élément, `dom_tree()` rend le sous-arbre, et `destructor()` libère la vue pour que ses cellules ne survivent pas au test. L'attribut qu'une sous-vue tient de son nom, ici `[my_greeter_hello]`, est le sélecteur quand vous préférez `querySelector` à l'appel de la sous-vue.

Il manque à jsdom deux objets globaux auxquels les champs de saisie et les gestes font appel, `ShadowRoot` et `PointerEvent`. Un `$mol_string` rendu sans eux consigne une `ReferenceError` et reste vide pendant que le reste de l'arbre se rend. Empruntez-les à la fenêtre jsdom ; c'est une règle sans données pour tous les tests, elle va donc dans `$mol_test_mocks` :

```typescript
$mol_test_mocks.push( $ => {
	const win = $.$mol_dom_context
	Object.assign( globalThis, {
		ShadowRoot: win.ShadowRoot,
		PointerEvent: win.PointerEvent ?? win.MouseEvent,
	} )
} )
```

## Ce qu'un test Node ne couvre pas

La géométrie et le style. Que deux blocs s'alignent, qu'un panneau déborde de l'écran, que le thème sombre se lise bien : rien de tout cela n'existe dans jsdom. Pour la mise en page que vous avez touchée, ouvrez le `-/test.html` du module dans un navigateur, qui monte l'application et y exécute les mêmes tests, et regardez.

## Notes pratiques

- **Le silence est un échec.** Un test qui a raté une assertion et un test qui s'est bloqué ont la même allure : aucune sortie et un processus qui reste en vie. Cherchez `All tests passed` à la fin ; si c'est absent, examinez d'abord la dernière assertion. Un test `async` est limité à une seconde.
- **Cassez-en un exprès.** Quand une exécution n'affiche rien, inversez une assertion et vérifiez que l'échec apparaît. Une suite de tests incapable d'échouer ne mesure rien.
- **N'affirmez rien sur les chaînes localisées.** Les valeurs marquées `@` dans l'arbre sont résolues par la locale, qui se réchauffe à nouveau dans chaque contexte neuf. Vérifiez la structure, pas le texte d'un libellé.

## Suite

[Dépannage](#!section=docs/page=troubleshooting) recense les erreurs qui laissent les tests verts et les écrans vides, et [Récupération de données](#!section=docs/page=data) montre le composant pour lequel la simulation ci-dessus a été écrite.
