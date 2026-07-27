# Schémas de données

Les données qui reviennent d'une requête réseau sont de type `any` — TypeScript fait confiance à votre cast, mais le serveur pourrait envoyer autre chose. $mol fournit deux petites bibliothèques de schémas à l'exécution qui transforment du JSON non fiable en une valeur typée et validée, et échouent bruyamment — avec un chemin lisible — quand la forme est incorrecte. Utilisez-les là où les données entrent dans l'application, le plus souvent sur une réponse [fetch](#!section=docs/page=data).

## Deux bibliothèques

- **`$mol_data`** — des parseurs fonctionnels et concis (à la zod). Vous composez de petites fonctions de parsing et appelez le résultat sur une valeur.
- **`$mol_schema`** — des schémas basés sur des classes avec valeurs par défaut. Vous étendez une classe d'enregistrement et obtenez `.guard()`, `.cast()`, `.check()` et un `.default`.

Les deux valident à l'exécution et infèrent le type statique pour vous. Choisissez `$mol_data` pour des DTO rapides et la (dé)sérialisation ; choisissez `$mol_schema` quand vous voulez des classes de schéma nommées et réutilisables avec des valeurs par défaut et un cast souple.

## $mol_data

Décrivez la forme comme un enregistrement de parseurs de champs :

```typescript
const UserDTO = $mol_data_record({
	name: $mol_data_string,
	age: $mol_data_optional( $mol_data_integer ),
	mail: $mol_data_email,
})
```

Appelez-le sur la valeur brute. Les données valides passent, entièrement typées ; les données incorrectes lèvent une `$mol_data_error` nommant le chemin exact qui a échoué :

```typescript
const user = UserDTO( json )
// user: { readonly name: string; readonly age?: number; readonly mail: string }

// If json.mail is "</script>", it throws:
// ["mail"] </script> is not a /.+@.+/
```

Réutilisez le type inféré partout avec `typeof UserDTO.Value` :

```typescript
function greet( user: typeof UserDTO.Value ) {
	return `Hello, ${ user.name }`
}
```

Les briques de base incluent `$mol_data_string`, `$mol_data_number`, `$mol_data_integer`, `$mol_data_boolean`, `$mol_data_email`, `$mol_data_optional`, `$mol_data_nullable`, `$mol_data_variant` (l'un de plusieurs types), `$mol_data_array`, `$mol_data_dict` et `$mol_data_record`. `$mol_data_pipe` fait passer une valeur parsée dans une transformation — par exemple une chaîne ISO en un `$mol_time_moment` — ce qui sert aussi de (dé)sérialisation.

## $mol_schema

Définissez un schéma comme une classe qui étend un enregistrement :

```typescript
export class $my_user extends $mol_schema_record({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}
```

Vous avez alors trois façons de l'appliquer, plus une valeur par défaut prête à l'emploi :

```typescript
const safe = $my_user.guard( input )   // strict: throws on wrong data
const relaxed = $my_user.cast( input ) // fills defaults instead of throwing
if ( $my_user.check( input ) ) { /* input is $my_user in here */ }
const blank = $my_user.default         // { name: '', age: 0 }
```

Les schémas feuilles incluent `$mol_schema_string`, `$mol_schema_integer`, `$mol_schema_natural`, `$mol_schema_float`, `$mol_schema_boolean`, `$mol_schema_enum([ ... ])` et `$mol_schema_pattern( /re/ )`. Composez-les avec `$mol_schema_list( Item )`, `$mol_schema_dict([ Key, Val ])`, `$mol_schema_maybe( S )` (une valeur, `null` ou `undefined`), `$mol_schema_some([ ... ])` (une union) et `$mol_schema_partial({ ... })`. Étalez les champs d'un autre enregistrement avec `...Base.Fields` :

```typescript
export class $my_account extends $mol_schema_record({
	... $my_user.Fields,
	bio: $mol_schema_string,
}) {}
```

## Valider une réponse fetch

Parsez là où les données arrivent, à l'intérieur de la propriété réactive qui les récupère :

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

Si le serveur envoie la mauvaise forme, `guard` lève une erreur et l'échec apparaît dans la vue comme un état d'erreur — exactement comme n'importe quelle autre [erreur de fetch](#!section=docs/page=data), donc vous ne rendez jamais des données à moitié cassées. Préférez `cast` à `guard` quand une valeur par défaut sensée vaut mieux qu'une erreur.

## Suite

Pour stocker et synchroniser des données typées entre clients sans backend à exécuter, continuez vers [Giper Baza](#!section=docs/page=giper-baza) — ses entités reposent sur la même idée de schéma.
