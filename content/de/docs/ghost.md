# Ghost-Ansichten

`$mol_ghost` ist eine **knotenlose** Ansicht. Statt ein eigenes DOM-Element zu erzeugen, leiht sie sich das Element ihres `Sub()` und mischt ihre eigenen Attribute, Stile und ihr Verhalten hinein. In einer Zeile aus dem Quellcode: *„View-Logik in den DOM-Knoten einer anderen Komponente einmischen."*

```tree
$mol_ghost $mol_view
	Sub $mol_view
```

Eine normale `$mol_view` rendert ihr eigenes Element. Ein Ghost rendert **keines** — er verwendet das Element des Kindes wieder, sodass dem DOM-Baum nichts Zusätzliches hinzugefügt wird.

## Wann man dazu greift

Verwenden Sie einen Ghost, wenn Sie Verhalten an eine bestehende Komponente anhängen wollen, *ohne* sie in ein weiteres Element zu hüllen — Ziehen, Ablegen, Mitscrollen, Übergänge. Mehrere Framework-Komponenten bauen darauf auf:

- **`$mol_drag`** / **`$mol_drop`** — Zeiger-Drag-and-Drop
- **`$mol_transit`** — Ein-/Ausblende-Übergänge
- **`$mol_follower`** — hält ein Element an einem anderen ausgerichtet, während es scrollt
- **`$mol_book_page`** — eine Seite innerhalb der `$mol_book`-Navigation

## Beziehung zu Plugins

`$mol_plugin` — die Basis, die jedes [Plugin](#!section=docs/page=plugins) erweitert — ist aus demselben Grund element-los: es erweitert das Element des Hosts, statt eines hinzuzufügen. Ein Ghost ist die allgemeine Form (ein Kind umhüllen und dessen Knoten übernehmen); ein Plugin ist die spezialisierte Form, die Sie unter `plugins /` auflisten.
