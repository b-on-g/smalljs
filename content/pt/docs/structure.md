# Estrutura do projeto

Um projeto $mol tem quatro níveis aninhados: o **workspace** que você clonou, os **pacotes** dentro dele, os **módulos** dentro desses, e os **arquivos** dentro de um módulo. Cada nível responde a uma pergunta diferente, e boa parte do que a build faz decorre de saber qual é qual.

```
mam/                            workspace — o checkout do MAM
├── .meta.tree                  registro: qual pacote vem de qual repositório
├── package.json
├── mol/                        pacote — o framework, um repositório git próprio
│   └── button/                 módulo — o componente $mol_button
│       ├── button.view.tree
│       ├── button.view.ts
│       ├── major/              submódulo — $mol_button_major
│       └── minor/              submódulo — $mol_button_minor
└── my/                         pacote — o seu
    ├── .gitattributes          `* -text` — mantém intactos os binários gerados
    └── hello/                  módulo — o componente $my_hello
        ├── index.html          ponto de entrada (só em módulos de aplicação)
        ├── hello.view.tree     layout
        ├── hello.view.ts       comportamento
        ├── hello.view.css.ts   estilos, em TypeScript
        ├── hello.locale=ru.json
        ├── hello.meta.tree     diretivas de build e de deploy
        ├── form/               submódulo — $my_hello_form
        ├── -view.tree/         gerado a partir de hello.view.tree
        └── -/                  saída da build
```

## Workspace

Você clona o MAM uma vez e trabalha dentro dele. Não é uma pasta para onde as dependências são copiadas: cada pacote fica ali como um checkout git próprio, com histórico, então você pode ler o código-fonte do framework, colocar um `debugger` nele e abrir um pull request a partir da mesma cópia de trabalho.

O `.meta.tree` da raiz é o registro que faz isso funcionar:

```tree
pack mol git \https://github.com/hyoo-ru/mam_mol.git
pack hyoo git \https://github.com/hyoo-ru/mam_hyoo.git
pack lib git \https://github.com/hyoo-ru/mam_lib.git
```

Quando a build encontra `$mol_view` e ainda não existe uma pasta `mol/`, ela procura o nome aqui e clona o repositório. Nada é vendorizado e nada é achatado.

## Pacotes

Uma pasta de primeiro nível é um pacote, e um pacote é um repositório git. O seu próprio pacote é só uma pasta que você nomeia: enquanto ficar local, não precisa de registro nenhum, e de uma linha `pack` no dia em que você quiser buscá-lo pelo nome.

Pacotes se aninham. Um pacote pode carregar suas próprias declarações `pack` para as pastas dentro dele, e o MAM as lê do `meta.tree` da pasta que vai conter o pacote. Este site vive em `bog/smalljs/` e é um repositório à parte, listado em `bog/bog.meta.tree`, que por sua vez está dentro do checkout `bog/` listado no `.meta.tree` da raiz.

### Um arquivo de que todo pacote precisa

Um pacote que é deployado precisa de um `.gitattributes` com uma única linha:

```
* -text
```

Isso desliga a normalização de fim de linha do git. Importa porque deploy significa commitar a saída da build em um branch, e essa saída não é só texto: este site leva 57 arquivos binários, as fontes que ele mesmo hospeda e uma imagem de preview por página. Normalizados na entrada, eles chegam ao leitor como imagens e fontes quebradas, enquanto a própria build continua verde. O checkout do MAM tem o mesmo arquivo na raiz, onde os formatos de fonte estão adicionalmente marcados como `binary`.

O gerador o escreve para você; num repositório que você mesmo começou, adicione-o à mão.

## Módulos

Um módulo é uma pasta, e uma pasta é um componente. Não há instrução de import nem mapa de módulos: o nome da classe *é* o endereço, e cada sublinhado nele é um separador de pastas:

```
$my_hello          →  my/hello/
$my_hello_form     →  my/hello/form/
$mol_button_major  →  mol/button/major/
$mol_after_frame   →  mol/after/frame/
```

Essa é toda a regra de resolução. O builder varre o seu texto-fonte atrás de tokens `$name`, quebra cada um em `_` e percorre as pastas. Nada declara uma dependência; usar um nome é a declaração.

A consequência prática: **nomes de pastas de módulos nunca contêm sublinhado.** Uma pasta chamada `my/hello_form/` seria procurada em `my/hello/form/` e nunca encontrada — o sintoma é uma classe que compila no seu editor mas some do bundle.

Um módulo que tem submódulos ainda pode ser um componente ele mesmo, em uma de duas formas. `$mol_button` vive diretamente em `mol/button/`, ao lado de `major/` e `minor/`. `$mol_view` vive um nível abaixo, em `mol/view/view/`, porque `mol/view/` também abriga `component/`, `selection/` e `tree2/`. O MAM tenta primeiro o caminho duplicado e recai no mais curto, então os dois arranjos resolvem.

## Arquivos em um módulo

Todo arquivo é opcional. Um módulo é o conjunto de arquivos que por acaso está nele.

