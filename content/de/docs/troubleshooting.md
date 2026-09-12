# Fehlerbehebung

Jeder Eintrag auf dieser Seite hat dieselbe Form: Der Build ist grün, das Audit ist sauber, die Konsole schweigt, und der Bildschirm ist leer oder zeigt nicht das, was Sie gemeint haben. Der Compiler kann diese Fehler nicht sehen, weil jeder davon ein gültiges Programm ist, das eben eine andere Komponente beschreibt. Suchen Sie die Überschrift, die klingt wie das, was Sie sehen; darunter stehen Ursache und Behebung.

## Meine Überschreibung einer Eigenschaft bewirkt nichts, keine Fehlermeldung

Der Name in `view.tree` und der Name der Methode in der Klasse unterscheiden sich, meistens in der Groß- und Kleinschreibung: `exchange_form` im Baum, `exchangeForm` in der Klasse. Das sind zwei Eigenschaften. Die der Klasse wird nie aufgerufen, die des Baums behält ihren Standardwert, und nichts meldet es.

Namen sind überall `snake_case` und müssen Buchstabe für Buchstabe übereinstimmen. Prüfen Sie nach dem Bearbeiten einer `.view.ts`, ob jede Überschreibung noch eine existierende Eigenschaft benennt; die generierte `-view.tree/*.view.tree.d.ts` neben dem Baum ist die Liste zum Abgleich.

## Ich brauche Placeholder, disabled oder type an einem Eingabefeld

Das sind Eigenschaften von `$mol_string`: `hint` für den Placeholder, `enabled` für den deaktivierten Zustand, `type` für den Eingabetyp. Setzen Sie sie dort, wo das Eingabefeld verwendet wird:

```tree
<= Password $mol_string
	hint \Password
	type \password
	enabled <= can_edit true
	value? <=> password? \
```

