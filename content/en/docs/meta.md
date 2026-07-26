# Module metadata

Alongside a module's components, a `name.meta.tree` file declares **build and deploy metadata** — things that are about the module as a whole rather than any single view. The app module is the usual place for it.

Here is this site's `app.meta.tree`:

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

## Directives

- **`deploy \/path`** — copy the named file or folder into the production build output. Use it for static assets that the deploy should carry but that no code imports — images, fonts, icons. Here `\/bog/smalljs/assets` ships the logo and other files under `assets/`.
- **`require \/path`** — force a module into the bundle even when no code references it, for the case where that module's code must run **before** the code of the module holding this `meta.tree`. It is pulled in as a normal, high-priority dependency. A module path (`\/mol/wire/patch`) or a single file both work.
- **`include \/path`** — the same forced include, but for when load order does not matter. The module is pulled in but deprioritized, so it loads after the code that depends on it. Examples: `include \/mol/offline/install` (registers a service worker as a side effect) and `include \/bog/builderui/theme.css` (a raw stylesheet).
- **`pack <name> git \<url>`** — maps a namespace to the git repository MAM fetches it from, e.g. `pack mol git \https://github.com/hyoo-ru/mam_mol.git`. This is how `$mol_*`, `$hyoo_*`, and your own packages resolve to real code.

Why force an include at all? The builder works out dependencies automatically and bundles only what your code actually uses. Occasionally you need a module your code does *not* reference — for example an app that bundles a whole catalog of components so they exist at runtime. `require` and `include` cover exactly that case; they differ only in load order.

## Where it lives

`pack` declarations belong in the **workspace-root** `.meta.tree` — that is the registry of every package the workspace can pull. Keep them there, not in submodules; a submodule's own `meta.tree` should only carry the `require`/`include`/`deploy` that are specific to it.
