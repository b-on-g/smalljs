# Сборник рецептов

Короткие, готовые к копированию рецепты для задач, которые встречаются почти в каждом приложении. Каждый — реальный код $mol: поменяйте имена и вставляйте к себе.

## Двусторонняя привязка ввода

Держите ввод и производное значение в синхроне без ручной обвязки: `<=>` связывает в обе стороны, а любое вычисляемое свойство, которое читает значение, обновляется само.

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

## Список с добавлением и удалением

Держите коллекцию в реактивном свойстве и переписывайте её иммутабельно из действий. Ключевой `Row*` рендерит по строке на элемент, и — благодаря [виртуализированному рендерингу](#!section=docs/page=rendering) — создаются только видимые строки.

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

## Загрузка данных с состояниями загрузки и ошибки

Асинхронное значение — это просто реактивное свойство, возвращающее промис. `$mol_fetch` приостанавливает фибру, пока запрос в пути, поэтому любой вид, читающий его, показывает встроенное состояние загрузки — а неудавшийся запрос всплывает как состояние ошибки. Вы не пишете ни флага `isLoading`, ни `try`/`catch`.

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

## Сохранение локального состояния

Для состояния, которое должно пережить перезагрузку, но не засорять URL — свёрнутый сайдбар, черновик, настройку — используйте `$mol_state_local`. У него та же форма геттера/сеттера, что и у любого реактивного свойства, а хранит он в `localStorage`.

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

## Чтение и запись параметра маршрута

Чтобы сделать значение разделяемым и добавляемым в закладки, подложите под него `$mol_state_arg`. Чтение возвращает текущее значение из URL; передача аргумента — навигирует, а кнопка «Назад» браузера сама обновляет ячейку.

```typescript
@ $mol_mem
page( next?: string ) {
	return $mol_state_arg.value( 'page', next ) ?? 'home'
}
```

`$mol_link` может задать тот же аргумент декларативно, так что обычный клик навигирует без обработчика:

```tree
<= Home_link $mol_link
	arg *
		page \home
	sub / <= home_label \Home
```

О переключении экранов по маршрутному значению — в [Маршрутизации](#!section=docs/page=routing).

## Автоматическая светлая/тёмная тема

Подключите `$mol_theme_auto` как [плагин](#!section=docs/page=plugins) — компонент без собственного элемента, указанный под `plugins /`. Он применяет светлую или тёмную тему к поддереву хоста, следуя настройке ОС, ничем не оборачивая вашу вёрстку.

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
	sub /
		<= Content $my_content
```

## Дальше

Хотите попробовать вживую? Откройте [Песочницу](#!section=playground) и вставьте любой рецепт, или пройдите [Getting Started](#!section=docs/page=getting-started), чтобы собрать полноценное приложение.
