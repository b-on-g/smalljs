# Projektstruktur

Ein $mol-Projekt hat vier verschachtelte Ebenen: den **Workspace**, den Sie geklont haben, die **Pakete** darin, die **Module** in den Paketen und die **Dateien** in einem Modul. Die Aufteilung beantwortet eine praktische Frage — wohin ein neues Projekt gehört und wem seine Historie gehört — und fast alles, was der Build tut, folgt daraus.

```structure
mam/                         Workspace — der geklonte MAM-Checkout
├── .meta.tree               Registry: welches Paket aus welchem Repository
├── mol/                     Paket — das Framework selbst, eigenes git-Repository
└── my/                      Paket — Ihres, Ihr eigenes git-Repository
    ├── .gitattributes       hält gebaute Binärdateien unversehrt
    ├── my.meta.tree         Registry Ihrer eigenen Projekte
    └── hello/               Projekt — ein Modul und ein eigenes git-Repository
        ├── index.html       Einstiegspunkt (nur App-Module)
        ├── hello.view.tree  das Markup
        └── form/            Untermodul — $my_hello_form
```

Auf dieser Seite trägt jede Zeile der Auflistung ein Fragezeichen mit dem Grund, warum sie dort steht; die Abschnitte weiter unten sagen dasselbe ausführlich.

## Ein Projekt anlegen

Fünf Schritte. Nur der erste wiederholt sich, und die letzten drei kann der Scaffolder für Sie erledigen.

**1. Den Workspace einmal klonen.** Alles, was Sie ab jetzt schreiben, liegt darin.

```bash
git clone https://github.com/hyoo-ru/mam.git
cd mam
```

**2. Ein eigenes Paket anlegen.** Ein kurzer Ordner — Ihr Name, Ihre Firma, Ihr Handle — und ein eigenes git-Repository. Es ist der Container für jedes Projekt, das Sie beginnen:

```bash
mkdir my
cd my
git init
```

Veröffentlichen Sie es dort, wo Sie Code halten, öffentlich oder privat. Legen Sie gleich eine `.gitattributes` mit der einen Zeile `* -text` dazu; warum, steht weiter unten im Abschnitt über Pakete.

**3. Die Registry hinzufügen.** `my/my.meta.tree` ist die Liste der Projekte in Ihrem Paket. Sie beginnt leer und bekommt pro Projekt eine Zeile:

```tree
pack hello git \https://github.com/you/hello.git
```

MAM liest sie genauso wie die `.meta.tree` des Workspace eine Ebene höher, sodass eine Kollegin, die `my/` klont, auch die Projekte bekommt.

**4. Das Projekt anlegen, mit eigenem Repository.** Der Ordner ist die Komponente — `my/hello/` ist `$my_hello` — und seine Historie gehört ihm, nicht Ihrem Paket und nicht $mol:

```bash
mkdir hello
cd hello
git init
```

Genau diese Trennung ist der Sinn der Aufteilung: ein Commit in `my/hello/` geht ins Repository `hello`, nie nach `my` und nie nach `mol`.

**5. Es eintragen.** Fügen Sie die `pack`-Zeile aus Schritt 3 in `my/my.meta.tree` ein, und ein frischer Checkout Ihres Pakets holt das Projekt beim Namen.

