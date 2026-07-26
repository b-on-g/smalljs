# Erste Schritte

Diese Seite führt dich von einem leeren Ordner zu einer laufenden, reaktiven $mol-App. Es sollte etwa fünfzehn Minuten dauern. Jeder Ausschnitt unten ist echter, funktionierender Code — kopiere ihn unverändert.

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

Füge nun drei Dateien in `my/hello/` hinzu.

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

### hello.view.tree — das Layout

```tree
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

Ein paar Dinge, die es wert sind, benannt zu werden.

- `$mol_page` und `$mol_string` sind eingebaute Komponenten — eine Seitenhülle und ein Texteingabefeld.
- `<=` bindet eine Eigenschaft in eine Richtung; `<=>` bindet in beide Richtungen. So hält `value? <=> name?` die Eingabe und deinen `name`-Zustand synchron.
- `@` markiert eine lokalisierbare Zeichenkette; `\` beginnt eine rohe Zeichenkette.

### hello.view.ts — das Verhalten

```typescript
namespace $.$$ {
	export class $my_hello extends $.$my_hello {
		@ $mol_mem
		greeting() {
			const name = this.name()
			return name ? `Hello, ${name}!` : 'Please enter your name'
		}
	}
}
```

`@ $mol_mem` macht `greeting` zu einer reaktiven, zwischengespeicherten Eigenschaft. Sie liest `name()`, sodass sich `greeting` in dem Moment neu berechnet, in dem sich `name` ändert, und die Nachricht auf dem Bildschirm aktualisiert wird. Du hast nie ein Abonnement, einen Effekt oder einen Re-Render-Aufruf geschrieben.

## 3. Ausführen

Der Entwicklungsserver aus Schritt 1 überwacht bereits. Öffne einfach:

```
http://localhost:9080/my/hello/
```

Tippe deinen Namen — die Begrüßung aktualisiert sich beim Tippen. Das ist $mol-Reaktivität: Der Zustand fließt von selbst zur Ansicht.

## 4. Einen zweiten reaktiven Wert hinzufügen

Reaktivität lässt sich zusammensetzen. Füge einen Längenzähler hinzu, der vom selben `name` abhängt, ohne zusätzliche Verdrahtung.

Füge in `hello.view.tree` eine Zeile unter `Message` hinzu:

```tree
		<= Counter $mol_view
			sub / <= counter \
```

Füge in `hello.view.ts` die Methode hinzu:

```typescript
		@ $mol_mem
		counter() {
			return `${this.name().length} characters`
		}
}
```

Sowohl `greeting` als auch `counter` lesen `name`; beide aktualisieren sich gemeinsam. Füge einen dritten hinzu, füge einen zehnten hinzu — das Muster ändert sich nicht. Deshalb bleibt $mol-Code flach, während sich Funktionen anhäufen.

## 5. Deinen Build prüfen

MAM schreibt eine Diagnosedatei neben jede App. Öffne nach einem Build:

```
http://localhost:9080/my/hello/-/web.audit.js
```

Ein sauberes Audit bedeutet keine ungenutzten Abhängigkeiten, keine Typ-Probleme, nichts zu beheben. Gewöhne dir an, einen Blick darauf zu werfen — es fängt Fehler ab, bevor sie einen Browser erreichen.

## Du hast eine $mol-App gebaut

Du hast eine reaktive Komponente, bidirektionale Bindung und abgeleiteten Zustand — mit drei kleinen Dateien und null Konfiguration.

Mach weiter: Der **[Leitfaden](#!section=docs/page=installation)** behandelt Installation, Ansichten, Zustand, Routing und Daten im Detail — und verwandelt dieses Hello World in etwas Echtes.
