# Datová schémata

Data, která se vracejí ze síťového požadavku, mají typ `any` — TypeScript věří vašemu přetypování, ale server může poslat něco jiného. $mol přináší dvě malé runtime knihovny schémat, které promění nedůvěryhodný JSON v typovanou, ověřenou hodnotu a hlasitě selžou — s čitelnou cestou — když je tvar špatný. Používejte je přímo tam, kde data vstupují do aplikace, nejčastěji na odpovědi [fetch](#!section=docs/page=data).

## Dvě knihovny

- **`$mol_data`** — stručné funkcionální parsery (ve stylu zod). Skládáte malé parsovací funkce a výsledek voláte na hodnotě.
- **`$mol_schema`** — schémata založená na třídách s výchozími hodnotami. Rozšíříte třídu záznamu a získáte `.guard()`, `.cast()`, `.check()` a `.default`.

Obě ověřují za běhu a odvodí za vás statický typ. Sáhněte po `$mol_data` pro rychlé DTO a (de)serializaci; sáhněte po `$mol_schema`, když chcete pojmenované, znovupoužitelné třídy schémat s výchozími hodnotami a volnějším přetypováním.

## $mol_data

Popište tvar jako záznam parserů polí:

```typescript
const UserDTO = $mol_data_record({
	name: $mol_data_string,
	age: $mol_data_optional( $mol_data_integer ),
	mail: $mol_data_email,
})
```

Zavolejte jej na surové hodnotě. Platná data projdou, plně typovaná; neplatná data vyhodí `$mol_data_error` s přesnou cestou, která selhala:

```typescript
const user = UserDTO( json )
// user: { readonly name: string; readonly age?: number; readonly mail: string }

// If json.mail is "</script>", it throws:
// ["mail"] </script> is not a /.+@.+/
```

Odvozený typ znovu použijte kdekoli pomocí `typeof UserDTO.Value`:

```typescript
function greet( user: typeof UserDTO.Value ) {
	return `Hello, ${ user.name }`
}
```

Mezi stavební kameny patří `$mol_data_string`, `$mol_data_number`, `$mol_data_integer`, `$mol_data_boolean`, `$mol_data_email`, `$mol_data_optional`, `$mol_data_nullable`, `$mol_data_variant` (jeden z několika typů), `$mol_data_array`, `$mol_data_dict` a `$mol_data_record`. `$mol_data_pipe` přivede rozparsovanou hodnotu do transformace — například řetězec ISO do `$mol_time_moment` — což zároveň slouží jako (de)serializace.

## $mol_schema

Definujte schéma jako třídu, která rozšiřuje záznam:

```typescript
export class $my_user extends $mol_schema_record({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}
```

Pak máte tři způsoby, jak jej použít, plus hotovou výchozí hodnotu:

```typescript
const safe = $my_user.guard( input )   // strict: throws on wrong data
const relaxed = $my_user.cast( input ) // fills defaults instead of throwing
if ( $my_user.check( input ) ) { /* input is $my_user in here */ }
const blank = $my_user.default         // { name: '', age: 0 }
```

Mezi listová schémata patří `$mol_schema_string`, `$mol_schema_integer`, `$mol_schema_natural`, `$mol_schema_float`, `$mol_schema_boolean`, `$mol_schema_enum([ ... ])` a `$mol_schema_pattern( /re/ )`. Skládejte je pomocí `$mol_schema_list( Item )`, `$mol_schema_dict([ Key, Val ])`, `$mol_schema_maybe( S )` (hodnota, `null` nebo `undefined`), `$mol_schema_some([ ... ])` (sjednocení) a `$mol_schema_partial({ ... })`. Rozprostřete pole jiného záznamu pomocí `...Base.Fields`:

```typescript
export class $my_account extends $mol_schema_record({
	... $my_user.Fields,
	bio: $mol_schema_string,
}) {}
```

## Ověření odpovědi fetch

Parsujte přímo tam, kde data přistávají, uvnitř reaktivní vlastnosti, která je načítá:

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

Pokud server pošle špatný tvar, `guard` vyhodí výjimku a selhání se v pohledu projeví jako chybový stav — přesně jako jakákoli jiná [chyba fetch](#!section=docs/page=data), takže nikdy nevykreslíte napůl rozbitá data. Když je rozumná výchozí hodnota lepší než chyba, dejte přednost `cast` před `guard`.

## Dále

Pro ukládání a synchronizaci typovaných dat mezi klienty bez běžícího backendu pokračujte na [Giper Baza](#!section=docs/page=giper-baza) — její entity stojí na téže myšlence schémat.
