# От TypeScript к view.tree

Компонент, который вы написали в [Быстром старте](#!section=docs/page=getting-started), — обычный класс на TypeScript. Он компилируется, он работает, и это поддерживаемый способ описать компонент $mol, один из нескольких, которые фреймворк принимает.

Он же заставил вас держать в голове четыре вещи, не имеющие отношения к тому, что компонент делает. Разберём их по одной и покажем строку `view.tree`, которая убирает каждую. А потом посмотрим на код, который генерирует компилятор, — чтобы убедиться, что дерево не второй рантайм, а способ получить тот самый класс, который вы уже написали.

Вот тот файл ещё раз, для сравнения:

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

## Ребёнка создаёте вы, и кешируете тоже вы

Шесть строк из этого файла — фабрика:

```typescript
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}
```

Удалите `@ $mol_mem` — код всё ещё компилируется. И перестаёт быть одним компонентом: `this.Name() !== this.Name()`, потому что тело выполняет `new` на каждый вызов. Побеждает тот, кто прочитал свойство последним, прежние экземпляры остаются со всем, что в них накопилось, и никто их не разрушает: $mol владеет только теми объектами, которые сам вам закешировал.

В `view.tree` тот же ребёнок занимает одну строку:

```tree
		<= Name $mol_string
```

Имя с большой буквы означает, что в свойстве лежит компонент, а `<=` его объявляет. Короткого написания, которое забывает декоратор, тут нет — вы не пишете фабрику.

## Направление данных задаёт оператор

Накормить ребёнка значит присвоить, по свойству за раз:

```typescript
			obj.sub = () => [ this.greeting() ]
```

Три подвижные части: объект ребёнка, имя свойства и стрелка, чтобы чтение случилось позже, а не сейчас. Строка говорит, что с чем связано, но не говорит, в какую сторону; чтобы это узнать, придётся прочитать тело стрелки и проверить, течёт ли что-нибудь обратно.

Дерево кладёт направление в оператор:

```tree
		<= Message $mol_view
			sub / <= greeting \
```

`<=` связывает в одну сторону, из `greeting` в `sub` ребёнка. `/` означает список, `\` начинает сырую строку, а `greeting \` объявляет свойство с пустой строкой по умолчанию — то самое значение, которое вы переопределите в TypeScript.

## Двусторонняя связь в одно нажатие от молчаливого read-only

Полю ввода данные нужны в обе стороны, за это отвечает параметр `next`:

```typescript
			obj.value = ( next?: string ) => this.name( next )
```

А теперь уберите `next`:

```typescript
			obj.value = () => this.name()
```

TypeScript это примет. Функция без аргументов подходит туда, где ждут один необязательный, так что типы сходятся и аудит остаётся зелёным. Поле рисуется, показывает правильное значение и тихо игнорирует всё, что вы печатаете.

В дереве такую половинчатую связь не написать:

```tree
		<= Name $mol_string
			value? <=> name? \
```

`<=>` связывает в обе стороны. Голый `?` помечает свойство, принимающее аргумент, то есть свойство, в которое можно писать. Здесь он стоит с обоих концов, поэтому значение течёт в поле и обратно.

## Локализуемая строка остаётся строкой, пока вы не заведёте ключ

```typescript
		title() {
			return 'Greeting'
		}
```

Чтобы это перевести, вы придумываете ключ, заменяете литерал вызовом `$mol_locale.text`, пишете json и до конца жизни проекта руками держите две вещи в согласии.

```tree
	title @ \Greeting
```

`@` помечает строку как локализуемую, остальное делает сборка. После сборки в `my/hello/-/web.locale=en.json` лежит:

```json
{
	"$my_hello_Name_hint": "Enter your name",
	"$my_hello_title": "Greeting"
}
```

Переводчик получает json со всеми строками приложения. Вы не пишете ни одного ключа.

## Компонент целиком

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

Это `hello.view.tree`. В `hello.view.ts` остаётся то, что структурой никогда и не было:

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

Класс теперь наследует `$.$my_hello`, базу, которую сгенерировало дерево, и переопределяет одно свойство. `$.$$` — пространство имён для таких переопределений.

## Что выдаёт компилятор

`view.tree` — генератор кода без собственного рантайма. Соберите модуль и откройте `my/hello/-view.tree/hello.view.tree.js`:

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

Те же фабрики, те же стрелки, те же три вызова `$mol_mem` плюс два ключа локали, которые вам не пришлось придумывать. К моменту, когда бандл доедет до браузера, дерева уже нет.

Поэтому же оба формата спокойно уживаются. Компонент, написанный деревом, и компонент, написанный классом, дают объекты одного сорта: одно приложение держит и те и другие, и никто не замечает разницы.

## Чего рукописный класс не может отдать инструментам

Рядом со сгенерированным JS компилятор пишет `hello.view.tree.d.ts`:

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

Пары `$mol_type_enforce` сверяют каждую связку со свойством, которое она кормит, поэтому несовпадение типов всплывает на самой связке, а не где-то внутри ребёнка. Тело класса под ними — машиночитаемое описание поверхности компонента, и его читают: файл локали выше извлекается из того же разбора, а [страницы API](#!section=docs/page=api-mol-string) на этом сайте генерируются из `.view.tree.d.ts` каждого базового компонента.

Рукописный класс не даёт ничего из этого. Это код, и прочитать его умеет только TypeScript.

## Про объём

Hello World выше: 31 строка TypeScript превращается в 8 строк дерева плюс 8 строк TypeScript.

С ростом компонента разрыв растёт. `$mol_app_users` — поле поиска, список, четыре кнопки и строка статуса — занимает 30 строк и 840 символов деревом и 125 строк и 3046 символов классом. Оба варианта целиком приведены на вики-странице [сравнения форматов](https://github.com/hyoo-ru/mam_mol/wiki/View-Formats), так что размен можно взвесить самому.

## Что выбрать

Оба, по компоненту.

`view.ts` — поддерживаемый формат. В него компилируется дерево, и написанный так компонент ведёт себя как любой другой. Когда компонент состоит в основном из логики и держит одного-двух детей, класс честнее, а дерево почти ничего не даст.

Дерево окупается там, где обвязка повторяется: экраны, состоящие в основном из структуры, длинные ряды связок, всё, где есть текст для переводчика. Так устроена бо́льшая часть интерфейса — поэтому собственные компоненты $mol написаны деревом.

Дальше — сам язык дерева: списки, словари, ключевые дети и специализация компонента через наследование: **[Вью](#!section=docs/page=views)**.
