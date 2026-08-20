# Outillage

$mol fonctionne dans n'importe quel éditeur, mais un petit ensemble d'outils rend `.view.tree` et les styles typés bien plus confortables : un générateur de projet, un serveur de langage, des intégrations pour les éditeurs Zed et VS Code, et une compétence qui enseigne le framework aux assistants LLM.

## Générer un projet

`create-view-tree-lsp` génère un module $mol prêt à l'emploi pour que vous n'ayez pas à assembler le code standard à la main :

```bash
npx create-view-tree-lsp bog/myapp
```

L'argument est le chemin du module (`namespace/name`, ou son équivalent `bog_myapp`). Il écrit les `view.tree`, `view.ts`, `view.css.ts` et `index.html` d'une application fonctionnelle, ainsi que les GitHub Actions pour la déployer. Par défaut, il inclut aussi un stockage local-first **Giper Baza**, une configuration **Docker** et une enveloppe de bureau **Tauri**. Désactivez l'un ou l'autre avec un drapeau :

```bash
npx create-view-tree-lsp bog/myapp --no-baza --no-docker --no-tauri
```

Quelques éléments sont au contraire optionnels :

- `--backend` ajoute un backend REST `$mol_server` avec un stockage `node:sqlite` et un type d'item TypeScript partagé
- `--prerender` et `--seo` ajoutent la visibilité pour les moteurs de recherche, décrite plus bas sous [Intégration continue](#!section=docs/page=tooling/Docs.Body=Int%C3%A9gration%20continue)

Le générateur est une fine surcouche de la CLI du serveur de langage, si bien que `npx view-tree-lsp create bog/myapp` fait la même chose directement.

## Répartir les traductions

Un traducteur veut un fichier, pas trente. Une application compilée l'a déjà : `<app>/-/web.locale=<lang>.json` contient toutes les chaînes de tous les modules qu'elle embarque. Envoyez-le, récupérez-le traduit, puis répartissez-le de nouveau entre les modules :

```bash
# depuis la racine de MAM
npx view-tree-lsp locale bog/myapp/app/- --exclude=mol --update
```

Chaque clé porte son chemin de module, donc `$my_page_greeting` atterrit dans `my/page/page.locale=<lang>.json`, à côté des sources auxquelles elle appartient. L'argument est soit un dossier, soit un fichier de locale.

- `--include=<fragment>` — seulement les modules dont le chemin contient le fragment ; répétable
- `--exclude=<fragment>` — les ignorer ; `--exclude=mol` laisse intacts les paquets du framework
- `--update` — fusionner dans les fichiers existants : les valeurs entrantes l'emportent, les clés absentes de la source restent
- `--dry` — afficher le plan sans rien écrire

Résoudre une clé est plus subtil qu'il n'y paraît. `_` sépare aussi bien les dossiers que les mots : le plus long chemin correspondant n'est donc pas la bonne réponse. Dans `$my_page_lang_hint`, la propriété commence par `lang`, et un vrai sous-module `my/page/lang` voisin avalerait la clé. La commande demande donc à chaque module candidat quelles clés il déclare — MAM écrit exactement celles-là dans `<module>/-view.tree/*.locale=en.json` — et attribue la clé à son propriétaire.

## Intégration continue

Le générateur écrit les GitHub Actions dans `.github/workflows/`, de sorte qu'un nouveau projet se déploie et se publie sans configuration supplémentaire.

`deploy.yml` s'exécute à chaque push. Il construit l'application avec `hyoo-ru/mam_build`, publie `app/-` sur **GitHub Pages** depuis `main` et donne à chaque branche `feature/*` son propre dossier de prévisualisation — supprimé automatiquement à la suppression de la branche.

### SEO

Deux options indépendantes, toutes deux déclenchées par les tags `v*` :

- **`--prerender`** rend les écrans que vous listez (comme `home`) en HTML statique avec `b-on-g/mol-prerender-action`, afin que les robots et les aperçus de liens voient un vrai contenu.
- **`--seo`** ajoute le runtime `$bog_seo` : un routeur par pathname avec un sitemap, `robots.txt`, `llms.txt` et l'injection de métadonnées par page. Le job sert le build, extrait le HTML pré-rendu canonique et le réintègre dans le déploiement.

Optez pour l'action de prérendu quand une poignée d'écrans publics doivent être explorables, et pour `$bog_seo` quand vous avez besoin de sitemaps et de métadonnées par page.

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
