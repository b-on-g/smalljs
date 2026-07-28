# クックブック

ほとんどのアプリで登場するタスクのための、短くコピーしてすぐ使えるレシピ集です。どれも実際の $mol コードです——名前を合わせて貼り付けてください。

## 双方向バインドの入力

ハンドラーを配線せずに、入力と派生値を同期させます。`<=>` は両方向をバインドし、その値を読む計算プロパティはすべて自動で更新されます。

```tree
$my_greeter $mol_view
	sub /
		<= Name $mol_string
			value? <=> name?
		<= Hello $mol_view
			sub / <= greeting \
```

```typescript
namespace $.$$ {
	export class $my_greeter extends $.$my_greeter {
		@ $mol_mem name( next?: string ) { return next ?? '' }

		@ $mol_mem greeting() {
			return this.name() ? `Hello, ${ this.name() }!` : 'Type your name'
		}
	}
}
```

## 追加・削除できるリスト

コレクションをリアクティブなプロパティに保持し、アクションからイミュータブルに書き換えます。キー付きの `Row*` は項目ごとに 1 行をレンダーし——[仮想化レンダリング](#!section=docs/page=rendering)のおかげで——画面に見える行だけが構築されます。

```tree
$my_todo $mol_view
	draft? \
	items /
	sub /
		<= Input $mol_string
			value? <=> draft?
			hint \New item
		<= Add $mol_button_major
			click? <=> add?
			sub / <= add_label \Add
		<= List $mol_list
			rows <= item_rows /
	Row* $mol_row
		sub /
			<= Label* $mol_view
				sub / <= item_title* \
			<= Delete* $mol_button_minor
				click? <=> delete*?
				sub / <= delete_label \✕
```

```typescript
namespace $.$$ {
	export class $my_todo extends $.$my_todo {
		@ $mol_mem draft( next?: string ) { return next ?? '' }
		@ $mol_mem items( next?: readonly string[] ) { return next ?? [] }

		@ $mol_action add() {
			const title = this.draft().trim()
			if( !title ) return
			this.items([ ... this.items(), title ])
			this.draft( '' )
		}

		@ $mol_action delete( id: number ) {
			this.items( this.items().filter( ( _, i ) => i !== id ) )
		}

		item_title( id: number ) { return this.items()[ id ] }

		item_rows() {
			return this.items().map( ( _, id ) => this.Row( id ) )
		}
	}
}
```

## ローディングとエラー状態を伴うデータ取得

非同期の値は、Promise を返すだけのリアクティブなプロパティです。`$mol_fetch` はリクエスト中の間ファイバーを一時停止するので、それを読むビューは組み込みのローディング状態を表示します——そして失敗したリクエストはエラー状態として表面化します。`isLoading` フラグも `try`/`catch` も書きません。

```typescript
namespace $.$$ {
	export class $my_users extends $.$my_users {
		@ $mol_mem
		users() {
			return $mol_fetch.json( 'https://api.example.com/users' ) as {
				id: number
				name: string
			}[]
		}

		@ $mol_mem
		names() {
			return this.users().map( user => user.name )
		}
	}
}
```

## ローカル状態の永続化

リロードは越えたいが URL を散らかしたくない状態——折りたたんだサイドバー、下書き、設定——には `$mol_state_local` を使います。どのリアクティブなプロパティとも同じゲッター/セッターの形をもち、`localStorage` に保存します。

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

## ルートパラメーターの読み書き

値を共有可能・ブックマーク可能にするには、代わりに `$mol_state_arg` で裏付けます。読み取りは現在の URL の値を返し、引数を渡すとナビゲートします。ブラウザの戻るボタンがセルを更新してくれます。

```typescript
@ $mol_mem
page( next?: string ) {
	return $mol_state_arg.value( 'page', next ) ?? 'home'
}
```

`$mol_link` は同じ引数を宣言的に設定できるので、普通のクリックがハンドラーなしでナビゲートします。

```tree
<= Home_link $mol_link
	arg *
		page \home
	sub / <= home_label \Home
```

ルート値に応じた画面の切り替えについては[ルーティング](#!section=docs/page=routing)をご覧ください。

## 自動のライト/ダークテーマを追加する

`$mol_theme_auto` を[プラグイン](#!section=docs/page=plugins)として取り付けます——`plugins /` の下に列挙する、要素をもたないコンポーネントです。OS の設定に従い、ホストのサブツリーにライトまたはダークのテーマを適用します。レイアウトを何かで包むこともありません。

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
	sub /
		<= Content $my_content
```

## 次へ

ライブで試したいですか? [プレイグラウンド](#!section=playground)を開いて好きなレシピを貼り付けるか、[Getting Started](#!section=docs/page=getting-started)を進めて本格的なアプリを作ってみましょう。
