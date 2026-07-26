# Introduction

## Qu'est-ce que $mol ?

$mol est un framework d'interface réactif : vous décrivez **ce qu'**est l'interface, et le framework détermine **comment** et **quand** la mettre à jour. Pas de DOM virtuel, pas d'abonnements manuels, pas de `useEffect`. Vous écrivez les composants sous forme d'arbre ; $mol ne rend que ce qui est visible et ne recalcule que ce qui a réellement changé.

Un composant se compose de trois fichiers :

- `name.view.tree` — la mise en page déclarative (un langage arborescent compact)
- `name.view.ts` — le comportement (de simples classes TypeScript)
- `name.view.css.ts` — les styles typés (vérifiés par le compilateur)

Cette séparation est toute l'idée : la mise en page reste lisible, la logique reste testable, les styles restent sûrs au niveau des types.

## À qui s'adresse-t-il ?

- Vous voulez une **petite** application qui le reste en grandissant — le runtime est compact et le rendu est virtualisé par défaut.
- Vous aimez **les types partout** — même les styles sont vérifiés par TypeScript.
- Vous êtes fatigué de câbler la réactivité à la main — l'état dans $mol est automatiquement réactif, comme un tableur.

## Un avant-goût

Un compteur, en entier :

```tree
$my_counter $mol_view
	sub /
		<= Count $mol_view
			sub / <= count \
		<= Increment $mol_button
			click? <=> increment?
			sub / <= label \+
```

```typescript
namespace $.$$ {
	export class $my_counter extends $.$my_counter {
		@ $mol_mem count() { return 0 }
		@ $mol_action increment() { this.count( this.count() + 1 ) }
	}
}
```

`count` est réactif : tout ce qui le lit se rerend automatiquement lorsqu'il change. Pas de `setState`, pas de tableau de dépendances, aucun store à enregistrer.

## Et ensuite ?

Prêt à exécuter quelque chose sur votre propre machine ? Rendez-vous sur [Démarrage rapide](#!section=docs/page=getting-started) et construisez une application fonctionnelle en moins de quinze minutes.
