# Solução de problemas

Cada entrada desta página tem a mesma forma: o build está verde, a auditoria está limpa, o console está calado, e a tela está vazia ou não é o que você queria. O compilador não enxerga esses erros porque cada um deles é um programa válido que, por acaso, descreve outro componente. Ache o título que soa como o que você está vendo; debaixo dele estão a causa e a correção.

## Minha sobrescrita de propriedade não faz nada, sem erro

O nome no `view.tree` e o nome do método na classe diferem, na maioria das vezes nas maiúsculas: `exchange_form` na árvore, `exchangeForm` na classe. São duas propriedades. A da classe nunca é chamada, a da árvore mantém seu padrão, e nada avisa.

Os nomes são `snake_case` em todo lugar e precisam bater letra por letra. Depois de editar um `.view.ts`, confira se cada sobrescrita ainda nomeia uma propriedade existente; o `-view.tree/*.view.tree.d.ts` gerado ao lado da árvore é a lista com que comparar.

## Preciso de placeholder, disabled ou type num input

São propriedades de `$mol_string`: `hint` para o placeholder, `enabled` para o estado desabilitado, `type` para o tipo de entrada. Defina-as onde a entrada é usada:

```tree
<= Password $mol_string
	hint \Password
	type \password
	enabled <= can_edit true
	value? <=> password? \
```

