# Offline

Aplikacja $mol może działać dalej bez sieci — otwórz ją raz online, a pozostanie używalna po przejściu w tryb offline, aż po instalację jako PWA. Pochodzi to z jednego wbudowanego modułu, `mol/offline/install`, i jest niezależne od jakiejkolwiek warstwy danych.

## Co robi

`mol/offline/install` uruchamia `$mol_offline`, który rejestruje **service worker** (`web.js`) jako buforujące proxy. Każde udane `GET` zasobu statycznego — pakietu aplikacji, stylów, obrazów — jest zapisywane w pamięci podręcznej o nazwie `$mol_offline`. Przy kolejnym ładowaniu worker serwuje te odpowiedzi prosto z pamięci podręcznej, więc aplikacja otwiera się natychmiast i przeżywa błąd HTTP lub zerwane połączenie, wracając do zapisanej kopii. Ponieważ cała aplikacja jest buforowalna i tak serwowana, przeglądarka może zaproponować **zainstalowanie jej jako PWA**.

## Jak włączyć

Dodaj jedną linię do `*.meta.tree` swojej aplikacji:

```tree
include \/mol/offline/install
```

Ten wymuszony include wciąga moduł do pakietu, tak że jego service worker rejestruje się jako efekt uboczny — żaden inny kod nie musi się do niego odwoływać. O tym, jak działa `include`, zobacz [Metadane modułu](#!section=docs/page=meta).

Dwa wymagania przeglądarki w czasie wykonania:

- Serwuj przez **HTTPS** (lub `localhost` w środowisku deweloperskim) — inaczej service workery odmawiają uruchomienia.
- Dostarcz manifest aplikacji webowej, aby aplikacja była instalowalna.

## Czym to *nie* jest

Buforowanie offline utrzymuje *jednego* klienta działającego bez sieci. **Nie** synchronizuje danych między klientami: żądania z ciągiem zapytania są przepuszczane, a żądania inne niż `GET` nigdy nie są buforowane. Gdy wielu klientów lub urządzeń musi współdzielić te same dane na żywo i edytowalne — z bezkonfliktowym scalaniem — to inna sprawa, którą zajmuje się osobny projekt [Giper Baza](#!section=docs/page=giper-baza).
