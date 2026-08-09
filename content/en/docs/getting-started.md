# Getting Started

This page takes you from an empty folder to a running, reactive $mol app. It should take about fifteen minutes. Every snippet below is real, working code — copy it as-is.

You will write the component in plain TypeScript. $mol also has a shorter format for describing components, `view.tree`, and you will meet it on the next page. Nothing here needs it: a $mol component is an ordinary class either way.

## What you need

- **Node.js 18+** and **git**. That is the whole list.

You do not install a global CLI or generate boilerplate you have to understand later. $mol apps live inside the MAM workspace, which already knows how to build and serve them.

## 1. Get the workspace

MAM is the build tool and module registry for $mol. Clone it and install once:

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` launches the dev server on `http://localhost:9080/`. It watches your files and rebuilds automatically — leave it running in its own terminal.

## 2. Create a module

A $mol app is just a folder. Pick a namespace (yours, e.g. `my`) and a name (`hello`):

```bash
mkdir -p my/hello
```

> **One rule to remember:** underscores in a component name are folder separators. `$my_hello` lives in `my/hello/`, `$my_hello_form` would live in `my/hello/form/`. Module folder names never contain an underscore.

Now add two files inside `my/hello/`.

### index.html — the entry point

```html
<!doctype html>
<html mol_view_root>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>
	<body mol_view_root>
		<div mol_view_root="$my_hello"></div>
		<script src="web.js"></script>
	</body>
</html>
```

The `mol_view_root="$my_hello"` attribute mounts your component when the page loads.

### hello.view.ts — the component

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

Read it top to bottom:

- `$my_hello` lives in `namespace $`, the ambient namespace that holds every $mol component. It extends `$mol_page`, a built-in page shell with a title and a body. `$mol_string` further down is the built-in text input.
- `body()` returns the children. A child here is a property, not markup: `Name` and `Message` are methods you can call, override in a subclass, or target from a stylesheet by name.
- `Name()` builds the input and wires it up. Each of its properties gets an **arrow**, not a value. The child calls that arrow whenever it needs the data, so it always reads the current one.
- `name( next?: string )` is the state. Called with no argument it reads, called with one it writes. Handing that whole function to `obj.value` is what makes typing in the field update `name`.
- `@ $mol_mem` caches a property per instance. On `name` it means the value is kept, and whatever read it is recomputed when it changes. On `Name` and `Message` it means one child component, built once, instead of a fresh one on every call.
- `greeting()` reads `name()`. That read *is* the subscription. When `name` changes, `greeting` recomputes and the text on screen follows, with no effect to declare, no dependency list and no re-render call.

## 3. Run it

The dev server from step 1 is already watching. Just open:

```
http://localhost:9080/my/hello/
```

Type your name and the greeting updates as you type. That is $mol reactivity: state flows to the view on its own.

## 4. Add a second reactive value

Reactivity composes. Add a length counter that reads the same `name`, with no extra wiring.

Put it in `body()`:

```typescript
		body() {
			return [ this.Name(), this.Message(), this.Counter() ]
		}
```

and add the two properties behind it:

```typescript
		@ $mol_mem
		Counter() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.counter() ]
			return obj
		}

		counter() {
			return `${ this.name().length } characters`
		}
```

Both `greeting` and `counter` read `name`, and both update together. Add a third, add a tenth: the reactive half never changes shape.

The other half does. Three lines of logic arrived with six lines of plumbing around them — a factory, a `new`, an arrow, a `return obj`. Multiply that by every child on a real screen and you have the reason `view.tree` exists.

## 5. Check your build

MAM writes a diagnostics file next to every app. After a build, open:

```
http://localhost:9080/my/hello/-/web.audit.js
```

A clean audit means no unused deps, no type problems, nothing to fix. Make a habit of glancing at it — it catches mistakes before they reach a browser.

## You built a $mol app

A reactive component with two-way binding and derived state, in one file, with zero configuration.

Now take that exact file and watch it shrink: **[From TypeScript to view.tree](#!section=docs/page=from-ts-to-view-tree)**.
