# De TypeScript para view.tree

O componente que você escreveu em [Primeiros passos](#!section=docs/page=getting-started) é uma classe TypeScript comum. Ele compila, ele roda, e é uma forma suportada de descrever um componente $mol — uma entre as várias que o framework aceita.

Ele também pediu que você segurasse na cabeça quatro coisas que nada têm a ver com o que o componente faz. Esta página pega uma de cada vez e mostra a linha de `view.tree` que remove cada uma. Depois mostra o código que o compilador gera, para você conferir que a árvore não é um segundo runtime: ela produz a classe que você já escreveu.

Aqui está o arquivo de novo, para comparar:

```typescript
namespace $ {

	export class $my_hello extends $mol_page {

		title() {
			return 'Greeting'
		}

		body() {
			return [ this.Name(), this.Message() ]
		}

		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}

		@ $mol_mem
		name( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.greeting() ]
			return obj
		}

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

## O filho é você quem constrói, e é você quem guarda em cache

Seis dessas linhas são uma fábrica:

```typescript
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}
```

Apague `@ $mol_mem` e continua compilando. Só deixa de ser um componente: `this.Name() !== this.Name()`, porque o corpo executa `new` a cada chamada. Quem lê a propriedade por último ganha, as instâncias anteriores ficam com tudo o que acumularam, e ninguém as descarta — o $mol só é dono dos objetos que ele mesmo guardou em cache para você.

Em `view.tree` o mesmo filho ocupa uma linha:

```tree
		<= Name $mol_string
```

Um nome com inicial maiúscula significa que a propriedade guarda um componente; `<=` a declara. Não existe uma escrita mais curta que esqueça o decorador, porque a fábrica não é você quem escreve.

## O operador diz para onde os dados vão

Alimentar um filho é atribuir, uma propriedade por vez:

```typescript
			obj.sub = () => [ this.greeting() ]
```

Três peças móveis: o objeto filho, o nome da propriedade e uma seta para que a leitura aconteça depois, e não agora. A linha diz o que está ligado, mas não em que direção; para descobrir isso você lê o corpo da seta e verifica se algo volta.

A árvore põe a direção no operador:

```tree
		<= Message $mol_view
			sub / <= greeting \
```

`<=` é de mão única, de `greeting` para o `sub` do filho. `/` é uma lista, `\` inicia uma string bruta, e `greeting \` declara uma propriedade com a string vazia como padrão — o valor que você vai sobrescrever em TypeScript.

## A ligação bidirecional está a uma tecla do somente-leitura silencioso

O campo precisa de dados nas duas direções, e é isso que o parâmetro `next` faz:

```typescript
			obj.value = ( next?: string ) => this.name( next )
```

Agora tire o `next`:

```typescript
			obj.value = () => this.name()
```

O TypeScript aceita. Uma função sem argumentos é atribuível onde se espera um argumento opcional, então os tipos fecham e o audit continua verde. O campo é renderizado, mostra o valor certo e ignora em silêncio tudo o que você digita.

Na árvore essa meia ligação não tem como ser escrita:

```tree
		<= Name $mol_string
			value? <=> name? \
```

`<=>` liga nos dois sentidos. O `?` puro marca uma propriedade que aceita um argumento, ou seja, uma propriedade na qual dá para escrever. Aqui ele está nas duas pontas, então o valor desce para o campo e volta.

## Uma string localizável continua sendo uma string até você criar uma chave

```typescript
		title() {
			return 'Greeting'
		}
```

Para traduzir isso você inventa uma chave, troca o literal por uma chamada a `$mol_locale.text`, escreve o json e, pelo resto da vida do projeto, mantém os dois em sincronia na mão.

```tree
	title @ \Greeting
```

`@` marca a string como localizável, e o build faz o resto. Depois de um build, `my/hello/-/web.locale=en.json` contém:

```json
{
	"$my_hello_Name_hint": "Enter your name",
	"$my_hello_title": "Greeting"
}
```

Tradutores recebem um arquivo json com todas as strings do app. Você não escreve nenhuma chave.

## O componente inteiro

```tree-no-run
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

