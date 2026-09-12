# Rozwiązywanie problemów

Każdy wpis na tej stronie ma ten sam kształt: build jest zielony, audyt czysty, konsola milczy, a ekran jest pusty albo pokazuje nie to, o co ci chodziło. Kompilator nie widzi tych pomyłek, bo każda z nich to poprawny program, który akurat opisuje inny komponent. Znajdź nagłówek brzmiący jak to, co widzisz; pod nim jest przyczyna i naprawa.

## Nadpisanie właściwości nic nie robi i nie ma błędu

Nazwa w `view.tree` i nazwa metody w klasie różnią się, najczęściej wielkością liter: `exchange_form` w drzewie, `exchangeForm` w klasie. To dwie właściwości. Tej z klasy nikt nie wywołuje, ta z drzewa zostaje przy wartości domyślnej i nic tego nie zgłasza.

Nazwy wszędzie są w `snake_case` i muszą zgadzać się co do litery. Po edycji `.view.ts` sprawdź, czy każde nadpisanie nadal nazywa istniejącą właściwość; wygenerowany `-view.tree/*.view.tree.d.ts` obok drzewa to lista do porównania.

## Potrzebuję placeholdera, wyłączenia albo typu pola wejściowego

To właściwości `$mol_string`: `hint` na placeholder, `enabled` na stan wyłączenia, `type` na typ pola. Ustaw je tam, gdzie pole jest użyte:

```tree
<= Password $mol_string
	hint \Password
	type \password
	enabled <= can_edit true
	value? <=> password? \
```

