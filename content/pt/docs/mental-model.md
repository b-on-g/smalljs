# Modelo mental

Se você vem de React ou Vue, os primeiros dias no $mol são gastos procurando coisas que não existem: `computed`, `watch`, `useEffect`, `onMounted`, um `fetch` num hook de ciclo de vida. Elas não estão escondidas em algum canto da API; o modelo não tem lugar para elas. Esta página é a versão de cinco minutos desse modelo. Leia-a antes de [Views](#!section=docs/page=views), e volte aqui quando um nome familiar sumir.

## Pull, não push

Nada é calculado até alguém ler. Uma view renderiza lendo suas propriedades; cada propriedade lê o que precisa; a cadeia de dependências se monta sozinha a partir dessas leituras. Não há inscrição a declarar nem `watch` a registrar: a leitura é a inscrição.

```tree
$my_profile $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
```

```typescript
namespace $.$$ {
	export class $my_profile extends $.$my_profile {
		@ $mol_mem
		user() {
			return this.$.$mol_fetch.json( 'https://api.example.com/me' ) as { name: string }
		}
		name() {
			return this.user().name
		}
	}
}
```

Renderizar `Name` lê `name()`, `name()` lê `user()`, `user()` vai à rede. Ninguém contou à view sobre a requisição e ninguém contou à requisição sobre a view. Quando `user()` muda, tudo o que o leu recalcula, e nada mais.

## Sem ciclo de vida

Não há `mounted`, não há `useEffect`, não há `created`. Os dados são pedidos ao ler uma propriedade, e uma view lê suas propriedades quando renderiza. Então o exemplo acima carrega o usuário no momento em que `$my_profile` aparece na tela, e não antes. Quando a view sai da tela, ninguém mais lê `user()`, e a célula é liberada junto com a view.

É isso que substitui por inteiro o padrão «fetch no mount»: a view pede o que precisa, e o framework decide quando pedir. O carregamento não está preso a um evento de página; está preso a estar visível.

## Uma propriedade é uma célula

Um único método com um argumento opcional é, ao mesmo tempo, getter, setter, valor calculado e estado:

```typescript
@ $mol_mem
count( next?: number ) {
	return next ?? 0
}
```

Chamado sem argumento ele lê, chamado com um argumento ele escreve. `@ $mol_mem` transforma o método numa célula em cache que recalcula quando algo que ela leu mudou. Um valor calculado é apenas um método `@ $mol_mem` que lê outros métodos. Um watcher não é necessário: um efeito colateral pertence a um evento, e um manipulador de evento é um método marcado com `@ $mol_action`.

```typescript
@ $mol_mem
doubled() {
	return this.count() * 2
}

@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

[Estado e reatividade](#!section=docs/page=state) cobre as regras do que pode acontecer dentro de cada um dos dois.

## Código síncrono que espera

`user()` acima parece síncrono e está escrito como se a resposta já estivesse ali. Funciona porque toda computação roda dentro de uma fibra. `this.$.$mol_fetch.json()` suspende essa fibra, e o framework reinicia a computação assim que a resposta chega. Até lá, a view que leu `user()` mostra um estado de carregamento; se a requisição falha, essa mesma view mostra o erro. Você não escreve nem uma flag `isLoading` nem um `try`/`catch`.

O mesmo mecanismo serve a qualquer fonte assíncrona. [Busca de dados](#!section=docs/page=data) percorre o recarregamento e o tratamento de erros.

## Tudo é uma sobrescrita

Um arquivo `view.tree` é uma lista de declarações de métodos. Cada linha sob um componente é uma propriedade desse componente com um valor padrão, e a propriedade de qualquer componente aninhado pode ser redefinida bem onde ele é usado, em uma linha. Um placeholder num campo de texto é a propriedade `hint` de `$mol_string`:

```tree
$my_search $mol_view
	sub /
		<= Query $mol_string
			hint \Search
			value? <=> query? \
```

Não há lista de props a estender, nem wrapper a escrever, nem fork a manter. Se um componente tem uma propriedade, você pode defini-la de fora.

## Como ler os fontes

A seção anterior levanta a pergunta de verdade: como você sabe que a propriedade se chama `hint`? A resposta é que você olha, e o framework é feito para que olhar custe pouco.

**Os fontes do framework ficam ao lado dos seus.** No workspace MAM, `mol/string/string.view.tree` está a uma pasta de distância de `my/hello/`. Não está em `node_modules` nem dentro de um bundle; é o mesmo tipo de arquivo que você escreve.

**O nome da classe é o caminho.** `$mol_string` vive em `mol/string/`, `$mol_button_major` em `mol/button/major/`. Todo underscore é um separador de pasta, então um nome na sua árvore sempre pode virar uma pasta para abrir. O suporte a editores da página [Ferramentas](#!section=docs/page=tooling) completa esses nomes para você.

**O `.view.tree` de um componente é a lista completa de suas propriedades, com os padrões.** A forma do valor diz o tipo: `\` inicia uma string, `/` uma lista, `*` um dicionário, um número solto é um número, `true` e `false` são booleanos, `null` significa ausente, e `<=` introduz uma subview ou uma propriedade tomada do proprietário. Eis a parte de `mol/string/string.view.tree` que importa para um campo de entrada:

```tree
$mol_string $mol_view
	dom_name \input
	enabled true
	field *
		^
		disabled <= disabled false
		value <= value_changed? <=> value? \
		placeholder <= hint_visible <= hint \
	attr *
		^
		type <= type? \text
```

Leia em voz alta. `dom_name \input`: este componente renderiza um elemento `input`. `enabled true`: uma propriedade booleana, ligada por padrão. `field *` é o dicionário dos campos do elemento DOM; os nomes à esquerda pertencem ao DOM, os nomes à direita pertencem ao componente, e o mais à direita é o que você define. Então o `placeholder` do DOM vem de `hint`, uma string vazia por padrão; o `value` do DOM é a propriedade gravável `value?`, e o atributo `type` é a gravável `type?`, `text` por padrão. Um placeholder, uma entrada desabilitada e um campo de senha são `hint`, `enabled false` e `type \password` na sua árvore.

**A interface tipada é gerada da mesma árvore.** `mol/string/-view.tree/string.view.tree.d.ts` lista as mesmas propriedades como assinaturas TypeScript, e a [referência de API](#!section=docs/page=api-mol-string) deste site é produzida a partir desse arquivo. Os três concordam porque os três vêm de uma única fonte.

**A maioria dos componentes traz uma pasta `demo/` e um `readme.md`.** `mol/string/demo/demo.view.tree` mostra a entrada com um hint, desabilitada e com um valor pré-definido. Quando você precisa de um componente em algum estado, ache a demo mais próxima dele e copie a linha.

Juntando tudo, um placeholder leva cerca de um minuto:

```bash
ls mol | grep string
cat mol/string/string.view.tree
```

Você vê `hint \` sob `$mol_string`, e escreve `hint \Search` sob o seu próprio `$mol_string`.

## Nomes

Tudo é `snake_case`: os nomes de propriedades em `view.tree`, os nomes de métodos em TypeScript, os atributos que o framework põe nos nós DOM para estilização. Subviews começam com letra maiúscula (`Query`), valores com minúscula (`query`).

O nome na árvore e o nome do método na classe precisam bater letra por letra. `exchange_form` na árvore e `exchangeForm` na classe são duas propriedades sem relação: a da classe nunca é lida, a da árvore mantém seu padrão, e não há erro nenhum para avisar. Quando uma sobrescrita parece não fazer nada, é a primeira coisa a conferir. [Solução de problemas](#!section=docs/page=troubleshooting) lista esse e os outros casos em que a tela está errada e o compilador fica calado.

## Próximo

Com o modelo no lugar, [Views](#!section=docs/page=views) mostra como os componentes são declarados e compostos, e [De React, Vue e Svelte](#!section=docs/page=rosetta) mapeia os nomes que você já conhece nos daqui.
