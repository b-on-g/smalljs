# Introdução

## O que é o $mol?

O $mol é um framework de interface reativo: você descreve **o que** a interface é, e o framework descobre **como** e **quando** atualizá-la. Sem DOM virtual, sem assinaturas manuais, sem `useEffect`. Você escreve os componentes como uma árvore; o $mol renderiza apenas o que está visível e recalcula apenas o que de fato mudou.

Um componente tem três arquivos:

- `name.view.tree` — o layout declarativo (uma linguagem de árvore compacta)
- `name.view.ts` — o comportamento (classes TypeScript simples)
- `name.view.css.ts` — os estilos tipados (verificados pelo compilador)

Essa separação é a ideia inteira: o layout permanece legível, a lógica permanece testável, os estilos permanecem seguros em tipos.

## Para quem é?

- Você quer um aplicativo **pequeno** que continue pequeno à medida que cresce — o runtime é compacto e a renderização é virtualizada por padrão.
- Você gosta de **tipos em todo lugar** — até os estilos são verificados pelo TypeScript.
- Você está cansado de conectar a reatividade na mão — o estado no $mol é automaticamente reativo, como uma planilha.

## Uma amostra

Um contador, por inteiro:

```tree
$my_counter $mol_view
	sub /
		<= Count $mol_view
			sub / <= count \
		<= Increment $mol_button
			click? <=> increment?
			sub / <= label \+
```

```typescript
namespace $.$$ {
	export class $my_counter extends $.$my_counter {
		@ $mol_mem count() { return 0 }
		@ $mol_action increment() { this.count( this.count() + 1 ) }
	}
}
```

`count` é reativo: tudo o que o lê é renderizado novamente de forma automática quando ele muda. Não há `setState`, nem array de dependências, nem store para registrar.

## Para onde ir agora?

Pronto para rodar algo na sua própria máquina? Vá para [Primeiros passos](#!section=docs/page=getting-started) e construa um aplicativo funcional em menos de quinze minutos.
