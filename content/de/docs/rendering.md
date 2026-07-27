# Rendering

Dieses Kapitel handelt davon, was zwischen der Änderung Ihres reaktiven Zustands und der Aktualisierung der Pixel auf dem Bildschirm passiert. Sie müssen selten darüber nachdenken — aber das Modell zu verstehen erklärt, warum $mol-Code ohne besonderen Aufwand schnell bleibt.

## Kein virtuelles DOM

$mol vergleicht keinen virtuellen Baum. Jede Ansichtseigenschaft ist direkt an den DOM-Knoten oder das Attribut gebunden, das sie steuert, durch dieselben reaktiven Zellen, die Sie bereits in [Zustand](#!section=docs/page=state) kennengelernt haben. Wenn sich eine Zelle ändert, laufen nur die genauen Bindungen erneut, die sie lesen — kein Teilbaum, keine Komponentenfunktion, nur die betroffenen Eigenschaften.

Das bedeutet, es gibt keinen Abgleichsdurchlauf zu optimieren, keine Schlüssel, die man für einen Listen-Diff von Hand feinjustieren muss, und kein `memo`/`shouldComponentUpdate`, zu dem man greifen müsste. Der Abhängigkeitsgraph kennt bereits die minimale Menge an Aktualisierungen.

## Komponenten sind faul

Eine Ansicht wird erst konstruiert, wenn etwas sie anfordert. Ein Bildschirm, zu dem Sie nie navigieren, wird nie gebaut; ein Tab, den Sie nie öffnen, kostet nichts. Da die Konstruktion bedarfsgesteuert und zwischengespeichert ist, ist das Zusammensetzen großer Komponentenbäume günstig — die nicht benötigten Teile existieren einfach noch nicht.

## Rendering ist virtualisiert

$mol rendert nur, was sich im sichtbaren Bereich befindet. Aus dem Sichtfeld gescrollte Komponenten werden nicht als verstecktes DOM behalten — sie werden gar nicht erst erstellt und in dem Moment gebaut, in dem sie in den Bereich scrollen. Dies ist eine architektonische Eigenschaft des Frameworks, kein optionales Feature und keine spezielle Listenkomponente: jedes Layout ist virtualisiert, sodass eine Liste mit zehn Elementen und eine Liste mit zehntausend etwa gleich viel zum Anzeigen kosten.

Der praktische Effekt ist, dass Sie gewöhnliche Komponentenbäume und lange Listen schreiben, ohne zu Windowing-Bibliotheken zu greifen.

## Reproduzierbare Zahlen

Leistungsaussagen sind nur nützlich, wenn Sie sie reproduzieren können. Statt hier Zahlen zu nennen, nimmt $mol am gemeinschaftlichen **js-framework-benchmark** teil; Sie können dessen Ergebnisse lesen und die Suite selbst erneut ausführen:

[js-framework-benchmark-Ergebnisse](https://nin-jin.github.io/js-framework-benchmark/webdriver-ts-results/table.html)

Betrachten Sie das als die Quelle der Wahrheit für Vergleiche — gemessen, versioniert und unabhängig von dieser Seite.

## Weiter

Damit ist das Kernmodell, wie $mol läuft, vollständig. Als Nächstes setzen Sie es ein, um echte Daten in [Datenabruf](#!section=docs/page=data) zu laden.
