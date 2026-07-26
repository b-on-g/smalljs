# はじめに

## $mol とは？

$mol はリアクティブな UI フレームワークです。インターフェースが**何であるか**を記述すれば、**どのように**そして**いつ**更新するかはフレームワークが判断します。仮想 DOM も、手動の購読も、`useEffect` もありません。コンポーネントをツリーとして書けば、$mol は見えているものだけを描画し、実際に変わったものだけを再計算します。

コンポーネントは 3 つのファイルで構成されます。

- `name.view.tree` — 宣言的なレイアウト（コンパクトなツリー言語）
- `name.view.ts` — 振る舞い（プレーンな TypeScript クラス）
- `name.view.css.ts` — 型付きスタイル（コンパイラが検査）

この分離こそが核心です。レイアウトは読みやすく、ロジックはテストしやすく、スタイルは型安全に保たれます。

## 誰のためのもの？

- 成長しても**小さいまま**であってほしいアプリを作りたい人へ。ランタイムはコンパクトで、描画はデフォルトで仮想化されます。
- **あらゆる場所に型**があることを好む人へ。スタイルさえ TypeScript が検査します。
- リアクティビティを手作業で配線するのに疲れた人へ。$mol の状態は表計算のように自動でリアクティブです。

## ひと味

カウンターの全体像です。

```tree
$my_counter $mol_view
	sub /
		<= Count $mol_view
			sub / <= count \
		<= Increment $mol_button
			click? <=> increment?
			sub / <= label \+
```

```typescript
namespace $.$$ {
	export class $my_counter extends $.$my_counter {
		@ $mol_mem count() { return 0 }
		@ $mol_action increment() { this.count( this.count() + 1 ) }
	}
}
```

`count` はリアクティブです。それを読むものはすべて、値が変わると自動的に再描画されます。`setState` も、依存配列も、登録するストアもありません。

## 次はどこへ？

自分のマシンで動かす準備はできましたか？[はじめかた](#!section=docs/page=getting-started)へ進んで、15 分以内に動くアプリを作りましょう。
