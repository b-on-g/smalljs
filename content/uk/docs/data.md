# Отримання даних

Завантаження віддалених даних у $mol — це не окремий API: асинхронне значення — це просто реактивна властивість, яка повертає проміс. Подання чекає на неї, показує стан завантаження й перемальовується, коли вона розв'язується.

## Асинхронна властивість

Поверніть проміс із `@ $mol_mem` і читайте його, як будь-яке інше значення:

```typescript
namespace $.$$ {
	export class $my_users extends $.$my_users {
		@ $mol_mem
		users() {
			return $mol_fetch.json( 'https://api.example.com/users' ) as {
				id: number
				name: string
			}[]
		}
	}
}
```

`$mol_fetch` призупиняє волокно, доки не надійде відповідь. Поки вона очікується, будь-яке подання, що читає `users()`, автоматично показує вбудований стан завантаження — ви не пишете жодного прапорця `isLoading`.

## Малювання результату

Прив'яжіть розв'язані дані прямо в список:

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

Коли проміс розв'язується, `users()` оновлюється, `user_names()` переобчислюється, і список малюється. Ніяких колбеків, ніякого `useEffect`.

## Перезавантаження

Оскільки це просто реактивна комірка, ви перезавантажуєте її, знецінюючи. Залежте від токена, який можна збільшувати:

```typescript
		@ $mol_mem
		reload_token( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		users() {
			this.reload_token() // subscribe
			return $mol_fetch.json( 'https://api.example.com/users' ) as unknown[]
		}

		@ $mol_action
		reload() {
			this.reload_token( this.reload_token() + 1 )
		}
```

Виклик `reload()` змінює токен, що знецінює `users()`, що перезавантажує.

## Помилки

Виняток усередині реактивної властивості поширюється до найближчого подання, яке малює стан помилки замість вмісту. Щоб обробити його самотужки, зловіть і поверніть запасне значення:

```typescript
		@ $mol_mem
		users_safe() {
			try {
				return this.users()
			} catch( error ) {
				if( error instanceof Promise ) throw error // still loading
				return []
			}
		}
```

Повторний кидок `Promise` — це спосіб дати станові завантаження й далі текти, ловлячи лише справжні помилки.

## Далі

Для даних, що зберігаються й синхронізуються між клієнтами без бекенда, перейдіть до [Giper Baza](#!section=docs/page=giper-baza).
