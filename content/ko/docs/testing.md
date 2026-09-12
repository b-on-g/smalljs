# 테스트

$mol의 뷰는 자기 상태의 함수이고, 그 사실이 테스트의 모습을 바꿉니다. 사용자 시나리오는 뷰 자신의 메서드 호출로 쓰입니다. 초안을 넣고, 액션을 실행하고, 사용자가 볼 것을 읽습니다.

```typescript
app.draft( 'Milk' )
app.add()
$mol_assert_equal( app.item_title( 0 ), 'Milk' )
```

셀렉터도, 브라우저도, Playwright나 Cypress도, 무언가를 기다리는 일도 없습니다. 같은 파일이 이런 것들도 함께 줍니다.

- **속도.** 테스트는 Node에서 밀리초 단위로 돌고, 천 개라도 1분쯤 걸립니다. `node my/hello/-/node.test.js`가 한 모듈의 테스트를 실행합니다.
- **설정 없음.** 컴포넌트 옆의 `hello.test.ts`는 빌더가 집어 `-/node.test.js`로 컴파일합니다. `mam_build`를 쓰는 지속적 통합이 그것을 실행하고, 테스트가 실패하면 빌드도 실패시킵니다.
- **컨텍스트를 통한 서비스 교체.** 모든 테스트는 자기만의 `$`를 받고, 컴포넌트가 `this.$.X`로 닿는 모든 것은 그 `$`에 테스트 대역을 대입하면 바뀝니다. `$mol_fetch`가 아니라 `this.$.$mol_fetch`라고 쓰는 이유가 이것입니다. 이쪽은 교체할 수 있고, 전역 쪽은 그럴 수 없습니다.
- **목으로 만든 시간.** 컨텍스트를 통해 만든 타이머는 스스로 흐르지 않습니다. 큐에 든 것은 `$mol_after_mock_warp()`가 실행합니다.
- **필요할 때는 진짜 DOM.** Node 번들은 jsdom을 싣고 있어, 같은 테스트 파일에서 `dom_node()`와 `querySelectorAll`이 동작합니다.

## 뷰 메서드를 통한 시나리오

