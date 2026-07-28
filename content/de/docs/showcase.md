# Schaufenster

Echte Dinge, die mit $mol gebaut wurden — Community-Apps, kommerzielle Produkte und Entwicklerwerkzeuge. Jedes ist eine funktionierende App, keine Demo.

## Apps

- **[Bog Music](https://b-on-g.github.io/music/)** — ein Musikplayer, der sowohl als Chrome-Erweiterung als auch als Web-App läuft, mit Hintergrundwiedergabe und Offline-Caching. $mol treibt die Oberfläche und den local-first Zustand an.
- **[Blitz Quiz](https://b-on-g.github.io/blitz/)** — ein Kahoot-artiges Live-Quiz, gebaut auf $mol und Giper Baza. Räume synchronisieren sich in Echtzeit über die CRDT-Schicht, es gibt also keinen Spielserver zu betreiben.
- **[VDO Rebalance](https://b-on-g.github.io/invest/)** — ein local-first Investment-Werkzeug: legen Sie ein `.xlsx`-Portfolio ab und erhalten Sie die Trades, die es neu ausbalancieren. Der Zustand lebt im Browser über Giper Baza.
- **[$hyoo_budget](https://budget.hyoo.ru)** — eine kollaborative, local-first Haushaltsbuch-App. Sie belegte den ersten Platz beim Beautiful-Code-Hackathon.
- **[$hyoo_talks](https://talks.hyoo.ru)** — ein einbettbarer Messenger. Ein für Sberbank gebauter Prototyp belegte den zweiten Platz beim Moscow City Hack.

## Designsystem und Werkzeuge

- **[BuilderUI](https://b-on-g.github.io/builderui/)** — ein shadcn-artiges Designsystem für $mol: typisierte Komponenten — Buttons, Dialoge, Auswahlfelder, Karten, Diagramme und mehr — plus ein Studio für Live-Theming (Basisfarbe, Akzent, Diagrammpalette, Radius, Schriftarten, Hell/Dunkel). Diese Dokumentationsseite ist darauf gebaut.
- **Diese Seite** — die Dokumentation, die Sie lesen, einschließlich [Playground](#!section=playground) und [Kurs](#!section=course), ist eine $mol-App. Die Suche, der Live-Code-Editor und das TypeScript im Browser sind alle mit dem Framework gebaut, das sie dokumentieren.
- **MAM** — das Build-Werkzeug und die Modul-Registry, in der jede $mol-App lebt, und selbst ein $mol-Projekt. Es ist Entwicklerwerkzeug statt einer gehosteten App; der Quellcode liegt auf GitHub.
- **view.tree LSP** — Sprachwerkzeuge und ein `npm create view-tree-lsp`-Generator, der neue $mol-Apps startet. Editor-Werkzeug, es gibt also keine laufende App zu öffnen.

## Im Produktiveinsatz

Über Open-Source- und Hackathon-Projekte hinaus steckt $mol in kommerziellen Systemen, die Umsatz erwirtschaften. Einige davon (manche laufen unter NDA, daher ohne Links oder Logos):

- **Drohnenabwehr-Steuerung** — der Komplex „Tamerlan" betreibt auf jedem Gerätecontroller (Radar, Störsender, Kamera) einen $mol-Microservice und verbindet sie zu einem gemeinsamen dezentralen Netzwerk. Eine Web-Oberfläche, lokal oder zentral, zeigt die Luftlage in Echtzeit: was wo fliegt, was gestört wird, wohin die Kameras zeigen.
- **[Virtueller Avatar](https://avatar.ocas.ai)** — eine 3D-Figur, mit der Sie sprechen, Schach spielen oder die Sie um eine Präsentation bitten können. Ein kommerzielles Produkt, bei dem $mol die Oberfläche über Drittanbieter-Bibliotheken steuert.
- **Admin-Panel zum Prompt-Testen** — lässt ein Unternehmen Prompts für neuronale Netze auswählen und testen, um Katalogzeilen in großen Mengen zu verarbeiten: Titel, Beschreibungen und SEO-Felder umschreiben. Es bereinigt außerdem Textdateien für den sicheren Export in andere CMS.
- **Admin-Panel für Zählerablesung** — Zähler laden Messwerte per FTP hoch; Betreiber legen Nutzer an, gewähren ihnen Leserechte für bestimmte Zähler und führen E-Mail-Kampagnen durch, während normale Verbraucher nur ihre eigenen Objekte und eine schreibgeschützte Ansichtsseite sehen.
- **E-Commerce-Backoffice** — Verwaltung von Produktkatalog und Bestellliste für einen Onlineshop.
- **Wissenschaftsdaten-Widget** — visualisiert Mikroelemente und ihre Verbindungen. Das Rendern der Graphen bleibt bei D3; alles andere wurde von reinem JS auf $mol umgestellt und in eine Web Component gepackt.

## Hackathons

$mol hat wiederholt bei Hackathons gewonnen: erster Platz bei Beautiful Code ([$hyoo_budget](https://budget.hyoo.ru)), erster Platz beim AC-VO-PPR-Hackathon (Gesten- und Sprachsteuerung einer Stadtanzeige) und preisgekrönte Prototypen bei More Tech, Moscow City Hack und Dev Hack. Die [Erfolgsgeschichten-Seite](https://mol.hyoo.ru/#!section=docs/=xanlom_yimh6x) von $mol hat die Details.

## Mehr

Der [$mol-Komponentenkatalog](https://mol.hyoo.ru/#!section=demos) hat Dutzende von Live-Komponenten und Demos, die Sie öffnen und inspizieren können.

Bauen Sie etwas mit $mol? Der beste nächste Schritt ist der [Playground](#!section=playground) — probieren Sie eine Idee in Sekunden aus und teilen Sie dann die URL.
