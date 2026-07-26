# 路由

$mol 中的路由並不是一個獨立的函式庫——URL 只是響應式狀態的又一部分。讀取它、寫入它，視圖就會像對任何單元一樣作出反應。返回按鈕、深層連結和可分享的 URL 都是免費附送的。

## URL 即狀態

`$mol_state_arg` 將 URL 參數暴露為響應式的值。把其中一個綁定到屬性上，網址列就成了你的真相之源：

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

讀取 `page()` 回傳當前值；呼叫 `page('about')` 進行導覽。任何讀取 `page()` 的東西都會在變化時重新渲染——包括瀏覽器的返回按鈕，它會替你更新這個單元。

## 切換畫面

把一個路由值與一個普通的 `switch` 結合起來，選擇渲染什麼。由於視圖是[惰性的](#!section=docs/page=rendering)，你不顯示的畫面永遠不會被建立：

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

## 設定參數的連結

在 `view.tree` 中，連結可以宣告式地設定 URL 參數——點擊它便會導覽，無需任何處理器：

```tree
<= About_link $mol_link
	arg *
		page \about
	sub / <= about_label \About
```

當 `$mol_link` 的參數與當前 URL 相符時，它也會把自己標記為啟用（`mol_link_current`），因此突顯當前頁面無需額外的狀態。

## 多個參數

參數彼此獨立，所以一個畫面可以同時依多個參數路由。正是這個文件網站同時依 `section` 和 `page` 路由：

```tree
<= Guide_link $mol_link
	arg *
		section \docs
		page \views
```

每個鍵都會經由 URL 往返，因此任何視圖從構造上就是可分享、可加書籤的。設定一個參數會讓其他參數保持不變，這使得深層連結——特定的章節*和*頁面*和*錨點——只是設定你在意的那些鍵的問題。

## 不該放進 URL 的狀態

並非每一部分狀態都屬於網址列。對於應當在本地保留、但不應污染連結的值——摺疊的側邊欄、草稿——請使用 `$mol_state_local`，它以相同的 getter/setter 形態儲存到 `localStorage`：

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

當狀態應當可分享時，選擇 `$mol_state_arg`；當它只需被記住時，選擇 `$mol_state_local`。

## 下一步

你已經了解了 $mol 如何把狀態變成 UI 和 URL。在[渲染](#!section=docs/page=rendering)中看看這一切如何高效地到達螢幕。
