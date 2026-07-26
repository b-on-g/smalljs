# FAQ

## What is smalljs?

smalljs is the documentation site for **$mol** — a reactive UI framework with typed views, automatic reactivity, and no virtual DOM. The framework itself is developed in the open by the hyoo-ru community; this site gathers a guide, an interactive course, a live playground, and an API reference in one place.

## Is $mol production-ready?

Yes. $mol powers real apps and internal tools — see the [Showcase](#!section=docs/page=showcase). It ships from a single monorepo (MAM) and is used daily by its authors and community.

## How big is the runtime?

Small. A typical $mol app ships around 100 KB of framework code, and rendering is virtualized by default — components outside the viewport are never created. See [Rendering](#!section=docs/page=rendering) for the details and benchmarks.

## Do I have to learn a new template language?

You learn `view.tree`, a compact tree syntax for declaring component layout. It is intentionally small — the [Views](#!section=docs/page=views) chapter covers everything you need in one sitting. Logic stays in plain TypeScript, and styles are typed too.

## How is it different from React, Vue or Svelte?

Reactivity is automatic — there is no `useState`, `useEffect`, or manual subscription. You describe *what* the UI is; $mol decides *how* and *when* to update it. The [concept translation table](#!section=docs/page=rosetta) maps ideas from other frameworks onto $mol.

## Where do I get help?

- Ask in the [DEV community](https://dev.to/t/mol)
- Browse the [$mol source and issues on GitHub](https://github.com/hyoo-ru/mam_mol)
- Read the reference docs at [mol.hyoo.ru](https://mol.hyoo.ru/)

## What license is it under?

MIT. You can use $mol in commercial and open-source projects freely.
