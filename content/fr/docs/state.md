# État et réactivité

L'état de $mol se comporte comme un tableur : vous déclarez comment une valeur est calculée, et tout ce qui en dépend se met à jour tout seul. Pas de stores, pas de dispatch, pas de hooks d'effet — le graphe de dépendances suit ce qu'il faut recalculer.

## Propriétés réactives

Une méthode décorée avec `@ $mol_mem` est une cellule réactive mise en cache. Elle s'exécute une fois, mémorise son résultat et ne recalcule que lorsqu'une valeur qu'elle a lue a changé.

```typescript
namespace $.$$ {
	export class $my_counter extends $.$my_counter {
		@ $mol_mem count() { return 0 }

		@ $mol_mem doubled() {
			return this.count() * 2
		}
	}
}
```

`doubled` lit `count`, il s'abonne donc automatiquement à `count`. Modifiez `count` et chaque vue affichant `doubled` se rafraîchit — il n'y a rien à abonner à la main.

## Lecture et écriture

Une propriété est à la fois getter et setter : appelez-la sans argument pour lire, avec un argument pour écrire.

```typescript
@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

## Actions vs calculs

Cette seule distinction garde le code réactif prévisible :

- `@ $mol_mem` est un **calcul pur** — ne fait que lire d'autres cellules et renvoyer une valeur.
- `@ $mol_action` est un **effet** — les écritures dans l'état, les appels réseau et les minuteries vont ici.

Écrire dans une cellule depuis un `@ $mol_mem` crée une boucle de rétroaction (l'écriture invalide une dépendance, qui recalcule, qui réécrit). $mol le signale comme un *abonnement circulaire*. Le correctif est toujours le même : gardez les effets de bord dans les actions, gardez les calculs purs.

| Dans `@ $mol_mem` vous pouvez | mais pas |
|---|---|
| lire d'autres cellules | écrire d'autres cellules |
| `new SomeClass()` | `fetch()`, `await` |
| renvoyer une valeur | `setTimeout`, écritures DOM |

Les gestionnaires de boutons sont générés en `@ $mol_mem` sur la classe de base ; surchargez-les avec `@ $mol_action` pour qu'ils puissent écrire en toute sécurité :

```typescript
@ $mol_action
submit() {
	this.saved( true )
}
```

## L'état dérivé se compose

Comme les dépendances sont suivies automatiquement, les valeurs dérivées s'enchaînent sans aucun câblage. Chacune lit la précédente ; un changement à la racine se propage exactement aussi loin que nécessaire :

```typescript
@ $mol_mem full_name() {
	return `${ this.first() } ${ this.last() }`.trim()
}

@ $mol_mem greeting() {
	return this.full_name() ? `Hello, ${ this.full_name() }!` : 'Hello!'
}
```

## État à clé

`@ $mol_mem_key` est un calcul paramétré par une clé — une cellule mise en cache par clé. Idéal pour les valeurs par ligne :

```typescript
@ $mol_mem_key
task_done( id: string, next?: boolean ) {
	const task = this.task( id )
	if ( next !== undefined ) task.Done( null )!.val( next )
	return task.Done()?.val() ?? false
}
```

## L'asynchrone n'est qu'une valeur

Renvoyez une promesse depuis un `@ $mol_mem` et la vue affiche un état de chargement jusqu'à sa résolution — sans drapeau de chargement explicite :

```typescript
@ $mol_mem
async data() {
	const res = await fetch( '/api/data' )
	return await res.json()
}
```

[Récupération de données](#!section=docs/page=data) s'appuie sur ce modèle.

## État transitoire entre événements

L'état déclaré dans `view.tree` se réinitialise entre des gestionnaires d'événements distincts (séquences de glisser/déplacer/geste), car $mol enveloppe chaque gestionnaire dans sa propre fibre. Pour les valeurs qui doivent survivre d'un événement au suivant, utilisez un simple champ TypeScript plutôt qu'une propriété réactive :

```typescript
export class $my_canvas extends $.$my_canvas {
	// plain field — survives across events, not reactive
	drag_id = ''

	@ $mol_action pan_start() { this.drag_id = 'node_42' }
	@ $mol_action pan_move() { if ( this.drag_id ) { /* ... */ } }
}
```

Utilisez une cellule réactive lorsque la vue doit réagir à la valeur ; utilisez un simple champ pour l'état transitoire que seuls les gestionnaires lisent.

## Suite

L'état réactif est plus utile lorsqu'il est adressable — connectez-le à l'URL dans [Routage](#!section=docs/page=routing).
