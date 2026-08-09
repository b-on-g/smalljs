# Widoki

Widok to komponent: węzeł w drzewie interfejsu z własnym układem, zachowaniem i stylami. Ten rozdział omawia, jak widoki są deklarowane, łączone z logiką, komponowane i ponownie używane.

> Jeśli `view.tree` widzisz pierwszy raz: [Z TypeScriptu do view.tree](#!section=docs/page=from-ts-to-view-tree) buduje jeden komponent dwa razy, raz jako ręcznie napisaną klasę i raz jako drzewo, i pokazuje kod, do którego drzewo się kompiluje. Przeczytaj to najpierw, jeśli składnia poniżej wygląda jak nowy język, a nie jak skrót.

## Trzy pliki, jeden komponent

Komponent `$my_card` żyje w `my/card/` i jest opisany przez maksymalnie trzy pliki, każdy z jasnym zadaniem:

- `card.view.tree` — **czym** komponent jest: jego struktura i domyślne powiązania.
- `card.view.ts` — **jak** się zachowuje: metody TypeScript, stan reaktywny.
- `card.view.css.ts` — jak wygląda: typowane style sprawdzane przez kompilator.

Trzymanie struktury, zachowania i stylu osobno jest zamierzone — każdy plik pozostaje mały i czytelny, a układ nigdy nie splata się z logiką.

Żaden z tych trzech nie jest sam w sobie obowiązkowy. Usuń `card.view.tree` i napisz klasę wprost w `namespace $`: struktura staje się zwykłymi metodami, a komponent nadal działa. Reszta rozdziału używa drzewa, bo tak wygląda struktura, gdy hydraulika jest generowana za ciebie.

## Język view.tree

`view.tree` opisuje strukturę deklaratywnie. Wcięcie to zagnieżdżenie; nie ma znaczników zamykających.

```tree
$my_card $mol_view
	sub /
		<= Title $mol_view
			sub / <= title \
		<= Body $mol_view
			sub / <= text \
```

- `$my_card $mol_view` — twój komponent rozszerza bazę `$mol_view`.
- `sub /` — lista dzieci.
- `<= Title $mol_view` — nazwany podwidok, dostępny jako `this.Title()` w TypeScript.
- `<= title \` — powiązywalna właściwość z domyślną wartością surowego ciągu znaków (`\` rozpoczyna surowy ciąg).

Każda nazwa z wielkiej litery (`Title`, `Body`) staje się prawdziwą właściwością, do której możesz sięgnąć, którą możesz nadpisać lub ostylować. Każde powiązanie z małej litery (`title`, `text`) staje się wartością, którą możesz obliczyć w `.view.ts`.

## Powiązywanie właściwości

Dwa operatory łączą właściwość z jej źródłem:

- `<=` **jednokierunkowy**: dziecko czyta wartość od właściciela.
- `<=>` **dwukierunkowy**: wartość płynie w obie strony — używany do pól wejściowych.

```tree-no-run
$my_form $mol_view
	sub /
		<= Field $mol_string
			value? <=> text? \
```

Tutaj `value` pola i `text` właściciela pozostają automatycznie zsynchronizowane: wpisz w pole, a `text` się zaktualizuje; ustaw `text` w kodzie, a pole to odzwierciedli.

## Podłączanie do zachowania

Powiązanie bez wartości domyślnej jest implementowane w `.view.ts`. Klasa rozszerza wygenerowaną bazę o tej samej nazwie:

```typescript
namespace $.$$ {
	export class $my_card extends $.$my_card {
		@ $mol_mem
		title() {
			return 'Untitled'
		}
	}
}
```

Wszystko, co szablon powiązuje — `title`, `text`, właściwość podwidoku — może otrzymać tutaj logikę. Reaktywność ożywia te wartości.

## Atrybuty i typ elementu

Zmień bazowy element HTML za pomocą `dom_name`, a atrybuty ustaw przez `attr`:

```tree
$my_banner $mol_view
	dom_name \section
	attr *
		^
		role \note
```

`^` dziedziczy atrybuty rodzica, byś nie zgubił tych, które `$mol_view` już ustawia.

## Listy i widoki z kluczami

Końcowa `*` zamienia podwidok w rodzinę — jedna instancja na klucz. Użyj do wierszy:

```tree
$my_list $mol_list
	rows /
		<= Row* $mol_view
			sub / <= row_title* \
```

Framework tworzy `Row` dla każdego dostarczonego klucza i, dzięki [wirtualizowanemu renderowaniu](#!section=docs/page=rendering), buduje tylko te na ekranie.

> Gdy widok z kluczem sam zawiera dzieci z kluczami, nadaj klucz zewnętrznemu przez `Name*`, a nie `Name*0` — forma indeksowana pozostawia zagnieżdżone dzieci niewyrenderowane.

## Widoki warunkowe

Przypisanie `null` usuwa widok z renderowania. Utwórz podklasę i wyzeruj to, czego wariant nie potrzebuje:

```tree
$my_page_readonly $my_page
	Edit_button null
```

## Kompozycja i ponowne użycie

Widoki komponują się przez zagnieżdżanie i specjalizują przez rozszerzanie. Karta użyta wewnątrz listy:

```tree
$my_user_card $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
		<= Email $mol_view
			sub / <= email \

$my_users_list $mol_list
	rows /
		<= User* $my_user_card
			name <= user_name* \
			email <= user_email* \
```

`$my_users_list` nigdy nie definiuje na nowo wyglądu karty — używa ponownie `$my_user_card` i zasila każdą instancję jej danymi. To cały model kompozycji: małe widoki, połączone razem, specjalizowane przez `extends`, gdy potrzebny jest wariant.

## Dalej

Widoki opisują strukturę; tym, co je ożywia, są dane reaktywne. Przejdź do [Stan i reaktywność](#!section=docs/page=state).
