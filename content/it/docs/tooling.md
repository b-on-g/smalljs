# Strumenti

$mol funziona in qualsiasi editor, ma un piccolo insieme di strumenti rende `.view.tree` e gli stili tipizzati molto più comodi: uno scaffolder di progetto, un language server, le integrazioni per gli editor Zed e VS Code e una skill che insegna il framework agli assistenti LLM.

## Generare un progetto

`create-view-tree-lsp` genera un modulo $mol pronto all'uso, così non devi mettere insieme il boilerplate a mano:

```bash
npx create-view-tree-lsp bog/myapp
```

L'argomento è il percorso del modulo (`namespace/name`, o l'equivalente `bog_myapp`). Scrive `view.tree`, `view.ts`, `view.css.ts` e `index.html` per un'app funzionante, più le GitHub Actions per il deploy. Per impostazione predefinita include anche uno store local-first **Giper Baza**, una configurazione **Docker** e un guscio desktop **Tauri**. Disattivane uno qualsiasi con un flag:

```bash
npx create-view-tree-lsp bog/myapp --no-baza --no-docker --no-tauri
```

Alcuni pezzi sono invece opzionali:

- `--backend` aggiunge un backend REST `$mol_server` con storage `node:sqlite` e un tipo di item TypeScript condiviso
- `--prerender` e `--seo` aggiungono la visibilità per i motori di ricerca, descritta più sotto sotto [Integrazione continua](#!section=docs/page=tooling/Docs.Body=Integrazione%20continua)

Lo scaffolder è un sottile wrapper attorno alla CLI del language server, quindi `npx view-tree-lsp create bog/myapp` fa la stessa cosa direttamente.

## Integrazione continua

Lo scaffolder scrive le GitHub Actions in `.github/workflows/`, così un nuovo progetto viene deployato e rilasciato senza configurazione aggiuntiva.

`deploy.yml` gira a ogni push. Costruisce l'app con `hyoo-ru/mam_build`, pubblica `app/-` su **GitHub Pages** da `main` e assegna a ogni branch `feature/*` una propria cartella di anteprima — rimossa automaticamente quando il branch viene eliminato.

### SEO

Due opzioni indipendenti, entrambe attivate dai tag `v*`:

- **`--prerender`** renderizza le schermate che elenchi (come `home`) in HTML statico con `b-on-g/mol-prerender-action`, così i crawler e le anteprime dei link vedono contenuto reale.
- **`--seo`** aggiunge il runtime `$bog_seo`: un router basato sul pathname con sitemap, `robots.txt`, `llms.txt` e iniezione dei meta per pagina. Il job serve il build, esporta l'HTML prerenderizzato canonico e lo reincorpora nel deploy.

Ricorri all'azione di prerender quando una manciata di schermate pubbliche deve essere indicizzabile, e a `$bog_seo` quando ti servono sitemap e metadati per pagina.

### Desktop Tauri

Con l'opzione Tauri, `tauri.yml` costruisce i binari desktop sui tag `v*` (o su richiesta) tramite il workflow riutilizzabile `b-on-g/tauri-mol-workflow-template`, dallo stesso modulo che deployi sul web.

## Language server

`view-tree-lsp` è un'implementazione del Language Server Protocol per il formato `view.tree`. Eseguilo all'occorrenza con npx, senza installazione globale:

```bash
npx view-tree-lsp@latest
```

Analizza il tuo workspace e offre a qualsiasi editor compatibile con LSP:

- il completamento per i componenti `$mol_*` e per i componenti e le proprietà definiti nel tuo progetto
- suggerimenti di proprietà limitati al componente sotto il cursore
- una struttura delle dichiarazioni dei componenti per la navigazione
- aggiornamenti in tempo reale al variare dei file

Poiché parla LSP, puoi puntare il language client di qualsiasi editor a `npx view-tree-lsp`. Le due integrazioni qui sotto lo cablano per te.

## Zed

L'estensione **View Tree Syntax Highlighting for $mol** racchiude la grammatica tree-sitter, il language server e un tema di icone opzionale. Installala dal gestore di estensioni di Zed:

1. Apri la palette dei comandi (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Esegui **zed: extensions**
3. Cerca `view.tree` o `mol` e installa l'estensione

Ottieni evidenziazione della sintassi, completamento e struttura per i file `.view.tree`. Il [sorgente](https://github.com/Dev-cmyser/zed-view.tree-mol-support) e un [tema di icone](https://github.com/Dev-cmyser/zed-viewtree-icon-theme) abbinato sono su GitHub.

## VS Code

Il workspace MAM porta già con sé la sua configurazione di VS Code. Quando apri la cartella `mam` clonata, VS Code propone di installare le estensioni consigliate da `.vscode/extensions.json`:

- `nin-jin.vscode-language-tree` — supporto al linguaggio `view.tree`
- `stan-donarise.view-tree-language` — sintassi e grammatica
- `editorconfig.editorconfig` — formattazione coerente

La stessa cartella include `mol.code-snippets`, così gli snippet di componenti e binding sono disponibili senza alcuna configurazione aggiuntiva. Accetta la richiesta e i file `.view.tree` e TypeScript vengono evidenziati da subito.

## Skill per LLM

`mol_skill` fornisce a un assistente IA il contesto che serve per scrivere $mol: la sintassi `view.tree`, la struttura di un modulo MAM, la divisione tra `view.ts` e `view.css.ts`, la modellazione dei dati con Giper Baza e il packaging con Tauri. È una semplice cartella di skill, un flusso `SKILL.md` più le guide di riferimento, quindi qualsiasi strumento LLM che legga il formato skills può caricarla, Claude Code e Cursor compresi. Installala con la CLI skills:

```bash
npx skills add b-on-g/mol_skill --all -g
```

Poi chiedi con parole tue (“struttura di un modulo MAM”, “CRUD e ruoli in Giper Baza”): l'assistente apre il riferimento giusto prima di rispondere, così il codice che scrive segue le convenzioni di questa documentazione. Il [sorgente](https://github.com/b-on-g/mol_skill) è su GitHub, e i file di riferimento si leggono benissimo anche da soli, se preferisci scorrerli tu.

## Link

- Scaffolder — [create-view-tree-lsp](https://github.com/Dev-cmyser/create-view-tree-lsp)
- Language server — [view-tree-lsp](https://github.com/Dev-cmyser/view.tree)
- Estensione Zed — [zed-view.tree-mol-support](https://github.com/Dev-cmyser/zed-view.tree-mol-support)
- Skill per LLM — [mol_skill](https://github.com/b-on-g/mol_skill)
