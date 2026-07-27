# Release

$mol viene distribuito **in modo continuo**. Invece di tagliare versioni numerate, il framework viene spedito direttamente dal monorepo [mam_mol](https://github.com/hyoo-ru/mam_mol) — ogni modifica unita è immediatamente disponibile per chiunque ci sviluppi contro. Lo strumento di build MAM preleva sempre i sorgenti correnti, quindi non c'è alcun passo di aggiornamento né matrice di versioni da conciliare.

## Seguire i cambiamenti

- **Cronologia dei commit** — i [commit di mam_mol](https://github.com/hyoo-ru/mam_mol/commits/master) sono il changelog canonico.
- **Cronologia per modulo** — ogni cartella di componente su GitHub porta il proprio log dei commit, così puoi seguire solo le parti che usi.
- **Comunità DEV** — le aggiunte notevoli e gli articoli vengono condivisi sotto il [tag #mol](https://dev.to/t/mol).

## Cosa significa in pratica

Poiché non ci sono confini di release che rompono, il framework favorisce un'evoluzione retrocompatibile: i componenti guadagnano funzionalità senza essere rinominati, e le interfacce tipizzate `view.tree` fanno emergere le incompatibilità in fase di compilazione anziché a runtime. Se una build smette di compilare dopo un aggiornamento, gli errori di TypeScript ti indicano direttamente cosa è cambiato.