Qualquer outra propriedade de qualquer outro componente se acha do mesmo jeito: abra o `.view.tree` dela, como mostra [Como ler os fontes](#!section=docs/page=mental-model/Docs.Body=Como%20ler%20os%20fontes).

`attr *` é para atributos DOM de verdade que o componente ainda não modela, e tem uma armadilha própria: um bloco sem `^` na primeira linha substitui o dicionário de atributos inteiro da base, então um `$mol_button` escrito assim perde `disabled`, `role` e `tabindex`. Comece o bloco com `^` para herdar, e só então acrescente suas chaves:

```tree
attr *
	^
	data_kind \primary
```

## Uma palavra aparece letra por letra

Uma string foi passada onde se espera uma lista, e a string foi espalhada caractere por caractere. Strings começam com `\`, listas começam com `/`. O caso de sempre é `sub`, que é uma lista:

```tree
sub / <= label \Hello
```

## A tela está vazia, os testes estão verdes

Uma sobrescrita caiu fora do `.view.ts`. A árvore dá a toda propriedade um padrão, então quando a classe para de redefinir `rows()`, o TypeScript fica satisfeito e a lista renderiza vazia. Testes que só checam o modelo seguem verdes porque o modelo está bem.

Para cada sobrescrita de que a tela depende, escreva um teste que leia o que o usuário vê: `rows()`, `sub()`, `title()` das subviews, ou o DOM. [Testes](#!section=docs/page=testing) mostra as duas formas.

## Os dados nunca carregam, um componente fica travado no estado de carregamento

Um método `@ $mol_mem` retornou uma promise como valor: `fetch( uri ).then( ... )`, um método `async`, ou o resultado de `$mol_wire_async( this ).load()`. Uma promise dentro da célula significa, para todo mundo, «ainda calculando», e quando ela resolve a célula recalcula e produz uma promise nova. A rede funciona; a view nunca vê um resultado.

A forma certa é síncrona: chame `this.$.$mol_fetch.json( uri )` dentro da célula e retorne o valor já parseado. A fibra suspende até a resposta chegar e então roda a célula de novo, então a promise nunca aparece no seu código. Onde o trabalho assíncrono precisa mesmo acontecer em outro lugar, ponha o resultado dele numa célula de estado separada e faça o efeito retornar uma flag ou uma chave, nunca a promise.

Uma segunda causa é um erro engolido: um `try`/`catch` dentro de uma célula que captura a suspensão junto com as falhas de verdade. Relance tudo o que for uma `Promise`, ou use `$mol_fail_catch`, que faz essa checagem por você.

## Inscrição circular

Um método `@ $mol_mem` escreveu em outra célula, ou executou um efeito colateral que acabou invalidando algo que ele tinha lido. Computações apenas leem e retornam; escritas, rede, temporizadores e DOM pertencem a manipuladores `@ $mol_action`. A outra origem da mesma mensagem é uma ligação `<=>` com um filho combinada com um método na classe que delega para esse mesmo filho, descrita a seguir.

## Maximum call stack

Duas formas produzem isso. A primeira: a árvore tem `tab? <=> tab?` num filho e a classe tem `tab() { return this.Head().tab() }`: o filho pergunta ao proprietário, o proprietário pergunta ao filho. Tire o `<=>` para o filho a quem você delega.

A segunda: uma subview foi retipada para uma classe sua e a classe chama `super` numa propriedade listada na árvore. Esse `super` não é a implementação da base, e sim o stub que a árvore gerou para a ligação listada, e o stub delega de volta ao proprietário. Delegue explicitamente para a implementação original, veja a entrada sobre retipagem mais abaixo.

## Um valor escrito com letra maiúscula não pode ser sobrescrito do TypeScript

`<= Label* \` gera um método chamado `Label`, e `label()` na classe é outro método. Subviews são capitalizadas, valores são minúsculos, e é a caixa da letra na árvore que decide o nome do método gerado.

## Toda linha de uma lista aninhada mostra o mesmo item

Uma subview com chave dentro de outra subview com chave não recebe a chave dela. `Cell*0` dentro de `Row*0` renderiza com a chave `0` em toda linha. Mova a linha para um componente próprio e passe os dados dela por propriedades, e dê a chave à view externa como `Row*`, não `Row*0`.

## Mudei a classe de uma subview e o conteúdo dela sumiu

Retipar `Pre* $mol_text_code` para `Pre* $my_code` derruba as ligações que a árvore da base declarou para ela, então elas precisam ser listadas de novo. Listar `text <= pre_text* \` cria um stub vazio que encobre o `pre_text` real de `$mol_text`. Delegue na classe em vez de contar com `super`, que é justamente esse stub:

```typescript
pre_text( index: number ) {
	return $mol_text.prototype.pre_text.call( this, index )
}
```

## Métodos do view.ts de um componente base faltam na subclasse

`$my_child $my_base` numa árvore estende a classe gerada a partir de `base.view.tree`, não a classe que você escreveu em `base.view.ts`. Os métodos definidos ali não chegam ao filho, e o TypeScript os reporta como faltantes. A lógica compartilhada por várias views vive num arquivo `.ts` simples dentro de `namespace $`, sem árvore, do jeito que o próprio `$mol_view` é escrito.

## Um componente base declarado no mesmo arquivo view.tree perde seu comportamento

Quando um arquivo de árvore declara tanto uma base quanto uma classe que a estende, o corpo do `.view.ts` da base é pulado para o filho. Dê uma pasta própria a uma base que tenha um `.view.ts`.

## Os estilos vazam entre uma subview e o componente dentro dela

`Nav $my_app_nav` dentro de `$my_app` põe o mesmo atributo `my_app_nav` na subview e no componente, e um único seletor atinge os dois. Dê à subview um nome que não repita o final da classe, por exemplo `Nav_row`.

## Um seletor sobre um atributo false nunca casa

Um atributo booleano definido como `false` é removido do elemento, então `[expanded="false"]` não casa com nada. Renderização condicional não é trabalho de CSS; sobrescreva a fábrica da subview e retorne `null` para a variante que não tem essa view.

## Um número de estilo não muda nada

Todo número em `style *` recebe `px` no final: `flexGrow 1` vira `flex-grow: 1px`, que o navegador descarta. Escreva valores sem unidade como strings, `flexGrow \1`.

## Dois filhos de uma view de rolagem ficam um sobre o outro

`$mol_scroll` segura exatamente um filho. Embrulhe os filhos num `$mol_view` ou num `$mol_list` e entregue isso à rolagem.

## minimal_height não tem efeito visível

`minimal_height` é um número que o `$mol_list` virtualizado usa para estimar as linhas antes de elas renderizarem; ele não define altura. A altura se define no `.view.css.ts`.

## Um componente embutido empurra a página para os lados

Uma view montada dentro de um layout alheio não encolhe abaixo do próprio conteúdo por padrão. Dê `minWidth: 0` à raiz nos estilos dela, para que possa ser espremida como os elementos ao redor.

## CSS de terceiros não estiliza meu componente

Um componente sem `dom_name` renderiza como um elemento batizado com o nome da sua classe, o que para um framework CSS é um elemento inline desconhecido. Defina a tag explicitamente: `$mol_button` não tem nenhuma, então um botão que você quer estilizado por CSS de fora precisa de `dom_name \button`.

## Clicar num link para a página atual limpa a URL

Um `$mol_link` com `arg *` alterna: numa página cuja URL já casa, um clique remove essas chaves. Para um link que só navega, faça uma subclasse com `uri_off <= uri`. Para recarregar a mesma rota no clique, chame `$mol_state_arg.value()` de um manipulador e dê `preventDefault` no evento.

## Meu manipulador de input roda a cada renderização

Uma `prop?` que você acrescentou a uma subclasse de `$mol_string` tem o nome de uma propriedade que a base já usa: `enter`, `submit`, `hint`, `value`, `keyboard`. Compare seus nomes novos com a árvore da base antes de acrescentá-los.

## O erro lançado pelo meu setter de value nunca aparece

`$mol_string` captura uma exceção vinda de `value?` e a entrega ao `setCustomValidity` do input, então ela aparece só como validação nativa de formulário. Informe o erro por um canal seu, uma linha de status ou uma subview de mensagem.

## Uma ligação de manipulador com chave é reportada como faltante

`event_click? <=> pick*? null` numa subview com chave não gera um stub para `pick`. Declare-o você mesmo na raiz da árvore, `pick*? null`, e implemente-o na classe.

## O bundle contém um módulo que eu nunca uso

O builder acha dependências varrendo o texto-fonte atrás de tokens `$mol_name`, e um token dentro de um literal de string ou de um comentário de documentação `/** */` conta tanto quanto um no código. Um nome citado como exemplo num comentário de documentação puxa o módulo inteiro dele, e a falha aparece num arquivo que você nunca tocou. Escreva exemplos e notas sem o prefixo `$`, ou nomeie a pasta no lugar.

## Próximo

Quase todos esses casos se reduzem a uma regra: o nome na árvore é o contrato, e o compilador confere os tipos, mas não os nomes. [Modelo mental](#!section=docs/page=mental-model) explica por que a árvore é uma lista de sobrescritas, e [Testes](#!section=docs/page=testing) mostra o teste que pega as silenciosas.
