# Versions

$mol est livré **en continu**. Plutôt que de découper des versions numérotées, le framework est distribué directement depuis le monorepo [mam_mol](https://github.com/hyoo-ru/mam_mol) — chaque changement fusionné est immédiatement disponible pour quiconque développe avec. L'outil de build MAM récupère toujours les sources actuelles, il n'y a donc pas d'étape de mise à niveau ni de matrice de versions à réconcilier.

## Suivre les changements

- **Historique des commits** — les [commits de mam_mol](https://github.com/hyoo-ru/mam_mol/commits/master) sont le journal des modifications canonique.
- **Historique par module** — chaque dossier de composant sur GitHub porte son propre journal de commits, vous pouvez donc surveiller uniquement les parties que vous utilisez.
- **Communauté DEV** — les ajouts et articles notables sont partagés sous le [tag #mol](https://dev.to/t/mol).

## Ce que cela signifie en pratique

Comme il n'y a pas de frontières de version cassantes, le framework privilégie une évolution rétrocompatible : les composants gagnent des fonctionnalités sans être renommés, et les interfaces typées `view.tree` font apparaître les incompatibilités à la compilation plutôt qu'à l'exécution. Si un build cesse de compiler après une mise à jour, les erreurs TypeScript vous pointent directement ce qui a changé.
