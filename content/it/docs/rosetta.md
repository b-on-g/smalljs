# Da React, Vue e Svelte

Se hai costruito interfacce con React, Vue o Svelte, capisci già la maggior parte di ciò che fa $mol — solo i nomi sono diversi. Questi framework sono eccellenti e popolari per buone ragioni; questa pagina è una tabella di traduzione, non una competizione, per aiutarti a sentirti subito a casa.

## Mappa dei concetti

| Idea | React | Vue | Svelte | $mol |
|------|-------|-----|--------|------|
| Componente | funzione / classe | SFC (`.vue`) | file `.svelte` | `.view.tree` + `.view.ts` |
| Stato locale | `useState` | `ref` / `reactive` | `let x` | `@ $mol_mem` |
| Valore derivato | `useMemo` | `computed` | `$: y = …` | `@ $mol_mem` (legge altre celle) |
| Effetto collaterale | `useEffect` | `watchEffect` | `$: { … }` | `@ $mol_action` (esplicito, mai automatico) |
| Props | props | props | `export let` | binding in `view.tree` |
| Evento | `onClick` | `@click` | `on:click` | `click? <=> handler?` |
| Input bidirezionale | input controllato | `v-model` | `bind:value` | `value? <=> field?` |
| Lista | `items.map()` | `v-for` | `{#each}` | `Row*` con chiave |
| Condizionale | `cond && …` | `v-if` | `{#if}` | assegna `null` per rimuovere |
| Stato condiviso | Redux / Context | Pinia / provide | store | qualsiasi oggetto con `@ $mol_mem` |
| Routing | React Router | Vue Router | SvelteKit | `$mol_state_arg` |
| Stile | CSS-in-JS | `<style>` con scope | `<style>` | `.view.css.ts` tipizzato |

## Cosa tende a sembrare nuovo

- **La reattività è automatica e non opzionale.** Come il `ref` di Vue o il `$:` di Svelte, un valore `@ $mol_mem` aggiorna i suoi lettori da solo — ma non c'è alcun array di dipendenze da mantenere né alcuna sottoscrizione manuale da nessuna parte.
- **Gli effetti sono separati dai calcoli.** React fonde derivazione ed effetti negli hook; $mol li tiene separati: `@ $mol_mem` calcola soltanto, `@ $mol_action` esegue gli effetti. È questa separazione a rimuovere la maggior parte dei rompicapi «perché è stato eseguito due volte?».
- **Lo stato sono solo oggetti.** Non c'è alcuna libreria di store dedicata da adottare — un valore condiviso è una proprietà reattiva su un qualsiasi oggetto, così lo stato globale e lo stato del componente funzionano allo stesso modo.

## Risolto da te o dal framework

La differenza più profonda non è il vocabolario qui sopra — è *chi* risolve i problemi ricorrenti. In React, Vue o Svelte sono per lo più pattern che reimplementi in ogni componente e rompi a modo tuo. In $mol sono proprietà di un unico meccanismo, così l'intera categoria di lavoro scompare invece di ricevere un'API più gradevole.

- **Store dello stato** — cinque sottosistemi di archiviazione in React (Redux + RTK Query + `useState` + `useReducer` + Context) si riducono a uno solo: campi reattivi sul componente.
- **Reattività** — agganciata sopra altrove (MobX, signals); qui nelle fondamenta, così nulla deve aderirvi.
- **Isolamento dei crash** — `<ErrorBoundary>` posizionato a mano contro ogni componente che è il proprio confine per impostazione predefinita.
- **Effetti** — una checklist `useEffect`/`useMemo`/deps su una dozzina di scenari contro un metodo, o un metodo con una action. Una sola biforcazione nell'albero, non dodici.
- **Virtualizzazione** — un componente di terze parti per ogni lista contro tutto ciò che è fuori dal viewport che semplicemente non esiste.

Dove la tabella qui sopra rinomina le cose, è qui che $mol le rimuove davvero.

## Prova la traduzione

Il modo più veloce per interiorizzare la corrispondenza è scrivere un po' di entrambi: apri il [Playground](#!section=playground), porta un piccolo componente che conosci e osserva come si comporta. Oppure parti da [Primi passi](#!section=docs/page=getting-started).