Jede andere Eigenschaft jeder anderen Komponente findet sich auf demselben Weg: Öffnen Sie ihre `.view.tree`, wie [Wie man die Quellen liest](#!section=docs/page=mental-model/Docs.Body=Wie%20man%20die%20Quellen%20liest) zeigt.

`attr *` ist für echte DOM-Attribute da, die die Komponente nicht ohnehin schon abbildet, und hat eine eigene Falle: Ein Block ohne `^` als erste Zeile ersetzt das gesamte Attribut-Wörterbuch der Basis, sodass ein so geschriebenes `$mol_button` `disabled`, `role` und `tabindex` verliert. Beginnen Sie den Block mit `^`, um zu erben, und ergänzen Sie dann Ihre Schlüssel:

```tree
attr *
	^
	data_kind \primary
```

## Ein Wort wird Buchstabe für Buchstabe gerendert

Eine Zeichenkette wurde übergeben, wo eine Liste erwartet wird, und die Zeichenkette wurde Zeichen für Zeichen ausgebreitet. Zeichenketten beginnen mit `\`, Listen mit `/`. Der übliche Fall ist `sub`, das eine Liste ist:

```tree
sub / <= label \Hello
```

## Der Bildschirm ist leer, die Tests sind grün

Eine Überschreibung ist aus der `.view.ts` herausgefallen. Der Baum gibt jeder Eigenschaft einen Standardwert, also ist TypeScript zufrieden, wenn die Klasse `rows()` nicht mehr neu definiert, und die Liste rendert leer. Tests, die nur das Modell prüfen, bleiben grün, weil das Modell in Ordnung ist.

Schreiben Sie für jede Überschreibung, von der der Bildschirm abhängt, einen Test, der liest, was der Benutzer sieht: `rows()`, `sub()`, `title()` der Sub-Views oder das DOM. [Testen](#!section=docs/page=testing) zeigt beides.

## Daten laden nie, eine Komponente hängt im Ladezustand fest

Eine `@ $mol_mem`-Methode hat ein Promise als ihren Wert zurückgegeben: `fetch( uri ).then( ... )`, eine `async`-Methode oder das Ergebnis von `$mol_wire_async( this ).load()`. Ein Promise in der Zelle liest sich für alle als „rechnet noch", und wenn es sich auflöst, rechnet die Zelle neu und erzeugt ein frisches Promise. Das Netz funktioniert; die View sieht nie ein Ergebnis.

Die richtige Form ist synchron: Rufen Sie `this.$.$mol_fetch.json( uri )` innerhalb der Zelle auf und geben Sie den geparsten Wert zurück. Die Fiber wird suspendiert, bis die Antwort da ist, und lässt die Zelle dann erneut laufen, sodass das Promise in Ihrem Code nie auftaucht. Wo asynchrone Arbeit anderswo stattfinden muss, legen Sie ihr Ergebnis in eine eigene Zustandszelle und lassen Sie den Effekt ein Flag oder einen Schlüssel zurückgeben, niemals das Promise.

Eine zweite Ursache ist ein verschluckter Fehler: ein `try`/`catch` innerhalb einer Zelle, das die Suspendierung zusammen mit echten Fehlern abfängt. Werfen Sie alles erneut, was ein `Promise` ist, oder verwenden Sie `$mol_fail_catch`, das diese Prüfung für Sie übernimmt.

## Zirkuläres Abonnement

Eine `@ $mol_mem`-Methode hat in eine andere Zelle geschrieben oder einen Seiteneffekt ausgeführt, der am Ende etwas invalidiert hat, das sie gelesen hatte. Berechnungen lesen und geben nur zurück; Schreibvorgänge, Netz, Timer und DOM gehören in `@ $mol_action`-Handler. Die andere Quelle derselben Meldung ist eine `<=>`-Bindung an ein Kind zusammen mit einer Methode in der Klasse, die an genau dieses Kind delegiert — der nächste Abschnitt.

## Maximum call stack

Zwei Formen erzeugen ihn. Erstens hat der Baum `tab? <=> tab?` an einem Kind und die Klasse hat `tab() { return this.Head().tab() }`: Das Kind fragt den Besitzer, der Besitzer fragt das Kind. Entfernen Sie das `<=>` zu dem Kind, an das Sie delegieren.

Zweitens wurde eine Sub-View auf eine eigene Klasse umgestellt, und die Klasse ruft `super` auf einer im Baum aufgeführten Eigenschaft auf. Dieses `super` ist nicht die Implementierung der Basis, sondern der Stub, den der Baum für die aufgeführte Bindung erzeugt hat, und der Stub delegiert zurück an den Besitzer. Delegieren Sie stattdessen ausdrücklich an die ursprüngliche Implementierung, siehe den Eintrag zum Klassenwechsel weiter unten.

## Ein großgeschriebener Wert lässt sich aus TypeScript nicht überschreiben

`<= Label* \` erzeugt eine Methode namens `Label`, und `label()` in der Klasse ist eine andere Methode. Sub-Views werden großgeschrieben, Werte kleingeschrieben, und die Schreibweise im Baum entscheidet über den Namen der erzeugten Methode.

## Jede Zeile einer verschachtelten Liste zeigt dasselbe Element

Eine Sub-View mit Schlüssel innerhalb einer anderen Sub-View mit Schlüssel bekommt ihren Schlüssel nicht. `Cell*0` innerhalb von `Row*0` rendert in jeder Zeile mit dem Schlüssel `0`. Verschieben Sie die Zeile in eine eigene Komponente und reichen Sie ihre Daten über Eigenschaften weiter, und versehen Sie die äußere View mit `Row*`, nicht mit `Row*0`.

## Ich habe die Klasse einer Sub-View geändert und ihr Inhalt ist verschwunden

`Pre* $mol_text_code` auf `Pre* $my_code` umzustellen verwirft die Bindungen, die der Baum der Basis dafür deklariert hat, also müssen sie erneut aufgeführt werden. `text <= pre_text* \` aufzuführen erzeugt einen leeren Stub, der das echte `pre_text` von `$mol_text` überdeckt. Delegieren Sie in der Klasse, statt sich auf `super` zu verlassen, das eben dieser Stub ist:

```typescript
pre_text( index: number ) {
	return $mol_text.prototype.pre_text.call( this, index )
}
```

## Methoden aus der view.ts einer Basiskomponente fehlen in der Unterklasse

`$my_child $my_base` in einem Baum erweitert die aus `base.view.tree` generierte Klasse, nicht die, die Sie in `base.view.ts` geschrieben haben. Dort definierte Methoden erreichen das Kind nicht, und TypeScript meldet sie als fehlend. Logik, die sich mehrere Views teilen, lebt in einer einfachen `.ts`-Datei im `namespace $`, ohne Baum — so, wie `$mol_view` selbst geschrieben ist.

## Eine in derselben view.tree-Datei deklarierte Basiskomponente verliert ihr Verhalten

Wenn eine Baum-Datei sowohl eine Basis als auch eine sie erweiternde Klasse deklariert, wird der Rumpf der `.view.ts` der Basis für das Kind übersprungen. Geben Sie einer Basis, die eine `.view.ts` hat, einen eigenen Ordner.

## Styles laufen zwischen einer Sub-View und der Komponente darin über

`Nav $my_app_nav` innerhalb von `$my_app` setzt dasselbe Attribut `my_app_nav` sowohl auf die Sub-View als auch auf die Komponente, und ein Selektor trifft beide. Benennen Sie die Sub-View so, dass sie das Ende des Klassennamens nicht wiederholt, etwa `Nav_row`.

## Ein Selektor auf ein Attribut mit false trifft nie zu

Ein boolesches Attribut mit dem Wert `false` wird vom Element entfernt, also trifft `[expanded="false"]` auf nichts zu. Bedingtes Rendern ist keine Aufgabe für CSS; überschreiben Sie die Factory der Sub-View und geben Sie `null` für die Variante zurück, die diese View nicht hat.

## Eine Zahl im Style bewirkt nichts

Jeder Zahl in `style *` wird `px` angehängt: Aus `flexGrow 1` wird `flex-grow: 1px`, was der Browser verwirft. Schreiben Sie einheitenlose Werte als Zeichenketten, `flexGrow \1`.

## Zwei Kinder einer Scroll-View liegen übereinander

`$mol_scroll` hält genau ein Kind. Packen Sie die Kinder in ein `$mol_view` oder ein `$mol_list` und geben Sie das dem Scroll.

## minimal_height hat keine sichtbare Wirkung

`minimal_height` ist eine Zahl, mit der das virtualisierte `$mol_list` Zeilen abschätzt, bevor sie rendern; sie setzt keine Höhe. Die Höhe wird in der `.view.css.ts` gesetzt.

## Eine eingebettete Komponente schiebt die Seite zur Seite

Eine View, die in einem fremden Layout eingehängt ist, schrumpft standardmäßig nicht unter ihren Inhalt. Geben Sie der Wurzel `minWidth: 0` in ihren Styles, damit sie sich wie die umgebenden Elemente zusammenquetschen lässt.

## Fremdes CSS stylt meine Komponente nicht

Eine Komponente ohne `dom_name` rendert als Element, das nach ihrer Klasse benannt ist — für ein CSS-Framework ein unbekanntes Inline-Element. Setzen Sie das Tag ausdrücklich: `$mol_button` hat keines, also braucht ein Button, den fremdes CSS stylen soll, `dom_name \button`.

## Ein Klick auf einen Link zur aktuellen Seite leert die URL

Ein `$mol_link` mit `arg *` schaltet um: Auf einer Seite, deren URL bereits passt, entfernt ein Klick diese Schlüssel. Für einen Link, der nur navigiert, leiten Sie ihn mit `uri_off <= uri` ab. Um dieselbe Route bei einem Klick neu zu laden, rufen Sie `$mol_state_arg.value()` aus einem Handler auf und rufen `preventDefault` für das Ereignis auf.

## Mein Eingabe-Handler läuft bei jedem Rendern

Ein `prop?`, das Sie einer Unterklasse von `$mol_string` hinzugefügt haben, trägt den Namen einer Eigenschaft, die die Basis bereits benutzt: `enter`, `submit`, `hint`, `value`, `keyboard`. Gleichen Sie Ihre neuen Namen mit dem Baum der Basis ab, bevor Sie sie hinzufügen.

## Der Fehler aus meinem Wert-Setter erscheint nie

`$mol_string` fängt eine Ausnahme aus `value?` ab und reicht sie an `setCustomValidity` des Eingabefelds weiter, sodass sie nur als native Formularvalidierung auftaucht. Melden Sie den Fehler über einen eigenen Kanal, eine Statuszeile oder eine Meldungs-Sub-View.

## Eine Handler-Bindung mit Schlüssel wird als fehlend gemeldet

`event_click? <=> pick*? null` an einer Sub-View mit Schlüssel erzeugt keinen Stub für `pick`. Deklarieren Sie es selbst in der Wurzel des Baums, `pick*? null`, und implementieren Sie es in der Klasse.

## Das Bundle enthält ein Modul, das ich nie benutze

Der Builder findet Abhängigkeiten, indem er den Quelltext nach `$mol_name`-Tokens durchsucht, und ein Token in einem String-Literal oder in einem `/** */`-Doc-Kommentar zählt genauso viel wie eines im Code. Ein Name, der in einem Doc-Kommentar als Beispiel erwähnt wird, zieht sein ganzes Modul mit, und der Fehler taucht in einer Datei auf, die Sie nie angefasst haben. Schreiben Sie Beispiele und Notizen ohne das `$`-Präfix, oder nennen Sie stattdessen den Ordner.

## Weiter

Das meiste davon läuft auf eine Regel hinaus: Der Name im Baum ist der Vertrag, und der Compiler prüft die Typen, aber nicht die Namen. [Mentales Modell](#!section=docs/page=mental-model) erklärt, warum der Baum eine Liste von Überschreibungen ist, und [Testen](#!section=docs/page=testing) zeigt den Test, der die stillen Fälle fängt.
