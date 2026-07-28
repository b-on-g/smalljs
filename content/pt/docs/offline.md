# Offline

Um app $mol pode continuar funcionando sem rede — abra-o uma vez online e ele permanece utilizável depois que você fica offline, chegando à instalação como PWA. Isso vem de um único módulo embutido, `mol/offline/install`, e é independente de qualquer camada de dados.

## O que faz

`mol/offline/install` executa `$mol_offline`, que registra um **service worker** (`web.js`) como proxy de cache. Cada `GET` bem-sucedido de um recurso estático — o bundle do app, estilos, imagens — é armazenado em um cache chamado `$mol_offline`. Em um carregamento posterior, o worker serve essas respostas direto do cache, de modo que o app abre instantaneamente e sobrevive a um erro HTTP ou conexão perdida recorrendo à cópia em cache. Como o app inteiro é cacheável e servido assim, o navegador pode oferecer **instalá-lo como PWA**.

## Como habilitar

Adicione uma linha ao `*.meta.tree` do seu app:

```tree
include \/mol/offline/install
```

Esse include forçado puxa o módulo para o bundle, de modo que seu service worker se registra como efeito colateral — nenhum outro código precisa referenciá-lo. Para como o `include` funciona, veja [Metadados de módulo](#!section=docs/page=meta).

Dois requisitos do navegador em tempo de execução:

- Sirva por **HTTPS** (ou `localhost` em desenvolvimento) — caso contrário os service workers se recusam a rodar.
- Forneça um manifesto de web app para que o app seja instalável.

## O que *não* é

O cache offline mantém *um* cliente funcionando sem rede. Ele **não** sincroniza dados entre clientes: requisições com query string passam direto, e requisições não-`GET` nunca são cacheadas. Quando vários clientes ou dispositivos precisam compartilhar os mesmos dados ao vivo e editáveis — com mesclagens sem conflito — isso é outra questão, tratada pelo projeto separado [Giper Baza](#!section=docs/page=giper-baza).
