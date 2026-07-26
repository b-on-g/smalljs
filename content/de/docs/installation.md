# Installation

[Erste Schritte](#!section=docs/page=getting-started) führt dich Schritt für Schritt durch deine erste App. Diese Seite ist die Referenz: wie ein $mol-Projekt aufgebaut ist und wie der Build funktioniert.

## Voraussetzungen

- **Node.js 18+** und **git**. Sonst wird nichts global installiert.

## Der MAM-Arbeitsbereich

$mol-Apps leben in **MAM** — dem Build-Werkzeug und der Modulregistrierung. Du klonst es einmal und entwickelst deine Module darin:

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` startet einen überwachenden Entwicklungsserver unter `http://localhost:9080/`. Er baut beim Speichern neu und löst Abhängigkeiten automatisch auf — du pflegst nie eine Bundler-Konfiguration.

## Wie Module benannt werden

Jeder Komponentenname entspricht einem Ordnerpfad, und **jeder Unterstrich ist ein Ordnertrenner**:

```
$my_app          →  my/app/
$my_app_header   →  my/app/header/
```

Ordnernamen von Modulen enthalten nie einen Unterstrich — verwende verschachtelte Ordner für mehrteilige Namen. Wenn eine von dir genutzte Komponente nie im Bundle auftaucht, stimmt fast immer der Ordnerpfad nicht mit dem Klassennamen überein.

## Aufbau eines Moduls

Eine Komponente ist ein Ordner mit bis zu vier Dateien:

| Datei | Zweck |
|------|------|
| `name.view.tree` | Deklaratives Layout |
| `name.view.ts` | Verhalten (TypeScript) |
| `name.view.css.ts` | Typisierte Styles |
| `name.view.tree`, `index.html` | Einstiegspunkt für ein App-Modul |

Die `index.html` einer App bindet die Wurzelkomponente ein:

```html
<body mol_view_root>
	<div mol_view_root="$my_app"></div>
	<script src="web.js"></script>
</body>
```

## Build für die Produktion

Der Entwicklungsserver baut zur Laufzeit, aber du kannst jedes Modul explizit aus dem Wurzelverzeichnis des Arbeitsbereichs bauen:

```bash
npm run start my/app
```

Die Ausgabe landet in `my/app/-/` — einschließlich `web.js`, `web.css` und `web.audit.js`. **Prüfe immer das Audit:** Ein sauberes `web.audit.js` bedeutet keine ungenutzten Abhängigkeiten und keine Typfehler.

## npm-Pakete hinzufügen

Referenziere ein Paket mit `require`, und MAM installiert es beim nächsten Build:

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

## Weiter

Mit dem eingerichteten Arbeitsbereich lernst du nun, wie die Oberfläche selbst beschrieben wird — weiter zu [Views](#!section=docs/page=views).
