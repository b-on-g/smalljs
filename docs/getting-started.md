# Getting Started

This page takes you from an empty folder to a running, reactive $mol app. It should take about fifteen minutes. Every snippet below is real, working code — copy it as-is.

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

Now add three files inside `my/hello/`.

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

### hello.view.tree — the layout

```tree
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

A few things worth naming:

- `$mol_page` and `$mol_string` are built-in components — a page shell and a text input.
- `<=` binds a property one way; `<=>` binds two ways. So `value? <=> name?` keeps the input and your `name` state in sync.
- `@` marks a localizable string; `\` starts a raw string.

### hello.view.ts — the behaviour

```typescript
namespace $.$$ {
	export class $my_hello extends $.$my_hello {
		@ $mol_mem
		greeting() {
			const name = this.name()
			return name ? `Hello, ${name}!` : 'Please enter your name'
		}
	}
}
```

`@ $mol_mem` makes `greeting` a reactive, cached property. It reads `name()`, so the moment `name` changes, `greeting` recomputes and the message on screen updates. You never wrote a subscription, an effect, or a re-render call.

## 3. Run it

The dev server from step 1 is already watching. Just open:

```
http://localhost:9080/my/hello/
```

Type your name — the greeting updates as you type. That is $mol reactivity: state flows to the view on its own.

## 4. Add a second reactive value

Reactivity composes. Add a length counter that depends on the same `name`, with no extra wiring.

In `hello.view.tree`, add a line under `Message`:

```tree
		<= Counter $mol_view
			sub / <= counter \
```

In `hello.view.ts`, add the method:

```typescript
		@ $mol_mem
		counter() {
			return `${this.name().length} characters`
		}
}
```

Both `greeting` and `counter` read `name`; both update together. Add a third, add a tenth — the pattern does not change. This is why $mol code stays flat as features pile up.

## 5. Check your build

MAM writes a diagnostics file next to every app. After a build, open:

```
http://localhost:9080/my/hello/-/web.audit.js
```

A clean audit means no unused deps, no type problems, nothing to fix. Make a habit of glancing at it — it catches mistakes before they reach a browser.

## You built a $mol app

You have a reactive component, two-way binding, and derived state — with three small files and zero configuration.

Keep going: the **[Guide](#!section=docs/page=installation)** covers installation, views, state, routing, and data in depth — and turns this Hello World into something real.
