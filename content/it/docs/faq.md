# FAQ

## Cos'è smalljs?

smalljs è il sito di documentazione di **$mol** — un framework UI reattivo con viste tipizzate, reattività automatica e senza DOM virtuale. Il framework stesso è sviluppato allo scoperto dalla comunità hyoo-ru; questo sito raccoglie una guida, un corso interattivo, un playground dal vivo e un riferimento API in un unico posto.

## $mol è pronto per la produzione?

Sì. $mol alimenta app reali e strumenti interni — vedi la [Vetrina](#!section=docs/page=showcase). Viene distribuito da un unico monorepo (MAM) ed è usato ogni giorno dai suoi autori e dalla comunità.

## Quanto è grande il runtime?

Piccolo. Un'app $mol tipica distribuisce circa 100 KB di codice del framework, e il rendering è virtualizzato per impostazione predefinita — i componenti fuori dall'area visibile non vengono mai creati. Vedi [Rendering](#!section=docs/page=rendering) per i dettagli e i benchmark.

## Devo imparare un nuovo linguaggio di template?

Impari `view.tree`, una sintassi ad albero compatta per dichiarare il layout dei componenti. È volutamente piccola — il capitolo [Viste](#!section=docs/page=views) copre tutto ciò che ti serve in una sola seduta. La logica resta in TypeScript semplice, e anche gli stili sono tipizzati.

## In cosa differisce da React, Vue o Svelte?

La reattività è automatica — non c'è `useState`, `useEffect`, né sottoscrizione manuale. Descrivi *cosa* è la UI; $mol decide *come* e *quando* aggiornarla. La [tabella di traduzione dei concetti](#!section=docs/page=rosetta) mappa le idee di altri framework su $mol.

## Dove ottengo aiuto?

- Chiedi nella [comunità DEV](https://dev.to/t/mol)
- Sfoglia il [codice sorgente e le issue di $mol su GitHub](https://github.com/hyoo-ru/mam_mol)
- Leggi la documentazione di riferimento su [mol.hyoo.ru](https://mol.hyoo.ru/)

## Sotto quale licenza è?

MIT. Puoi usare $mol liberamente in progetti commerciali e open-source.
