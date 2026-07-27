# Schematy danych

Dane wracające z żądania sieciowego mają typ `any` — TypeScript ufa twojemu rzutowaniu, ale serwer może wysłać coś innego. $mol dostarcza dwie małe biblioteki schematów działające w czasie wykonania, które zamieniają niezaufany JSON w typowaną, zwalidowaną wartość i zawodzą głośno — z czytelną ścieżką — gdy kształt jest zły. Używaj ich tam, gdzie dane wchodzą do aplikacji, najczęściej na odpowiedzi [fetch](#!section=docs/page=data).

## Dwie biblioteki

- **`$mol_data`** — zwięzłe, funkcyjne parsery (w stylu zod). Komponujesz małe funkcje parsujące i wywołujesz wynik na wartości.
- **`$mol_schema`** — schematy oparte na klasach z wartościami domyślnymi. Rozszerzasz klasę rekordu i otrzymujesz `.guard()`, `.cast()`, `.check()` oraz `.default`.

Obie walidują w czasie wykonania i wnioskują za ciebie typ statyczny. Sięgnij po `$mol_data` dla szybkich DTO i (de)serializacji; sięgnij po `$mol_schema`, gdy chcesz nazwane, wielokrotnego użytku klasy schematów z wartościami domyślnymi i luźnym rzutowaniem.

## $mol_data

Opisz kształt jako rekord parserów pól:

```typescript
const UserDTO = $mol_data_record({
	name: $mol_data_string,
	age: $mol_data_optional( $mol_data_integer ),
	mail: $mol_data_email,
})
```

Wywołaj go na surowej wartości. Poprawne dane przechodzą, w pełni typowane; błędne dane rzucają `$mol_data_error` nazywający dokładną ścieżkę, która zawiodła:

```typescript
const user = UserDTO( json )
// user: { readonly name: string; readonly age?: number; readonly mail: string }

// If json.mail is "</script>", it throws:
// ["mail"] </script> is not a /.+@.+/
```

Użyj ponownie wywnioskowanego typu wszędzie za pomocą `typeof UserDTO.Value`:

```typescript
function greet( user: typeof UserDTO.Value ) {
	return `Hello, ${ user.name }`
}
```

Klocki obejmują `$mol_data_string`, `$mol_data_number`, `$mol_data_integer`, `$mol_data_boolean`, `$mol_data_email`, `$mol_data_optional`, `$mol_data_nullable`, `$mol_data_variant` (jeden z kilku typów), `$mol_data_array`, `$mol_data_dict` oraz `$mol_data_record`. `$mol_data_pipe` przekazuje sparsowaną wartość do transformacji — na przykład ciąg ISO do `$mol_time_moment` — co jednocześnie służy jako (de)serializacja.

## $mol_schema

Zdefiniuj schemat jako klasę rozszerzającą rekord:

```typescript
export class $my_user extends $mol_schema_record({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}
```

Masz wtedy trzy sposoby jego zastosowania oraz gotową wartość domyślną:

```typescript
const safe = $my_user.guard( input )   // strict: throws on wrong data
const relaxed = $my_user.cast( input ) // fills defaults instead of throwing
if ( $my_user.check( input ) ) { /* input is $my_user in here */ }
const blank = $my_user.default         // { name: '', age: 0 }
```

Schematy liściowe obejmują `$mol_schema_string`, `$mol_schema_integer`, `$mol_schema_natural`, `$mol_schema_float`, `$mol_schema_boolean`, `$mol_schema_enum([ ... ])` oraz `$mol_schema_pattern( /re/ )`. Komponuj je za pomocą `$mol_schema_list( Item )`, `$mol_schema_dict([ Key, Val ])`, `$mol_schema_maybe( S )` (wartość, `null` lub `undefined`), `$mol_schema_some([ ... ])` (unia) oraz `$mol_schema_partial({ ... })`. Rozłóż pola innego rekordu za pomocą `...Base.Fields`:

```typescript
export class $my_account extends $mol_schema_record({
	... $my_user.Fields,
	bio: $mol_schema_string,
}) {}
```

## Walidacja odpowiedzi fetch

Parsuj tam, gdzie dane lądują, wewnątrz reaktywnej właściwości, która je pobiera:

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

Jeśli serwer wyśle zły kształt, `guard` rzuca, a niepowodzenie pojawia się w widoku jako stan błędu — dokładnie jak każdy inny [błąd fetch](#!section=docs/page=data), więc nigdy nie renderujesz na wpół zepsutych danych. Wolij `cast` od `guard`, gdy sensowna wartość domyślna jest lepsza niż błąd.

## Dalej

Aby przechowywać i synchronizować typowane dane między klientami bez uruchamiania backendu, przejdź do [Giper Baza](#!section=docs/page=giper-baza) — jej encje opierają się na tej samej idei schematu.
