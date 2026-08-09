# Démarrage

Cette page vous mène d'un dossier vide à une application $mol réactive et fonctionnelle. Comptez environ quinze minutes. Chaque extrait ci-dessous est du code réel qui fonctionne — copiez-le tel quel.

Vous écrirez le composant en TypeScript ordinaire. $mol dispose aussi d'un format plus court pour décrire les composants, `view.tree`, que vous rencontrerez à la page suivante. Rien ici n'en a besoin : un composant $mol reste une classe ordinaire dans les deux cas.

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

Ajoutez maintenant deux fichiers dans `my/hello/`.

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

### hello.view.ts — le composant

```typescript
namespace $ {

	export class $my_hello extends $mol_page {

		title() {
			return 'Greeting'
		}

		body() {
			return [ this.Name(), this.Message() ]
		}

		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}

		@ $mol_mem
		name( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.greeting() ]
			return obj
		}

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

Lisez-le de haut en bas :

- `$my_hello` vit dans `namespace $`, l'espace de noms ambiant qui contient tous les composants $mol. Il étend `$mol_page`, une coquille de page intégrée avec un titre et un corps. `$mol_string` plus bas est le champ de saisie de texte intégré.
- `body()` renvoie les enfants. Ici un enfant n'est pas du balisage mais une propriété : `Name` et `Message` sont des méthodes que vous pouvez appeler, redéfinir dans une sous-classe ou cibler par leur nom depuis une feuille de style.
- `Name()` construit le champ et le câble. Chacune de ses propriétés reçoit une **flèche**, pas une valeur. L'enfant appelle cette flèche au moment où il a besoin de la donnée, il lit donc toujours la version courante.
- `name( next?: string )` est l'état. Appelée sans argument, la méthode lit ; avec un argument, elle écrit. C'est parce que cette fonction entière est confiée à `obj.value` que la frappe dans le champ met `name` à jour.
- `@ $mol_mem` met une propriété en cache par instance. Sur `name`, cela signifie que la valeur est conservée et que tout ce qui l'a lue est recalculé quand elle change. Sur `Name` et `Message`, cela signifie un seul composant enfant, construit une fois, au lieu d'un nouveau à chaque appel.
- `greeting()` lit `name()`. Cette lecture *est* l'abonnement. Quand `name` change, `greeting` se recalcule et le texte à l'écran suit, sans effet à déclarer, sans liste de dépendances et sans appel de re-rendu.

## 3. Lancer l'application

Le serveur de développement de l'étape 1 surveille déjà. Ouvrez simplement :

```
http://localhost:9080/my/hello/
```

Tapez votre nom et la salutation se met à jour au fil de la frappe. C'est la réactivité de $mol : l'état s'écoule vers la vue tout seul.

## 4. Ajouter une deuxième valeur réactive

La réactivité se compose. Ajoutez un compteur de longueur qui lit le même `name`, sans câblage supplémentaire.

Placez-le dans `body()` :

```typescript
		body() {
			return [ this.Name(), this.Message(), this.Counter() ]
		}
```

puis ajoutez les deux propriétés derrière :

```typescript
		@ $mol_mem
		Counter() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.counter() ]
			return obj
		}

		counter() {
			return `${ this.name().length } characters`
		}
```

`greeting` et `counter` lisent tous deux `name`, et tous deux se mettent à jour ensemble. Ajoutez-en un troisième, ajoutez-en un dixième : la moitié réactive ne change jamais de forme.

L'autre moitié, si. Trois lignes de logique sont arrivées avec six lignes de plomberie autour — une fabrique, un `new`, une flèche, un `return obj`. Multipliez cela par chaque enfant d'un écran réel et vous tenez la raison d'être de `view.tree`.

## 5. Vérifier votre build

MAM écrit un fichier de diagnostic à côté de chaque application. Après un build, ouvrez :

```
http://localhost:9080/my/hello/-/web.audit.js
```

Un audit propre signifie aucune dépendance inutilisée, aucun problème de type, rien à corriger. Prenez l'habitude d'y jeter un œil — il attrape les erreurs avant qu'elles n'atteignent un navigateur.

## Vous avez construit une application $mol

Un composant réactif avec liaison bidirectionnelle et état dérivé, dans un seul fichier, avec zéro configuration.

Reprenez maintenant ce même fichier et regardez-le rétrécir : **[De TypeScript à view.tree](#!section=docs/page=from-ts-to-view-tree)**.
