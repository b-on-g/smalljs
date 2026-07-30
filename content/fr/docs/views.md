# Vues

Une vue est un composant : un nœud de l'arbre d'interface avec sa propre mise en page, son comportement et ses styles. Ce chapitre explique comment les vues sont déclarées, reliées à la logique, composées et réutilisées.

## Trois fichiers, un composant

Un composant `$my_card` vit dans `my/card/` et est décrit par un maximum de trois fichiers, chacun avec un rôle clair :

- `card.view.tree` — **ce qu'est** le composant : sa structure et ses liaisons par défaut.
- `card.view.ts` — **comment** il se comporte : méthodes TypeScript, état réactif.
- `card.view.css.ts` — à quoi il ressemble : styles typés vérifiés par le compilateur.

Séparer structure, comportement et style est délibéré — chaque fichier reste petit et lisible, et la mise en page n'est jamais mêlée à la logique.

## Le langage view.tree

`view.tree` décrit la structure de façon déclarative. L'indentation, c'est l'imbrication ; il n'y a pas de balises fermantes.

```tree
$my_card $mol_view
	sub /
		<= Title $mol_view
			sub / <= title \
		<= Body $mol_view
			sub / <= text \
```

- `$my_card $mol_view` — votre composant étend la base `$mol_view`.
- `sub /` — la liste des enfants.
- `<= Title $mol_view` — une sous-vue nommée, accessible via `this.Title()` en TypeScript.
- `<= title \` — une propriété liable avec une valeur chaîne brute par défaut (`\` démarre une chaîne brute).

Chaque nom capitalisé (`Title`, `Body`) devient une vraie propriété que vous pouvez atteindre, redéfinir ou styliser. Chaque liaison en minuscules (`title`, `text`) devient une valeur que vous pouvez calculer dans `.view.ts`.

## Lier des propriétés

Deux opérateurs relient une propriété à sa source :

- `<=` **unidirectionnel** : l'enfant lit une valeur depuis le propriétaire.
- `<=>` **bidirectionnel** : la valeur circule dans les deux sens — utilisé pour les champs de saisie.

```tree-no-run
$my_form $mol_view
	sub /
		<= Field $mol_string
			value? <=> text? \
```

Ici, le `value` du champ et le `text` du propriétaire restent synchronisés automatiquement : saisissez dans le champ et `text` se met à jour ; définissez `text` dans le code et le champ le reflète.

## Câblage au comportement

Une liaison sans valeur par défaut est implémentée dans `.view.ts`. La classe étend la base générée du même nom :

```typescript
namespace $.$$ {
	export class $my_card extends $.$my_card {
		@ $mol_mem
		title() {
			return 'Untitled'
		}
	}
}
```

Tout ce que le gabarit lie — `title`, `text`, la propriété d'une sous-vue — peut recevoir de la logique ici. La réactivité rend ces valeurs vivantes.

## Attributs et type d'élément

Changez l'élément HTML sous-jacent avec `dom_name`, et définissez les attributs via `attr` :

```tree
$my_banner $mol_view
	dom_name \section
	attr *
		^
		role \note
```

Le `^` hérite des attributs du parent, pour ne pas perdre ceux que `$mol_view` définit déjà.

## Listes et vues à clé

Un `*` final transforme une sous-vue en famille — une instance par clé. À utiliser pour les lignes :

```tree
$my_list $mol_list
	rows /
		<= Row* $mol_view
			sub / <= row_title* \
```

Le framework crée un `Row` pour chaque clé que vous fournissez et, grâce au [rendu virtualisé](#!section=docs/page=rendering), ne construit que ceux à l'écran.

> Quand une vue à clé contient elle-même des enfants à clé, mettez la clé de l'externe avec `Name*`, pas `Name*0` — la forme indexée laisse les enfants imbriqués non rendus.

## Vues conditionnelles

Affecter `null` retire une vue du rendu. Sous-classez et annulez ce dont une variante n'a pas besoin :

```tree
$my_page_readonly $my_page
	Edit_button null
```

## Composition et réutilisation

Les vues se composent par imbrication et se spécialisent par extension. Une carte utilisée dans une liste :

```tree
$my_user_card $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
		<= Email $mol_view
			sub / <= email \

$my_users_list $mol_list
	rows /
		<= User* $my_user_card
			name <= user_name* \
			email <= user_email* \
```

`$my_users_list` ne redéfinit jamais l'apparence d'une carte — il réutilise `$my_user_card` et alimente chaque instance avec ses données. C'est tout le modèle de composition : de petites vues, câblées ensemble, spécialisées par `extends` quand une variante est nécessaire.

## Suite

Les vues décrivent la structure ; ce qui les fait vivre, ce sont les données réactives. Continuez vers [État et réactivité](#!section=docs/page=state).
