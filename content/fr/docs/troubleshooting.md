# Dépannage

Chaque entrée de cette page a la même forme : la compilation est verte, l'audit est propre, la console est muette, et l'écran est vide ou n'est pas ce que vous vouliez. Le compilateur ne peut pas voir ces erreurs parce que chacune est un programme valide qui décrit simplement un autre composant. Trouvez le titre qui ressemble à ce que vous voyez ; en dessous se trouvent la cause et le correctif.

## Ma redéfinition de propriété ne fait rien, aucune erreur

Le nom dans `view.tree` et le nom de la méthode dans la classe diffèrent, le plus souvent par la casse : `exchange_form` dans l'arbre, `exchangeForm` dans la classe. Ce sont deux propriétés. Celle de la classe n'est jamais appelée, celle de l'arbre garde sa valeur par défaut, et rien ne le signale.

Les noms sont en `snake_case` partout et doivent coïncider lettre pour lettre. Après avoir modifié un `.view.ts`, vérifiez que chaque redéfinition nomme encore une propriété existante ; le `-view.tree/*.view.tree.d.ts` engendré à côté de l'arbre est la liste à laquelle se comparer.

## Il me faut un placeholder, disabled ou type sur un champ de saisie

Ce sont des propriétés de `$mol_string` : `hint` pour le placeholder, `enabled` pour l'état désactivé, `type` pour le type de saisie. Définissez-les là où le champ est utilisé :

```tree
<= Password $mol_string
	hint \Password
	type \password
	enabled <= can_edit true
	value? <=> password? \
```

