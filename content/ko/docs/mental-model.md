# 멘탈 모델

React나 Vue에서 왔다면, $mol에서의 첫 며칠은 거기 없는 것들을 찾는 데 쓰입니다. `computed`, `watch`, `useEffect`, `onMounted`, 라이프사이클 훅 안의 `fetch`. 그것들은 API 어딘가에 숨어 있는 것이 아닙니다. 모델에 그것들이 놓일 자리가 없습니다. 이 페이지는 그 모델의 5분짜리 판본입니다. [뷰](#!section=docs/page=views)보다 먼저 읽고, 익숙한 이름이 보이지 않을 때 다시 돌아오세요.

## 푸시가 아니라 풀

아무도 읽지 않으면 아무것도 계산되지 않습니다. 뷰는 자신의 속성을 읽으며 렌더링하고, 각 속성은 필요한 것을 읽으며, 의존성 사슬은 그 읽기들로부터 스스로 조립됩니다. 선언할 구독도, 등록할 `watch`도 없습니다. 읽는 것이 곧 구독입니다.

```tree
$my_profile $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
```

```typescript
namespace $.$$ {
	export class $my_profile extends $.$my_profile {
		@ $mol_mem
		user() {
			return this.$.$mol_fetch.json( 'https://api.example.com/me' ) as { name: string }
		}
		name() {
			return this.user().name
		}
	}
}
```

`Name`을 렌더링하면 `name()`을 읽고, `name()`은 `user()`를 읽고, `user()`는 네트워크를 칩니다. 뷰에게 요청에 대해 말해 준 사람도 없고, 요청에게 뷰에 대해 말해 준 사람도 없습니다. `user()`가 바뀌면 그것을 읽은 모든 것이 다시 계산되고, 그 밖의 것은 아무것도 다시 계산되지 않습니다.

## 라이프사이클이 없다

`mounted`도, `useEffect`도, `created`도 없습니다. 데이터는 속성을 읽음으로써 요청되고, 뷰는 렌더링할 때 자신의 속성을 읽습니다. 그래서 위의 예제는 `$my_profile`이 화면에 나타나는 바로 그 순간에 사용자를 불러오고, 그 전에는 불러오지 않습니다. 뷰가 화면을 떠나면 더 이상 아무도 `user()`를 읽지 않고, 셀은 뷰와 함께 해제됩니다.

"마운트할 때 fetch" 패턴을 대신하는 것은 이것이 전부입니다. 뷰는 필요한 것을 요청하고, 언제 요청할지는 프레임워크가 정합니다. 로딩은 페이지 이벤트에 붙어 있지 않고, 보인다는 사실에 붙어 있습니다.

## 속성은 셀이다

선택적 인자 하나를 받는 메서드 하나가 동시에 게터이자 세터이자 계산된 값이자 상태입니다.

```typescript
@ $mol_mem
count( next?: number ) {
	return next ?? 0
}
```

인자 없이 호출하면 읽고, 인자를 주어 호출하면 씁니다. `@ $mol_mem`은 메서드를, 읽었던 무언가가 바뀌었을 때 다시 계산되는 캐시된 셀로 바꿉니다. 계산된 값이란 다른 메서드를 읽는 `@ $mol_mem` 메서드일 뿐입니다. 워처는 필요 없습니다. 부수 효과는 이벤트에 속하고, 이벤트 핸들러는 `@ $mol_action`을 붙인 메서드입니다.

```typescript
@ $mol_mem
doubled() {
	return this.count() * 2
}

@ $mol_action
increment() {
	this.count( this.count() + 1 )
}
```

이 둘 각각의 안에서 무엇이 일어나도 되는지에 대한 규칙은 [상태와 반응성](#!section=docs/page=state)이 다룹니다.

## 기다리는 동기 코드

위의 `user()`는 동기적으로 보이고, 마치 응답이 이미 거기 있는 것처럼 작성되어 있습니다. 이것이 동작하는 이유는 모든 계산이 파이버 안에서 돌기 때문입니다. `this.$.$mol_fetch.json()`이 그 파이버를 중단시키고, 응답이 도착하면 프레임워크가 계산을 다시 시작합니다. 그때까지 `user()`를 읽은 뷰는 로딩 상태를 보여 주고, 요청이 실패하면 같은 뷰가 오류를 보여 줍니다. `isLoading` 플래그도, `try`/`catch`도 쓰지 않습니다.

같은 메커니즘이 어떤 비동기 소스에나 쓰입니다. [데이터 가져오기](#!section=docs/page=data)가 다시 불러오기와 오류 처리를 차례로 짚습니다.

## 모든 것은 오버라이드다

`view.tree` 파일은 메서드 선언의 목록입니다. 컴포넌트 아래의 모든 줄은 기본값을 가진 그 컴포넌트의 프로퍼티이고, 중첩된 컴포넌트의 어떤 프로퍼티든 그것이 쓰이는 바로 그 자리에서 한 줄로 다시 정의할 수 있습니다. 텍스트 입력의 플레이스홀더는 `$mol_string`의 `hint` 프로퍼티입니다.

```tree
$my_search $mol_view
	sub /
		<= Query $mol_string
			hint \Search
			value? <=> query? \
```

확장할 prop 목록도, 작성할 래퍼도, 유지할 포크도 없습니다. 컴포넌트에 프로퍼티가 있다면, 바깥에서 설정할 수 있습니다.

## 소스를 읽는 법

앞 절은 진짜 질문을 불러옵니다. 그 프로퍼티의 이름이 `hint`라는 것을 어떻게 알까요? 답은 직접 본다는 것이고, 프레임워크는 보는 값이 싸도록 만들어져 있습니다.

**프레임워크의 소스는 여러분의 소스 옆에 있습니다.** MAM 워크스페이스에서 `mol/string/string.view.tree`는 `my/hello/`에서 폴더 하나 거리입니다. `node_modules` 안에도, 번들 안에도 있지 않습니다. 여러분이 직접 쓰는 것과 같은 종류의 파일입니다.

**클래스 이름이 곧 경로입니다.** `$mol_string`은 `mol/string/`에, `$mol_button_major`는 `mol/button/major/`에 있습니다. 밑줄은 모두 폴더 구분자이므로, 트리에 있는 이름은 언제나 열어 볼 폴더로 바꿀 수 있습니다. [도구](#!section=docs/page=tooling) 페이지의 에디터 지원이 그 이름들을 자동 완성해 줍니다.

**컴포넌트의 `.view.tree`는 기본값이 딸린 프로퍼티의 완전한 목록입니다.** 값의 모양이 타입을 알려 줍니다. `\`는 문자열의 시작, `/`는 리스트, `*`는 딕셔너리, 벌거벗은 숫자는 숫자, `true`와 `false`는 불리언, `null`은 없음을 뜻하고, `<=`는 서브뷰나 소유자에게서 가져온 프로퍼티를 끌어옵니다. 입력에 중요한 `mol/string/string.view.tree`의 부분은 이렇습니다.

```tree
$mol_string $mol_view
	dom_name \input
	enabled true
	field *
		^
		disabled <= disabled false
		value <= value_changed? <=> value? \
		placeholder <= hint_visible <= hint \
	attr *
		^
		type <= type? \text
```

소리 내어 읽어 보세요. `dom_name \input`——이 컴포넌트는 `input` 요소를 렌더링합니다. `enabled true`——불리언 프로퍼티이고 기본으로 켜져 있습니다. `field *`는 DOM 요소 필드의 딕셔너리입니다. 왼쪽의 이름은 DOM의 것이고, 오른쪽의 이름은 컴포넌트의 것이며, 맨 오른쪽에 있는 것이 여러분이 설정하는 것입니다. 그러니까 DOM의 `placeholder`는 `hint`에서 오고 기본값은 빈 문자열입니다. DOM의 `value`는 쓰기 가능한 `value?` 프로퍼티이고, `type` 속성은 쓰기 가능한 `type?`으로 기본값은 `text`입니다. 플레이스홀더, 비활성화된 입력, 비밀번호 필드는 여러분의 트리에서 각각 `hint`, `enabled false`, `type \password`입니다.

**타입이 붙은 인터페이스도 같은 트리에서 생성됩니다.** `mol/string/-view.tree/string.view.tree.d.ts`는 같은 프로퍼티를 TypeScript 시그니처로 나열하고, 이 사이트의 [API 레퍼런스](#!section=docs/page=api-mol-string)는 그 파일에서 만들어집니다. 셋이 어긋나지 않는 이유는 셋 모두 하나의 소스에서 나오기 때문입니다.

**대부분의 컴포넌트에는 `demo/` 폴더와 `readme.md`가 딸려 옵니다.** `mol/string/demo/demo.view.tree`는 힌트가 붙은 입력, 비활성화된 입력, 값이 미리 채워진 입력을 보여 줍니다. 어떤 컴포넌트를 어떤 상태로 쓰고 싶다면, 거기에 가장 가까운 데모를 찾아 그 줄을 복사하세요.

다 합쳐서, 플레이스홀더 하나는 1분쯤 걸립니다.

```bash
ls mol | grep string
cat mol/string/string.view.tree
```

`$mol_string` 아래에 `hint \`가 보이니, 여러분의 `$mol_string` 아래에 `hint \Search`라고 씁니다.

## 이름

모든 것이 `snake_case`입니다. `view.tree`의 프로퍼티 이름도, TypeScript의 메서드 이름도, 스타일링을 위해 프레임워크가 DOM 노드에 붙이는 속성도 그렇습니다. 서브뷰는 대문자로(`Query`), 값은 소문자로(`query`) 시작합니다.

트리의 이름과 클래스의 메서드 이름은 글자 하나까지 일치해야 합니다. 트리의 `exchange_form`과 클래스의 `exchangeForm`은 서로 무관한 두 프로퍼티입니다. 클래스 쪽은 결코 읽히지 않고, 트리 쪽은 기본값을 지키며, 그 사실을 알려 주는 오류도 없습니다. 오버라이드가 아무것도 하지 않는 것처럼 보인다면 가장 먼저 확인할 것이 이것입니다. [문제 해결](#!section=docs/page=troubleshooting)은 이것을 비롯해, 화면은 틀렸는데 컴파일러는 조용한 경우들을 나열합니다.

## 다음

모델이 자리를 잡았으니, [뷰](#!section=docs/page=views)가 컴포넌트를 어떻게 선언하고 조합하는지 보여 주고, [React, Vue, Svelte에서](#!section=docs/page=rosetta)가 이미 아는 이름들을 여기의 이름들에 대응시킵니다.
