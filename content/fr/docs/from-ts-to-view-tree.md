# De TypeScript à view.tree

Le composant que vous avez écrit au [Démarrage](#!section=docs/page=getting-started) est une classe TypeScript ordinaire. Il compile, il tourne, et c'est une façon prise en charge de décrire un composant $mol — l'une des plusieurs que le framework accepte.

Il vous a aussi demandé de garder en tête quatre choses qui n'ont rien à voir avec ce que le composant fait. Cette page les prend une par une et montre la ligne de `view.tree` qui supprime chacune d'elles. Puis elle montre le code que le compilateur génère, pour que vous puissiez vérifier que l'arbre n'est pas un second runtime : il produit la classe que vous avez déjà écrite.

Voici ce fichier à nouveau, pour comparer :

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

## L'enfant, c'est à vous de le construire, et de le mettre en cache

Six de ces lignes sont une fabrique :

```typescript
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}
```

Supprimez `@ $mol_mem` : cela compile toujours. Mais ce n'est plus un composant unique. `this.Name() !== this.Name()`, parce que le corps exécute `new` à chaque appel. Le dernier qui lit la propriété gagne, les instances précédentes gardent tout ce qu'elles avaient accumulé, et personne ne les libère — $mol ne possède que les objets qu'il a mis en cache pour vous.

Dans `view.tree`, le même enfant tient sur une ligne :

```tree
		<= Name $mol_string
```

Un nom capitalisé signifie que la propriété contient un composant ; `<=` la déclare. Il n'existe pas d'écriture plus courte qui oublie le décorateur, puisque vous n'écrivez pas la fabrique.

## L'opérateur dit dans quel sens vont les données

Nourrir un enfant, c'est affecter, propriété par propriété :

```typescript
			obj.sub = () => [ this.greeting() ]
```

Trois pièces mobiles : l'objet enfant, le nom de la propriété, et une flèche pour que la lecture ait lieu plus tard plutôt que maintenant. La ligne dit ce qui est relié, pas dans quel sens ; pour le savoir, il faut lire le corps de la flèche et vérifier si quelque chose revient.

L'arbre met le sens dans l'opérateur :

```tree
		<= Message $mol_view
			sub / <= greeting \
```

`<=` est unidirectionnel, de `greeting` vers le `sub` de l'enfant. `/` est une liste, `\` débute une chaîne brute, et `greeting \` déclare une propriété dont la valeur par défaut est la chaîne vide — celle que vous redéfinirez en TypeScript.

## La liaison bidirectionnelle est à une touche du lecture-seule silencieux

Le champ a besoin de données dans les deux sens, d'où le paramètre `next` :

```typescript
			obj.value = ( next?: string ) => this.name( next )
```

Retirez maintenant `next` :

```typescript
			obj.value = () => this.name()
```

TypeScript l'accepte. Une fonction sans argument est assignable là où un argument optionnel est attendu : les types passent et l'audit reste vert. Le champ s'affiche, montre la bonne valeur, et ignore silencieusement tout ce que vous tapez.

Dans l'arbre, cette demi-liaison ne peut pas s'écrire :

```tree
		<= Name $mol_string
			value? <=> name? \
```

`<=>` relie dans les deux sens. Le `?` nu marque une propriété qui prend un argument, autrement dit une propriété dans laquelle on peut écrire. Ici il est présent aux deux bouts, donc la valeur descend dans le champ et remonte.

## Une chaîne localisable reste une chaîne tant que vous n'en faites pas une clé

```typescript
		title() {
			return 'Greeting'
		}
```

Pour la traduire, vous inventez une clé, remplacez le littéral par un appel à `$mol_locale.text`, écrivez le json, puis maintenez les deux à la main jusqu'à la fin de la vie du projet.

```tree
	title @ \Greeting
```

`@` marque la chaîne comme localisable, et le build fait le reste. Après un build, `my/hello/-/web.locale=en.json` contient :

```json
{
	"$my_hello_Name_hint": "Enter your name",
	"$my_hello_title": "Greeting"
}
```

Les traducteurs reçoivent un fichier json avec toutes les chaînes de l'application. Vous n'écrivez aucune clé.

## Le composant entier

```tree-no-run
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

Voilà `hello.view.tree`. Ce qui reste dans `hello.view.ts`, c'est la part qui n'a jamais été de la structure :

```typescript
namespace $.$$ {

	export class $my_hello extends $.$my_hello {

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

La classe étend désormais `$.$my_hello`, la base engendrée par l'arbre, et redéfinit une propriété. `$.$$` est l'espace de noms de ces redéfinitions.

## Ce que le compilateur produit

`view.tree` est un générateur de code sans runtime propre. Construisez le module et lisez `my/hello/-view.tree/hello.view.tree.js` :

```javascript
	($.$my_hello) = class $my_hello extends ($.$mol_page) {
		name(next){
			if(next !== undefined) return next;
			return "";
		}
		Name(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this.$.$mol_locale.text("$my_hello_Name_hint")));
			(obj.value) = (next) => ((this.name(next)));
			return obj;
		}
		greeting(){
			return "";
		}
		Message(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.greeting())]);
			return obj;
		}
		title(){
			return (this.$.$mol_locale.text("$my_hello_title"));
		}
		body(){
			return [(this.Name()), (this.Message())];
		}
	};
	($mol_mem(($.$my_hello.prototype), "name"));
	($mol_mem(($.$my_hello.prototype), "Name"));
	($mol_mem(($.$my_hello.prototype), "Message"));
```

Les mêmes fabriques, les mêmes flèches, les mêmes trois appels à `$mol_mem`, plus les deux clés de locale que vous n'avez pas eu à nommer. Quand le bundle arrive au navigateur, l'arbre a disparu.

C'est aussi pourquoi les deux formats cohabitent sans effort. Un composant écrit en arbre et un composant écrit en classe produisent le même genre d'objet : une application peut contenir les deux sans que personne ne voie la différence.

## Ce qu'une classe écrite à la main ne peut donner à aucun outil

À côté du JS généré, le compilateur écrit `hello.view.tree.d.ts` :

```typescript
declare namespace $ {

	type $mol_string__hint_my_hello_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_my_hello_2 = $mol_type_enforce<
		ReturnType< $my_hello['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_view__sub_my_hello_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $my_hello extends $mol_page {
		name( next?: string ): string
		Name( ): $mol_string
		greeting( ): string
		Message( ): $mol_view
		title( ): string
		body( ): readonly(any)[]
	}

}
```

Les paires `$mol_type_enforce` vérifient chaque liaison face à la propriété qu'elle alimente, si bien qu'une incompatibilité de types est signalée sur la liaison elle-même plutôt que quelque part au fond de l'enfant. Le corps de classe en dessous est une description lisible par une machine de la surface du composant, et des outils la lisent : le fichier de locale plus haut sort de la même analyse, et les [pages d'API](#!section=docs/page=api-mol-string) de ce site sont générées à partir du `.view.tree.d.ts` de chaque composant de base.

Une classe écrite à la main n'offre rien de tout cela. C'est du code, et la seule chose capable de le lire est TypeScript.

## La taille de tout ça

Le Hello World ci-dessus : 31 lignes de TypeScript deviennent 8 lignes d'arbre plus 8 lignes de TypeScript.

L'écart se creuse avec le composant. `$mol_app_users` — un champ de recherche, une liste, quatre boutons et une ligne de statut — fait 30 lignes et 840 caractères en arbre, et 125 lignes et 3046 caractères en classe. Les deux versions figurent en entier sur la page wiki de [comparaison des formats](https://github.com/hyoo-ru/mam_mol/wiki/View-Formats), à vous de peser l'échange.

## Lequel écrire

Les deux, au cas par cas, composant par composant.

`view.ts` est un format pris en charge. C'est ce vers quoi l'arbre compile, et un composant écrit ainsi se comporte comme n'importe quel autre. Quand un composant est surtout de la logique avec un ou deux enfants, la classe est le choix honnête et l'arbre n'apporte pas grand-chose.

L'arbre se rentabilise là où la cérémonie se répète : des écrans faits surtout de structure, de longues séries de liaisons, tout ce qui contient du texte qu'un traducteur voudra voir. Cela décrit la majeure partie d'une interface, et c'est pourquoi les composants de $mol eux-mêmes sont écrits ainsi.

Vient ensuite le langage de l'arbre lui-même — listes, dictionnaires, vues à clé et spécialisation d'un composant par extension : **[Vues](#!section=docs/page=views)**.
