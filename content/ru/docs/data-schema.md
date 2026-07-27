# Схемы данных

Данные, возвращаемые из сетевого запроса, имеют тип `any` — TypeScript доверяет вашему приведению, но сервер может прислать что-то другое. $mol поставляет две небольшие библиотеки схем времени выполнения, которые превращают недоверенный JSON в типизированное, проверенное значение и громко падают — с читаемым путём — когда форма неверна. Используйте их прямо там, где данные входят в приложение, чаще всего на ответе [fetch](#!section=docs/page=data).

## Две библиотеки

- **`$mol_data`** — лаконичные функциональные парсеры (в стиле zod). Вы компонуете маленькие функции-парсеры и вызываете результат на значении.
- **`$mol_schema`** — схемы на основе классов со значениями по умолчанию. Вы расширяете класс-запись и получаете `.guard()`, `.cast()`, `.check()` и `.default`.

Обе проверяют во время выполнения и выводят статический тип за вас. Берите `$mol_data` для быстрых DTO и (де)сериализации; берите `$mol_schema`, когда нужны именованные, переиспользуемые классы схем со значениями по умолчанию и мягким приведением.

## $mol_data

Опишите форму как запись парсеров полей:

```typescript
const UserDTO = $mol_data_record({
	name: $mol_data_string,
	age: $mol_data_optional( $mol_data_integer ),
	mail: $mol_data_email,
})
```

Вызовите его на сыром значении. Корректные данные проходят, полностью типизированные; некорректные данные кидают `$mol_data_error`, называя точный путь, который не прошёл:

```typescript
const user = UserDTO( json )
// user: { readonly name: string; readonly age?: number; readonly mail: string }

// If json.mail is "</script>", it throws:
// ["mail"] </script> is not a /.+@.+/
```

Переиспользуйте выведенный тип где угодно с помощью `typeof UserDTO.Value`:

```typescript
function greet( user: typeof UserDTO.Value ) {
	return `Hello, ${ user.name }`
}
```

Строительные блоки включают `$mol_data_string`, `$mol_data_number`, `$mol_data_integer`, `$mol_data_boolean`, `$mol_data_email`, `$mol_data_optional`, `$mol_data_nullable`, `$mol_data_variant` (один из нескольких типов), `$mol_data_array`, `$mol_data_dict` и `$mol_data_record`. `$mol_data_pipe` подаёт разобранное значение в преобразование — например ISO-строку в `$mol_time_moment` — что заодно служит (де)сериализацией.

## $mol_schema

Определите схему как класс, расширяющий запись:

```typescript
export class $my_user extends $mol_schema_record({
	name: $mol_schema_string,
	age: $mol_schema_natural,
}) {}
```

Тогда у вас есть три способа применить её, плюс готовое значение по умолчанию:

```typescript
const safe = $my_user.guard( input )   // strict: throws on wrong data
const relaxed = $my_user.cast( input ) // fills defaults instead of throwing
if ( $my_user.check( input ) ) { /* input is $my_user in here */ }
const blank = $my_user.default         // { name: '', age: 0 }
```

Листовые схемы включают `$mol_schema_string`, `$mol_schema_integer`, `$mol_schema_natural`, `$mol_schema_float`, `$mol_schema_boolean`, `$mol_schema_enum([ ... ])` и `$mol_schema_pattern( /re/ )`. Компонуйте их с помощью `$mol_schema_list( Item )`, `$mol_schema_dict([ Key, Val ])`, `$mol_schema_maybe( S )` (значение, `null` или `undefined`), `$mol_schema_some([ ... ])` (объединение) и `$mol_schema_partial({ ... })`. Разверните поля другой записи с помощью `...Base.Fields`:

```typescript
export class $my_account extends $mol_schema_record({
	... $my_user.Fields,
	bio: $mol_schema_string,
}) {}
```

## Проверка ответа fetch

Разбирайте прямо там, где данные приземляются, внутри реактивного свойства, которое их получает:

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

Если сервер пришлёт неправильную форму, `guard` бросает исключение, и сбой всплывает во вью как состояние ошибки — точно как любая другая [ошибка fetch](#!section=docs/page=data), так что вы никогда не рисуете наполовину сломанные данные. Предпочитайте `cast` вместо `guard`, когда разумное значение по умолчанию лучше ошибки.

## Дальше

Чтобы хранить и синхронизировать типизированные данные между клиентами без бэкенда, который нужно запускать, переходите к [Гипер Базе](#!section=docs/page=giper-baza) — её сущности построены на той же идее схем.
