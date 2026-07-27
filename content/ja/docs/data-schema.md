# データスキーマ

ネットワークリクエストから返るデータは `any` です——TypeScript はあなたのキャストを信じますが、サーバーは別のものを送るかもしれません。$mol は、信頼できない JSON を型付き・検証済みの値に変え、形が間違っていれば読みやすいパスとともに大きく失敗する、2 つの小さなランタイムスキーマライブラリを備えています。データがアプリに入るまさにその場所、たいていは [fetch](#!section=docs/page=data) の応答で使ってください。

## 2 つのライブラリ

- **`$mol_data`**——簡潔で関数的なパーサー（zod 風）。小さなパース関数を組み合わせ、その結果を値に対して呼び出します。
- **`$mol_schema`**——既定値を持つクラスベースのスキーマ。レコードクラスを継承すると `.guard()`、`.cast()`、`.check()`、そして `.default` が手に入ります。

どちらも実行時に検証し、静的型をあなたのために推論します。手早い DTO や（逆）シリアライズには `$mol_data` を、既定値と緩いキャストを備えた名前付き・再利用可能なスキーマクラスが欲しいときは `$mol_schema` を選んでください。

## $mol_data

形をフィールドパーサーのレコードとして記述します。

```typescript
const UserDTO = $mol_data_record({
	name: $mol_data_string,
	age: $mol_data_optional( $mol_data_integer ),
	mail: $mol_data_email,
})
```

生の値に対して呼び出します。妥当なデータは完全に型付けされて通り、不正なデータは失敗した正確なパスを示す `$mol_data_error` をスローします。

```typescript
const user = UserDTO( json )
// user: { readonly name: string; readonly age?: number; readonly mail: string }

// If json.mail is "</script>", it throws:
// ["mail"] </script> is not a /.+@.+/
```

推論された型は `typeof UserDTO.Value` でどこでも再利用できます。

```typescript
function greet( user: typeof UserDTO.Value ) {
	return `Hello, ${ user.name }`
}
```

構成要素には `$mol_data_string`、`$mol_data_number`、`$mol_data_integer`、`$mol_data_boolean`、`$mol_data_email`、`$mol_data_optional`、`$mol_data_nullable`、`$mol_data_variant`（複数の型のいずれか）、`$mol_data_array`、`$mol_data_dict`、`$mol_data_record` があります。`$mol_data_pipe` はパース済みの値を変換へ送り込みます——たとえば ISO 文字列を `$mol_time_moment` へ——これは（逆）シリアライズも兼ねます。

## $mol_schema

スキーマをレコードを継承するクラスとして定義します。

```typescript
export class $my_user extends $mol_schema_record({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}
```

すると、適用する 3 つの方法に加えて、すぐ使える既定値が手に入ります。

```typescript
const safe = $my_user.guard( input )   // strict: throws on wrong data
const relaxed = $my_user.cast( input ) // fills defaults instead of throwing
if ( $my_user.check( input ) ) { /* input is $my_user in here */ }
const blank = $my_user.default         // { name: '', age: 0 }
```

葉スキーマには `$mol_schema_string`、`$mol_schema_integer`、`$mol_schema_natural`、`$mol_schema_float`、`$mol_schema_boolean`、`$mol_schema_enum([ ... ])`、`$mol_schema_pattern( /re/ )` があります。それらを `$mol_schema_list( Item )`、`$mol_schema_dict([ Key, Val ])`、`$mol_schema_maybe( S )`（値、`null`、または `undefined`）、`$mol_schema_some([ ... ])`（合併）、`$mol_schema_partial({ ... })` で組み合わせます。別のレコードのフィールドは `...Base.Fields` で展開します。

```typescript
export class $my_account extends $mol_schema_record({
	... $my_user.Fields,
	bio: $mol_schema_string,
}) {}
```

## fetch 応答の検証

データが着地するまさにその場所、それを取得するリアクティブなプロパティの内部でパースします。

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

サーバーが間違った形を送ると `guard` がスローし、失敗は他のどんな [fetch エラー](#!section=docs/page=data)ともまったく同じようにビューでエラー状態として現れるので、半分壊れたデータを描画することは決してありません。妥当な既定値のほうがエラーよりよい場合は、`guard` より `cast` を選んでください。

## 次へ

実行するバックエンドなしにクライアント間で型付きデータを保存・同期するには、[Giper Baza](#!section=docs/page=giper-baza) に進んでください——そのエンティティはまさに同じスキーマの考え方の上に築かれています。
