# De React, Vue e Svelte

Se você já construiu interfaces com React, Vue ou Svelte, já entende a maior parte do que o $mol faz — só os nomes são diferentes. Esses frameworks são excelentes e populares por boas razões; esta página é uma tabela de tradução, não uma competição, para ajudar você a se sentir em casa rapidamente.

## Mapa de conceitos

| Ideia | React | Vue | Svelte | $mol |
|------|-------|-----|--------|------|
| Componente | função / classe | SFC (`.vue`) | arquivo `.svelte` | `.view.tree` + `.view.ts` |
| Estado local | `useState` | `ref` / `reactive` | `let x` | `@ $mol_mem` |
| Valor derivado | `useMemo` | `computed` | `$: y = …` | `@ $mol_mem` (lê outras células) |
| Efeito colateral | `useEffect` | `watchEffect` | `$: { … }` | `@ $mol_action` (explícito, nunca automático) |
| Props | props | props | `export let` | vínculos em `view.tree` |
| Evento | `onClick` | `@click` | `on:click` | `click? <=> handler?` |
| Entrada bidirecional | input controlado | `v-model` | `bind:value` | `value? <=> field?` |
| Lista | `items.map()` | `v-for` | `{#each}` | `Row*` com chave |
| Condicional | `cond && …` | `v-if` | `{#if}` | atribuir `null` para remover |
| Estado compartilhado | Redux / Context | Pinia / provide | stores | qualquer objeto com `@ $mol_mem` |
| Roteamento | React Router | Vue Router | SvelteKit | `$mol_state_arg` |
| Estilização | CSS-in-JS | `<style>` com escopo | `<style>` | `.view.css.ts` tipado |

## O que tende a parecer novo

- **A reatividade é automática e não opcional.** Como o `ref` do Vue ou o `$:` do Svelte, um valor `@ $mol_mem` atualiza seus leitores sozinho — mas não há array de dependências para manter nem qualquer assinatura manual em lugar algum.
- **Os efeitos são separados das computações.** O React funde derivação e efeitos em hooks; o $mol os mantém à parte: `@ $mol_mem` apenas computa, `@ $mol_action` realiza efeitos. É essa separação que remove a maioria dos enigmas «por que isso rodou duas vezes?».
- **Estado são apenas objetos.** Não há biblioteca de store dedicada para adotar — um valor compartilhado é uma propriedade reativa em qualquer objeto, então o estado global e o estado do componente funcionam do mesmo jeito.

## Experimente a tradução

A forma mais rápida de internalizar o mapeamento é escrever um pouco dos dois: abra o [Playground](#!section=playground), porte um pequeno componente que você conhece e veja como ele se sai. Ou comece pelo [Primeiros passos](#!section=docs/page=getting-started).
