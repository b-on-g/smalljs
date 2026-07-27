# Métadonnées de module

À côté des composants d'un module, un fichier `name.meta.tree` déclare des **métadonnées de build et de déploiement** — des éléments qui concernent le module dans son ensemble plutôt qu'une vue particulière. Le module d'application est l'endroit habituel pour cela.

Voici le `app.meta.tree` de ce site :

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

## Directives

- **`deploy \/path`** — copie le fichier ou dossier nommé dans la sortie de build de production. Utilisez-le pour les ressources statiques que le déploiement doit emporter mais qu'aucun code n'importe — images, polices, icônes. Ici `\/bog/smalljs/assets` embarque le logo et d'autres fichiers sous `assets/`.
- **`require \/path`** — force un module dans le bundle même quand aucun code n'y fait référence, pour le cas où le code de ce module doit s'exécuter **avant** le code du module qui contient ce `meta.tree`. Il est intégré comme une dépendance normale, de haute priorité. Un chemin de module (`\/mol/wire/patch`) ou un fichier unique fonctionnent tous les deux.
- **`include \/path`** — le même inclus forcé, mais pour quand l'ordre de chargement n'a pas d'importance. Le module est intégré mais dépriorisé, donc il se charge après le code qui en dépend. Exemples : `include \/mol/offline/install` (enregistre un service worker comme effet de bord) et `include \/bog/builderui/theme.css` (une feuille de style brute).
- **`pack <name> git \<url>`** — associe un espace de noms au dépôt git depuis lequel MAM le récupère, p. ex. `pack mol git \https://github.com/hyoo-ru/mam_mol.git`. C'est ainsi que `$mol_*`, `$hyoo_*` et vos propres paquets se résolvent en code réel.

Pourquoi forcer un include ? Le builder détermine les dépendances automatiquement et n'intègre que ce que votre code utilise réellement. Occasionnellement, vous avez besoin d'un module que votre code ne référence *pas* — par exemple une application qui embarque tout un catalogue de composants pour qu'ils existent à l'exécution. `require` et `include` couvrent exactement ce cas ; ils ne diffèrent que par l'ordre de chargement.

## Où cela vit

Les déclarations `pack` appartiennent au `.meta.tree` de la **racine de l'espace de travail** — c'est le registre de chaque paquet que l'espace de travail peut récupérer. Gardez-les là, pas dans les sous-modules ; le `meta.tree` propre à un sous-module ne devrait porter que les `require`/`include`/`deploy` qui lui sont spécifiques.
