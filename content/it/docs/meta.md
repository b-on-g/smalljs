# Metadati del modulo

Accanto ai componenti di un modulo, un file `name.meta.tree` dichiara **metadati di build e deploy** — cose che riguardano il modulo nel suo insieme piuttosto che una singola vista. Il modulo dell'app è il posto abituale per esso.

Ecco il `app.meta.tree` di questo sito:

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

## Direttive

- **`deploy \/path`** — copia il file o la cartella indicati nell'output di build di produzione. Usalo per gli asset statici che il deploy deve portare ma che nessun codice importa — immagini, font, icone. Qui `\/bog/smalljs/assets` spedisce il logo e altri file sotto `assets/`.
- **`require \/path`** — forza un modulo nel bundle anche quando nessun codice vi fa riferimento, per il caso in cui il codice di quel modulo debba girare **prima** del codice del modulo che contiene questo `meta.tree`. Viene incluso come una normale dipendenza ad alta priorità. Funzionano sia un percorso di modulo (`\/mol/wire/patch`) sia un singolo file.
- **`include \/path`** — la stessa inclusione forzata, ma per quando l'ordine di caricamento non conta. Il modulo viene incluso ma depriorizzato, quindi si carica dopo il codice che dipende da esso. Esempi: `include \/mol/offline/install` (registra un service worker come effetto collaterale) e `include \/bog/builderui/theme.css` (un foglio di stile grezzo).
- **`pack <name> git \<url>`** — associa un namespace al repository git da cui MAM lo recupera, per es. `pack mol git \https://github.com/hyoo-ru/mam_mol.git`. È così che `$mol_*`, `$hyoo_*` e i tuoi pacchetti si risolvono in codice reale.

Perché forzare un'inclusione? Il builder calcola le dipendenze automaticamente e include nel bundle solo ciò che il tuo codice usa davvero. Ogni tanto ti serve un modulo che il tuo codice *non* referenzia — per esempio un'app che include un intero catalogo di componenti perché esistano a runtime. `require` e `include` coprono esattamente questo caso; differiscono solo nell'ordine di caricamento.

## Dove vive

Le dichiarazioni `pack` appartengono al `.meta.tree` della **radice del workspace** — è il registro di ogni pacchetto che il workspace può recuperare. Tienile lì, non nei sottomoduli; il `meta.tree` proprio di un sottomodulo dovrebbe portare solo i `require`/`include`/`deploy` specifici di esso.
