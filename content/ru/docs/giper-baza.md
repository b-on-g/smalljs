# Гипер База

Гипер База — это local-first слой данных для $mol: CRDT-хранилище, которое сохраняется локально и синхронизируется между клиентами автоматически. Данные вы моделируете как сущности; чтение и запись выглядят как обычные реактивные свойства, а репликация просто происходит.

> Эта страница знакомит с формой API. Гипер База — большая тема; считайте это картой, а не всей территорией.

## Определение сущности

Сущность — это **чистая схема**, набор типизированных полей. Держите поведение вне неё; чтение и запись делайте во вью.

```typescript
namespace $ {
	export class $my_task extends $giper_baza_entity.with( {
		Title: $giper_baza_atom_text,
		Done: $giper_baza_atom_bool,
		CreatedAt: $giper_baza_atom_time,
	} ) {}
}
```

Каждое поле — это **атом**, синхронизируемая ячейка с типизированным значением.

## Чтение и запись

Возьмите хранилище, доберитесь до списка сущностей и реактивно пройдитесь по ним:

```typescript
		@ $mol_mem
		tasks() {
			return this.tasks_list().remote_list()
		}

		@ $mol_mem_key
		task_done( id: string, next?: boolean ) {
			const task = this.task( id )
			if( next !== undefined ) task.Done( null )!.val( next )
			return task.Done()?.val() ?? false
		}
```

Чтение `Done()?.val()` даёт текущее значение; запись `Done(null)!.val(next)` его задаёт. Любое вью, читающее атом, перерисовывается, когда его меняет он сам — или удалённый пир.

## Создание и удаление

```typescript
		@ $mol_action
		task_add( title: string ) {
			const task = this.tasks_list().make( [ [ null, $giper_baza_rank_read ] ] )!
			task.Title( null )!.val( title )
			task.Done( null )!.val( false )
		}

		@ $mol_action
		task_remove( id: string ) {
			this.tasks_list().cut( this.task( id ).link() )
		}
```

## Синхронизация автоматическая

Настраивать нечего. Изменения реплицируются на другие клиенты в реальном времени, и те же данные доступны офлайн — хранилище сверяется, когда соединение возвращается. Поскольку записи это CRDT-слияния, одновременные правки с разных устройств объединяются без конфликтов.

## Куда дальше?

Теперь у вас есть вся дуга: [Вью](#!section=docs/page=views), [Состояние](#!section=docs/page=state), [Роутинг](#!section=docs/page=routing), [Загрузка данных](#!section=docs/page=data) и local-first хранилище. Попробуйте всё это в [Песочнице](#!section=playground).
