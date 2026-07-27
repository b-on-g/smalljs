# Widoki-duchy

`$mol_ghost` to widok **bez węzła**. Zamiast tworzyć własny element DOM, pożycza element swojego `Sub()` i domiesza do niego własne atrybuty, style i zachowanie. W jednej linijce z kodu źródłowego: *„domiesz logikę widoku do węzła DOM innego komponentu."*

```tree
$mol_ghost $mol_view
	Sub $mol_view
```

Zwykły `$mol_view` renderuje własny element. Duch nie renderuje **żadnego** — używa ponownie elementu dziecka, więc do drzewa DOM nie dodaje się nic dodatkowego.

## Kiedy po niego sięgnąć

Użyj ducha, gdy chcesz dołączyć zachowanie do istniejącego komponentu *bez* owijania go w kolejny element — przeciąganie, upuszczanie, podążanie-przy-przewijaniu, przejścia. Kilka komponentów frameworka jest na nim zbudowanych:

- **`$mol_drag`** / **`$mol_drop`** — przeciąganie i upuszczanie wskaźnikiem
- **`$mol_transit`** — przejścia wejścia/wyjścia
- **`$mol_follower`** — utrzymuje element wyrównany do innego, gdy ten się przewija
- **`$mol_book_page`** — strona wewnątrz nawigacji `$mol_book2`

## Relacja z wtyczkami

`$mol_plugin` — baza, którą rozszerza każda [wtyczka](#!section=docs/page=plugins) — jest bez elementu z tego samego powodu: wzbogaca element gospodarza, zamiast dodawać kolejny. Duch to forma ogólna (owinąć jedno dziecko i przejąć jego węzeł); wtyczka to forma wyspecjalizowana, którą wymieniasz pod `plugins /`.
