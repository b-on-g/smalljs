# Renderização

Este capítulo trata do que acontece entre a mudança do seu estado reativo e a atualização dos pixels na tela. Raramente você precisa pensar nisso — mas entender o modelo explica por que o código $mol permanece rápido sem esforço especial.

## Sem DOM virtual

O $mol não compara uma árvore virtual. Cada propriedade de vista é vinculada diretamente ao nó ou atributo do DOM que controla, através das mesmas células reativas que você já conheceu em [Estado](#!section=docs/page=state). Quando uma célula muda, apenas os vínculos exatos que a leem são reexecutados — não uma subárvore, não uma função de componente, apenas as propriedades afetadas.

Isso significa que não há passagem de reconciliação a otimizar, nenhuma chave para ajustar à mão em um diff de lista e nenhum `memo`/`shouldComponentUpdate` a que recorrer. O grafo de dependências já conhece o conjunto mínimo de atualizações.

## Os componentes são preguiçosos

Uma vista só é construída quando algo a pede. Uma tela para a qual você nunca navega nunca é construída; uma aba que você nunca abre não custa nada. Como a construção é sob demanda e em cache, compor grandes árvores de componentes é barato — as partes que não são necessárias simplesmente ainda não existem.

## A renderização é virtualizada

O $mol renderiza apenas o que está dentro da área visível. Os componentes rolados para fora da vista não são mantidos como DOM oculto — eles não são criados de forma alguma, e são construídos no momento em que entram no intervalo visível. Esta é uma propriedade arquitetural do framework, não um recurso opcional nem um componente de lista especial: qualquer layout é virtualizado, então uma lista de dez itens e uma de dez mil custam quase o mesmo para exibir.

O efeito prático é que você escreve árvores de componentes comuns e listas longas sem recorrer a bibliotecas de janelamento.

## Números reproduzíveis

Afirmações de desempenho só são úteis se você pode reproduzi-las. Em vez de citar números aqui, o $mol participa do **js-framework-benchmark** da comunidade; você pode ler seus resultados e reexecutar a suíte você mesmo:

[Resultados do js-framework-benchmark](https://nin-jin.github.io/js-framework-benchmark/webdriver-ts-results/table.html)

Trate isso como a fonte de verdade para comparações — medida, versionada e independente desta página.

## Próximo

Isso completa o modelo central de como o $mol funciona. A seguir, coloque-o para trabalhar carregando dados reais em [Busca de dados](#!section=docs/page=data).
