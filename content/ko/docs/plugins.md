# 플러그인

**플러그인**은 자기 DOM 요소가 없는 컴포넌트입니다. 페이지에 렌더링하는 대신, 그것을 호스트하는 컴포넌트의 요소에 동작을 붙입니다——디렉티브와 매우 비슷합니다. 플러그인은 view.tree의 `plugins /` 아래에 나열합니다; 뷰와 나란히 돌지만, 그 `sub`에는 결코 나타나지 않습니다.

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

플러그인은 호스트의 요소를 공유하므로, 그 요소를 추가 마크업으로 감싸지 않고도 이벤트 리스너, 속성, 반응형 부수 효과를 그 요소에 더할 수 있습니다.

## 자주 쓰게 될 플러그인

- **`$mol_hotkey`**——키보드 단축키를 묶습니다. `key * escape? <=> close?`는 Escape에서 `close`를 실행합니다; Ctrl/⌘을 요구하려면 `mod_ctrl true`를 설정하세요.
- **`$mol_theme_auto`**——호스트 서브트리에 밝게/어둡게 테마를 적용합니다.
- **`$mol_nav`**——컴포넌트 리스트를 방향키로 이동합니다(`keys_y`, `current_y`).
- **`$mol_speech`**——음성 인식 입력.

## 직접 만들기

플러그인은 `$mol_plugin`(그 자체가 요소가 없음)을 확장하고, 보통 `event`를 핸들러에 연결합니다:

```tree
$my_autosave $mol_plugin
	event *
		^
		input? <=> save? null
```

그 뷰의 `plugins /` 리스트를 통해 임의의 뷰에 붙이면, 그 뷰의 요소를 증강합니다.
