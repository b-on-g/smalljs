# 状態とリアクティビティ

$mol の状態は表計算のように動作します。値がどのように計算されるかを宣言すれば、それに依存するものはすべて自動的に更新されます。ストアも、ディスパッチも、エフェクトフックもありません——依存グラフが何を再計算すべきかを追跡します。

## リアクティブなプロパティ

`@ $mol_mem` で装飾されたメソッドは、キャッシュされたリアクティブなセルです。一度実行して結果を記憶し、読み取った何かが変化したときだけ再計算します。

```typescript
namespace $.$$ {
	export class $my_counter extends $.$my_counter {
		@ $mol_mem count() { return 0 }

		@ $mol_mem doubled() {
			return this.count() * 2
		}
	}
}
```

`doubled` は `count` を読み取るので、自動的に `count` を購読します。`count` を変更すると、`doubled` を表示するすべてのビューが更新されます——手作業で購読するものは何もありません。

## 読み取りと書き込み

プロパティはゲッターであると同時にセッターでもあります。引数なしで呼べば読み取り、引数を付けて呼べば書き込みです。

```typescript
@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

## アクションと計算

この一つの区別が、リアクティブなコードを予測可能に保ちます。

- `@ $mol_mem` は**純粋な計算**です——他のセルを読み取り、値を返すだけです。
- `@ $mol_action` は**エフェクト**です——状態への書き込み、ネットワーク呼び出し、タイマーはここに属します。

`@ $mol_mem` の内部からセルへ書き込むとフィードバックループが生じます（書き込みが依存を無効化し、再計算され、また書き込む）。$mol はこれを*循環購読*として報告します。修正は常に同じです。副作用はアクションに置き、計算は純粋に保ちます。

| `@ $mol_mem` でできること | できないこと |
|---|---|
| 他のセルを読む | 他のセルに書く |
| `new SomeClass()` | `fetch()`、`await` |
| 値を返す | `setTimeout`、DOM への書き込み |

ボタンのハンドラーは基底クラスで `@ $mol_mem` として生成されます。安全に書き込めるよう `@ $mol_action` でオーバーライドしてください。

```typescript
@ $mol_action
submit() {
	this.saved( true )
}
```

## 派生状態は合成できる

依存が自動的に追跡されるため、派生値は配線なしで連鎖します。それぞれが一つ前を読み取り、根での変更は必要な範囲だけ正確に波及します。

```typescript
@ $mol_mem full_name() {
	return `${ this.first() } ${ this.last() }`.trim()
}

@ $mol_mem greeting() {
	return this.full_name() ? `Hello, ${ this.full_name() }!` : 'Hello!'
}
```

## キー付き状態

`@ $mol_mem_key` はキーでパラメータ化された計算です——キーごとに一つのキャッシュされたセル。行ごとの値に最適です。

```typescript
@ $mol_mem_key
task_done( id: string, next?: boolean ) {
	const task = this.task( id )
	if ( next !== undefined ) task.Done( null )!.val( next )
	return task.Done()?.val() ?? false
}
```

## 非同期は単なる値

`@ $mol_mem` から promise を返すと、解決するまでビューは読み込み状態を表示します——明示的な読み込みフラグは不要です。

```typescript
@ $mol_mem
async data() {
	const res = await fetch( '/api/data' )
	return await res.json()
}
```

[データ取得](#!section=docs/page=data) はこのパターンの上に成り立っています。

## イベント間の一時的な状態

`view.tree` で宣言された状態は、個別のイベントハンドラーの間でリセットされます（ドラッグ／パン／ジェスチャーのシーケンス）。$mol が各ハンドラーを独自のファイバーで包むためです。あるイベントから次のイベントへ生き残る必要がある値には、リアクティブなプロパティではなく素の TypeScript フィールドを使ってください。

```typescript
export class $my_canvas extends $.$my_canvas {
	// plain field — survives across events, not reactive
	drag_id = ''

	@ $mol_action pan_start() { this.drag_id = 'node_42' }
	@ $mol_action pan_move() { if ( this.drag_id ) { /* ... */ } }
}
```

ビューが値に反応しなければならないときはリアクティブなセルを使い、ハンドラーだけが読む一時的な状態には素のフィールドを使ってください。

## 次へ

リアクティブな状態はアドレス指定できるときに最も役立ちます——[ルーティング](#!section=docs/page=routing)で URL に接続してください。
