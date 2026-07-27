# Renderowanie

Ten rozdział dotyczy tego, co dzieje się między zmianą twojego reaktywnego stanu a aktualizacją pikseli na ekranie. Rzadko musisz o tym myśleć — ale zrozumienie modelu wyjaśnia, dlaczego kod $mol pozostaje szybki bez specjalnego wysiłku.

## Brak wirtualnego DOM

$mol nie porównuje wirtualnego drzewa. Każda właściwość widoku jest powiązana bezpośrednio z węzłem lub atrybutem DOM, którym steruje, poprzez te same reaktywne komórki, które już poznałeś w [Stan](#!section=docs/page=state). Gdy komórka się zmienia, ponownie wykonują się tylko dokładnie te powiązania, które ją czytają — nie poddrzewo, nie funkcja komponentu, tylko dotknięte właściwości.

Oznacza to, że nie ma przebiegu uzgadniania do optymalizacji, żadnych kluczy do ręcznego strojenia dla diffu listy ani `memo`/`shouldComponentUpdate`, po które trzeba by sięgać. Graf zależności zna już minimalny zestaw aktualizacji.

## Komponenty są leniwe

Widok jest konstruowany dopiero, gdy coś go zażąda. Ekran, do którego nigdy nie nawigujesz, nigdy nie jest budowany; zakładka, której nigdy nie otwierasz, nic nie kosztuje. Ponieważ konstrukcja jest na żądanie i buforowana, komponowanie dużych drzew komponentów jest tanie — części, które nie są potrzebne, po prostu jeszcze nie istnieją.

## Renderowanie jest wirtualizowane

$mol renderuje tylko to, co znajduje się w obszarze widocznym. Komponenty przewinięte poza widok nie są przechowywane jako ukryty DOM — nie są w ogóle tworzone i są budowane w chwili, gdy wjeżdżają w zakres. To architektoniczna właściwość frameworka, a nie opcjonalna funkcja czy specjalny komponent listy: każdy układ jest wirtualizowany, więc lista dziesięciu elementów i lista dziesięciu tysięcy kosztują mniej więcej tyle samo do wyświetlenia.

Praktyczny efekt jest taki, że piszesz zwykłe drzewa komponentów i długie listy bez sięgania po biblioteki okienkowania.

## Odtwarzalne liczby

Twierdzenia o wydajności są użyteczne tylko wtedy, gdy można je odtworzyć. Zamiast przytaczać tu liczby, $mol uczestniczy w społecznościowym **js-framework-benchmark**; możesz przeczytać jego wyniki i samodzielnie ponownie uruchomić zestaw testów:

[Wyniki js-framework-benchmark](https://nin-jin.github.io/js-framework-benchmark/webdriver-ts-results/table.html)

Traktuj to jako źródło prawdy dla porównań — zmierzone, wersjonowane i niezależne od tej strony.

## Dalej

To dopełnia podstawowy model działania $mol. Następnie zaprzęgnij go do ładowania prawdziwych danych w [Pobieranie danych](#!section=docs/page=data).
