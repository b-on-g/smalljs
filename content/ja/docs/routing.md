# ルーティング

$mol のルーティングは別個のライブラリではありません——URL はリアクティブな状態のもう一つの断片にすぎません。読み書きすれば、ビューはどんなセルに対しても反応するのと同じように反応します。戻るボタン、ディープリンク、共有可能な URL はすべて無料でついてきます。

## 状態としての URL

`$mol_state_arg` は URL パラメータをリアクティブな値として公開します。そのひとつをプロパティに束ねれば、アドレスバーが唯一の信頼できる情報源になります。

```typescript
namespace $.$$ {
	export class $my_app extends $.$my_app {
		@ $mol_mem
		page( next?: string ) {
			return $mol_state_arg.value( 'page', next ) ?? 'home'
		}
	}
}
```

`page()` を読むと現在の値が返り、`page('about')` を呼ぶと遷移します。`page()` を読むものはすべて変化時に再描画されます——ブラウザの戻るボタンも含め、セルはあなたのために更新されます。

## 画面の切り替え

ルーティングされた値をただの `switch` と組み合わせて、何を描画するかを選びます。ビューは[遅延](#!section=docs/page=rendering)なので、表示しない画面は決して構築されません。

```typescript
@ $mol_mem
body_content() {
	switch ( this.page() ) {
		case 'about': return [ this.About() ]
		case 'docs': return [ this.Docs() ]
		default: return [ this.Home() ]
	}
}
```

## 引数を設定するリンク

`view.tree` では、リンクが URL 引数を宣言的に設定できます——クリックすればハンドラーなしで遷移します。

```tree
<= About_link $mol_link
	arg *
		page \about
	sub / <= about_label \About
```

`$mol_link` は引数が現在の URL と一致すると自らをアクティブ（`mol_link_current`）と印付けるので、現在のページを強調するのに余分な状態は要りません。

## 複数のパラメータ

引数は互いに独立しているので、画面は複数の引数で同時にルーティングできます。まさにこのドキュメントサイトは `section` と `page` の両方でルーティングしています。

```tree
<= Guide_link $mol_link
	arg *
		section \docs
		page \views
```

各キーは URL を通じて往復するので、あらゆるビューは構造上、共有可能でブックマーク可能です。ある引数を設定しても他はそのまま残るので、ディープリンク——特定のセクション*と*ページ*と*アンカー——は、気にかけるキーを設定するだけの話になります。

## URL に入れるべきでない状態

すべての状態がアドレスバーに属するわけではありません。ローカルに保持したいがリンクを汚したくない値——折りたたんだサイドバー、下書き——には `$mol_state_local` を使います。同じゲッター／セッターの形で `localStorage` に保存します。

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

状態が共有可能であるべきときは `$mol_state_arg` を、単に覚えておくだけでよいときは `$mol_state_local` を選んでください。

## 次へ

$mol が状態を UI と URL に変える様子を見てきました。それらがどのように効率よく画面に届くかを[レンダリング](#!section=docs/page=rendering)で見てみましょう。
