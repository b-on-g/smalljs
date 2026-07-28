# Vitrine

Des choses réelles construites avec $mol — applications communautaires, produits commerciaux et outils pour développeurs. Chacune est une application qui fonctionne, pas une démo.

## Applications

- **[Bog Music](https://b-on-g.github.io/music/)** — un lecteur de musique qui fonctionne à la fois comme extension Chrome et application web, avec lecture en arrière-plan et mise en cache hors ligne. $mol pilote l'interface et l'état local-first.
- **[Blitz Quiz](https://b-on-g.github.io/blitz/)** — un quiz en direct façon Kahoot construit sur $mol et Giper Baza. Les salles se synchronisent en temps réel via la couche CRDT, donc il n'y a aucun serveur de jeu à faire tourner.
- **[VDO Rebalance](https://b-on-g.github.io/invest/)** — un outil d'investissement local-first : déposez un portefeuille `.xlsx` et obtenez les opérations qui le rééquilibrent. L'état vit dans le navigateur via Giper Baza.
- **[$hyoo_budget](https://budget.hyoo.ru)** — une application de budget personnel collaborative et local-first. Elle a remporté la première place au hackathon Beautiful Code.
- **[$hyoo_talks](https://talks.hyoo.ru)** — une messagerie intégrable. Un prototype construit pour Sberbank a pris la deuxième place au Moscow City Hack.

## Système de design et outils

- **[BuilderUI](https://b-on-g.github.io/builderui/)** — un système de design façon shadcn pour $mol : des composants typés — boutons, dialogues, sélecteurs, cartes, graphiques et plus — plus un Studio pour la thématisation en direct (couleur de base, accent, palette de graphique, rayon, polices, clair/sombre). Ce site de documentation est construit dessus.
- **Ce site** — la documentation que vous lisez, y compris le [Playground](#!section=playground) et le [cours](#!section=course), est une application $mol. La recherche, l'éditeur de code en direct et le TypeScript dans le navigateur sont tous construits avec le framework qu'ils documentent.
- **MAM** — l'outil de build et le registre de modules dans lequel vit chaque application $mol, et lui-même un projet $mol. C'est de l'outillage pour développeurs plutôt qu'une application hébergée ; le code source est sur GitHub.
- **view.tree LSP** — de l'outillage de langage et un générateur `npm create view-tree-lsp` qui démarre de nouvelles applications $mol. C'est de l'outillage d'éditeur, il n'y a donc pas d'application à ouvrir.

## En production

Au-delà des projets open source et de hackathon, $mol tourne dans des systèmes commerciaux qui génèrent des revenus. Quelques-uns d'entre eux (certains sous NDA, donc sans liens ni logos) :

- **Contrôle de défense anti-drones** — le complexe « Tamerlan » fait tourner un microservice $mol sur chaque contrôleur d'appareil (radar, brouilleur, caméra), les reliant en un réseau décentralisé partagé. Une interface web, locale ou centralisée, montre la situation aérienne en temps réel : ce qui vole où, ce qui est brouillé, où pointent les caméras.
- **[Avatar virtuel](https://avatar.ocas.ai)** — un personnage 3D à qui vous pouvez parler, jouer aux échecs ou demander de présenter des diapositives. Un produit commercial où $mol pilote l'interface au-dessus de bibliothèques tierces.
- **Panneau d'administration de test de prompts** — permet à une entreprise de choisir et tester des prompts de réseaux de neurones pour le traitement en masse de lignes de catalogue : réécriture des titres, descriptions et champs SEO. Il nettoie aussi des fichiers texte pour un export sûr vers d'autres CMS.
- **Panneau d'administration de relevés** — les compteurs envoient leurs relevés par FTP ; les opérateurs créent des utilisateurs, leur accordent des droits de lecture sur des compteurs précis et lancent des campagnes e-mail, tandis que les consommateurs ordinaires ne voient que leurs objets et une page de consultation en lecture seule.
- **Back-office e-commerce** — gestion du catalogue de produits et de la liste des commandes pour une boutique en ligne.
- **Widget de données scientifiques** — visualise des micro-éléments et leurs composés. Le rendu des graphes reste sur D3 ; tout le reste a été refactorisé du JS pur vers $mol et empaqueté dans un Web Component.

## Hackathons

$mol a gagné à plusieurs reprises lors de hackathons : première place à Beautiful Code ([$hyoo_budget](https://budget.hyoo.ru)), première place à l'AC-VO-PPR-Hackathon (contrôle par gestes et voix d'un affichage urbain), et des prototypes primés à More Tech, Moscow City Hack et Dev Hack. La [page des histoires de réussite](https://mol.hyoo.ru/#!section=docs/=xanlom_yimh6x) de $mol en donne les détails.

## Plus

Le [catalogue de composants $mol](https://mol.hyoo.ru/#!section=demos) contient des dizaines de composants et démos en direct que vous pouvez ouvrir et inspecter.

Vous construisez quelque chose avec $mol ? La meilleure prochaine étape est le [Playground](#!section=playground) — essayez une idée en quelques secondes, puis partagez l'URL.
