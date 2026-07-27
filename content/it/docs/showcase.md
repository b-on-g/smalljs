# Vetrina

Cose reali costruite con $mol — app della comunità, prodotti commerciali e strumenti per sviluppatori. Ognuna è un'app funzionante, non una demo.

## App

- **[Bog Music](https://b-on-g.github.io/music/)** — un lettore musicale che funziona sia come estensione di Chrome sia come app web, con riproduzione in background e cache offline. $mol guida l'interfaccia e lo stato local-first.
- **[Blitz Quiz](https://b-on-g.github.io/blitz/)** — un quiz dal vivo in stile Kahoot costruito su $mol e Giper Baza. Le stanze si sincronizzano in tempo reale attraverso il livello CRDT, quindi non c'è alcun server di gioco da eseguire.
- **[VDO Rebalance](https://b-on-g.github.io/invest/)** — uno strumento di investimento local-first: inserisci un portafoglio `.xlsx` e ottieni le operazioni che lo riequilibrano. Lo stato vive nel browser tramite Giper Baza.
- **[$hyoo_budget](https://budget.hyoo.ru)** — un'app di budget personale collaborativa e local-first. Ha conquistato il primo posto all'hackathon Beautiful Code.
- **[$hyoo_talks](https://talks.hyoo.ru)** — una messaggistica incorporabile. Un prototipo costruito per Sberbank ha ottenuto il secondo posto al Moscow City Hack.
- **[Avatar virtuale](https://avatar.ocas.ai)** — un personaggio 3D con cui puoi parlare, giocare a scacchi o a cui chiedere di presentare delle slide. Un prodotto commerciale in cui $mol guida l'interfaccia sopra librerie di terze parti.

## Sistema di design e strumenti

- **[BuilderUI](https://b-on-g.github.io/builderui/)** — un sistema di design in stile shadcn per $mol: componenti tipizzati — pulsanti, dialoghi, select, card, grafici e altro — più uno Studio per la personalizzazione del tema dal vivo (colore di base, accento, palette dei grafici, raggio, font, chiaro/scuro). Questo sito di documentazione è costruito su di esso.
- **Questo sito** — la documentazione che stai leggendo, incluso il [Playground](#!section=playground) e il [corso](#!section=course), è un'app $mol. La ricerca, l'editor di codice dal vivo e il TypeScript nel browser sono tutti costruiti con il framework che documentano.
- **MAM** — lo strumento di build e il registro dei moduli in cui vive ogni app $mol, ed esso stesso un progetto $mol. È strumentazione per sviluppatori più che un'app ospitata; il codice sorgente è su GitHub.
- **view.tree LSP** — strumentazione di linguaggio e un generatore `npm create view-tree-lsp` che avvia nuove app $mol. Strumentazione da editor, quindi non c'è alcuna app in esecuzione da aprire.

## Hackathon e uso commerciale

$mol ha vinto ripetutamente agli hackathon: primo posto a Beautiful Code ([$hyoo_budget](https://budget.hyoo.ru)), primo posto all'AC-VO-PPR-Hackathon (controllo tramite gesti e voce di un display urbano) e prototipi premiati a More Tech, Moscow City Hack e Dev Hack. È anche presente in sistemi commerciali e industriali — da un back office di un negozio online a pannelli di controllo per la difesa anti-droni. La [pagina delle storie di successo](https://mol.hyoo.ru/#!section=docs/=xanlom_yimh6x) di $mol ne riporta i dettagli.

## Altro

Il [catalogo dei componenti $mol](https://mol.hyoo.ru/#!section=demos) contiene decine di componenti e demo dal vivo che puoi aprire e ispezionare.

Stai costruendo qualcosa con $mol? Il miglior passo successivo è il [Playground](#!section=playground) — prova un'idea in pochi secondi, poi condividi l'URL.
