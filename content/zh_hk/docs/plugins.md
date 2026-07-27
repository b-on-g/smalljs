# 外掛

**外掛**是沒有自己 DOM 元素的元件。它不渲染到頁面中，而是把行為附加到宿主它的那個元件的元素上——很像一個指令。你在 view.tree 裏的 `plugins /` 下列出外掛；它們與視圖並肩執行，但從不出現在其 `sub` 中。

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
		<= Search_key $mol_hotkey
			key *
				K? <=> open_search?
	sub /
		<= Content $my_content
```

因為外掛共享其宿主的元素，它可以給那個元素添加事件監聽器、屬性或響應式副作用，而無需用額外的標記把它包起來。

## 你會經常用到的外掛

- **`$mol_hotkey`**——綁定鍵盤快速鍵。`key * escape? <=> close?` 在 Escape 時執行 `close`；設定 `mod_ctrl true` 以要求 Ctrl/⌘。
- **`$mol_theme_auto`**——為宿主子樹套用亮/暗主題。
- **`$mol_nav`**——在一列元件間用方向鍵導覽（`keys_y`、`current_y`）。
- **`$mol_speech`**——語音辨識輸入。

## 編寫一個

外掛擴充 `$mol_plugin`（它本身就是無元素的），通常把一個 `event` 接到一個處理器：

```tree
$my_autosave $mol_plugin
	event *
		^
		input? <=> save? null
```

透過某個視圖的 `plugins /` 列表把它附加到該視圖，它就會增強該視圖的元素。
