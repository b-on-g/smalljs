# Від TypeScript до view.tree

Компонент, який ви написали в [Початку роботи](#!section=docs/page=getting-started), — звичайний клас на TypeScript. Він компілюється, він працює, і це підтримуваний спосіб описати компонент $mol, один із кількох, які фреймворк приймає.

Він же змусив вас тримати в голові чотири речі, що не стосуються того, що компонент робить. Розберемо їх по одній і покажемо рядок `view.tree`, який прибирає кожну. А потім подивимось на код, який генерує компілятор, — щоб переконатися, що дерево не другий рантайм, а спосіб отримати той самий клас, який ви вже написали.

Ось той файл ще раз, для порівняння:

```typescript
namespace $ {

	export class $my_hello extends $mol_page {

		title() {
			return 'Greeting'
		}

		body() {
			return [ this.Name(), this.Message() ]
		}

		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}

		@ $mol_mem
		name( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.greeting() ]
			return obj
		}

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

## Дитину створюєте ви, і кешуєте теж ви

Шість рядків із цього файлу — фабрика:

```typescript
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}
```

Видаліть `@ $mol_mem` — код усе ще компілюється. І перестає бути одним компонентом: `this.Name() !== this.Name()`, бо тіло виконує `new` на кожен виклик. Перемагає той, хто прочитав властивість останнім, попередні екземпляри лишаються з усім, що в них накопичилось, і ніхто їх не знищує: $mol володіє лише тими об'єктами, які сам вам закешував.

У `view.tree` та сама дитина займає один рядок:

```tree
		<= Name $mol_string
```

Ім'я з великої літери означає, що у властивості лежить компонент, а `<=` її оголошує. Коротшого написання, яке забуває декоратор, тут немає — фабрику пишете не ви.

## Напрямок даних задає оператор

Нагодувати дитину означає присвоїти, по властивості за раз:

```typescript
			obj.sub = () => [ this.greeting() ]
```

Три рухомі частини: об'єкт дитини, ім'я властивості та стрілка, щоб читання сталося пізніше, а не зараз. Рядок каже, що з чим пов'язано, але не каже, в який бік; щоб це дізнатися, доведеться прочитати тіло стрілки й перевірити, чи тече щось назад.

Дерево кладе напрямок в оператор:

```tree
		<= Message $mol_view
			sub / <= greeting \
```

`<=` — одностороннє, з `greeting` у `sub` дитини. `/` — список, `\` починає сирий рядок, а `greeting \` оголошує властивість із порожнім рядком за замовчуванням: те саме значення, яке ви перевизначите в TypeScript.

## Двостороннє зв'язування за одне натискання від мовчазного read-only

Полю введення дані потрібні в обидва боки, за це відповідає параметр `next`:

```typescript
			obj.value = ( next?: string ) => this.name( next )
```

А тепер приберіть `next`:

```typescript
			obj.value = () => this.name()
```

TypeScript це прийме. Функція без аргументів підходить туди, де чекають один необов'язковий, тож типи сходяться й аудит лишається зеленим. Поле малюється, показує правильне значення й тихо ігнорує все, що ви друкуєте.

У дереві таке половинчасте зв'язування не написати:

```tree
		<= Name $mol_string
			value? <=> name? \
```

`<=>` зв'язує в обидва боки. Голий `?` позначає властивість, що приймає аргумент, тобто властивість, у яку можна писати. Тут він стоїть з обох кінців, тому значення тече в поле й назад.

## Локалізований рядок лишається рядком, доки ви не заведете ключ

```typescript
		title() {
			return 'Greeting'
		}
```

Щоб це перекласти, ви вигадуєте ключ, замінюєте літерал викликом `$mol_locale.text`, пишете json і до кінця життя проєкту руками тримаєте дві речі в злагоді.

```tree
	title @ \Greeting
```

`@` позначає рядок як локалізований, решту робить збірка. Після збірки в `my/hello/-/web.locale=en.json` лежить:

```json
{
	"$my_hello_Name_hint": "Enter your name",
	"$my_hello_title": "Greeting"
}
```

Перекладач отримує json з усіма рядками застосунку. Ви не пишете жодного ключа.

## Компонент цілком

```tree-no-run
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

