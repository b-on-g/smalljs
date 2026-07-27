# Showcase

Real things built with $mol — community apps, commercial products, and developer tools. Each one is a working app, not a demo.

## Apps

- **[Bog Music](https://b-on-g.github.io/music/)** — a music player that runs both as a Chrome extension and a web app, with background playback and offline caching. $mol drives the UI and the local-first state.
- **[Blitz Quiz](https://b-on-g.github.io/blitz/)** — a Kahoot-style live quiz built on $mol and Giper Baza. Rooms sync in real time through the CRDT layer, so there is no game server to run.
- **[VDO Rebalance](https://b-on-g.github.io/invest/)** — a local-first investing tool: drop in an `.xlsx` portfolio and get the trades that rebalance it. State lives in the browser over Giper Baza.
- **[$hyoo_budget](https://budget.hyoo.ru)** — a collaborative, local-first personal-budget app. It took first place at the Beautiful Code hackathon.
- **[$hyoo_talks](https://talks.hyoo.ru)** — an embeddable messenger. A prototype built for Sberbank took second place at Moscow City Hack.
- **[Virtual avatar](https://avatar.ocas.ai)** — a 3D character you can talk to, play chess with, or ask to present slides. A commercial product with $mol driving the interface over third-party libraries.

## Design system & tools

- **[BuilderUI](https://b-on-g.github.io/builderui/)** — a shadcn-style design system for $mol: typed components (buttons, dialogs, selects, cards, charts, and more) plus a Studio for live theming (base color, accent, chart palette, radius, fonts, light/dark). This documentation site is built on it.
- **This site** — the documentation you are reading, including the [Playground](#!section=playground) and [course](#!section=course), is a $mol app. The search, live code editor, and in-browser TypeScript are all built with the framework they document.
- **MAM** — the build tool and module registry that every $mol app lives in, and itself a $mol project. It is developer tooling rather than a hosted app; the source is on GitHub.
- **view.tree LSP** — language tooling and an `npm create view-tree-lsp` scaffolder that starts new $mol apps. Editor tooling, so there is no running app to open.

## Hackathons and commercial use

$mol has won repeatedly at hackathons: first place at Beautiful Code ([$hyoo_budget](https://budget.hyoo.ru)), first place at AC-VO-PPR-Hackathon (gesture-and-voice control of a street display), and prize-winning prototypes at More Tech, Moscow City Hack, and Dev Hack. It also ships in commercial and industrial systems — from an online-store back office to drone-defense control panels. The $mol [success-stories page](https://mol.hyoo.ru/#!section=docs/=xanlom_yimh6x) has the details.

## More

The [$mol component catalog](https://mol.hyoo.ru/#!section=demos) has dozens of live components and demos you can open and inspect.

Building something with $mol? The best next step is the [Playground](#!section=playground) — try an idea in seconds, then share the URL.
