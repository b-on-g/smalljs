# Esquemas de dados

Os dados que voltam de uma requisição de rede são `any` — o TypeScript confia no seu cast, mas o servidor pode enviar outra coisa. O $mol traz duas pequenas bibliotecas de esquema em tempo de execução que transformam JSON não confiável em um valor tipado e validado, e falham ruidosamente — com um caminho legível — quando o formato está errado. Use-as bem onde os dados entram no app, na maioria das vezes em uma resposta de [fetch](#!section=docs/page=data).

## Duas bibliotecas

- **`$mol_data`** — parsers funcionais e concisos (ao estilo zod). Você compõe pequenas funções de parsing e chama o resultado sobre um valor.
- **`$mol_schema`** — esquemas baseados em classes com valores padrão. Você estende uma classe de registro e obtém `.guard()`, `.cast()`, `.check()` e um `.default`.

Ambas validam em tempo de execução e inferem o tipo estático para você. Recorra a `$mol_data` para DTOs rápidos e (des)serialização; recorra a `$mol_schema` quando quiser classes de esquema nomeadas e reutilizáveis com valores padrão e cast flexível.

## $mol_data

Descreva o formato como um registro de parsers de campo:

```typescript
const UserDTO = $mol_data_record({
	name: $mol_data_string,
	age: $mol_data_optional( $mol_data_integer ),
	mail: $mol_data_email,
})
```

Chame-o sobre o valor bruto. Dados válidos passam, totalmente tipados; dados inválidos lançam um `$mol_data_error` nomeando o caminho exato que falhou:

```typescript
const user = UserDTO( json )
// user: { readonly name: string; readonly age?: number; readonly mail: string }

// If json.mail is "</script>", it throws:
// ["mail"] </script> is not a /.+@.+/
```

Reutilize o tipo inferido em qualquer lugar com `typeof UserDTO.Value`:

```typescript
function greet( user: typeof UserDTO.Value ) {
	return `Hello, ${ user.name }`
}
```

Os blocos de construção incluem `$mol_data_string`, `$mol_data_number`, `$mol_data_integer`, `$mol_data_boolean`, `$mol_data_email`, `$mol_data_optional`, `$mol_data_nullable`, `$mol_data_variant` (um de vários tipos), `$mol_data_array`, `$mol_data_dict` e `$mol_data_record`. `$mol_data_pipe` alimenta um valor parseado em uma transformação — por exemplo uma string ISO em um `$mol_time_moment` — o que também serve como (des)serialização.

## $mol_schema

Defina um esquema como uma classe que estende um registro:

```typescript
export class $my_user extends $mol_schema_record({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}
```

Você então tem três formas de aplicá-lo, além de um valor padrão pronto:

```typescript
const safe = $my_user.guard( input )   // strict: throws on wrong data
const relaxed = $my_user.cast( input ) // fills defaults instead of throwing
if ( $my_user.check( input ) ) { /* input is $my_user in here */ }
const blank = $my_user.default         // { name: '', age: 0 }
```

Os esquemas folha incluem `$mol_schema_string`, `$mol_schema_integer`, `$mol_schema_natural`, `$mol_schema_float`, `$mol_schema_boolean`, `$mol_schema_enum([ ... ])` e `$mol_schema_pattern( /re/ )`. Componha-os com `$mol_schema_list( Item )`, `$mol_schema_dict([ Key, Val ])`, `$mol_schema_maybe( S )` (um valor, `null` ou `undefined`), `$mol_schema_some([ ... ])` (uma união) e `$mol_schema_partial({ ... })`. Espalhe os campos de outro registro com `...Base.Fields`:

```typescript
export class $my_account extends $mol_schema_record({
	... $my_user.Fields,
	bio: $mol_schema_string,
}) {}
```

## Validar uma resposta de fetch

Parseie bem onde os dados chegam, dentro da propriedade reativa que os busca:

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

Se o servidor enviar o formato errado, `guard` lança e a falha aparece na vista como um estado de erro — exatamente como qualquer outro [erro de fetch](#!section=docs/page=data), então você nunca renderiza dados meio quebrados. Prefira `cast` a `guard` quando um valor padrão sensato for melhor que um erro.

## Próximo

Para armazenar e sincronizar dados tipados entre clientes sem um backend para executar, continue para [Giper Baza](#!section=docs/page=giper-baza) — suas entidades se baseiam na mesma ideia de esquema.