Це `hello.view.tree`. У `hello.view.ts` лишається те, що структурою ніколи й не було:

```typescript
namespace $.$$ {

	export class $my_hello extends $.$my_hello {

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

Клас тепер успадковує `$.$my_hello`, базу, яку згенерувало дерево, і перевизначає одну властивість. `$.$$` — простір імен для таких перевизначень.

## Що видає компілятор

`view.tree` — генератор коду без власного рантайму. Зберіть модуль і відкрийте `my/hello/-view.tree/hello.view.tree.js`:

```javascript
	($.$my_hello) = class $my_hello extends ($.$mol_page) {
		name(next){
			if(next !== undefined) return next;
			return "";
		}
		Name(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this.$.$mol_locale.text("$my_hello_Name_hint")));
			(obj.value) = (next) => ((this.name(next)));
			return obj;
		}
		greeting(){
			return "";
		}
		Message(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.greeting())]);
			return obj;
		}
		title(){
			return (this.$.$mol_locale.text("$my_hello_title"));
		}
		body(){
			return [(this.Name()), (this.Message())];
		}
	};
	($mol_mem(($.$my_hello.prototype), "name"));
	($mol_mem(($.$my_hello.prototype), "Name"));
	($mol_mem(($.$my_hello.prototype), "Message"));
```

Ті самі фабрики, ті самі стрілки, ті самі три виклики `$mol_mem` плюс два ключі локалі, яких вам не довелося вигадувати. До моменту, коли бандл доїде до браузера, дерева вже немає.

Тому ж обидва формати спокійно уживаються. Компонент, написаний деревом, і компонент, написаний класом, дають об'єкти одного ґатунку: один застосунок тримає і ті й ті, і ніхто не помічає різниці.

## Чого рукописний клас не може віддати інструментам

Поруч зі згенерованим JS компілятор пише `hello.view.tree.d.ts`:

```typescript
declare namespace $ {

	type $mol_string__hint_my_hello_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_my_hello_2 = $mol_type_enforce<
		ReturnType< $my_hello['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_view__sub_my_hello_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $my_hello extends $mol_page {
		name( next?: string ): string
		Name( ): $mol_string
		greeting( ): string
		Message( ): $mol_view
		title( ): string
		body( ): readonly(any)[]
	}

}
```

Пари `$mol_type_enforce` звіряють кожне зв'язування з властивістю, яку воно годує, тож розбіжність типів спливає на самому зв'язуванні, а не десь усередині дитини. Тіло класу під ними — машиночитний опис поверхні компонента, і його читають: файл локалі вище видобувається з того самого розбору, а [сторінки API](#!section=docs/page=api-mol-string) на цьому сайті генеруються з `.view.tree.d.ts` кожного базового компонента.

Рукописний клас не дає нічого з цього. Це код, і прочитати його вміє лише TypeScript.

## Про обсяг

Hello World вище: 31 рядок TypeScript перетворюється на 8 рядків дерева плюс 8 рядків TypeScript.

Зі зростанням компонента розрив росте. `$mol_app_users` — поле пошуку, список, чотири кнопки й рядок статусу — займає 30 рядків і 840 символів деревом і 125 рядків та 3046 символів класом. Обидва варіанти цілком наведені на вікі-сторінці [порівняння форматів](https://github.com/hyoo-ru/mam_mol/wiki/View-Formats), тож розмін можна зважити самому.

## Що обрати

Обидва, по компоненту.

`view.ts` — підтримуваний формат. У нього компілюється дерево, і написаний так компонент поводиться як будь-який інший. Коли компонент складається переважно з логіки й тримає одну-дві дитини, клас чесніший, а дерево майже нічого не дасть.

Дерево окупається там, де обв'язка повторюється: екрани, що складаються переважно зі структури, довгі ряди зв'язувань, усе, де є текст для перекладача. Так влаштована більша частина інтерфейсу — тому власні компоненти $mol написані деревом.

Далі — сама мова дерева: списки, словники, ключові діти й спеціалізація компонента через успадкування: **[В'ю](#!section=docs/page=views)**.
