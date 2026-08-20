# Nástroje

$mol funguje v libovolném editoru, ale malá sada nástrojů činí `.view.tree` a typované styly mnohem pohodlnějšími: generátor projektu, jazykový server, integrace pro editory Zed a VS Code a skill, který učí LLM asistenty tomuto frameworku.

## Vygenerování projektu

`create-view-tree-lsp` vygeneruje ihned spustitelný $mol modul, abyste boilerplate nemuseli skládat ručně:

```bash
npx create-view-tree-lsp bog/myapp
```

Argumentem je cesta modulu (`namespace/name` nebo ekvivalentní `bog_myapp`). Zapíše `view.tree`, `view.ts`, `view.css.ts` a `index.html` fungující aplikace a k tomu GitHub Actions pro její nasazení. Ve výchozím nastavení zahrnuje také local-first úložiště **Giper Baza**, konfiguraci **Docker** a desktopový obal **Tauri**. Kterékoli z nich vypnete přepínačem:

```bash
npx create-view-tree-lsp bog/myapp --no-baza --no-docker --no-tauri
```

Několik částí je naopak volitelných:

- `--backend` přidá REST backend `$mol_server` s úložištěm `node:sqlite` a sdíleným TypeScriptovým typem položky
- `--prerender` a `--seo` přidají viditelnost pro vyhledávače, popsanou níže v sekci [Průběžná integrace](#!section=docs/page=tooling/Docs.Body=Pr%C5%AFb%C4%9B%C5%BEn%C3%A1%20integrace)

Generátor je tenká obálka nad CLI jazykového serveru, takže `npx view-tree-lsp create bog/myapp` udělá totéž přímo.

## Překlady

Překlady leží vedle svého modulu, v `<modul>/<jméno>.locale=<lang>.json`. Kódu to vyhovuje, překladateli už méně: místo jednoho seznamu vět dostane třicet drobných souborů.

**[$yuf_localizer](https://zerkalica.github.io/yuf/#!demo=yuf_localizer_demo)** tuhle mezeru zaceluje. Zadejte mu adresy projektů a kódy jazyků a ukáže všechny klíče v jednom seznamu s vyhledáváním — a označí, co ještě zbývá: klíče, které existují jen anglicky, změněné, ale nezapsané, a zastaralé, které projekt už nemá. Překlady zůstávají v prohlížeči, dokud je nevyexportujete, takže se mezi sezeními nic neztratí.

Až bude překladatel hotov, vyexportujte výsledek a rozdělte ho zpátky po modulech:

```bash
# z kořene MAM
npx view-tree-lsp locale bog/myapp/app/- --exclude=mol --update
```

Argumentem je složka nebo jeden soubor s lokalizací. Přepínače:

- `--include=` bere část cesty a nechá jen moduly, jejichž cesta ji obsahuje; lze opakovat, kolikrát chcete
- `--exclude=` je naopak přeskočí — `--exclude=mol` nechá balíčky samotného frameworku netknuté
- `--update` sloučí do existujících souborů: hodnoty ze zdroje vyhrávají a klíče, které ve zdroji nejsou, zůstanou
- `--dry` vypíše plán a nic nezapíše

Každý klíč v sobě nese cestu ke svému modulu, takže `$my_page_greeting` skončí v `my/page/page.locale=ru.json` — vedle zdrojů, ke kterým patří. Určit ten modul je ovšem záludnější, než vypadá: `_` odděluje složky i slova, takže nejdelší odpovídající cesta je špatná odpověď. V `$my_page_lang_hint` začíná vlastnost na `lang` a skutečný sousední podmodul `my/page/lang` by si klíč vzal. Příkaz se proto ptá každého kandidáta, jaké klíče deklaruje — MAM zapisuje přesně ty do jeho souboru lokalizace v `-view.tree` — a klíč přidělí tomu, komu patří.

## Průběžná integrace

Generátor zapíše GitHub Actions do `.github/workflows/`, takže nový projekt se nasazuje a vydává bez další konfigurace.

`deploy.yml` běží při každém pushi. Sestaví aplikaci pomocí `hyoo-ru/mam_build`, publikuje `app/-` na **GitHub Pages** z `main` a každé větvi `feature/*` dá vlastní složku náhledu — odstraněnou automaticky při smazání větve.

### SEO

Dvě nezávislé volby, obě spouštěné tagy `v*`:

- **`--prerender`** vykreslí obrazovky, které vyjmenujete (například `home`), do statického HTML pomocí `b-on-g/mol-prerender-action`, takže crawlery a náhledy odkazů vidí skutečný obsah.
- **`--seo`** přidá runtime `$bog_seo`: router podle pathname se sitemapou, `robots.txt`, `llms.txt` a vkládáním meta pro každou stránku. Úloha obslouží build, vypíše kanonické předvykreslené HTML a vloží ho zpět do nasazení.

Sáhněte po prerender action, když má být hrstka veřejných obrazovek procházitelná, a po `$bog_seo`, když potřebujete sitemapy a metadata pro každou stránku.

### Desktop Tauri

S volbou Tauri `tauri.yml` sestavuje desktopové binárky na tagách `v*` (nebo na vyžádání) přes znovupoužitelný workflow `b-on-g/tauri-mol-workflow-template`, ze stejného modulu, který nasazujete na web.

## Jazykový server

`view-tree-lsp` je implementace Language Server Protocolu pro formát `view.tree`. Spouštějte ho na vyžádání přes npx, bez globální instalace:

```bash
npx view-tree-lsp@latest
```

Prohledá váš workspace a poskytne libovolnému editoru se schopností LSP:

- dokončování pro komponenty `$mol_*` a pro komponenty a vlastnosti definované ve vašem vlastním projektu
- návrhy vlastností omezené na komponentu pod kurzorem
- osnovu deklarací komponent pro navigaci
- živé aktualizace, jak se soubory mění

Protože mluví LSP, můžete namířit jazykového klienta libovolného editoru na `npx view-tree-lsp`. Dvě integrace níže vám ho zapojí.

## Zed

Rozšíření **View Tree Syntax Highlighting for $mol** sdružuje gramatiku tree-sitter, jazykový server a volitelný motiv ikon. Nainstalujte ho ze správce rozšíření Zedu:

1. Otevřete paletu příkazů (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Spusťte **zed: extensions**
3. Vyhledejte `view.tree` nebo `mol` a nainstalujte rozšíření

Získáte zvýrazňování syntaxe, dokončování a osnovu pro soubory `.view.tree`. [Zdroje](https://github.com/Dev-cmyser/zed-view.tree-mol-support) a odpovídající [motiv ikon](https://github.com/Dev-cmyser/zed-viewtree-icon-theme) jsou na GitHubu.

## VS Code

Workspace MAM už své nastavení VS Code nese s sebou. Když otevřete naklonovanou složku `mam`, VS Code nabídne instalaci doporučených rozšíření z `.vscode/extensions.json`:

- `nin-jin.vscode-language-tree` — jazyková podpora `view.tree`
- `stan-donarise.view-tree-language` — syntaxe a gramatika
- `editorconfig.editorconfig` — konzistentní formátování

Táž složka dodává `mol.code-snippets`, takže snippety komponent a bindingů jsou dostupné bez jakékoli další konfigurace. Přijměte výzvu a soubory `.view.tree` a TypeScript jsou zvýrazněné rovnou.

## Skill pro LLM

`mol_skill` dává AI asistentovi kontext, který potřebuje k psaní v $mol: syntaxi `view.tree`, uspořádání MAM modulu, rozdělení mezi `view.ts` a `view.css.ts`, modelování dat v Giper Baza a balení přes Tauri. Dodává se jako obyčejná složka se skillem, postup v `SKILL.md` plus referenční příručky, takže ho načte jakýkoli LLM nástroj, který čte formát skills, včetně Claude Code a Cursoru. Nainstalujte ho přes CLI skills:

```bash
npx skills add b-on-g/mol_skill --all -g
```

Pak se ptejte vlastními slovy („struktura MAM modulu“, „CRUD a role v Giper Baza“) a asistent si před odpovědí otevře příslušnou referenci, takže napsaný kód drží konvence z této dokumentace. [Zdrojový kód](https://github.com/b-on-g/mol_skill) je na GitHubu a referenční soubory se dají dobře číst i samostatně, pokud si je raději projdete sami.

## Odkazy

- Generátor — [create-view-tree-lsp](https://github.com/Dev-cmyser/create-view-tree-lsp)
- Jazykový server — [view-tree-lsp](https://github.com/Dev-cmyser/view.tree)
- Rozšíření Zed — [zed-view.tree-mol-support](https://github.com/Dev-cmyser/zed-view.tree-mol-support)
- Skill pro LLM — [mol_skill](https://github.com/b-on-g/mol_skill)
