# From React, Vue & Svelte

If you have built UIs with React, Vue, or Svelte, you already understand most of what $mol does — the names are just different. Those frameworks are excellent and popular for good reason; this page is a translation table, not a competition, to help you feel at home quickly.

## Concept map

| Idea | React | Vue | Svelte | $mol |
|------|-------|-----|--------|------|
| Component | function / class | SFC (`.vue`) | `.svelte` file | `.view.tree` + `.view.ts` |
| Local state | `useState` | `ref` / `reactive` | `let x` | `@ $mol_mem` |
| Derived value | `useMemo` | `computed` | `$: y = …` | `@ $mol_mem` (reads other cells) |
| Side effect | `useEffect` | `watchEffect` | `$: { … }` | `@ $mol_action` (explicit, never automatic) |
| Props | props | props | `export let` | bindings in `view.tree` |
| Event | `onClick` | `@click` | `on:click` | `click? <=> handler?` |
| Two-way input | controlled input | `v-model` | `bind:value` | `value? <=> field?` |
| List | `items.map()` | `v-for` | `{#each}` | keyed `Row*` |
| Conditional | `cond && …` | `v-if` | `{#if}` | assign `null` to remove |
| Shared state | Redux / Context | Pinia / provide | stores | any object with `@ $mol_mem` |
| Routing | React Router | Vue Router | SvelteKit | `$mol_state_arg` |
| Styling | CSS-in-JS | scoped `<style>` | `<style>` | typed `.view.css.ts` |

## What tends to feel new

- **Reactivity is automatic and non-optional.** Like Vue's `ref` or Svelte's `$:`, a `@ $mol_mem` value updates its readers by itself — but there is no dependency array to maintain and no manual subscription anywhere.
- **Effects are separated from computations.** React folds derivation and effects into hooks; $mol keeps them apart: `@ $mol_mem` only computes, `@ $mol_action` performs effects. That split is what removes most "why did this run twice?" puzzles.
- **State is just objects.** There is no dedicated store library to adopt — a shared value is a reactive property on any object, so global state and component state work the same way.

## Try the translation

The fastest way to internalize the mapping is to write a little of both: open the [Playground](#!section=playground), port a small component you know, and see how it lands. Or start from [Getting Started](#!section=docs/page=getting-started).
