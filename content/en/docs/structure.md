# Project structure

A $mol project has four nested levels: the **workspace** you cloned, the **packages** inside it, the **modules** inside those, and the **files** inside a module. The layout answers one practical question — where a new project goes and what owns its history — and almost everything the build does follows from it.

```structure
mam/                     workspace — the MAM checkout
├── .meta.tree           registry: which package comes from which repo
├── mol/                 package — the framework, its own git repo
└── my/                  package — yours, its own git repo
    ├── .gitattributes   keeps built binaries intact
    ├── my.meta.tree     registry of your own projects
    └── hello/           project — a module, and a git repo of its own
        ├── index.html   entry point (app modules only)
        ├── hello.view.tree
        └── form/        submodule — $my_hello_form
```

On this page every line of that listing carries a question mark with the reason it is there; the sections further down say the same at length.

## Start a project

Five steps. Only the first one is ever repeated, and the scaffolder can do the last three for you.

**1. Clone the workspace, once.** Everything you write from now on lives inside it.

```bash
git clone https://github.com/hyoo-ru/mam.git
cd mam
```

**2. Make a package of your own.** One short folder — your name, your company, your handle — and a git repository of its own. It is the container for every project you will start:

```bash
mkdir my
cd my
git init
```

Push it wherever you keep code, public or private. Add a `.gitattributes` with a single `* -text` line while you are there; the reason is [below](#!section=docs/page=structure/Docs.Body=One%20file%20every%20package%20needs).

**3. Add the registry.** `my/my.meta.tree` is the list of projects inside your package. It starts empty and gets a line per project:

```tree
pack hello git \https://github.com/you/hello.git
```

MAM reads it the same way it reads the workspace `.meta.tree` one level up, so a colleague who clones `my/` gets the projects too.

**4. Create the project, with a repository of its own.** The folder is the component — `my/hello/` is `$my_hello` — and its history belongs to it, not to your package and not to $mol:

```bash
mkdir hello
cd hello
git init
```

That separation is the point of the layout: a commit in `my/hello/` goes to the `hello` repository, never to `my` and never to `mol`.

**5. Register it.** Add the `pack` line from step 3 to `my/my.meta.tree`, and a fresh checkout of your package fetches the project by name.

The [scaffolder](#!section=docs/page=tooling) writes a working module for you at any point after step 2:

```bash
npx create-view-tree-lsp my/hello
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

### One file every package needs

A package that gets deployed needs a `.gitattributes` with a single line:

```
* -text
```

That switches off git's end-of-line normalisation. It matters because deployment means
committing the build output to a branch, and that output is not only text: this site ships
57 binary files — the fonts it self-hosts and a preview image per page. Normalised on the
way in, they arrive at the reader as broken images and fonts, while the build itself stays
green. The MAM checkout has the same file at its root, with the font formats additionally
marked `binary`.

The scaffolder writes it for you; add it by hand in a repository you started yourself.

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
