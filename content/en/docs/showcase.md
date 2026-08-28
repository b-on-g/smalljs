# Showcase

Real things built with $mol — community apps, commercial products, and developer tools. Each one is a working app, not a demo.

## Apps

- **[Bog Music](https://b-on-g.github.io/music/)** — a music player that runs both as a Chrome extension and a web app, with background playback and offline caching. $mol drives the UI and the local-first state.
- **[Blitz Quiz](https://b-on-g.github.io/blitz/)** — a Kahoot-style live quiz built on $mol and Giper Baza. Rooms sync in real time through the CRDT layer, so there is no game server to run.
- **[VDO Rebalance](https://b-on-g.github.io/invest/)** — a local-first investing tool: drop in an `.xlsx` portfolio and get the trades that rebalance it. State lives in the browser over Giper Baza.
- **[RAGU](https://raguteam.github.io/web/#!screen=summary)** — a web interface for an open-source GraphRAG engine: browse document indexes, ask questions and get answers with sources, and explore the knowledge graph extracted from them. The force-directed graph is drawn with `$mol_svg_*` primitives, layout and pan/zoom included, with no graph library.
- **[$hyoo_budget](https://budget.hyoo.ru)** — a collaborative, local-first personal-budget app. It took first place at the Beautiful Code hackathon.
- **[$hyoo_talks](https://talks.hyoo.ru)** — an embeddable messenger. A prototype built for Sberbank took second place at Moscow City Hack.

## Design system & tools

- **[BuilderUI](https://b-on-g.github.io/builderui/)** — a shadcn-style design system for $mol: typed components (buttons, dialogs, selects, cards, charts, and more) plus a Studio for live theming (base color, accent, chart palette, radius, fonts, light/dark). This documentation site is built on it.
- **This site** — the documentation you are reading, including the [Playground](#!section=playground) and [course](#!section=course), is a $mol app. The search, live code editor, and in-browser TypeScript are all built with the framework they document.
- **MAM** — the build tool and module registry that every $mol app lives in, and itself a $mol project. It is developer tooling rather than a hosted app; the source is on GitHub.
- **view.tree LSP** — language tooling and an `npm create view-tree-lsp` scaffolder that starts new $mol apps. Editor tooling, so there is no running app to open.

## In production

Beyond open-source and hackathon projects, $mol ships in commercial systems that earn revenue. A few of them (some run under NDA, so no links or logos):

- **Drone-defense control** — the "Tamerlan" complex runs a $mol microservice on each device controller (radar, jammer, camera), joining them into a shared decentralized network. A web UI, local or centralized, shows the sky situation in real time: what is flying where, what is being jammed, where the cameras are pointed.
- **[Virtual avatar](https://avatar.ocas.ai)** — a 3D character you can talk to, play chess with, or ask to present slides. A commercial product with $mol driving the interface over third-party libraries.
- **Prompt-testing admin panel** — lets a company pick and test neural-network prompts for bulk processing of catalog rows: rewriting titles, descriptions, and SEO fields. It also cleans up text files for safe export into other CMSs.
- **Metering admin panel** — meters upload readings to FTP; operators create users, grant them view rights to specific meters, and run email campaigns, while ordinary consumers see only their objects and a read-only view page.
- **E-commerce back office** — product-catalog and order-list management for an online store.
- **Scientific-data widget** — visualizes microelements and their compounds. The graph rendering stays on D3; everything else was refactored from vanilla JS to $mol and packed into a Web Component.

## Hackathons

$mol has won repeatedly at hackathons: first place at Beautiful Code ([$hyoo_budget](https://budget.hyoo.ru)), first place at AC-VO-PPR-Hackathon (gesture-and-voice control of a street display), and prize-winning prototypes at More Tech, Moscow City Hack, and Dev Hack. The $mol [success-stories page](https://mol.hyoo.ru/#!section=docs/=xanlom_yimh6x) has more.

## More

The [$mol component catalog](https://mol.hyoo.ru/#!section=demos) has dozens of live components and demos you can open and inspect.

Building something with $mol? The best next step is the [Playground](#!section=playground) — try an idea in seconds, then share the URL.