[쿡북](#!section=docs/page=cookbook)의 todo 리스트를 가져옵시다. `draft?` 문자열, `items` 리스트, `add` 액션, `delete` 액션. 그 테스트는 `my/todo/todo.test.ts`에 있습니다.

```typescript
namespace $ {
	$mol_test({

		'add an item and delete it'( $ ) {
			const app = $my_todo.make({ $ })

			app.draft( 'Milk' )
			app.add()
			$mol_assert_equal( app.items().length, 1 )
			$mol_assert_equal( app.item_title( 0 ), 'Milk' )
			$mol_assert_equal( app.draft(), '' )

			app.delete( 0 )
			$mol_assert_like( app.item_rows(), [] )
		},

		'blank draft adds nothing'( $ ) {
			const app = $my_todo.make({ $ })

			app.draft( '   ' )
			app.add()
			$mol_assert_like( app.items(), [] )
		},

	})
}
```

몇 가지 눈여겨볼 것이 있습니다.

- 테스트 파일은 `$.$$`가 아니라 `namespace $`를 씁니다. 컨텍스트 `$`는 인자로 들어오고 테스트마다 새것이며, 컴포넌트는 `Klass.make({ $ })`로 만들어져 그 컨텍스트에서 서비스를 읽습니다.
- 클릭은 핸들러 호출입니다. `app.add()`가 버튼이 하는 일이고, 바인딩까지 포함하고 싶을 때는 `app.Add().click( event )`가 같은 경로를 지납니다.
- 사용자가 보는 것을 단언하세요. `items()`, `item_rows()`, `sub()`, 서브뷰의 `title()`입니다. 화면을 통해 확인한 모델은 클래스에서 빠져나간 오버라이드까지 잡아내지만, 모델만 보는 테스트는 그러지 못합니다.
- `$mol_assert_equal`은 동일성으로, `$mol_assert_like`는 구조로 비교하고, `$mol_assert_fail( ()=> ..., 'message' )`는 던지기를 기대합니다.
- 테스트의 이름이 곧 설명입니다. 본문에 주석은 없습니다.

## 서비스를 목으로 바꾸기

각 테스트는 전역 컨텍스트에서 파생된 새 컨텍스트를 받습니다. 컴포넌트를 만들기 전에 그 `$`의 서비스에 서브클래스를 대입하면, 컴포넌트 안의 모든 `this.$.X`가 그 교체본으로 해결됩니다. [데이터 가져오기](#!section=docs/page=data)의 `$my_users` 컴포넌트를 위한 fetch 대역은 이렇습니다.

```typescript
namespace $ {
	$mol_test({

		'user names come from the response'( $ ) {
			$.$mol_fetch = class extends $.$mol_fetch {
				static override json( input: RequestInfo ) {
					if( String( input ).endsWith( '/users' ) ) return [ { id: 1, name: 'Ada' } ]
					return $mol_fail( new Error( 'Unexpected request: ' + input ) )
				}
			}
			const app = $my_users.make({ $ })
			$mol_assert_like( app.user_names(), [ 'Ada' ] )
		},

	})
}
```

컴포넌트의 `users()`는 `this.$.$mol_fetch.json( ... )`을 호출하므로 요청은 목으로 가고, 값은 동기적으로 손에 들어옵니다. 기다릴 것이 없습니다. 컴포넌트가 전역의 `$mol_fetch.json( ... )`을 호출했다면 목은 참조되지 않았을 것입니다. 내장 목들이 컨텍스트 위의 전역 `fetch`와 `XMLHttpRequest`를 던지기만 하는 프록시로 이미 바꿔 두었습니다. 그래서 컨텍스트를 빠져나간 요청은 네트워크에 닿는 대신 요란하게 실패합니다.

같은 패턴이 URL의 `$mol_state_arg`, 저장소의 `$mol_state_local`, 그 밖에 컴포넌트가 `this.$`에서 가져오는 모든 것에 적용됩니다.

`$mol_test_mocks`라는 것도 있습니다. 번들 안의 모든 테스트 전에——다른 모듈의 테스트까지 포함해서——컨텍스트를 상대로 실행되는 함수들의 목록입니다. 프레임워크가 자기 목들을 등록하는 방식 그대로, 어디서나 성립하는 규칙을 두는 자리입니다. 주는 대로 간직하는 저장소 대역, 빈 딕셔너리를 반환하는 로케일, 위에 나온 네트워크 금지 같은 것들입니다. 한 컴포넌트를 위한 고정 데이터는 거기에 속하지 않습니다.

## 시간

프레임워크 자신의 테스트가 `$mol_after_timeout`, `$mol_after_frame`과 그 친척들의 목을 등록해 두었고, 그 목들은 여러분의 번들에도 들어 있습니다. `new this.$.$mol_after_timeout( ms, task )`로 만든 타이머는 예약되는 대신 큐에 들어가고, `$mol_after_mock_warp()`가 그 큐를 실행합니다. 스스로 사라지는 토스트가 있다고 합시다.

```typescript
@ $mol_mem toast( next?: string ) { return next ?? '' }

@ $mol_action notify( text: string ) {
	this.toast( text )
	new this.$.$mol_after_timeout( 3000, ()=> this.toast( '' ) )
}
```

테스트는 시간을 손으로 움직입니다.

```typescript
'toast hides after the timer'( $ ) {
	const app = $my_greeter.make({ $ })
	app.notify( 'Saved' )
	$mol_assert_equal( app.toast(), 'Saved' )
	$mol_after_mock_warp()
	$mol_assert_equal( app.toast(), '' )
},
```

뷰 안의 벌거벗은 `setTimeout`은 목으로 바뀌지 않고 테스트보다 오래 살아남습니다. 타이머를 컨텍스트를 통해 만드는 이유 가운데 하나입니다.

## DOM을 통해

Node 번들에서 `$mol_dom_context`는 jsdom 윈도우이므로, 뷰는 진짜 요소로 렌더링됩니다. 확인하려는 것이 상태가 아니라 마크업일 때 쓰세요.

```typescript
'greets by name'( $ ) {
	const app = $my_greeter.make({ $ })
	app.name( 'Ada' )
	$.$mol_dom_context.document.body.appendChild( app.dom_node() )
	app.dom_tree()
	$mol_assert_equal( app.Hello().dom_node().textContent, 'Hello, Ada!' )
	app.destructor()
},
```

`dom_node()`가 요소를 만들고, `dom_tree()`가 서브트리를 렌더링하며, `destructor()`가 뷰를 해제해 그 셀들이 테스트보다 오래 살아남지 않게 합니다. 서브뷰가 자기 이름에서 얻는 속성——여기서는 `[my_greeter_hello]`——이 서브뷰를 호출하는 대신 `querySelector`를 쓰고 싶을 때의 선택자입니다.

jsdom에는 입력 필드와 제스처가 손을 뻗는 두 전역, `ShadowRoot`와 `PointerEvent`가 없습니다. 그것들 없이 렌더링된 `$mol_string`은 `ReferenceError`를 기록하고 비어 있는 채로 남는 반면, 트리의 나머지는 렌더링됩니다. jsdom 윈도우에서 빌려 오세요. 이것은 데이터가 없는, 모든 테스트에 통하는 규칙이므로 `$mol_test_mocks`에 넣습니다.

```typescript
$mol_test_mocks.push( $ => {
	const win = $.$mol_dom_context
	Object.assign( globalThis, {
		ShadowRoot: win.ShadowRoot,
		PointerEvent: win.PointerEvent ?? win.MouseEvent,
	} )
} )
```

## Node 테스트가 다루지 못하는 것

기하와 스타일입니다. 두 블록이 나란한지, 패널이 화면을 넘치는지, 다크 테마가 잘 읽히는지. 그 어느 것도 jsdom에는 존재하지 않습니다. 손댄 레이아웃은 모듈의 `-/test.html`을 브라우저에서 열어 보세요. 앱을 마운트하고 거기서 같은 테스트를 실행해 주므로, 직접 눈으로 볼 수 있습니다.

## 실무 메모

- **침묵은 실패입니다.** 단언에 실패한 테스트와 멈춰 버린 테스트는 똑같아 보입니다. 출력은 없고 프로세스는 살아 있습니다. 끝에 `All tests passed`가 있는지 찾으세요. 없다면 마지막 단언부터 확인합니다. `async` 테스트는 1초로 제한됩니다.
- **일부러 하나를 망가뜨려 보세요.** 실행해도 아무것도 찍히지 않으면, 단언을 뒤집어 실패가 드러나는지 확인하세요. 실패할 수 없는 테스트 묶음은 아무것도 재고 있지 않습니다.
- **지역화된 문자열을 단언하지 마세요.** 트리에서 `@`가 붙은 값은 로케일을 통해 해결되고, 로케일은 새 컨텍스트마다 다시 데워집니다. 라벨의 글자가 아니라 구조를 단언하세요.

## 다음

[문제 해결](#!section=docs/page=troubleshooting)은 테스트는 초록인데 화면은 비게 만드는 실수들을 나열하고, [데이터 가져오기](#!section=docs/page=data)는 위의 목이 겨냥해 쓰인 그 컴포넌트를 보여 줍니다.
