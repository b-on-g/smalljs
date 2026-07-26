# Primeiros passos

Esta página leva você de uma pasta vazia até um app $mol reativo e em execução. Deve levar cerca de quinze minutos. Cada trecho abaixo é código real e funcional — copie-o como está.

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

Agora adicione três arquivos dentro de `my/hello/`.

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

### hello.view.tree — o layout

```tree
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

Algumas coisas que vale a pena nomear.

- `$mol_page` e `$mol_string` são componentes embutidos — uma casca de página e uma entrada de texto.
- `<=` liga uma propriedade em um sentido; `<=>` liga nos dois sentidos. Então `value? <=> name?` mantém a entrada e seu estado `name` sincronizados.
- `@` marca uma string localizável; `\` inicia uma string bruta.

### hello.view.ts — o comportamento

```typescript
namespace $.$$ {
	export class $my_hello extends $.$my_hello {
		@ $mol_mem
		greeting() {
			const name = this.name()
			return name ? `Hello, ${name}!` : 'Please enter your name'
		}
	}
}
```

`@ $mol_mem` torna `greeting` uma propriedade reativa e cacheada. Ela lê `name()`, então no momento em que `name` muda, `greeting` recalcula e a mensagem na tela é atualizada. Você nunca escreveu uma assinatura, um efeito ou uma chamada de re-renderização.

## 3. Executar

O servidor de desenvolvimento do passo 1 já está observando. Basta abrir:

```
http://localhost:9080/my/hello/
```

Digite seu nome — a saudação se atualiza conforme você digita. Isso é a reatividade do $mol: o estado flui para a view por conta própria.

## 4. Adicionar um segundo valor reativo

A reatividade se compõe. Adicione um contador de comprimento que depende do mesmo `name`, sem nenhuma fiação extra.

Em `hello.view.tree`, adicione uma linha abaixo de `Message`:

```tree
		<= Counter $mol_view
			sub / <= counter \
```

Em `hello.view.ts`, adicione o método:

```typescript
		@ $mol_mem
		counter() {
			return `${this.name().length} characters`
		}
}
```

Tanto `greeting` quanto `counter` leem `name`; ambos se atualizam juntos. Adicione um terceiro, adicione um décimo — o padrão não muda. É por isso que o código $mol permanece plano à medida que os recursos se acumulam.

## 5. Verificar seu build

O MAM escreve um arquivo de diagnóstico ao lado de cada app. Após um build, abra:

```
http://localhost:9080/my/hello/-/web.audit.js
```

Um audit limpo significa nenhuma dependência não utilizada, nenhum problema de tipo, nada a corrigir. Crie o hábito de dar uma olhada — ele pega erros antes que cheguem a um navegador.

## Você construiu um app $mol

Você tem um componente reativo, ligação bidirecional e estado derivado — com três arquivos pequenos e zero configuração.

Continue: o **[Guia](#!section=docs/page=installation)** cobre em profundidade instalação, views, estado, roteamento e dados — e transforma este Hello World em algo real.
