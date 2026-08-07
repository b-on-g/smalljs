# Ferramentas

O $mol funciona em qualquer editor, mas um pequeno conjunto de ferramentas torna o `.view.tree` e os estilos tipados bem mais confortáveis: um gerador de projeto, um language server, integrações para os editores Zed e VS Code e uma skill que ensina o framework a assistentes de LLM.

## Gerar um projeto

O `create-view-tree-lsp` gera um módulo $mol pronto para rodar, para você não montar o boilerplate à mão:

```bash
npx create-view-tree-lsp bog/myapp
```

O argumento é o caminho do módulo (`namespace/name`, ou o equivalente `bog_myapp`). Ele escreve `view.tree`, `view.ts`, `view.css.ts` e `index.html` de uma app funcional, além das GitHub Actions para fazer o deploy. Por padrão, também inclui um armazenamento local-first **Giper Baza**, uma configuração **Docker** e uma casca desktop **Tauri**. Desligue qualquer um deles com uma flag:

```bash
npx create-view-tree-lsp bog/myapp --no-baza --no-docker --no-tauri
```

Algumas peças, ao contrário, são opcionais:

- `--backend` adiciona um backend REST `$mol_server` com armazenamento `node:sqlite` e um tipo de item TypeScript compartilhado
- `--prerender` e `--seo` adicionam visibilidade para mecanismos de busca, descrita abaixo em [Integração contínua](#!section=docs/page=tooling/Docs.Body=Integra%C3%A7%C3%A3o%20cont%C3%ADnua)

O gerador é um wrapper fino sobre a CLI do language server, então `npx view-tree-lsp create bog/myapp` faz o mesmo diretamente.

## Integração contínua

O gerador escreve as GitHub Actions em `.github/workflows/`, de modo que um novo projeto faz deploy e release sem configuração extra.

O `deploy.yml` roda a cada push. Ele constrói a app com `hyoo-ru/mam_build`, publica `app/-` no **GitHub Pages** a partir de `main` e dá a cada branch `feature/*` sua própria pasta de pré-visualização — removida automaticamente quando o branch é excluído.

### SEO

Duas opções independentes, ambas acionadas por tags `v*`:

- **`--prerender`** renderiza as telas que você listar (como `home`) em HTML estático com `b-on-g/mol-prerender-action`, para que crawlers e prévias de link vejam conteúdo real.
- **`--seo`** adiciona o runtime `$bog_seo`: um roteador por pathname com sitemap, `robots.txt`, `llms.txt` e injeção de meta por página. O job serve o build, exporta o HTML pré-renderizado canônico e o reincorpora no deploy.

Recorra à prerender action quando um punhado de telas públicas precisar ser rastreável, e ao `$bog_seo` quando você precisar de sitemaps e metadados por página.

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
