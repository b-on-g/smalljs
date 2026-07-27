# Outillage

$mol fonctionne dans n'importe quel éditeur, mais un petit ensemble d'outils rend `.view.tree` et les styles typés bien plus confortables : un générateur de projet, un serveur de langage et des intégrations pour les éditeurs Zed et VS Code.

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

## Liens

- Générateur — [create-view-tree-lsp](https://github.com/Dev-cmyser/create-view-tree-lsp)
- Serveur de langage — [view-tree-lsp](https://github.com/Dev-cmyser/view.tree)
- Extension Zed — [zed-view.tree-mol-support](https://github.com/Dev-cmyser/zed-view.tree-mol-support)
