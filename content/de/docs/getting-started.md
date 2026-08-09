# Erste Schritte

Diese Seite führt dich von einem leeren Ordner zu einer laufenden, reaktiven $mol-App. Es sollte etwa fünfzehn Minuten dauern. Jeder Ausschnitt unten ist echter, funktionierender Code — kopiere ihn unverändert.

Du schreibst die Komponente in reinem TypeScript. $mol hat auch ein kürzeres Format für die Beschreibung von Komponenten, `view.tree`, und dem begegnest du auf der nächsten Seite. Hier braucht es das nicht: Eine $mol-Komponente ist so oder so eine gewöhnliche Klasse.

## Was du brauchst

- **Node.js 18+** und **git**. Das ist die ganze Liste.

Du installierst keine globale CLI und generierst keinen Boilerplate-Code, den du später verstehen musst. $mol-Apps leben innerhalb des MAM-Workspace, der bereits weiß, wie man sie baut und ausliefert.

## 1. Den Workspace holen

MAM ist das Build-Werkzeug und die Modul-Registry für $mol. Klone es und installiere es einmal.

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` startet den Entwicklungsserver auf `http://localhost:9080/`. Er überwacht deine Dateien und baut automatisch neu — lass ihn in einem eigenen Terminal laufen.

## 2. Ein Modul erstellen

Eine $mol-App ist einfach ein Ordner. Wähle einen Namensraum (deinen eigenen, z. B. `my`) und einen Namen (`hello`).

```bash
mkdir -p my/hello
```

> **Eine Regel zum Merken:** Unterstriche in einem Komponentennamen sind Ordner-Trenner. `$my_hello` liegt in `my/hello/`, `$my_hello_form` läge in `my/hello/form/`. Modul-Ordnernamen enthalten niemals einen Unterstrich.

Füge nun zwei Dateien in `my/hello/` hinzu.

### index.html — der Einstiegspunkt

```html
<!doctype html>
<html mol_view_root>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>
	<body mol_view_root>
		<div mol_view_root="$my_hello"></div>
		<script src="web.js"></script>
	</body>
</html>
```

Das Attribut `mol_view_root="$my_hello"` bindet deine Komponente beim Laden der Seite ein.

### hello.view.ts — die Komponente

```typescript
namespace $ {

	export class $my_hello extends $mol_page {

		title() {
			return 'Greeting'
		}

		body() {
			return [ this.Name(), this.Message() ]
		}

		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}

		@ $mol_mem
		name( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.greeting() ]
			return obj
		}

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

Von oben nach unten gelesen:

- `$my_hello` liegt in `namespace $`, dem umgebenden Namensraum, in dem jede $mol-Komponente wohnt. Sie erweitert `$mol_page`, eine eingebaute Seitenhülle mit Titel und Body. `$mol_string` weiter unten ist das eingebaute Texteingabefeld.
- `body()` liefert die Kinder. Ein Kind ist hier keine Markup-Zeile, sondern eine Eigenschaft: `Name` und `Message` sind Methoden, die du aufrufen, in einer Unterklasse überschreiben oder im Stylesheet über ihren Namen ansprechen kannst.
- `Name()` baut das Eingabefeld und verdrahtet es. Jede seiner Eigenschaften bekommt einen **Pfeil**, keinen Wert. Das Kind ruft diesen Pfeil auf, wenn es die Daten braucht, und liest so immer die aktuellen.
- `name( next?: string )` ist der Zustand. Ohne Argument aufgerufen liest die Methode, mit Argument schreibt sie. Genau weil diese ganze Funktion an `obj.value` geht, aktualisiert Tippen im Feld den `name`.
- `@ $mol_mem` speichert eine Eigenschaft pro Instanz zwischen. Bei `name` heißt das: Der Wert bleibt erhalten, und alles, was ihn gelesen hat, wird bei einer Änderung neu berechnet. Bei `Name` und `Message` heißt es: eine Kindkomponente, einmal gebaut, statt einer neuen bei jedem Aufruf.
- `greeting()` liest `name()`. Dieses Lesen *ist* das Abonnement. Ändert sich `name`, berechnet sich `greeting` neu und der Text auf dem Bildschirm folgt, ohne deklarierten Effekt, ohne Abhängigkeitsliste, ohne Re-Render-Aufruf.

## 3. Ausführen

Der Entwicklungsserver aus Schritt 1 überwacht bereits. Öffne einfach:

```
http://localhost:9080/my/hello/
```

Tippe deinen Namen, und die Begrüßung aktualisiert sich beim Tippen. Das ist $mol-Reaktivität: Der Zustand fließt von selbst zur Ansicht.

## 4. Einen zweiten reaktiven Wert hinzufügen

Reaktivität lässt sich zusammensetzen. Füge einen Längenzähler hinzu, der denselben `name` liest, ohne zusätzliche Verdrahtung.

Trag ihn in `body()` ein:

```typescript
		body() {
			return [ this.Name(), this.Message(), this.Counter() ]
		}
```

und ergänze die zwei Eigenschaften dahinter:

```typescript
		@ $mol_mem
		Counter() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.counter() ]
			return obj
		}

		counter() {
			return `${ this.name().length } characters`
		}
```

Sowohl `greeting` als auch `counter` lesen `name`, und beide aktualisieren sich gemeinsam. Füge einen dritten hinzu, füge einen zehnten hinzu: Die reaktive Hälfte ändert nie ihre Form.

Die andere Hälfte schon. Drei Zeilen Logik kamen mit sechs Zeilen Klempnerei drumherum — eine Fabrik, ein `new`, ein Pfeil, ein `return obj`. Multipliziere das mit jedem Kind auf einem echten Bildschirm, und du hast den Grund, warum es `view.tree` gibt.

## 5. Deinen Build prüfen

MAM schreibt eine Diagnosedatei neben jede App. Öffne nach einem Build:

```
http://localhost:9080/my/hello/-/web.audit.js
```

Ein sauberes Audit bedeutet keine ungenutzten Abhängigkeiten, keine Typ-Probleme, nichts zu beheben. Gewöhne dir an, einen Blick darauf zu werfen — es fängt Fehler ab, bevor sie einen Browser erreichen.

## Du hast eine $mol-App gebaut

Eine reaktive Komponente mit bidirektionaler Bindung und abgeleitetem Zustand, in einer Datei, mit null Konfiguration.

Nimm nun genau diese Datei und sieh zu, wie sie schrumpft: **[Von TypeScript zu view.tree](#!section=docs/page=from-ts-to-view-tree)**.
