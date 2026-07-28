# Hors-ligne

Une application $mol peut continuer à fonctionner sans réseau — ouvrez-la une fois en ligne, et elle reste utilisable une fois hors-ligne, jusqu'à l'installation en tant que PWA. Cela vient d'un seul module intégré, `mol/offline/install`, et ne dépend d'aucune couche de données.

## Ce qu'il fait

`mol/offline/install` exécute `$mol_offline`, qui enregistre un **service worker** (`web.js`) comme proxy de cache. Chaque `GET` réussi d'une ressource statique — le bundle de l'application, les styles, les images — est stocké dans un cache nommé `$mol_offline`. À un chargement ultérieur, le worker sert ces réponses directement depuis le cache, si bien que l'application s'ouvre instantanément et survit à une erreur HTTP ou une connexion perdue en se rabattant sur la copie en cache. Comme toute l'application est cachable et servie ainsi, le navigateur peut proposer de **l'installer en tant que PWA**.

## Comment l'activer

Ajoutez une ligne au `*.meta.tree` de votre application :

```tree
include \/mol/offline/install
```

Cet include forcé tire le module dans le bundle pour que son service worker s'enregistre comme effet de bord — aucun autre code n'a besoin de le référencer. Pour le fonctionnement de `include`, voir [Métadonnées de module](#!section=docs/page=meta).

Deux exigences du navigateur à l'exécution :

- Servir en **HTTPS** (ou `localhost` en développement) — sinon les service workers refusent de s'exécuter.
- Fournir un manifeste d'application web pour que l'application soit installable.

## Ce que ce n'est *pas*

Le cache hors-ligne garde *un* client fonctionnel sans réseau. Il ne synchronise **pas** les données entre clients : les requêtes avec une chaîne de requête passent sans traitement, et les requêtes non-`GET` ne sont jamais mises en cache. Lorsque plusieurs clients ou appareils doivent partager les mêmes données en direct et modifiables — avec des fusions sans conflit — c'est une autre affaire, gérée par le projet distinct [Giper Baza](#!section=docs/page=giper-baza).
