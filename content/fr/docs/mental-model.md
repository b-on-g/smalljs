# Modèle mental

Si vous venez de React ou de Vue, les premiers jours dans $mol se passent à chercher des choses qui n'existent pas : `computed`, `watch`, `useEffect`, `onMounted`, un `fetch` dans un hook de cycle de vie. Elles ne sont pas cachées quelque part dans l'API ; le modèle n'a pas de place pour elles. Cette page est la version en cinq minutes de ce modèle. Lisez-la avant [Vues](#!section=docs/page=views), et revenez-y quand un nom familier manque à l'appel.

## Tirer plutôt que pousser

Rien n'est calculé tant que personne ne le lit. Une vue se rend en lisant ses propriétés ; chaque propriété lit ce dont elle a besoin ; la chaîne de dépendances s'assemble toute seule à partir de ces lectures. Il n'y a pas d'abonnement à déclarer ni de `watch` à enregistrer : la lecture *est* l'abonnement.

```tree
$my_profile $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
```

```typescript
namespace $.$$ {
	export class $my_profile extends $.$my_profile {
		@ $mol_mem
		user() {
			return this.$.$mol_fetch.json( 'https://api.example.com/me' ) as { name: string }
		}
		name() {
			return this.user().name
		}
	}
}
```

Rendre `Name` lit `name()`, `name()` lit `user()`, `user()` va sur le réseau. Personne n'a parlé de la requête à la vue et personne n'a parlé de la vue à la requête. Quand `user()` change, tout ce qui l'a lu se recalcule, et rien d'autre.

## Pas de cycle de vie

Il n'y a pas de `mounted`, pas de `useEffect`, pas de `created`. On demande des données en lisant une propriété, et une vue lit ses propriétés quand elle se rend. L'exemple ci-dessus charge donc l'utilisateur au moment où `$my_profile` apparaît à l'écran, et pas avant. Quand la vue quitte l'écran, plus personne ne lit `user()`, et la cellule est libérée en même temps que la vue.

Voilà tout ce qui remplace le motif « fetch on mount » : la vue demande ce dont elle a besoin, et le framework décide quand demander. Le chargement n'est pas accroché à un événement de page, il est accroché au fait d'être visible.

## Une propriété est une cellule

Une seule méthode avec un argument optionnel est à la fois getter, setter, valeur calculée et état :

```typescript
@ $mol_mem
count( next?: number ) {
	return next ?? 0
}
```

Appelée sans argument elle lit, appelée avec un argument elle écrit. `@ $mol_mem` transforme la méthode en une cellule mise en cache qui se recalcule quand une valeur qu'elle a lue a changé. Une valeur calculée n'est qu'une méthode `@ $mol_mem` qui lit d'autres méthodes. Pas besoin de watcher : un effet de bord appartient à un événement, et un gestionnaire d'événement est une méthode marquée `@ $mol_action`.

```typescript
@ $mol_mem
doubled() {
	return this.count() * 2
}

@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

[État et réactivité](#!section=docs/page=state) détaille les règles de ce qui peut se produire dans chacun des deux.

## Du code synchrone qui attend

`user()` ci-dessus a l'air synchrone et s'écrit comme si la réponse était déjà là. Cela fonctionne parce que chaque calcul s'exécute dans une fibre. `this.$.$mol_fetch.json()` suspend cette fibre, et le framework relance le calcul une fois la réponse arrivée. Jusque-là, la vue qui a lu `user()` affiche un état de chargement ; si la requête échoue, la même vue affiche l'erreur. Vous n'écrivez ni drapeau `isLoading` ni `try`/`catch`.

Le même mécanisme sert n'importe quelle source asynchrone. [Récupération de données](#!section=docs/page=data) parcourt le rechargement et la gestion des erreurs.

## Tout est une redéfinition

Un fichier `view.tree` est une liste de déclarations de méthodes. Chaque ligne sous un composant est une propriété de ce composant avec une valeur par défaut, et la propriété de n'importe quel composant imbriqué peut être redéfinie en une ligne, à l'endroit même où elle est utilisée. Un placeholder sur un champ de saisie, c'est la propriété `hint` de `$mol_string` :

```tree
$my_search $mol_view
	sub /
		<= Query $mol_string
			hint \Search
			value? <=> query? \
