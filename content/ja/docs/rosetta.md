# React、Vue、Svelte から

React、Vue、Svelte で UI を作ったことがあるなら、$mol がすることのほとんどはもう理解しています——名前が違うだけです。これらのフレームワークは正当な理由で優れていて人気があります。このページは競争ではなく翻訳の対応表で、すぐに馴染めるよう助けるためのものです。

## 概念の対応

| 概念 | React | Vue | Svelte | $mol |
|------|-------|-----|--------|------|
| コンポーネント | 関数 / クラス | SFC（`.vue`） | `.svelte` ファイル | `.view.tree` + `.view.ts` |
| ローカル状態 | `useState` | `ref` / `reactive` | `let x` | `@ $mol_mem` |
| 派生値 | `useMemo` | `computed` | `$: y = …` | `@ $mol_mem`（他のセルを読む） |
| 副作用 | `useEffect` | `watchEffect` | `$: { … }` | `@ $mol_action`（明示的、決して自動ではない） |
| Props | props | props | `export let` | `view.tree` 内の束縛 |
| イベント | `onClick` | `@click` | `on:click` | `click? <=> handler?` |
| 双方向入力 | 制御された入力 | `v-model` | `bind:value` | `value? <=> field?` |
| リスト | `items.map()` | `v-for` | `{#each}` | キー付き `Row*` |
| 条件 | `cond && …` | `v-if` | `{#if}` | 削除するには `null` を代入 |
| 共有状態 | Redux / Context | Pinia / provide | ストア | `@ $mol_mem` を持つ任意のオブジェクト |
| ルーティング | React Router | Vue Router | SvelteKit | `$mol_state_arg` |
| スタイリング | CSS-in-JS | スコープ付き `<style>` | `<style>` | 型付き `.view.css.ts` |

## たいてい新しく感じるところ

- **リアクティビティは自動で、オプションではありません。** Vue の `ref` や Svelte の `$:` のように、`@ $mol_mem` の値は自分で読み手を更新します——ですが維持すべき依存配列はなく、どこにも手動の購読はありません。
- **副作用は計算から切り離されています。** React は導出と副作用をフックにまとめますが、$mol は分けます。`@ $mol_mem` は計算だけ、`@ $mol_action` が副作用を行います。この分割こそ、「なぜ二回実行された?」というほとんどの謎を取り除きます。
- **状態はただのオブジェクトです。** 採用すべき専用のストアライブラリはありません——共有される値は任意のオブジェクト上のリアクティブなプロパティなので、グローバル状態もコンポーネント状態も同じように動きます。

## 翻訳を試す

対応を身につける一番速い方法は、両方を少し書いてみることです。[プレイグラウンド](#!section=playground)を開き、知っている小さなコンポーネントを移植して、どう収まるか見てみましょう。あるいは[はじめに](#!section=docs/page=getting-started)から始めてください。
