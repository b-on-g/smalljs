# Schaufenster

Echte Dinge, die mit $mol gebaut wurden — Community-Apps, kommerzielle Produkte und Entwicklerwerkzeuge. Jedes ist eine funktionierende App, keine Demo.

## Apps

- **[Bog Music](https://b-on-g.github.io/music/)** — ein Musikplayer, der sowohl als Chrome-Erweiterung als auch als Web-App läuft, mit Hintergrundwiedergabe und Offline-Caching. $mol treibt die Oberfläche und den local-first Zustand an.
- **[Blitz Quiz](https://b-on-g.github.io/blitz/)** — ein Kahoot-artiges Live-Quiz, gebaut auf $mol und Giper Baza. Räume synchronisieren sich in Echtzeit über die CRDT-Schicht, es gibt also keinen Spielserver zu betreiben.
- **[VDO Rebalance](https://b-on-g.github.io/invest/)** — ein local-first Investment-Werkzeug: legen Sie ein `.xlsx`-Portfolio ab und erhalten Sie die Trades, die es neu ausbalancieren. Der Zustand lebt im Browser über Giper Baza.
- **[$hyoo_budget](https://budget.hyoo.ru)** — eine kollaborative, local-first Haushaltsbuch-App. Sie belegte den ersten Platz beim Beautiful-Code-Hackathon.
- **[$hyoo_talks](https://talks.hyoo.ru)** — ein einbettbarer Messenger. Ein für Sberbank gebauter Prototyp belegte den zweiten Platz beim Moscow City Hack.
- **[Virtueller Avatar](https://avatar.ocas.ai)** — eine 3D-Figur, mit der Sie sprechen, Schach spielen oder die Sie um eine Präsentation bitten können. Ein kommerzielles Produkt, bei dem $mol die Oberfläche über Drittanbieter-Bibliotheken steuert.

## Designsystem und Werkzeuge

- **[BuilderUI](https://b-on-g.github.io/builderui/)** — ein shadcn-artiges Designsystem für $mol: typisierte Komponenten — Buttons, Dialoge, Auswahlfelder, Karten, Diagramme und mehr — plus ein Studio für Live-Theming (Basisfarbe, Akzent, Diagrammpalette, Radius, Schriftarten, Hell/Dunkel). Diese Dokumentationsseite ist darauf gebaut.
- **Diese Seite** — die Dokumentation, die Sie lesen, einschließlich [Playground](#!section=playground) und [Kurs](#!section=course), ist eine $mol-App. Die Suche, der Live-Code-Editor und das TypeScript im Browser sind alle mit dem Framework gebaut, das sie dokumentieren.
- **MAM** — das Build-Werkzeug und die Modul-Registry, in der jede $mol-App lebt, und selbst ein $mol-Projekt. Es ist Entwicklerwerkzeug statt einer gehosteten App; der Quellcode liegt auf GitHub.
- **view.tree LSP** — Sprachwerkzeuge und ein `npm create view-tree-lsp`-Generator, der neue $mol-Apps startet. Editor-Werkzeug, es gibt also keine laufende App zu öffnen.

## Hackathons und kommerzielle Nutzung

$mol hat wiederholt bei Hackathons gewonnen: erster Platz bei Beautiful Code ([$hyoo_budget](https://budget.hyoo.ru)), erster Platz beim AC-VO-PPR-Hackathon (Gesten- und Sprachsteuerung einer Stadtanzeige) und preisgekrönte Prototypen bei More Tech, Moscow City Hack und Dev Hack. Es ist auch in kommerziellen und industriellen Systemen im Einsatz — von einem Online-Shop-Backoffice bis zu Drohnenabwehr-Kontrolltafeln. Die [Erfolgsgeschichten-Seite](https://mol.hyoo.ru/#!section=docs/=xanlom_yimh6x) von $mol hat die Details.

## Mehr

Der [$mol-Komponentenkatalog](https://mol.hyoo.ru/#!section=demos) hat Dutzende von Live-Komponenten und Demos, die Sie öffnen und inspizieren können.

Bauen Sie etwas mit $mol? Der beste nächste Schritt ist der [Playground](#!section=playground) — probieren Sie eine Idee in Sekunden aus und teilen Sie dann die URL.
