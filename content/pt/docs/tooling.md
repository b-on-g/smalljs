# Ferramentas

O $mol funciona em qualquer editor, mas um pequeno conjunto de ferramentas torna o `.view.tree` e os estilos tipados bem mais confortáveis: um gerador de projeto, um language server, integrações para os editores Zed e VS Code e uma skill que ensina o framework a assistentes de LLM.

## Gerar um projeto

O `create-view-tree-lsp` gera um módulo $mol pronto para rodar, para você não montar o boilerplate à mão:

```bash
npx create-view-tree-lsp bog/myapp
```

Rode a partir da raiz da sua cópia do MAM: os caminhos de módulo são resolvidos dali, e é lá que o projeto tem de morar. Fora de um workspace o comando avisa, em vez de deixar você descobrir no primeiro build.

O argumento é o caminho do módulo (`namespace/name`, ou o equivalente `bog_myapp`). Ele escreve `view.tree`, `view.ts`, `view.css.ts` e `index.html` de uma app funcional, além das GitHub Actions para fazer o deploy.

Tudo o que o gerador sabe adicionar vem incluído por padrão. Você nomeia apenas o que não quer:

```bash
npx create-view-tree-lsp bog/myapp --no-tauri --no-backend
```

- `--no-baza` — um armazenamento local-first **Giper Baza**
- `--no-docker` — uma configuração **Docker** com `docker-compose.yml` e config do nginx
- `--no-tauri` — uma casca desktop **Tauri**
- `--no-backend` — um backend REST `$mol_server` com armazenamento `node:sqlite` e um tipo de item TypeScript compartilhado
- `--no-prerender`, `--no-seo` — visibilidade para mecanismos de busca, descrita abaixo em [Integração contínua](#!section=docs/page=tooling/Docs.Body=Integra%C3%A7%C3%A3o%20cont%C3%ADnua)

Uma flag desconhecida interrompe a execução, para que um erro de digitação não deixe algo lá calado.

O gerador é um wrapper fino sobre a CLI do language server, então `npx view-tree-lsp create bog/myapp` faz o mesmo diretamente.

## Traduções

As traduções ficam ao lado do seu módulo, em `<módulo>/<nome>.locale=<lang>.json`. Para o código isso é conveniente; para o tradutor, nem tanto: em vez de uma lista de frases, ele recebe trinta arquivos pequenos.

**[$yuf_localizer](https://zerkalica.github.io/yuf/#!demo=yuf_localizer_demo)** resolve essa distância. Aponte-o para as URLs dos seus projetos e os códigos de idioma, e ele mostra todas as chaves em uma única lista pesquisável, marcando o que ainda falta: chaves que só existem em inglês, chaves alteradas mas não salvas, e chaves obsoletas que o projeto já não tem. As traduções ficam no navegador até você exportá-las, então nada se perde entre sessões.

Quando o tradutor terminar, exporte o resultado e distribua-o de volta pelos módulos:

```bash
# a partir da raiz do MAM
npx view-tree-lsp locale bog/myapp/app/- --exclude=mol --update
```

O argumento é uma pasta ou um único arquivo de locale. Opções:

- `--include=` recebe um fragmento de caminho e mantém apenas os módulos cujo caminho o contém; pode repetir quantas vezes quiser
- `--exclude=` faz o contrário e os pula — `--exclude=mol` deixa os pacotes do próprio framework intactos
- `--update` mescla nos arquivos existentes: os valores de entrada vencem e as chaves ausentes na origem permanecem
- `--dry` mostra o plano sem escrever nada

Cada chave carrega o caminho do próprio módulo, então `$my_page_greeting` vai parar em `my/page/page.locale=ru.json`, ao lado dos fontes a que pertence. Descobrir qual é esse módulo, porém, é mais sutil do que parece: `_` separa tanto pastas quanto palavras, então o caminho correspondente mais longo é a resposta errada. Em `$my_page_lang_hint` a propriedade começa com `lang`, e um submódulo real `my/page/lang` ao lado engoliria a chave. Por isso o comando pergunta a cada módulo candidato quais chaves ele declara — o MAM escreve exatamente essas no seu arquivo de locale em `-view.tree` — e entrega a chave a quem é dono dela.

## Integração contínua

O gerador escreve as GitHub Actions em `.github/workflows/`, de modo que um novo projeto faz deploy e release sem configuração extra.

O `deploy.yml` roda a cada push. Ele constrói a app com `hyoo-ru/mam_build`, publica `app/-` no **GitHub Pages** a partir de `main` e dá a cada branch `feature/*` sua própria pasta de pré-visualização — removida automaticamente quando o branch é excluído.

### SEO

Os dois vêm ligados por padrão e os dois disparam em tags `v*`:

- **`--no-prerender`** tira o passo que renderiza as telas que você lista (como `home`) em HTML estático com `b-on-g/mol-prerender-action` — justamente o que faz crawlers e prévias de link verem conteúdo de verdade.
- **`--no-seo`** tira o runtime `$bog_seo`: um roteador por pathname com sitemap, `robots.txt`, `llms.txt` e injeção de meta por página. O job serve o build, despeja o HTML pré-renderizado canônico e o dobra de volta no deploy.

Eles cobrem o mesmo terreno e escrevem na mesma pasta, então só um cai no `deploy.yml`: `$bog_seo` enquanto estiver ligado, e a action de prerender assim que você passar `--no-seo`. Fique com `$bog_seo` quando precisar de sitemaps e metadados por página, e desça para a action de prerender quando um punhado de telas públicas for todo o trabalho.

### Desktop Tauri

Com a opção Tauri, o `tauri.yml` constrói binários desktop em tags `v*` (ou sob demanda) através do workflow reutilizável `b-on-g/tauri-mol-workflow-template`, a partir do mesmo módulo que você faz deploy para a web.

## Language server

O `view-tree-lsp` é uma implementação do Language Server Protocol para o formato `view.tree`. Rode-o sob demanda com npx, sem instalação global:

```bash
npx view-tree-lsp@latest
```

Ele varre seu workspace e dá a qualquer editor compatível com LSP:

- completação para os componentes `$mol_*` e para os componentes e propriedades definidos no seu próprio projeto
- sugestões de propriedades restritas ao componente sob o cursor
- uma estrutura das declarações de componentes para navegação
- atualizações ao vivo conforme os arquivos mudam

Como ele fala LSP, você pode apontar o language client de qualquer editor para `npx view-tree-lsp`. As duas integrações abaixo o conectam para você.

## Zed

A extensão **View Tree Syntax Highlighting for $mol** reúne a gramática tree-sitter, o language server e um tema de ícones opcional. Instale-a pelo gerenciador de extensões do Zed:

1. Abra a paleta de comandos (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Execute **zed: extensions**
3. Busque por `view.tree` ou `mol` e instale a extensão

Você ganha realce de sintaxe, completação e estrutura para arquivos `.view.tree`. O [código-fonte](https://github.com/Dev-cmyser/zed-view.tree-mol-support) e um [tema de ícones](https://github.com/Dev-cmyser/zed-viewtree-icon-theme) correspondente estão no GitHub.

## VS Code

O workspace MAM já traz sua configuração do VS Code. Quando você abre a pasta `mam` clonada, o VS Code se oferece para instalar as extensões recomendadas de `.vscode/extensions.json`:

- `nin-jin.vscode-language-tree` — suporte à linguagem `view.tree`
- `stan-donarise.view-tree-language` — sintaxe e gramática
- `editorconfig.editorconfig` — formatação consistente

A mesma pasta traz `mol.code-snippets`, então os snippets de componentes e bindings ficam disponíveis sem nenhuma configuração extra. Aceite o aviso e os arquivos `.view.tree` e TypeScript são realçados de imediato.

## Skill de LLM

O `mol_skill` dá ao assistente de IA o contexto necessário para escrever $mol: a sintaxe `view.tree`, a estrutura de um módulo MAM, a divisão entre `view.ts` e `view.css.ts`, a modelagem de dados com Giper Baza e o empacotamento com Tauri. Ele vem como uma pasta de skill comum, um fluxo `SKILL.md` mais guias de referência, então qualquer ferramenta de LLM que leia o formato skills consegue carregá-lo, incluindo Claude Code e Cursor. Instale com a CLI skills:

```bash
npx skills add b-on-g/mol_skill --all -g
```

Depois é só perguntar com suas palavras (“estrutura de um módulo MAM”, “CRUD e papéis no Giper Baza”): o assistente abre a referência correspondente antes de responder, e o código que ele escreve segue as convenções desta documentação. O [código-fonte](https://github.com/b-on-g/mol_skill) está no GitHub, e os arquivos de referência se leem muito bem sozinhos, se você preferir percorrê-los por conta própria.

## Links

- Gerador — [create-view-tree-lsp](https://github.com/Dev-cmyser/create-view-tree-lsp)
- Language server — [view-tree-lsp](https://github.com/Dev-cmyser/view.tree)
- Extensão Zed — [zed-view.tree-mol-support](https://github.com/Dev-cmyser/zed-view.tree-mol-support)
- Skill de LLM — [mol_skill](https://github.com/b-on-g/mol_skill)
