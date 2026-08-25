# Werkzeuge

$mol funktioniert in jedem Editor, aber eine kleine Auswahl an Werkzeugen macht `.view.tree` und typisierte Styles deutlich komfortabler: ein Projekt-Scaffolder, ein Language Server, Editor-Integrationen für Zed und VS Code sowie ein Skill, der LLM-Assistenten das Framework beibringt.

## Ein Projekt scaffolden

`create-view-tree-lsp` erzeugt ein sofort lauffähiges $mol-Modul, sodass Sie den Boilerplate-Code nicht von Hand zusammenbauen müssen:

```bash
npx create-view-tree-lsp bog/myapp
```

Führen Sie es im Wurzelverzeichnis Ihres MAM-Checkouts aus: Modulpfade werden von dort aus aufgelöst, und dort gehört das Projekt hin. Außerhalb eines Workspace warnt der Befehl, statt Sie das beim ersten Build herausfinden zu lassen.

Das Argument ist der Modulpfad (`namespace/name` oder das gleichwertige `bog_myapp`). Es schreibt `view.tree`, `view.ts`, `view.css.ts` und `index.html` für eine funktionierende App sowie die GitHub Actions zum Deployen.

Alles, was der Generator hinzufügen kann, ist standardmäßig dabei. Sie nennen nur das, was Sie nicht wollen:

```bash
npx create-view-tree-lsp bog/myapp --no-tauri --no-backend
```

