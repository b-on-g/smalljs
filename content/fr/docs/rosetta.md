# De React, Vue et Svelte

Si vous avez construit des interfaces avec React, Vue ou Svelte, vous comprenez déjà l'essentiel de ce que fait $mol — seuls les noms diffèrent. Ces frameworks sont excellents et populaires pour de bonnes raisons ; cette page est une table de traduction, pas une compétition, pour vous aider à vous sentir vite chez vous.

## Carte des concepts

| Idée | React | Vue | Svelte | $mol |
|------|-------|-----|--------|------|
| Composant | fonction / classe | SFC (`.vue`) | fichier `.svelte` | `.view.tree` + `.view.ts` |
| État local | `useState` | `ref` / `reactive` | `let x` | `@ $mol_mem` |
| Valeur dérivée | `useMemo` | `computed` | `$: y = …` | `@ $mol_mem` (lit d'autres cellules) |
| Effet de bord | `useEffect` | `watchEffect` | `$: { … }` | `@ $mol_action` (explicite, jamais automatique) |
| Props | props | props | `export let` | liaisons dans `view.tree` |
| Événement | `onClick` | `@click` | `on:click` | `click? <=> handler?` |
| Saisie bidirectionnelle | input contrôlé | `v-model` | `bind:value` | `value? <=> field?` |
| Liste | `items.map()` | `v-for` | `{#each}` | `Row*` à clé |
| Conditionnel | `cond && …` | `v-if` | `{#if}` | assigner `null` pour retirer |
| État partagé | Redux / Context | Pinia / provide | stores | tout objet avec `@ $mol_mem` |
| Routage | React Router | Vue Router | SvelteKit | `$mol_state_arg` |
| Style | CSS-in-JS | `<style>` scopé | `<style>` | `.view.css.ts` typé |

## Ce qui a tendance à sembler nouveau

- **La réactivité est automatique et non optionnelle.** Comme le `ref` de Vue ou le `$:` de Svelte, une valeur `@ $mol_mem` met à jour ses lecteurs toute seule — mais il n'y a aucun tableau de dépendances à maintenir et aucun abonnement manuel nulle part.
- **Les effets sont séparés des calculs.** React réunit dérivation et effets dans des hooks ; $mol les garde à part : `@ $mol_mem` ne fait que calculer, `@ $mol_action` réalise les effets. C'est cette séparation qui élimine la plupart des énigmes « pourquoi ça s'est exécuté deux fois ? ».
- **L'état n'est que des objets.** Il n'y a aucune bibliothèque de store dédiée à adopter — une valeur partagée est une propriété réactive sur n'importe quel objet, donc l'état global et l'état de composant fonctionnent de la même manière.

## Résolu par vous ou par le framework

La différence la plus profonde n'est pas le vocabulaire ci-dessus — c'est *qui* résout les problèmes récurrents. Dans React, Vue ou Svelte, ce sont pour la plupart des motifs que vous réimplémentez dans chaque composant et cassez à votre manière. Dans $mol, ce sont les propriétés d'un seul mécanisme, si bien que toute cette catégorie de travail disparaît au lieu de recevoir une API plus agréable.

- **Magasin d'état** — cinq sous-systèmes de stockage dans React (Redux + RTK Query + `useState` + `useReducer` + Context) se réduisent à un seul : des champs réactifs sur le composant.
- **Réactivité** — ajoutée par-dessus ailleurs (MobX, signals) ; ici dans les fondations, si bien que rien n'a à s'y abonner.
- **Isolation des plantages** — `<ErrorBoundary>` placé à la main face à chaque composant qui est sa propre frontière par défaut.
- **Effets** — une checklist `useEffect`/`useMemo`/deps sur une douzaine de scénarios face à une méthode, ou une méthode avec une action. Une seule bifurcation dans l'arbre, pas douze.
- **Virtualisation** — un composant tiers par liste face à tout ce qui se trouve hors du viewport et n'existe tout simplement pas.

Là où le tableau ci-dessus renomme les choses, c'est ici que $mol les supprime réellement.

## Essayez la traduction

La façon la plus rapide d'intérioriser la correspondance est d'écrire un peu des deux : ouvrez le [Playground](#!section=playground), portez un petit composant que vous connaissez et voyez ce que ça donne. Ou commencez par [Bien démarrer](#!section=docs/page=getting-started).
