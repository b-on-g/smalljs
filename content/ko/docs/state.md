# 상태와 반응성

$mol의 상태는 스프레드시트처럼 동작합니다. 값이 어떻게 계산되는지 선언하면, 그것에 의존하는 모든 것이 스스로 갱신됩니다. 스토어도, 디스패치도, 이펙트 훅도 없습니다——의존성 그래프가 무엇을 다시 계산할지 추적합니다.

## 반응형 속성

`@ $mol_mem`으로 장식된 메서드는 캐시된 반응형 셀입니다. 한 번 실행되어 결과를 기억하고, 읽었던 무언가가 바뀌었을 때만 다시 계산합니다.

```typescript
namespace $.$$ {
	export class $my_counter extends $.$my_counter {
		@ $mol_mem count() { return 0 }

		@ $mol_mem doubled() {
			return this.count() * 2
		}
	}
}
```

`doubled`는 `count`를 읽으므로 자동으로 `count`를 구독합니다. `count`를 바꾸면 `doubled`를 보여 주는 모든 뷰가 새로 고쳐집니다——손으로 구독할 것은 아무것도 없습니다.

## 읽기와 쓰기

속성은 게터이자 세터입니다. 인자 없이 호출하면 읽고, 인자를 주어 호출하면 씁니다.

```typescript
@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

## 액션 대 계산

이 한 가지 구분이 반응형 코드를 예측 가능하게 유지합니다.

- `@ $mol_mem`은 **순수 계산**입니다——다른 셀을 읽고 값을 반환할 뿐입니다.
- `@ $mol_action`은 **이펙트**입니다——상태 쓰기, 네트워크 호출, 타이머가 여기에 속합니다.

`@ $mol_mem` 내부에서 셀에 쓰면 피드백 루프가 생깁니다(쓰기가 의존성을 무효화하고, 다시 계산되고, 또 씁니다). $mol은 이를 *순환 구독*으로 보고합니다. 해결책은 언제나 같습니다. 부수 효과는 액션에 두고, 계산은 순수하게 유지하세요.

| `@ $mol_mem`에서 할 수 있는 것 | 하면 안 되는 것 |
|---|---|
| 다른 셀 읽기 | 다른 셀 쓰기 |
| `new SomeClass()` | `fetch()`, `await` |
| 값 반환 | `setTimeout`, DOM 쓰기 |

버튼 핸들러는 기반 클래스에서 `@ $mol_mem`으로 생성됩니다. 안전하게 쓸 수 있도록 `@ $mol_action`으로 재정의하세요.

```typescript
@ $mol_action
submit() {
	this.saved( true )
}
```

## 파생 상태는 조합된다

의존성이 자동으로 추적되므로, 파생 값은 어떤 배선도 없이 연쇄됩니다. 각각은 바로 앞의 것을 읽고, 뿌리에서의 변화는 필요한 만큼만 정확히 퍼져 나갑니다.

```typescript
@ $mol_mem full_name() {
	return `${ this.first() } ${ this.last() }`.trim()
}

@ $mol_mem greeting() {
	return this.full_name() ? `Hello, ${ this.full_name() }!` : 'Hello!'
}
```

## 키가 있는 상태

`@ $mol_mem_key`는 키로 매개변수화된 계산입니다——키마다 하나의 캐시된 셀. 행별 값에 이상적입니다.

```typescript
@ $mol_mem_key
task_done( id: string, next?: boolean ) {
	const task = this.task( id )
	if ( next !== undefined ) task.Done( null )!.val( next )
	return task.Done()?.val() ?? false
}
```

## 비동기는 그저 하나의 값

`@ $mol_mem`에서 promise를 반환하면, 해결될 때까지 뷰가 로딩 상태를 보여 줍니다——명시적인 로딩 플래그가 없습니다.

```typescript
@ $mol_mem
async data() {
	const res = await fetch( '/api/data' )
	return await res.json()
}
```

[데이터 가져오기](#!section=docs/page=data)는 이 패턴 위에 세워집니다.

## 이벤트 사이의 일시적 상태

`view.tree`에서 선언된 상태는 개별 이벤트 핸들러 사이에서 재설정됩니다(드래그/팬/제스처 시퀀스). $mol이 각 핸들러를 자체 파이버로 감싸기 때문입니다. 한 이벤트에서 다음 이벤트까지 살아남아야 하는 값에는 반응형 속성 대신 평범한 TypeScript 필드를 사용하세요.

```typescript
export class $my_canvas extends $.$my_canvas {
	// plain field — survives across events, not reactive
	drag_id = ''

	@ $mol_action pan_start() { this.drag_id = 'node_42' }
	@ $mol_action pan_move() { if ( this.drag_id ) { /* ... */ } }
}
```

뷰가 값에 반응해야 할 때는 반응형 셀을 사용하고, 핸들러만 읽는 일시적 상태에는 평범한 필드를 사용하세요.

## 다음

반응형 상태는 주소 지정이 가능할 때 가장 유용합니다——[라우팅](#!section=docs/page=routing)에서 URL에 연결하세요.
