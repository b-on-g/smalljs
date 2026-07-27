# Схеми даних

Дані, що повертаються з мережевого запиту, мають тип `any` — TypeScript довіряє вашому приведенню, але сервер може надіслати щось інше. $mol постачає дві невеликі бібліотеки схем часу виконання, які перетворюють ненадійний JSON на типізоване, перевірене значення й гучно падають — із читабельним шляхом — коли форма неправильна. Використовуйте їх саме там, де дані входять у застосунок, найчастіше на відповіді [fetch](#!section=docs/page=data).

## Дві бібліотеки

- **`$mol_data`** — стислі функціональні парсери (у стилі zod). Ви компонуєте маленькі функції-парсери й викликаєте результат на значенні.
- **`$mol_schema`** — схеми на основі класів зі значеннями за замовчуванням. Ви розширюєте клас-запис і отримуєте `.guard()`, `.cast()`, `.check()` та `.default`.

Обидві перевіряють під час виконання й виводять статичний тип за вас. Беріть `$mol_data` для швидких DTO та (де)серіалізації; беріть `$mol_schema`, коли хочете іменовані, повторно використовувані класи схем зі значеннями за замовчуванням і м'яким приведенням.

## $mol_data

Опишіть форму як запис парсерів полів:

```typescript
const UserDTO = $mol_data_record({
	name: $mol_data_string,
	age: $mol_data_optional( $mol_data_integer ),
	mail: $mol_data_email,
})
```

Викличте його на сирому значенні. Коректні дані проходять, повністю типізовані; некоректні дані кидають `$mol_data_error`, називаючи точний шлях, що не пройшов:

```typescript
const user = UserDTO( json )
// user: { readonly name: string; readonly age?: number; readonly mail: string }

// If json.mail is "</script>", it throws:
// ["mail"] </script> is not a /.+@.+/
```

Повторно використовуйте виведений тип будь-де за допомогою `typeof UserDTO.Value`:

```typescript
function greet( user: typeof UserDTO.Value ) {
	return `Hello, ${ user.name }`
}
```

Будівельні блоки охоплюють `$mol_data_string`, `$mol_data_number`, `$mol_data_integer`, `$mol_data_boolean`, `$mol_data_email`, `$mol_data_optional`, `$mol_data_nullable`, `$mol_data_variant` (один із кількох типів), `$mol_data_array`, `$mol_data_dict` та `$mol_data_record`. `$mol_data_pipe` подає розібране значення в перетворення — наприклад ISO-рядок у `$mol_time_moment` — що заразом слугує (де)серіалізацією.

## $mol_schema

Визначте схему як клас, що розширює запис:

```typescript
export class $my_user extends $mol_schema_record({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}
```

Тоді у вас є три способи застосувати її, плюс готове значення за замовчуванням:

```typescript
const safe = $my_user.guard( input )   // strict: throws on wrong data
const relaxed = $my_user.cast( input ) // fills defaults instead of throwing
if ( $my_user.check( input ) ) { /* input is $my_user in here */ }
const blank = $my_user.default         // { name: '', age: 0 }
```

Листові схеми охоплюють `$mol_schema_string`, `$mol_schema_integer`, `$mol_schema_natural`, `$mol_schema_float`, `$mol_schema_boolean`, `$mol_schema_enum([ ... ])` та `$mol_schema_pattern( /re/ )`. Компонуйте їх за допомогою `$mol_schema_list( Item )`, `$mol_schema_dict([ Key, Val ])`, `$mol_schema_maybe( S )` (значення, `null` або `undefined`), `$mol_schema_some([ ... ])` (об'єднання) та `$mol_schema_partial({ ... })`. Розгорніть поля іншого запису за допомогою `...Base.Fields`:

```typescript
export class $my_account extends $mol_schema_record({
	... $my_user.Fields,
	bio: $mol_schema_string,
}) {}
```

## Перевірка відповіді fetch

Розбирайте саме там, де дані приземляються, усередині реактивної властивості, що їх отримує:

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

Якщо сервер надішле неправильну форму, `guard` кидає виняток, і збій виринає в поданні як стан помилки — точно як будь-яка інша [помилка fetch](#!section=docs/page=data), тож ви ніколи не малюєте наполовину зламані дані. Віддавайте перевагу `cast` над `guard`, коли розумне значення за замовчуванням краще за помилку.

## Далі

Щоб зберігати й синхронізувати типізовані дані між клієнтами без бекенда, який треба запускати, перейдіть до [Giper Baza](#!section=docs/page=giper-baza) — її сутності побудовані на тій самій ідеї схем.
