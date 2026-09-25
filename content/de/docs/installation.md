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

Referenziere ein Paket mit `require`, und MAM installiert es beim nächsten Build und packt es ins Bundle:

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

### Ein Paket zur Laufzeit laden

Eine schwere Bibliothek, die nur ein Screen braucht, muss nicht in `web.js` liegen. Liefere ihre fertige Browser-Datei neben dem Bundle aus und lade sie bei der ersten Nutzung.

Trage die Datei in die `meta.tree` des Moduls ein:

```tree
deploy \/node_modules/@turf/turf/turf.min.js
```

`deploy` installiert das Paket, falls es fehlt, und kopiert die Datei nach `-/node_modules/@turf/turf/turf.min.js`, auf dem Dev-Server wie im Produktions-Build. Lade sie mit `$mol_import.script`:

```typescript
namespace $ {
	export class $my_app_turf extends $mol_object {

		@ $mol_mem
		static api() {
			$mol_import.script( './node_modules/@turf/turf/turf.min.js' )
			return ( globalThis as any ).turf as typeof import(
				'@turf/turf'
			)
		}

	}
}
```

- Der Pfad ist relativ und wird gegen die Seite in `-/` aufgelöst, daher läuft derselbe Code auf dem Dev-Server, in `test.html` und bei einem Deploy unter einem Unterpfad. Ein führender `/` funktioniert nur, solange die App im Wurzelverzeichnis der Domain liegt.
- `$mol_import.script` hält die Fiber an, bis das Skript geladen ist, und cacht nach URL: Die Datei wird einmal geholt, und alles, was `$my_app_turf.api()` innerhalb von `$mol_mem` liest, wartet einfach darauf.
- Der globale Name, hier `turf`, ist der, den der Browser-Build der Bibliothek vergibt. Welcher es ist, steht in ihrer README.
- `typeof import( … )` liefert volle Typisierung. Lass den Paketnamen auf einer eigenen Zeile: Der Builder wertet `require( '…' )` und `import( '…' )` in einer Zeile als Abhängigkeit und würde das ganze Paket doch in `web.js` packen.

## Weiter

Mit dem eingerichteten Arbeitsbereich lernst du nun, wie die Oberfläche selbst beschrieben wird — weiter zu [Views](#!section=docs/page=views).
