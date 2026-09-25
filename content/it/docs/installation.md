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

Referenzia un pacchetto con `require` e MAM lo installa alla build successiva e lo inserisce nel bundle:

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

### Caricare un pacchetto a runtime

Una libreria pesante che serve a una sola schermata non deve per forza stare in `web.js`. Distribuisci il suo file per browser già compilato accanto al bundle e caricalo al primo utilizzo.

Elenca il file nel `meta.tree` del modulo:

```tree
deploy \/node_modules/@turf/turf/turf.min.js
```

`deploy` installa il pacchetto se manca e copia il file in `-/node_modules/@turf/turf/turf.min.js`, sia sul dev server sia nella build di produzione. Caricalo con `$mol_import.script`:

```typescript
namespace $ {
	export class $my_app_turf extends $mol_object {

		@ $mol_mem
		static api() {
			$mol_import.script( './node_modules/@turf/turf/turf.min.js' )
			return ( globalThis as any ).turf as typeof import(
				'@turf/turf'
			)
		}

	}
}
```

- Il percorso è relativo e si risolve rispetto alla pagina in `-/`, quindi lo stesso codice funziona sul dev server, in `test.html` e in un deploy sotto un sottopercorso. Un `/` iniziale funziona solo finché l'app sta nella radice del dominio.
- `$mol_import.script` sospende la fibra finché lo script non è caricato e mette in cache per URL: il file viene scaricato una volta, e tutto ciò che legge `$my_app_turf.api()` dentro `$mol_mem` semplicemente lo attende.
- Il nome globale, qui `turf`, è quello assegnato dalla build per browser della libreria. Il suo README dice quale.
- `typeof import( … )` fornisce la tipizzazione completa. Tieni il nome del pacchetto su una riga a sé: il builder considera una dipendenza `require( '…' )` e `import( '…' )` scritti su una riga e finirebbe comunque per mettere l'intero pacchetto in `web.js`.

## Avanti

Con l'ambiente di lavoro pronto, impara come viene descritta l'interfaccia stessa — continua con [Views](#!section=docs/page=views).
