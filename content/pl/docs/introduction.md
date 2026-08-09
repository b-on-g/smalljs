# Wprowadzenie

## Czym jest $mol?

$mol to reaktywny framework UI: opisujesz, **czym** jest interfejs, a framework ustala, **jak** i **kiedy** go zaktualizować. Bez wirtualnego DOM, bez ręcznych subskrypcji, bez `useEffect`. Komponenty piszesz jako drzewo; $mol renderuje tylko to, co widoczne, i przelicza tylko to, co faktycznie się zmieniło.

Komponent składa się z trzech plików:

- `name.view.tree` — deklaratywny układ (zwięzły język drzew)
- `name.view.ts` — zachowanie (zwykłe klasy TypeScript)
- `name.view.css.ts` — typowane style (sprawdzane przez kompilator)

Ten podział to cała idea: układ pozostaje czytelny, logika pozostaje testowalna, style pozostają bezpieczne typowo.

Żaden z tych trzech nie jest sam w sobie obowiązkowy. Drzewo to skrót zapisu struktury, którą możesz napisać też ręcznie: [Z TypeScriptu do view.tree](#!section=docs/page=from-ts-to-view-tree) buduje jeden komponent na oba sposoby i pokazuje kod, do którego drzewo się kompiluje.

## Dla kogo jest?

- Chcesz **małą** aplikację, która pozostaje mała w miarę rozwoju — runtime jest zwięzły, a renderowanie domyślnie zwirtualizowane.
- Lubisz **typy wszędzie** — nawet style są sprawdzane przez TypeScript.
- Masz dość ręcznego łączenia reaktywności — stan w $mol jest reaktywny automatycznie, jak w arkuszu kalkulacyjnym.

## Przedsmak

Licznik, w całości:

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

`count` jest reaktywny: wszystko, co go odczytuje, renderuje się ponownie automatycznie, gdy się zmieni. Nie ma `setState`, nie ma tablicy zależności, nie ma magazynu do zarejestrowania.

## Dokąd dalej?

Gotowy uruchomić coś na własnej maszynie? Przejdź do [Szybkiego startu](#!section=docs/page=getting-started) i zbuduj działającą aplikację w mniej niż piętnaście minut.
