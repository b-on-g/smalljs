# Data Schemas

Data that comes back from a network request is `any` — TypeScript trusts your cast, but the server might send something else. $mol ships two small runtime-schema libraries that turn untrusted JSON into a typed, validated value and fail loudly — with a readable path — when the shape is wrong. Use them right where data enters the app, most often on a [fetch](#!section=docs/page=data) response.

## Two libraries

- **`$mol_data`** — concise, functional parsers (zod-like). You compose small parser functions and call the result on a value.
- **`$mol_schema`** — class-based schemas with defaults. You extend a record class and get `.guard()`, `.cast()`, `.check()`, and a `.default`.

Both validate at runtime and infer the static type for you. Reach for `$mol_data` for quick DTOs and (de)serialization; reach for `$mol_schema` when you want named, reusable schema classes with default values and relaxed casting.

## $mol_data

Describe the shape as a record of field parsers:

```typescript
const UserDTO = $mol_data_record({
	name: $mol_data_string,
	age: $mol_data_optional( $mol_data_integer ),
	mail: $mol_data_email,
})
```

Call it on the raw value. Valid data passes through, fully typed; bad data throws a `$mol_data_error` naming the exact path that failed:

```typescript
const user = UserDTO( json )
// user: { readonly name: string; readonly age?: number; readonly mail: string }

// If json.mail is "</script>", it throws:
// ["mail"] </script> is not a /.+@.+/
```

Reuse the inferred type anywhere with `typeof UserDTO.Value`:

```typescript
function greet( user: typeof UserDTO.Value ) {
	return `Hello, ${ user.name }`
}
```

The building blocks include `$mol_data_string`, `$mol_data_number`, `$mol_data_integer`, `$mol_data_boolean`, `$mol_data_email`, `$mol_data_optional`, `$mol_data_nullable`, `$mol_data_variant` (one of several types), `$mol_data_array`, `$mol_data_dict`, and `$mol_data_record`. `$mol_data_pipe` feeds a parsed value into a transform — for example an ISO string into a `$mol_time_moment` — which doubles as (de)serialization.

## $mol_schema

Define a schema as a class that extends a record:

```typescript
export class $my_user extends $mol_schema_record({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}
```

You then have three ways to apply it, plus a ready-made default:

```typescript
const safe = $my_user.guard( input )   // strict: throws on wrong data
const relaxed = $my_user.cast( input ) // fills defaults instead of throwing
if ( $my_user.check( input ) ) { /* input is $my_user in here */ }
const blank = $my_user.default         // { name: '', age: 0 }
```

Leaf schemas include `$mol_schema_string`, `$mol_schema_integer`, `$mol_schema_natural`, `$mol_schema_float`, `$mol_schema_boolean`, `$mol_schema_enum([ ... ])`, and `$mol_schema_pattern( /re/ )`. Compose them with `$mol_schema_list( Item )`, `$mol_schema_dict([ Key, Val ])`, `$mol_schema_maybe( S )` (value, `null`, or `undefined`), `$mol_schema_some([ ... ])` (a union), and `$mol_schema_partial({ ... })`. Spread another record's fields with `...Base.Fields`:

```typescript
export class $my_account extends $mol_schema_record({
	... $my_user.Fields,
	bio: $mol_schema_string,
}) {}
```

## Validating a fetch response

Parse right where the data lands, inside the reactive property that fetches it:

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

If the server sends the wrong shape, `guard` throws and the failure surfaces in the view as an error state — exactly like any other [fetch error](#!section=docs/page=data), so you never render half-broken data. Prefer `cast` instead of `guard` when a sensible default is better than an error.

## Next

To store and sync typed data across clients with no backend to run, continue to [Giper Baza](#!section=docs/page=giper-baza) — its entities are built on the same schema idea.
