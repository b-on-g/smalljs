# 从 TypeScript 到 view.tree

你在[快速上手](#!section=docs/page=getting-started)里写的那个组件，是一个普通的 TypeScript 类。它能编译、能运行，而且是框架支持的几种组件描述方式之一。

它同时也逼你在脑子里记住四件跟组件本身无关的事。本页逐个拆开它们，并给出消掉每一件的那行 `view.tree`。最后再看编译器生成的代码，你可以自己核对：树不是第二套运行时，它产出的正是你已经写过的那个类。

先把那份文件再放一遍，方便对照：

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

## 子组件由你创建，也由你缓存

其中六行是一个工厂：

```typescript
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}
```

删掉 `@ $mol_mem`，代码照样编译。但它不再是同一个组件了：`this.Name() !== this.Name()`，因为函数体每次调用都执行 `new`。谁最后读到这个属性谁说了算，先前的实例带着攒下的一切留在原地，也没有人销毁它们——$mol 只拥有它替你缓存过的对象。

在 `view.tree` 里，同一个子组件就是一行：

```tree
		<= Name $mol_string
```

首字母大写表示这个属性装的是组件，`<=` 负责声明它。这里没有哪种更短的写法会漏掉装饰器，因为工厂根本不用你写。

## 数据往哪边流，由操作符说了算

给子组件喂数据就是赋值，一个属性一次：

```typescript
			obj.sub = () => [ this.greeting() ]
```

三个活动部件：子对象、属性名，以及一个让读取推迟到之后而不是现在发生的箭头。这一行说清了什么连着什么，却没说方向；要知道方向，你得读箭头的函数体，看看有没有东西回流。

树把方向放进了操作符：

```tree
		<= Message $mol_view
			sub / <= greeting \
```

`<=` 是单向的，从 `greeting` 流进子组件的 `sub`。`/` 是列表，`\` 开始一段原始字符串，而 `greeting \` 声明了一个默认值为空字符串的属性——正是你之后要在 TypeScript 里覆盖的那个。

## 双向绑定离「悄悄变成只读」只差一次按键

输入框需要双向的数据，这正是参数 `next` 的作用：

```typescript
			obj.value = ( next?: string ) => this.name( next )
```

现在把 `next` 去掉：

```typescript
			obj.value = () => this.name()
```

TypeScript 接受这种写法。无参函数可以赋给期待一个可选参数的位置，于是类型检查通过，审计依然是绿的。输入框照常渲染，显示正确的值，然后悄无声息地忽略你输入的一切。

在树里，这种只连了一半的写法根本写不出来：

```tree
		<= Name $mol_string
			value? <=> name? \
```

`<=>` 双向绑定。光秃秃的 `?` 标记一个接受参数的属性，也就是可以写入的属性。这里两端都带着它，所以值会流进输入框，也会流回来。

## 一段可本地化的文本，在你为它造出键之前只是字符串

```typescript
		title() {
			return 'Greeting'
		}
```

要翻译它，你得自己想一个键，把字面量换成 `$mol_locale.text` 调用，写好 json，然后在项目余下的日子里手工保持两边一致。

```tree
	title @ \Greeting
```

`@` 把字符串标记为可本地化的，剩下的交给构建。构建之后，`my/hello/-/web.locale=en.json` 里是这样：

```json
{
	"$my_hello_Name_hint": "Enter your name",
	"$my_hello_title": "Greeting"
}
```

译者拿到的是一份含全部文案的 json。你一个键都不用写。

## 完整的组件

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

这就是 `hello.view.tree`。留在 `hello.view.ts` 里的，是从来就不属于结构的那部分：

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

类现在继承 `$.$my_hello`，也就是树生成的基类，并覆盖其中一个属性。`$.$$` 就是放这类覆盖的命名空间。

## 编译器产出什么

`view.tree` 是一个没有自己运行时的代码生成器。构建模块之后，读一读 `my/hello/-view.tree/hello.view.tree.js`：

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

同样的工厂、同样的箭头、同样的三次 `$mol_mem` 调用，外加两个你没动手命名的本地化键。等 bundle 抵达浏览器时，树早已不在。

这也是两种格式能自由混用的原因。用树写的组件和用类写的组件产出的是同一种对象，同一个应用可以同时容纳两者，谁也察觉不到差别。

## 手写的类交不出去的东西

在生成的 JS 旁边，编译器还会写一份 `hello.view.tree.d.ts`：

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

那些 `$mol_type_enforce` 成对地把每条绑定和它所喂的属性核对一遍，于是类型不匹配会报在绑定这一行，而不是子组件深处的某个地方。下面的类体则是组件对外表面的机器可读描述，而且真的有东西在读它：上面那份本地化文件出自同一次解析，本站的 [API 页面](#!section=docs/page=api-mol-string)也是从每个基础组件的 `.view.tree.d.ts` 生成的。

手写的类给不出这些。它是代码，唯一读得懂它的只有 TypeScript。

## 体量

上面这个 Hello World：31 行 TypeScript 变成 8 行树加 8 行 TypeScript。

组件越大，差距越大。`$mol_app_users` 有一个搜索框、一个列表、四个按钮和一行状态，写成树是 30 行、840 个字符，写成类是 125 行、3046 个字符。两个版本在维基的[格式对比](https://github.com/hyoo-ru/mam_mol/wiki/View-Formats)页面上都有完整代码，取舍可以自己掂量。

## 该写哪一种

两种都写，按组件来选。

`view.ts` 是受支持的格式。树最终编译成的就是它，这样写出的组件与其他组件毫无二致。当一个组件主要是逻辑、只带一两个子组件时，类才是诚实的选择，树给不了多少好处。

树划算的地方在于那些重复的仪式：以结构为主的界面、成排的绑定、任何包含译者需要看到的文案的地方。界面的大部分正是如此，所以 $mol 自己的组件都是这么写的。

接下来是树语言本身——列表、字典、带键的子组件，以及用继承来特化一个组件：**[视图](#!section=docs/page=views)**。
