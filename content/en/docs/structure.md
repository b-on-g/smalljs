# Project structure

A $mol project has four nested levels: the **workspace** you cloned, the **packages** inside it, the **modules** inside those, and the **files** inside a module. Each level answers a different question, and most of what the build does follows from knowing which is which.

```
mam/                            workspace — the MAM checkout
├── .meta.tree                  registry: which package comes from which repo
├── package.json
├── mol/                        package — the framework, its own git repo
│   └── button/                 module — the component $mol_button
│       ├── button.view.tree
│       ├── button.view.ts
│       ├── major/              submodule — $mol_button_major
│       └── minor/              submodule — $mol_button_minor
└── my/                         package — yours
    └── hello/                  module — the component $my_hello
        ├── index.html          entry point (app modules only)
        ├── hello.view.tree     layout
        ├── hello.view.ts       behaviour
        ├── hello.view.css.ts   styles, in TypeScript
        ├── hello.locale=ru.json
        ├── hello.meta.tree     build and deploy directives
        ├── form/               submodule — $my_hello_form
        ├── -view.tree/         generated from hello.view.tree
        └── -/                  build output
```

## Workspace

You clone MAM once and work inside it. It is not a folder that dependencies get copied into: every package sits there as its own git checkout, with history, so you can read the framework's source, put a `debugger` in it, and open a pull request from the same working copy.

The root `.meta.tree` is the registry that makes this work:

```tree
pack mol git \https://github.com/hyoo-ru/mam_mol.git
pack hyoo git \https://github.com/hyoo-ru/mam_hyoo.git
pack lib git \https://github.com/hyoo-ru/mam_lib.git
```

When the build meets `$mol_view` and there is no `mol/` folder yet, it looks the name up here and clones the repository. Nothing is vendored and nothing is flattened.

## Packages

A top-level folder is a package, and a package is a git repository. Your own package is just a folder you name — it needs no registration while it stays local, and a `pack` line the day you want it fetched by name.

Packages nest. A package can carry its own `pack` declarations for the folders inside it, and MAM reads them from the `meta.tree` of the folder that will contain the package. This site lives at `bog/smalljs/` and is a repository of its own, listed in `bog/bog.meta.tree`, which is itself inside the `bog/` checkout listed in the root `.meta.tree`.

## Modules

A module is a folder, and a folder is a component. There is no import statement and no module map — the class name *is* the address, and each underscore in it is a folder separator:

```
$my_hello          →  my/hello/
$my_hello_form     →  my/hello/form/
$mol_button_major  →  mol/button/major/
$mol_after_frame   →  mol/after/frame/
```

That is the whole resolution rule. The builder scans your source text for `$name` tokens, splits each one on `_`, and walks the folders. Nothing declares a dependency; using a name is the declaration.

The practical consequence: **module folder names never contain an underscore.** A folder called `my/hello_form/` would be looked for at `my/hello/form/` and never found — the symptom is a class that compiles in your editor but is missing from the bundle.

A module that has submodules can still be a component itself, in either of two shapes. `$mol_button` lives directly in `mol/button/`, next to `major/` and `minor/`. `$mol_view` lives one level deeper, in `mol/view/view/`, because `mol/view/` also holds `component/`, `selection/`, and `tree2/`. MAM tries the doubled path first and falls back to the shorter one, so both layouts resolve.

## Files in a module

Every file is optional. A module is whatever files it happens to contain.

| File | Purpose |
|------|---------|
| `hello.view.tree` | Declarative layout |
| `hello.view.ts` | Behaviour — the class extending the generated base |
| `hello.view.css.ts` | Typed styles. Note the trailing `.ts`: it is TypeScript calling `$mol_style_define`, not a stylesheet |
| `hello.ts` | A module with no view at all — models, utilities, pure logic |
| `hello.test.ts` | Tests, run by the builder |
| `hello.locale=ru.json` | Translations; any file ending in `.locale=<lang>.json` is picked up |
| `hello.meta.tree` | Build and deploy directives |
| `index.html` | Entry point — only an app module needs one |

A suffix before the extension restricts a file to one environment:

- `frame.web.ts` — browser bundle only, like `mol/after/frame/frame.web.ts`
- `build.node.ts` — Node bundle only, like the MAM builder itself
- `hello.test.ts` — test bundles only

The builder produces a `web` and a `node` bundle for every app and drops the files tagged for the other one, so platform code never has to guard itself at runtime.

Raw `.css` files are also accepted next to a module — the framework uses them for the few things typed styles cannot express, such as `@keyframes` and `content:`. Everything else belongs in `.view.css.ts`, where the property names are checked.

## Generated folders start with a dash

MAM treats a name as source only if it starts with a letter or a digit. Anything else is invisible to the build, which is why every generated folder is prefixed with `-`: the output can sit right next to its input without being read back in as input. The workspace `.gitignore` ignores `-*` for the same reason.

**`-view.tree/`** appears next to any `.view.tree` file and holds what the tree compiles to:

```
my/hello/-view.tree/
├── hello.view.tree.js            the generated base class
├── hello.view.tree.d.ts          its typed interface
└── hello.view.tree.locale=en.json  the @-strings, extracted
```

Your `hello.view.ts` extends the class in there. That is the whole relationship between the two files — [From TypeScript to view.tree](#!section=docs/page=from-ts-to-view-tree) walks through the generated code line by line.

**`-css/`** appears next to a raw `.css` file and holds a generated `.ts` that wraps the stylesheet in a `$mol_style_attach` call, so it travels with the bundle instead of needing a `<link>`.

**`-/`** is the build output of a module you built. For an app it holds `web.js`, `web.css`, `web.audit.js`, `web.d.ts`, `web.deps.json`, one `web.locale=<lang>.json` per language, the `node` counterparts, a rewritten `index.html`, and a generated `package.json` and `manifest.json`. This folder is what you deploy: publishing `app/-` to a static host is the entire deployment step.

None of these are edited by hand. The builder rewrites them whenever their source changes, so an edit there disappears on the next save without any error to tell you why. Change the `.view.tree`, the `.css`, or the sources, and rebuild.

## What meta.tree actually does

`meta.tree` is not a package manifest and does not list dependencies — those come from the code, where a `$mol_view` token is already the whole declaration. It carries the handful of things the code cannot state on its own. This site's `app/app.meta.tree` is the complete file:

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

- **`deploy \/path`** copies a file or folder into `-/`, keeping its workspace-relative path — `\/bog/smalljs/assets` lands in `app/-/bog/smalljs/assets/`. For static files that the deploy must carry but no code imports: images, fonts, icons.
- **`include \/path`** and **`require \/path`** force in a module nothing references, such as `\/mol/offline/install`, whose whole purpose is the service worker it registers on load. They differ only in order: `require` puts the module before the code that pulled it in, `include` after.
- **`pack <name> git \<url>`** is the registry entry described above, read from the meta file of the folder that will hold the package.

MAM reads every `*.meta.tree` file in a folder, so the name carries no meaning beyond convention: `<module>.meta.tree` next to a module, `.meta.tree` at the workspace root.

In practice `deploy`, `include`, and `require` belong to the app module, since that is the thing being built and deployed; ordinary components resolve everything from their code and need no meta file at all. A library module gets one only when it genuinely has an unreferenced dependency — `mol/assert/assert.meta.tree` is a single `include \/mol/dev/format` line, and that is a typical size.

See [Module metadata](#!section=docs/page=meta) for more on the directives.

## Next

[Installation](#!section=docs/page=installation) covers the dev server and the production build, and [Tooling](#!section=docs/page=tooling) has a scaffolder that writes a correct module layout for you.
