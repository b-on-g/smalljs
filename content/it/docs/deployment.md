# Deployment

Un'app $mol compilata è una cartella di file statici. Nessun server da tenere acceso, nessun processo Node da mantenere vivo, nessun adattatore da scegliere: ciò che ospita una cartella ospita l'app.

## Cosa metti in produzione

La build scrive tutto nella cartella `-/` del modulo:

```
my/hello/-/
├── index.html                 riscritto per il percorso di pubblicazione
├── web.js                     tutta l'app, un file solo
├── web.css
├── web.locale=en.json         uno per lingua
├── manifest.json
└── …                          tutto ciò che una direttiva `deploy` ha copiato dentro
```

Quella cartella è il sito. Servila da un qualsiasi host statico e l'app funziona.

Tutto il resto in `my/hello/` è sorgente, e `-/` è generata: il `.gitignore` del workspace ignora `-*`, così il risultato della build non finisce mai nella storia del progetto. Sul web ci arriva dal ramo di deploy.

## In breve

Il workflow lo scrive lo scaffolder, quindi un progetto nuovo si pubblica al push:

```bash
npx create-view-tree-lsp my/hello
git push
```

`.github/workflows/deploy.yml` compila il modulo e spinge `my/hello/-/` sul ramo `gh-pages`. GitHub lo serve appena **Settings → Pages → Source** è su *Deploy from a branch* con `gh-pages` — che è poi il valore predefinito di un repository in cui quel ramo esiste. Se l'URL risponde 404, è la prima impostazione da controllare.

Il sito vive poi su `https://<user>.github.io/<repo>/`.

## Cosa fa davvero il workflow

Lo reggono due action, e ognuna prende un paio di input:

```yaml
- uses: hyoo-ru/mam_build@master2
  with:
      package: "my/hello"     # la cartella da compilare, relativa al workspace
      modules: "app"          # quali moduli al suo interno

- uses: hyoo-ru/gh-deploy@v4.4.1
  if: github.ref == 'refs/heads/main'
  with:
      folder: "my/hello/app/-"
```

`mam_build` monta il workspace MAM attorno al tuo pacchetto, risolve i token `$name` del codice nei repository che li contengono, e compila. Non gli serve né un lockfile né un passo `npm install`: l'elenco delle dipendenze è il registro in `.meta.tree`, come racconta [Struttura del progetto](#!section=docs/page=structure).

`gh-deploy` committa la cartella compilata su `gh-pages`. `target-folder` la mette in una sottocartella invece che nella radice: è così che nasce l'anteprima di un ramo:

```yaml
- name: Deploy feature branch
  if: startsWith(github.ref, 'refs/heads/feature/')
  uses: hyoo-ru/gh-deploy@v4.4.1
  with:
      folder: "my/hello/app/-"
      target-folder: ${{ github.ref_name }}
```

Ogni ramo `feature/*` ha allora un proprio URL sullo stesso sito Pages, e un trigger `delete` rimuove la cartella quando il ramo sparisce.

## Un file di cui il deploy ha bisogno

Un pacchetto che viene pubblicato ha bisogno accanto di un `.gitattributes` con una sola riga:

```
* -text
```

Pubblicare significa committare il risultato della build su un ramo, e quel risultato non è solo testo. Font e immagini normalizzati lungo la strada verso quel commit arrivano rotti al lettore, mentre la build resta verde. Lo scaffolder scrive il file; in un repository che hai creato tu, aggiungilo a mano.

## File che devono stare nella radice del sito

`deploy \/path` in `meta.tree` copia un file dentro `-/` **mantenendo il suo percorso relativo al workspace**. Giusto per gli asset a cui il codice si riferisce, sbagliato per i file che un host cerca nella radice. Un `CNAME`, un `robots.txt`, una pagina di verifica per la search console: quelli si copiano in un passo del workflow dopo la build e prima del passo di deploy.

```yaml
- name: Copy root-level files
  run: cp my/hello/public/CNAME my/hello/app/-/CNAME
```

## Link diretti su un host statico

Un'app con routing a percorso (`/section=docs/page=views` invece di `#!section=docs`) chiede all'host una cosa sola: qualunque percorso sconosciuto sotto il mount deve restituire l'`index.html` dell'app. Altrimenti il primo colpo su un link diretto è un 404, e funziona solo la navigazione dalla home.

GitHub Pages non ha regole di rewrite, quindi la strada passa dal suo `404.html`: viene servito per ogni percorso sconosciuto, e poche righe al suo interno restituiscono l'indirizzo a `index.html`, che il router espande nella rotta vera. Si copia accanto al risultato della build, come i file qui sopra.

Gli altri host lo dicono in una riga: `try_files $uri /index.html` in nginx, `try_files {path} /index.html` in Caddy, una regola `/* /index.html 200` su Netlify.

A un'app sul router a hash (quello predefinito) non serve niente di tutto questo: quel che sta dopo `#` al server non arriva mai.

## Controllare prima di pushare

La build è la stessa in locale e in CI, quindi un audit verde in locale significa un deploy verde:

```bash
npx mam my/hello/app
cat my/hello/app/-/web.audit.js
```

`Audit passed` è tutto il rapporto. Per vedere la cosa vera, servi la cartella con un qualsiasi server statico:

```bash
npx serve my/hello/app/-
```

## Oltre GitHub Pages

Niente di quanto sopra è specifico di GitHub. L'output è una cartella, il deploy è una copia. Netlify, Cloudflare Pages, S3 dietro una CDN, nginx su un VPS, un'immagine Docker con dentro la cartella: il passo di build è sempre `npx mam my/hello/app`, e quello che carichi è `my/hello/app/-`.

Per un'installazione che funzioni offline, [Offline](#!section=docs/page=offline) aggiunge il service worker che mette in cache il bundle, e la stessa cartella diventa un'app installabile.
