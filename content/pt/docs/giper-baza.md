# Giper Baza

Giper Baza é a camada de dados local-first do $mol: um armazenamento CRDT que persiste localmente e sincroniza automaticamente entre clientes. Você modela dados como entidades; leituras e escritas parecem propriedades reativas comuns, e a replicação simplesmente acontece.

> Esta página introduz o formato da API. Giper Baza é um tópico extenso — trate isto como um mapa, não o território completo.

## Definir uma entidade

Uma entidade é um **esquema puro** — um conjunto de campos tipados. Mantenha o comportamento de fora; faça a leitura e a escrita nas suas vistas.

```typescript
namespace $ {
	export class $my_task extends $giper_baza_entity.with( {
		Title: $giper_baza_atom_text,
		Done: $giper_baza_atom_bool,
		CreatedAt: $giper_baza_atom_time,
	} ) {}
}
```

Cada campo é um **átomo** — uma célula sincronizada com um valor tipado.

## Ler e escrever

Obtenha o armazenamento, alcance uma lista de entidades e percorra-as de forma reativa:

```typescript
		@ $mol_mem
		tasks() {
			return this.tasks_list().remote_list()
		}

		@ $mol_mem_key
		task_done( id: string, next?: boolean ) {
			const task = this.task( id )
			if( next !== undefined ) task.Done( null )!.val( next )
			return task.Done()?.val() ?? false
		}
```

Ler `Done()?.val()` dá o valor atual; escrever `Done(null)!.val(next)` o define. Qualquer vista que lê o átomo renderiza de novo quando ela — ou um par remoto — o altera.

## Criar e remover

```typescript
		@ $mol_action
		task_add( title: string ) {
			const task = this.tasks_list().make( [ [ null, $giper_baza_rank_read ] ] )!
			task.Title( null )!.val( title )
			task.Done( null )!.val( false )
		}

		@ $mol_action
		task_remove( id: string ) {
			this.tasks_list().cut( this.task( id ).link() )
		}
```

## A sincronização é automática

Não há nada para configurar. As mudanças se replicam para outros clientes em tempo real, e os mesmos dados ficam disponíveis offline — o armazenamento reconcilia quando uma conexão retorna. Como as escritas são mesclagens CRDT, edições concorrentes de dispositivos diferentes se combinam sem conflitos.

## Para onde ir agora?

Você agora tem o arco completo: [Vistas](#!section=docs/page=views), [Estado](#!section=docs/page=state), [Roteamento](#!section=docs/page=routing), [Busca de dados](#!section=docs/page=data) e armazenamento local-first. Experimente tudo no [Playground](#!section=playground).
