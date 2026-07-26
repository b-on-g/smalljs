# Module metadata

Alongside a module's components, a `name.meta.tree` file declares **build and deploy metadata** — things that are about the module as a whole rather than any single view. The app module is the usual place for it.

Here is this site's `app.meta.tree`:

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

## Directives

- **`include \/path`** — pull another module's files into this bundle. `\/mol/offline/install` adds PWA offline support; `\/bog/builderui/theme.css` pulls a raw CSS file into the build. Use it to bring in assets or side-effect modules that no class references directly.
- **`deploy \/path`** — extra paths to ship with the production deploy (images, fonts, and other static assets).
- **`pack <name> git \<url>`** — maps a namespace to the git repository MAM fetches it from, e.g. `pack mol git \https://github.com/hyoo-ru/mam_mol.git`. This is how `$mol_*`, `$hyoo_*`, and your own packages resolve to real code.

## Where it lives

`pack` declarations belong in the **workspace-root** `.meta.tree` — that is the registry of every package the workspace can pull. Keep them there, not in submodules; a submodule's own `meta.tree` should only carry `include`/`deploy` that are specific to it.
