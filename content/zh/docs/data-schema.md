# 数据模式

从网络请求返回的数据类型是 `any`——TypeScript 相信你的类型断言，但服务器可能发来别的东西。$mol 提供两个小巧的运行时模式库，把不可信的 JSON 变成有类型、经过校验的值，并在形状错误时大声失败——附带一条可读的路径。请在数据进入应用的地方使用它们，最常见的是在 [fetch](#!section=docs/page=data) 响应上。

## 两个库

- **`$mol_data`**——简洁的函数式解析器（类似 zod）。你组合小型解析函数，并把结果作用在一个值上。
- **`$mol_schema`**——带默认值、基于类的模式。你扩展一个记录类，就得到 `.guard()`、`.cast()`、`.check()` 和一个 `.default`。

两者都在运行时校验，并为你推断静态类型。做快速 DTO 和（反）序列化时用 `$mol_data`；想要具名、可复用、带默认值和宽松转换的模式类时用 `$mol_schema`。

## $mol_data

把形状描述为字段解析器的记录：

```typescript
const UserDTO = $mol_data_record({
	name: $mol_data_string,
	age: $mol_data_optional( $mol_data_integer ),
	mail: $mol_data_email,
})
```

把它作用在原始值上。有效数据会通过，且完全带类型；无效数据会抛出一个 `$mol_data_error`，指出失败的确切路径：

```typescript
const user = UserDTO( json )
// user: { readonly name: string; readonly age?: number; readonly mail: string }

// If json.mail is "</script>", it throws:
// ["mail"] </script> is not a /.+@.+/
```

用 `typeof UserDTO.Value` 在任何地方复用推断出的类型：

```typescript
function greet( user: typeof UserDTO.Value ) {
	return `Hello, ${ user.name }`
}
```

构建块包括 `$mol_data_string`、`$mol_data_number`、`$mol_data_integer`、`$mol_data_boolean`、`$mol_data_email`、`$mol_data_optional`、`$mol_data_nullable`、`$mol_data_variant`（多种类型之一）、`$mol_data_array`、`$mol_data_dict` 和 `$mol_data_record`。`$mol_data_pipe` 把解析后的值送入一个转换——例如把 ISO 字符串转成 `$mol_time_moment`——这同时也充当（反）序列化。

## $mol_schema

把模式定义为一个扩展记录的类：

```typescript
export class $my_user extends $mol_schema_record({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}
```

于是你有三种方式来应用它，外加一个现成的默认值：

```typescript
const safe = $my_user.guard( input )   // strict: throws on wrong data
const relaxed = $my_user.cast( input ) // fills defaults instead of throwing
if ( $my_user.check( input ) ) { /* input is $my_user in here */ }
const blank = $my_user.default         // { name: '', age: 0 }
```

叶子模式包括 `$mol_schema_string`、`$mol_schema_integer`、`$mol_schema_natural`、`$mol_schema_float`、`$mol_schema_boolean`、`$mol_schema_enum([ ... ])` 和 `$mol_schema_pattern( /re/ )`。用 `$mol_schema_list( Item )`、`$mol_schema_dict([ Key, Val ])`、`$mol_schema_maybe( S )`（值、`null` 或 `undefined`）、`$mol_schema_some([ ... ])`（联合）和 `$mol_schema_partial({ ... })` 组合它们。用 `...Base.Fields` 展开另一个记录的字段：

```typescript
export class $my_account extends $mol_schema_record({
	... $my_user.Fields,
	bio: $mol_schema_string,
}) {}
```

## 校验一个 fetch 响应

就在数据落地的地方解析，也就是在获取它的那个响应式属性内部：

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

如果服务器发来错误的形状，`guard` 会抛出，失败会像任何其他 [fetch 错误](#!section=docs/page=data)一样在视图中呈现为错误状态，因此你永远不会渲染半坏的数据。当一个合理的默认值胜过一个错误时，优先用 `cast` 而不是 `guard`。

## 下一步

若要在无需运行后端的情况下，跨客户端存储并同步带类型的数据，请继续前往 [Giper Baza](#!section=docs/page=giper-baza)——它的实体正是建立在同样的模式理念之上。
