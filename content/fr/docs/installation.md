# Installation

[Prise en main](#!section=docs/page=getting-started) vous guide pas à pas dans votre première application. Cette page est la référence : comment un projet $mol est organisé et comment fonctionne la compilation.

## Prérequis

- **Node.js 24+** et **git**. Rien d'autre n'est installé globalement.

## L'espace de travail MAM

Les applications $mol vivent dans **MAM** — l'outil de build et le registre de modules. Vous le clonez une fois et développez vos modules à l'intérieur :

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` lance un serveur de développement en mode surveillance sur `http://localhost:9080/`. Il recompile à chaque enregistrement et résout les dépendances automatiquement — vous ne maintenez jamais de configuration de bundler.

Il existe aussi le démarrage rapide officiel du [README de MAM](https://github.com/hyoo-ru/mam#quick-start), sans clonage :

```bash
mkdir mam && cd mam
npm exec mam@latest
```

Il lance le même serveur de dev dans un dossier vide. Nous recommandons quand même le clone : tout le travail se fait de toute façon dans MAM, et le clone apporte d'emblée les réglages de l'éditeur (`.vscode`) et `.npmrc`.

### Dans le navigateur

Rien d'installé sur votre machine ? Ouvrez l'espace de travail dans GitHub Codespaces : [codespaces.new/hyoo-ru/mam](https://codespaces.new/hyoo-ru/mam). C'est VS Code dans le navigateur, sur une machine GitHub où Node.js est déjà présent. Lancez `npm install` puis `npm start` dans son terminal et ouvrez le port 9080 redirigé.

## Comment les modules sont nommés

Chaque nom de composant correspond à un chemin de dossier, et **chaque tiret bas est un séparateur de dossier** :

```
$my_app          →  my/app/
$my_app_header   →  my/app/header/
```

Les noms de dossiers de modules ne contiennent jamais de tiret bas — utilisez des dossiers imbriqués pour les noms à plusieurs mots. Si un composant que vous utilisez n'apparaît jamais dans le bundle, c'est presque toujours que le chemin du dossier ne correspond pas au nom de la classe.

## Anatomie d'un module

Un composant est un dossier de fichiers. Les principaux :

| Fichier | Rôle |
|------|------|
| `name.view.tree` | Mise en page déclarative |
| `name.view.ts` | Comportement (TypeScript) |
| `name.view.css.ts` | Styles typés |
| `index.html` | Point d'entrée d'un module d'application |
| `name.view.css` | CSS brut : `@keyframes`, `content`, valeurs de variables CSS |
| `name.test.ts` | Tests |
| `name.meta.tree` | Méta du module : fichiers à `deploy`, packs supplémentaires |

L'`index.html` d'une application monte le composant racine :

```html
<body mol_view_root>
	<div mol_view_root="$my_app"></div>
	<script src="web.js"></script>
</body>
```

## Compilation pour la production

Le serveur de développement compile à la volée, mais vous pouvez compiler n'importe quel module explicitement depuis la racine de l'espace de travail :

```bash
npm start my/app
```

Le résultat est produit dans `my/app/-/` — y compris `web.js`, `web.css` et `web.audit.js`. **Vérifiez toujours l'audit :** un `web.audit.js` propre signifie aucune dépendance inutilisée et aucune erreur de type.

## Ajouter des paquets npm

Référencez un paquet avec `require` et MAM l'installe à la prochaine compilation et le met dans le bundle :

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

### Charger un paquet à l'exécution

Une bibliothèque lourde dont un seul écran a besoin n'a pas à se trouver dans `web.js`. Livrez son fichier navigateur précompilé à côté du bundle et chargez-le à la première utilisation.

Déclarez le fichier dans le `meta.tree` du module :

```tree
deploy \/node_modules/@turf/turf/turf.min.js
```

`deploy` installe le paquet s'il manque et copie le fichier dans `-/node_modules/@turf/turf/turf.min.js`, aussi bien sur le serveur de dev que dans la compilation de production. Chargez-le avec `$mol_import.script` :

```typescript
namespace $ {
	export class $my_app_turf extends $mol_object {

		@ $mol_mem
		static api() {
			$mol_import.script( './node_modules/@turf/turf/turf.min.js' )
			return ( globalThis as any ).turf as typeof import(
				'@turf/turf'
			)
		}

	}
}
```

- Le chemin est relatif et se résout par rapport à la page dans `-/`, donc le même code fonctionne sur le serveur de dev, dans `test.html` et lors d'un déploiement sous un sous-chemin. Un `/` initial ne marche que tant que l'application est à la racine du domaine.
- `$mol_import.script` suspend la fibre jusqu'au chargement du script et met en cache par URL : le fichier est récupéré une seule fois, et tout ce qui lit `$my_app_turf.api()` dans un `$mol_mem` l'attend simplement.
- Le nom global, ici `turf`, est celui qu'assigne le build navigateur de la bibliothèque. Son README indique lequel.
- `typeof import( … )` donne un typage complet. Gardez le nom du paquet sur sa propre ligne : le builder considère `require( '…' )` et `import( '…' )` écrits sur une seule ligne comme une dépendance et mettrait finalement tout le paquet dans `web.js`.

## Suite

L'espace de travail en place, apprenez comment l'interface elle-même est décrite — continuez vers [Vues](#!section=docs/page=views).
