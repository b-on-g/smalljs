# 라우팅

$mol의 라우팅은 별도의 라이브러리가 아닙니다——URL은 그저 반응형 상태의 또 다른 조각입니다. 읽고 쓰면, 뷰는 어떤 셀에 반응하듯 똑같이 반응합니다. 뒤로 가기 버튼, 딥 링크, 공유 가능한 URL이 모두 공짜로 딸려 옵니다.

## 상태로서의 URL

`$mol_state_arg`는 URL 매개변수를 반응형 값으로 노출합니다. 그중 하나를 속성에 묶으면 주소창이 진실의 원천이 됩니다.

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

`page()`를 읽으면 현재 값이 반환되고, `page('about')`를 호출하면 이동합니다. `page()`를 읽는 것은 무엇이든 변화 시 다시 렌더링됩니다——브라우저의 뒤로 가기 버튼을 포함해, 셀은 당신을 위해 갱신됩니다.

## 화면 전환

라우팅된 값을 평범한 `switch`와 결합해 무엇을 렌더링할지 고릅니다. 뷰는 [느긋](#!section=docs/page=rendering)하므로, 보여 주지 않는 화면은 결코 만들어지지 않습니다.

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

## 인자를 설정하는 링크

`view.tree`에서 링크는 URL 인자를 선언적으로 설정할 수 있습니다——클릭하면 핸들러 없이 이동합니다.

```tree
<= About_link $mol_link
	arg *
		page \about
	sub / <= about_label \About
```

`$mol_link`는 인자가 현재 URL과 일치할 때 스스로를 활성(`mol_link_current`)으로 표시하므로, 현재 페이지를 강조하는 데 추가 상태가 필요 없습니다.

## 여러 매개변수

인자는 서로 독립적이라, 한 화면이 여러 인자로 동시에 라우팅할 수 있습니다. 바로 이 문서 사이트가 `section`과 `page` 둘 다로 라우팅합니다.

```tree
<= Guide_link $mol_link
	arg *
		section \docs
		page \views
```

각 키는 URL을 통해 왕복하므로, 어떤 뷰든 구조적으로 공유 가능하고 북마크 가능합니다. 한 인자를 설정해도 나머지는 그대로 남으므로, 딥 링크——특정 섹션 *및* 페이지 *및* 앵커——는 관심 있는 키만 설정하면 되는 문제가 됩니다.

## URL에 두면 안 되는 상태

모든 상태가 주소창에 속하는 것은 아닙니다. 로컬에 유지하되 링크를 오염시키지 않아야 하는 값——접힌 사이드바, 초안——에는 `$mol_state_local`을 사용하세요. 같은 게터/세터 형태로 `localStorage`에 저장합니다.

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

상태가 공유 가능해야 할 때는 `$mol_state_arg`를, 그저 기억되기만 하면 될 때는 `$mol_state_local`을 택하세요.

## 다음

$mol이 상태를 UI와 URL로 바꾸는 방식을 살펴봤습니다. 이 모든 것이 어떻게 효율적으로 화면에 닿는지 [렌더링](#!section=docs/page=rendering)에서 확인하세요.
