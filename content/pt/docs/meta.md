# Metadados de módulo

Ao lado dos componentes de um módulo, um arquivo `name.meta.tree` declara **metadados de build e deploy** — coisas que dizem respeito ao módulo como um todo, e não a uma vista específica. O módulo do app é o lugar habitual para isso.

Aqui está o `app.meta.tree` deste site:

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

## Diretivas

- **`deploy \/path`** — copia o arquivo ou pasta indicados para a saída de build de produção. Use-o para ativos estáticos que o deploy deve carregar mas que nenhum código importa — imagens, fontes, ícones. Aqui `\/bog/smalljs/assets` envia o logo e outros arquivos sob `assets/`.
- **`require \/path`** — força um módulo no bundle mesmo quando nenhum código o referencia, para o caso em que o código desse módulo precisa rodar **antes** do código do módulo que contém este `meta.tree`. Ele é incluído como uma dependência normal, de alta prioridade. Um caminho de módulo (`\/mol/wire/patch`) ou um único arquivo, ambos funcionam.
- **`include \/path`** — a mesma inclusão forçada, mas para quando a ordem de carregamento não importa. O módulo é incluído mas despriorizado, então carrega depois do código que depende dele. Exemplos: `include \/mol/offline/install` (registra um service worker como efeito colateral) e `include \/bog/builderui/theme.css` (uma folha de estilo bruta).
- **`pack <name> git \<url>`** — mapeia um namespace para o repositório git de onde o MAM o busca, por ex. `pack mol git \https://github.com/hyoo-ru/mam_mol.git`. É assim que `$mol_*`, `$hyoo_*` e seus próprios pacotes se resolvem em código real.

Por que forçar uma inclusão? O builder descobre as dependências automaticamente e inclui no bundle apenas o que seu código realmente usa. Ocasionalmente você precisa de um módulo que seu código *não* referencia — por exemplo um app que inclui um catálogo inteiro de componentes para que existam em tempo de execução. `require` e `include` cobrem exatamente esse caso; diferem apenas na ordem de carregamento.

## Onde vive

As declarações `pack` pertencem ao `.meta.tree` da **raiz do workspace** — esse é o registro de cada pacote que o workspace pode buscar. Mantenha-as lá, não nos submódulos; o `meta.tree` próprio de um submódulo deve carregar apenas os `require`/`include`/`deploy` específicos dele.
