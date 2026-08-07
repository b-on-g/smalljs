# Werkzeuge

$mol funktioniert in jedem Editor, aber eine kleine Auswahl an Werkzeugen macht `.view.tree` und typisierte Styles deutlich komfortabler: ein Projekt-Scaffolder, ein Language Server, Editor-Integrationen für Zed und VS Code sowie ein Skill, der LLM-Assistenten das Framework beibringt.

## Ein Projekt scaffolden

`create-view-tree-lsp` erzeugt ein sofort lauffähiges $mol-Modul, sodass Sie den Boilerplate-Code nicht von Hand zusammenbauen müssen:

```bash
npx create-view-tree-lsp bog/myapp
```

Das Argument ist der Modulpfad (`namespace/name` oder das gleichwertige `bog_myapp`). Es schreibt `view.tree`, `view.ts`, `view.css.ts` und `index.html` für eine funktionierende App sowie die GitHub Actions zum Deployen. Standardmäßig enthält es außerdem einen local-first Speicher **Giper Baza**, ein **Docker**-Setup und eine **Tauri**-Desktop-Hülle. Jedes davon lässt sich mit einem Flag abschalten:

```bash
npx create-view-tree-lsp bog/myapp --no-baza --no-docker --no-tauri
```

Ein paar Bestandteile sind stattdessen optional:

- `--backend` fügt ein `$mol_server`-REST-Backend mit `node:sqlite`-Speicher und einem gemeinsam genutzten TypeScript-Item-Typ hinzu
- `--prerender` und `--seo` fügen Sichtbarkeit für Suchmaschinen hinzu, weiter unten unter [Kontinuierliche Integration](#!section=docs/page=tooling/Docs.Body=Kontinuierliche%20Integration) beschrieben

Der Scaffolder ist ein dünner Wrapper über der CLI im Language Server, sodass `npx view-tree-lsp create bog/myapp` dasselbe direkt erledigt.

## Kontinuierliche Integration

Der Scaffolder schreibt die GitHub Actions nach `.github/workflows/`, sodass ein neues Projekt ohne zusätzliche Einrichtung deployt und released wird.

`deploy.yml` läuft bei jedem Push. Es baut die App mit `hyoo-ru/mam_build`, veröffentlicht `app/-` aus `main` auf **GitHub Pages** und gibt jedem `feature/*`-Branch einen eigenen Vorschau-Ordner — automatisch entfernt, wenn der Branch gelöscht wird.

### SEO

Zwei unabhängige Optionen, beide ausgelöst durch `v*`-Tags:

- **`--prerender`** rendert die von Ihnen aufgelisteten Screens (etwa `home`) mit `b-on-g/mol-prerender-action` zu statischem HTML, sodass Crawler und Link-Vorschauen echten Inhalt sehen.
- **`--seo`** fügt die `$bog_seo`-Laufzeit hinzu: einen Pathname-Router mit Sitemap, `robots.txt`, `llms.txt` und Meta-Injektion pro Seite. Der Job serviert den Build, dumpt kanonisches vorgerendertes HTML und faltet es zurück in das Deploy.

Greifen Sie zur Prerender-Action, wenn eine Handvoll öffentlicher Screens crawlbar sein muss, und zu `$bog_seo`, wenn Sie Sitemaps und Metadaten pro Seite brauchen.

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
