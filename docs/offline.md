# Offline

A $mol app can keep working with no network — open it once online, and it stays usable after you go offline, right down to installing as a PWA. This comes from one built-in module, `mol/offline/install`, and is independent of any data layer.

## What it does

`mol/offline/install` runs `$mol_offline`, which registers a **service worker** (`web.js`) as a caching proxy. Every successful `GET` for a static asset — the app bundle, styles, images — is stored in a cache named `$mol_offline`. On a later load the worker serves those responses straight from cache, so the app opens instantly and survives an HTTP error or a dropped connection by falling back to the cached copy. Because the whole app is cacheable and served this way, the browser can offer to **install it as a PWA**.

## How to enable it

Add one line to your app's `*.meta.tree`:

```tree
include \/mol/offline/install
```

That forced include pulls the module into the bundle so its service worker registers as a side effect — no other code has to reference it. See [Module metadata](#!section=docs/page=meta) for how `include` works.

Two runtime requirements from the browser:

- Serve over **HTTPS** (or `localhost` in development) — service workers refuse to run otherwise.
- Provide a web app **manifest** so the app is installable.

## What it is *not*

Offline caching keeps *one* client working without a network. It does **not** synchronize data between clients: requests with a query string are passed through, and non-`GET` requests are never cached. When you need several clients or devices to share the same live, editable data — with conflict-free merges — that is a different concern, handled by the separate [Giper Baza](#!section=docs/page=giper-baza) project.
