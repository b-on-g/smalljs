# FAQ

## O que é smalljs?

smalljs é o site de documentação do **$mol** — um framework de UI reativo com vistas tipadas, reatividade automática e sem DOM virtual. O framework em si é desenvolvido abertamente pela comunidade hyoo-ru; este site reúne um guia, um curso interativo, um playground ao vivo e uma referência de API em um só lugar.

## O $mol está pronto para produção?

Sim. O $mol alimenta apps reais e ferramentas internas — veja a [Vitrine](#!section=docs/page=showcase). Ele é distribuído a partir de um único monorepo (MAM) e é usado diariamente por seus autores e pela comunidade.

## Qual é o tamanho do runtime?

Pequeno. Um app mínimo tem cerca de 123 KB de JavaScript sem compressão, ou aproximadamente 20 KB pela rede depois de comprimido. A renderização é virtualizada por padrão (componentes fora da área visível nunca são criados), e o build inclui apenas os módulos que você realmente usa, então o bundle cresce com o seu app e não com o framework. Veja [Renderização](#!section=docs/page=rendering) para os detalhes e benchmarks reproduzíveis.

## Preciso aprender uma nova linguagem de template?

Você aprende `view.tree`, uma sintaxe de árvore compacta para declarar o layout dos componentes. Ela é intencionalmente pequena — o capítulo [Vistas](#!section=docs/page=views) cobre tudo o que você precisa de uma vez. A lógica fica em TypeScript puro, e os estilos também são tipados.

## Como é diferente de React, Vue ou Svelte?

A reatividade é automática — não há `useState`, `useEffect`, nem assinatura manual. Você descreve *o que* a UI é; o $mol decide *como* e *quando* atualizá-la. A [tabela de tradução de conceitos](#!section=docs/page=rosetta) mapeia ideias de outros frameworks para o $mol.

## Onde consigo ajuda?

- Pergunte na [comunidade DEV](https://dev.to/t/mol)
- Navegue pelo [código-fonte e issues do $mol no GitHub](https://github.com/hyoo-ru/mam_mol)
- Leia a documentação de referência em [mol.hyoo.ru](https://mol.hyoo.ru/)

## Sob qual licença está?

MIT. Você pode usar o $mol livremente em projetos comerciais e open-source.