Toute autre propriété de tout autre composant se trouve de la même façon : ouvrez son `.view.tree`, comme le montre [Comment lire les sources](#!section=docs/page=mental-model/Docs.Body=Comment%20lire%20les%20sources).

`attr *` sert aux vrais attributs DOM que le composant ne modélise pas déjà, et il a son propre piège : un bloc sans `^` en première ligne remplace tout le dictionnaire d'attributs de la base, si bien qu'un `$mol_button` écrit ainsi perd `disabled`, `role` et `tabindex`. Commencez le bloc par `^` pour hériter, puis ajoutez vos clés :

```tree
attr *
	^
	data_kind \primary
```

## Un mot s'affiche lettre par lettre

Une chaîne a été passée là où une liste est attendue, et la chaîne a été étalée caractère par caractère. Les chaînes commencent par `\`, les listes par `/`. Le cas habituel est `sub`, qui est une liste :

```tree
sub / <= label \Hello
```

## L'écran est vide, les tests sont verts

Une redéfinition est tombée du `.view.ts`. L'arbre donne à chaque propriété une valeur par défaut, donc quand la classe cesse de redéfinir `rows()`, TypeScript est satisfait et la liste se rend vide. Les tests qui ne vérifient que le modèle restent verts parce que le modèle, lui, va bien.

Pour chaque redéfinition dont dépend l'écran, écrivez un test qui lit ce que voit l'utilisateur : `rows()`, `sub()`, `title()` des sous-vues, ou le DOM. [Tests](#!section=docs/page=testing) montre les deux.

## Les données ne se chargent jamais, un composant reste bloqué en chargement

Une méthode `@ $mol_mem` a renvoyé une promesse comme valeur : `fetch( uri ).then( ... )`, une méthode `async`, ou le résultat de `$mol_wire_async( this ).load()`. Une promesse dans la cellule se lit pour tout le monde comme « calcul en cours », et quand elle se résout, la cellule se recalcule et produit une promesse toute fraîche. Le réseau fonctionne ; la vue ne voit jamais de résultat.

La forme correcte est synchrone : appelez `this.$.$mol_fetch.json( uri )` dans la cellule et renvoyez la valeur analysée. La fibre se suspend jusqu'à l'arrivée de la réponse puis relance la cellule, si bien que la promesse n'apparaît jamais dans votre code. Là où le travail asynchrone doit se faire ailleurs, placez son résultat dans une cellule d'état séparée et faites renvoyer à l'effet un drapeau ou une clé, jamais la promesse.

Une seconde cause est une erreur avalée : un `try`/`catch` à l'intérieur d'une cellule qui attrape la suspension en même temps que les vraies défaillances. Relancez tout ce qui est une `Promise`, ou utilisez `$mol_fail_catch`, qui fait cette vérification pour vous.

## Abonnement circulaire

Une méthode `@ $mol_mem` a écrit dans une autre cellule, ou a produit un effet de bord qui a fini par invalider quelque chose qu'elle avait lu. Les calculs ne font que lire et renvoyer ; les écritures, le réseau, les minuteries et le DOM appartiennent aux gestionnaires `@ $mol_action`. L'autre source du même message est une liaison `<=>` vers un enfant combinée à une méthode de la classe qui délègue à ce même enfant, décrite juste après.

## Maximum call stack

Deux formes le produisent. D'abord, l'arbre a `tab? <=> tab?` sur un enfant et la classe a `tab() { return this.Head().tab() }` : l'enfant demande au propriétaire, le propriétaire demande à l'enfant. Retirez le `<=>` vers l'enfant auquel vous déléguez.

Ensuite, une sous-vue a été retypée vers votre propre classe et la classe appelle `super` sur une propriété listée dans l'arbre. Ce `super` n'est pas l'implémentation de la base mais le stub que l'arbre a engendré pour la liaison listée, et le stub délègue en retour au propriétaire. Déléguez explicitement à l'implémentation d'origine à la place, voyez l'entrée sur le retypage plus bas.

## Une valeur écrite avec une majuscule ne peut pas être redéfinie depuis TypeScript

`<= Label* \` engendre une méthode nommée `Label`, et `label()` dans la classe est une autre méthode. Les sous-vues portent une majuscule, les valeurs une minuscule, et la casse dans l'arbre décide du nom de la méthode engendrée.

## Chaque ligne d'une liste imbriquée affiche le même élément

Une sous-vue à clé à l'intérieur d'une autre sous-vue à clé ne reçoit pas sa clé. `Cell*0` dans `Row*0` se rend avec la clé `0` dans chaque ligne. Déplacez la ligne dans un composant à elle et passez-lui ses données par des propriétés, et donnez à la vue extérieure la clé `Row*`, pas `Row*0`.

## J'ai changé la classe d'une sous-vue et son contenu a disparu

Retyper `Pre* $mol_text_code` en `Pre* $my_code` fait tomber les liaisons que l'arbre de la base avait déclarées pour elle, il faut donc les lister à nouveau. Lister `text <= pre_text* \` crée un stub vide qui masque le vrai `pre_text` de `$mol_text`. Déléguez dans la classe au lieu de compter sur `super`, qui est justement ce stub :

```typescript
pre_text( index: number ) {
	return $mol_text.prototype.pre_text.call( this, index )
}
```

## Les méthodes du view.ts d'un composant de base manquent dans la sous-classe

`$my_child $my_base` dans un arbre étend la classe engendrée à partir de `base.view.tree`, pas celle que vous avez écrite dans `base.view.ts`. Les méthodes définies là n'atteignent pas l'enfant, et TypeScript les signale comme manquantes. La logique partagée par plusieurs vues vit dans un simple fichier `.ts` du `namespace $`, sans arbre, à la manière dont `$mol_view` lui-même est écrit.

## Un composant de base déclaré dans le même fichier view.tree perd son comportement

Quand un fichier d'arbre déclare à la fois une base et une classe qui l'étend, le corps du `.view.ts` de la base est ignoré pour l'enfant. Donnez un dossier à part à une base qui possède un `.view.ts`.

## Les styles débordent entre une sous-vue et le composant qu'elle contient

`Nav $my_app_nav` dans `$my_app` pose le même attribut `my_app_nav` sur la sous-vue et sur le composant, et un seul sélecteur touche les deux. Nommez la sous-vue de façon à ne pas répéter la fin du nom de classe, par exemple `Nav_row`.

## Un sélecteur sur un attribut à false ne correspond jamais

Un attribut booléen mis à `false` est retiré de l'élément, donc `[expanded="false"]` ne correspond à rien. Le rendu conditionnel n'est pas un travail de CSS ; redéfinissez la fabrique de la sous-vue et renvoyez `null` pour la variante qui n'a pas cette vue.

## Un nombre dans les styles ne change rien

Chaque nombre dans `style *` reçoit un `px` en suffixe : `flexGrow 1` devient `flex-grow: 1px`, que le navigateur jette. Écrivez les valeurs sans unité sous forme de chaînes, `flexGrow \1`.

## Deux enfants d'une vue de défilement se superposent

`$mol_scroll` ne tient qu'un seul enfant. Enveloppez les enfants dans un `$mol_view` ou un `$mol_list` et donnez-le au défilement.

## minimal_height n'a aucun effet visible

`minimal_height` est un nombre dont le `$mol_list` virtualisé se sert pour estimer les lignes avant qu'elles ne se rendent ; il ne définit pas de hauteur. La hauteur se définit dans le `.view.css.ts`.

## Un composant embarqué pousse la page sur le côté

Une vue montée dans une mise en page étrangère ne rétrécit pas sous son contenu par défaut. Donnez `minWidth: 0` à sa racine dans ses styles pour qu'elle puisse être comprimée comme les éléments qui l'entourent.

## Le CSS d'une bibliothèque tierce ne style pas mon composant

Un composant sans `dom_name` se rend comme un élément nommé d'après sa classe, ce qui est un élément en ligne inconnu pour un framework CSS. Définissez la balise explicitement : `$mol_button` n'en a pas, donc un bouton que vous voulez styler par du CSS extérieur a besoin de `dom_name \button`.

## Cliquer sur un lien vers la page courante vide l'URL

Un `$mol_link` avec `arg *` fonctionne comme une bascule : sur une page dont l'URL correspond déjà, un clic retire ces clés. Pour un lien qui ne fait que naviguer, sous-classez-le avec `uri_off <= uri`. Pour recharger la même route au clic, appelez `$mol_state_arg.value()` depuis un gestionnaire et faites `preventDefault` sur l'événement.

## Mon gestionnaire de saisie s'exécute à chaque rendu

Un `prop?` que vous avez ajouté à une sous-classe de `$mol_string` porte le nom d'une propriété que la base utilise déjà : `enter`, `submit`, `hint`, `value`, `keyboard`. Comparez vos nouveaux noms à l'arbre de la base avant de les ajouter.

## L'erreur levée par mon setter de valeur ne s'affiche jamais

`$mol_string` attrape une exception venue de `value?` et la remet au `setCustomValidity` du champ, si bien qu'elle n'apparaît que comme une validation de formulaire native. Signalez l'erreur par un canal à vous, une ligne de statut ou une sous-vue de message.

## Une liaison de gestionnaire à clé est signalée comme manquante

`event_click? <=> pick*? null` sur une sous-vue à clé n'engendre pas de stub pour `pick`. Déclarez-le vous-même à la racine de l'arbre, `pick*? null`, et implémentez-le dans la classe.

## Le bundle contient un module que je n'utilise jamais

Le builder trouve les dépendances en parcourant le texte source à la recherche de jetons `$mol_name`, et un jeton dans un littéral de chaîne ou dans un commentaire de documentation `/** */` compte autant qu'un jeton dans le code. Un nom mentionné en exemple dans un commentaire de documentation tire tout son module, et la panne apparaît dans un fichier que vous n'avez jamais touché. Écrivez les exemples et les notes sans le préfixe `$`, ou nommez le dossier à la place.

## Suite

La plupart de ces cas se ramènent à une seule règle : le nom dans l'arbre est le contrat, et le compilateur vérifie les types mais pas les noms. [Modèle mental](#!section=docs/page=mental-model) explique pourquoi l'arbre est une liste de redéfinitions, et [Tests](#!section=docs/page=testing) montre le test qui attrape les cas silencieux.
