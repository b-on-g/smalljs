# Releases

$mol is delivered **continuously**. Instead of cutting numbered versions, the framework ships straight from the [mam_mol](https://github.com/hyoo-ru/mam_mol) monorepo — every merged change is immediately available to anyone building against it. The MAM build tool always pulls the current sources, so there is no upgrade step and no version matrix to reconcile.

## Following changes

- **Commit history** — the [mam_mol commits](https://github.com/hyoo-ru/mam_mol/commits/master) are the canonical changelog.
- **Per-module history** — each component folder on GitHub carries its own commit log, so you can watch just the parts you use.
- **DEV community** — notable additions and write-ups are shared under the [#mol tag](https://dev.to/t/mol).

## What this means in practice

Because there are no breaking release boundaries, the framework favours backward-compatible evolution: components gain features without renaming, and the typed `view.tree` interfaces make incompatibilities surface at compile time rather than at runtime. If a build stops compiling after an update, the TypeScript errors point you straight at what changed.
