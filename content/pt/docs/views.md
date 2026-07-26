# Views

Uma view é um componente: um nó na árvore de UI com seu próprio layout, comportamento e estilos. Este capítulo cobre como as views são declaradas, ligadas à lógica, compostas e reutilizadas.

## Três arquivos, um componente

Um componente `$my_card` vive em `my/card/` e é descrito por até três arquivos, cada um com uma função clara:

- `card.view.tree` — **o que** o componente é: sua estrutura e ligações padrão.
- `card.view.ts` — **como** ele se comporta: métodos TypeScript, estado reativo.
- `card.view.css.ts` — como ele se parece: estilos tipados verificados pelo compilador.

Manter estrutura, comportamento e estilo separados é proposital — cada arquivo permanece pequeno e legível, e o layout nunca se emaranha com a lógica.

## A linguagem view.tree

`view.tree` descreve a estrutura de forma declarativa. A indentação é o aninhamento; não há tags de fechamento.

```tree
$my_card $mol_view
	sub /
		<= Title $mol_view
			sub / <= title \
		<= Body $mol_view
			sub / <= text \
```

- `$my_card $mol_view` — seu componente estende a base `$mol_view`.
- `sub /` — a lista de filhos.
- `<= Title $mol_view` — uma subview nomeada, acessível como `this.Title()` em TypeScript.
- `<= title \` — uma propriedade ligável com um valor string bruta padrão (`\` inicia uma string bruta).

Todo nome capitalizado (`Title`, `Body`) torna-se uma propriedade real que você pode acessar, sobrescrever ou estilizar. Toda ligação em minúsculas (`title`, `text`) torna-se um valor que você pode calcular em `.view.ts`.

## Ligando propriedades

Dois operadores conectam uma propriedade à sua fonte:

- `<=` **unidirecional**: o filho lê um valor do proprietário.
- `<=>` **bidirecional**: o valor flui em ambas as direções — usado para entradas.

```tree
$my_form $mol_view
	sub /
		<= Field $mol_string
			value? <=> text? \
```

Aqui o `value` da entrada e o `text` do proprietário permanecem sincronizados automaticamente: digite no campo e `text` se atualiza; defina `text` no código e o campo reflete isso.

## Ligando ao comportamento

Uma ligação sem valor padrão é implementada em `.view.ts`. A classe estende a base gerada de mesmo nome:

```typescript
namespace $.$$ {
	export class $my_card extends $.$my_card {
		@ $mol_mem
		title() {
			return 'Untitled'
		}
	}
}
```

Tudo o que o template liga — `title`, `text`, a propriedade de uma subview — pode receber lógica aqui. A reatividade ([Estado](#!section=docs/page=state)) torna esses valores vivos.

## Atributos e tipo de elemento

Mude o elemento HTML subjacente com `dom_name` e defina atributos por meio de `attr`:

```tree
$my_banner $mol_view
	dom_name \section
	attr *
		^
		role \note
```

O `^` herda os atributos do pai, para você não perder os que `$mol_view` já define.

## Listas e views com chave

Um `*` no final transforma uma subview em uma família — uma instância por chave. Use para linhas:

```tree
$my_list $mol_list
	rows /
		<= Row* $mol_view
			sub / <= row_title* \
```

O framework cria um `Row` para cada chave que você fornece e, graças à [renderização virtualizada](#!section=docs/page=rendering), constrói apenas as que estão na tela.

> Quando uma view com chave contém, ela mesma, filhos com chave, dê a chave à externa com `Name*`, não `Name*0` — a forma indexada deixa os filhos aninhados sem renderizar.

## Views condicionais

Atribuir `null` remove uma view da renderização. Faça uma subclasse e anule o que uma variante não precisa:

```tree
$my_page_readonly $my_page
	Edit_button null
```

## Composição e reutilização

As views se compõem por aninhamento e se especializam por extensão. Um cartão usado dentro de uma lista:

```tree
$my_user_card $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
		<= Email $mol_view
			sub / <= email \

$my_users_list $mol_list
	rows /
		<= User* $my_user_card
			name <= user_name* \
			email <= user_email* \
```

`$my_users_list` nunca redefine a aparência de um cartão — ele reutiliza `$my_user_card` e alimenta cada instância com seus dados. Este é todo o modelo de composição: views pequenas, ligadas entre si, especializadas por `extends` quando uma variante é necessária.

## Próximo

As views descrevem a estrutura; o que as faz ganhar vida são os dados reativos. Continue para [Estado e reatividade](#!section=docs/page=state).
