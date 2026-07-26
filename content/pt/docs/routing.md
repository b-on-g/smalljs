# Roteamento

O roteamento no $mol não é uma biblioteca separada — a URL é apenas mais um pedaço de estado reativo. Leia-a, escreva-a, e as vistas reagem do mesmo modo que reagem a qualquer célula. O botão voltar, os deep links e as URLs compartilháveis vêm todos de graça.

## A URL como estado

`$mol_state_arg` expõe os parâmetros da URL como valores reativos. Vincule um a uma propriedade e a barra de endereços torna-se sua fonte de verdade:

```typescript
namespace $.$$ {
	export class $my_app extends $.$my_app {
		@ $mol_mem
		page( next?: string ) {
			return $mol_state_arg.value( 'page', next ) ?? 'home'
		}
	}
}
```

Ler `page()` retorna o valor atual; chamar `page('about')` navega. Tudo o que lê `page()` é renderizado de novo na mudança — inclusive o botão voltar do navegador, que atualiza a célula para você.

## Trocar de tela

Combine um valor roteado com um simples `switch` para escolher o que renderizar. Como as vistas são [preguiçosas](#!section=docs/page=rendering), as telas que você não mostra nunca são construídas:

```typescript
@ $mol_mem
body_content() {
	switch ( this.page() ) {
		case 'about': return [ this.About() ]
		case 'docs': return [ this.Docs() ]
		default: return [ this.Home() ]
	}
}
```

## Links que definem argumentos

No `view.tree`, um link pode definir argumentos de URL de forma declarativa — clicar nele navega sem nenhum manipulador:

```tree
<= About_link $mol_link
	arg *
		page \about
	sub / <= about_label \About
```

`$mol_link` também se marca como ativo (`mol_link_current`) quando seus argumentos correspondem à URL atual, então destacar a página atual não precisa de estado extra.

## Múltiplos parâmetros

Os argumentos são independentes, então uma tela pode rotear em vários de uma vez. Este próprio site de documentação roteia tanto em `section` quanto em `page`:

```tree
<= Guide_link $mol_link
	arg *
		section \docs
		page \views
```

Cada chave faz a ida e volta pela URL, então qualquer vista é compartilhável e favoritável por construção. Definir um argumento deixa os outros intactos, o que faz dos deep links — uma seção *e* página *e* âncora específicas — apenas uma questão de definir as chaves que lhe interessam.

## Estado que não deveria estar na URL

Nem todo pedaço de estado pertence à barra de endereços. Para valores que devem persistir localmente sem poluir os links — uma barra lateral recolhida, um rascunho — use `$mol_state_local`, que armazena no `localStorage` com o mesmo formato getter/setter:

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

Recorra a `$mol_state_arg` quando o estado deve ser compartilhável; a `$mol_state_local` quando deve apenas ser lembrado.

## Próximo

Você viu como o $mol transforma estado em UI e URLs. Veja como tudo isso chega à tela de forma eficiente em [Renderização](#!section=docs/page=rendering).
