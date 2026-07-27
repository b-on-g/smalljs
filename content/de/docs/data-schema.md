# Datenschemas

Daten, die von einer Netzwerkanfrage zurückkommen, sind `any` — TypeScript vertraut Ihrem Cast, aber der Server könnte etwas anderes senden. $mol liefert zwei kleine Laufzeit-Schema-Bibliotheken, die nicht vertrauenswürdiges JSON in einen typisierten, validierten Wert verwandeln und laut fehlschlagen — mit einem lesbaren Pfad — wenn die Form falsch ist. Verwenden Sie sie genau dort, wo Daten in die App gelangen, meist bei einer [fetch](#!section=docs/page=data)-Antwort.

## Zwei Bibliotheken

- **`$mol_data`** — knappe, funktionale Parser (zod-artig). Sie setzen kleine Parser-Funktionen zusammen und rufen das Ergebnis auf einem Wert auf.
- **`$mol_schema`** — klassenbasierte Schemas mit Standardwerten. Sie erweitern eine Record-Klasse und erhalten `.guard()`, `.cast()`, `.check()` und ein `.default`.

Beide validieren zur Laufzeit und leiten den statischen Typ für Sie ab. Greifen Sie zu `$mol_data` für schnelle DTOs und (De-)Serialisierung; greifen Sie zu `$mol_schema`, wenn Sie benannte, wiederverwendbare Schema-Klassen mit Standardwerten und lockerem Casting wollen.

## $mol_data

Beschreiben Sie die Form als Record von Feld-Parsern:

```typescript
const UserDTO = $mol_data_record({
	name: $mol_data_string,
	age: $mol_data_optional( $mol_data_integer ),
	mail: $mol_data_email,
})
```

Rufen Sie es auf dem Rohwert auf. Gültige Daten gehen durch, vollständig typisiert; ungültige Daten werfen einen `$mol_data_error`, der den genauen fehlgeschlagenen Pfad nennt:

```typescript
const user = UserDTO( json )
// user: { readonly name: string; readonly age?: number; readonly mail: string }

// If json.mail is "</script>", it throws:
// ["mail"] </script> is not a /.+@.+/
```

Verwenden Sie den abgeleiteten Typ überall wieder mit `typeof UserDTO.Value`:

```typescript
function greet( user: typeof UserDTO.Value ) {
	return `Hello, ${ user.name }`
}
```

Zu den Bausteinen gehören `$mol_data_string`, `$mol_data_number`, `$mol_data_integer`, `$mol_data_boolean`, `$mol_data_email`, `$mol_data_optional`, `$mol_data_nullable`, `$mol_data_variant` (einer von mehreren Typen), `$mol_data_array`, `$mol_data_dict` und `$mol_data_record`. `$mol_data_pipe` speist einen geparsten Wert in eine Transformation — zum Beispiel eine ISO-Zeichenkette in ein `$mol_time_moment` — was zugleich als (De-)Serialisierung dient.

## $mol_schema

Definieren Sie ein Schema als Klasse, die einen Record erweitert:

```typescript
export class $my_user extends $mol_schema_record({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}
```

Sie haben dann drei Möglichkeiten, es anzuwenden, plus einen fertigen Standardwert:

```typescript
const safe = $my_user.guard( input )   // strict: throws on wrong data
const relaxed = $my_user.cast( input ) // fills defaults instead of throwing
if ( $my_user.check( input ) ) { /* input is $my_user in here */ }
const blank = $my_user.default         // { name: '', age: 0 }
```

Zu den Blatt-Schemas gehören `$mol_schema_string`, `$mol_schema_integer`, `$mol_schema_natural`, `$mol_schema_float`, `$mol_schema_boolean`, `$mol_schema_enum([ ... ])` und `$mol_schema_pattern( /re/ )`. Setzen Sie sie zusammen mit `$mol_schema_list( Item )`, `$mol_schema_dict([ Key, Val ])`, `$mol_schema_maybe( S )` (ein Wert, `null` oder `undefined`), `$mol_schema_some([ ... ])` (eine Vereinigung) und `$mol_schema_partial({ ... })`. Streuen Sie die Felder eines anderen Records mit `...Base.Fields`:

```typescript
export class $my_account extends $mol_schema_record({
	... $my_user.Fields,
	bio: $mol_schema_string,
}) {}
```

## Eine fetch-Antwort validieren

Parsen Sie genau dort, wo die Daten ankommen, innerhalb der reaktiven Eigenschaft, die sie abruft:

```typescript
namespace $.$$ {
	export class $my_page extends $.$my_page {
		@ $mol_mem
		user() {
			const json = $mol_fetch.json( 'https://api.example.com/me' )
			return $my_user.guard( json ) // typed $my_user, or throws on bad data
		}
	}
}
```

Sendet der Server die falsche Form, wirft `guard` und der Fehler erscheint in der Ansicht als Fehlerzustand — genau wie jeder andere [fetch-Fehler](#!section=docs/page=data), sodass Sie nie halb kaputte Daten rendern. Bevorzugen Sie `cast` gegenüber `guard`, wenn ein sinnvoller Standardwert besser ist als ein Fehler.

## Weiter

Um typisierte Daten ohne laufendes Backend über Clients hinweg zu speichern und zu synchronisieren, fahren Sie mit [Giper Baza](#!section=docs/page=giper-baza) fort — seine Entitäten bauen auf derselben Schema-Idee auf.
