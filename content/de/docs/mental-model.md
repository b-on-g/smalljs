# Mentales Modell

Wenn du von React oder Vue kommst, verbringst du die ersten Tage in $mol damit, nach Dingen zu suchen, die es nicht gibt: `computed`, `watch`, `useEffect`, `onMounted`, ein `fetch` in einem Lifecycle-Hook. Sie sind nicht irgendwo in der API versteckt; das Modell hat keinen Platz für sie. Diese Seite ist die Fünf-Minuten-Fassung dieses Modells. Lies sie vor [Views](#!section=docs/page=views) und komm zurück, wenn ein vertrauter Name fehlt.

## Pull statt Push

Nichts wird berechnet, bevor es jemand liest. Eine View rendert, indem sie ihre Eigenschaften liest; jede Eigenschaft liest, was sie braucht; die Abhängigkeitskette setzt sich aus diesen Lesevorgängen von selbst zusammen. Es gibt kein Abonnement zu deklarieren und kein `watch` zu registrieren: Das Lesen *ist* das Abonnement.

```tree
$my_profile $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
```

```typescript
namespace $.$$ {
	export class $my_profile extends $.$my_profile {
		@ $mol_mem
		user() {
			return this.$.$mol_fetch.json( 'https://api.example.com/me' ) as { name: string }
		}
		name() {
			return this.user().name
		}
	}
}
```

`Name` zu rendern liest `name()`, `name()` liest `user()`, `user()` geht ins Netz. Niemand hat der View von der Anfrage erzählt und niemand der Anfrage von der View. Ändert sich `user()`, berechnet sich alles neu, was es gelesen hat — und sonst nichts.

## Kein Lebenszyklus

Es gibt kein `mounted`, kein `useEffect`, kein `created`. Daten werden angefordert, indem eine Eigenschaft gelesen wird, und eine View liest ihre Eigenschaften, wenn sie rendert. Das Beispiel oben lädt den Benutzer also genau in dem Moment, in dem `$my_profile` auf dem Bildschirm erscheint, und keinen Augenblick früher. Verlässt die View den Bildschirm, liest niemand mehr `user()`, und die Zelle wird zusammen mit der View freigegeben.

Das ist der komplette Ersatz für das Muster „fetch on mount": Die View fragt nach dem, was sie braucht, und das Framework entscheidet, wann gefragt wird. Das Laden hängt nicht an einem Seitenereignis, sondern daran, sichtbar zu sein.

## Eine Eigenschaft ist eine Zelle

Eine einzige Methode mit einem optionalen Argument ist zugleich Getter, Setter, berechneter Wert und Zustand:

```typescript
@ $mol_mem
count( next?: number ) {
	return next ?? 0
}
```

Ohne Argument aufgerufen liest sie, mit einem Argument schreibt sie. `@ $mol_mem` macht aus der Methode eine zwischengespeicherte Zelle, die neu rechnet, wenn sich etwas geändert hat, das sie gelesen hat. Ein berechneter Wert ist einfach eine `@ $mol_mem`-Methode, die andere Methoden liest. Einen Watcher braucht es nicht: Ein Seiteneffekt gehört zu einem Ereignis, und ein Ereignis-Handler ist eine mit `@ $mol_action` markierte Methode.

```typescript
@ $mol_mem
doubled() {
	return this.count() * 2
}

@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

[Zustand und Reaktivität](#!section=docs/page=state) behandelt die Regeln dafür, was in jedem der beiden passieren darf.

## Synchroner Code, der wartet

`user()` oben sieht synchron aus und ist so geschrieben, als wäre die Antwort schon da. Das funktioniert, weil jede Berechnung in einer Fiber läuft. `this.$.$mol_fetch.json()` suspendiert diese Fiber, und das Framework startet die Berechnung neu, sobald die Antwort eingetroffen ist. Bis dahin zeigt die View, die `user()` gelesen hat, einen Ladezustand; schlägt die Anfrage fehl, zeigt dieselbe View den Fehler. Du schreibst weder ein `isLoading`-Flag noch ein `try`/`catch`.

Derselbe Mechanismus bedient jede asynchrone Quelle. [Datenabruf](#!section=docs/page=data) geht Neuladen und Fehlerbehandlung durch.

## Alles ist eine Überschreibung

Eine `view.tree`-Datei ist eine Liste von Methodendeklarationen. Jede Zeile unter einer Komponente ist eine Eigenschaft dieser Komponente mit einem Standardwert, und die Eigenschaft jeder verschachtelten Komponente lässt sich mit einer einzigen Zeile genau dort neu definieren, wo sie verwendet wird. Ein Platzhalter an einem Texteingabefeld ist die Eigenschaft `hint` von `$mol_string`:

```tree
$my_search $mol_view
	sub /
		<= Query $mol_string
			hint \Search
			value? <=> query? \
```

Es gibt keine Prop-Liste zu erweitern, keinen Wrapper zu schreiben und keinen Fork zu pflegen. Hat eine Komponente eine Eigenschaft, kannst du sie von außen setzen.

## Wie man die Quellen liest

Der vorige Abschnitt wirft die eigentliche Frage auf: Woher weißt du, dass die Eigenschaft `hint` heißt? Die Antwort lautet: Du schaust nach — und das Framework ist so gebaut, dass Nachschauen billig ist.

**Der Quelltext des Frameworks liegt neben deinem.** Im MAM-Workspace ist `mol/string/string.view.tree` einen Ordner von `my/hello/` entfernt. Er steckt nicht in `node_modules` und nicht in einem Bundle; es ist dieselbe Art Datei, die du selbst schreibst.

**Der Klassenname ist der Pfad.** `$mol_string` liegt in `mol/string/`, `$mol_button_major` in `mol/button/major/`. Jeder Unterstrich ist ein Ordnertrenner, also lässt sich ein Name aus deinem Baum immer in einen Ordner zum Öffnen übersetzen. Die Editor-Unterstützung auf der Seite [Werkzeuge](#!section=docs/page=tooling) vervollständigt diese Namen für dich.

**Die `.view.tree` einer Komponente ist die vollständige Liste ihrer Eigenschaften samt Standardwerten.** Die Form des Wertes verrät den Typ: `\` beginnt eine Zeichenkette, `/` eine Liste, `*` ein Wörterbuch, eine nackte Zahl ist eine Zahl, `true` und `false` sind Wahrheitswerte, `null` heißt abwesend, und `<=` leitet eine Sub-View oder eine vom Besitzer übernommene Eigenschaft ein. Hier ist der Teil von `mol/string/string.view.tree`, auf den es bei einem Eingabefeld ankommt:

```tree
$mol_string $mol_view
	dom_name \input
	enabled true
	field *
		^
		disabled <= disabled false
		value <= value_changed? <=> value? \
		placeholder <= hint_visible <= hint \
	attr *
		^
		type <= type? \text
```

Lies es laut vor. `dom_name \input`: Diese Komponente rendert ein `input`-Element. `enabled true`: eine boolesche Eigenschaft, standardmäßig an. `field *` ist das Wörterbuch der Felder des DOM-Elements; die Namen links gehören zum DOM, die Namen rechts zur Komponente, und der äußerste rechte ist der, den du setzt. Das DOM-`placeholder` kommt also aus `hint`, standardmäßig eine leere Zeichenkette; das DOM-`value` ist die schreibbare Eigenschaft `value?`, und das Attribut `type` ist das schreibbare `type?`, standardmäßig `text`. Ein Platzhalter, ein deaktiviertes Eingabefeld und ein Passwortfeld heißen in deinem Baum `hint`, `enabled false` und `type \password`.

**Die typisierte Schnittstelle wird aus demselben Baum generiert.** `mol/string/-view.tree/string.view.tree.d.ts` listet dieselben Eigenschaften als TypeScript-Signaturen auf, und die [API-Referenz](#!section=docs/page=api-mol-string) auf dieser Website wird aus dieser Datei erzeugt. Alle drei stimmen überein, weil alle drei aus einer Quelle stammen.

**Die meisten Komponenten bringen einen `demo/`-Ordner und eine `readme.md` mit.** `mol/string/demo/demo.view.tree` zeigt das Eingabefeld mit Hinweistext, deaktiviert und mit vorgegebenem Wert. Wenn du eine Komponente in einem bestimmten Zustand brauchst, such die Demo, die dem am nächsten kommt, und kopiere die Zeile.

Zusammengenommen dauert ein Platzhalter etwa eine Minute:

```bash
ls mol | grep string
cat mol/string/string.view.tree
```

Du siehst `hint \` unter `$mol_string` und schreibst `hint \Search` unter dein eigenes `$mol_string`.

## Namen

Alles ist `snake_case`: Eigenschaftsnamen in `view.tree`, Methodennamen in TypeScript, die Attribute, die das Framework zum Stylen an die DOM-Knoten hängt. Sub-Views beginnen mit einem Großbuchstaben (`Query`), Werte mit einem Kleinbuchstaben (`query`).

Der Name im Baum und der Name der Methode in der Klasse müssen Buchstabe für Buchstabe übereinstimmen. `exchange_form` im Baum und `exchangeForm` in der Klasse sind zwei voneinander unabhängige Eigenschaften: Die der Klasse wird nie gelesen, die des Baums behält ihren Standardwert, und nichts meldet dir das. Wenn eine Überschreibung nichts zu bewirken scheint, ist das das Erste, was du prüfen solltest. [Fehlerbehebung](#!section=docs/page=troubleshooting) listet diesen und die übrigen Fälle auf, in denen der Bildschirm falsch ist und der Compiler schweigt.

## Weiter

Mit dem Modell im Kopf zeigt [Views](#!section=docs/page=views), wie Komponenten deklariert und zusammengesetzt werden, und [Von React, Vue und Svelte](#!section=docs/page=rosetta) bildet die Namen, die du schon kennst, auf die hiesigen ab.
