# プラグイン

**プラグイン**は自分の DOM 要素を持たないコンポーネントです。ページに描画する代わりに、それをホストするコンポーネントの要素に振る舞いを付け加えます——ディレクティブによく似ています。プラグインは view.tree の `plugins /` の下に列挙します。ビューと並んで動きますが、その `sub` には決して現れません。

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

プラグインはホストの要素を共有するので、その要素に対して、余分なマークアップで包むことなく、イベントリスナー、属性、リアクティブな副作用を追加できます。

## よく使うプラグイン

- **`$mol_hotkey`**——キーボードショートカットを束ねます。`key * escape? <=> close?` は Escape で `close` を実行します。Ctrl/⌘ を必須にするには `mod_ctrl true` を設定します。
- **`$mol_theme_auto`**——ホストのサブツリーにライト／ダークのテーマを適用します。
- **`$mol_nav`**——コンポーネントのリストを矢印キーで移動します（`keys_y`、`current_y`）。
- **`$mol_speech`**——音声認識による入力。

## 自作する

プラグインは `$mol_plugin`（それ自体が要素を持ちません）を継承し、たいてい `event` をハンドラーに繋ぎます。

```tree
$my_autosave $mol_plugin
	event *
		^
		input? <=> save? null
```

そのビューの `plugins /` リストを通じて任意のビューに付ければ、そのビューの要素を拡張します。
