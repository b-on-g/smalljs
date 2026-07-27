# Busca de dados

Carregar dados remotos no $mol não é uma API especial — um valor assíncrono é apenas uma propriedade reativa que por acaso retorna uma promise. A vista a aguarda, mostra um estado de carregamento e renderiza de novo quando ela resolve.

## Uma propriedade assíncrona

Retorne uma promise de um `@ $mol_mem` e leia-a como qualquer outro valor:

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
	}
}
```

`$mol_fetch` suspende a fibra até a resposta chegar. Enquanto está pendente, qualquer vista que lê `users()` mostra automaticamente o estado de carregamento embutido — você não escreve nenhuma flag `isLoading`.

## Renderizar o resultado

Vincule os dados resolvidos diretamente em uma lista:

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

Quando a promise resolve, `users()` se atualiza, `user_names()` recalcula e a lista renderiza. Sem callbacks, sem `useEffect`.

## Recarregar

Como é apenas uma célula reativa, você recarrega invalidando-a. Dependa de um token que você pode incrementar:

```typescript
		@ $mol_mem
		reload_token( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		users() {
			this.reload_token() // subscribe
			return $mol_fetch.json( 'https://api.example.com/users' ) as unknown[]
		}

		@ $mol_action
		reload() {
			this.reload_token( this.reload_token() + 1 )
		}
```

Chamar `reload()` muda o token, o que invalida `users()`, o que recarrega.

## Erros

Um lançamento dentro de uma propriedade reativa se propaga para a vista mais próxima, que renderiza um estado de erro em vez do conteúdo. Para tratá-lo você mesmo, capture e retorne um valor de recuo:

```typescript
		@ $mol_mem
		users_safe() {
			try {
				return this.users()
			} catch( error ) {
				if( error instanceof Promise ) throw error // still loading
				return []
			}
		}
```

Relançar uma `Promise` é a forma de deixar o estado de carregamento continuar fluindo enquanto captura apenas os erros reais.

## Próximo

Para dados que persistem e sincronizam entre clientes sem um backend, continue para [Giper Baza](#!section=docs/page=giper-baza).
