# 來自 React、Vue 和 Svelte

如果你用 React、Vue 或 Svelte 建構過介面，你已經理解 $mol 所做的大部分事情——只是名字不同而已。這些框架優秀且流行是有充分理由的；本頁是一張翻譯對照表，而不是一場競賽，幫你快速找到熟悉感。

## 概念對照

| 概念 | React | Vue | Svelte | $mol |
|------|-------|-----|--------|------|
| 元件 | 函式 / 類別 | SFC（`.vue`） | `.svelte` 檔案 | `.view.tree` + `.view.ts` |
| 區域狀態 | `useState` | `ref` / `reactive` | `let x` | `@ $mol_mem` |
| 衍生值 | `useMemo` | `computed` | `$: y = …` | `@ $mol_mem`（讀取其他單元） |
| 副作用 | `useEffect` | `watchEffect` | `$: { … }` | `@ $mol_action`（顯式，永不自動） |
| Props | props | props | `export let` | `view.tree` 中的綁定 |
| 事件 | `onClick` | `@click` | `on:click` | `click? <=> handler?` |
| 雙向輸入 | 受控輸入 | `v-model` | `bind:value` | `value? <=> field?` |
| 列表 | `items.map()` | `v-for` | `{#each}` | 帶鍵的 `Row*` |
| 條件 | `cond && …` | `v-if` | `{#if}` | 賦值 `null` 以移除 |
| 共享狀態 | Redux / Context | Pinia / provide | store | 任何帶 `@ $mol_mem` 的物件 |
| 路由 | React Router | Vue Router | SvelteKit | `$mol_state_arg` |
| 樣式 | CSS-in-JS | 帶作用域的 `<style>` | `<style>` | 帶型別的 `.view.css.ts` |

## 通常會感到新鮮的地方

- **響應式是自動的，而且不可選。** 就像 Vue 的 `ref` 或 Svelte 的 `$:`，一個 `@ $mol_mem` 值會自行更新它的讀取者——但沒有相依陣列要維護，任何地方也沒有手動訂閱。
- **副作用與計算是分開的。** React 把衍生和副作用都塞進 hook；$mol 把它們分開：`@ $mol_mem` 只做計算，`@ $mol_action` 執行副作用。正是這種拆分消除了大多數「為什麼這執行了兩次？」的謎題。
- **狀態就是物件。** 沒有專門的 store 函式庫需要採用——一個共享值就是任意物件上的一個響應式屬性，因此全域狀態和元件狀態的運作方式相同。

## 由你解決 vs. 由框架解決

更深層的差別不在於上面的詞彙，而在於*誰*來解決那些反覆出現的問題。在 React、Vue 或 Svelte 中，它們大多是你在每個元件裡重新實作、並以各自方式弄壞的模式。在 $mol 中，它們是同一套機制的屬性，因此整類工作直接消失，而不是換來一個更好用的 API。

- **狀態儲存** — React 中的五套儲存子系統（Redux + RTK Query + `useState` + `useReducer` + Context）合併為一套：元件上的響應式欄位。
- **響應式** — 別處是事後加裝的（MobX、signals）；在這裡它位於底層，無需任何 opt-in。
- **崩潰隔離** — 手動放置的 `<ErrorBoundary>`，對比每個元件預設自成一個邊界。
- **副作用** — 橫跨十幾種場景的 `useEffect`/`useMemo`/deps 清單，對比一個方法（或帶 action 的方法）。樹上只有一個分叉，而不是十二個。
- **虛擬化** — 每個列表一個第三方元件，對比視口之外的一切根本不存在。

上面的表格只是重新命名了這些概念——而在這裡，$mol 真正把它們移除了。

## 試試這種翻譯

內化這套對應關係最快的方法是兩邊都寫一點：開啟[遊樂場](#!section=playground)，移植一個你熟悉的小元件，看看效果如何。或者從[快速上手](#!section=docs/page=getting-started)開始。
