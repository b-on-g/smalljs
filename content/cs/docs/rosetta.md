# Z React, Vue a Svelte

Pokud jste stavěli rozhraní v Reactu, Vue nebo Svelte, většině toho, co $mol dělá, už rozumíte — jen názvy jsou jiné. Tyto frameworky jsou skvělé a populární z dobrých důvodů; tato stránka je překladová tabulka, ne soutěž, aby vám pomohla rychle se cítit jako doma.

## Mapa pojmů

| Pojem | React | Vue | Svelte | $mol |
|------|-------|-----|--------|------|
| Komponenta | funkce / třída | SFC (`.vue`) | soubor `.svelte` | `.view.tree` + `.view.ts` |
| Lokální stav | `useState` | `ref` / `reactive` | `let x` | `@ $mol_mem` |
| Odvozená hodnota | `useMemo` | `computed` | `$: y = …` | `@ $mol_mem` (čte jiné buňky) |
| Vedlejší efekt | `useEffect` | `watchEffect` | `$: { … }` | `@ $mol_action` (explicitní, nikdy automatický) |
| Props | props | props | `export let` | vazby ve `view.tree` |
| Událost | `onClick` | `@click` | `on:click` | `click? <=> handler?` |
| Obousměrný vstup | řízený vstup | `v-model` | `bind:value` | `value? <=> field?` |
| Seznam | `items.map()` | `v-for` | `{#each}` | klíčovaný `Row*` |
| Podmínka | `cond && …` | `v-if` | `{#if}` | přiřadit `null` pro odebrání |
| Sdílený stav | Redux / Context | Pinia / provide | stores | jakýkoli objekt s `@ $mol_mem` |
| Směrování | React Router | Vue Router | SvelteKit | `$mol_state_arg` |
| Stylování | CSS-in-JS | scoped `<style>` | `<style>` | typované `.view.css.ts` |

## Co obvykle působí nově

- **Reaktivita je automatická a nepovinná není.** Jako `ref` ve Vue nebo `$:` ve Svelte, hodnota `@ $mol_mem` aktualizuje své čtenáře sama — ale není žádné pole závislostí k udržování a nikde žádné ruční přihlašování.
- **Efekty jsou oddělené od výpočtů.** React skládá odvození a efekty do hooků; $mol je drží zvlášť: `@ $mol_mem` jen počítá, `@ $mol_action` provádí efekty. Právě toto rozdělení odstraňuje většinu hádanek „proč se to spustilo dvakrát?".
- **Stav jsou prostě objekty.** Není žádná vyhrazená knihovna úložiště k převzetí — sdílená hodnota je reaktivní vlastnost na libovolném objektu, takže globální stav a stav komponenty fungují stejně.

## Vyzkoušejte překlad

Nejrychlejší způsob, jak si mapování osvojit, je napsat trochu obojího: otevřete [Hřiště](#!section=playground), přeneste malou komponentu, kterou znáte, a uvidíte, jak dopadne. Nebo začněte [Prvními kroky](#!section=docs/page=getting-started).
