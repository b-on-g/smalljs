# Livro de receitas

Receitas curtas, prontas para copiar, para tarefas que surgem em quase todo app. Cada uma é código $mol real — ajuste os nomes e use.

## Um input com ligação bidirecional

Mantenha um input e um valor derivado em sincronia sem fiar nenhum handler: `<=>` liga nos dois sentidos, e qualquer propriedade computada que lê o valor se atualiza sozinha.

```tree
$my_greeter $mol_view
	sub /
		<= Name $mol_string
			value? <=> name?
		<= Hello $mol_view
			sub / <= greeting \
```

```typescript
namespace $.$$ {
	export class $my_greeter extends $.$my_greeter {
		@ $mol_mem name( next?: string ) { return next ?? '' }

		@ $mol_mem greeting() {
			return this.name() ? `Hello, ${ this.name() }!` : 'Type your name'
		}
	}
}
```

## Uma lista para adicionar e remover

Guarde a coleção numa propriedade reativa e reescreva-a de forma imutável a partir de ações. Um `Row*` com chave renderiza uma linha por item e — graças à [renderização virtualizada](#!section=docs/page=rendering) — apenas as linhas visíveis são construídas.

```tree
$my_todo $mol_view
	draft? \
	items /
	sub /
		<= Input $mol_string
			value? <=> draft?
			hint \New item
		<= Add $mol_button_major
			click? <=> add?
			sub / <= add_label \Add
		<= List $mol_list
			rows <= item_rows /
	Row* $mol_row
		sub /
			<= Label* $mol_view
				sub / <= item_title* \
			<= Delete* $mol_button_minor
				click? <=> delete*?
				sub / <= delete_label \✕
```

```typescript
namespace $.$$ {
	export class $my_todo extends $.$my_todo {
		@ $mol_mem draft( next?: string ) { return next ?? '' }
		@ $mol_mem items( next?: readonly string[] ) { return next ?? [] }

		@ $mol_action add() {
			const title = this.draft().trim()
			if( !title ) return
			this.items([ ... this.items(), title ])
			this.draft( '' )
		}

		@ $mol_action delete( id: number ) {
			this.items( this.items().filter( ( _, i ) => i !== id ) )
		}

		item_title( id: number ) { return this.items()[ id ] }

		item_rows() {
			return this.items().map( ( _, id ) => this.Row( id ) )
		}
	}
}
```

## Buscar dados com estados de carregamento e erro

Um valor assíncrono é apenas uma propriedade reativa que retorna uma promise. `$mol_fetch` suspende a fibra enquanto a requisição está a caminho, então qualquer view que o lê mostra o estado de carregamento embutido — e uma requisição que falha aparece como estado de erro. Você não escreve nenhuma flag `isLoading` nem `try`/`catch`.

```typescript
namespace $.$$ {
	export class $my_users extends $.$my_users {
		@ $mol_mem
		users() {
			return $mol_fetch.json( 'https://api.example.com/users' ) as {
				id: number
				name: string
			}[]
		}

		@ $mol_mem
		names() {
			return this.users().map( user => user.name )
		}
	}
}
```

## Persistir estado local

Para um estado que deve sobreviver a um recarregamento mas não poluir a URL — uma barra lateral recolhida, um rascunho, uma preferência — use `$mol_state_local`. Ele tem a mesma forma de getter/setter de qualquer propriedade reativa e armazena em `localStorage`.

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

## Ler e escrever um parâmetro de rota

Para tornar um valor compartilhável e favoritável, apoie-o em `$mol_state_arg`. Ler retorna o valor atual da URL; passar um argumento navega, e o botão voltar do navegador atualiza a célula por você.

```typescript
@ $mol_mem
page( next?: string ) {
	return $mol_state_arg.value( 'page', next ) ?? 'home'
}
```

Um `$mol_link` pode definir o mesmo argumento de forma declarativa, então um clique simples navega sem handler:

```tree
<= Home_link $mol_link
	arg *
		page \home
	sub / <= home_label \Home
```

Para trocar de tela com base no valor de rota, veja [Roteamento](#!section=docs/page=routing).

## Adicionar um tema claro/escuro automático

Anexe `$mol_theme_auto` como [plugin](#!section=docs/page=plugins) — um componente sem elemento, listado sob `plugins /`. Ele aplica um tema claro ou escuro à subárvore do host, seguindo a preferência do sistema, sem envolver seu layout em nada.

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
	sub /
		<= Content $my_content
```

## Próximo

Quer experimentar ao vivo? Abra o [Playground](#!section=playground) e cole qualquer receita, ou percorra o [Getting Started](#!section=docs/page=getting-started) para construir um app completo.