Isso é o `hello.view.tree`. O que fica em `hello.view.ts` é a parte que nunca foi estrutura:

```typescript
namespace $.$$ {

	export class $my_hello extends $.$my_hello {

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

A classe agora estende `$.$my_hello`, a base que a árvore gerou, e sobrescreve uma propriedade. `$.$$` é o namespace dessas sobrescritas.

## O que o compilador emite

`view.tree` é um gerador de código sem runtime próprio. Construa o módulo e leia `my/hello/-view.tree/hello.view.tree.js`:

```javascript
	($.$my_hello) = class $my_hello extends ($.$mol_page) {
		name(next){
			if(next !== undefined) return next;
			return "";
		}
		Name(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this.$.$mol_locale.text("$my_hello_Name_hint")));
			(obj.value) = (next) => ((this.name(next)));
			return obj;
		}
		greeting(){
			return "";
		}
		Message(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.greeting())]);
			return obj;
		}
		title(){
			return (this.$.$mol_locale.text("$my_hello_title"));
		}
		body(){
			return [(this.Name()), (this.Message())];
		}
	};
	($mol_mem(($.$my_hello.prototype), "name"));
	($mol_mem(($.$my_hello.prototype), "Name"));
	($mol_mem(($.$my_hello.prototype), "Message"));
```

As mesmas fábricas, as mesmas setas, as mesmas três chamadas a `$mol_mem`, mais as duas chaves de locale que você não precisou nomear. Quando o bundle chega ao navegador, a árvore já não existe.

É também por isso que os dois formatos convivem sem atrito. Um componente escrito como árvore e um escrito como classe produzem o mesmo tipo de objeto: um app pode ter os dois e ninguém percebe a diferença.

## O que uma classe escrita à mão não entrega a nenhuma ferramenta

Ao lado do JS gerado o compilador escreve `hello.view.tree.d.ts`:

```typescript
declare namespace $ {

	type $mol_string__hint_my_hello_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_my_hello_2 = $mol_type_enforce<
		ReturnType< $my_hello['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_view__sub_my_hello_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $my_hello extends $mol_page {
		name( next?: string ): string
		Name( ): $mol_string
		greeting( ): string
		Message( ): $mol_view
		title( ): string
		body( ): readonly(any)[]
	}

}
```

Os pares `$mol_type_enforce` conferem cada ligação contra a propriedade que ela alimenta, então um tipo errado é apontado na própria ligação em vez de em algum ponto dentro do filho. O corpo da classe abaixo deles é uma descrição legível por máquina da superfície do componente, e há quem a leia: o arquivo de locale acima sai da mesma análise, e as [páginas de API](#!section=docs/page=api-mol-string) deste site são geradas a partir do `.view.tree.d.ts` de cada componente básico.

Uma classe escrita à mão não oferece nada disso. É código, e a única coisa capaz de lê-lo é o TypeScript.

## O tamanho da coisa

O Hello World acima: 31 linhas de TypeScript viram 8 linhas de árvore mais 8 linhas de TypeScript.

A diferença cresce junto com o componente. `$mol_app_users` — um campo de busca, uma lista, quatro botões e uma linha de status — tem 30 linhas e 840 caracteres como árvore, e 125 linhas e 3046 caracteres como classe. As duas versões estão impressas na íntegra na página wiki de [comparação de formatos](https://github.com/hyoo-ru/mam_mol/wiki/View-Formats), então dá para pesar a troca por conta própria.

## Qual escrever

Os dois, escolhendo componente a componente.

`view.ts` é um formato suportado. É nele que a árvore compila, e um componente escrito assim se comporta como qualquer outro. Quando um componente é sobretudo lógica com um ou dois filhos, a classe é a escolha honesta e a árvore rende pouco.

A árvore se paga onde a cerimônia se repete: telas feitas sobretudo de estrutura, longas sequências de ligações, tudo que tem texto que um tradutor vai querer ver. Isso descreve a maior parte de uma interface, e é por isso que os próprios componentes do $mol são escritos assim.

A seguir, a linguagem da árvore em si — listas, dicionários, views com chave e a especialização de um componente por extensão: **[Views](#!section=docs/page=views)**.
