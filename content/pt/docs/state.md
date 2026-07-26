# Estado e reatividade

O estado do $mol comporta-se como uma planilha: você declara como um valor é calculado, e tudo o que depende dele se atualiza sozinho. Sem stores, sem dispatch, sem hooks de efeito — o grafo de dependências rastreia o que recalcular.

## Propriedades reativas

Um método decorado com `@ $mol_mem` é uma célula reativa em cache. Ele executa uma vez, lembra seu resultado e só recalcula quando algo que ele leu mudou.

```typescript
namespace $.$$ {
	export class $my_counter extends $.$my_counter {
		@ $mol_mem count() { return 0 }

		@ $mol_mem doubled() {
			return this.count() * 2
		}
	}
}
```

`doubled` lê `count`, então se inscreve em `count` automaticamente. Altere `count` e toda vista que mostra `doubled` se atualiza — não há nada para inscrever manualmente.

## Leitura e escrita

Uma propriedade é getter e setter ao mesmo tempo: chame-a sem argumento para ler, com um argumento para escrever.

```typescript
@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

## Ações vs. computações

Essa única distinção mantém o código reativo previsível:

- `@ $mol_mem` é uma **computação pura** — apenas lê outras células e retorna um valor.
- `@ $mol_action` é um **efeito** — escritas no estado, chamadas de rede e temporizadores pertencem aqui.

Escrever em uma célula de dentro de um `@ $mol_mem` cria um laço de realimentação (a escrita invalida uma dependência, que recalcula, que escreve de novo). O $mol relata isso como uma *inscrição circular*. A correção é sempre a mesma: mantenha os efeitos colaterais nas ações, mantenha as computações puras.

| Em `@ $mol_mem` você pode | mas não |
|---|---|
| ler outras células | escrever outras células |
| `new SomeClass()` | `fetch()`, `await` |
| retornar um valor | `setTimeout`, escritas no DOM |

Os manipuladores de botão são gerados como `@ $mol_mem` na classe base; sobrescreva-os com `@ $mol_action` para que possam escrever com segurança:

```typescript
@ $mol_action
submit() {
	this.saved( true )
}
```

## O estado derivado se compõe

Como as dependências são rastreadas automaticamente, os valores derivados se encadeiam sem nenhuma ligação manual. Cada um lê o anterior; uma mudança na raiz se propaga exatamente até onde for necessário:

```typescript
@ $mol_mem full_name() {
	return `${ this.first() } ${ this.last() }`.trim()
}

@ $mol_mem greeting() {
	return this.full_name() ? `Hello, ${ this.full_name() }!` : 'Hello!'
}
```

## Estado com chave

`@ $mol_mem_key` é uma computação parametrizada por uma chave — uma célula em cache por chave. Ideal para valores por linha:

```typescript
@ $mol_mem_key
task_done( id: string, next?: boolean ) {
	const task = this.task( id )
	if ( next !== undefined ) task.Done( null )!.val( next )
	return task.Done()?.val() ?? false
}
```

## Assíncrono é apenas um valor

Retorne uma promise de um `@ $mol_mem` e a vista mostra um estado de carregamento até resolver — sem flag de carregamento explícita:

```typescript
@ $mol_mem
async data() {
	const res = await fetch( '/api/data' )
	return await res.json()
}
```

[Busca de dados](#!section=docs/page=data) baseia-se nesse padrão.

## Estado transitório entre eventos

O estado declarado em `view.tree` é reiniciado entre manipuladores de eventos distintos (sequências de arrastar/deslocar/gesto), porque o $mol envolve cada manipulador em sua própria fibra. Para valores que precisam sobreviver de um evento para o seguinte, use um campo TypeScript simples em vez de uma propriedade reativa:

```typescript
export class $my_canvas extends $.$my_canvas {
	// plain field — survives across events, not reactive
	drag_id = ''

	@ $mol_action pan_start() { this.drag_id = 'node_42' }
	@ $mol_action pan_move() { if ( this.drag_id ) { /* ... */ } }
}
```

Use uma célula reativa quando a vista precisa reagir ao valor; use um campo simples para estado transitório que apenas os manipuladores leem.

## Próximo

O estado reativo é mais útil quando é endereçável — conecte-o à URL em [Roteamento](#!section=docs/page=routing).
