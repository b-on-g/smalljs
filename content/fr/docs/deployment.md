# Déploiement

Une application $mol compilée est un dossier de fichiers statiques. Aucun serveur à faire tourner, aucun processus Node à maintenir en vie, aucun adaptateur à choisir : ce qui héberge un dossier héberge l'application.

## Ce que vous déployez

La compilation écrit tout dans le dossier `-/` du module :

```
my/hello/-/
├── index.html                 réécrit pour le chemin de déploiement
├── web.js                     toute l'application, un seul fichier
├── web.css
├── web.locale=en.json         un par langue
├── manifest.json
└── …                          tout ce qu'une directive `deploy` a copié
```

Ce dossier est le site. Servez-le depuis n'importe quel hébergement statique et l'application tourne.

Tout le reste dans `my/hello/` est du source, et `-/` est généré : le `.gitignore` de l'espace de travail ignore `-*`, donc le résultat de la compilation n'entre jamais dans l'historique du projet. Il arrive sur le web par la branche de déploiement.

## La version courte

Le générateur écrit le workflow, donc un nouveau projet se publie au push :

```bash
npx create-view-tree-lsp my/hello
git push
```

`.github/workflows/deploy.yml` compile le module et pousse `my/hello/-/` sur la branche `gh-pages`. GitHub la sert dès que **Settings → Pages → Source** est sur *Deploy from a branch* avec `gh-pages` — ce qui est la valeur par défaut d'un dépôt où cette branche existe. Si l'URL renvoie un 404, c'est le premier réglage à vérifier.

Le site vit alors à l'adresse `https://<user>.github.io/<repo>/`.

## Ce que fait le workflow

Deux actions le portent, et chacune prend deux entrées :

```yaml
- uses: hyoo-ru/mam_build@master2
  with:
      package: "my/hello"     # le dossier à compiler, relatif à l'espace de travail
      modules: "app"          # quels modules à l'intérieur

- uses: hyoo-ru/gh-deploy@v4.4.1
  if: github.ref == 'refs/heads/main'
  with:
      folder: "my/hello/app/-"
```

`mam_build` déploie l'espace de travail MAM autour de votre paquet, résout les jetons `$name` de votre code en dépôts qui les contiennent, et compile. Il n'a besoin ni de fichier de verrouillage ni d'étape `npm install` : la liste des dépendances, c'est le registre dans `.meta.tree`, comme le décrit [Structure du projet](#!section=docs/page=structure).

`gh-deploy` commite le dossier compilé sur `gh-pages`. `target-folder` le place dans un sous-dossier plutôt qu'à la racine : c'est ainsi qu'on obtient un aperçu de branche :

```yaml
- name: Deploy feature branch
  if: startsWith(github.ref, 'refs/heads/feature/')
  uses: hyoo-ru/gh-deploy@v4.4.1
  with:
      folder: "my/hello/app/-"
      target-folder: ${{ github.ref_name }}
```

Chaque branche `feature/*` a alors sa propre URL sur le même site Pages, et un déclencheur `delete` retire le dossier quand la branche disparaît.

## Un fichier dont le déploiement a besoin

Un paquet qui se déploie a besoin, à côté de lui, d'un `.gitattributes` d'une seule ligne :

```
* -text
```

Déployer, c'est commiter le résultat de la compilation sur une branche, et ce résultat n'est pas que du texte. Polices et images normalisées en chemin vers ce commit arrivent cassées chez le lecteur, tandis que la compilation, elle, reste verte. Le générateur écrit ce fichier ; dans un dépôt que vous avez créé vous-même, ajoutez-le à la main.

## Les fichiers qui doivent être à la racine

`deploy \/path` dans `meta.tree` copie un fichier dans `-/` **en conservant son chemin relatif à l'espace de travail**. C'est ce qu'il faut pour les ressources auxquelles le code fait référence, et pas du tout pour les fichiers qu'un hébergeur cherche à la racine. Un `CNAME`, un `robots.txt`, une page de vérification de propriété : copiez-les dans une étape du workflow après la compilation et avant l'étape de déploiement.

```yaml
- name: Copy root-level files
  run: cp my/hello/public/CNAME my/hello/app/-/CNAME
```

## Liens profonds sur un hébergement statique

Une application avec routage par chemin (`/section=docs/page=views` plutôt que `#!section=docs`) demande une seule chose à l'hébergeur : tout chemin inconnu sous le point de montage doit renvoyer l'`index.html` de l'application. Sinon le premier accès à un lien profond est un 404, et seule la navigation depuis l'accueil fonctionne.

GitHub Pages n'a pas de règles de réécriture ; le passage se fait donc par son `404.html` : il est servi pour tout chemin inconnu, et quelques lignes à l'intérieur rendent l'adresse à `index.html`, que le routeur développe en route réelle. On le copie à côté du résultat de compilation, comme les fichiers ci-dessus.

Les autres hébergeurs le disent en une ligne : `try_files $uri /index.html` dans nginx, `try_files {path} /index.html` dans Caddy, une règle `/* /index.html 200` chez Netlify.

Une application sur le routeur à hash (celui par défaut) n'a besoin de rien de tout cela : ce qui suit `#` n'atteint jamais le serveur.

## Vérifier avant de pousser

La compilation est la même en local et en CI, donc un audit vert en local veut dire un déploiement vert :

```bash
npx mam my/hello/app
cat my/hello/app/-/web.audit.js
```

`Audit passed` est tout le rapport. Pour voir le vrai résultat, servez le dossier avec n'importe quel serveur statique :

```bash
npx serve my/hello/app/-
```

## Au-delà de GitHub Pages

Rien de ce qui précède n'est propre à GitHub. La sortie est un dossier, le déploiement une copie. Netlify, Cloudflare Pages, S3 derrière un CDN, nginx sur un VPS, une image Docker contenant le dossier — l'étape de compilation reste `npx mam my/hello/app`, et ce que vous envoyez est `my/hello/app/-`.

Pour une installation utilisable hors ligne, [Hors ligne](#!section=docs/page=offline) ajoute le service worker qui met le bundle en cache, et le même dossier devient une application installable.
