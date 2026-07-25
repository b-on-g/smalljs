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

Reference a package with `require` and MAM installs it on the next build:

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

## Next

With the workspace in place, learn how the UI itself is described — continue to [Views](#!section=docs/page=views).
