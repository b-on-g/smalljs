# Instalação

[Primeiros passos](#!section=docs/page=getting-started) o conduz passo a passo pelo seu primeiro aplicativo. Esta página é a referência: como um projeto $mol é organizado e como a compilação funciona.

## Requisitos

- **Node.js 18+** e **git**. Nada mais é instalado globalmente.

## O espaço de trabalho MAM

Os aplicativos $mol vivem dentro do **MAM** — a ferramenta de build e o registro de módulos. Você o clona uma vez e desenvolve seus módulos dentro dele:

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` executa um servidor de desenvolvimento com observação em `http://localhost:9080/`. Ele recompila ao salvar e resolve as dependências automaticamente — você nunca mantém uma configuração de bundler.

## Como os módulos são nomeados

Cada nome de componente corresponde a um caminho de pasta, e **cada sublinhado é um separador de pastas**:

```
$my_app          →  my/app/
$my_app_header   →  my/app/header/
```

Nomes de pastas de módulos nunca contêm sublinhado — use pastas aninhadas para nomes de várias palavras. Se um componente que você usa nunca aparece no bundle, quase sempre o caminho da pasta não corresponde ao nome da classe.

## Anatomia de um módulo

Um componente é uma pasta com até quatro arquivos:

| Arquivo | Finalidade |
|------|------|
| `name.view.tree` | Layout declarativo |
| `name.view.ts` | Comportamento (TypeScript) |
| `name.view.css.ts` | Estilos tipados |
| `name.view.tree`, `index.html` | Ponto de entrada de um módulo de aplicativo |

O `index.html` de um aplicativo monta o componente raiz:

```html
<body mol_view_root>
	<div mol_view_root="$my_app"></div>
	<script src="web.js"></script>
</body>
```

## Compilando para produção

O servidor de desenvolvimento compila em tempo real, mas você pode compilar qualquer módulo explicitamente a partir da raiz do espaço de trabalho:

```bash
npm run start my/app
```

A saída fica em `my/app/-/` — incluindo `web.js`, `web.css` e `web.audit.js`. **Sempre verifique a auditoria:** um `web.audit.js` limpo significa nenhuma dependência não utilizada e nenhum erro de tipo.

## Adicionando pacotes npm

Referencie um pacote com `require` e o MAM o instala na próxima compilação e o coloca no bundle:

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

### Carregando um pacote em tempo de execução

Uma biblioteca pesada de que só uma tela precisa não tem de ficar em `web.js`. Entregue o arquivo pronto para navegador ao lado do bundle e carregue-o no primeiro uso.

Liste o arquivo no `meta.tree` do módulo:

```tree
deploy \/node_modules/@turf/turf/turf.min.js
```

`deploy` instala o pacote se ele faltar e copia o arquivo para `-/node_modules/@turf/turf/turf.min.js`, tanto no servidor de desenvolvimento quanto na compilação de produção. Carregue-o com `$mol_import.script`:

```typescript
namespace $ {
	export class $my_app_turf extends $mol_object {

		@ $mol_mem
		static api() {
			$mol_import.script( './node_modules/@turf/turf/turf.min.js' )
			return ( globalThis as any ).turf as typeof import(
				'@turf/turf'
			)
		}

	}
}
```

- O caminho é relativo e é resolvido a partir da página em `-/`, então o mesmo código funciona no servidor de desenvolvimento, em `test.html` e num deploy sob um subcaminho. Um `/` inicial só funciona enquanto a aplicação está na raiz do domínio.
- `$mol_import.script` suspende a fibra até o script carregar e faz cache por URL: o arquivo é baixado uma vez, e tudo que lê `$my_app_turf.api()` dentro de `$mol_mem` simplesmente espera por ele.
- O nome global, aqui `turf`, é o que o build para navegador da biblioteca atribui. O README dela diz qual é.
- `typeof import( … )` dá tipagem completa. Mantenha o nome do pacote numa linha própria: o builder trata `require( '…' )` e `import( '…' )` escritos numa só linha como dependência e acabaria colocando o pacote inteiro em `web.js`.

## Próximo

Com o espaço de trabalho pronto, aprenda como a própria interface é descrita — continue para [Views](#!section=docs/page=views).
