# Nástroje

$mol funguje v libovolném editoru, ale malá sada nástrojů činí `.view.tree` a typované styly mnohem pohodlnějšími: generátor projektu, jazykový server a integrace pro editory Zed a VS Code.

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

## Odkazy

- Generátor — [create-view-tree-lsp](https://github.com/Dev-cmyser/create-view-tree-lsp)
- Jazykový server — [view-tree-lsp](https://github.com/Dev-cmyser/view.tree)
- Rozšíření Zed — [zed-view.tree-mol-support](https://github.com/Dev-cmyser/zed-view.tree-mol-support)