| Arquivo | Função |
|------|---------|
| `hello.view.tree` | Layout declarativo |
| `hello.view.ts` | Comportamento: a classe que estende a base gerada |
| `hello.view.css.ts` | Estilos tipados. Repare no `.ts` no fim: é TypeScript chamando `$mol_style_define`, não uma folha de estilo |
| `hello.ts` | Um módulo sem view nenhuma — modelos, utilitários, lógica pura |
| `hello.test.ts` | Testes, executados pelo builder |
| `hello.locale=ru.json` | Traduções; qualquer arquivo terminado em `.locale=<lang>.json` é recolhido |
| `hello.meta.tree` | Diretivas de build e de deploy |
| `index.html` | Ponto de entrada — só um módulo de aplicação precisa de um |

Um sufixo antes da extensão restringe um arquivo a um ambiente:

- `frame.web.ts` — só o bundle de browser, como `mol/after/frame/frame.web.ts`
- `build.node.ts` — só o bundle Node, como o próprio builder do MAM
- `hello.test.ts` — só bundles de teste

O builder produz um bundle `web` e um `node` para cada aplicação e descarta os arquivos marcados para o outro, de modo que código de plataforma nunca precisa se proteger em tempo de execução.

Arquivos `.css` crus também são aceitos ao lado de um módulo — o framework os usa para as poucas coisas que estilos tipados não conseguem expressar, como `@keyframes` e `content:`. Todo o resto pertence a `.view.css.ts`, onde os nomes das propriedades são verificados.

## Pastas geradas começam com um hífen

O MAM só trata um nome como fonte se ele começa com letra ou dígito. Qualquer outra coisa é invisível para a build, e é por isso que toda pasta gerada leva o prefixo `-`: a saída pode ficar bem ao lado da sua entrada sem ser lida de volta como entrada. O `.gitignore` do workspace ignora `-*` pela mesma razão.

**`-view.tree/`** aparece ao lado de qualquer arquivo `.view.tree` e guarda aquilo em que a árvore é compilada:

```
my/hello/-view.tree/
├── hello.view.tree.js            a classe base gerada
├── hello.view.tree.d.ts          sua interface tipada
└── hello.view.tree.locale=en.json  as strings @, extraídas
```

Seu `hello.view.ts` estende a classe que está ali dentro. Essa é toda a relação entre os dois arquivos — [De TypeScript para view.tree](#!section=docs/page=from-ts-to-view-tree) percorre o código gerado linha a linha.

**`-css/`** aparece ao lado de um arquivo `.css` cru e guarda um `.ts` gerado que envolve a folha de estilo numa chamada a `$mol_style_attach`, para que ela viaje com o bundle em vez de exigir um `<link>`.

**`-/`** é a saída da build de um módulo que você construiu. Para uma aplicação, ela contém `web.js`, `web.css`, `web.audit.js`, `web.d.ts`, `web.deps.json`, um `web.locale=<lang>.json` por idioma, os equivalentes `node`, um `index.html` reescrito, e um `package.json` e um `manifest.json` gerados. Essa pasta é o que você deploya: publicar `app/-` num host estático é a etapa inteira de deploy.

Nenhum deles é editado à mão. O builder os reescreve sempre que a fonte muda, então uma edição ali desaparece no próximo save, sem nenhum erro que explique o porquê. Mude o `.view.tree`, o `.css` ou os fontes, e reconstrua.

## O que o meta.tree realmente faz

`meta.tree` não é um manifesto de pacote e não lista dependências — essas vêm do código, onde um token `$mol_view` já é a declaração inteira. Ele carrega o punhado de coisas que o código não consegue declarar sozinho. O `app/app.meta.tree` deste site é o arquivo completo:

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

- **`deploy \/path`** copia um arquivo ou pasta para dentro de `-/`, preservando o caminho relativo ao workspace: `\/bog/smalljs/assets` cai em `app/-/bog/smalljs/assets/`. Para arquivos estáticos que o deploy precisa levar mas que código nenhum importa: imagens, fontes, ícones.
- **`include \/path`** e **`require \/path`** forçam a entrada de um módulo que nada referencia, como `\/mol/offline/install`, cujo propósito inteiro é o service worker que ele registra ao carregar. Diferem só na ordem: `require` põe o módulo antes do código que o puxou, `include` depois.
- **`pack <name> git \<url>`** é a entrada de registro descrita acima, lida do arquivo meta da pasta que vai conter o pacote.

O MAM lê todo arquivo `*.meta.tree` de uma pasta, então o nome não carrega significado além da convenção: `<module>.meta.tree` ao lado de um módulo, `.meta.tree` na raiz do workspace.

Na prática, `deploy`, `include` e `require` pertencem ao módulo de aplicação, já que é ele que está sendo construído e deployado; componentes comuns resolvem tudo a partir do próprio código e não precisam de arquivo meta algum. Um módulo de biblioteca só ganha um quando tem de fato uma dependência não referenciada: `mol/assert/assert.meta.tree` é uma única linha `include \/mol/dev/format`, e esse é um tamanho típico.

Veja [Metadados de módulo](#!section=docs/page=meta) para mais sobre as diretivas.

## Próximo

[Instalação](#!section=docs/page=installation) cobre o dev server e a build de produção, e [Ferramentas](#!section=docs/page=tooling) traz um gerador que escreve para você um layout de módulo correto.
