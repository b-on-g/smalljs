# Installation

[Prise en main](#!section=docs/page=getting-started) vous guide pas à pas dans votre première application. Cette page est la référence : comment un projet $mol est organisé et comment fonctionne la compilation.

## Prérequis

- **Node.js 18+** et **git**. Rien d'autre n'est installé globalement.

## L'espace de travail MAM

Les applications $mol vivent dans **MAM** — l'outil de build et le registre de modules. Vous le clonez une fois et développez vos modules à l'intérieur :

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` lance un serveur de développement en mode surveillance sur `http://localhost:9080/`. Il recompile à chaque enregistrement et résout les dépendances automatiquement — vous ne maintenez jamais de configuration de bundler.

## Comment les modules sont nommés

Chaque nom de composant correspond à un chemin de dossier, et **chaque tiret bas est un séparateur de dossier** :

```
$my_app          →  my/app/
$my_app_header   →  my/app/header/
```

Les noms de dossiers de modules ne contiennent jamais de tiret bas — utilisez des dossiers imbriqués pour les noms à plusieurs mots. Si un composant que vous utilisez n'apparaît jamais dans le bundle, c'est presque toujours que le chemin du dossier ne correspond pas au nom de la classe.

## Anatomie d'un module

Un composant est un dossier comportant jusqu'à quatre fichiers :

| Fichier | Rôle |
|------|------|
| `name.view.tree` | Mise en page déclarative |
| `name.view.ts` | Comportement (TypeScript) |
| `name.view.css.ts` | Styles typés |
| `name.view.tree`, `index.html` | Point d'entrée d'un module d'application |

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
npm run start my/app
```

Le résultat est produit dans `my/app/-/` — y compris `web.js`, `web.css` et `web.audit.js`. **Vérifiez toujours l'audit :** un `web.audit.js` propre signifie aucune dépendance inutilisée et aucune erreur de type.

## Ajouter des paquets npm

Référencez un paquet avec `require` et MAM l'installe à la prochaine compilation :

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

## Suite

L'espace de travail en place, apprenez comment l'interface elle-même est décrite — continuez vers [Vues](#!section=docs/page=views).