- `--no-baza` — ein local-first Speicher **Giper Baza**
- `--no-docker` — ein **Docker**-Setup mit `docker-compose.yml` und nginx-Konfiguration
- `--no-tauri` — eine **Tauri**-Desktop-Hülle
- `--no-backend` — ein `$mol_server`-REST-Backend mit `node:sqlite`-Speicher und einem gemeinsam genutzten TypeScript-Item-Typ
- `--no-prerender`, `--no-seo` — Sichtbarkeit für Suchmaschinen, weiter unten unter [Kontinuierliche Integration](#!section=docs/page=tooling/Docs.Body=Kontinuierliche%20Integration) beschrieben

Ein unbekanntes Flag bricht den Lauf ab, damit ein Tippfehler nicht stillschweigend etwas drin lässt.

Der Scaffolder ist ein dünner Wrapper über der CLI im Language Server, sodass `npx view-tree-lsp create bog/myapp` dasselbe direkt erledigt.

## Übersetzungen

Übersetzungen liegen neben ihrem Modul, in `<Modul>/<Name>.locale=<lang>.json`. Dem Code kommt das entgegen, dem Übersetzer nicht: Statt einer Liste von Sätzen bekommt er dreißig kleine Dateien.

**[$yuf_localizer](https://zerkalica.github.io/yuf/#!demo=yuf_localizer_demo)** schließt diese Lücke. Geben Sie ihm die Projekt-URLs und Sprachcodes, und er zeigt alle Schlüssel in einer durchsuchbaren Liste — samt Markierungen für alles, was noch offen ist: Schlüssel, die es nur auf Englisch gibt, geänderte, aber noch nicht festgeschriebene, und veraltete, die das Projekt gar nicht mehr kennt. Die Übersetzungen bleiben im Browser, bis Sie sie exportieren, zwischen zwei Sitzungen geht also nichts verloren.

Ist der Übersetzer fertig, exportieren Sie das Ergebnis und verteilen es zurück auf die Module:

```bash
# aus dem MAM-Wurzelverzeichnis
npx view-tree-lsp locale bog/myapp/app/- --exclude=mol --update
```

Als Argument dient ein Ordner oder eine einzelne Locale-Datei. Flags:

- `--include=` nimmt ein Pfadfragment und behält nur Module, deren Pfad es enthält; beliebig oft wiederholbar
- `--exclude=` überspringt sie stattdessen — `--exclude=mol` lässt die Pakete des Frameworks unangetastet
- `--update` mischt in bestehende Dateien ein: eingehende Werte gewinnen, im Input fehlende Schlüssel bleiben erhalten
- `--dry` gibt den Plan aus und schreibt nichts

Jeder Schlüssel trägt seinen Modulpfad in sich, also landet `$my_page_greeting` in `my/page/page.locale=ru.json` — direkt neben den Quellen, zu denen er gehört. Dieses Modul zu bestimmen ist allerdings heikler, als es aussieht: `_` trennt Ordner und Wörter gleichermaßen, der längste passende Pfad ist also die falsche Antwort. In `$my_page_lang_hint` beginnt die Eigenschaft mit `lang`, und ein echtes Submodul `my/page/lang` nebenan würde den Schlüssel verschlucken. Deshalb fragt der Befehl jedes Kandidatenmodul, welche Schlüssel es deklariert — MAM schreibt genau diese in dessen `-view.tree`-Locale-Datei — und gibt den Schlüssel dem Modul, dem er gehört.

## Kontinuierliche Integration

Der Scaffolder schreibt die GitHub Actions nach `.github/workflows/`, sodass ein neues Projekt ohne zusätzliche Einrichtung deployt und released wird.

`deploy.yml` läuft bei jedem Push. Es baut die App mit `hyoo-ru/mam_build`, veröffentlicht `app/-` aus `main` auf **GitHub Pages** und gibt jedem `feature/*`-Branch einen eigenen Vorschau-Ordner — automatisch entfernt, wenn der Branch gelöscht wird.

### SEO

Beide sind standardmäßig an und beide laufen bei `v*`-Tags:

- **`--no-prerender`** entfernt den Schritt, der die von Ihnen aufgezählten Screens (etwa `home`) mit `b-on-g/mol-prerender-action` zu statischem HTML rendert — genau das, wodurch Crawler und Link-Vorschauen echten Inhalt sehen.
- **`--no-seo`** entfernt die `$bog_seo`-Laufzeit: einen Pathname-Router mit Sitemap, `robots.txt`, `llms.txt` und Meta-Injektion pro Seite. Der Job serviert den Build, schreibt kanonisches vorgerendertes HTML heraus und faltet es zurück ins Deployment.

Beide decken dasselbe ab und schreiben in denselben Ordner, deshalb landet nur eines in `deploy.yml`: `$bog_seo`, solange es an ist, und die Prerender-Action, sobald Sie `--no-seo` übergeben. Behalten Sie `$bog_seo`, wenn Sie Sitemaps und Metadaten pro Seite brauchen, und greifen Sie zur Prerender-Action, wenn eine Handvoll öffentlicher Screens die ganze Aufgabe ist.

### Tauri-Desktop

Mit der Tauri-Option baut `tauri.yml` Desktop-Binaries bei `v*`-Tags (oder auf Anforderung) über den wiederverwendbaren Workflow `b-on-g/tauri-mol-workflow-template`, aus demselben Modul, das Sie ins Web deployen.

## Language Server

`view-tree-lsp` ist eine Language-Server-Protocol-Implementierung für das `view.tree`-Format. Führen Sie es bei Bedarf mit npx aus, keine globale Installation nötig:

```bash
npx view-tree-lsp@latest
```

Es scannt Ihren Workspace und gibt jedem LSP-fähigen Editor:

- Vervollständigung für `$mol_*`-Komponenten sowie die in Ihrem eigenen Projekt definierten Komponenten und Properties
- Property-Vorschläge im Rahmen der Komponente unter dem Cursor
- eine Gliederung der Komponenten-Deklarationen zur Navigation
- Live-Updates, während sich Dateien ändern

Da es LSP spricht, können Sie den Language-Client jedes Editors auf `npx view-tree-lsp` richten. Die beiden Integrationen unten verdrahten es für Sie.

## Zed

Die Erweiterung **View Tree Syntax Highlighting for $mol** bündelt die tree-sitter-Grammatik, den Language Server und ein optionales Icon-Theme. Installieren Sie sie über Zeds Erweiterungsmanager:

1. Öffnen Sie die Befehlspalette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Führen Sie **zed: extensions** aus
3. Suchen Sie nach `view.tree` oder `mol` und installieren Sie die Erweiterung

Sie erhalten Syntaxhervorhebung, Vervollständigung und Gliederung für `.view.tree`-Dateien. Der [Quellcode](https://github.com/Dev-cmyser/zed-view.tree-mol-support) und ein passendes [Icon-Theme](https://github.com/Dev-cmyser/zed-viewtree-icon-theme) liegen auf GitHub.

## VS Code

Der MAM-Workspace bringt sein VS-Code-Setup bereits mit. Wenn Sie den geklonten `mam`-Ordner öffnen, bietet VS Code an, die empfohlenen Erweiterungen aus `.vscode/extensions.json` zu installieren:

- `nin-jin.vscode-language-tree` — `view.tree`-Sprachunterstützung
- `stan-donarise.view-tree-language` — Syntax und Grammatik
- `editorconfig.editorconfig` — einheitliche Formatierung

Derselbe Ordner liefert `mol.code-snippets`, sodass Komponenten- und Binding-Snippets ohne zusätzliche Einrichtung verfügbar sind. Nehmen Sie die Aufforderung an, und `.view.tree`- sowie TypeScript-Dateien werden sofort hervorgehoben.

## LLM-Skill

`mol_skill` gibt einem KI-Assistenten den Kontext, den er zum Schreiben von $mol braucht: die `view.tree`-Syntax, den Aufbau eines MAM-Moduls, die Aufteilung zwischen `view.ts` und `view.css.ts`, Datenmodellierung mit Giper Baza und das Packen mit Tauri. Ausgeliefert wird ein schlichter Skill-Ordner, ein `SKILL.md`-Workflow plus Referenzhandbücher, sodass jedes LLM-Werkzeug, das das skills-Format liest, ihn laden kann, Claude Code und Cursor eingeschlossen. Installieren Sie ihn über die skills-CLI:

```bash
npx skills add b-on-g/mol_skill --all -g
```

Danach fragen Sie in eigenen Worten („Aufbau eines MAM-Moduls“, „CRUD und Rollen in Giper Baza“), und der Assistent öffnet vor der Antwort die passende Referenz, sodass der geschriebene Code den Konventionen dieser Dokumentation folgt. Der [Quellcode](https://github.com/b-on-g/mol_skill) liegt auf GitHub, und die Referenzdateien lassen sich auch für sich allein gut lesen, falls Sie sie lieber selbst durchgehen.

## Links

- Scaffolder — [create-view-tree-lsp](https://github.com/Dev-cmyser/create-view-tree-lsp)
- Language Server — [view-tree-lsp](https://github.com/Dev-cmyser/view.tree)
- Zed-Erweiterung — [zed-view.tree-mol-support](https://github.com/Dev-cmyser/zed-view.tree-mol-support)
- LLM-Skill — [mol_skill](https://github.com/b-on-g/mol_skill)
