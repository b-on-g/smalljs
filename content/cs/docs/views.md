# Pohledy

Pohled je komponenta: uzel ve stromu UI s vlastním rozvržením, chováním a styly. Tato kapitola popisuje, jak se pohledy deklarují, propojují s logikou, skládají a znovu používají.

## Tři soubory, jedna komponenta

Komponenta `$my_card` žije v `my/card/` a je popsána až třemi soubory, každý s jasným úkolem:

- `card.view.tree` — **co** komponenta je: její struktura a výchozí vazby.
- `card.view.ts` — **jak** se chová: metody v TypeScriptu, reaktivní stav.
- `card.view.css.ts` — jak vypadá: typované styly kontrolované překladačem.

Oddělení struktury, chování a stylu je záměrné — každý soubor zůstává malý a čitelný a rozvržení se nikdy neproplétá s logikou.

## Jazyk view.tree

`view.tree` popisuje strukturu deklarativně. Odsazení znamená vnoření; nejsou žádné uzavírací značky.

```tree
$my_card $mol_view
	sub /
		<= Title $mol_view
			sub / <= title \
		<= Body $mol_view
			sub / <= text \
```

- `$my_card $mol_view` — vaše komponenta rozšiřuje základní `$mol_view`.
- `sub /` — seznam potomků.
- `<= Title $mol_view` — pojmenovaný podpohled, dostupný jako `this.Title()` v TypeScriptu.
- `<= title \` — navazatelná vlastnost s výchozí hodnotou syrového řetězce (`\` zahajuje syrový řetězec).

Každý název s velkým počátečním písmenem (`Title`, `Body`) se stává skutečnou vlastností, ke které se můžete dostat, přepsat ji nebo ostylovat. Každá vazba s malým písmenem (`title`, `text`) se stává hodnotou, kterou můžete vypočítat v `.view.ts`.

## Navazování vlastností

Dva operátory spojují vlastnost s jejím zdrojem:

- `<=` **jednosměrný**: potomek čte hodnotu od vlastníka.
- `<=>` **obousměrný**: hodnota teče oběma směry — používá se pro vstupy.

```tree-no-run
$my_form $mol_view
	sub /
		<= Field $mol_string
			value? <=> text? \
```

Zde zůstávají `value` vstupu a `text` vlastníka automaticky synchronizované: napište do pole a `text` se aktualizuje; nastavte `text` v kódu a pole to odrazí.

## Propojení s chováním

Vazba bez výchozí hodnoty se implementuje v `.view.ts`. Třída rozšiřuje vygenerovaný základ stejného názvu:

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

Cokoli, co šablona naváže — `title`, `text`, vlastnost podpohledu — může zde dostat logiku. Reaktivita tyto hodnoty oživuje.

## Atributy a typ elementu

Změňte podkladový HTML element pomocí `dom_name` a atributy nastavte přes `attr`:

```tree
$my_banner $mol_view
	dom_name \section
	attr *
		^
		role \note
```

`^` zdědí atributy rodiče, abyste nepřišli o ty, které `$mol_view` už nastavuje.

## Seznamy a klíčované pohledy

Koncová `*` promění podpohled v rodinu — jedna instance na klíč. Použijte ji pro řádky:

```tree
$my_list $mol_list
	rows /
		<= Row* $mol_view
			sub / <= row_title* \
```

Framework vytvoří `Row` pro každý klíč, který dodáte, a díky [virtualizovanému vykreslování](#!section=docs/page=rendering) sestaví jen ty na obrazovce.

> Když klíčovaný pohled sám obsahuje klíčované potomky, oklíčujte vnější přes `Name*`, ne `Name*0` — indexovaná forma nechá vnořené potomky nevykreslené.

## Podmíněné pohledy

Přiřazení `null` odebere pohled z vykreslování. Vytvořte podtřídu a vynulujte to, co varianta nepotřebuje:

```tree
$my_page_readonly $my_page
	Edit_button null
```

## Skládání a znovupoužití

Pohledy se skládají vnořováním a specializují rozšiřováním. Karta použitá uvnitř seznamu:

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

`$my_users_list` nikdy znovu nedefinuje, jak karta vypadá — znovu použije `$my_user_card` a každé instanci předá její data. To je celý model skládání: malé pohledy, propojené dohromady, specializované přes `extends`, když je potřeba varianta.

## Dále

Pohledy popisují strukturu; tím, co je oživuje, jsou reaktivní data. Pokračujte na [Stav a reaktivita](#!section=docs/page=state).
