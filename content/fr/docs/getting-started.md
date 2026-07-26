# Démarrage

Cette page vous mène d'un dossier vide à une application $mol réactive et fonctionnelle. Comptez environ quinze minutes. Chaque extrait ci-dessous est du code réel qui fonctionne — copiez-le tel quel.

## Ce qu'il vous faut

- **Node.js 18+** et **git**. C'est toute la liste.

Vous n'installez pas de CLI globale ni ne générez du code passe-partout qu'il vous faudra comprendre plus tard. Les applications $mol vivent à l'intérieur de l'espace de travail MAM, qui sait déjà comment les construire et les servir.

## 1. Récupérer l'espace de travail

MAM est l'outil de build et le registre de modules de $mol. Clonez-le et installez-le une seule fois.

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` lance le serveur de développement sur `http://localhost:9080/`. Il surveille vos fichiers et reconstruit automatiquement — laissez-le tourner dans son propre terminal.

## 2. Créer un module

Une application $mol n'est qu'un dossier. Choisissez un espace de noms (le vôtre, par ex. `my`) et un nom (`hello`).

```bash
mkdir -p my/hello
```

> **Une règle à retenir :** les traits de soulignement dans un nom de composant sont des séparateurs de dossiers. `$my_hello` vit dans `my/hello/`, `$my_hello_form` vivrait dans `my/hello/form/`. Les noms de dossiers de modules ne contiennent jamais de trait de soulignement.

Ajoutez maintenant trois fichiers dans `my/hello/`.

### index.html — le point d'entrée

```html
<!doctype html>
<html mol_view_root>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>
	<body mol_view_root>
		<div mol_view_root="$my_hello"></div>
		<script src="web.js"></script>
	</body>
</html>
```

L'attribut `mol_view_root="$my_hello"` monte votre composant au chargement de la page.

### hello.view.tree — la mise en page

```tree
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

Quelques points qui méritent d'être nommés.

- `$mol_page` et `$mol_string` sont des composants intégrés — une coquille de page et un champ de saisie de texte.
- `<=` lie une propriété dans un seul sens ; `<=>` la lie dans les deux sens. Ainsi `value? <=> name?` garde le champ et votre état `name` synchronisés.
- `@` marque une chaîne localisable ; `\` débute une chaîne brute.

### hello.view.ts — le comportement

```typescript
namespace $.$$ {
	export class $my_hello extends $.$my_hello {
		@ $mol_mem
		greeting() {
			const name = this.name()
			return name ? `Hello, ${name}!` : 'Please enter your name'
		}
	}
}
```

`@ $mol_mem` fait de `greeting` une propriété réactive et mise en cache. Elle lit `name()`, donc dès que `name` change, `greeting` se recalcule et le message à l'écran se met à jour. Vous n'avez jamais écrit d'abonnement, d'effet ni d'appel de re-rendu.

## 3. Lancer l'application

Le serveur de développement de l'étape 1 surveille déjà. Ouvrez simplement :

```
http://localhost:9080/my/hello/
```

Tapez votre nom — la salutation se met à jour au fil de la frappe. C'est la réactivité de $mol : l'état s'écoule vers la vue tout seul.

## 4. Ajouter une deuxième valeur réactive

La réactivité se compose. Ajoutez un compteur de longueur qui dépend du même `name`, sans câblage supplémentaire.

Dans `hello.view.tree`, ajoutez une ligne sous `Message` :

```tree
		<= Counter $mol_view
			sub / <= counter \
```

Dans `hello.view.ts`, ajoutez la méthode :

```typescript
		@ $mol_mem
		counter() {
			return `${this.name().length} characters`
		}
}
```

`greeting` et `counter` lisent tous deux `name` ; tous deux se mettent à jour ensemble. Ajoutez-en un troisième, ajoutez-en un dixième — le schéma ne change pas. Voilà pourquoi le code $mol reste plat à mesure que les fonctionnalités s'accumulent.

## 5. Vérifier votre build

MAM écrit un fichier de diagnostic à côté de chaque application. Après un build, ouvrez :

```
http://localhost:9080/my/hello/-/web.audit.js
```

Un audit propre signifie aucune dépendance inutilisée, aucun problème de type, rien à corriger. Prenez l'habitude d'y jeter un œil — il attrape les erreurs avant qu'elles n'atteignent un navigateur.

## Vous avez construit une application $mol

Vous disposez d'un composant réactif, d'une liaison bidirectionnelle et d'un état dérivé — avec trois petits fichiers et zéro configuration.

Continuez : le **[Guide](#!section=docs/page=installation)** couvre en profondeur l'installation, les vues, l'état, le routage et les données — et transforme ce Hello World en quelque chose de réel.