```

Il n'y a pas de liste de props à étendre, pas d'enveloppe à écrire et pas de fork à maintenir. Si un composant a une propriété, vous pouvez la définir de l'extérieur.

## Comment lire les sources

La section précédente soulève la vraie question : comment savez-vous que la propriété s'appelle `hint` ? La réponse, c'est que vous allez voir — et le framework est conçu pour que regarder ne coûte presque rien.

**Les sources du framework sont à côté des vôtres.** Dans l'espace de travail MAM, `mol/string/string.view.tree` est à un dossier de `my/hello/`. Il n'est pas dans `node_modules` ni à l'intérieur d'un bundle ; c'est le même genre de fichier que ceux que vous écrivez vous-même.

**Le nom de classe est le chemin.** `$mol_string` vit dans `mol/string/`, `$mol_button_major` dans `mol/button/major/`. Chaque tiret bas est un séparateur de dossier, donc un nom de votre arbre se transforme toujours en un dossier à ouvrir. Le support éditeur présenté sur la page [Outillage](#!section=docs/page=tooling) complète ces noms pour vous.

**Le `.view.tree` d'un composant est la liste complète de ses propriétés, valeurs par défaut comprises.** La forme de la valeur en indique le type : `\` débute une chaîne, `/` une liste, `*` un dictionnaire, un nombre nu est un nombre, `true` et `false` sont des booléens, `null` signifie absent, et `<=` introduit une sous-vue ou une propriété reprise du propriétaire. Voici la partie de `mol/string/string.view.tree` qui compte pour un champ de saisie :

```tree
$mol_string $mol_view
	dom_name \input
	enabled true
	field *
		^
		disabled <= disabled false
		value <= value_changed? <=> value? \
		placeholder <= hint_visible <= hint \
	attr *
		^
		type <= type? \text
```

Lisez-la à voix haute. `dom_name \input` : ce composant rend un élément `input`. `enabled true` : une propriété booléenne, active par défaut. `field *` est le dictionnaire des champs de l'élément DOM ; les noms de gauche appartiennent au DOM, ceux de droite au composant, et celui le plus à droite est celui que vous définissez. Le `placeholder` du DOM vient donc de `hint`, chaîne vide par défaut ; le `value` du DOM est la propriété inscriptible `value?`, et l'attribut `type` est le `type?` inscriptible, `text` par défaut. Un placeholder, un champ désactivé et un champ de mot de passe s'écrivent `hint`, `enabled false` et `type \password` dans votre arbre.

**L'interface typée est engendrée depuis le même arbre.** `mol/string/-view.tree/string.view.tree.d.ts` liste les mêmes propriétés sous forme de signatures TypeScript, et la [référence d'API](#!section=docs/page=api-mol-string) de ce site est produite à partir de ce fichier. Les trois concordent parce que les trois viennent d'une seule source.

**La plupart des composants livrent un dossier `demo/` et un `readme.md`.** `mol/string/demo/demo.view.tree` montre le champ avec un texte indicatif, désactivé, et avec une valeur prédéfinie. Quand il vous faut un composant dans un certain état, trouvez la démo la plus proche et copiez la ligne.

Mis bout à bout, un placeholder prend environ une minute :

```bash
ls mol | grep string
cat mol/string/string.view.tree
```

Vous voyez `hint \` sous `$mol_string`, et vous écrivez `hint \Search` sous votre propre `$mol_string`.

## Les noms

Tout est en `snake_case` : les noms de propriétés dans `view.tree`, les noms de méthodes en TypeScript, les attributs que le framework pose sur les nœuds DOM pour le style. Les sous-vues commencent par une majuscule (`Query`), les valeurs par une minuscule (`query`).

Le nom dans l'arbre et le nom de la méthode dans la classe doivent coïncider lettre pour lettre. `exchange_form` dans l'arbre et `exchangeForm` dans la classe sont deux propriétés sans rapport : celle de la classe n'est jamais lue, celle de l'arbre garde sa valeur par défaut, et aucune erreur ne vient vous le dire. Quand une redéfinition semble ne rien faire, c'est la première chose à vérifier. [Dépannage](#!section=docs/page=troubleshooting) recense ce cas et tous les autres où l'écran est faux et le compilateur muet.

## Suite

Le modèle en place, [Vues](#!section=docs/page=views) montre comment les composants se déclarent et se composent, et [De React, Vue et Svelte](#!section=docs/page=rosetta) fait correspondre les noms que vous connaissez déjà avec ceux d'ici.
