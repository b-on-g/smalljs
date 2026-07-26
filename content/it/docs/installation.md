# Installazione

[Guida introduttiva](#!section=docs/page=getting-started) ti accompagna passo dopo passo nella tua prima applicazione. Questa pagina è il riferimento: com'è organizzato un progetto $mol e come funziona la build.

## Requisiti

- **Node.js 18+** e **git**. Nient'altro viene installato globalmente.

## L'ambiente di lavoro MAM

Le app $mol vivono dentro **MAM** — lo strumento di build e il registro dei moduli. Lo cloni una volta e sviluppi i tuoi moduli al suo interno:

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` avvia un server di sviluppo con osservazione su `http://localhost:9080/`. Ricompila al salvataggio e risolve le dipendenze automaticamente — non mantieni mai una configurazione del bundler.

## Come vengono nominati i moduli

Ogni nome di componente corrisponde a un percorso di cartella, e **ogni trattino basso è un separatore di cartella**:

```
$my_app          →  my/app/
$my_app_header   →  my/app/header/
```

I nomi delle cartelle dei moduli non contengono mai un trattino basso — usa cartelle annidate per i nomi composti da più parole. Se un componente che usi non compare mai nel bundle, quasi sempre il percorso della cartella non corrisponde al nome della classe.

## Anatomia di un modulo

Un componente è una cartella con un massimo di quattro file:

| File | Scopo |
|------|------|
| `name.view.tree` | Layout dichiarativo |
| `name.view.ts` | Comportamento (TypeScript) |
| `name.view.css.ts` | Stili tipizzati |
| `name.view.tree`, `index.html` | Punto di ingresso di un modulo applicativo |

L'`index.html` di un'app monta il componente radice:

```html
<body mol_view_root>
	<div mol_view_root="$my_app"></div>
	<script src="web.js"></script>
</body>
```

## Build per la produzione

Il server di sviluppo compila al volo, ma puoi compilare qualsiasi modulo esplicitamente dalla radice dell'ambiente di lavoro:

```bash
npm run start my/app
```

L'output finisce in `my/app/-/` — inclusi `web.js`, `web.css` e `web.audit.js`. **Controlla sempre l'audit:** un `web.audit.js` pulito significa nessuna dipendenza inutilizzata e nessun errore di tipo.

## Aggiungere pacchetti npm

Referenzia un pacchetto con `require` e MAM lo installa alla build successiva:

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

## Avanti

Con l'ambiente di lavoro pronto, impara come viene descritta l'interfaccia stessa — continua con [Views](#!section=docs/page=views).