Der [Scaffolder](#!section=docs/page=tooling) schreibt Ihnen jederzeit nach Schritt 2 ein lauffähiges Modul:

```bash
npx create-view-tree-lsp my/hello
```

## Workspace

Sie klonen MAM einmal und arbeiten darin. Es ist kein Ordner, in den Abhängigkeiten kopiert werden: jedes Paket liegt dort als eigener git-Checkout, mit Historie, sodass Sie den Quellcode des Frameworks lesen, einen `debugger` hineinsetzen und aus derselben Arbeitskopie einen Pull Request öffnen können.

Die `.meta.tree` im Wurzelverzeichnis ist die Registry, die das möglich macht:

```tree
pack mol git \https://github.com/hyoo-ru/mam_mol.git
pack hyoo git \https://github.com/hyoo-ru/mam_hyoo.git
pack lib git \https://github.com/hyoo-ru/mam_lib.git
```

Wenn der Build auf `$mol_view` trifft und es noch keinen `mol/`-Ordner gibt, schlägt er den Namen hier nach und klont das Repository. Nichts wird vendored und nichts wird flachgeklopft.

## Pakete

Ein Ordner der obersten Ebene ist ein Paket, und ein Paket ist ein git-Repository. Ihr eigenes Paket ist einfach ein Ordner, den Sie benennen: solange es lokal bleibt, braucht es keine Registrierung, und eine `pack`-Zeile an dem Tag, an dem Sie es per Name geholt haben wollen.

Pakete verschachteln sich. Ein Paket kann eigene `pack`-Deklarationen für die Ordner darin tragen, und MAM liest sie aus der `meta.tree` des Ordners, der das Paket enthalten wird. Diese Seite liegt in `bog/smalljs/` und ist ein eigenes Repository, gelistet in `bog/bog.meta.tree`, das selbst im `bog/`-Checkout aus der `.meta.tree` der Wurzel liegt.

### Eine Datei, die jedes Paket braucht

Ein Paket, das deployt wird, braucht eine `.gitattributes` mit einer einzigen Zeile:

```
* -text
```

Das schaltet die Normalisierung der Zeilenenden durch git ab. Es ist wichtig, weil Deployment bedeutet, die Build-Ausgabe in einen Branch zu committen, und diese Ausgabe ist nicht nur Text: diese Seite liefert 57 Binärdateien aus, die Schriften, die sie selbst hostet, und ein Vorschaubild pro Seite. Auf dem Weg hinein normalisiert, kommen sie beim Leser als kaputte Bilder und Schriften an, während der Build selbst grün bleibt. Der MAM-Checkout hat dieselbe Datei in seiner Wurzel, dort sind die Schriftformate zusätzlich als `binary` markiert.

Der Scaffolder schreibt sie für Sie; in einem Repository, das Sie selbst angelegt haben, fügen Sie sie von Hand hinzu.

## Module

Ein Modul ist ein Ordner, und ein Ordner ist eine Komponente. Es gibt kein Import-Statement und keine Modul-Map: der Klassenname *ist* die Adresse, und jeder Unterstrich darin ist ein Ordnertrenner:

```
$my_hello          →  my/hello/
$my_hello_form     →  my/hello/form/
$mol_button_major  →  mol/button/major/
$mol_after_frame   →  mol/after/frame/
```

Das ist die ganze Auflösungsregel. Der Builder durchsucht Ihren Quelltext nach `$name`-Tokens, spaltet jedes an `_` auf und läuft die Ordner entlang. Nichts deklariert eine Abhängigkeit; einen Namen zu benutzen ist die Deklaration.

Die praktische Folge: **Ordnernamen von Modulen enthalten nie einen Unterstrich.** Ein Ordner namens `my/hello_form/` würde unter `my/hello/form/` gesucht und nie gefunden — das Symptom ist eine Klasse, die in Ihrem Editor kompiliert, aber im Bundle fehlt.

Ein Modul mit Submodulen kann selbst eine Komponente sein, in einer von zwei Formen. `$mol_button` liegt direkt in `mol/button/`, neben `major/` und `minor/`. `$mol_view` liegt eine Ebene tiefer, in `mol/view/view/`, weil `mol/view/` auch `component/`, `selection/` und `tree2/` enthält. MAM probiert zuerst den verdoppelten Pfad und fällt auf den kürzeren zurück, also lösen sich beide Anordnungen auf.

## Dateien in einem Modul

Jede Datei ist optional. Ein Modul ist genau das, was an Dateien darin liegt.

| Datei | Zweck |
|------|---------|
| `hello.view.tree` | Deklaratives Layout |
| `hello.view.ts` | Verhalten: die Klasse, die die generierte Basis erweitert |
| `hello.view.css.ts` | Typisierte Styles. Beachten Sie das `.ts` am Ende: es ist TypeScript, das `$mol_style_define` aufruft, kein Stylesheet |
| `hello.ts` | Ein Modul ganz ohne View — Modelle, Utilities, reine Logik |
| `hello.test.ts` | Tests, vom Builder ausgeführt |
| `hello.locale=ru.json` | Übersetzungen; jede Datei, die auf `.locale=<lang>.json` endet, wird aufgegriffen |
| `hello.meta.tree` | Build- und Deploy-Direktiven |
| `index.html` | Einstiegspunkt — nur ein App-Modul braucht einen |

Ein Suffix vor der Endung beschränkt eine Datei auf eine Umgebung:

- `frame.web.ts` — nur das Browser-Bundle, wie `mol/after/frame/frame.web.ts`
- `build.node.ts` — nur das Node-Bundle, wie der MAM-Builder selbst
- `hello.test.ts` — nur Test-Bundles

Der Builder erzeugt für jede App ein `web`- und ein `node`-Bundle und lässt die Dateien fallen, die für das jeweils andere markiert sind, sodass plattformspezifischer Code sich zur Laufzeit nie selbst absichern muss.

Rohe `.css`-Dateien werden neben einem Modul ebenfalls akzeptiert — das Framework nutzt sie für die wenigen Dinge, die typisierte Styles nicht ausdrücken können, etwa `@keyframes` und `content:`. Alles andere gehört in `.view.css.ts`, wo die Eigenschaftsnamen geprüft werden.

## Generierte Ordner beginnen mit einem Bindestrich

MAM behandelt einen Namen nur dann als Quelle, wenn er mit einem Buchstaben oder einer Ziffer beginnt. Alles andere ist für den Build unsichtbar, weshalb jeder generierte Ordner das Präfix `-` bekommt: die Ausgabe kann direkt neben ihrer Eingabe liegen, ohne wieder als Eingabe eingelesen zu werden. Die `.gitignore` des Workspace ignoriert `-*` aus demselben Grund.

**`-view.tree/`** erscheint neben jeder `.view.tree`-Datei und enthält das, wozu der Baum kompiliert:

```
my/hello/-view.tree/
├── hello.view.tree.js            die generierte Basisklasse
├── hello.view.tree.d.ts          ihr typisiertes Interface
└── hello.view.tree.locale=en.json  die @-Strings, extrahiert
```

Ihre `hello.view.ts` erweitert die Klasse dort drin. Das ist die ganze Beziehung zwischen den beiden Dateien — [Von TypeScript zu view.tree](#!section=docs/page=from-ts-to-view-tree) geht den generierten Code Zeile für Zeile durch.

**`-css/`** erscheint neben einer rohen `.css`-Datei und enthält ein generiertes `.ts`, das das Stylesheet in einen `$mol_style_attach`-Aufruf hüllt, sodass es mit dem Bundle reist statt ein `<link>` zu brauchen.

**`-/`** ist die Build-Ausgabe eines Moduls, das Sie gebaut haben. Für eine App enthält es `web.js`, `web.css`, `web.audit.js`, `web.d.ts`, `web.deps.json`, ein `web.locale=<lang>.json` pro Sprache, die `node`-Gegenstücke, eine umgeschriebene `index.html` sowie eine generierte `package.json` und `manifest.json`. Dieser Ordner ist das, was Sie deployen: `app/-` auf einem statischen Host zu veröffentlichen ist der gesamte Deploy-Schritt.

Nichts davon wird von Hand bearbeitet. Der Builder schreibt diese Dateien neu, sobald sich ihre Quelle ändert, also verschwindet eine Änderung dort beim nächsten Speichern, ohne dass eine Fehlermeldung Ihnen sagt, warum. Ändern Sie die `.view.tree`, die `.css` oder die Quellen und bauen Sie neu.

## Was meta.tree tatsächlich tut

`meta.tree` ist kein Paketmanifest und listet keine Abhängigkeiten auf — die kommen aus dem Code, wo ein `$mol_view`-Token bereits die ganze Deklaration ist. Es trägt die Handvoll Dinge, die der Code nicht selbst aussagen kann. Die `app/app.meta.tree` dieser Seite ist die vollständige Datei:

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

- **`deploy \/path`** kopiert eine Datei oder einen Ordner nach `-/` und behält dabei den Pfad relativ zum Workspace: `\/bog/smalljs/assets` landet in `app/-/bog/smalljs/assets/`. Für statische Dateien, die der Deploy mitführen muss, die aber kein Code importiert: Bilder, Schriften, Icons.
- **`include \/path`** und **`require \/path`** erzwingen ein Modul, das nichts referenziert, etwa `\/mol/offline/install`, dessen ganzer Zweck der Service Worker ist, den es beim Laden registriert. Sie unterscheiden sich nur in der Reihenfolge: `require` stellt das Modul vor den Code, der es hereingeholt hat, `include` dahinter.
- **`pack <name> git \<url>`** ist der oben beschriebene Registry-Eintrag, gelesen aus der meta-Datei des Ordners, der das Paket enthalten wird.

MAM liest jede `*.meta.tree`-Datei in einem Ordner, der Name trägt also keine Bedeutung über die Konvention hinaus: `<module>.meta.tree` neben einem Modul, `.meta.tree` in der Workspace-Wurzel.

In der Praxis gehören `deploy`, `include` und `require` zum App-Modul, denn das ist das Ding, das gebaut und deployt wird; gewöhnliche Komponenten lösen alles aus ihrem Code auf und brauchen überhaupt keine meta-Datei. Ein Bibliotheksmodul bekommt eine nur dann, wenn es wirklich eine unreferenzierte Abhängigkeit hat: `mol/assert/assert.meta.tree` ist eine einzige `include \/mol/dev/format`-Zeile, und das ist eine typische Größe.

Mehr zu den Direktiven unter [Modul-Metadaten](#!section=docs/page=meta).

## Weiter

[Installation](#!section=docs/page=installation) behandelt den Dev-Server und den Produktions-Build, und [Werkzeuge](#!section=docs/page=tooling) hat einen Scaffolder, der Ihnen ein korrektes Modul-Layout schreibt.
