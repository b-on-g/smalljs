# Offline

Aplikace v $mol může fungovat i bez sítě — otevřete ji jednou online a zůstane použitelná i poté, co přejdete do offline, až po instalaci jako PWA. Pochází to z jednoho vestavěného modulu, `mol/offline/install`, a je nezávislé na jakékoli datové vrstvě.

## Co dělá

`mol/offline/install` spouští `$mol_offline`, který registruje **service worker** (`web.js`) jako cachovací proxy. Každý úspěšný `GET` statického prostředku — balíčku aplikace, stylů, obrázků — se ukládá do cache s názvem `$mol_offline`. Při dalším načtení worker tyto odpovědi servíruje přímo z cache, takže aplikace se otevře okamžitě a přežije chybu HTTP nebo přerušené spojení tím, že se vrátí k uložené kopii. Protože celá aplikace je cachovatelná a takto servírovaná, prohlížeč může nabídnout **instalaci jako PWA**.

## Jak to zapnout

Přidejte jeden řádek do `*.meta.tree` své aplikace:

```tree
include \/mol/offline/install
```

Tento vynucený include vtáhne modul do balíčku, takže se jeho service worker zaregistruje jako vedlejší efekt — žádný jiný kód na něj nemusí odkazovat. Jak `include` funguje, viz [Metadata modulu](#!section=docs/page=meta).

Dva požadavky prohlížeče za běhu:

- Servírujte přes **HTTPS** (nebo `localhost` ve vývoji) — jinak service workery odmítnou běžet.
- Poskytněte manifest webové aplikace, aby byla aplikace instalovatelná.

## Co to *není*

Offline cachování udržuje *jednoho* klienta funkčního bez sítě. **Nesynchronizuje** data mezi klienty: požadavky s query stringem procházejí bez zpracování a požadavky jiné než `GET` se nikdy necachují. Když více klientů nebo zařízení musí sdílet stejná živá, editovatelná data — s bezkonfliktním slučováním — to je jiná věc, kterou řeší samostatný projekt [Giper Baza](#!section=docs/page=giper-baza).
