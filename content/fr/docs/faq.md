# FAQ

## Qu'est-ce que smalljs ?

smalljs est le site de documentation de **$mol** — un framework d'interface réactif avec des vues typées, une réactivité automatique et pas de DOM virtuel. Le framework lui-même est développé au grand jour par la communauté hyoo-ru ; ce site rassemble un guide, un cours interactif, un playground en direct et une référence d'API en un seul endroit.

## $mol est-il prêt pour la production ?

Oui. $mol fait tourner de vraies applications et des outils internes — voir la [Vitrine](#!section=docs/page=showcase). Il est livré depuis un unique monorepo (MAM) et est utilisé quotidiennement par ses auteurs et sa communauté.

## Quelle est la taille du runtime ?

Petite. Le runtime est compact, et le rendu est virtualisé par défaut — les composants hors de la zone visible ne sont jamais créés. Voir [Rendu](#!section=docs/page=rendering) pour les détails et les benchmarks.

## Dois-je apprendre un nouveau langage de template ?

Vous apprenez `view.tree`, une syntaxe d'arbre compacte pour déclarer la mise en page des composants. Elle est volontairement petite — le chapitre [Vues](#!section=docs/page=views) couvre tout ce dont vous avez besoin en une seule fois. La logique reste en TypeScript simple, et les styles sont typés eux aussi.

## En quoi est-ce différent de React, Vue ou Svelte ?

La réactivité est automatique — il n'y a pas de `useState`, `useEffect` ni d'abonnement manuel. Vous décrivez *ce qu'est* l'interface ; $mol décide *comment* et *quand* la mettre à jour. La [table de traduction des concepts](#!section=docs/page=rosetta) fait correspondre les idées d'autres frameworks à $mol.

## Où obtenir de l'aide ?

- Demandez dans la [communauté DEV](https://dev.to/t/mol)
- Parcourez le [code source et les issues de $mol sur GitHub](https://github.com/hyoo-ru/mam_mol)
- Lisez la documentation de référence sur [mol.hyoo.ru](https://mol.hyoo.ru/)

## Sous quelle licence est-il ?

MIT. Vous pouvez utiliser $mol librement dans des projets commerciaux et open-source.
