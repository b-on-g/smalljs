# FAQ

## Czym jest smalljs?

smalljs to strona dokumentacji **$mol** — reaktywnego frameworka UI z typowanymi widokami, automatyczną reaktywnością i bez wirtualnego DOM. Sam framework jest rozwijany otwarcie przez społeczność hyoo-ru; ta strona gromadzi przewodnik, interaktywny kurs, żywy playground i referencję API w jednym miejscu.

## Czy $mol jest gotowy do produkcji?

Tak. $mol napędza prawdziwe aplikacje i wewnętrzne narzędzia — zobacz [Prezentację](#!section=docs/page=showcase). Jest dostarczany z jednego monorepo (MAM) i codziennie używany przez jego autorów i społeczność.

## Jak duży jest runtime?

Mały. Minimalna aplikacja to około 123 KB nieskompresowanego JavaScriptu, czyli mniej więcej 20 KB przesyłanych przez sieć po kompresji. Renderowanie jest domyślnie wirtualizowane (komponenty poza obszarem widocznym nigdy nie są tworzone), a build dołącza tylko te moduły, których faktycznie używasz, więc bundle rośnie wraz z twoją aplikacją, a nie z frameworkiem. Zobacz [Renderowanie](#!section=docs/page=rendering), aby poznać szczegóły i powtarzalne benchmarki.

## Czy muszę uczyć się nowego języka szablonów?

Uczysz się `view.tree`, zwięzłej składni drzewa do deklarowania układu komponentów. Jest celowo mała — rozdział [Widoki](#!section=docs/page=views) obejmuje wszystko, czego potrzebujesz, za jednym posiedzeniem. Logika pozostaje w czystym TypeScript, a style też są typowane.

## Czym różni się od React, Vue czy Svelte?

Reaktywność jest automatyczna — nie ma `useState`, `useEffect` ani ręcznej subskrypcji. Opisujesz, *czym* jest UI; $mol decyduje, *jak* i *kiedy* je zaktualizować. [Tabela tłumaczeń pojęć](#!section=docs/page=rosetta) odwzorowuje idee z innych frameworków na $mol.

## Gdzie uzyskam pomoc?

- Zapytaj w [społeczności DEV](https://dev.to/t/mol)
- Przeglądaj [kod źródłowy i zgłoszenia $mol na GitHubie](https://github.com/hyoo-ru/mam_mol)
- Czytaj dokumentację referencyjną na [mol.hyoo.ru](https://mol.hyoo.ru/)

## Na jakiej licencji jest?

MIT. Możesz używać $mol swobodnie w projektach komercyjnych i open-source.
