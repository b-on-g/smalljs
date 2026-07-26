# Views

Eine View ist eine Komponente: ein Knoten im UI-Baum mit eigenem Layout, Verhalten und Styles. Dieses Kapitel behandelt, wie Views deklariert, mit Logik verdrahtet, zusammengesetzt und wiederverwendet werden.

## Drei Dateien, eine Komponente

Eine Komponente `$my_card` lebt in `my/card/` und wird durch bis zu drei Dateien beschrieben, jede mit einer klaren Aufgabe:

- `card.view.tree` — **was** die Komponente ist: ihre Struktur und Standard-Bindungen.
- `card.view.ts` — **wie** sie sich verhält: TypeScript-Methoden, reaktiver Zustand.
- `card.view.css.ts` — wie sie aussieht: typisierte, vom Compiler geprüfte Styles.

Struktur, Verhalten und Style getrennt zu halten ist Absicht — jede Datei bleibt klein und lesbar, und das Layout ist nie mit Logik verstrickt.

## Die view.tree-Sprache

`view.tree` beschreibt Struktur deklarativ. Einrückung ist Verschachtelung; es gibt keine schließenden Tags.

```tree
$my_card $mol_view
	sub /
		<= Title $mol_view
			sub / <= title \
		<= Body $mol_view
			sub / <= text \
```

- `$my_card $mol_view` — deine Komponente erweitert die Basis `$mol_view`.
- `sub /` — die Liste der Kinder.
- `<= Title $mol_view` — eine benannte Sub-View, in TypeScript über `this.Title()` erreichbar.
- `<= title \` — eine bindbare Eigenschaft mit einem Roh-String als Standardwert (`\` beginnt einen Roh-String).

Jeder großgeschriebene Name (`Title`, `Body`) wird zu einer echten Eigenschaft, die du erreichen, überschreiben oder stylen kannst. Jede kleingeschriebene Bindung (`title`, `text`) wird zu einem Wert, den du in `.view.ts` berechnen kannst.

## Eigenschaften binden

Zwei Operatoren verbinden eine Eigenschaft mit ihrer Quelle:

- `<=` **einweg**: das Kind liest einen Wert vom Besitzer.
- `<=>` **zweiweg**: der Wert fließt in beide Richtungen — für Eingaben.

```tree
$my_form $mol_view
	sub /
		<= Field $mol_string
			value? <=> text? \
```

Hier bleiben `value` der Eingabe und `text` des Besitzers automatisch synchron: Tippe ins Feld und `text` aktualisiert sich; setze `text` im Code und das Feld spiegelt es wider.

## Verdrahtung mit dem Verhalten

Eine Bindung ohne Standardwert wird in `.view.ts` implementiert. Die Klasse erweitert die generierte Basis gleichen Namens:

```typescript
namespace $.$$ {
	export class $my_card extends $.$my_card {
		@ $mol_mem
		title() {
			return 'Untitled'
		}
	}
}
```

Alles, was die Vorlage bindet — `title`, `text`, die Eigenschaft einer Sub-View — kann hier Logik erhalten. Reaktivität ([Zustand](#!section=docs/page=state)) macht diese Werte lebendig.

## Attribute und Elementtyp

Ändere das zugrunde liegende HTML-Element mit `dom_name` und setze Attribute über `attr`:

```tree
$my_banner $mol_view
	dom_name \section
	attr *
		^
		role \note
```

Das `^` erbt die Attribute des Elternteils, damit du die von `$mol_view` bereits gesetzten nicht verlierst.

## Listen und View-Familien mit Schlüssel

Ein abschließendes `*` macht aus einer Sub-View eine Familie — eine Instanz pro Schlüssel. Für Zeilen:

```tree
$my_list $mol_list
	rows /
		<= Row* $mol_view
			sub / <= row_title* \
```

Das Framework erzeugt für jeden von dir gelieferten Schlüssel ein `Row` und baut dank [virtualisiertem Rendering](#!section=docs/page=rendering) nur die auf dem Bildschirm sichtbaren.

> Wenn eine View mit Schlüssel selbst Kinder mit Schlüssel enthält, versieh die äußere mit `Name*`, nicht `Name*0` — die indizierte Form lässt verschachtelte Kinder ungerendert.

## Bedingte Views

`null` zuzuweisen entfernt eine View aus dem Rendering. Leite ab und setze auf null, was eine Variante nicht braucht:

```tree
$my_page_readonly $my_page
	Edit_button null
```

## Komposition und Wiederverwendung

Views werden durch Verschachtelung zusammengesetzt und durch Erweiterung spezialisiert. Eine Karte, in einer Liste verwendet:

```tree
$my_user_card $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
		<= Email $mol_view
			sub / <= email \

$my_users_list $mol_list
	rows /
		<= User* $my_user_card
			name <= user_name* \
			email <= user_email* \
```

`$my_users_list` definiert nie neu, wie eine Karte aussieht — es verwendet `$my_user_card` wieder und speist jede Instanz mit ihren Daten. Das ist das ganze Kompositionsmodell: kleine Views, zusammengesteckt, mit `extends` spezialisiert, wenn eine Variante nötig ist.

## Weiter

Views beschreiben Struktur; was sie zum Leben erweckt, sind reaktive Daten. Weiter zu [Zustand & Reaktivität](#!section=docs/page=state).
