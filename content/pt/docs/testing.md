# Testes

Uma view $mol é uma função do seu estado, e isso muda a cara de um teste. Um cenário de usuário se escreve como chamadas aos próprios métodos da view: defina o rascunho, rode a ação, leia o que o usuário veria.

```typescript
app.draft( 'Milk' )
app.add()
$mol_assert_equal( app.item_title( 0 ), 'Milk' )
```

Sem seletores, sem navegador, sem Playwright nem Cypress, sem esperar por nada. O mesmo arquivo ainda te dá:

- **Velocidade.** Os testes rodam em Node em milissegundos; mil deles levam cerca de um minuto. `node my/hello/-/node.test.js` roda os de um módulo.
- **Zero configuração.** Um `hello.test.ts` ao lado do componente é recolhido pelo builder e compilado em `-/node.test.js`. A integração contínua com `mam_build` o executa e derruba o build quando um teste falha.
- **Substituição de serviços pelo contexto.** Cada teste ganha seu próprio `$`, e tudo o que um componente alcança por `this.$.X` se troca atribuindo um dublê a esse `$`. É por isso que se escreve `this.$.$mol_fetch` em vez de `$mol_fetch`: o primeiro é substituível, o segundo não.
- **Tempo simulado.** Temporizadores criados pelo contexto não correm sozinhos; `$mol_after_mock_warp()` executa o que estiver na fila.
- **Um DOM de verdade quando você precisa.** O bundle Node carrega o jsdom, então `dom_node()` e `querySelectorAll` funcionam no mesmo arquivo de teste.

## Um cenário pelos métodos da view

