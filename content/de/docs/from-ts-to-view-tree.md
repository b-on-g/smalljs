# Von TypeScript zu view.tree

Die Komponente, die du in den [Ersten Schritten](#!section=docs/page=getting-started) geschrieben hast, ist eine gewöhnliche TypeScript-Klasse. Sie kompiliert, sie läuft, und sie ist eine unterstützte Art, eine $mol-Komponente zu beschreiben — eine von mehreren, die das Framework akzeptiert.

Sie hat dich außerdem vier Dinge im Kopf behalten lassen, die nichts damit zu tun haben, was die Komponente tut. Diese Seite nimmt sie einzeln vor und zeigt jeweils die Zeile `view.tree`, die sie verschwinden lässt. Danach kommt der Code, den der Compiler erzeugt, damit du nachprüfen kannst: Der Baum ist keine zweite Laufzeitumgebung, sondern erzeugt genau die Klasse, die du schon geschrieben hast.

Hier ist die Datei noch einmal, zum Vergleich:

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

## Das Kind baust du, und zwischenspeichern musst du es auch

Sechs dieser Zeilen sind eine Fabrik:

```typescript
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}
```

Lösch `@ $mol_mem`, und es kompiliert weiterhin. Es ist nur keine einzelne Komponente mehr: `this.Name() !== this.Name()`, weil der Rumpf bei jedem Aufruf `new` ausführt. Wer die Eigenschaft zuletzt liest, gewinnt, die früheren Instanzen behalten alles, was sie angesammelt haben, und niemand räumt sie ab — $mol besitzt nur die Objekte, die es für dich zwischengespeichert hat.

In `view.tree` ist dasselbe Kind eine Zeile:

```tree
		<= Name $mol_string
```

Ein großgeschriebener Name bedeutet, dass die Eigenschaft eine Komponente hält; `<=` deklariert sie. Es gibt keine kürzere Schreibweise, die den Dekorator vergisst, weil du die Fabrik gar nicht schreibst.

## Die Richtung steckt im Operator

Ein Kind zu füttern heißt zuweisen, Eigenschaft für Eigenschaft:

```typescript
			obj.sub = () => [ this.greeting() ]
```

Drei bewegliche Teile: das Kindobjekt, der Eigenschaftsname und ein Pfeil, damit das Lesen später statt jetzt passiert. Die Zeile sagt, was verbunden ist, aber nicht in welche Richtung; dafür musst du den Rumpf des Pfeils lesen und prüfen, ob etwas zurückfließt.

Der Baum legt die Richtung in den Operator:

```tree
		<= Message $mol_view
			sub / <= greeting \
```

`<=` ist einseitig, von `greeting` in das `sub` des Kindes. `/` ist eine Liste, `\` beginnt eine rohe Zeichenkette, und `greeting \` deklariert eine Eigenschaft mit der leeren Zeichenkette als Vorgabe — dem Wert, den du in TypeScript überschreiben wirst.

## Bidirektionale Bindung ist einen Tastendruck von stillem Read-only entfernt

Das Eingabefeld braucht Daten in beide Richtungen, dafür steht der Parameter `next`:

```typescript
			obj.value = ( next?: string ) => this.name( next )
```

Lass nun `next` weg:

```typescript
			obj.value = () => this.name()
```

TypeScript akzeptiert das. Eine Funktion ohne Argumente passt dorthin, wo ein optionales erwartet wird, also stimmen die Typen und das Audit bleibt grün. Das Feld wird gerendert, zeigt den richtigen Wert und ignoriert still alles, was du tippst.

Im Baum lässt sich diese halbe Verbindung nicht schreiben:

```tree
		<= Name $mol_string
			value? <=> name? \
```

`<=>` bindet in beide Richtungen. Das nackte `?` markiert eine Eigenschaft, die ein Argument annimmt — also eine, in die man schreiben kann. Hier trägt es beide Enden, deshalb fließt der Wert ins Feld und wieder heraus.

## Eine lokalisierbare Zeichenkette bleibt eine Zeichenkette, bis du einen Schlüssel daraus machst

```typescript
		title() {
			return 'Greeting'
		}
```

Zum Übersetzen erfindest du einen Schlüssel, ersetzt das Literal durch einen `$mol_locale.text`-Aufruf, schreibst das JSON und hältst beides für den Rest des Projektlebens von Hand im Gleichschritt.

```tree
	title @ \Greeting
```

`@` markiert die Zeichenkette als lokalisierbar, den Rest erledigt der Build. Danach steht in `my/hello/-/web.locale=en.json`:

```json
{
	"$my_hello_Name_hint": "Enter your name",
	"$my_hello_title": "Greeting"
}
```

Übersetzer bekommen eine JSON-Datei mit jeder Zeichenkette der App. Du schreibst keinen einzigen Schlüssel.

## Die ganze Komponente

```tree-no-run
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

Das ist `hello.view.tree`. In `hello.view.ts` bleibt der Teil, der nie Struktur war:

```typescript
namespace $.$$ {

	export class $my_hello extends $.$my_hello {

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

Die Klasse erweitert jetzt `$.$my_hello`, die vom Baum erzeugte Basis, und überschreibt eine Eigenschaft. `$.$$` ist der Namensraum für solche Überschreibungen.

## Was der Compiler ausgibt

`view.tree` ist ein Codegenerator ohne eigene Laufzeit. Baue das Modul und lies `my/hello/-view.tree/hello.view.tree.js`:

```javascript
	($.$my_hello) = class $my_hello extends ($.$mol_page) {
		name(next){
			if(next !== undefined) return next;
			return "";
		}
		Name(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this.$.$mol_locale.text("$my_hello_Name_hint")));
			(obj.value) = (next) => ((this.name(next)));
			return obj;
		}
		greeting(){
			return "";
		}
		Message(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.greeting())]);
			return obj;
		}
		title(){
			return (this.$.$mol_locale.text("$my_hello_title"));
		}
		body(){
			return [(this.Name()), (this.Message())];
		}
	};
	($mol_mem(($.$my_hello.prototype), "name"));
	($mol_mem(($.$my_hello.prototype), "Name"));
	($mol_mem(($.$my_hello.prototype), "Message"));
