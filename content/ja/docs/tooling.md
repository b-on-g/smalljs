# ツール

$mol はどのエディタでも動きますが、少数のツールを使うと `.view.tree` と型付きスタイルが格段に快適になります。プロジェクトのスキャフォルダ、言語サーバー、そして Zed と VS Code のエディタ統合です。

## プロジェクトをスキャフォールドする

`create-view-tree-lsp` は、すぐに動く $mol モジュールを生成するので、ボイラープレートを手で組み立てる必要がありません。

```bash
npx create-view-tree-lsp bog/myapp
```

引数はモジュールパス（`namespace/name`、または同等の `bog_myapp`）です。動作するアプリの `view.tree`、`view.ts`、`view.css.ts`、`index.html` に加え、それをデプロイする GitHub Actions を書き出します。デフォルトでは、local-first ストアの **Giper Baza**、**Docker** のセットアップ、**Tauri** のデスクトップシェルも含まれます。いずれもフラグでオフにできます。

```bash
npx create-view-tree-lsp bog/myapp --no-baza --no-docker --no-tauri
```

一方、いくつかの要素はオプトインです。

- `--backend` は、`node:sqlite` ストレージと共有 TypeScript アイテム型を備えた `$mol_server` の REST バックエンドを追加します
- `--prerender` と `--seo` は検索エンジンでの可視性を追加します。詳細は下の [継続的インテグレーション](#!section=docs/page=tooling/Docs.Body=%E7%B6%99%E7%B6%9A%E7%9A%84%E3%82%A4%E3%83%B3%E3%83%86%E3%82%B0%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3) を参照してください

スキャフォルダは言語サーバー内の CLI の薄いラッパーなので、`npx view-tree-lsp create bog/myapp` でも同じことを直接行えます。

## 継続的インテグレーション

スキャフォルダは GitHub Actions を `.github/workflows/` に書き出すので、新しいプロジェクトは追加のセットアップなしにデプロイとリリースが行われます。

`deploy.yml` はプッシュのたびに実行されます。`hyoo-ru/mam_build` でアプリをビルドし、`main` から `app/-` を **GitHub Pages** に公開し、各 `feature/*` ブランチに専用のプレビューフォルダを与えます。ブランチが削除されると自動的に取り除かれます。

### SEO

独立した 2 つのオプションで、どちらも `v*` タグで発火します。

- **`--prerender`** は、`b-on-g/mol-prerender-action` を使って、あなたが列挙した画面（`home` など）を静的 HTML にレンダリングするので、クローラーやリンクプレビューが本物のコンテンツを見られます。
- **`--seo`** は `$bog_seo` ランタイムを追加します。サイトマップ、`robots.txt`、`llms.txt`、ページごとのメタ注入を備えた pathname ルーターです。ジョブはビルドを配信し、正規のプリレンダー済み HTML をダンプして、それをデプロイに折り込みます。

少数の公開画面をクロール可能にしたいときは prerender アクションを、サイトマップとページごとのメタデータが必要なときは `$bog_seo` を選んでください。

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

## リンク

- スキャフォルダ — [create-view-tree-lsp](https://github.com/Dev-cmyser/create-view-tree-lsp)
- 言語サーバー — [view-tree-lsp](https://github.com/Dev-cmyser/view.tree)
- Zed 拡張 — [zed-view.tree-mol-support](https://github.com/Dev-cmyser/zed-view.tree-mol-support)
