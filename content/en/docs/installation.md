# Installation

[Getting Started](#!section=docs/page=getting-started) walks you through your first app step by step. This page is the reference: how a $mol project is laid out and how the build works.

## Requirements

- **Node.js 18+** and **git**. Nothing else is installed globally.

## The MAM workspace

$mol apps live inside **MAM** — the build tool and module registry. You clone it once and develop your modules inside it:

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` runs a watching dev server on `http://localhost:9080/`. It rebuilds on save and resolves dependencies automatically — you never maintain a bundler config.

## How modules are named

Every component name maps to a folder path, and **each underscore is a folder separator**:

```
$my_app          →  my/app/
$my_app_header   →  my/app/header/
```

Module folder names never contain an underscore — use nested folders for multi-word names. If a component you use never shows up in the bundle, the folder path almost always doesn't match the class name.

## Anatomy of a module

A component is a folder with up to four files:

| File | Purpose |
|------|---------|
| `name.view.tree` | Declarative layout |
| `name.view.ts` | Behaviour (TypeScript) |
| `name.view.css.ts` | Typed styles |
| `name.view.tree`, `index.html` | Entry point for an app module |

The `index.html` of an app mounts the root component:

```html
<body mol_view_root>
	<div mol_view_root="$my_app"></div>
	<script src="web.js"></script>
</body>
```

## Building for production

The dev server builds on the fly, but you can build any module explicitly from the workspace root:

```bash
npm run start my/app
```

The output lands in `my/app/-/` — including `web.js`, `web.css`, and `web.audit.js`. **Always check the audit:** a clean `web.audit.js` means no unused dependencies and no type errors.

## Adding npm packages

Reference a package with `require` and MAM installs it on the next build and puts it into the bundle:

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

### Loading a package at runtime

A heavy library that one screen needs does not have to sit in `web.js`. Ship its prebuilt browser file next to the bundle and load it on first use.

List the file in the module's `meta.tree`:

```tree
deploy \/node_modules/@turf/turf/turf.min.js
```

`deploy` installs the package if it is missing and copies the file to `-/node_modules/@turf/turf/turf.min.js`, on the dev server and in the production build alike. Load it with `$mol_import.script`:

```typescript
namespace $ {
	export class $my_app_turf extends $mol_object {

		@ $mol_mem
		static api() {
			$mol_import.script( './node_modules/@turf/turf/turf.min.js' )
			return ( globalThis as any ).turf as typeof import(
				'@turf/turf'
			)
		}

	}
}
```

- The path is relative and resolves against the page in `-/`, so the same code works on the dev server, in `test.html`, and on a deploy under a subpath. A leading `/` only works while the app sits at the domain root.
- `$mol_import.script` suspends the fiber until the script loads and caches by URL: the file is fetched once, and anything that reads `$my_app_turf.api()` inside `$mol_mem` simply waits for it.
- The global name, `turf` here, is whatever the library's browser build assigns. Its README says which.
- `typeof import( … )` gives full typing. Keep the package name on its own line: the builder treats `require( '…' )` and `import( '…' )` written on one line as a dependency and would put the whole package into `web.js` after all.

## Next

With the workspace in place, learn how the UI itself is described — continue to [Views](#!section=docs/page=views).
