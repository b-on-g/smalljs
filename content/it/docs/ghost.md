# Viste fantasma

`$mol_ghost` è una vista **senza nodo**. Invece di creare un proprio elemento DOM, prende in prestito l'elemento del suo `Sub()` e vi mescola i propri attributi, stili e comportamento. In una riga dal codice sorgente: *«mescolare la logica della vista al nodo DOM di un altro componente.»*

```tree
$mol_ghost $mol_view
	Sub $mol_view
```

Una `$mol_view` normale renderizza il proprio elemento. Una fantasma non ne renderizza **nessuno** — riusa l'elemento del figlio, quindi nulla di extra viene aggiunto all'albero DOM.

## Quando ricorrervi

Usa una fantasma quando vuoi agganciare un comportamento a un componente esistente *senza* avvolgerlo in un altro elemento — trascinamento, rilascio, segui-allo-scorrimento, transizioni. Diversi componenti del framework vi si basano:

- **`$mol_drag`** / **`$mol_drop`** — drag-and-drop con il puntatore
- **`$mol_transit`** — transizioni di entrata/uscita
- **`$mol_follower`** — mantiene un elemento allineato a un altro mentre scorre
- **`$mol_book_page`** — una pagina dentro la navigazione `$mol_book`

## Relazione con i plugin

`$mol_plugin` — la base che ogni [plugin](#!section=docs/page=plugins) estende — è senza elemento per la stessa ragione: arricchisce l'elemento dell'host invece di aggiungerne uno. Una fantasma è la forma generale (avvolgere un figlio e assumerne il nodo); un plugin è la forma specializzata che elenchi sotto `plugins /`.
