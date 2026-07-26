# 介紹

## 什麼是 $mol？

$mol 是一個響應式 UI 框架：你描述介面**是什麼**，框架來決定**如何**以及**何時**更新它。沒有虛擬 DOM，沒有手動訂閱，沒有 `useEffect`。你把元件寫成一棵樹；$mol 只渲染可見的部分，只重新計算真正發生變化的部分。

一個元件由三個檔案組成：

- `name.view.tree` — 宣告式版面（一種精簡的樹狀語言）
- `name.view.ts` — 行為邏輯（純 TypeScript 類別）
- `name.view.css.ts` — 具型別的樣式（由編譯器檢查）

這種分離正是核心理念：版面保持可讀，邏輯保持可測，樣式保持型別安全。

## 它適合誰？

- 你想要一個**小巧**的應用，並且隨著它成長依然保持小巧——執行時很精簡，渲染預設虛擬化。
- 你喜歡**處處皆型別**——連樣式都由 TypeScript 檢查。
- 你厭倦了手動接線響應式——$mol 中的狀態像試算表一樣自動響應。

## 嚐個鮮

一個完整的計數器：

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

`count` 是響應式的：任何讀取它的地方都會在它變化時自動重新渲染。沒有 `setState`，沒有相依陣列，也沒有需要註冊的 store。

## 接下來去哪？

想在自己的機器上跑起來嗎？前往[快速開始](#!section=docs/page=getting-started)，在十五分鐘內建構一個可執行的應用。
