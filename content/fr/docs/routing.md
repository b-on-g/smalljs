# Routage

Le routage dans $mol n'est pas une bibliothèque séparée — l'URL n'est qu'un autre morceau d'état réactif. Lisez-la, écrivez-la, et les vues réagissent de la même manière qu'à n'importe quelle cellule. Le bouton retour, les liens profonds et les URL partageables sont tous gratuits.

## L'URL comme état

`$mol_state_arg` expose les paramètres d'URL comme des valeurs réactives. Liez-en un à une propriété et la barre d'adresse devient votre source de vérité :

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

Lire `page()` renvoie la valeur actuelle ; appeler `page('about')` navigue. Tout ce qui lit `page()` se re-rend au changement — y compris le bouton retour du navigateur, qui met la cellule à jour pour vous.

## Changer d'écran

Combinez une valeur routée avec un simple `switch` pour choisir ce qui s'affiche. Comme les vues sont [paresseuses](#!section=docs/page=rendering), les écrans que vous n'affichez pas ne sont jamais construits :

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

## Liens qui définissent des arguments

Dans `view.tree`, un lien peut définir des arguments d'URL de manière déclarative — cliquer dessus navigue sans gestionnaire :

```tree
<= About_link $mol_link
	arg *
		page \about
	sub / <= about_label \About
```

`$mol_link` se marque aussi comme actif (`mol_link_current`) lorsque ses arguments correspondent à l'URL actuelle, donc mettre en évidence la page courante ne nécessite aucun état supplémentaire.

## Paramètres multiples

Les arguments sont indépendants, donc un écran peut router sur plusieurs à la fois. Ce site de documentation route à la fois sur `section` et `page` :

```tree
<= Guide_link $mol_link
	arg *
		section \docs
		page \views
```

Chaque clé fait l'aller-retour par l'URL, donc toute vue est partageable et ajoutable aux favoris par construction. Définir un argument laisse les autres intacts, ce qui fait des liens profonds — une section *et* une page *et* une ancre spécifiques — une simple question de définir les clés qui vous intéressent.

## État qui ne devrait pas être dans l'URL

Tout élément d'état n'a pas sa place dans la barre d'adresse. Pour les valeurs qui doivent persister localement sans polluer les liens — une barre latérale repliée, un brouillon — utilisez `$mol_state_local`, qui stocke dans `localStorage` avec la même forme getter/setter :

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

Optez pour `$mol_state_arg` quand l'état doit être partageable ; `$mol_state_local` quand il doit simplement être mémorisé.

## Suite

Vous avez vu comment $mol transforme l'état en UI et en URL. Découvrez comment tout cela atteint l'écran efficacement dans [Rendu](#!section=docs/page=rendering).
