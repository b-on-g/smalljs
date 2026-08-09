# Einführung

## Was ist $mol?

$mol ist ein reaktives UI-Framework: Du beschreibst, **was** die Oberfläche ist, und das Framework ermittelt, **wie** und **wann** sie aktualisiert wird. Kein virtuelles DOM, keine manuellen Abonnements, kein `useEffect`. Du schreibst Komponenten als Baum; $mol rendert nur das Sichtbare und berechnet nur das neu, was sich tatsächlich geändert hat.

Eine Komponente besteht aus drei Dateien:

- `name.view.tree` — das deklarative Layout (eine kompakte Baumsprache)
- `name.view.ts` — das Verhalten (einfache TypeScript-Klassen)
- `name.view.css.ts` — typisierte Styles (vom Compiler geprüft)

Diese Trennung ist die ganze Idee: Das Layout bleibt lesbar, die Logik bleibt testbar, die Styles bleiben typsicher.

Keine der drei ist für sich genommen Pflicht. Der Baum ist eine Kurzschreibweise für Struktur, die du auch von Hand schreiben kannst: [Von TypeScript zu view.tree](#!section=docs/page=from-ts-to-view-tree) baut eine Komponente auf beide Arten und zeigt den Code, zu dem der Baum kompiliert.

## Für wen ist es?

- Du willst eine **kleine** App, die klein bleibt, während sie wächst — die Runtime ist kompakt und das Rendering ist standardmäßig virtualisiert.
- Du magst **Typen überall** — sogar die Styles werden von TypeScript geprüft.
- Du bist es leid, Reaktivität von Hand zu verdrahten — der Zustand in $mol ist automatisch reaktiv, wie eine Tabellenkalkulation.

## Ein Vorgeschmack

Ein Zähler, vollständig:

```tree
$my_counter $mol_view
	sub /
		<= Count $mol_view
			sub / <= count \
		<= Increment $mol_button
			click? <=> increment?
			sub / <= label \+
```

```typescript
namespace $.$$ {
	export class $my_counter extends $.$my_counter {
		@ $mol_mem count() { return 0 }
		@ $mol_action increment() { this.count( this.count() + 1 ) }
	}
}
```

`count` ist reaktiv: Alles, was es liest, wird automatisch neu gerendert, wenn es sich ändert. Kein `setState`, kein Abhängigkeits-Array, kein Store, den man registrieren muss.

## Wohin als Nächstes?

Bereit, etwas auf deinem eigenen Rechner auszuführen? Weiter zu [Erste Schritte](#!section=docs/page=getting-started) und baue in unter fünfzehn Minuten eine funktionierende App.
