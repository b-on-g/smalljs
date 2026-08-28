# Deploy

Um app $mol compilado é uma pasta de arquivos estáticos. Nenhum servidor para rodar, nenhum processo Node para manter vivo, nenhum adaptador para escolher: o que hospeda uma pasta hospeda o app.

## O que você publica

O build escreve tudo na pasta `-/` do módulo:

```
my/hello/-/
├── index.html                 reescrito para o caminho de publicação
├── web.js                     o app inteiro, um arquivo
├── web.css
├── web.locale=en.json         um por idioma
├── manifest.json
└── …                          tudo o que uma diretiva `deploy` copiou para dentro
```

Essa pasta é o site. Sirva-a de qualquer host estático e o app roda.

Todo o resto em `my/hello/` é fonte, e `-/` é gerada: o `.gitignore` do workspace ignora `-*`, então o resultado do build nunca entra no histórico do próprio projeto. Ele chega à web pelo branch de deploy.

## A versão curta

O scaffolder escreve o workflow, então um projeto novo publica no push:

```bash
npx create-view-tree-lsp my/hello
git push
```

`.github/workflows/deploy.yml` compila o módulo e empurra `my/hello/-/` para o branch `gh-pages`. O GitHub serve esse branch assim que **Settings → Pages → Source** estiver em *Deploy from a branch* com `gh-pages` — que é justamente o padrão de um repositório onde esse branch existe. Se a URL devolver 404, é essa a primeira configuração a conferir.

O site passa a viver em `https://<user>.github.io/<repo>/`.

## O que o workflow faz de fato

Duas actions sustentam tudo, e cada uma recebe um par de entradas:

```yaml
- uses: hyoo-ru/mam_build@master2
  with:
      package: "my/hello"     # a pasta a compilar, relativa ao workspace
      modules: "app"          # quais módulos dentro dela

- uses: hyoo-ru/gh-deploy@v4.4.1
  if: github.ref == 'refs/heads/main'
  with:
      folder: "my/hello/app/-"
```

`mam_build` monta o workspace MAM em volta do seu pacote, resolve os tokens `$name` do seu código nos repositórios que os contêm, e compila. Não precisa de lockfile nem de passo `npm install`: a lista de dependências é o registro no `.meta.tree`, como conta [Estrutura do projeto](#!section=docs/page=structure).

`gh-deploy` commita a pasta compilada em `gh-pages`. `target-folder` a coloca em uma subpasta em vez da raiz — é assim que nasce a prévia de um branch:

```yaml
- name: Deploy feature branch
  if: startsWith(github.ref, 'refs/heads/feature/')
  uses: hyoo-ru/gh-deploy@v4.4.1
  with:
      folder: "my/hello/app/-"
      target-folder: ${{ github.ref_name }}
```

Cada branch `feature/*` ganha então uma URL própria no mesmo site do Pages, e um gatilho `delete` remove a pasta quando o branch some.

## Um arquivo de que o deploy precisa

Um pacote que é publicado precisa, ao lado, de um `.gitattributes` com uma única linha:

```
* -text
```

Publicar significa commitar o resultado do build em um branch, e esse resultado não é só texto. Fontes e imagens normalizadas no caminho para esse commit chegam quebradas ao leitor, enquanto o build continua verde. O scaffolder escreve o arquivo; num repositório que você mesmo criou, acrescente-o à mão.

## Arquivos que precisam ficar na raiz do site

`deploy \/path` no `meta.tree` copia um arquivo para `-/` **mantendo o caminho relativo ao workspace**. Isso é certo para assets a que o código se refere, e errado para arquivos que um host procura na raiz. Um `CNAME`, um `robots.txt`, uma página de verificação do search console: esses se copiam num passo do workflow depois do build e antes do passo de deploy.

```yaml
- name: Copy root-level files
  run: cp my/hello/public/CNAME my/hello/app/-/CNAME
```

## Links diretos num host estático

Um app com roteamento por caminho (`/section=docs/page=views` em vez de `#!section=docs`) pede uma coisa ao host: qualquer caminho desconhecido sob o mount precisa devolver o `index.html` do app. Sem isso, o primeiro acesso a um link direto é 404, e só a navegação a partir da home funciona.

O GitHub Pages não tem regras de rewrite, então o caminho passa pelo seu `404.html`: ele é servido para qualquer rota desconhecida, e algumas linhas dentro dele devolvem o endereço ao `index.html`, que o roteador expande na rota real. Copie-o junto ao resultado do build, do mesmo jeito que os arquivos acima.

Os outros hosts dizem isso em uma linha: `try_files $uri /index.html` no nginx, `try_files {path} /index.html` no Caddy, uma regra `/* /index.html 200` na Netlify.

Um app no roteador de hash (o padrão) não precisa de nada disso: o que vem depois do `#` nunca chega ao servidor.

## Conferir antes de dar push

O build é o mesmo localmente e no CI, então um audit verde na sua máquina significa um deploy verde:

```bash
npx mam my/hello/app
cat my/hello/app/-/web.audit.js
```

`Audit passed` é o relatório inteiro. Para ver a coisa de verdade, sirva a pasta com qualquer servidor estático:

```bash
npx serve my/hello/app/-
```

## Além do GitHub Pages

Nada acima é específico do GitHub. A saída é uma pasta, o deploy é uma cópia. Netlify, Cloudflare Pages, S3 atrás de uma CDN, nginx num VPS, uma imagem Docker com a pasta dentro — o passo de build é o mesmo `npx mam my/hello/app`, e o que você envia é `my/hello/app/-`.

Para uma instalação que funcione offline, [Offline](#!section=docs/page=offline) acrescenta o service worker que faz cache do bundle, e a mesma pasta vira um app instalável.