```

Dieselben Fabriken, dieselben Pfeile, dieselben drei `$mol_mem`-Aufrufe, dazu die zwei Locale-Schlüssel, die du nicht benennen musstest. Bis das Bundle im Browser ankommt, ist der Baum verschwunden.

Deshalb vertragen sich beide Formate auch problemlos. Eine als Baum geschriebene und eine als Klasse geschriebene Komponente ergeben dieselbe Art von Objekt, also kann eine App beide halten, ohne dass eine davon den Unterschied merkt.

## Was eine handgeschriebene Klasse keinem Werkzeug geben kann

Neben dem erzeugten JS schreibt der Compiler `hello.view.tree.d.ts`:

```typescript
declare namespace $ {

	type $mol_string__hint_my_hello_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_my_hello_2 = $mol_type_enforce<
		ReturnType< $my_hello['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_view__sub_my_hello_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $my_hello extends $mol_page {
		name( next?: string ): string
		Name( ): $mol_string
		greeting( ): string
		Message( ): $mol_view
		title( ): string
		body( ): readonly(any)[]
	}

}
```

Die `$mol_type_enforce`-Paare prüfen jede Bindung gegen die Eigenschaft, die sie speist, sodass ein Typfehler an der Bindung selbst gemeldet wird und nicht irgendwo tief im Kind. Der Klassenrumpf darunter ist eine maschinenlesbare Beschreibung der Oberfläche der Komponente, und sie wird gelesen: Die Locale-Datei oben stammt aus derselben Analyse, und die [API-Seiten](#!section=docs/page=api-mol-string) auf dieser Website werden aus der `.view.tree.d.ts` jeder Basiskomponente generiert.

Eine handgeschriebene Klasse bietet davon nichts. Sie ist Code, und lesen kann sie nur TypeScript.

## Der Umfang

Das Hello World von oben: Aus 31 Zeilen TypeScript werden 8 Zeilen Baum plus 8 Zeilen TypeScript.

Mit der Komponente wächst der Abstand. `$mol_app_users` — ein Suchfeld, eine Liste, vier Buttons und eine Statuszeile — hat als Baum 30 Zeilen und 840 Zeichen und als Klasse 125 Zeilen und 3046 Zeichen. Beide Fassungen stehen vollständig auf der Wiki-Seite zum [Formatvergleich](https://github.com/hyoo-ru/mam_mol/wiki/View-Formats), du kannst den Handel also selbst abwägen.

## Was du schreiben solltest

Beides, pro Komponente entschieden.

`view.ts` ist ein unterstütztes Format. Es ist das, wozu der Baum kompiliert, und eine so geschriebene Komponente verhält sich wie jede andere. Wenn eine Komponente vor allem aus Logik mit ein oder zwei Kindern besteht, ist die Klasse die ehrliche Wahl und der Baum bringt wenig.

Der Baum zahlt sich dort aus, wo sich die Zeremonie wiederholt: Bildschirme, die überwiegend Struktur sind, lange Reihen von Bindungen, alles mit Text, den ein Übersetzer sehen will. Das beschreibt den größten Teil einer Benutzeroberfläche, und genau deshalb sind $mols eigene Komponenten so geschrieben.

Als Nächstes die Baumsprache selbst — Listen, Wörterbücher, View-Familien mit Schlüssel und das Spezialisieren einer Komponente durch Erweitern: **[Views](#!section=docs/page=views)**.
