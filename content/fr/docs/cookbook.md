# Recettes

Des recettes courtes, prêtes à copier, pour les tâches qui reviennent dans presque toutes les applis. Chacune est du vrai code $mol — adaptez les noms et intégrez-la.

## Une entrée à liaison bidirectionnelle

Gardez une entrée et une valeur dérivée synchronisées sans câbler de gestionnaire : `<=>` lie dans les deux sens, et toute propriété calculée qui lit la valeur se met à jour d'elle-même.

```tree
$my_greeter $mol_view
	sub /
		<= Name $mol_string
			value? <=> name?
		<= Hello $mol_view
			sub / <= greeting \
```

```typescript
namespace $.$$ {
	export class $my_greeter extends $.$my_greeter {
		@ $mol_mem name( next?: string ) { return next ?? '' }

		@ $mol_mem greeting() {
			return this.name() ? `Hello, ${ this.name() }!` : 'Type your name'
		}
	}
}
```

## Une liste où ajouter et retirer

Conservez la collection dans une propriété réactive et réécrivez-la de manière immuable depuis des actions. Un `Row*` indexé rend une ligne par élément et — grâce au [rendu virtualisé](#!section=docs/page=rendering) — seules les lignes visibles sont construites.

```tree
$my_todo $mol_view
	draft? \
	items /
	sub /
		<= Input $mol_string
			value? <=> draft?
			hint \New item
		<= Add $mol_button_major
			click? <=> add?
			sub / <= add_label \Add
		<= List $mol_list
			rows <= item_rows /
	Row* $mol_row
		sub /
			<= Label* $mol_view
				sub / <= item_title* \
			<= Delete* $mol_button_minor
				click? <=> delete*?
				sub / <= delete_label \✕
```

```typescript
namespace $.$$ {
	export class $my_todo extends $.$my_todo {
		@ $mol_mem draft( next?: string ) { return next ?? '' }
		@ $mol_mem items( next?: readonly string[] ) { return next ?? [] }

		@ $mol_action add() {
			const title = this.draft().trim()
			if( !title ) return
			this.items([ ... this.items(), title ])
			this.draft( '' )
		}

		@ $mol_action delete( id: number ) {
			this.items( this.items().filter( ( _, i ) => i !== id ) )
		}

		item_title( id: number ) { return this.items()[ id ] }

		item_rows() {
			return this.items().map( ( _, id ) => this.Row( id ) )
		}
	}
}
```

## Récupérer des données avec états de chargement et d'erreur

Une valeur asynchrone n'est qu'une propriété réactive qui renvoie une promesse. `$mol_fetch` suspend la fibre pendant que la requête est en cours, si bien que toute vue qui la lit affiche l'état de chargement intégré — et une requête en échec remonte comme un état d'erreur. Vous n'écrivez ni indicateur `isLoading` ni `try`/`catch`.

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

		@ $mol_mem
		names() {
			return this.users().map( user => user.name )
		}
	}
}
```

## Persister un état local

Pour un état qui doit survivre à un rechargement sans encombrer l'URL — une barre latérale repliée, un brouillon, une préférence — utilisez `$mol_state_local`. Il a la même forme getter/setter que n'importe quelle propriété réactive et stocke dans `localStorage`.

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

## Lire et écrire un paramètre de route

Pour rendre une valeur partageable et ajoutable aux favoris, adossez-la plutôt à `$mol_state_arg`. Lire renvoie la valeur actuelle de l'URL ; passer un argument navigue, et le bouton retour du navigateur met la cellule à jour pour vous.

```typescript
@ $mol_mem
page( next?: string ) {
	return $mol_state_arg.value( 'page', next ) ?? 'home'
}
```

Un `$mol_link` peut définir le même argument de façon déclarative, si bien qu'un simple clic navigue sans gestionnaire :

```tree
<= Home_link $mol_link
	arg *
		page \home
	sub / <= home_label \Home
```

Pour changer d'écran selon la valeur de route, voir [Routage](#!section=docs/page=routing).

## Ajouter un thème clair/sombre automatique

Attachez `$mol_theme_auto` comme [plugin](#!section=docs/page=plugins) — un composant sans élément, listé sous `plugins /`. Il applique un thème clair ou sombre au sous-arbre de l'hôte, en suivant la préférence du système, sans rien envelopper de votre mise en page.

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
	sub /
		<= Content $my_content
```

## Suite

Envie de l'essayer en direct ? Ouvrez le [Playground](#!section=playground) et collez-y n'importe quelle recette, ou parcourez [Getting Started](#!section=docs/page=getting-started) pour construire une appli complète.
