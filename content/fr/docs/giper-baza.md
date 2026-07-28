# Giper Baza

[Giper Baza](https://github.com/giper-dev/baza) est un **projet distinct et optionnel** — il ne fait pas partie intégrante de $mol. Ses auteurs le décrivent comme *une base de données décentralisée à haute disponibilité avec synchronisation temps réel sans conflit* : un magasin CRDT qui persiste localement et se réplique entre clients sans serveur central, avec signatures numériques et chiffrement de bout en bout. Vous n'en avez jamais besoin pour construire une application $mol ; n'y recourez que lorsque plusieurs clients ou appareils doivent partager les mêmes données en direct.

> Vous voulez simplement que votre application continue de fonctionner sans réseau ? C'est du pur hors-ligne, et $mol s'en charge avec un service worker — voir [Hors-ligne](#!section=docs/page=offline). Giper Baza va un cran plus loin : synchroniser les données *entre* clients, et non mettre en cache les ressources d'un seul client.

Lorsque vous modélisez effectivement des données avec, les entités ressemblent à des propriétés réactives ordinaires, et la réplication se produit toute seule.

> Cette page présente la forme de l'API. Giper Baza est un vaste sujet — considérez ceci comme une carte, pas le territoire complet.

## Définir une entité

Une entité est un **schéma pur** — un ensemble de champs typés. Gardez le comportement à l'écart ; faites la lecture et l'écriture dans vos vues.

```typescript
namespace $ {
	export class $my_task extends $giper_baza_entity.with( {
		Title: $giper_baza_atom_text,
		Done: $giper_baza_atom_bool,
		CreatedAt: $giper_baza_atom_time,
	} ) {}
}
```

Chaque champ est un **atome** — une cellule synchronisée avec une valeur typée.

## Lire et écrire

Obtenez le magasin, atteignez une liste d'entités et parcourez-les de manière réactive :

```typescript
		@ $mol_mem
		tasks() {
			return this.tasks_list().remote_list()
		}

		@ $mol_mem_key
		task_done( id: string, next?: boolean ) {
			const task = this.task( id )
			if( next !== undefined ) task.Done( null )!.val( next )
			return task.Done()?.val() ?? false
		}
```

Lire `Done()?.val()` donne la valeur actuelle ; écrire `Done(null)!.val(next)` la définit. Toute vue lisant l'atome se re-rend quand elle — ou un pair distant — la modifie.

## Créer et supprimer

```typescript
		@ $mol_action
		task_add( title: string ) {
			const task = this.tasks_list().make( [ [ null, $giper_baza_rank_read ] ] )!
			task.Title( null )!.val( title )
			task.Done( null )!.val( false )
		}

		@ $mol_action
		task_remove( id: string ) {
			this.tasks_list().cut( this.task( id ).link() )
		}
```

## La synchronisation est automatique

Il n'y a rien à configurer. Les changements se répliquent vers les autres clients en temps réel, et les mêmes données sont disponibles hors ligne — le magasin se réconcilie au retour de la connexion. Comme les écritures sont des fusions CRDT, les modifications concurrentes de différents appareils se combinent sans conflits.

## Où aller ensuite ?

Vous avez maintenant l'arc complet : [Vues](#!section=docs/page=views), [État](#!section=docs/page=state), [Routage](#!section=docs/page=routing), [Récupération de données](#!section=docs/page=data) et le stockage local-first. Essayez le tout dans le [Playground](#!section=playground).
