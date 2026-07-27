# Modul-Metadaten

Neben den Komponenten eines Moduls deklariert eine `name.meta.tree`-Datei **Build- und Deploy-Metadaten** — Dinge, die das Modul als Ganzes betreffen und nicht eine einzelne Ansicht. Das App-Modul ist der übliche Ort dafür.

Hier ist die `app.meta.tree` dieser Seite:

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

## Direktiven

- **`deploy \/path`** — kopiert die genannte Datei oder den genannten Ordner in die Produktions-Build-Ausgabe. Verwenden Sie es für statische Assets, die das Deploy mitführen soll, die aber kein Code importiert — Bilder, Schriftarten, Icons. Hier liefert `\/bog/smalljs/assets` das Logo und andere Dateien unter `assets/` aus.
- **`require \/path`** — erzwingt ein Modul in das Bundle, selbst wenn kein Code darauf verweist, für den Fall, dass der Code dieses Moduls **vor** dem Code des Moduls laufen muss, das diese `meta.tree` enthält. Es wird als normale, hochpriorisierte Abhängigkeit eingebunden. Ein Modulpfad (`\/mol/wire/patch`) oder eine einzelne Datei funktionieren beide.
- **`include \/path`** — dasselbe erzwungene Einbinden, aber für den Fall, dass die Ladereihenfolge keine Rolle spielt. Das Modul wird eingebunden, aber depriorisiert, sodass es nach dem Code lädt, der davon abhängt. Beispiele: `include \/mol/offline/install` (registriert einen Service Worker als Seiteneffekt) und `include \/bog/builderui/theme.css` (ein rohes Stylesheet).
- **`pack <name> git \<url>`** — bildet einen Namensraum auf das Git-Repository ab, aus dem MAM ihn holt, z. B. `pack mol git \https://github.com/hyoo-ru/mam_mol.git`. So werden `$mol_*`, `$hyoo_*` und Ihre eigenen Pakete zu echtem Code aufgelöst.

Warum überhaupt ein Einbinden erzwingen? Der Builder ermittelt Abhängigkeiten automatisch und bündelt nur, was Ihr Code tatsächlich nutzt. Gelegentlich brauchen Sie ein Modul, auf das Ihr Code *nicht* verweist — zum Beispiel eine App, die einen ganzen Katalog von Komponenten bündelt, damit sie zur Laufzeit existieren. `require` und `include` decken genau diesen Fall ab; sie unterscheiden sich nur in der Ladereihenfolge.

## Wo es lebt

`pack`-Deklarationen gehören in die `.meta.tree` der **Workspace-Wurzel** — das ist die Registry jedes Pakets, das der Workspace holen kann. Halten Sie sie dort, nicht in Submodulen; die eigene `meta.tree` eines Submoduls sollte nur die `require`/`include`/`deploy` tragen, die spezifisch für es sind.
