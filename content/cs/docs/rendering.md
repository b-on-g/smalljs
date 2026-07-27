# Vykreslování

Tato kapitola je o tom, co se děje mezi změnou vašeho reaktivního stavu a aktualizací pixelů na obrazovce. Málokdy o tom musíte přemýšlet — ale pochopení modelu vysvětluje, proč kód $mol zůstává rychlý bez zvláštního úsilí.

## Žádný virtuální DOM

$mol neporovnává virtuální strom. Každá vlastnost pohledu je navázána přímo na uzel nebo atribut DOM, který řídí, skrze tytéž reaktivní buňky, s nimiž jste se už setkali ve [Stavu](#!section=docs/page=state). Když se buňka změní, znovu se spustí jen ty přesné vazby, které ji čtou — ne podstrom, ne funkce komponenty, jen dotčené vlastnosti.

To znamená, že není žádný sesouhlasovací průchod k optimalizaci, žádné klíče k ručnímu ladění pro diff seznamu a žádné `memo`/`shouldComponentUpdate`, po nichž by bylo třeba sáhnout. Graf závislostí už zná minimální množinu aktualizací.

## Komponenty jsou líné

Pohled se sestaví, teprve když si o něj něco řekne. Obrazovka, na kterou nikdy nepřejdete, se nikdy nesestaví; záložka, kterou nikdy neotevřete, nic nestojí. Protože sestavování probíhá na vyžádání a je cachované, skládání velkých stromů komponent je levné — části, které nejsou potřeba, prostě ještě neexistují.

## Vykreslování je virtualizované

$mol vykresluje jen to, co je uvnitř viditelné oblasti. Komponenty odrolované z dohledu se neuchovávají jako skrytý DOM — vůbec se nevytvoří a sestaví se ve chvíli, kdy se dorolují do rozsahu. To je architektonická vlastnost frameworku, ne volitelná funkce ani speciální komponenta seznamu: každé rozvržení je virtualizované, takže seznam deseti položek a seznam deseti tisíc stojí zhruba stejně za zobrazení.

Praktický důsledek je, že píšete obyčejné stromy komponent a dlouhé seznamy, aniž byste sahali po knihovnách pro okénkové vykreslování.

## Reprodukovatelná čísla

Tvrzení o výkonu jsou užitečná jen tehdy, když je dokážete reprodukovat. Místo abychom tu uváděli čísla, $mol se účastní komunitního **js-framework-benchmark**; jeho výsledky si můžete přečíst a sadu si sami znovu spustit:

[Výsledky js-framework-benchmark](https://nin-jin.github.io/js-framework-benchmark/webdriver-ts-results/table.html)

Berte to jako zdroj pravdy pro srovnání — změřený, verzovaný a nezávislý na této stránce.

## Dále

Tím je základní model fungování $mol úplný. Dále jej zapojte k načítání skutečných dat v [Načítání dat](#!section=docs/page=data).
