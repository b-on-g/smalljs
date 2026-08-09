# TypeScript から view.tree へ

[はじめかた](#!section=docs/page=getting-started)で書いたコンポーネントは、ふつうの TypeScript クラスです。コンパイルも実行もできますし、$mol のコンポーネントを記述する正式にサポートされた書き方の一つでもあります。

同時にそれは、コンポーネントの仕事とは関係のない四つのことを頭の中に置いておくよう求めてきました。このページではそれを一つずつ取り上げ、それぞれを消してくれる `view.tree` の一行を見せます。最後にコンパイラが生成するコードを示すので、ツリーが第二のランタイムではないことを自分で確かめられます。ツリーが生むのは、あなたがすでに書いたあのクラスそのものです。

比較用に、あのファイルをもう一度置いておきます。

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

## 子は自分で作り、自分でキャッシュする

そのうち 6 行はファクトリです。

```typescript
		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}
```

`@ $mol_mem` を消してもコンパイルは通ります。ただし一つのコンポーネントではなくなります。`this.Name() !== this.Name()` です。本体が呼ばれるたびに `new` を実行するからです。最後にプロパティを読んだ者が勝ち、それ以前のインスタンスは抱えていたものごと取り残され、誰も後始末をしません。$mol が所有するのは、$mol 自身があなたのためにキャッシュしたオブジェクトだけだからです。

`view.tree` では同じ子が一行です。

```tree
		<= Name $mol_string
```

大文字で始まる名前は、そのプロパティがコンポーネントを保持していることを意味し、`<=` がそれを宣言します。デコレーターを書き忘れる短い書き方は存在しません。ファクトリを書くのがあなたではないからです。

## データの向きは演算子が語る

子にデータを与えるとは、プロパティごとに代入することです。

```typescript
			obj.sub = () => [ this.greeting() ]
```

可動部が三つ。子オブジェクト、プロパティ名、そして読み取りを今ではなく後に起こすためのアロー。この行は何と何がつながっているかは語りますが、どちら向きかは語りません。それを知るにはアローの中身を読み、何かが戻ってくるかを確かめる必要があります。

ツリーは向きを演算子に持たせます。

```tree
		<= Message $mol_view
			sub / <= greeting \
```

`<=` は一方向、`greeting` から子の `sub` へ。`/` はリスト、`\` は生の文字列の始まり、そして `greeting \` は既定値を空文字列としたプロパティの宣言です——あとで TypeScript 側で上書きする、あの値です。

## 双方向束縛は、キー一つで黙って読み取り専用になる

入力欄には双方向のデータが要ります。それを担うのが `next` というパラメーターです。

```typescript
			obj.value = ( next?: string ) => this.name( next )
```

ここで `next` を落としてみます。

```typescript
			obj.value = () => this.name()
```

TypeScript はこれを受け入れます。引数を取らない関数は、省略可能な引数が一つ期待される場所に代入できるので、型は通り、監査も緑のままです。欄は描画され、正しい値を表示し、あなたが打ち込むものを黙って無視します。

ツリーでは、この半分だけの接続は書けません。

```tree
		<= Name $mol_string
			value? <=> name? \
```

`<=>` は双方向に束縛します。裸の `?` は引数を取るプロパティ、つまり書き込めるプロパティであることを示します。ここでは両端に付いているので、値は欄へ流れ込み、また戻ってきます。

## ローカライズ可能な文字列は、キーにするまでただの文字列

```typescript
		title() {
			return 'Greeting'
		}
```

これを翻訳するには、キーを自分で考え、リテラルを `$mol_locale.text` の呼び出しに置き換え、json を書き、プロジェクトが続く限り両者を手で揃え続けることになります。

```tree
	title @ \Greeting
```

`@` が文字列をローカライズ可能だと印を付け、残りはビルドがやります。ビルド後、`my/hello/-/web.locale=en.json` の中身はこうです。

```json
{
	"$my_hello_Name_hint": "Enter your name",
	"$my_hello_title": "Greeting"
}
```

翻訳者はアプリの全文字列が入った json を受け取ります。あなたはキーを一つも書きません。

## コンポーネント全体

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

これが `hello.view.tree` です。`hello.view.ts` に残るのは、そもそも構造ではなかった部分だけです。

```typescript
namespace $.$$ {

	export class $my_hello extends $.$my_hello {

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

クラスはツリーが生成した基底 `$.$my_hello` を継承し、プロパティを一つ上書きします。`$.$$` はそうした上書きのための名前空間です。

## コンパイラが吐くもの

`view.tree` は自前のランタイムを持たないコードジェネレーターです。モジュールをビルドして `my/hello/-view.tree/hello.view.tree.js` を読んでみてください。

```javascript
	($.$my_hello) = class $my_hello extends ($.$mol_page) {
		name(next){
			if(next !== undefined) return next;
			return "";
		}
		Name(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this.$.$mol_locale.text("$my_hello_Name_hint")));
			(obj.value) = (next) => ((this.name(next)));
			return obj;
		}
		greeting(){
			return "";
		}
		Message(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.greeting())]);
			return obj;
		}
		title(){
			return (this.$.$mol_locale.text("$my_hello_title"));
		}
		body(){
			return [(this.Name()), (this.Message())];
		}
	};
	($mol_mem(($.$my_hello.prototype), "name"));
	($mol_mem(($.$my_hello.prototype), "Name"));
	($mol_mem(($.$my_hello.prototype), "Message"));
```

同じファクトリ、同じアロー、同じ 3 回の `$mol_mem` 呼び出し、加えてあなたが名付けずに済んだ 2 つのロケールキー。バンドルがブラウザーに届くころには、ツリーはもうどこにもありません。

二つの形式が自由に混ざるのもそのためです。ツリーで書いたコンポーネントとクラスで書いたコンポーネントは同じ種類のオブジェクトを生むので、一つのアプリが両方を抱えても、誰も違いに気づきません。

## 手書きのクラスがツールに渡せないもの

生成された JS の隣に、コンパイラは `hello.view.tree.d.ts` も書き出します。

```typescript
declare namespace $ {

	type $mol_string__hint_my_hello_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_my_hello_2 = $mol_type_enforce<
		ReturnType< $my_hello['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_view__sub_my_hello_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $my_hello extends $mol_page {
		name( next?: string ): string
		Name( ): $mol_string
		greeting( ): string
		Message( ): $mol_view
		title( ): string
		body( ): readonly(any)[]
	}

}
```

`$mol_type_enforce` の対が、各束縛とそれが供給するプロパティを突き合わせます。おかげで型の食い違いは子の奥深くではなく、束縛そのものの位置で報告されます。その下のクラス本体はコンポーネントの表面を機械可読に書き出したもので、実際に読まれています。上のロケールファイルは同じ解析から抽出されますし、このサイトの [API ページ](#!section=docs/page=api-mol-string)も各基本コンポーネントの `.view.tree.d.ts` から生成されています。

手書きのクラスはそのどれも提供しません。それはコードであり、読めるのは TypeScript だけです。

## 分量の話

上の Hello World の場合、31 行の TypeScript が、8 行のツリーと 8 行の TypeScript になります。

コンポーネントが大きくなるほど差は開きます。`$mol_app_users` は検索欄、リスト、ボタン 4 つ、ステータス行を持ち、ツリーなら 30 行 840 文字、クラスなら 125 行 3046 文字です。両方の版が wiki の[フォーマット比較](https://github.com/hyoo-ru/mam_mol/wiki/View-Formats)ページに全文載っているので、取引の重さは自分で量れます。

## どちらを書くか

両方を、コンポーネント単位で選んで。

`view.ts` はサポートされた形式です。ツリーがコンパイルされる先そのものであり、その書き方のコンポーネントも他と同じように振る舞います。ロジックが中心で子が一つか二つのコンポーネントなら、クラスのほうが誠実で、ツリーの利は小さいでしょう。

ツリーが元を取るのは、儀式が繰り返される場所です。構造が大半を占める画面、長々と並ぶ束縛、翻訳者が見たがるテキストを含むもの。ユーザーインターフェイスの大部分はまさにそれで、だから $mol 自身のコンポーネントもこの形式で書かれています。

次はツリー言語そのものです——リスト、辞書、キー付きの子、そして継承によるコンポーネントの特殊化。**[ビュー](#!section=docs/page=views)**
