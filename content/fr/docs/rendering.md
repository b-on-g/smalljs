# Rendu

Ce chapitre traite de ce qui se passe entre le changement de votre état réactif et la mise à jour des pixels à l'écran. Vous avez rarement à y penser — mais comprendre le modèle explique pourquoi le code $mol reste rapide sans effort particulier.

## Pas de DOM virtuel

$mol ne compare pas un arbre virtuel. Chaque propriété de vue est liée directement au nœud ou à l'attribut DOM qu'elle contrôle, à travers les mêmes cellules réactives que vous avez déjà rencontrées dans [État](#!section=docs/page=state). Quand une cellule change, seules les liaisons exactes qui la lisent se ré-exécutent — pas un sous-arbre, pas une fonction de composant, juste les propriétés affectées.

Cela signifie qu'il n'y a pas de passe de réconciliation à optimiser, pas de clés à régler à la main pour un diff de liste, et pas de `memo`/`shouldComponentUpdate` à invoquer. Le graphe de dépendances connaît déjà l'ensemble minimal de mises à jour.

## Les composants sont paresseux

Une vue n'est construite que lorsque quelque chose la demande. Un écran vers lequel vous ne naviguez jamais n'est jamais construit ; un onglet que vous n'ouvrez jamais ne coûte rien. Parce que la construction est à la demande et mise en cache, composer de grands arbres de composants est peu coûteux — les parties dont on n'a pas besoin n'existent tout simplement pas encore.

## Le rendu est virtualisé

$mol ne rend que ce qui se trouve dans la zone visible. Les composants sortis de la vue ne sont pas conservés comme DOM caché — ils ne sont pas créés du tout, et sont construits au moment où ils entrent dans la plage visible. C'est une propriété architecturale du framework, pas une fonctionnalité optionnelle ni un composant de liste spécial : toute mise en page est virtualisée, donc une liste de dix éléments et une liste de dix mille coûtent à peu près autant à afficher.

L'effet pratique est que vous écrivez des arbres de composants ordinaires et de longues listes sans recourir à des bibliothèques de fenêtrage.

## Chiffres reproductibles

Les affirmations de performance ne sont utiles que si vous pouvez les reproduire. Plutôt que de citer des chiffres ici, $mol participe au **js-framework-benchmark** communautaire ; vous pouvez en lire les résultats et relancer la suite vous-même :

[Résultats de js-framework-benchmark](https://nin-jin.github.io/js-framework-benchmark/webdriver-ts-results/table.html)

Considérez cela comme la source de vérité pour les comparaisons — mesurée, versionnée et indépendante de cette page.

## Suite

Cela complète le modèle de base du fonctionnement de $mol. Ensuite, mettez-le à l'œuvre pour charger de vraies données dans [Récupération de données](#!section=docs/page=data).
