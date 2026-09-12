# 데이터 가져오기

$mol에서 원격 데이터를 불러오는 것은 특별한 API가 아닙니다——비동기 값은 마치 응답이 이미 거기 있는 것처럼 작성된 반응형 속성일 뿐입니다. 뷰는 그것을 기다리고, 로딩 상태를 보여 주며, 데이터가 도착하면 다시 렌더링합니다.

## 비동기 속성

`@ $mol_mem` 안에서 네트워크를 호출하고 파싱된 결과를 반환하세요. 코드에는 promise도, `await`도, 콜백도 없습니다.

```typescript
namespace $.$$ {
	export class $my_users extends $.$my_users {
		@ $mol_mem
		users() {
			return this.$.$mol_fetch.json( 'https://api.example.com/users' ) as {
				id: number
				name: string
			}[]
		}
	}
}
```

`$mol_fetch`는 응답이 도착할 때까지 파이버를 중단시키고, 그러고 나면 계산이 다시 시작되어 `users()`가 배열을 반환합니다. 보류 중인 동안 `users()`를 읽는 어떤 뷰든 내장 로딩 상태를 자동으로 보여 줍니다——`isLoading` 플래그를 쓰지 않습니다. `@ $mol_mem`에서 직접 promise를 반환하지 마세요. 값으로 저장된 promise는 셀을 영원히 로딩 상태에 묶어 둡니다. [문제 해결](#!section=docs/page=troubleshooting)을 보세요.

`this.$`는 컴포넌트의 컨텍스트입니다. 모든 서비스가 그것을 거쳐 옵니다. 네트워크는 `$mol_fetch`, URL은 `$mol_state_arg`, 시간은 `$mol_after_timeout`입니다. 테스트에서는 컨텍스트가 교체되므로, 컴포넌트를 한 줄도 바꾸지 않은 채 같은 `users()`가 네트워크가 아니라 목(mock)으로 요청을 보냅니다. 그 목은 [테스트](#!section=docs/page=testing)가 보여 줍니다.

## 결과 렌더링

해결된 데이터를 곧장 리스트에 묶으세요.

```typescript
		@ $mol_mem
		user_names() {
			return this.users().map( user => user.name )
		}
```

응답이 도착하면 `users()`가 갱신되고, `user_names()`가 재계산되며, 리스트가 렌더링됩니다. 콜백도, `useEffect`도 없습니다.

## 다시 불러오기

그것은 그저 반응형 셀이므로, 무효화하여 다시 가져옵니다. 증가시킬 수 있는 토큰에 의존하세요.

```typescript
		@ $mol_mem
		reload_token( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		users() {
			this.reload_token() // subscribe
			return this.$.$mol_fetch.json( 'https://api.example.com/users' ) as unknown[]
		}

		@ $mol_action
		reload() {
			this.reload_token( this.reload_token() + 1 )
		}
```

`reload()`를 호출하면 토큰이 바뀌어 `users()`가 무효화되고, 다시 가져옵니다.

## 오류

반응형 속성 내부의 throw는 가장 가까운 뷰로 전파되어, 뷰는 내용 대신 오류 상태를 렌더링합니다. 직접 처리하려면, 잡아서 폴백 값을 반환하세요.

```typescript
		@ $mol_mem
		users_safe() {
			try {
				return this.users()
			} catch( error ) {
				if( error instanceof Promise ) throw error // still loading
				return []
			}
		}
```

`Promise`를 다시 던지는 것은 로딩 상태는 계속 흐르게 하면서 진짜 오류만 잡는 방법입니다.

## 다음

백엔드 없이 클라이언트 사이에서 지속되고 동기화되는 데이터는 [Giper Baza](#!section=docs/page=giper-baza)로 계속하세요.
