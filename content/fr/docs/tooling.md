# Outillage

$mol fonctionne dans n'importe quel éditeur, mais un petit ensemble d'outils rend `.view.tree` et les styles typés bien plus confortables : un générateur de projet, un serveur de langage, des intégrations pour les éditeurs Zed et VS Code, et une compétence qui enseigne le framework aux assistants LLM.

## Générer un projet

`create-view-tree-lsp` génère un module $mol prêt à l'emploi pour que vous n'ayez pas à assembler le code standard à la main :

```bash
npx create-view-tree-lsp bog/myapp
```

Lancez-le à la racine de votre copie de MAM : les chemins de modules partent de là, et c'est là que le projet doit vivre. Hors d'un workspace, la commande prévient au lieu de vous laisser le découvrir au premier build.

L'argument est le chemin du module (`namespace/name`, ou son équivalent `bog_myapp`). Il écrit les `view.tree`, `view.ts`, `view.css.ts` et `index.html` d'une application fonctionnelle, ainsi que les GitHub Actions pour la déployer.

Tout ce que le générateur sait ajouter est inclus par défaut. Vous ne nommez que ce dont vous ne voulez pas :

```bash
npx create-view-tree-lsp bog/myapp --no-tauri --no-backend
```

- `--no-baza` — un stockage local-first **Giper Baza**
- `--no-docker` — une configuration **Docker** avec `docker-compose.yml` et une config nginx
- `--no-tauri` — une enveloppe de bureau **Tauri**
- `--no-backend` — un backend REST `$mol_server` avec un stockage `node:sqlite` et un type d'item TypeScript partagé
- `--no-prerender`, `--no-seo` — la visibilité pour les moteurs de recherche, décrite plus bas sous [Intégration continue](#!section=docs/page=tooling/Docs.Body=Int%C3%A9gration%20continue)

Un drapeau inconnu interrompt l'exécution : une faute de frappe ne peut pas laisser quelque chose en douce.

Le générateur est une fine surcouche de la CLI du serveur de langage, si bien que `npx view-tree-lsp create bog/myapp` fait la même chose directement.

## Traductions

Les traductions vivent à côté de leur module, dans `<module>/<nom>.locale=<lang>.json`. Cela arrange le code, beaucoup moins le traducteur : au lieu d'une liste de phrases, il reçoit trente petits fichiers.

**[$yuf_localizer](https://zerkalica.github.io/yuf/#!demo=yuf_localizer_demo)** comble cet écart. Donnez-lui les URL de vos projets et les codes de langue, et il affiche toutes les clés dans une liste unique avec recherche, en signalant ce qui reste à faire : les clés qui n'existent qu'en anglais, celles que vous avez modifiées sans les valider, et les clés périmées que le projet ne connaît plus. Les traductions restent dans le navigateur jusqu'à l'export, rien ne se perd entre deux séances.

Une fois le traducteur satisfait, exportez le résultat et répartissez-le de nouveau entre les modules :

```bash
# depuis la racine de MAM
npx view-tree-lsp locale bog/myapp/app/- --exclude=mol --update
```

L'argument est un dossier ou un fichier de locale. Options :

- `--include=` prend un fragment de chemin et ne garde que les modules dont le chemin le contient ; répétable à volonté
- `--exclude=` les ignore au contraire — `--exclude=mol` laisse intacts les paquets du framework
- `--update` fusionne dans les fichiers existants : les valeurs entrantes l'emportent, les clés absentes de la source restent
- `--dry` affiche le plan sans rien écrire

Chaque clé porte son chemin de module, donc `$my_page_greeting` atterrit dans `my/page/page.locale=ru.json`, à côté des sources auxquelles elle appartient. Déterminer ce module est pourtant plus subtil qu'il n'y paraît : `_` sépare aussi bien les dossiers que les mots, le plus long chemin correspondant est donc une mauvaise réponse. Dans `$my_page_lang_hint`, la propriété commence par `lang`, et un vrai sous-module `my/page/lang` voisin avalerait la clé. La commande demande donc à chaque module candidat quelles clés il déclare — MAM écrit exactement celles-là dans son fichier de locale sous `-view.tree` — et attribue la clé à son propriétaire.

## Intégration continue

Le générateur écrit les GitHub Actions dans `.github/workflows/`, de sorte qu'un nouveau projet se déploie et se publie sans configuration supplémentaire.

`deploy.yml` s'exécute à chaque push. Il construit l'application avec `hyoo-ru/mam_build`, publie `app/-` sur **GitHub Pages** depuis `main` et donne à chaque branche `feature/*` son propre dossier de prévisualisation — supprimé automatiquement à la suppression de la branche.

### SEO

Les deux sont actifs par défaut et se déclenchent sur les tags `v*` :

- **`--no-prerender`** retire l'étape qui rend en HTML statique les écrans que vous listez (comme `home`) avec `b-on-g/mol-prerender-action` — précisément ce qui fait que les crawlers et les aperçus de liens voient du vrai contenu.
- **`--no-seo`** retire le runtime `$bog_seo` : un routeur par pathname avec sitemap, `robots.txt`, `llms.txt` et injection de méta par page. Le job sert le build, exporte le HTML prérendu canonique et le replie dans le déploiement.

Ils couvrent le même terrain et écrivent dans le même dossier, donc un seul atterrit dans `deploy.yml` : `$bog_seo` tant qu'il est actif, l'action de prérendu dès que vous passez `--no-seo`. Gardez `$bog_seo` quand il vous faut des sitemaps et des métadonnées par page, et rabattez-vous sur l'action de prérendu quand une poignée d'écrans publics suffit.

### Bureau Tauri

Avec l'option Tauri, `tauri.yml` construit des binaires de bureau sur les tags `v*` (ou à la demande) via le workflow réutilisable `b-on-g/tauri-mol-workflow-template`, à partir du même module que celui que vous déployez sur le web.

## Serveur de langage

`view-tree-lsp` est une implémentation du Language Server Protocol pour le format `view.tree`. Lancez-le à la demande avec npx, sans installation globale :

```bash
npx view-tree-lsp@latest
```

Il analyse votre espace de travail et offre à tout éditeur compatible LSP :

- la complétion des composants `$mol_*` ainsi que des composants et propriétés définis dans votre propre projet
- des suggestions de propriétés limitées au composant sous le curseur
- un plan des déclarations de composants pour la navigation
- des mises à jour en direct à mesure que les fichiers changent

Comme il parle LSP, vous pouvez pointer le client de langage de n'importe quel éditeur vers `npx view-tree-lsp`. Les deux intégrations ci-dessous le câblent pour vous.

## Zed

L'extension **View Tree Syntax Highlighting for $mol** regroupe la grammaire tree-sitter, le serveur de langage et un thème d'icônes optionnel. Installez-la depuis le gestionnaire d'extensions de Zed :

1. Ouvrez la palette de commandes (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Exécutez **zed: extensions**
3. Recherchez `view.tree` ou `mol` et installez l'extension

Vous obtenez la coloration syntaxique, la complétion et le plan pour les fichiers `.view.tree`. Les [sources](https://github.com/Dev-cmyser/zed-view.tree-mol-support) et un [thème d'icônes](https://github.com/Dev-cmyser/zed-viewtree-icon-theme) assorti sont sur GitHub.

## VS Code

L'espace de travail MAM embarque déjà sa configuration VS Code. Quand vous ouvrez le dossier `mam` cloné, VS Code propose d'installer les extensions recommandées depuis `.vscode/extensions.json` :

- `nin-jin.vscode-language-tree` — prise en charge du langage `view.tree`
- `stan-donarise.view-tree-language` — syntaxe et grammaire
- `editorconfig.editorconfig` — formatage cohérent

Le même dossier fournit `mol.code-snippets`, si bien que les snippets de composants et de bindings sont disponibles sans aucune configuration supplémentaire. Acceptez l'invite et les fichiers `.view.tree` et TypeScript sont mis en évidence d'emblée.

## Compétence LLM

`mol_skill` donne à un assistant IA le contexte nécessaire pour écrire du $mol : la syntaxe `view.tree`, la structure d'un module MAM, la répartition entre `view.ts` et `view.css.ts`, la modélisation des données avec Giper Baza et l'empaquetage Tauri. C'est un simple dossier de compétence, un flux `SKILL.md` accompagné de guides de référence, donc n'importe quel outil LLM qui lit le format skills peut le charger, Claude Code et Cursor compris. Installez-le avec la CLI skills :

```bash
npx skills add b-on-g/mol_skill --all -g
```

Posez ensuite vos questions avec vos propres mots (« structure d'un module MAM », « CRUD et rôles avec Giper Baza ») : l'assistant ouvre la référence correspondante avant de répondre, et le code qu'il écrit suit les conventions de cette documentation. Le [code source](https://github.com/b-on-g/mol_skill) est sur GitHub, et les fichiers de référence se lisent très bien seuls si vous préférez les parcourir vous-même.

## Liens

- Générateur — [create-view-tree-lsp](https://github.com/Dev-cmyser/create-view-tree-lsp)
- Serveur de langage — [view-tree-lsp](https://github.com/Dev-cmyser/view.tree)
- Extension Zed — [zed-view.tree-mol-support](https://github.com/Dev-cmyser/zed-view.tree-mol-support)
- Compétence LLM — [mol_skill](https://github.com/b-on-g/mol_skill)
