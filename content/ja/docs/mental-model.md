# メンタルモデル

React や Vue から来たなら、$mol での最初の数日は、そこにないものを探すことに費やされます。`computed`、`watch`、`useEffect`、`onMounted`、ライフサイクルフックの中の `fetch`。それらは API のどこかに隠れているのではありません。モデルにそれらの居場所がないのです。このページはそのモデルの 5 分版です。[ビュー](#!section=docs/page=views)の前に読み、見知った名前が見当たらなくなったら戻ってきてください。

## プッシュではなくプル

誰かが読むまで、何も計算されません。ビューは自分のプロパティを読むことで描画され、各プロパティは必要なものを読み、依存の連鎖はそれらの読み取りから自ずと組み上がります。宣言すべき購読も、登録すべき `watch` もありません。読むことが購読です。

```tree
$my_profile $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
```

```typescript
namespace $.$$ {
	export class $my_profile extends $.$my_profile {
		@ $mol_mem
		user() {
			return this.$.$mol_fetch.json( 'https://api.example.com/me' ) as { name: string }
		}
		name() {
			return this.user().name
		}
	}
}
```

`Name` を描画すると `name()` が読まれ、`name()` は `user()` を読み、`user()` はネットワークを叩きます。ビューにリクエストのことを教えた人はおらず、リクエストにビューのことを教えた人もいません。`user()` が変われば、それを読んだものはすべて再計算され、それ以外は何も再計算されません。

## ライフサイクルはない

`mounted` も `useEffect` も `created` もありません。データはプロパティを読むことで要求され、ビューは描画されるときに自分のプロパティを読みます。ですから上の例は、`$my_profile` が画面に現れたその瞬間にユーザーを読み込み、それより前には読み込みません。ビューが画面から去れば、もう誰も `user()` を読まず、セルはビューとともに解放されます。

「マウント時に fetch」というパターンの代わりは、これで全部です。ビューは必要なものを求め、いつ求めるかはフレームワークが決めます。読み込みはページのイベントに結び付いているのではなく、見えていることに結び付いています。

## プロパティはセルである

省略可能な引数を一つ取るメソッドが、ゲッターであり、セッターであり、計算値であり、状態でもあります。

```typescript
@ $mol_mem
count( next?: number ) {
	return next ?? 0
}
```

引数なしで呼べば読み取り、引数を付けて呼べば書き込みです。`@ $mol_mem` はメソッドを、読み取ったものが変化したときに再計算されるキャッシュされたセルに変えます。計算値とは、他のメソッドを読む `@ $mol_mem` メソッドにすぎません。ウォッチャーは要りません。副作用はイベントに属し、イベントハンドラーは `@ $mol_action` を付けたメソッドです。

```typescript
@ $mol_mem
doubled() {
	return this.count() * 2
}

@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

この二つそれぞれの中で何が起きてよいかの規則は、[状態とリアクティビティ](#!section=docs/page=state)が扱います。

## 待つ同期コード

上の `user()` は同期的に見え、あたかも応答がすでにそこにあるかのように書かれています。これが動くのは、どの計算もファイバーの中で走るからです。`this.$.$mol_fetch.json()` はそのファイバーを中断し、応答が届いたらフレームワークが計算をやり直します。それまでの間、`user()` を読んだビューは読み込み状態を表示し、リクエストが失敗すれば同じビューがエラーを表示します。`isLoading` フラグも `try`/`catch` も書きません。

同じ仕組みがどんな非同期のソースにも働きます。再読み込みとエラー処理は[データ取得](#!section=docs/page=data)が順に説明します。

## すべてはオーバーライド

`view.tree` ファイルはメソッド宣言の一覧です。コンポーネントの下の各行は、デフォルト値を持つそのコンポーネントのプロパティであり、入れ子になったコンポーネントのどのプロパティも、使っているその場で一行で再定義できます。テキスト入力のプレースホルダーは `$mol_string` の `hint` プロパティです。

```tree
$my_search $mol_view
	sub /
		<= Query $mol_string
			hint \Search
			value? <=> query? \
```

拡張すべき props の一覧も、書くべきラッパーも、保守すべきフォークもありません。コンポーネントがプロパティを持っているなら、外から設定できます。

## ソースの読みかた

前の節は本当の問いを呼び起こします。そのプロパティが `hint` という名前だと、どうやって知るのでしょうか。答えは、見るのです。そしてフレームワークは、見ることが安く済むように作られています。

**フレームワークのソースはあなたのソースの隣にあります。** MAM ワークスペースでは、`mol/string/string.view.tree` は `my/hello/` からフォルダ一つ分の距離です。`node_modules` の中でもバンドルの中でもなく、あなた自身が書くのと同じ種類のファイルです。

**クラス名がパスです。** `$mol_string` は `mol/string/` に、`$mol_button_major` は `mol/button/major/` にあります。アンダースコアはすべてフォルダの区切りなので、ツリーにある名前はいつでも、開くべきフォルダに変換できます。[ツール](#!section=docs/page=tooling)のページにあるエディタ統合が、その名前を補完してくれます。

**コンポーネントの `.view.tree` は、デフォルト付きのプロパティの完全な一覧です。** 値の形が型を教えてくれます。`\` は文字列の始まり、`/` はリスト、`*` は辞書、裸の数値は数値、`true` と `false` は真偽値、`null` は不在を意味し、`<=` はサブビューまたは所有者から取るプロパティを導きます。入力にとって大事な `mol/string/string.view.tree` の部分はこれです。

```tree
$mol_string $mol_view
	dom_name \input
	enabled true
	field *
		^
		disabled <= disabled false
		value <= value_changed? <=> value? \
		placeholder <= hint_visible <= hint \
	attr *
		^
		type <= type? \text
```

声に出して読んでみてください。`dom_name \input`——このコンポーネントは `input` 要素を描画します。`enabled true`——真偽値のプロパティで、デフォルトで有効です。`field *` は DOM 要素のフィールドの辞書です。左側の名前は DOM のもの、右側の名前はコンポーネントのもので、いちばん右にあるものがあなたの設定するものです。つまり DOM の `placeholder` は `hint` から来ていて、デフォルトは空文字列。DOM の `value` は書き込み可能な `value?` プロパティ、`type` 属性は書き込み可能な `type?` で、デフォルトは `text` です。プレースホルダー、無効化された入力、パスワード欄は、あなたのツリーではそれぞれ `hint`、`enabled false`、`type \password` です。

**型付きインターフェースは同じツリーから生成されます。** `mol/string/-view.tree/string.view.tree.d.ts` は同じプロパティを TypeScript のシグネチャとして並べ、このサイトの [API リファレンス](#!section=docs/page=api-mol-string)はそのファイルから作られます。三つが食い違わないのは、三つとも一つのソースから来ているからです。

**たいていのコンポーネントには `demo/` フォルダと `readme.md` が付いてきます。** `mol/string/demo/demo.view.tree` は、ヒント付き、無効化、初期値ありの入力を見せてくれます。あるコンポーネントをある状態で使いたくなったら、いちばん近いデモを見つけて、その行をコピーしてください。

まとめると、プレースホルダーは 1 分ほどで片づきます。

```bash
ls mol | grep string
cat mol/string/string.view.tree
```

`$mol_string` の下に `hint \` が見えるので、自分の `$mol_string` の下に `hint \Search` と書きます。

## 名前

すべてが `snake_case` です。`view.tree` のプロパティ名も、TypeScript のメソッド名も、スタイル付けのためにフレームワークが DOM ノードへ付ける属性もそうです。サブビューは大文字で始まり（`Query`）、値は小文字で始まります（`query`）。

ツリーの名前とクラスのメソッド名は、一文字たがわず一致していなければなりません。ツリーの `exchange_form` とクラスの `exchangeForm` は無関係な二つのプロパティです。クラスのほうは決して読まれず、ツリーのほうはデフォルトのまま残り、それを教えてくれるエラーもありません。オーバーライドが何もしていないように見えたら、まずここを確かめてください。[トラブルシューティング](#!section=docs/page=troubleshooting)には、これも含め、画面がおかしいのにコンパイラが黙っているケースが並んでいます。

## 次へ

モデルが頭に入ったら、[ビュー](#!section=docs/page=views)がコンポーネントの宣言と合成の仕方を示し、[React、Vue、Svelte から](#!section=docs/page=rosetta)がすでに知っている名前をここでの名前に対応づけます。