Każdą inną właściwość dowolnego innego komponentu znajduje się tak samo: otwórz jego `.view.tree`, jak pokazuje [Jak czytać źródła](#!section=docs/page=mental-model/Docs.Body=Jak%20czyta%C4%87%20%C5%BAr%C3%B3d%C5%82a).

`attr *` służy do prawdziwych atrybutów DOM, których komponent jeszcze nie modeluje, i ma własną pułapkę: blok bez `^` w pierwszej linii zastępuje cały słownik atrybutów bazy, więc `$mol_button` napisany w ten sposób traci `disabled`, `role` i `tabindex`. Zacznij blok od `^`, żeby odziedziczyć, a potem dodaj swoje klucze:

```tree
attr *
	^
	data_kind \primary
```

## Słowo renderuje się po literach

Ciąg znaków trafił tam, gdzie oczekiwana jest lista, i został rozłożony znak po znaku. Ciągi zaczynają się od `\`, listy od `/`. Typowy przypadek to `sub`, które jest listą:

```tree
sub / <= label \Hello
```

## Ekran jest pusty, a testy zielone

Nadpisanie wypadło z `.view.ts`. Drzewo daje każdej właściwości wartość domyślną, więc gdy klasa przestaje definiować `rows()` na nowo, TypeScript jest zadowolony, a lista renderuje się pusta. Testy sprawdzające sam model zostają zielone, bo z modelem wszystko jest w porządku.

Dla każdego nadpisania, od którego zależy ekran, napisz test czytający to, co widzi użytkownik: `rows()`, `sub()`, `title()` podwidoków albo DOM. [Testowanie](#!section=docs/page=testing) pokazuje oba sposoby.

## Dane nigdy się nie ładują, komponent zawisł w stanie ładowania

Metoda `@ $mol_mem` zwróciła jako wartość obietnicę: `fetch( uri ).then( ... )`, metodę `async` albo wynik `$mol_wire_async( this ).load()`. Obietnica w komórce czyta się dla wszystkich jako „wciąż liczę”, a gdy się rozwiąże, komórka przelicza się i produkuje świeżą obietnicę. Sieć działa; widok nigdy nie zobaczy wyniku.

Właściwy kształt jest synchroniczny: wywołaj `this.$.$mol_fetch.json( uri )` wewnątrz komórki i zwróć sparsowaną wartość. Włókno zawiesza się do nadejścia odpowiedzi, a potem uruchamia komórkę jeszcze raz, więc obietnica w ogóle nie pojawia się w twoim kodzie. Tam, gdzie praca asynchroniczna musi dziać się gdzie indziej, odłóż jej wynik do osobnej komórki stanu, a efekt niech zwraca flagę albo klucz, nigdy obietnicę.

Druga przyczyna to połknięty błąd: `try`/`catch` wewnątrz komórki, który łapie zawieszenie razem z prawdziwymi awariami. Przerzuć dalej wszystko, co jest `Promise`, albo użyj `$mol_fail_catch`, które robi to sprawdzenie za ciebie.

## Cykliczna subskrypcja

Metoda `@ $mol_mem` zapisała do innej komórki albo wykonała efekt uboczny, który ostatecznie unieważnił coś, co wcześniej przeczytała. Obliczenia tylko czytają i zwracają; zapisy, sieć, timery i DOM należą do handlerów `@ $mol_action`. Drugie źródło tego samego komunikatu to powiązanie `<=>` z dzieckiem połączone z metodą w klasie, która deleguje do tego samego dziecka — opisane niżej.

## Maximum call stack — przepełnienie stosu wywołań

Wywołują go dwa układy. Pierwszy: drzewo ma `tab? <=> tab?` na dziecku, a klasa ma `tab() { return this.Head().tab() }` — dziecko pyta właściciela, właściciel pyta dziecko. Usuń `<=>` prowadzące do dziecka, do którego delegujesz.

Drugi: podwidok został przetypowany na twoją własną klasę, a klasa woła `super` na właściwości wymienionej w drzewie. To `super` nie jest implementacją bazową, tylko zaślepką, którą drzewo wygenerowało dla wymienionego powiązania, a zaślepka deleguje z powrotem do właściciela. Zamiast tego deleguj jawnie do oryginalnej implementacji — patrz wpis o przetypowaniu niżej.

## Wartości zapisanej wielką literą nie da się nadpisać z TypeScriptu

`<= Label* \` generuje metodę o nazwie `Label`, a `label()` w klasie to inna metoda. Podwidoki pisze się wielką literą, wartości małą, a wielkość liter w drzewie decyduje o nazwie wygenerowanej metody.

## Każdy wiersz zagnieżdżonej listy pokazuje ten sam element

Kluczowany podwidok wewnątrz innego kluczowanego podwidoku nie dostaje swojego klucza. `Cell*0` wewnątrz `Row*0` renderuje się z kluczem `0` w każdym wierszu. Przenieś wiersz do osobnego komponentu i przekaż mu dane przez właściwości, a zewnętrzny widok kluczuj jako `Row*`, nie `Row*0`.

## Zmieniłem klasę podwidoku i jego treść zniknęła

Przetypowanie `Pre* $mol_text_code` na `Pre* $my_code` gubi powiązania, które zadeklarowało dla niego drzewo bazowe, więc trzeba wypisać je ponownie. Wypisanie `text <= pre_text* \` tworzy pustą zaślepkę przesłaniającą prawdziwe `pre_text` z `$mol_text`. Deleguj w klasie, zamiast polegać na `super`, którym jest właśnie ta zaślepka:

```typescript
pre_text( index: number ) {
	return $mol_text.prototype.pre_text.call( this, index )
}
```

## Brakuje metod z view.ts komponentu bazowego w podklasie

`$my_child $my_base` w drzewie rozszerza klasę wygenerowaną z `base.view.tree`, a nie klasę, którą napisałeś w `base.view.ts`. Zdefiniowane tam metody nie docierają do dziecka, a TypeScript zgłasza je jako brakujące. Logika wspólna dla kilku widoków mieszka w zwykłym pliku `.ts` w `namespace $`, bez drzewa — tak, jak napisany jest sam `$mol_view`.

## Komponent bazowy zadeklarowany w tym samym pliku view.tree traci swoje zachowanie

Gdy plik drzewa deklaruje i bazę, i klasę, która ją rozszerza, ciało `.view.ts` bazy jest dla dziecka pomijane. Bazie, która ma `.view.ts`, daj własny folder.

## Style przeciekają między podwidokiem a komponentem w środku

`Nav $my_app_nav` wewnątrz `$my_app` nadaje ten sam atrybut `my_app_nav` i podwidokowi, i komponentowi, więc jeden selektor trafia w oba. Nazwij podwidok tak, żeby nie powtarzał końcówki klasy — na przykład `Nav_row`.

## Selektor na atrybucie o wartości false nigdy nie pasuje

Atrybut logiczny ustawiony na `false` jest usuwany z elementu, więc `[expanded="false"]` nie pasuje do niczego. Renderowanie warunkowe to nie zadanie dla CSS; nadpisz fabrykę podwidoku i zwróć `null` dla wariantu, który takiego widoku nie ma.

## Liczba w stylu nic nie zmienia

Do każdej liczby w `style *` dopisywane jest `px`: `flexGrow 1` staje się `flex-grow: 1px`, co przeglądarka odrzuca. Wartości bez jednostek pisz jako ciągi znaków: `flexGrow \1`.

## Dwoje dzieci widoku przewijania leży jedno na drugim

`$mol_scroll` trzyma dokładnie jedno dziecko. Owiń dzieci w `$mol_view` albo `$mol_list` i to podaj przewijaniu.

## minimal_height nie daje widocznego efektu

`minimal_height` to liczba, której wirtualizowany `$mol_list` używa do oszacowania wierszy, zanim się wyrenderują; nie ustawia wysokości. Wysokość ustawia się w `.view.css.ts`.

## Osadzony komponent rozpycha stronę na boki

Widok zamontowany w cudzym układzie domyślnie nie kurczy się poniżej swojej treści. Nadaj korzeniowi `minWidth: 0` w stylach, żeby dał się ścisnąć jak otaczające go elementy.

## Zewnętrzny CSS nie stylizuje mojego komponentu

Komponent bez `dom_name` renderuje się jako element o nazwie swojej klasy, a dla frameworka CSS to nieznany element liniowy. Ustaw znacznik jawnie: `$mol_button` go nie ma, więc przycisk, który ma być ostylowany przez zewnętrzny CSS, potrzebuje `dom_name \button`.

## Kliknięcie linku do bieżącej strony czyści URL

`$mol_link` z `arg *` działa jak przełącznik: na stronie, której URL już pasuje, kliknięcie usuwa te klucze. Dla linku, który tylko nawiguje, zrób podklasę z `uri_off <= uri`. Żeby po kliknięciu przeładować tę samą trasę, wywołaj `$mol_state_arg.value()` z handlera i zrób `preventDefault` na zdarzeniu.

## Mój handler pola wejściowego uruchamia się przy każdym renderze

`prop?`, które dodałeś do podklasy `$mol_string`, ma nazwę właściwości już używanej przez bazę: `enter`, `submit`, `hint`, `value`, `keyboard`. Zanim dodasz nowe nazwy, porównaj je z drzewem bazowym.

## Błąd rzucony z settera wartości nigdy się nie pokazuje

`$mol_string` łapie wyjątek z `value?` i przekazuje go do `setCustomValidity` pola, więc pojawia się tylko jako natywna walidacja formularza. Zgłoś błąd własnym kanałem — linią statusu albo podwidokiem na komunikat.

## Kluczowane powiązanie handlera jest zgłaszane jako brakujące

`event_click? <=> pick*? null` na kluczowanym podwidoku nie generuje zaślepki dla `pick`. Zadeklaruj ją sam w korzeniu drzewa, `pick*? null`, i zaimplementuj w klasie.

## Bundle zawiera moduł, którego nigdy nie używam

Builder znajduje zależności, skanując tekst źródłowy w poszukiwaniu tokenów `$mol_name`, a token w literale znakowym albo w komentarzu dokumentacyjnym `/** */` liczy się tak samo jak ten w kodzie. Nazwa wspomniana w komentarzu jako przykład wciąga cały swój moduł, a awaria wychodzi w pliku, którego nigdy nie dotykałeś. Przykłady i notatki pisz bez prefiksu `$` albo podawaj zamiast tego nazwę folderu.

## Dalej

Większość z tych spraw sprowadza się do jednej reguły: nazwa w drzewie jest kontraktem, a kompilator sprawdza typy, ale nie nazwy. [Model mentalny](#!section=docs/page=mental-model) tłumaczy, czemu drzewo jest listą nadpisań, a [Testowanie](#!section=docs/page=testing) pokazuje test, który wyłapuje te ciche.
