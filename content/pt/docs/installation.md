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

Referencie um pacote com `require` e o MAM o instala na próxima compilação:

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

## Próximo

Com o espaço de trabalho pronto, aprenda como a própria interface é descrita — continue para [Views](#!section=docs/page=views).
