# Deployment

A built $mol app is a folder of static files. There is no server to run, no Node process to keep alive, and no adapter to pick: whatever hosts a folder can host the app.

## What you deploy

The build writes everything into the module's `-/` folder:

```
my/hello/-/
├── index.html                 rewritten for the deployed path
├── web.js                     the whole app, one file
├── web.css
├── web.locale=en.json         one per language
├── manifest.json
└── …                          anything a `deploy` directive copied in
```

That folder is the site. Serve it from any static host and the app runs.

Everything else in `my/hello/` is source, and `-/` is generated: the workspace `.gitignore` ignores `-*`, so the build output never lands in the project's own history. It reaches the web from the deploy branch instead.

## The short version

The scaffolder writes the workflow, so a new project publishes on push:

```bash
npx create-view-tree-lsp my/hello
git push
```

`.github/workflows/deploy.yml` builds the module and pushes `my/hello/-/` to the `gh-pages` branch. GitHub serves that branch once **Settings → Pages → Source** is *Deploy from a branch* with `gh-pages` selected, which is what a repository with a `gh-pages` branch defaults to. If the URL 404s, that setting is the first thing to check.

The site then lives at `https://<user>.github.io/<repo>/`.

## What the workflow actually does

Two actions carry it, and both take a couple of inputs:

```yaml
- uses: hyoo-ru/mam_build@master2
  with:
      package: "my/hello"     # the folder to build, workspace-relative
      modules: "app"          # which modules inside it to build

- uses: hyoo-ru/gh-deploy@v4.4.1
  if: github.ref == 'refs/heads/main'
  with:
      folder: "my/hello/app/-"
```

`mam_build` clones the MAM workspace around your package, resolves the `$name` tokens in your code into the repositories that hold them, and builds. It needs no lockfile and no `npm install` step: the registry in `.meta.tree` is the dependency list, as [Project structure](#!section=docs/page=structure) describes.

`gh-deploy` commits the built folder to `gh-pages`. `target-folder` puts it in a subfolder instead of the root, which is how a branch preview works:

```yaml
- name: Deploy feature branch
  if: startsWith(github.ref, 'refs/heads/feature/')
  uses: hyoo-ru/gh-deploy@v4.4.1
  with:
      folder: "my/hello/app/-"
      target-folder: ${{ github.ref_name }}
```

Every `feature/*` branch then has its own URL under the same Pages site, and a `delete` trigger removes the folder when the branch goes.

## One file the deploy needs

A package that gets deployed needs a `.gitattributes` next to it with a single line:

```
* -text
```

Deployment means committing the build output to a branch, and that output is not only text. Fonts and images normalised on the way into that commit arrive at the reader broken, while the build itself stays green. The scaffolder writes the file; add it by hand in a repository you started yourself.

## Files that have to sit at the site root

`deploy \/path` in `meta.tree` copies a file into `-/` **keeping its workspace-relative path**, which is right for assets the code refers to and wrong for files a host looks for at the root. A `CNAME`, a `robots.txt`, a search-console verification page: copy those in a workflow step after the build, before the deploy step.

```yaml
- name: Copy root-level files
  run: cp my/hello/public/CNAME my/hello/app/-/CNAME
```

## Deep links on a static host

An app with path routing (`/section=docs/page=views` rather than `#!section=docs`) asks one thing of the host: any unknown path under the mount must return the app's `index.html`. Otherwise the first hit on a deep link is a 404, and only navigation from the home page works.

GitHub Pages has no rewrite rules, so the way through is its `404.html`: it is served for every unknown path, and a few lines in it hand the address back to `index.html`, which the router expands into the real route. Copy it next to the build output the same way as the root-level files above.

Other hosts say it in one line — `try_files $uri /index.html` in nginx, `try_files {path} /index.html` in Caddy, a `/* /index.html 200` rule on Netlify.

An app on the hash router (the default) needs none of this: everything after `#` never reaches the server.

## Check before you push

The build is the same locally and in CI, so a green audit locally means a green deploy:

```bash
npx mam my/hello/app
cat my/hello/app/-/web.audit.js
```

`Audit passed` is the whole report. Serve the folder with any static server to see the real thing:

```bash
npx serve my/hello/app/-
```

## Beyond GitHub Pages

Nothing above is specific to GitHub. The output is a folder; the deploy is a copy. Netlify, Cloudflare Pages, S3 with a CDN, nginx on a VPS, a Docker image with the folder inside — the build step is the same `npx mam my/hello/app`, and what you upload is `my/hello/app/-`.

For an offline-capable install, [Offline](#!section=docs/page=offline) adds the service worker that caches the bundle, which turns the same folder into an installable app.
