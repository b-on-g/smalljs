# ツール

$mol はどのエディタでも動きますが、少数のツールを使うと `.view.tree` と型付きスタイルが格段に快適になります。プロジェクトのスキャフォルダ、言語サーバー、Zed と VS Code のエディタ統合、そして LLM アシスタントにフレームワークを教えるスキルです。

## プロジェクトをスキャフォールドする

`create-view-tree-lsp` は、すぐに動く $mol モジュールを生成するので、ボイラープレートを手で組み立てる必要がありません。

```bash
npx create-view-tree-lsp bog/myapp
```

自分の MAM チェックアウトのルートで実行してください。モジュールパスはそこを起点に解決され、プロジェクトもそこに置かれます。ワークスペースの外では、最初のビルドで気づく前にコマンドが警告します。

引数はモジュールパス（`namespace/name`、または同等の `bog_myapp`）です。動作するアプリの `view.tree`、`view.ts`、`view.css.ts`、`index.html` に加え、それをデプロイする GitHub Actions を書き出します。

スキャフォルダーが追加できるものは、すべてデフォルトで入ります。要らないものだけを挙げてください。

```bash
npx create-view-tree-lsp bog/myapp --no-tauri --no-backend
```

- `--no-baza` — local-first ストアの **Giper Baza**
- `--no-docker` — `docker-compose.yml` と nginx 設定を含む **Docker** のセットアップ
- `--no-tauri` — **Tauri** のデスクトップシェル
- `--no-backend` — `node:sqlite` ストレージと共有 TypeScript アイテム型を備えた `$mol_server` の REST バックエンド
- `--no-prerender`、`--no-seo` — 検索エンジンでの可視性。詳細は下の [継続的インテグレーション](#!section=docs/page=tooling/Docs.Body=%E7%B6%99%E7%B6%9A%E7%9A%84%E3%82%A4%E3%83%B3%E3%83%86%E3%82%B0%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3) を参照してください

知らないフラグは実行を止めます。打ち間違いで何かが黙って残ることはありません。

スキャフォルダは言語サーバー内の CLI の薄いラッパーなので、`npx view-tree-lsp create bog/myapp` でも同じことを直接行えます。

## 翻訳

翻訳は自分のモジュールの隣、`<module>/<name>.locale=<lang>.json` に置かれます。コードには都合がよいのですが、翻訳者にはそうでもありません。文言の一覧ではなく、細かいファイルが 30 個届くことになるからです。

**[$yuf_localizer](https://zerkalica.github.io/yuf/#!demo=yuf_localizer_demo)** がその隔たりを埋めます。プロジェクトの URL と言語コードを渡せば、すべてのキーを検索可能な 1 つのリストにまとめ、まだ手つかずのものに印を付けてくれます。英語しかないキー、直したけれどコミットしていないキー、プロジェクトにもう存在しない古いキー、といった具合です。訳文はエクスポートするまでブラウザに残るので、作業を中断しても失われません。

翻訳者の作業が終わったら、結果を書き出してモジュールへ振り分けます。

```bash
# MAM のルートで実行
npx view-tree-lsp locale bog/myapp/app/- --exclude=mol --update
```

引数はフォルダでも、単一のロケールファイルでも構いません。オプションは次のとおりです。

- `--include=` はパスの断片を受け取り、それを含むモジュールだけを残します。何度でも指定できます
- `--exclude=` は逆にそれらを飛ばします。`--exclude=mol` ならフレームワーク自身のパッケージには手を触れません
- `--update` は既存ファイルにマージします。入力側の値が勝ち、入力に無いキーはそのまま残ります
- `--dry` は計画を表示するだけで、何も書き込みません

キーは自分のモジュールパスを含んでいるので、`$my_page_greeting` は所属するソースの隣、`my/page/page.locale=ru.json` に収まります。ただしそのモジュールを言い当てるのは見た目より厄介です。`_` はフォルダの区切りでも単語の区切りでもあるため、「最長一致するパス」は誤った答えになります。`$my_page_lang_hint` ではプロパティが `lang` で始まり、隣に本物の `my/page/lang` サブモジュールがあれば、そちらがキーを飲み込んでしまいます。そこでこのコマンドは、候補となる各モジュールに「どのキーを宣言しているか」を尋ねます。MAM はまさにそれを `-view.tree` のロケールファイルへ書き出しているので、キーは正しい持ち主に渡ります。

## 継続的インテグレーション

スキャフォルダは GitHub Actions を `.github/workflows/` に書き出すので、新しいプロジェクトは追加のセットアップなしにデプロイとリリースが行われます。

`deploy.yml` はプッシュのたびに実行されます。`hyoo-ru/mam_build` でアプリをビルドし、`main` から `app/-` を **GitHub Pages** に公開し、各 `feature/*` ブランチに専用のプレビューフォルダを与えます。ブランチが削除されると自動的に取り除かれます。

### SEO

どちらもデフォルトで有効で、どちらも `v*` タグで動きます。

- **`--no-prerender`** は、挙げた画面（`home` など）を `b-on-g/mol-prerender-action` で静的 HTML にレンダリングする手順を外します。クローラーやリンクプレビューが本物の内容を見られるのは、これのおかげです。
- **`--no-seo`** は `$bog_seo` ランタイムを外します。サイトマップ、`robots.txt`、`llms.txt`、ページごとのメタ注入を備えた pathname ルーターです。ジョブはビルドを配信し、正規の事前レンダリング HTML を書き出し、それをデプロイに畳み込みます。

両者は同じ範囲を覆い、同じフォルダーに書き込むため、`deploy.yml` に入るのは片方だけです。`$bog_seo` が有効な間はそちら、`--no-seo` を渡した時点でプリレンダー・アクションになります。サイトマップとページごとのメタデータが要るなら `$bog_seo` を残し、公開画面がひと握りで済むならプリレンダー・アクションに落としてください。

### Tauri デスクトップ

Tauri オプションを使うと、`tauri.yml` が再利用可能なワークフロー `b-on-g/tauri-mol-workflow-template` を通じて、`v*` タグで（またはオンデマンドで）デスクトップバイナリをビルドします。ウェブにデプロイするのと同じモジュールからです。

## 言語サーバー

`view-tree-lsp` は `view.tree` 形式のための Language Server Protocol 実装です。グローバルインストールは不要で、npx でオンデマンドに実行できます。

```bash
npx view-tree-lsp@latest
```

ワークスペースをスキャンし、LSP に対応したあらゆるエディタに次を提供します。

- `$mol_*` コンポーネント、および自分のプロジェクトで定義したコンポーネントとプロパティの補完
- カーソル下のコンポーネントに限定したプロパティ候補
- ナビゲーション用のコンポーネント宣言のアウトライン
- ファイルの変更に応じたライブ更新

LSP を話すので、どのエディタの言語クライアントも `npx view-tree-lsp` に向けられます。下の 2 つの統合が代わりに配線してくれます。

## Zed

**View Tree Syntax Highlighting for $mol** 拡張は、tree-sitter 文法、言語サーバー、任意のアイコンテーマをまとめています。Zed の拡張マネージャーからインストールしてください。

1. コマンドパレットを開く（`Cmd+Shift+P` / `Ctrl+Shift+P`）
2. **zed: extensions** を実行する
3. `view.tree` または `mol` を検索して拡張をインストールする

`.view.tree` ファイルのシンタックスハイライト、補完、アウトラインが得られます。[ソース](https://github.com/Dev-cmyser/zed-view.tree-mol-support) と対応する [アイコンテーマ](https://github.com/Dev-cmyser/zed-viewtree-icon-theme) は GitHub にあります。

## VS Code

MAM ワークスペースはすでに VS Code のセットアップを備えています。クローンした `mam` フォルダを開くと、VS Code は `.vscode/extensions.json` の推奨拡張のインストールを提案します。

- `nin-jin.vscode-language-tree` — `view.tree` の言語サポート
- `stan-donarise.view-tree-language` — シンタックスと文法
- `editorconfig.editorconfig` — 一貫したフォーマット

同じフォルダは `mol.code-snippets` も同梱しており、コンポーネントとバインディングのスニペットが追加設定なしで使えます。プロンプトを承認すれば、`.view.tree` と TypeScript のファイルが最初からハイライトされます。

## LLM スキル

`mol_skill` は、$mol を書くために AI アシスタントが必要とする文脈を与えます。`view.tree` の構文、MAM モジュールの構成、`view.ts` と `view.css.ts` の分担、Giper Baza でのデータモデリング、Tauri でのパッケージングです。中身は素朴なスキルフォルダで、`SKILL.md` のワークフローとリファレンス集だけなので、skills 形式を読める LLM ツールなら Claude Code でも Cursor でも読み込めます。skills CLI でインストールします:

```bash
npx skills add b-on-g/mol_skill --all -g
```

あとは自分の言葉で「MAM モジュールの構成」「Giper Baza の CRUD とロール」などと尋ねれば、アシスタントは答える前に該当するリファレンスを開くので、書かれるコードはこのドキュメントの流儀に沿います。[ソース](https://github.com/b-on-g/mol_skill)は GitHub にあり、リファレンス自体を自分で読み通してもかまいません。

## リンク

- スキャフォルダ — [create-view-tree-lsp](https://github.com/Dev-cmyser/create-view-tree-lsp)
- 言語サーバー — [view-tree-lsp](https://github.com/Dev-cmyser/view.tree)
- Zed 拡張 — [zed-view.tree-mol-support](https://github.com/Dev-cmyser/zed-view.tree-mol-support)
- LLM スキル — [mol_skill](https://github.com/b-on-g/mol_skill)
