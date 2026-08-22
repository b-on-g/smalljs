# Struttura del progetto

Un progetto $mol ha quattro livelli annidati: il **workspace** che hai clonato, i **pacchetti** al suo interno, i **moduli** dentro a questi, e i **file** dentro a un modulo. Ogni livello risponde a una domanda diversa, e gran parte di ciò che fa la build discende dal sapere qual è quale.

```
mam/                            workspace — il checkout di MAM
├── .meta.tree                  registro: quale pacchetto viene da quale repo
├── package.json
├── mol/                        pacchetto — il framework, un repo git a sé
│   └── button/                 modulo — il componente $mol_button
│       ├── button.view.tree
│       ├── button.view.ts
│       ├── major/              sottomodulo — $mol_button_major
│       └── minor/              sottomodulo — $mol_button_minor
└── my/                         pacchetto — il tuo
    ├── .gitattributes          `* -text` — tiene intatti i binari costruiti
    └── hello/                  modulo — il componente $my_hello
        ├── index.html          punto d'ingresso (solo moduli applicativi)
        ├── hello.view.tree     layout
        ├── hello.view.ts       comportamento
        ├── hello.view.css.ts   stili, in TypeScript
        ├── hello.locale=ru.json
        ├── hello.meta.tree     direttive di build e di deploy
        ├── form/               sottomodulo — $my_hello_form
        ├── -view.tree/         generato da hello.view.tree
        └── -/                  output della build
```

## Workspace

MAM lo cloni una volta e ci lavori dentro. Non è una cartella in cui vengono copiate le dipendenze: ogni pacchetto sta lì come checkout git a sé, con la sua storia, così puoi leggere il sorgente del framework, metterci dentro un `debugger` e aprire una pull request dalla stessa copia di lavoro.

Il `.meta.tree` di radice è il registro che rende possibile tutto questo:

```tree
pack mol git \https://github.com/hyoo-ru/mam_mol.git
pack hyoo git \https://github.com/hyoo-ru/mam_hyoo.git
pack lib git \https://github.com/hyoo-ru/mam_lib.git
```

Quando la build incontra `$mol_view` e non c'è ancora una cartella `mol/`, cerca il nome qui e clona il repository. Nulla viene vendorizzato e nulla viene appiattito.

## Pacchetti

Una cartella di primo livello è un pacchetto, e un pacchetto è un repository git. Il tuo pacchetto è semplicemente una cartella a cui dai un nome: finché resta locale non ha bisogno di registrazione, e di una riga `pack` il giorno in cui vorrai recuperarlo per nome.

I pacchetti si annidano. Un pacchetto può portare le proprie dichiarazioni `pack` per le cartelle al suo interno, e MAM le legge dal `meta.tree` della cartella che conterrà il pacchetto. Questo sito vive in `bog/smalljs/` ed è un repository a sé, elencato in `bog/bog.meta.tree`, che a sua volta sta dentro il checkout `bog/` elencato nel `.meta.tree` di radice.

### Un file che serve a ogni pacchetto

Un pacchetto che viene deployato ha bisogno di un `.gitattributes` con una sola riga:

```
* -text
```

Questo disattiva la normalizzazione dei fine riga di git. Conta perché il deploy significa committare l'output della build su un branch, e quell'output non è solo testo: questo sito spedisce 57 file binari, i font che ospita da sé e un'immagine di anteprima per ogni pagina. Normalizzati all'ingresso, arrivano al lettore come immagini e font rotti, mentre la build stessa resta verde. Il checkout di MAM ha lo stesso file nella sua radice, dove i formati dei font sono in più marcati `binary`.

Lo scaffolder lo scrive per te; in un repository che hai avviato tu, aggiungilo a mano.

## Moduli

Un modulo è una cartella, e una cartella è un componente. Non esiste istruzione di import né mappa dei moduli: il nome della classe *è* l'indirizzo, e ogni trattino basso al suo interno è un separatore di cartella:

```
$my_hello          →  my/hello/
$my_hello_form     →  my/hello/form/
$mol_button_major  →  mol/button/major/
$mol_after_frame   →  mol/after/frame/
```

È tutta qui la regola di risoluzione. Il builder scandaglia il tuo testo sorgente in cerca di token `$name`, spezza ciascuno su `_` e percorre le cartelle. Nulla dichiara una dipendenza; usare un nome è la dichiarazione.

La conseguenza pratica: **i nomi delle cartelle dei moduli non contengono mai un trattino basso.** Una cartella chiamata `my/hello_form/` verrebbe cercata in `my/hello/form/` e mai trovata — il sintomo è una classe che compila nel tuo editor ma manca nel bundle.

Un modulo che ha sottomoduli può restare un componente esso stesso, in una di due forme. `$mol_button` vive direttamente in `mol/button/`, accanto a `major/` e `minor/`. `$mol_view` vive un livello più in basso, in `mol/view/view/`, perché `mol/view/` ospita anche `component/`, `selection/` e `tree2/`. MAM prova prima il percorso raddoppiato e ripiega su quello più corto, così entrambe le disposizioni si risolvono.

## File in un modulo

Ogni file è opzionale. Un modulo è l'insieme dei file che gli capita di contenere.

