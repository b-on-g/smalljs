# Prezentacja

Prawdziwe rzeczy zbudowane w $mol — aplikacje społeczności, produkty komercyjne i narzędzia dla programistów. Każda to działająca aplikacja, a nie demo.

## Aplikacje

- **[Bog Music](https://b-on-g.github.io/music/)** — odtwarzacz muzyki działający zarówno jako rozszerzenie Chrome, jak i aplikacja webowa, z odtwarzaniem w tle i buforowaniem offline. $mol napędza interfejs i stan local-first.
- **[Blitz Quiz](https://b-on-g.github.io/blitz/)** — quiz na żywo w stylu Kahoot zbudowany na $mol i Giper Baza. Pokoje synchronizują się w czasie rzeczywistym przez warstwę CRDT, więc nie ma serwera gry do uruchamiania.
- **[VDO Rebalance](https://b-on-g.github.io/invest/)** — narzędzie inwestycyjne local-first: wrzuć portfel `.xlsx` i otrzymaj transakcje, które go równoważą. Stan żyje w przeglądarce dzięki Giper Baza.
- **[$hyoo_budget](https://budget.hyoo.ru)** — kolaboracyjna, local-first aplikacja budżetu osobistego. Zajęła pierwsze miejsce na hackathonie Beautiful Code.
- **[$hyoo_talks](https://talks.hyoo.ru)** — osadzalny komunikator. Prototyp zbudowany dla Sberbanku zajął drugie miejsce na Moscow City Hack.

## System projektowy i narzędzia

- **[BuilderUI](https://b-on-g.github.io/builderui/)** — system projektowy w stylu shadcn dla $mol: typowane komponenty — przyciski, dialogi, selecty, karty, wykresy i więcej — plus Studio do motywowania na żywo (kolor bazowy, akcent, paleta wykresów, promień, czcionki, jasny/ciemny). Ta strona dokumentacji jest na nim zbudowana.
- **Ta strona** — dokumentacja, którą czytasz, w tym [Playground](#!section=playground) i [kurs](#!section=course), jest aplikacją $mol. Wyszukiwarka, edytor kodu na żywo i TypeScript w przeglądarce są zbudowane w frameworku, który dokumentują.
- **MAM** — narzędzie do budowania i rejestr modułów, w którym żyje każda aplikacja $mol, a samo jest projektem $mol. To narzędzie dla programistów, a nie hostowana aplikacja; kod źródłowy jest na GitHubie.
- **view.tree LSP** — narzędzia językowe i generator `npm create view-tree-lsp`, który startuje nowe aplikacje $mol. Narzędzia edytorskie, więc nie ma działającej aplikacji do otwarcia.

## W produkcji

Poza projektami open source i hackathonowymi $mol działa też w komercyjnych systemach, które przynoszą przychody. Kilka z nich (część działa pod NDA, więc bez linków i logo):

- **Sterowanie obroną antydronową** — kompleks „Tamerlan" uruchamia mikroserwis $mol na każdym kontrolerze urządzenia (radar, zagłuszarka, kamera), łącząc je we wspólną zdecentralizowaną sieć. Interfejs webowy, lokalny lub scentralizowany, pokazuje sytuację w powietrzu w czasie rzeczywistym: co gdzie leci, co jest zagłuszane, gdzie skierowane są kamery.
- **[Wirtualny awatar](https://avatar.ocas.ai)** — postać 3D, z którą możesz rozmawiać, grać w szachy lub poprosić o zaprezentowanie slajdów. Produkt komercyjny, w którym $mol napędza interfejs nad bibliotekami stron trzecich.
- **Panel administracyjny do testowania promptów** — pozwala firmie wybierać i testować prompty dla sieci neuronowych do masowego przetwarzania wierszy katalogu: przepisywania tytułów, opisów i pól SEO. Czyści też pliki tekstowe do bezpiecznego eksportu do innych CMS-ów.
- **Panel administracyjny odczytów** — liczniki wysyłają odczyty przez FTP; operatorzy tworzą użytkowników, przyznają im prawa odczytu konkretnych liczników i prowadzą kampanie e-mail, podczas gdy zwykli odbiorcy widzą tylko swoje obiekty i stronę tylko do odczytu.
- **Back office e-commerce** — zarządzanie katalogiem produktów i listą zamówień dla sklepu internetowego.
- **Widżet danych naukowych** — wizualizuje mikroelementy i ich związki. Renderowanie wykresów zostaje na D3; cała reszta została przepisana z czystego JS na $mol i spakowana w Web Component.

## Hackathony

$mol wielokrotnie wygrywał na hackathonach: pierwsze miejsce na Beautiful Code ([$hyoo_budget](https://budget.hyoo.ru)), pierwsze miejsce na AC-VO-PPR-Hackathon (sterowanie gestami i głosem miejskiego wyświetlacza) oraz nagradzane prototypy na More Tech, Moscow City Hack i Dev Hack. [Strona historii sukcesu](https://mol.hyoo.ru/#!section=docs/=xanlom_yimh6x) $mol ma szczegóły.

## Więcej

[Katalog komponentów $mol](https://mol.hyoo.ru/#!section=demos) ma dziesiątki komponentów i dem na żywo, które możesz otworzyć i sprawdzić.

Budujesz coś w $mol? Najlepszy następny krok to [Playground](#!section=playground) — wypróbuj pomysł w kilka sekund, potem udostępnij URL.
