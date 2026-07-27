# 資料模式

從網路請求回傳的資料型別是 `any`——TypeScript 相信你的型別斷言，但伺服器可能傳來別的東西。$mol 提供兩個小巧的執行期模式函式庫，把不可信的 JSON 變成有型別、經過驗證的值，並在形狀錯誤時大聲失敗——附帶一條可讀的路徑。請在資料進入應用程式的地方使用它們，最常見的是在 [fetch](#!section=docs/page=data) 回應上。

## 兩個函式庫

- **`$mol_data`**——簡潔的函式式解析器（類似 zod）。你組合小型解析函式，並把結果作用在一個值上。
- **`$mol_schema`**——帶預設值、基於類別的模式。你擴充一個記錄類別，就得到 `.guard()`、`.cast()`、`.check()` 和一個 `.default`。

兩者都在執行期驗證，並為你推斷靜態型別。做快速 DTO 和（反）序列化時用 `$mol_data`；想要具名、可重用、帶預設值和寬鬆轉換的模式類別時用 `$mol_schema`。

## $mol_data

把形狀描述為欄位解析器的記錄：

```typescript
const UserDTO = $mol_data_record({
	name: $mol_data_string,
	age: $mol_data_optional( $mol_data_integer ),
	mail: $mol_data_email,
})
```

把它作用在原始值上。有效資料會通過，且完全帶型別；無效資料會拋出一個 `$mol_data_error`，指出失敗的確切路徑：

```typescript
const user = UserDTO( json )
// user: { readonly name: string; readonly age?: number; readonly mail: string }

// If json.mail is "</script>", it throws:
// ["mail"] </script> is not a /.+@.+/
```

用 `typeof UserDTO.Value` 在任何地方重用推斷出的型別：

```typescript
function greet( user: typeof UserDTO.Value ) {
	return `Hello, ${ user.name }`
}
```

構建塊包括 `$mol_data_string`、`$mol_data_number`、`$mol_data_integer`、`$mol_data_boolean`、`$mol_data_email`、`$mol_data_optional`、`$mol_data_nullable`、`$mol_data_variant`（多種型別之一）、`$mol_data_array`、`$mol_data_dict` 和 `$mol_data_record`。`$mol_data_pipe` 把解析後的值送入一個轉換——例如把 ISO 字串轉成 `$mol_time_moment`——這同時也充當（反）序列化。

## $mol_schema

把模式定義為一個擴充記錄的類別：

```typescript
export class $my_user extends $mol_schema_record({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}
```

於是你有三種方式來套用它，外加一個現成的預設值：

```typescript
const safe = $my_user.guard( input )   // strict: throws on wrong data
const relaxed = $my_user.cast( input ) // fills defaults instead of throwing
if ( $my_user.check( input ) ) { /* input is $my_user in here */ }
const blank = $my_user.default         // { name: '', age: 0 }
```

葉子模式包括 `$mol_schema_string`、`$mol_schema_integer`、`$mol_schema_natural`、`$mol_schema_float`、`$mol_schema_boolean`、`$mol_schema_enum([ ... ])` 和 `$mol_schema_pattern( /re/ )`。用 `$mol_schema_list( Item )`、`$mol_schema_dict([ Key, Val ])`、`$mol_schema_maybe( S )`（值、`null` 或 `undefined`）、`$mol_schema_some([ ... ])`（聯合）和 `$mol_schema_partial({ ... })` 組合它們。用 `...Base.Fields` 展開另一個記錄的欄位：

```typescript
export class $my_account extends $mol_schema_record({
	... $my_user.Fields,
	bio: $mol_schema_string,
}) {}
```

## 驗證一個 fetch 回應

就在資料落地的地方解析，也就是在獲取它的那個響應式屬性內部：

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

如果伺服器傳來錯誤的形狀，`guard` 會拋出，失敗會像任何其他 [fetch 錯誤](#!section=docs/page=data)一樣在視圖中呈現為錯誤狀態，因此你永遠不會渲染半壞的資料。當一個合理的預設值勝過一個錯誤時，優先用 `cast` 而不是 `guard`。

## 下一步

若要在無需執行後端的情況下，跨用戶端儲存並同步帶型別的資料，請繼續前往 [Giper Baza](#!section=docs/page=giper-baza)——它的實體正是建立在同樣的模式理念之上。
