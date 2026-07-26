# 狀態與響應式

$mol 的狀態像試算表一樣運作：你宣告一個值如何計算，所有依賴它的東西都會自動更新。沒有 store，沒有 dispatch，沒有 effect 鉤子——依賴圖會追蹤需要重新計算的內容。

## 響應式屬性

以 `@ $mol_mem` 裝飾的方法是一個帶快取的響應式單元。它只執行一次，記住結果，僅當它讀取過的某個值發生變化時才重新計算。

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

`doubled` 讀取了 `count`，所以它會自動訂閱 `count`。改變 `count`，每個顯示 `doubled` 的視圖都會刷新——無需手動訂閱任何東西。

## 讀取與寫入

一個屬性既是 getter 也是 setter：不帶參數呼叫它來讀取，帶一個參數呼叫它來寫入。

```typescript
@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

## 動作與計算

這一個區別讓響應式程式碼保持可預測：

- `@ $mol_mem` 是**純計算**——只讀取其他單元並回傳一個值。
- `@ $mol_action` 是**副作用**——寫入狀態、網路呼叫和計時器都屬於這裏。

在 `@ $mol_mem` 內部寫入單元會造成回饋迴圈（寫入使某個依賴失效，從而重新計算，又再次寫入）。$mol 會將其報告為*循環訂閱*。修復方法始終相同：把副作用放在動作裏，讓計算保持純淨。

| 在 `@ $mol_mem` 中你可以 | 但不能 |
|---|---|
| 讀取其他單元 | 寫入其他單元 |
| `new SomeClass()` | `fetch()`、`await` |
| 回傳一個值 | `setTimeout`、寫入 DOM |

按鈕處理器在基底類別上生成為 `@ $mol_mem`；用 `@ $mol_action` 覆寫它們，使它們能安全地寫入：

```typescript
@ $mol_action
submit() {
	this.saved( true )
}
```

## 衍生狀態可組合

由於依賴會被自動追蹤，衍生值無需任何接線即可鏈式組合。每個都讀取前一個；根部的一次變化恰好傳播到需要的範圍：

```typescript
@ $mol_mem full_name() {
	return `${ this.first() } ${ this.last() }`.trim()
}

@ $mol_mem greeting() {
	return this.full_name() ? `Hello, ${ this.full_name() }!` : 'Hello!'
}
```

## 帶鍵狀態

`@ $mol_mem_key` 是以鍵為參數的計算——每個鍵一個快取單元。非常適合逐行的值：

```typescript
@ $mol_mem_key
task_done( id: string, next?: boolean ) {
	const task = this.task( id )
	if ( next !== undefined ) task.Done( null )!.val( next )
	return task.Done()?.val() ?? false
}
```

## 非同步只是一個值

從 `@ $mol_mem` 回傳一個 promise，視圖便會顯示載入狀態，直到它解析——無需明確的載入旗標：

```typescript
@ $mol_mem
async data() {
	const res = await fetch( '/api/data' )
	return await res.json()
}
```

[資料獲取](#!section=docs/page=data) 就建立在這個模式之上。

## 事件之間的瞬時狀態

在 `view.tree` 中宣告的狀態會在不同的事件處理器之間重設（拖動/平移/手勢序列），因為 $mol 將每個處理器包裹在各自的纖程中。對於必須從一個事件保留到下一個事件的值，請使用普通的 TypeScript 欄位，而不是響應式屬性：

```typescript
export class $my_canvas extends $.$my_canvas {
	// plain field — survives across events, not reactive
	drag_id = ''

	@ $mol_action pan_start() { this.drag_id = 'node_42' }
	@ $mol_action pan_move() { if ( this.drag_id ) { /* ... */ } }
}
```

當視圖必須對該值作出反應時，使用響應式單元；當瞬時狀態只被處理器讀取時，使用普通欄位。

## 下一步

響應式狀態在可定址時最有用——在[路由](#!section=docs/page=routing)中把它連接到 URL。
