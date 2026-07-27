# Lançamentos

$mol é entregue **continuamente**. Em vez de cortar versões numeradas, o framework é distribuído direto do monorepo [mam_mol](https://github.com/hyoo-ru/mam_mol) — cada mudança mesclada fica imediatamente disponível para quem desenvolve com ele. A ferramenta de build MAM sempre puxa os fontes atuais, então não há passo de atualização nem matriz de versões para conciliar.

## Acompanhando mudanças

- **Histórico de commits** — os [commits do mam_mol](https://github.com/hyoo-ru/mam_mol/commits/master) são o changelog canônico.
- **Histórico por módulo** — cada pasta de componente no GitHub carrega seu próprio log de commits, então você pode acompanhar apenas as partes que usa.
- **Comunidade DEV** — adições e artigos notáveis são compartilhados sob a [tag #mol](https://dev.to/t/mol).

## O que isso significa na prática

Como não há fronteiras de lançamento que quebram, o framework favorece uma evolução retrocompatível: componentes ganham recursos sem serem renomeados, e as interfaces tipadas `view.tree` fazem as incompatibilidades surgirem em tempo de compilação em vez de em tempo de execução. Se um build parar de compilar após uma atualização, os erros do TypeScript apontam direto para o que mudou.
