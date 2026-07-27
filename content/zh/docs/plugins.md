# 插件

**插件**是没有自己 DOM 元素的组件。它不渲染到页面中，而是把行为附加到宿主它的那个组件的元素上——很像一个指令。你在 view.tree 里的 `plugins /` 下列出插件；它们与视图并肩运行，但从不出现在其 `sub` 中。

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

因为插件共享其宿主的元素，它可以给那个元素添加事件监听器、属性或响应式副作用，而无需用额外的标记把它包起来。

## 你会经常用到的插件

- **`$mol_hotkey`**——绑定键盘快捷键。`key * escape? <=> close?` 在 Escape 时运行 `close`；设置 `mod_ctrl true` 以要求 Ctrl/⌘。
- **`$mol_theme_auto`**——为宿主子树应用亮/暗主题。
- **`$mol_nav`**——在一列组件间用方向键导航（`keys_y`、`current_y`）。
- **`$mol_speech`**——语音识别输入。

## 编写一个

插件扩展 `$mol_plugin`（它本身就是无元素的），通常把一个 `event` 接到一个处理器：

```tree
$my_autosave $mol_plugin
	event *
		^
		input? <=> save? null
```

通过某个视图的 `plugins /` 列表把它附加到该视图，它就会增强该视图的元素。
