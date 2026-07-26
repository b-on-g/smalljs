# インストール

[はじめに](#!section=docs/page=getting-started) では、最初のアプリを一歩ずつ作っていきます。このページはリファレンスです。$mol プロジェクトがどう構成され、ビルドがどう動くかを説明します。

## 必要環境

- **Node.js 18+** と **git**。それ以外にグローバルへインストールするものはありません。

## MAM ワークスペース

$mol アプリは **MAM**（ビルドツール兼モジュールレジストリ）の中で動きます。一度クローンし、その中で自分のモジュールを開発します。

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` は `http://localhost:9080/` で監視付きの開発サーバーを起動します。保存するたびに再ビルドし、依存関係を自動で解決します。バンドラーの設定を保守する必要は一切ありません。

## モジュールの命名規則

すべてのコンポーネント名はフォルダのパスに対応し、**アンダースコアはそれぞれフォルダの区切り**です。

```
$my_app          →  my/app/
$my_app_header   →  my/app/header/
```

モジュールのフォルダ名にアンダースコアを含めることはありません。複数単語の名前には入れ子のフォルダを使ってください。使っているコンポーネントがバンドルに現れない場合、ほぼ必ずフォルダのパスとクラス名が一致していません。

## モジュールの構造

コンポーネントは、最大 4 つのファイルを持つフォルダです。

| ファイル | 役割 |
|------|------|
| `name.view.tree` | 宣言的なレイアウト |
| `name.view.ts` | 振る舞い（TypeScript） |
| `name.view.css.ts` | 型付きスタイル |
| `name.view.tree`、`index.html` | アプリモジュールのエントリポイント |

アプリの `index.html` はルートコンポーネントをマウントします。

```html
<body mol_view_root>
	<div mol_view_root="$my_app"></div>
	<script src="web.js"></script>
</body>
```

## 本番用ビルド

開発サーバーは都度ビルドしますが、ワークスペースのルートから任意のモジュールを明示的にビルドすることもできます。

```bash
npm run start my/app
```

出力は `my/app/-/` に生成され、`web.js`、`web.css`、`web.audit.js` が含まれます。**必ず監査ファイルを確認してください。** クリーンな `web.audit.js` は、未使用の依存も型エラーもないことを意味します。

## npm パッケージの追加

`require` でパッケージを参照すると、MAM が次回のビルド時にインストールします。

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

## 次へ

ワークスペースが整ったら、UI 自体をどう記述するかを学びましょう。[ビュー](#!section=docs/page=views) へ進んでください。
