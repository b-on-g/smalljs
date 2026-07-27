# Wydania

$mol jest dostarczany **w sposób ciągły**. Zamiast wycinać numerowane wersje, framework jest dostarczany prosto z monorepo [mam_mol](https://github.com/hyoo-ru/mam_mol) — każda scalona zmiana jest natychmiast dostępna dla każdego, kto na niej buduje. Narzędzie do budowania MAM zawsze pobiera bieżące źródła, więc nie ma kroku aktualizacji ani macierzy wersji do uzgadniania.

## Śledzenie zmian

- **Historia commitów** — [commity mam_mol](https://github.com/hyoo-ru/mam_mol/commits/master) są kanonicznym changelogiem.
- **Historia per moduł** — każdy folder komponentu na GitHubie ma własny log commitów, więc możesz obserwować tylko te części, których używasz.
- **Społeczność DEV** — godne uwagi dodatki i artykuły są udostępniane pod [tagiem #mol](https://dev.to/t/mol).

## Co to oznacza w praktyce

Ponieważ nie ma łamiących granic wydań, framework preferuje ewolucję zgodną wstecz: komponenty zyskują funkcje bez zmiany nazw, a typowane interfejsy `view.tree` sprawiają, że niezgodności ujawniają się w czasie kompilacji, a nie w czasie wykonania. Jeśli budowa przestaje się kompilować po aktualizacji, błędy TypeScript wskazują ci wprost, co się zmieniło.
