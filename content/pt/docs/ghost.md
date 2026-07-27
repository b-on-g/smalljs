# Vistas fantasma

`$mol_ghost` é uma vista **sem nó**. Em vez de criar seu próprio elemento DOM, ela toma emprestado o elemento do seu `Sub()` e mescla nele seus próprios atributos, estilos e comportamento. Em uma linha do código-fonte: *«mesclar a lógica da vista ao nó DOM de outro componente.»*

```tree
$mol_ghost $mol_view
	Sub $mol_view
```

Uma `$mol_view` normal renderiza seu próprio elemento. Uma fantasma não renderiza **nenhum** — ela reutiliza o elemento do filho, então nada extra é adicionado à árvore DOM.

## Quando recorrer a ela

Use uma fantasma quando quiser anexar comportamento a um componente existente *sem* envolvê-lo em outro elemento — arrastar, soltar, seguir-ao-rolar, transições. Vários componentes do framework se baseiam nela:

- **`$mol_drag`** / **`$mol_drop`** — arrastar e soltar com o ponteiro
- **`$mol_transit`** — transições de entrada/saída
- **`$mol_follower`** — mantém um elemento alinhado a outro enquanto ele rola
- **`$mol_book_page`** — uma página dentro da navegação `$mol_book2`

## Relação com plugins

`$mol_plugin` — a base que todo [plugin](#!section=docs/page=plugins) estende — é sem elemento pela mesma razão: ele aumenta o elemento do host em vez de adicionar um. Uma fantasma é a forma geral (envolver um filho e assumir seu nó); um plugin é a forma especializada que você lista sob `plugins /`.