| File | Scopo |
|------|---------|
| `hello.view.tree` | Layout dichiarativo |
| `hello.view.ts` | Comportamento: la classe che estende la base generata |
| `hello.view.css.ts` | Stili tipizzati. Nota il `.ts` finale: è TypeScript che chiama `$mol_style_define`, non un foglio di stile |
| `hello.ts` | Un modulo senza alcuna vista — modelli, utilità, logica pura |
| `hello.test.ts` | Test, eseguiti dal builder |
| `hello.locale=ru.json` | Traduzioni; viene raccolto qualsiasi file che finisce in `.locale=<lang>.json` |
| `hello.meta.tree` | Direttive di build e di deploy |
| `index.html` | Punto d'ingresso — serve solo a un modulo applicativo |

Un suffisso prima dell'estensione restringe un file a un solo ambiente:

- `frame.web.ts` — solo bundle browser, come `mol/after/frame/frame.web.ts`
- `build.node.ts` — solo bundle Node, come il builder di MAM stesso
- `hello.test.ts` — solo bundle di test

Il builder produce un bundle `web` e uno `node` per ogni applicazione e scarta i file marcati per l'altro, così il codice di piattaforma non deve mai difendersi a runtime.

Accanto a un modulo sono accettati anche file `.css` grezzi: il framework li usa per le poche cose che gli stili tipizzati non riescono a esprimere, come `@keyframes` e `content:`. Tutto il resto appartiene a `.view.css.ts`, dove i nomi delle proprietà vengono controllati.

## Le cartelle generate iniziano con un trattino

MAM considera un nome come sorgente solo se inizia con una lettera o una cifra. Tutto il resto è invisibile alla build, ed è per questo che ogni cartella generata ha il prefisso `-`: l'output può stare proprio accanto al suo input senza essere riletto come input. Il `.gitignore` del workspace ignora `-*` per la stessa ragione.

**`-view.tree/`** compare accanto a ogni file `.view.tree` e contiene ciò in cui l'albero viene compilato:

```
my/hello/-view.tree/
├── hello.view.tree.js            la classe base generata
├── hello.view.tree.d.ts          la sua interfaccia tipizzata
└── hello.view.tree.locale=en.json  le stringhe @, estratte
```

Il tuo `hello.view.ts` estende la classe che sta lì dentro. È tutto qui il rapporto fra i due file — [Da TypeScript a view.tree](#!section=docs/page=from-ts-to-view-tree) percorre il codice generato riga per riga.

**`-css/`** compare accanto a un file `.css` grezzo e contiene un `.ts` generato che avvolge il foglio di stile in una chiamata a `$mol_style_attach`, così viaggia con il bundle invece di richiedere un `<link>`.

**`-/`** è l'output della build di un modulo che hai costruito. Per un'applicazione contiene `web.js`, `web.css`, `web.audit.js`, `web.d.ts`, `web.deps.json`, un `web.locale=<lang>.json` per lingua, le controparti `node`, un `index.html` riscritto, più un `package.json` e un `manifest.json` generati. Questa cartella è ciò che deployi: pubblicare `app/-` su un host statico è l'intero passo di deploy.

Nessuno di questi si modifica a mano. Il builder li riscrive ogni volta che cambia la loro sorgente, quindi una modifica lì sparisce al salvataggio successivo, senza alcun errore che ti dica perché. Cambia il `.view.tree`, il `.css` o i sorgenti, e ricostruisci.

## Che cosa fa davvero meta.tree

`meta.tree` non è un manifesto di pacchetto e non elenca dipendenze: quelle vengono dal codice, dove un token `$mol_view` è già l'intera dichiarazione. Porta quella manciata di cose che il codice non può dire da sé. L'`app/app.meta.tree` di questo sito è il file per intero:

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

- **`deploy \/path`** copia un file o una cartella dentro `-/`, mantenendo il suo percorso relativo al workspace: `\/bog/smalljs/assets` finisce in `app/-/bog/smalljs/assets/`. Per i file statici che il deploy deve portarsi dietro ma che nessun codice importa: immagini, font, icone.
- **`include \/path`** e **`require \/path`** tirano dentro un modulo che nulla referenzia, come `\/mol/offline/install`, il cui unico scopo è il service worker che registra al caricamento. Differiscono solo nell'ordine: `require` mette il modulo prima del codice che lo ha tirato dentro, `include` dopo.
- **`pack <name> git \<url>`** è la voce di registro descritta sopra, letta dal file meta della cartella che conterrà il pacchetto.

MAM legge ogni file `*.meta.tree` in una cartella, quindi il nome non porta significato oltre la convenzione: `<module>.meta.tree` accanto a un modulo, `.meta.tree` nella radice del workspace.

In pratica `deploy`, `include` e `require` appartengono al modulo applicativo, perché è quello la cosa che viene costruita e deployata; i componenti ordinari risolvono tutto dal proprio codice e non hanno bisogno di alcun file meta. Un modulo di libreria ne riceve uno solo quando ha davvero una dipendenza non referenziata: `mol/assert/assert.meta.tree` è una sola riga `include \/mol/dev/format`, e quella è una dimensione tipica.

Per saperne di più sulle direttive vedi [Metadati del modulo](#!section=docs/page=meta).

## Avanti

[Installazione](#!section=docs/page=installation) copre il dev server e la build di produzione, e [Strumenti](#!section=docs/page=tooling) ha uno scaffolder che ti scrive un layout di modulo corretto.
