# 食譜

針對幾乎每個應用都會遇到的任務，提供簡短、可直接複製的食譜。每一條都是真實的 $mol 程式碼——改一下名字就能用。

## 雙向綁定的輸入框

無需接線任何處理器，就讓輸入框和衍生值保持同步：`<=>` 雙向綁定，任何讀取該值的計算屬性都會自動更新。

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

## 可增刪的清單

把集合保存在響應式屬性裡，並在動作中以不可變方式重寫它。帶鍵的 `Row*` 為每個項目渲染一列——得益於[虛擬化渲染](#!section=docs/page=rendering)——只有可見的列才會被建立。

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

## 帶載入與錯誤狀態的資料擷取

非同步值只是一個回傳 promise 的響應式屬性。`$mol_fetch` 在請求進行期間掛起纖程，因此任何讀取它的視圖都會顯示內建的載入狀態——而失敗的請求會浮現為錯誤狀態。你不必寫任何 `isLoading` 旗標，也不必寫 `try`/`catch`。

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

## 持久化本地狀態

對於需要熬過重新載入、但不該汙染 URL 的狀態——摺疊的側邊欄、草稿、偏好設定——用 `$mol_state_local`。它與任何響應式屬性有相同的取值/賦值形態，並存入 `localStorage`。

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

## 讀寫路由參數

要讓一個值可分享、可加書籤，改用 `$mol_state_arg` 作為其後端。讀取回傳目前的 URL 值；傳入參數即導覽，瀏覽器的返回按鈕會替你更新該單元。

```typescript
@ $mol_mem
page( next?: string ) {
	return $mol_state_arg.value( 'page', next ) ?? 'home'
}
```

`$mol_link` 可以宣告式地設定同一個參數，於是普通一次點擊就能導覽，無需處理器：

```tree
<= Home_link $mol_link
	arg *
		page \home
	sub / <= home_label \Home
```

按路由值切換畫面的方法，參見[路由](#!section=docs/page=routing)。

## 加入自動的淺色/深色主題

把 `$mol_theme_auto` 作為[外掛](#!section=docs/page=plugins)掛上——一個沒有自身元素的元件，列在 `plugins /` 下。它跟隨作業系統偏好，為宿主子樹套用淺色或深色主題，而不會用任何東西包裹你的版面。

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
	sub /
		<= Content $my_content
```

## 下一步

想現場試試？打開[遊樂場](#!section=playground)貼上任意一條食譜，或跟著 [Getting Started](#!section=docs/page=getting-started) 走一遍，搭出一個完整的應用。
