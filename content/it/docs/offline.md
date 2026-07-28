# Offline

Un'app $mol può continuare a funzionare senza rete — aprila una volta online e resta utilizzabile dopo che vai offline, fino all'installazione come PWA. Questo deriva da un unico modulo integrato, `mol/offline/install`, ed è indipendente da qualsiasi livello dati.

## Cosa fa

`mol/offline/install` esegue `$mol_offline`, che registra un **service worker** (`web.js`) come proxy di cache. Ogni `GET` riuscito di una risorsa statica — il bundle dell'app, gli stili, le immagini — viene memorizzato in una cache chiamata `$mol_offline`. A un caricamento successivo il worker serve quelle risposte direttamente dalla cache, così l'app si apre all'istante e sopravvive a un errore HTTP o a una connessione persa ripiegando sulla copia in cache. Poiché l'intera app è memorizzabile e servita così, il browser può proporre di **installarla come PWA**.

## Come abilitarlo

Aggiungi una riga al `*.meta.tree` della tua app:

```tree
include \/mol/offline/install
```

Questo include forzato tira il modulo nel bundle, così il suo service worker si registra come effetto collaterale — nessun altro codice deve referenziarlo. Per come funziona `include`, vedi [Metadati del modulo](#!section=docs/page=meta).

Due requisiti del browser a runtime:

- Servi in **HTTPS** (o `localhost` in sviluppo) — altrimenti i service worker si rifiutano di girare.
- Fornisci un manifest di web app affinché l'app sia installabile.

## Cosa *non* è

La cache offline tiene *un* client funzionante senza rete. **Non** sincronizza i dati tra i client: le richieste con una query string passano direttamente, e le richieste non-`GET` non vengono mai memorizzate. Quando più client o dispositivi devono condividere gli stessi dati dal vivo e modificabili — con fusioni senza conflitto — è un'altra questione, gestita dal progetto separato [Giper Baza](#!section=docs/page=giper-baza).
