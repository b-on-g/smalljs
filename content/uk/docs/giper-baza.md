# Giper Baza

Giper Baza — це шар даних local-first у $mol: CRDT-сховище, що зберігається локально й автоматично синхронізується між клієнтами. Ви моделюєте дані як сутності; читання й записи виглядають як звичайні реактивні властивості, а реплікація просто відбувається.

> Ця сторінка знайомить із формою API. Giper Baza — велика тема; сприймайте це як карту, а не всю територію.

## Визначте сутність

Сутність — це **чиста схема**, набір типізованих полів. Тримайте поведінку осторонь; читання й запис робіть у своїх поданнях.

```typescript
namespace $ {
	export class $my_task extends $giper_baza_entity.with( {
		Title: $giper_baza_atom_text,
		Done: $giper_baza_atom_bool,
		CreatedAt: $giper_baza_atom_time,
	} ) {}
}
```

Кожне поле — це **атом**, синхронізована комірка з типізованим значенням.

## Читання й запис

Отримайте сховище, дістаньтеся до списку сутностей і реактивно пройдіться по них:

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

Читання `Done()?.val()` дає поточне значення; запис `Done(null)!.val(next)` встановлює його. Будь-яке подання, що читає атом, перемальовується, коли воно — або віддалений вузол — його змінює.

## Створення й видалення

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

## Синхронізація автоматична

Налаштовувати нічого не треба. Зміни реплікуються до інших клієнтів у реальному часі, і ті самі дані доступні офлайн — сховище узгоджується, коли з'являється з'єднання. Оскільки записи — це CRDT-злиття, одночасні правки з різних пристроїв поєднуються без конфліктів.

## Куди далі?

Тепер у вас є повна дуга: [Подання](#!section=docs/page=views), [Стан](#!section=docs/page=state), [Маршрутизація](#!section=docs/page=routing), [Отримання даних](#!section=docs/page=data) і сховище local-first. Спробуйте все це в [Пісочниці](#!section=playground).
