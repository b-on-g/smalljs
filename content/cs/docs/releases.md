# Vydání

$mol se dodává **průběžně**. Místo řezání číslovaných verzí se framework distribuuje přímo z monorepa [mam_mol](https://github.com/hyoo-ru/mam_mol) — každá sloučená změna je okamžitě dostupná každému, kdo na ní staví. Nástroj MAM vždy stahuje aktuální zdroje, takže není žádný krok upgradu ani matice verzí ke sladění.

## Sledování změn

- **Historie commitů** — [commity mam_mol](https://github.com/hyoo-ru/mam_mol/commits/master) jsou kanonický changelog.
- **Historie po modulech** — každá složka komponenty na GitHubu nese vlastní log commitů, takže můžete sledovat jen ty části, které používáte.
- **Komunita DEV** — pozoruhodné přírůstky a články se sdílejí pod [tagem #mol](https://dev.to/t/mol).

## Co to znamená v praxi

Protože nejsou žádné rozbíjející hranice vydání, framework upřednostňuje zpětně kompatibilní vývoj: komponenty získávají funkce bez přejmenování a typované rozhraní `view.tree` nechá nekompatibility vyplout na povrch při kompilaci, ne za běhu. Pokud sestavení po aktualizaci přestane kompilovat, chyby TypeScriptu vás nasměrují přímo na to, co se změnilo.
