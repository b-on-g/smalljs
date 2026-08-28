# Deployment

Eine gebaute $mol-App ist ein Ordner mit statischen Dateien. Kein Server, der laufen muss, kein Node-Prozess, den man am Leben hält, kein Adapter, den man auswählt: was einen Ordner hostet, hostet die App.

## Was Sie ausliefern

Der Build schreibt alles in den Ordner `-/` des Moduls:

```
my/hello/-/
├── index.html                 auf den Auslieferungspfad umgeschrieben
├── web.js                     die ganze App, eine Datei
├── web.css
├── web.locale=en.json         eine pro Sprache
├── manifest.json
└── …                          alles, was eine `deploy`-Direktive hineinkopiert hat
```

Dieser Ordner ist die Website. Von jedem statischen Host ausgeliefert, läuft die App.

Alles andere in `my/hello/` ist Quellcode, und `-/` ist generiert: die `.gitignore` des Workspace ignoriert `-*`, also landet das Build-Ergebnis nie in der Historie des Projekts selbst. Ins Netz kommt es über den Deploy-Branch.

## Die kurze Fassung

Den Workflow schreibt der Scaffolder, also veröffentlicht ein neues Projekt beim Push:

```bash
npx create-view-tree-lsp my/hello
git push
```

`.github/workflows/deploy.yml` baut das Modul und pusht `my/hello/-/` in den Branch `gh-pages`. GitHub liefert diesen Branch aus, sobald unter **Settings → Pages → Source** *Deploy from a branch* mit `gh-pages` steht — und genau das ist die Voreinstellung eines Repositorys, in dem ein solcher Branch existiert. Antwortet die URL mit 404, ist das die erste Einstellung, die man prüft.

Die Website liegt dann unter `https://<user>.github.io/<repo>/`.

## Was der Workflow tatsächlich tut

Zwei Actions tragen ihn, und beide nehmen ein paar Eingaben:

```yaml
- uses: hyoo-ru/mam_build@master2
  with:
      package: "my/hello"     # der zu bauende Ordner, relativ zum Workspace
      modules: "app"          # welche Module darin

- uses: hyoo-ru/gh-deploy@v4.4.1
  if: github.ref == 'refs/heads/main'
  with:
      folder: "my/hello/app/-"
```

`mam_build` baut den MAM-Workspace um Ihr Paket herum auf, löst die `$name`-Tokens aus Ihrem Code in die Repositorys auf, die sie enthalten, und baut. Es braucht keine Lockfile und keinen `npm install`-Schritt: die Abhängigkeitsliste ist die Registry in `.meta.tree`, wie [Projektstruktur](#!section=docs/page=structure) beschreibt.

`gh-deploy` committet den gebauten Ordner nach `gh-pages`. `target-folder` legt ihn statt ins Wurzelverzeichnis in einen Unterordner — so entsteht eine Branch-Vorschau:

```yaml
- name: Deploy feature branch
  if: startsWith(github.ref, 'refs/heads/feature/')
  uses: hyoo-ru/gh-deploy@v4.4.1
  with:
      folder: "my/hello/app/-"
      target-folder: ${{ github.ref_name }}
```

Jeder `feature/*`-Branch hat dann seine eigene URL auf derselben Pages-Site, und ein `delete`-Trigger entfernt den Ordner, wenn der Branch verschwindet.

## Eine Datei, die der Deploy braucht

Ein Paket, das ausgeliefert wird, braucht daneben eine `.gitattributes` mit einer einzigen Zeile:

```
* -text
```

Deployment heißt, das Build-Ergebnis in einen Branch zu committen, und dieses Ergebnis ist nicht nur Text. Schriften und Bilder, die auf dem Weg in diesen Commit normalisiert werden, kommen beim Leser kaputt an, während der Build selbst grün bleibt. Der Scaffolder schreibt die Datei; in einem selbst angelegten Repository fügen Sie sie von Hand hinzu.

## Dateien, die im Wurzelverzeichnis liegen müssen

`deploy \/path` in `meta.tree` kopiert eine Datei nach `-/` und **behält dabei ihren Workspace-Pfad**. Für Assets, auf die der Code verweist, ist das richtig, für Dateien, die ein Host im Wurzelverzeichnis sucht, falsch. Eine `CNAME`, eine `robots.txt`, eine Bestätigungsseite der Search Console: die kopiert man in einem Workflow-Schritt nach dem Build und vor dem Deploy-Schritt.

```yaml
- name: Copy root-level files
  run: cp my/hello/public/CNAME my/hello/app/-/CNAME
```

## Deep Links auf einem statischen Host

Eine App mit Pfad-Routing (`/section=docs/page=views` statt `#!section=docs`) verlangt vom Host eines: jeder unbekannte Pfad unterhalb des Mounts muss die `index.html` der App zurückgeben. Sonst ist der erste Aufruf eines Deep Links ein 404, und nur die Navigation von der Startseite funktioniert.

GitHub Pages hat keine Rewrite-Regeln, der Weg führt also über seine `404.html`: sie wird für jeden unbekannten Pfad ausgeliefert, und ein paar Zeilen darin geben die Adresse an `index.html` zurück, die der Router in die echte Route auflöst. Kopiert wird sie neben das Build-Ergebnis, genauso wie die Dateien oben.

Andere Hosts sagen es in einer Zeile — `try_files $uri /index.html` in nginx, `try_files {path} /index.html` in Caddy, eine Regel `/* /index.html 200` bei Netlify.

Eine App auf dem Hash-Router (die Voreinstellung) braucht nichts davon: alles nach `#` erreicht den Server nie.

## Vor dem Push prüfen

Der Build ist lokal derselbe wie in der CI, ein grünes Audit lokal heißt also ein grüner Deploy:

```bash
npx mam my/hello/app
cat my/hello/app/-/web.audit.js
```

`Audit passed` ist der ganze Bericht. Um das echte Ergebnis zu sehen, liefern Sie den Ordner mit einem beliebigen statischen Server aus:

```bash
npx serve my/hello/app/-
```

## Jenseits von GitHub Pages

Nichts davon ist GitHub-spezifisch. Das Ergebnis ist ein Ordner, das Deployment ein Kopiervorgang. Netlify, Cloudflare Pages, S3 hinter einem CDN, nginx auf einem VPS, ein Docker-Image mit dem Ordner darin — der Build-Schritt ist dasselbe `npx mam my/hello/app`, und hochgeladen wird `my/hello/app/-`.

Für eine offlinefähige Installation ergänzt [Offline](#!section=docs/page=offline) den Service Worker, der das Bundle cacht — und derselbe Ordner wird zur installierbaren App.