Pegue a lista de tarefas do [Livro de receitas](#!section=docs/page=cookbook): uma string `draft?`, uma lista `items`, uma ação `add` e uma ação `delete`. O teste dela vive em `my/todo/todo.test.ts`:

```typescript
namespace $ {
	$mol_test({

		'add an item and delete it'( $ ) {
			const app = $my_todo.make({ $ })

			app.draft( 'Milk' )
			app.add()
			$mol_assert_equal( app.items().length, 1 )
			$mol_assert_equal( app.item_title( 0 ), 'Milk' )
			$mol_assert_equal( app.draft(), '' )

			app.delete( 0 )
			$mol_assert_like( app.item_rows(), [] )
		},

		'blank draft adds nothing'( $ ) {
			const app = $my_todo.make({ $ })

			app.draft( '   ' )
			app.add()
			$mol_assert_like( app.items(), [] )
		},

	})
}
```

Algumas coisas para notar:

- O arquivo de teste usa `namespace $`, não `$.$$`. O contexto `$` chega como argumento, novo a cada teste, e o componente é criado com `Klass.make({ $ })` para ler os serviços desse contexto.
- Um clique é uma chamada ao manipulador. `app.add()` é o que o botão faz; `app.Add().click( event )` passa pelo mesmo caminho quando você quer incluir a ligação.
- Afirme o que o usuário vê: `items()`, `item_rows()`, `sub()`, o `title()` de uma subview. Um modelo checado pela tela também pega uma sobrescrita que caiu fora da classe, o que um teste só do modelo não pegaria.
- `$mol_assert_equal` compara por identidade, `$mol_assert_like` compara estrutura, `$mol_assert_fail( ()=> ..., 'message' )` espera um lançamento.
- O nome do teste é a descrição. No corpo não há comentários.

## Substituir um serviço por um mock

Cada teste recebe um contexto novo, derivado do global. Atribua uma subclasse a um serviço nesse `$` antes de criar o componente, e todo `this.$.X` dentro do componente resolve para o substituto. Eis o dublê de fetch para o componente `$my_users` de [Busca de dados](#!section=docs/page=data):

```typescript
namespace $ {
	$mol_test({

		'user names come from the response'( $ ) {
			$.$mol_fetch = class extends $.$mol_fetch {
				static override json( input: RequestInfo ) {
					if( String( input ).endsWith( '/users' ) ) return [ { id: 1, name: 'Ada' } ]
					return $mol_fail( new Error( 'Unexpected request: ' + input ) )
				}
			}
			const app = $my_users.make({ $ })
			$mol_assert_like( app.user_names(), [ 'Ada' ] )
		},

	})
}
```

`users()` no componente chama `this.$.$mol_fetch.json( ... )`, então a requisição vai para o mock e o valor fica disponível de forma síncrona, sem espera nenhuma. Se o componente tivesse chamado `$mol_fetch.json( ... )` no global, o mock não teria sido consultado. Os mocks embutidos já trocam no contexto as `fetch` e `XMLHttpRequest` globais por proxies que lançam, então uma requisição que escapa do contexto falha alto em vez de encostar na rede.

O mesmo padrão cobre `$mol_state_arg` para a URL, `$mol_state_local` para o armazenamento, e qualquer outra coisa que seu componente pegue de `this.$`.

Há também `$mol_test_mocks`, uma lista de funções que rodam sobre o contexto antes de cada teste do bundle, inclusive os testes de outros módulos. É o lugar das regras que valem em todo lugar, do jeito que o framework registra os próprios mocks: um armazenamento dublê que guarda o que lhe derem, um locale que devolve um dicionário vazio, o bloqueio de rede acima. Dados de fixture de um componente só não têm lugar ali.

## O tempo

Os testes do próprio framework registram mocks para `$mol_after_timeout`, `$mol_after_frame` e seus parentes, e esses mocks estão no seu bundle também. Um temporizador criado com `new this.$.$mol_after_timeout( ms, task )` vai para a fila em vez de ser agendado, e `$mol_after_mock_warp()` roda a fila. Dado um toast que se esconde sozinho:

```typescript
@ $mol_mem toast( next?: string ) { return next ?? '' }

@ $mol_action notify( text: string ) {
	this.toast( text )
	new this.$.$mol_after_timeout( 3000, ()=> this.toast( '' ) )
}
```

o teste move o tempo à mão:

```typescript
'toast hides after the timer'( $ ) {
	const app = $my_greeter.make({ $ })
	app.notify( 'Saved' )
	$mol_assert_equal( app.toast(), 'Saved' )
	$mol_after_mock_warp()
	$mol_assert_equal( app.toast(), '' )
},
```

Um `setTimeout` cru numa view não é substituído por mock e sobrevive ao teste; é uma das razões para criar temporizadores pelo contexto.

## Pelo DOM

No bundle Node o `$mol_dom_context` é uma janela do jsdom, então uma view renderiza em elementos de verdade. Use isso quando a verificação for sobre markup em vez de estado:

```typescript
'greets by name'( $ ) {
	const app = $my_greeter.make({ $ })
	app.name( 'Ada' )
	$.$mol_dom_context.document.body.appendChild( app.dom_node() )
	app.dom_tree()
	$mol_assert_equal( app.Hello().dom_node().textContent, 'Hello, Ada!' )
	app.destructor()
},
```

`dom_node()` cria o elemento, `dom_tree()` renderiza a subárvore, e `destructor()` libera a view para que as células dela não sobrevivam ao teste. O atributo que uma subview ganha do próprio nome, aqui `[my_greeter_hello]`, é o seletor para quando você prefere `querySelector` a chamar a subview.

Faltam ao jsdom dois globais que campos de entrada e gestos procuram, `ShadowRoot` e `PointerEvent`. Um `$mol_string` renderizado sem eles registra um `ReferenceError` e fica vazio enquanto o resto da árvore renderiza. Pegue-os emprestados da janela do jsdom; é uma regra sem dados, válida para todo teste, então vai para `$mol_test_mocks`:

```typescript
$mol_test_mocks.push( $ => {
	const win = $.$mol_dom_context
	Object.assign( globalThis, {
		ShadowRoot: win.ShadowRoot,
		PointerEvent: win.PointerEvent ?? win.MouseEvent,
	} )
} )
```

## O que um teste em Node não cobre

Geometria e estilo. Se dois blocos se alinham, se um painel transborda a tela, se o tema escuro se lê bem: nada disso existe no jsdom. Para o layout que você mexeu, abra no navegador o `-/test.html` do módulo, que monta o app e roda ali os mesmos testes, e olhe.

## Notas práticas

- **Silêncio é falha.** Um teste que falhou numa afirmação e um teste que travou têm a mesma cara: nenhuma saída e um processo que continua vivo. Procure por `All tests passed` no fim; se não estiver lá, confira primeiro a última afirmação. Um teste `async` tem limite de um segundo.
- **Quebre um de propósito.** Quando uma execução não imprime nada, inverta uma afirmação e confirme que a falha aparece. Uma suíte de testes que não pode falhar não está medindo nada.
- **Não afirme strings localizadas.** Valores marcados com `@` na árvore são resolvidos pelo locale, que se aquece de novo a cada contexto novo. Afirme a estrutura, não o texto de um rótulo.

## Próximo

[Solução de problemas](#!section=docs/page=troubleshooting) lista os erros que mantêm os testes verdes e as telas vazias, e [Busca de dados](#!section=docs/page=data) mostra o componente para o qual o mock acima foi escrito.
