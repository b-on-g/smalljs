# From TypeScript to view.tree

The component you wrote in [Getting Started](#!section=docs/page=getting-started) is a plain TypeScript class. It compiles, it runs, and it is a supported way to describe a $mol component — one of several the framework accepts.

It also asked you to keep four things in your head that had nothing to do with what the component does. This page takes them one at a time and shows the line of `view.tree` that removes each one. Then it shows the code the compiler generates, so you can check that the tree is not a second runtime: it produces the class you already wrote.

Here is that file again, to compare against:

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

## The child is yours to build, and yours to cache

Six of those lines are a factory:

```typescript
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}
```

Delete `@ $mol_mem` and it still compiles. It also stops being one component: `this.Name() !== this.Name()`, because the body runs `new` on every call. Whoever reads the property last wins, the earlier instances keep whatever they were holding, and nothing disposes of them — $mol only owns the objects it cached for you.

In `view.tree` the same child is one line:

```tree
		<= Name $mol_string
```

A capitalized name means the property holds a component; `<=` declares it. There is no shorter spelling that forgets the decorator, because you are not writing the factory.

## The operator says which way the data moves

Feeding a child means assigning to it, one property at a time:

```typescript
			obj.sub = () => [ this.greeting() ]
```

Three moving parts: the child object, the property name, and an arrow so the read happens later instead of now. The line says what is connected but not in which direction — to learn that you read the arrow body and check whether anything flows back.

The tree puts the direction in the operator:

```tree
		<= Message $mol_view
			sub / <= greeting \
```

`<=` is one-way, from `greeting` into the child's `sub`. `/` is a list, `\` starts a raw string, and `greeting \` declares a property with an empty string as its default — the value you will override in TypeScript.

## Two-way binding is one keystroke away from silently read-only

The input needs data going both ways, which is the `next` parameter:

```typescript
			obj.value = ( next?: string ) => this.name( next )
```

Now drop `next`:

```typescript
			obj.value = () => this.name()
```

TypeScript accepts this. A function of no arguments is assignable where one optional argument is expected, so the types check out and the audit stays green. The field renders, shows the right value, and quietly ignores everything you type.

In the tree that half-connection cannot be written:

```tree
		<= Name $mol_string
			value? <=> name? \
```

`<=>` binds both directions. The bare `?` marks a property that takes an argument, which is the same thing as saying you can write to it. Both ends carry it here, so the value flows into the field and back out again.

## A localized string stays a string until you make it a key

```typescript
		title() {
			return 'Greeting'
		}
```

To translate that you invent a key, replace the literal with a `$mol_locale.text` call, write the json, and keep the two in step by hand for the rest of the project's life.

```tree
	title @ \Greeting
```

`@` marks the string as localizable, and the build does the rest. After a build, `my/hello/-/web.locale=en.json` holds:

```json
{
	"$my_hello_Name_hint": "Enter your name",
	"$my_hello_title": "Greeting"
}
```

Translators get a json file with every string in the app. You never write a key.

## The whole component

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

That is `hello.view.tree`. What stays in `hello.view.ts` is the part that was never structure:

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

The class now extends `$.$my_hello`, the base the tree generated, and overrides one property. `$.$$` is the namespace for those overrides.

## What the compiler emits

`view.tree` is a code generator with no runtime of its own. Build the module and read `my/hello/-view.tree/hello.view.tree.js`:

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

The same factories, the same arrows, the same three `$mol_mem` calls, plus the two locale keys you did not have to name. By the time the bundle reaches a browser the tree is gone.

That is also why the two formats mix freely. A component written as a tree and a component written as a class produce the same kind of object, so one app can hold both and neither knows the difference.

## What a hand-written class cannot hand to a tool

Next to the generated JS the compiler writes `hello.view.tree.d.ts`:

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

The `$mol_type_enforce` pairs check each binding against the property it feeds, so a type mismatch is reported at the binding itself rather than somewhere inside the child. The class body below them is a machine-readable description of the component's surface, and things read it: the locale file above is extracted from the same parse, and the [API pages](#!section=docs/page=api-mol-string) on this site are generated from the `.view.tree.d.ts` of each core component.

A class written by hand offers none of that. It is code, and the only thing that can read it is TypeScript.

## The size of it

The Hello World above: 31 lines of TypeScript become 8 lines of tree plus 8 lines of TypeScript.

The gap widens with the component. `$mol_app_users` — a search field, a list, four buttons and a status line — is 30 lines and 840 characters as a tree, and 125 lines and 3046 characters as a class. Both versions are printed in full on the wiki's [format comparison](https://github.com/hyoo-ru/mam_mol/wiki/View-Formats) page, so you can weigh the trade yourself.

## Which one to write

Both, chosen per component.

`view.ts` is a supported format. It is what the tree compiles to, and a component written that way behaves like any other. When a component is mostly logic with one or two children, the class is the honest choice and the tree buys you little.

The tree pays for itself where the ceremony repeats: screens that are mostly structure, long runs of bindings, anything with text a translator will want. That describes most of a user interface, which is why $mol's own components are written this way.

Next, the tree language itself — lists, dictionaries, keyed children, and specializing a component by extending it: **[Views](#!section=docs/page=views)**.
