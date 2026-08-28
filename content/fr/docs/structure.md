# Structure d'un projet

Un projet $mol a quatre niveaux imbriqués : l'**espace de travail** que vous avez cloné, les **paquets** qu'il contient, les **modules** dans ces paquets et les **fichiers** dans un module. Cette disposition répond à une question pratique — où va un nouveau projet et à qui appartient son historique — et presque tout ce que fait la compilation en découle.

```structure
mam/                         espace de travail — le clone de MAM
├── .meta.tree               registre : quel paquet vient de quel dépôt
├── mol/                     paquet — le framework lui-même, son propre dépôt git
└── my/                      paquet — le vôtre, votre propre dépôt git
    ├── .gitattributes       garde intacts les binaires compilés
    ├── my.meta.tree         registre de vos propres projets
    └── hello/               projet — un module, et un dépôt git à lui
        ├── index.html       point d'entrée (modules applicatifs seulement)
        ├── hello.view.tree
        └── form/            sous-module — $my_hello_form
```

Sur cette page, chaque ligne de la liste porte un point d'interrogation avec la raison de sa présence ; les sections plus bas disent la même chose en détail.

## Démarrer un projet

Cinq étapes. Seule la première se répète, et le générateur peut faire les trois dernières à votre place.

**1. Clonez l'espace de travail, une fois.** Tout ce que vous écrirez désormais vit à l'intérieur.

```bash
git clone https://github.com/hyoo-ru/mam.git
cd mam
```

**2. Créez votre propre paquet.** Un dossier court — votre nom, votre entreprise, votre pseudo — et un dépôt git à lui. C'est le conteneur de tous les projets que vous commencerez :

```bash
mkdir my
cd my
git init
```

Publiez-le là où vous gardez votre code, en public ou en privé. Ajoutez au passage un `.gitattributes` avec la seule ligne `* -text` ; la raison est plus bas, dans la section sur les paquets.

**3. Ajoutez le registre.** `my/my.meta.tree` est la liste des projets de votre paquet. Il commence vide et gagne une ligne par projet :

```tree
pack hello git \https://github.com/you/hello.git
```

MAM le lit exactement comme le `.meta.tree` de l'espace de travail un niveau au-dessus, si bien qu'un collègue qui clone `my/` récupère aussi les projets.

**4. Créez le projet, avec un dépôt à lui.** Le dossier est le composant — `my/hello/` c'est `$my_hello` — et son historique lui appartient, pas à votre paquet ni à $mol :

```bash
mkdir hello
cd hello
git init
```

Cette séparation est tout l'intérêt de la disposition : un commit dans `my/hello/` va au dépôt `hello`, jamais à `my` ni à `mol`.

**5. Déclarez-le.** Ajoutez la ligne `pack` de l'étape 3 dans `my/my.meta.tree`, et un clone frais de votre paquet récupérera le projet par son nom.

