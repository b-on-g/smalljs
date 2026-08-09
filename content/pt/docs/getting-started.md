# Primeiros passos

Esta página leva você de uma pasta vazia até um app $mol reativo e em execução. Deve levar cerca de quinze minutos. Cada trecho abaixo é código real e funcional — copie-o como está.

Você vai escrever o componente em TypeScript comum. O $mol também tem um formato mais curto para descrever componentes, o `view.tree`, que você encontra na próxima página. Nada aqui precisa dele: um componente $mol é uma classe comum de qualquer jeito.

## O que você precisa

- **Node.js 18+** e **git**. É toda a lista.

Você não instala uma CLI global nem gera código boilerplate que terá de entender depois. Os apps $mol vivem dentro do workspace MAM, que já sabe como construí-los e servi-los.

## 1. Obter o workspace

O MAM é a ferramenta de build e o registro de módulos do $mol. Clone-o e instale uma vez.

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` inicia o servidor de desenvolvimento em `http://localhost:9080/`. Ele observa seus arquivos e reconstrói automaticamente — deixe-o rodando em seu próprio terminal.

## 2. Criar um módulo

Um app $mol é apenas uma pasta. Escolha um namespace (o seu, por exemplo `my`) e um nome (`hello`).

```bash
mkdir -p my/hello
```

> **Uma regra para lembrar:** underscores em um nome de componente são separadores de pastas. `$my_hello` fica em `my/hello/`, `$my_hello_form` ficaria em `my/hello/form/`. Nomes de pastas de módulos nunca contêm underscore.

Agora adicione dois arquivos dentro de `my/hello/`.

### index.html — o ponto de entrada

```html
<!doctype html>
<html mol_view_root>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>
	<body mol_view_root>
		<div mol_view_root="$my_hello"></div>
		<script src="web.js"></script>
	</body>
</html>
```

O atributo `mol_view_root="$my_hello"` monta seu componente quando a página carrega.

### hello.view.ts — o componente

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

Leia de cima para baixo:

- `$my_hello` vive em `namespace $`, o namespace ambiente onde mora todo componente $mol. Ele estende `$mol_page`, uma casca de página embutida com título e corpo. `$mol_string`, mais abaixo, é a entrada de texto embutida.
- `body()` devolve os filhos. Aqui um filho não é markup, é uma propriedade: `Name` e `Message` são métodos que você pode chamar, sobrescrever em uma subclasse ou alcançar pelo nome em uma folha de estilos.
- `Name()` constrói o campo e o liga. Cada propriedade dele recebe uma **seta**, não um valor. O filho chama essa seta quando precisa do dado, então sempre lê o valor atual.
- `name( next?: string )` é o estado. Chamado sem argumento, lê; com um argumento, escreve. É justamente entregar essa função inteira a `obj.value` que faz digitar no campo atualizar `name`.
- `@ $mol_mem` guarda uma propriedade em cache por instância. Em `name` isso quer dizer que o valor fica guardado e que tudo que o leu se recalcula quando ele muda. Em `Name` e `Message` quer dizer um componente filho, construído uma vez, em vez de um novo a cada chamada.
- `greeting()` lê `name()`. Essa leitura *é* a assinatura. Quando `name` muda, `greeting` se recalcula e o texto na tela acompanha, sem efeito a declarar, sem lista de dependências e sem chamada de re-renderização.

## 3. Executar

O servidor de desenvolvimento do passo 1 já está observando. Basta abrir:

```
http://localhost:9080/my/hello/
```

Digite seu nome e a saudação se atualiza conforme você digita. Isso é a reatividade do $mol: o estado flui para a view por conta própria.

## 4. Adicionar um segundo valor reativo

A reatividade se compõe. Adicione um contador de comprimento que lê o mesmo `name`, sem nenhuma fiação extra.

Coloque-o em `body()`:

```typescript
		body() {
			return [ this.Name(), this.Message(), this.Counter() ]
		}
```

e acrescente as duas propriedades por trás dele:

```typescript
		@ $mol_mem
		Counter() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.counter() ]
			return obj
		}

		counter() {
			return `${ this.name().length } characters`
		}
```

Tanto `greeting` quanto `counter` leem `name`, e ambos se atualizam juntos. Adicione um terceiro, adicione um décimo: a metade reativa nunca muda de forma.

A outra metade muda. Três linhas de lógica chegaram com seis linhas de encanamento em volta — uma fábrica, um `new`, uma seta, um `return obj`. Multiplique isso por cada filho de uma tela de verdade e você tem a razão de existir do `view.tree`.

## 5. Verificar seu build

O MAM escreve um arquivo de diagnóstico ao lado de cada app. Após um build, abra:

```
http://localhost:9080/my/hello/-/web.audit.js
```

Um audit limpo significa nenhuma dependência não utilizada, nenhum problema de tipo, nada a corrigir. Crie o hábito de dar uma olhada — ele pega erros antes que cheguem a um navegador.

## Você construiu um app $mol

Um componente reativo com ligação bidirecional e estado derivado, em um único arquivo, com zero configuração.

Agora pegue esse mesmo arquivo e veja-o encolher: **[De TypeScript para view.tree](#!section=docs/page=from-ts-to-view-tree)**.
