# Vitrine

Coisas reais construídas com $mol — apps da comunidade, produtos comerciais e ferramentas para desenvolvedores. Cada uma é um app que funciona, não uma demo.

## Apps

- **[Bog Music](https://b-on-g.github.io/music/)** — um reprodutor de música que roda tanto como extensão do Chrome quanto como app web, com reprodução em segundo plano e cache offline. O $mol conduz a interface e o estado local-first.
- **[Blitz Quiz](https://b-on-g.github.io/blitz/)** — um quiz ao vivo no estilo Kahoot construído sobre $mol e Giper Baza. As salas sincronizam em tempo real pela camada CRDT, então não há servidor de jogo para executar.
- **[VDO Rebalance](https://b-on-g.github.io/invest/)** — uma ferramenta de investimento local-first: solte uma carteira `.xlsx` e obtenha as operações que a reequilibram. O estado vive no navegador via Giper Baza.
- **[$hyoo_budget](https://budget.hyoo.ru)** — um app de orçamento pessoal colaborativo e local-first. Conquistou o primeiro lugar no hackathon Beautiful Code.
- **[$hyoo_talks](https://talks.hyoo.ru)** — um mensageiro incorporável. Um protótipo construído para o Sberbank ficou em segundo lugar no Moscow City Hack.
- **[Avatar virtual](https://avatar.ocas.ai)** — um personagem 3D com quem você pode conversar, jogar xadrez ou pedir para apresentar slides. Um produto comercial em que o $mol conduz a interface sobre bibliotecas de terceiros.

## Sistema de design e ferramentas

- **[BuilderUI](https://b-on-g.github.io/builderui/)** — um sistema de design no estilo shadcn para $mol: componentes tipados — botões, diálogos, selects, cards, gráficos e mais — além de um Studio para temização ao vivo (cor base, destaque, paleta de gráficos, raio, fontes, claro/escuro). Este site de documentação é construído sobre ele.
- **Este site** — a documentação que você está lendo, incluindo o [Playground](#!section=playground) e o [curso](#!section=course), é um app $mol. A busca, o editor de código ao vivo e o TypeScript no navegador são todos construídos com o framework que documentam.
- **MAM** — a ferramenta de build e o registro de módulos em que vive cada app $mol, e ele mesmo um projeto $mol. É ferramenta para desenvolvedores, não um app hospedado; o código-fonte está no GitHub.
- **view.tree LSP** — ferramenta de linguagem e um gerador `npm create view-tree-lsp` que inicia novos apps $mol. Ferramenta de editor, então não há app em execução para abrir.

## Hackathons e uso comercial

O $mol venceu repetidamente em hackathons: primeiro lugar no Beautiful Code ([$hyoo_budget](https://budget.hyoo.ru)), primeiro lugar no AC-VO-PPR-Hackathon (controle por gestos e voz de um painel urbano) e protótipos premiados no More Tech, Moscow City Hack e Dev Hack. Ele também está presente em sistemas comerciais e industriais — de um back office de loja online a painéis de controle de defesa antidrone. A [página de histórias de sucesso](https://mol.hyoo.ru/#!section=docs/=xanlom_yimh6x) do $mol tem os detalhes.

## Mais

O [catálogo de componentes $mol](https://mol.hyoo.ru/#!section=demos) tem dezenas de componentes e demos ao vivo que você pode abrir e inspecionar.

Construindo algo com $mol? O melhor próximo passo é o [Playground](#!section=playground) — experimente uma ideia em segundos, depois compartilhe a URL.