Le [générateur](#!section=docs/page=tooling) vous écrit un module fonctionnel à tout moment après l'étape 2 :

```bash
npx create-view-tree-lsp my/hello
```

## Espace de travail

Vous clonez MAM une fois et vous travaillez dedans. Ce n'est pas un dossier où les dépendances sont copiées : chaque paquet y est un clone git à part entière, avec son historique, si bien que vous pouvez lire les sources du framework, y placer un `debugger` et ouvrir une pull request depuis la même copie de travail.

Le `.meta.tree` racine est le registre qui rend cela possible :

```tree
pack mol git \https://github.com/hyoo-ru/mam_mol.git
pack hyoo git \https://github.com/hyoo-ru/mam_hyoo.git
pack lib git \https://github.com/hyoo-ru/mam_lib.git
```

Quand le build rencontre `$mol_view` et qu'aucun dossier `mol/` n'existe encore, il cherche le nom ici et clone le dépôt. Rien n'est vendorisé et rien n'est aplati.

## Paquets

Un dossier de premier niveau est un paquet, et un paquet est un dépôt git. Votre propre paquet n'est qu'un dossier que vous nommez : tant qu'il reste local, il n'a besoin d'aucun enregistrement, et d'une ligne `pack` le jour où vous voudrez le récupérer par son nom.

Les paquets s'imbriquent. Un paquet peut porter ses propres déclarations `pack` pour les dossiers qu'il contient, et MAM les lit dans le `meta.tree` du dossier qui contiendra le paquet. Ce site vit dans `bog/smalljs/` et constitue un dépôt à lui seul, listé dans `bog/bog.meta.tree`, lui-même situé dans le clone `bog/` listé dans le `.meta.tree` racine.

### Un fichier dont chaque paquet a besoin

Un paquet qui est déployé a besoin d'un `.gitattributes` contenant une seule ligne :

```
* -text
```

Cela désactive la normalisation des fins de ligne par git. C'est important parce que déployer signifie committer la sortie du build dans une branche, et cette sortie n'est pas seulement du texte : ce site embarque 57 fichiers binaires, les polices qu'il héberge lui-même et une image d'aperçu par page. Normalisés à l'entrée, ils arrivent au lecteur sous forme d'images et de polices cassées, tandis que le build, lui, reste au vert. Le clone de MAM porte le même fichier à sa racine, où les formats de police sont en plus marqués `binary`.

Le générateur l'écrit pour vous ; dans un dépôt que vous avez démarré vous-même, ajoutez-le à la main.

## Modules

Un module est un dossier, et un dossier est un composant. Il n'y a ni instruction d'import ni carte des modules : le nom de la classe *est* l'adresse, et chaque tiret bas qu'il contient est un séparateur de dossier :

```
$my_hello          →  my/hello/
$my_hello_form     →  my/hello/form/
$mol_button_major  →  mol/button/major/
$mol_after_frame   →  mol/after/frame/
```

C'est toute la règle de résolution. Le builder parcourt votre texte source à la recherche des jetons `$name`, découpe chacun sur `_` et suit les dossiers. Rien ne déclare de dépendance ; utiliser un nom, c'est la déclarer.

La conséquence pratique : **les noms de dossiers de modules ne contiennent jamais de tiret bas.** Un dossier nommé `my/hello_form/` serait cherché sous `my/hello/form/` et jamais trouvé — le symptôme est une classe qui compile dans votre éditeur mais manque dans le bundle.

Un module qui a des sous-modules peut lui-même rester un composant, sous l'une de deux formes. `$mol_button` vit directement dans `mol/button/`, à côté de `major/` et `minor/`. `$mol_view` vit un niveau plus bas, dans `mol/view/view/`, parce que `mol/view/` abrite aussi `component/`, `selection/` et `tree2/`. MAM essaie d'abord le chemin doublé et retombe sur le plus court, de sorte que les deux dispositions se résolvent.

## Fichiers d'un module

Chaque fichier est optionnel. Un module, c'est l'ensemble des fichiers qui s'y trouvent.

| Fichier | Rôle |
|------|---------|
| `hello.view.tree` | Mise en page déclarative |
| `hello.view.ts` | Comportement : la classe qui étend la base générée |
| `hello.view.css.ts` | Styles typés. Notez le `.ts` final : c'est du TypeScript qui appelle `$mol_style_define`, pas une feuille de style |
| `hello.ts` | Un module sans aucune vue — modèles, utilitaires, logique pure |
| `hello.test.ts` | Tests, exécutés par le builder |
| `hello.locale=ru.json` | Traductions ; tout fichier finissant par `.locale=<lang>.json` est pris en compte |
| `hello.meta.tree` | Directives de build et de déploiement |
| `index.html` | Point d'entrée — seul un module d'application en a besoin |

Un suffixe placé avant l'extension restreint un fichier à un seul environnement :

- `frame.web.ts` — bundle navigateur uniquement, comme `mol/after/frame/frame.web.ts`
- `build.node.ts` — bundle Node uniquement, comme le builder de MAM lui-même
- `hello.test.ts` — bundles de test uniquement

Le builder produit un bundle `web` et un bundle `node` pour chaque application et écarte les fichiers marqués pour l'autre, si bien que le code spécifique à une plateforme n'a jamais à se protéger à l'exécution.

Des fichiers `.css` bruts sont également acceptés à côté d'un module — le framework s'en sert pour les quelques choses que les styles typés ne savent pas exprimer, comme `@keyframes` et `content:`. Tout le reste appartient à `.view.css.ts`, où les noms de propriétés sont vérifiés.

## Les dossiers générés commencent par un tiret

MAM ne considère un nom comme une source que s'il commence par une lettre ou un chiffre. Tout le reste est invisible pour le build, et c'est pourquoi chaque dossier généré est préfixé par `-` : la sortie peut se poser juste à côté de son entrée sans être relue comme une entrée. Le `.gitignore` de l'espace de travail ignore `-*` pour la même raison.

**`-view.tree/`** apparaît à côté de tout fichier `.view.tree` et contient ce vers quoi l'arbre compile :

```
my/hello/-view.tree/
├── hello.view.tree.js            la classe de base générée
├── hello.view.tree.d.ts          son interface typée
└── hello.view.tree.locale=en.json  les chaînes @, extraites
```

Votre `hello.view.ts` étend la classe qui s'y trouve. C'est toute la relation entre les deux fichiers — [De TypeScript à view.tree](#!section=docs/page=from-ts-to-view-tree) parcourt le code généré ligne par ligne.

**`-css/`** apparaît à côté d'un fichier `.css` brut et contient un `.ts` généré qui enveloppe la feuille de style dans un appel à `$mol_style_attach`, pour qu'elle voyage avec le bundle au lieu d'exiger un `<link>`.

**`-/`** est la sortie du build d'un module que vous avez construit. Pour une application, elle contient `web.js`, `web.css`, `web.audit.js`, `web.d.ts`, `web.deps.json`, un `web.locale=<lang>.json` par langue, les équivalents `node`, un `index.html` réécrit, ainsi qu'un `package.json` et un `manifest.json` générés. C'est ce dossier que vous déployez : publier `app/-` sur un hébergement statique constitue toute l'étape de déploiement.

Rien de tout cela ne se modifie à la main. Le builder réécrit ces fichiers dès que leur source change, donc une modification faite là disparaît à la prochaine sauvegarde, sans la moindre erreur pour vous dire pourquoi. Modifiez le `.view.tree`, le `.css` ou les sources, puis reconstruisez.

## Ce que fait réellement meta.tree

`meta.tree` n'est pas un manifeste de paquet et ne liste pas de dépendances — celles-ci viennent du code, où un jeton `$mol_view` constitue déjà toute la déclaration. Il porte la poignée de choses que le code ne peut pas énoncer lui-même. Le `app/app.meta.tree` de ce site, dans son intégralité :

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

- **`deploy \/path`** copie un fichier ou un dossier dans `-/` en conservant son chemin relatif à l'espace de travail : `\/bog/smalljs/assets` atterrit dans `app/-/bog/smalljs/assets/`. Pour les fichiers statiques que le déploiement doit transporter mais qu'aucun code n'importe : images, polices, icônes.
- **`include \/path`** et **`require \/path`** forcent l'entrée d'un module que rien ne référence, comme `\/mol/offline/install`, dont toute la raison d'être est le service worker qu'il enregistre au chargement. Ils ne diffèrent que par l'ordre : `require` place le module avant le code qui l'a tiré, `include` après.
- **`pack <name> git \<url>`** est l'entrée de registre décrite plus haut, lue dans le fichier meta du dossier qui contiendra le paquet.

MAM lit tous les fichiers `*.meta.tree` d'un dossier, le nom ne porte donc aucun sens au-delà de la convention : `<module>.meta.tree` à côté d'un module, `.meta.tree` à la racine de l'espace de travail.

En pratique, `deploy`, `include` et `require` appartiennent au module d'application, puisque c'est lui qu'on construit et déploie ; les composants ordinaires résolvent tout depuis leur code et n'ont besoin d'aucun fichier meta. Un module de bibliothèque n'en reçoit un que s'il a vraiment une dépendance non référencée : `mol/assert/assert.meta.tree` tient en une seule ligne `include \/mol/dev/format`, et c'est une taille typique.

Voir [Métadonnées de module](#!section=docs/page=meta) pour en savoir plus sur les directives.

## Suite

[Installation](#!section=docs/page=installation) couvre le serveur de développement et le build de production, et [Outillage](#!section=docs/page=tooling) présente un générateur qui écrit pour vous une structure de module correcte.
