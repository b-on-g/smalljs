# Nasazení

Sestavená $mol aplikace je složka statických souborů. Není co spouštět na serveru, není co držet naživu v Node, není z čeho vybírat adaptér: co hostuje složku, to hostuje aplikaci.

## Co vlastně nasazujete

Build zapíše všechno do složky `-/` uvnitř modulu:

```
my/hello/-/
├── index.html                 přepsaný pro cestu, kde web leží
├── web.js                     celá aplikace, jeden soubor
├── web.css
├── web.locale=en.json         jeden na jazyk
├── manifest.json
└── …                          cokoli, co sem zkopírovala direktiva `deploy`
```

Ta složka je web. Servírujte ji libovolným statickým hostingem a aplikace běží.

Všechno ostatní v `my/hello/` je zdroj a `-/` je generovaná: `.gitignore` workspace ignoruje `-*`, takže výsledek buildu se do historie samotného projektu nikdy nedostane. Na web jede z nasazovací větve.

## Stručně

Workflow píše scaffolder, takže nový projekt se publikuje pushem:

```bash
npx create-view-tree-lsp my/hello
git push
```

`.github/workflows/deploy.yml` sestaví modul a pushne `my/hello/-/` do větve `gh-pages`. GitHub ji servíruje, jakmile je v **Settings → Pages → Source** *Deploy from a branch* s `gh-pages` — a to je právě výchozí volba repozitáře, v němž taková větev vznikla. Když adresa vrací 404, tohle nastavení je první na řadě.

Web pak žije na `https://<user>.github.io/<repo>/`.

## Co workflow doopravdy dělá

Nesou ho dvě akce a každá bere pár vstupů:

```yaml
- uses: hyoo-ru/mam_build@master2
  with:
      package: "my/hello"     # složka k sestavení, relativně k workspace
      modules: "app"          # které moduly uvnitř

- uses: hyoo-ru/gh-deploy@v4.4.1
  if: github.ref == 'refs/heads/main'
  with:
      folder: "my/hello/app/-"
```

`mam_build` rozvine kolem vašeho balíku workspace MAM, přeloží tokeny `$name` z kódu na repozitáře, kde ta jména bydlí, a sestaví. Nepotřebuje lockfile ani krok `npm install`: seznamem závislostí je rejstřík v `.meta.tree`, jak popisuje [Struktura projektu](#!section=docs/page=structure).

`gh-deploy` commitne sestavenou složku do `gh-pages`. `target-folder` ji položí do podsložky místo do kořene — tak vzniká náhled větve:

```yaml
- name: Deploy feature branch
  if: startsWith(github.ref, 'refs/heads/feature/')
  uses: hyoo-ru/gh-deploy@v4.4.1
  with:
      folder: "my/hello/app/-"
      target-folder: ${{ github.ref_name }}
```

Každá větev `feature/*` pak má vlastní adresu na tomtéž Pages webu a trigger `delete` složku odstraní, jakmile větev zmizí.

## Jeden soubor, který nasazení potřebuje

Balík, který se nasazuje, potřebuje vedle sebe `.gitattributes` s jediným řádkem:

```
* -text
```

Nasazení znamená commitnout výsledek buildu do větve, a ten výsledek není jen text. Fonty a obrázky normalizované cestou do toho commitu dorazí ke čtenáři rozbité, zatímco build sám zůstane zelený. Scaffolder soubor napíše; v repozitáři, který jste založili sami, ho přidejte ručně.

## Soubory, které patří do kořene webu

`deploy \/path` v `meta.tree` kopíruje soubor do `-/` a **zachovává jeho cestu vůči workspace**. Pro assety, na které kód odkazuje, je to správně; pro soubory, které hosting hledá v kořeni, ne. `CNAME`, `robots.txt`, ověřovací stránka vyhledávače: ty se kopírují krokem workflow po buildu a před krokem nasazení.

```yaml
- name: Copy root-level files
  run: cp my/hello/public/CNAME my/hello/app/-/CNAME
```

## Hluboké odkazy na statickém hostingu

Aplikace s cestovým routingem (`/section=docs/page=views` místo `#!section=docs`) chce po hostingu jedno: každá neznámá cesta pod mountem musí vrátit `index.html` aplikace. Jinak je první zásah hlubokého odkazu 404 a funguje jen navigace z domovské stránky.

GitHub Pages nemá pravidla přepisu, takže cesta vede přes jeho `404.html`: servíruje se na každou neznámou cestu a pár řádků uvnitř vrátí adresu do `index.html`, který router rozvine na skutečnou routu. Kopíruje se vedle výsledku buildu, stejně jako soubory výše.

Ostatní hostingy to řeknou jedním řádkem: `try_files $uri /index.html` v nginxu, `try_files {path} /index.html` v Caddy, pravidlo `/* /index.html 200` na Netlify.

Aplikace na hash routeru (výchozím) nic z toho nepotřebuje: co je za `#`, na server nedojede.

## Zkontrolovat před pushem

Build je stejný lokálně i v CI, takže zelený audit na počítači znamená zelené nasazení:

```bash
npx mam my/hello/app
cat my/hello/app/-/web.audit.js
```

`Audit passed` je celá zpráva. Abyste viděli skutečnou věc, naservírujte složku libovolným statickým serverem:

```bash
npx serve my/hello/app/-
```

## Nejen GitHub Pages

Nic z výše uvedeného není vázané na GitHub. Výstupem je složka, nasazení je kopírování. Netlify, Cloudflare Pages, S3 za CDN, nginx na VPS, docker image s touto složkou uvnitř — krok buildu je pořád `npx mam my/hello/app` a nahráváte `my/hello/app/-`.

Pro instalaci fungující offline přidá [Offline](#!section=docs/page=offline) service worker, který nacachuje bundle, a tatáž složka se stane instalovatelnou aplikací.
