# Von React, Vue und Svelte

Wenn Sie Oberflächen mit React, Vue oder Svelte gebaut haben, verstehen Sie bereits das meiste von dem, was $mol tut — nur die Namen sind anders. Diese Frameworks sind aus guten Gründen exzellent und beliebt; diese Seite ist eine Übersetzungstabelle, kein Wettbewerb, damit Sie sich schnell zu Hause fühlen.

## Konzeptkarte

| Idee | React | Vue | Svelte | $mol |
|------|-------|-----|--------|------|
| Komponente | Funktion / Klasse | SFC (`.vue`) | `.svelte`-Datei | `.view.tree` + `.view.ts` |
| Lokaler Zustand | `useState` | `ref` / `reactive` | `let x` | `@ $mol_mem` |
| Abgeleiteter Wert | `useMemo` | `computed` | `$: y = …` | `@ $mol_mem` (liest andere Zellen) |
| Seiteneffekt | `useEffect` | `watchEffect` | `$: { … }` | `@ $mol_action` (explizit, nie automatisch) |
| Props | props | props | `export let` | Bindungen in `view.tree` |
| Ereignis | `onClick` | `@click` | `on:click` | `click? <=> handler?` |
| Zwei-Wege-Eingabe | kontrollierte Eingabe | `v-model` | `bind:value` | `value? <=> field?` |
| Liste | `items.map()` | `v-for` | `{#each}` | Keyed `Row*` |
| Bedingung | `cond && …` | `v-if` | `{#if}` | `null` zuweisen zum Entfernen |
| Geteilter Zustand | Redux / Context | Pinia / provide | Stores | jedes Objekt mit `@ $mol_mem` |
| Routing | React Router | Vue Router | SvelteKit | `$mol_state_arg` |
| Styling | CSS-in-JS | scoped `<style>` | `<style>` | typisiertes `.view.css.ts` |

## Was sich meist neu anfühlt

- **Reaktivität ist automatisch und nicht optional.** Wie Vues `ref` oder Sveltes `$:` aktualisiert ein `@ $mol_mem`-Wert seine Leser von selbst — aber es gibt kein Abhängigkeitsarray zu pflegen und nirgends ein manuelles Abonnement.
- **Effekte sind von Berechnungen getrennt.** React faltet Ableitung und Effekte in Hooks; $mol hält sie getrennt: `@ $mol_mem` rechnet nur, `@ $mol_action` führt Effekte aus. Diese Trennung ist es, die die meisten „Warum lief das zweimal?"-Rätsel beseitigt.
- **Zustand sind einfach Objekte.** Es gibt keine dedizierte Store-Bibliothek zu übernehmen — ein geteilter Wert ist eine reaktive Eigenschaft auf einem beliebigen Objekt, sodass globaler Zustand und Komponentenzustand gleich funktionieren.

## Probieren Sie die Übersetzung

Der schnellste Weg, die Zuordnung zu verinnerlichen, ist ein wenig von beidem zu schreiben: öffnen Sie den [Playground](#!section=playground), portieren Sie eine kleine Komponente, die Sie kennen, und sehen Sie, wie sie sich einfügt. Oder beginnen Sie mit [Erste Schritte](#!section=docs/page=getting-started).
