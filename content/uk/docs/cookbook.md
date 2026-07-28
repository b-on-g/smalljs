# Збірник рецептів

Короткі, готові до копіювання рецепти для задач, що трапляються майже в кожному застосунку. Кожен — реальний код $mol: змініть імена та вставляйте до себе.

## Двостороння прив'язка вводу

Тримайте ввід і похідне значення в синхроні без ручної обв'язки: `<=>` зв'язує в обидва боки, а будь-яка обчислювана властивість, що читає значення, оновлюється сама.

```tree
$my_greeter $mol_view
	sub /
		<= Name $mol_string
			value? <=> name?
		<= Hello $mol_view
			sub / <= greeting \
```

```typescript
namespace $.$$ {
	export class $my_greeter extends $.$my_greeter {
		@ $mol_mem name( next?: string ) { return next ?? '' }

		@ $mol_mem greeting() {
			return this.name() ? `Hello, ${ this.name() }!` : 'Type your name'
		}
	}
}
```

## Список із додаванням і видаленням

Тримайте колекцію в реактивній властивості та переписуйте її незмінно з дій. Ключовий `Row*` рендерить по рядку на елемент, і — завдяки [віртуалізованому рендерингу](#!section=docs/page=rendering) — створюються лише видимі рядки.

```tree
$my_todo $mol_view
	draft? \
	items /
	sub /
		<= Input $mol_string
			value? <=> draft?
			hint \New item
		<= Add $mol_button_major
			click? <=> add?
			sub / <= add_label \Add
		<= List $mol_list
			rows <= item_rows /
	Row* $mol_row
		sub /
			<= Label* $mol_view
				sub / <= item_title* \
			<= Delete* $mol_button_minor
				click? <=> delete*?
				sub / <= delete_label \✕
```

```typescript
namespace $.$$ {
	export class $my_todo extends $.$my_todo {
		@ $mol_mem draft( next?: string ) { return next ?? '' }
		@ $mol_mem items( next?: readonly string[] ) { return next ?? [] }

		@ $mol_action add() {
			const title = this.draft().trim()
			if( !title ) return
			this.items([ ... this.items(), title ])
			this.draft( '' )
		}

		@ $mol_action delete( id: number ) {
			this.items( this.items().filter( ( _, i ) => i !== id ) )
		}

		item_title( id: number ) { return this.items()[ id ] }

		item_rows() {
			return this.items().map( ( _, id ) => this.Row( id ) )
		}
	}
}
```

## Завантаження даних зі станами завантаження та помилки

Асинхронне значення — це просто реактивна властивість, що повертає проміс. `$mol_fetch` призупиняє фібру, доки запит у дорозі, тож будь-який вигляд, що читає його, показує вбудований стан завантаження — а невдалий запит зринає як стан помилки. Ви не пишете ні прапорця `isLoading`, ні `try`/`catch`.

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

		@ $mol_mem
		names() {
			return this.users().map( user => user.name )
		}
	}
}
```

## Збереження локального стану

Для стану, що має пережити перезавантаження, але не засмічувати URL — згорнутий сайдбар, чернетку, налаштування — використовуйте `$mol_state_local`. У нього та сама форма геттера/сеттера, що й у будь-якої реактивної властивості, а зберігає він у `localStorage`.

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

## Читання та запис параметра маршруту

Щоб зробити значення розділюваним і придатним до закладок, підкладіть під нього `$mol_state_arg`. Читання повертає поточне значення з URL; передача аргументу — навігує, а кнопка «Назад» браузера сама оновлює комірку.

```typescript
@ $mol_mem
page( next?: string ) {
	return $mol_state_arg.value( 'page', next ) ?? 'home'
}
```

`$mol_link` може задати той самий аргумент декларативно, тож звичайний клік навігує без обробника:

```tree
<= Home_link $mol_link
	arg *
		page \home
	sub / <= home_label \Home
```

Про перемикання екранів за маршрутним значенням — у [Маршрутизації](#!section=docs/page=routing).

## Автоматична світла/темна тема

Підключіть `$mol_theme_auto` як [плагін](#!section=docs/page=plugins) — компонент без власного елемента, вказаний під `plugins /`. Він застосовує світлу чи темну тему до піддерева хоста, слідуючи налаштуванню ОС, нічим не обгортаючи вашу верстку.

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
	sub /
		<= Content $my_content
```

## Далі

Хочете спробувати наживо? Відкрийте [Пісочницю](#!section=playground) і вставте будь-який рецепт, або пройдіть [Getting Started](#!section=docs/page=getting-started), щоб зібрати повноцінний застосунок.
