# Rendering

Questo capitolo riguarda ciò che accade tra il cambiamento del tuo stato reattivo e l'aggiornamento dei pixel sullo schermo. Raramente devi pensarci — ma capire il modello spiega perché il codice $mol resta veloce senza sforzo particolare.

## Nessun DOM virtuale

$mol non confronta un albero virtuale. Ogni proprietà della vista è legata direttamente al nodo o all'attributo del DOM che controlla, attraverso le stesse celle reattive che hai già incontrato in [Stato](#!section=docs/page=state). Quando una cella cambia, solo i binding esatti che la leggono vengono rieseguiti — non un sottoalbero, non una funzione di componente, solo le proprietà interessate.

Ciò significa che non c'è alcuna passata di riconciliazione da ottimizzare, nessuna chiave da regolare a mano per un diff di lista e nessun `memo`/`shouldComponentUpdate` a cui ricorrere. Il grafo delle dipendenze conosce già l'insieme minimo di aggiornamenti.

## I componenti sono pigri

Una vista viene costruita solo quando qualcosa la richiede. Una schermata verso cui non navighi mai non viene mai costruita; una scheda che non apri mai non costa nulla. Poiché la costruzione è su richiesta e memorizzata nella cache, comporre grandi alberi di componenti è economico — le parti che non servono semplicemente non esistono ancora.

## Il rendering è virtualizzato

$mol renderizza solo ciò che è dentro l'area visibile. I componenti scrollati fuori dalla vista non vengono mantenuti come DOM nascosto — non vengono creati affatto, e vengono costruiti nel momento in cui entrano nell'intervallo. Questa è una proprietà architetturale del framework, non una funzionalità opzionale né un componente lista speciale: qualsiasi layout è virtualizzato, quindi una lista di dieci elementi e una di diecimila costano più o meno lo stesso da visualizzare.

L'effetto pratico è che scrivi normali alberi di componenti e lunghe liste senza ricorrere a librerie di windowing.

## Numeri riproducibili

Le affermazioni sulle prestazioni sono utili solo se puoi riprodurle. Anziché citare cifre qui, $mol partecipa al **js-framework-benchmark** della comunità; puoi leggerne i risultati e rieseguire la suite tu stesso:

[Risultati di js-framework-benchmark](https://nin-jin.github.io/js-framework-benchmark/webdriver-ts-results/table.html)

Considera ciò come la fonte di verità per i confronti — misurata, versionata e indipendente da questa pagina.

## Avanti

Questo completa il modello di base di come $mol funziona. Poi, mettilo all'opera per caricare dati reali in [Recupero dati](#!section=docs/page=data).
