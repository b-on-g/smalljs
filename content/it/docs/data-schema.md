# Schemi di dati

I dati che tornano da una richiesta di rete sono `any` — TypeScript si fida del tuo cast, ma il server potrebbe inviare qualcos'altro. $mol offre due piccole librerie di schemi a runtime che trasformano JSON non attendibile in un valore tipizzato e validato, e falliscono rumorosamente — con un percorso leggibile — quando la forma è sbagliata. Usale proprio dove i dati entrano nell'app, il più delle volte su una risposta [fetch](#!section=docs/page=data).

## Due librerie

- **`$mol_data`** — parser funzionali e concisi (in stile zod). Componi piccole funzioni di parsing e chiami il risultato su un valore.
- **`$mol_schema`** — schemi basati su classi con valori predefiniti. Estendi una classe record e ottieni `.guard()`, `.cast()`, `.check()` e un `.default`.

Entrambi validano a runtime e inferiscono il tipo statico per te. Scegli `$mol_data` per DTO rapidi e (de)serializzazione; scegli `$mol_schema` quando vuoi classi di schema nominate e riutilizzabili con valori predefiniti e cast permissivo.

## $mol_data

Descrivi la forma come un record di parser di campi:

```typescript
const UserDTO = $mol_data_record({
	name: $mol_data_string,
	age: $mol_data_optional( $mol_data_integer ),
	mail: $mol_data_email,
})
```

Chiamalo sul valore grezzo. I dati validi passano, completamente tipizzati; i dati errati lanciano un `$mol_data_error` che nomina il percorso esatto che è fallito:

```typescript
const user = UserDTO( json )
// user: { readonly name: string; readonly age?: number; readonly mail: string }

// If json.mail is "</script>", it throws:
// ["mail"] </script> is not a /.+@.+/
```

Riusa il tipo inferito ovunque con `typeof UserDTO.Value`:

```typescript
function greet( user: typeof UserDTO.Value ) {
	return `Hello, ${ user.name }`
}
```

I mattoni di base includono `$mol_data_string`, `$mol_data_number`, `$mol_data_integer`, `$mol_data_boolean`, `$mol_data_email`, `$mol_data_optional`, `$mol_data_nullable`, `$mol_data_variant` (uno di più tipi), `$mol_data_array`, `$mol_data_dict` e `$mol_data_record`. `$mol_data_pipe` immette un valore parsato in una trasformazione — per esempio una stringa ISO in un `$mol_time_moment` — che funge anche da (de)serializzazione.

## $mol_schema

Definisci uno schema come classe che estende un record:

```typescript
export class $my_user extends $mol_schema_record({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}
```

Hai quindi tre modi per applicarlo, più un valore predefinito già pronto:

```typescript
const safe = $my_user.guard( input )   // strict: throws on wrong data
const relaxed = $my_user.cast( input ) // fills defaults instead of throwing
if ( $my_user.check( input ) ) { /* input is $my_user in here */ }
const blank = $my_user.default         // { name: '', age: 0 }
```

Gli schemi foglia includono `$mol_schema_string`, `$mol_schema_integer`, `$mol_schema_natural`, `$mol_schema_float`, `$mol_schema_boolean`, `$mol_schema_enum([ ... ])` e `$mol_schema_pattern( /re/ )`. Componili con `$mol_schema_list( Item )`, `$mol_schema_dict([ Key, Val ])`, `$mol_schema_maybe( S )` (un valore, `null` o `undefined`), `$mol_schema_some([ ... ])` (un'unione) e `$mol_schema_partial({ ... })`. Espandi i campi di un altro record con `...Base.Fields`:

```typescript
export class $my_account extends $mol_schema_record({
	... $my_user.Fields,
	bio: $mol_schema_string,
}) {}
```

## Validare una risposta fetch

Parsa proprio dove i dati arrivano, dentro la proprietà reattiva che li recupera:

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

Se il server invia la forma sbagliata, `guard` lancia e il fallimento affiora nella vista come stato di errore — esattamente come qualsiasi altro [errore di fetch](#!section=docs/page=data), così non renderizzi mai dati a metà rotti. Preferisci `cast` a `guard` quando un valore predefinito sensato è meglio di un errore.

## Avanti

Per archiviare e sincronizzare dati tipizzati tra client senza un backend da eseguire, prosegui verso [Giper Baza](#!section=docs/page=giper-baza) — le sue entità si basano sulla stessa idea di schema.
