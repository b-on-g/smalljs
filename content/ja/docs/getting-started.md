# はじめかた

このページは、空のフォルダーから動作するリアクティブな $mol アプリまでを案内します。所要時間はおよそ 15 分。以下のスニペットはすべて実際に動くコードです——そのままコピーしてください。

コンポーネントはふつうの TypeScript で書きます。$mol にはコンポーネントを記述するもっと短い形式 `view.tree` もあり、それには次のページで出会います。ここでは必要ありません。どちらで書いても、$mol のコンポーネントはただのクラスです。

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

では `my/hello/` の中に 2 つのファイルを追加します。

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

`mol_view_root="$my_hello"` 属性が、ページの読み込み時にコンポーネントをマウントします。

### hello.view.ts — コンポーネント

```typescript
namespace $ {

	export class $my_hello extends $mol_page {

		title() {
			return 'Greeting'
		}

		body() {
			return [ this.Name(), this.Message() ]
		}

		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}

		@ $mol_mem
		name( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.greeting() ]
			return obj
		}

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

上から順に読んでみましょう。

- `$my_hello` は `namespace $`、つまりすべての $mol コンポーネントが住む環境名前空間の中にあります。継承しているのは `$mol_page`、タイトルと本体を備えた組み込みのページ外枠です。下に出てくる `$mol_string` は組み込みのテキスト入力欄です。
- `body()` は子を返します。ここでの子はマークアップではなくプロパティです。`Name` と `Message` は呼び出せるメソッドであり、サブクラスで上書きしたり、スタイルシートから名前で狙ったりできます。
- `Name()` は入力欄を組み立てて配線します。そのプロパティに渡すのは値ではなく**アロー関数**です。子はデータが必要になった時点でそのアローを呼ぶので、いつでも最新の値を読みます。
- `name( next?: string )` が状態です。引数なしで呼べば読み、引数付きで呼べば書きます。この関数まるごとを `obj.value` に渡しているからこそ、欄に入力すると `name` が更新されます。
- `@ $mol_mem` はプロパティをインスタンスごとにキャッシュします。`name` に付ければ値が保持され、それを読んだものはすべて値が変わったときに再計算されます。`Name` と `Message` に付ければ、呼び出すたびに新しく作るのではなく、一度だけ作られた子コンポーネントが一つになります。
- `greeting()` は `name()` を読みます。その読み取り*こそが*購読です。`name` が変われば `greeting` が再計算され、画面の文字がそれに続きます。宣言すべきエフェクトも、依存配列も、再描画の呼び出しもありません。

## 3. 実行する

ステップ 1 の開発サーバーはすでに監視中です。次を開くだけです。

```
http://localhost:9080/my/hello/
```

名前を入力すると、入力するそばから挨拶が更新されます。これが $mol のリアクティビティです。状態はひとりでにビューへ流れていきます。

## 4. 二つ目のリアクティブな値を足す

リアクティビティは合成できます。追加の配線なしで、同じ `name` を読む長さカウンターを足してみましょう。

まず `body()` に入れます。

```typescript
		body() {
			return [ this.Name(), this.Message(), this.Counter() ]
		}
```

その裏側の 2 つのプロパティを加えます。

```typescript
		@ $mol_mem
		Counter() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.counter() ]
			return obj
		}

		counter() {
			return `${ this.name().length } characters`
		}
```

`greeting` も `counter` も `name` を読み、両方が一緒に更新されます。三つ目を足しても、十個目を足しても、リアクティブな側は形を変えません。

もう一方は変えます。3 行のロジックが、周りに 6 行の配管を連れてきました——ファクトリ、`new`、アロー、`return obj`。これを実際の画面にある子の数だけ掛け算すれば、`view.tree` が存在する理由になります。

## 5. ビルドを確認する

MAM はすべてのアプリの隣に診断ファイルを書き出します。ビルドの後、次を開きます。

```
http://localhost:9080/my/hello/-/web.audit.js
```

きれいな監査は、未使用の依存もなく、型の問題もなく、直すべきものが何もないことを意味します。ちらっと見る習慣をつけましょう——ブラウザーに届く前に間違いを捕まえてくれます。

## $mol アプリを作れました

双方向束縛と導出状態を備えたリアクティブなコンポーネントが、1 つのファイルに、設定ゼロで。

では、そのまったく同じファイルが縮んでいくところを見てください。**[TypeScript から view.tree へ](#!section=docs/page=from-ts-to-view-tree)**
