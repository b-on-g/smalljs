# 쿡북

거의 모든 앱에서 등장하는 작업을 위한, 짧고 바로 복사해 쓸 수 있는 레시피 모음입니다. 모두 실제 $mol 코드입니다——이름만 맞춰 붙여넣으세요.

## 양방향 바인딩 입력

핸들러를 배선하지 않고도 입력과 파생 값을 동기화합니다. `<=>`는 양방향으로 바인딩하고, 그 값을 읽는 계산 속성은 모두 스스로 갱신됩니다.

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

## 추가·삭제할 수 있는 목록

컬렉션을 반응형 속성에 담고, 액션에서 불변으로 다시 씁니다. 키가 있는 `Row*`는 항목마다 한 행을 렌더링하고——[가상화 렌더링](#!section=docs/page=rendering) 덕분에——화면에 보이는 행만 만들어집니다.

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

## 로딩·에러 상태와 함께 데이터 가져오기

비동기 값은 프로미스를 반환하는 반응형 속성일 뿐입니다. `$mol_fetch`는 요청이 진행되는 동안 파이버를 중단시키므로, 그것을 읽는 모든 뷰는 내장 로딩 상태를 보여줍니다——그리고 실패한 요청은 에러 상태로 드러납니다. `isLoading` 플래그도 `try`/`catch`도 쓰지 않습니다.

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

## 로컬 상태 유지

새로고침은 견뎌야 하지만 URL을 어지럽히지 않아야 하는 상태——접힌 사이드바, 초안, 환경설정——에는 `$mol_state_local`을 쓰세요. 어떤 반응형 속성과도 같은 게터/세터 형태를 가지며 `localStorage`에 저장합니다.

```typescript
@ $mol_mem
sidebar_open( next?: boolean ) {
	return $mol_state_local.value( 'sidebar_open', next ) ?? false
}
```

## 라우트 매개변수 읽고 쓰기

값을 공유·북마크 가능하게 하려면 대신 `$mol_state_arg`로 뒷받침하세요. 읽으면 현재 URL 값을 반환하고, 인자를 넘기면 이동하며, 브라우저 뒤로가기 버튼이 셀을 대신 갱신해 줍니다.

```typescript
@ $mol_mem
page( next?: string ) {
	return $mol_state_arg.value( 'page', next ) ?? 'home'
}
```

`$mol_link`는 같은 인자를 선언적으로 설정할 수 있어, 평범한 클릭이 핸들러 없이 이동합니다.

```tree
<= Home_link $mol_link
	arg *
		page \home
	sub / <= home_label \Home
```

라우트 값에 따라 화면을 전환하는 방법은 [라우팅](#!section=docs/page=routing)을 보세요.

## 자동 라이트/다크 테마 추가

`$mol_theme_auto`를 [플러그인](#!section=docs/page=plugins)으로 붙이세요——`plugins /` 아래에 나열하는, 요소가 없는 컴포넌트입니다. OS 설정을 따라 호스트의 하위 트리에 라이트 또는 다크 테마를 적용하며, 레이아웃을 무엇으로도 감싸지 않습니다.

```tree
$my_app $mol_view
	plugins /
		<= Theme $mol_theme_auto
	sub /
		<= Content $my_content
```

## 다음

실시간으로 해 보고 싶나요? [플레이그라운드](#!section=playground)를 열어 아무 레시피나 붙여넣거나, [Getting Started](#!section=docs/page=getting-started)를 따라가며 완전한 앱을 만들어 보세요.
