# Vues fantômes

`$mol_ghost` est une vue **sans nœud**. Au lieu de créer son propre élément DOM, elle emprunte l'élément de son `Sub()` et y mélange ses propres attributs, styles et comportement. En une ligne tirée du code source : *« mélanger la logique de vue au nœud DOM d'un autre composant. »*

```tree
$mol_ghost $mol_view
	Sub $mol_view
```

Une `$mol_view` normale rend son propre élément. Une fantôme n'en rend **aucun** — elle réutilise l'élément de l'enfant, donc rien de plus n'est ajouté à l'arbre DOM.

## Quand y recourir

Utilisez une fantôme quand vous voulez attacher un comportement à un composant existant *sans* l'envelopper dans un autre élément — glisser, déposer, suivre-au-défilement, transitions. Plusieurs composants du framework reposent dessus :

- **`$mol_drag`** / **`$mol_drop`** — glisser-déposer au pointeur
- **`$mol_transit`** — transitions d'entrée/sortie
- **`$mol_follower`** — garder un élément aligné sur un autre lorsqu'il défile
- **`$mol_book_page`** — une page dans la navigation `$mol_book2`

## Relation avec les plugins

`$mol_plugin` — la base que tout [plugin](#!section=docs/page=plugins) étend — est sans élément pour la même raison : il enrichit l'élément de l'hôte au lieu d'en ajouter un. Une fantôme est la forme générale (envelopper un enfant et reprendre son nœud) ; un plugin est la forme spécialisée que vous listez sous `plugins /`.
