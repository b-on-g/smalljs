# FAQ

## Was ist smalljs?

smalljs ist die Dokumentationsseite für **$mol** — ein reaktives UI-Framework mit typisierten Ansichten, automatischer Reaktivität und ohne virtuelles DOM. Das Framework selbst wird offen von der hyoo-ru-Community entwickelt; diese Seite bündelt einen Leitfaden, einen interaktiven Kurs, einen Live-Playground und eine API-Referenz an einem Ort.

## Ist $mol produktionsreif?

Ja. $mol treibt echte Apps und interne Werkzeuge an — siehe das [Schaufenster](#!section=docs/page=showcase). Es wird aus einem einzigen Monorepo (MAM) ausgeliefert und täglich von seinen Autoren und der Community genutzt.

## Wie groß ist die Laufzeit?

Klein. Eine minimale App umfasst etwa 123 KB unkomprimiertes JavaScript bzw. rund 20 KB über die Leitung nach der Komprimierung. Das Rendering ist standardmäßig virtualisiert (Komponenten außerhalb des sichtbaren Bereichs werden nie erzeugt), und der Build liefert nur die Module aus, die Sie tatsächlich verwenden, sodass das Bundle mit Ihrer App wächst und nicht mit dem Framework. Siehe [Rendering](#!section=docs/page=rendering) für Details und reproduzierbare Benchmarks.

## Muss ich eine neue Template-Sprache lernen?

Sie lernen `view.tree`, eine kompakte Baum-Syntax zur Deklaration des Komponenten-Layouts. Sie ist bewusst klein — das Kapitel [Ansichten](#!section=docs/page=views) deckt alles Nötige in einer Sitzung ab. Die Logik bleibt in reinem TypeScript, und Stile sind ebenfalls typisiert.

## Wie unterscheidet es sich von React, Vue oder Svelte?

Reaktivität ist automatisch — es gibt kein `useState`, `useEffect` oder manuelles Abonnement. Sie beschreiben, *was* die UI ist; $mol entscheidet, *wie* und *wann* sie aktualisiert wird. Die [Konzept-Übersetzungstabelle](#!section=docs/page=rosetta) bildet Ideen anderer Frameworks auf $mol ab.

## Wo bekomme ich Hilfe?

- Fragen Sie in der [DEV-Community](https://dev.to/t/mol)
- Durchstöbern Sie [$mol-Quellcode und Issues auf GitHub](https://github.com/hyoo-ru/mam_mol)
- Lesen Sie die Referenzdokumentation auf [mol.hyoo.ru](https://mol.hyoo.ru/)

## Unter welcher Lizenz steht es?

MIT. Sie können $mol frei in kommerziellen und Open-Source-Projekten verwenden.
