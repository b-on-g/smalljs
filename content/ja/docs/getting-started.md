# はじめかた

このページは、空のフォルダーから動作するリアクティブな $mol アプリまでを案内します。所要時間はおよそ 15 分。以下のスニペットはすべて実際に動くコードです——そのままコピーしてください。

## 必要なもの

- **Node.js 18+** と **git**。リストはこれで全部です。

グローバル CLI をインストールしたり、後で理解しなければならない定型コードを生成したりする必要はありません。$mol アプリは MAM ワークスペースの中で暮らし、そのワークスペースはすでにビルドと配信の方法を知っています。

## 1. ワークスペースを入手する

MAM は $mol のビルドツールでありモジュールレジストリです。一度クローンしてインストールします。

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` は `http://localhost:9080/` で開発サーバーを起動します。ファイルを監視して自動的に再ビルドするので、専用のターミナルで動かしたままにしておきましょう。

## 2. モジュールを作る

$mol アプリは単なるフォルダーです。名前空間（あなた自身のもの、例えば `my`）と名前（`hello`）を選びます。

```bash
mkdir -p my/hello
```

> **覚えておくべき一つのルール：** コンポーネント名の中のアンダースコアはフォルダーの区切りです。`$my_hello` は `my/hello/` に、`$my_hello_form` なら `my/hello/form/` に置かれます。モジュールのフォルダー名にアンダースコアは決して含まれません。

では `my/hello/` の中に 3 つのファイルを追加します。

### index.html — エントリーポイント

```html
<!doctype html>
<html mol_view_root>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>
	<body mol_view_root>
		<div mol_view_root="$my_hello"></div>
		<script src="web.js"></script>
	</body>
</html>
```

`mol_view_root="$my_hello"` 属性が、ページ読み込み時にあなたのコンポーネントをマウントします。

### hello.view.tree — レイアウト

```tree-no-run
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

名前を挙げておく価値のある点がいくつかあります。

- `$mol_page` と `$mol_string` は組み込みコンポーネントです——ページの外枠とテキスト入力です。
- `<=` はプロパティを一方向に、`<=>` は双方向に束縛します。つまり `value? <=> name?` は入力と `name` の状態を同期させ続けます。
- `@` はローカライズ可能な文字列を示し、`\` は生の文字列を開始します。

### hello.view.ts — 振る舞い

```typescript
namespace $.$$ {
	export class $my_hello extends $.$my_hello {
		@ $mol_mem
		greeting() {
			const name = this.name()
			return name ? `Hello, ${name}!` : 'Please enter your name'
		}
	}
}
```

`@ $mol_mem` は `greeting` をリアクティブでキャッシュされるプロパティにします。それは `name()` を読むので、`name` が変わった瞬間に `greeting` が再計算され、画面上のメッセージが更新されます。購読も、エフェクトも、再描画の呼び出しも、あなたは一度も書いていません。

## 3. 実行する

ステップ 1 の開発サーバーはすでに監視しています。次を開くだけです。

```
http://localhost:9080/my/hello/
```

名前を入力してみてください——入力するそばから挨拶が更新されます。これが $mol のリアクティビティです。状態はひとりでにビューへ流れていきます。

## 4. 二つ目のリアクティブな値を足す

リアクティビティは合成できます。追加の配線なしで、同じ `name` に依存する長さカウンターを足してみましょう。

`hello.view.tree` の `Message` の下に一行加えます。

```tree
		<= Counter $mol_view
			sub / <= counter \
```

`hello.view.ts` にメソッドを加えます。

```typescript
		@ $mol_mem
		counter() {
			return `${this.name().length} characters`
		}
}
```

`greeting` も `counter` も `name` を読みます。両方が一緒に更新されます。三つ目を足しても、十個目を足しても——パターンは変わりません。これこそ、機能が積み上がっても $mol のコードが平らなまま保たれる理由です。

## 5. ビルドを確認する

MAM はすべてのアプリの隣に診断ファイルを書き出します。ビルドの後、次を開きます。

```
http://localhost:9080/my/hello/-/web.audit.js
```

きれいな監査は、未使用の依存もなく、型の問題もなく、直すべきものが何もないことを意味します。ちらっと見る習慣をつけましょう——ブラウザーに届く前に間違いを捕まえてくれます。

## $mol アプリを作れました

あなたはリアクティブなコンポーネント、双方向束縛、そして導出された状態を手にしました——3 つの小さなファイルと、設定ゼロで。

先へ進みましょう。**[ガイド](#!section=docs/page=installation)** はインストール、ビュー、状態、ルーティング、データを深く扱い——この Hello World を本物の何かに変えます。
