# Z React, Vue i Svelte

Jeśli budowałeś interfejsy w React, Vue lub Svelte, rozumiesz już większość tego, co robi $mol — tylko nazwy się różnią. Te frameworki są znakomite i popularne nie bez powodu; ta strona to tabela tłumaczeń, a nie rywalizacja, aby pomóc ci szybko poczuć się jak w domu.

## Mapa pojęć

| Pojęcie | React | Vue | Svelte | $mol |
|------|-------|-----|--------|------|
| Komponent | funkcja / klasa | SFC (`.vue`) | plik `.svelte` | `.view.tree` + `.view.ts` |
| Stan lokalny | `useState` | `ref` / `reactive` | `let x` | `@ $mol_mem` |
| Wartość pochodna | `useMemo` | `computed` | `$: y = …` | `@ $mol_mem` (czyta inne komórki) |
| Efekt uboczny | `useEffect` | `watchEffect` | `$: { … }` | `@ $mol_action` (jawny, nigdy automatyczny) |
| Props | props | props | `export let` | powiązania w `view.tree` |
| Zdarzenie | `onClick` | `@click` | `on:click` | `click? <=> handler?` |
| Input dwukierunkowy | kontrolowany input | `v-model` | `bind:value` | `value? <=> field?` |
| Lista | `items.map()` | `v-for` | `{#each}` | `Row*` z kluczem |
| Warunek | `cond && …` | `v-if` | `{#if}` | przypisz `null`, aby usunąć |
| Stan współdzielony | Redux / Context | Pinia / provide | store'y | dowolny obiekt z `@ $mol_mem` |
| Routing | React Router | Vue Router | SvelteKit | `$mol_state_arg` |
| Stylowanie | CSS-in-JS | `<style>` z zakresem | `<style>` | typowane `.view.css.ts` |

## Co zwykle wydaje się nowe

- **Reaktywność jest automatyczna i nieopcjonalna.** Jak `ref` w Vue czy `$:` w Svelte, wartość `@ $mol_mem` aktualizuje swoich czytelników sama — ale nie ma tablicy zależności do utrzymywania ani żadnej ręcznej subskrypcji.
- **Efekty są oddzielone od obliczeń.** React łączy wyprowadzanie i efekty w hookach; $mol trzyma je osobno: `@ $mol_mem` tylko oblicza, `@ $mol_action` wykonuje efekty. To właśnie ten podział usuwa większość zagadek „dlaczego to uruchomiło się dwa razy?".
- **Stan to po prostu obiekty.** Nie ma dedykowanej biblioteki store do przyjęcia — współdzielona wartość to reaktywna właściwość na dowolnym obiekcie, więc stan globalny i stan komponentu działają tak samo.

## Rozwiązujesz ty czy rozwiązuje framework

Głębsza różnica nie tkwi w słowniku powyżej — chodzi o to, *kto* rozwiązuje powracające problemy. W React, Vue czy Svelte to w większości wzorce, które przepisujesz w każdym komponencie i psujesz na swój sposób. W $mol są to właściwości jednego mechanizmu, więc cała ta klasa pracy znika, zamiast dostać przyjemniejsze API.

- **Magazyn stanu** — pięć podsystemów przechowywania w React (Redux + RTK Query + `useState` + `useReducer` + Context) zwija się w jeden: reaktywne pola komponentu.
- **Reaktywność** — gdzie indziej doczepiona z wierzchu (MobX, signals); tutaj w fundamencie, więc nic nie musi się do niej zgłaszać.
- **Izolacja awarii** — `<ErrorBoundary>` umieszczany ręcznie kontra każdy komponent będący domyślnie własną granicą.
- **Efekty** — lista kontrolna `useEffect`/`useMemo`/deps w kilkunastu scenariuszach kontra metoda albo metoda z akcją. Jedno rozgałęzienie w drzewie, nie dwanaście.
- **Wirtualizacja** — komponent zewnętrzny na każdą listę kontra to, że wszystko poza viewportem po prostu nie istnieje.

Tam, gdzie tabela powyżej zmienia nazwy, tutaj $mol faktycznie to usuwa.

## Wypróbuj tłumaczenie

Najszybszy sposób na przyswojenie mapowania to napisanie po trochu obu: otwórz [Playground](#!section=playground), przenieś mały komponent, który znasz, i zobacz, jak wypadnie. Albo zacznij od [Pierwszych kroków](#!section=docs/page=getting-started).
