# 소개

## $mol 이란?

$mol 은 반응형 UI 프레임워크입니다. 인터페이스가 **무엇인지**를 기술하면, **어떻게** 그리고 **언제** 갱신할지는 프레임워크가 알아서 처리합니다. 가상 DOM 도, 수동 구독도, `useEffect` 도 없습니다. 컴포넌트를 트리로 작성하면 $mol 은 보이는 것만 렌더링하고 실제로 바뀐 것만 다시 계산합니다.

컴포넌트는 세 개의 파일로 이루어집니다.

- `name.view.tree` — 선언적 레이아웃(간결한 트리 언어)
- `name.view.ts` — 동작(순수 TypeScript 클래스)
- `name.view.css.ts` — 타입이 있는 스타일(컴파일러가 검사)

이 분리가 핵심 아이디어입니다. 레이아웃은 읽기 쉽게, 로직은 테스트하기 쉽게, 스타일은 타입 안전하게 유지됩니다.

## 누구를 위한 것인가?

- 커져도 **작게** 유지되는 앱을 원하는 사람 — 런타임은 작고, 렌더링은 기본적으로 가상화됩니다.
- **모든 곳에 타입**이 있는 것을 좋아하는 사람 — 스타일조차 TypeScript 가 검사합니다.
- 반응성을 손으로 연결하는 데 지친 사람 — $mol 의 상태는 스프레드시트처럼 자동으로 반응합니다.

## 맛보기

카운터의 전체 모습입니다.

```tree
$my_counter $mol_view
	sub /
		<= Count $mol_view
			sub / <= count \
		<= Increment $mol_button
			click? <=> increment?
			sub / <= label \+
```

```typescript
namespace $.$$ {
	export class $my_counter extends $.$my_counter {
		@ $mol_mem count() { return 0 }
		@ $mol_action increment() { this.count( this.count() + 1 ) }
	}
}
```

`count` 는 반응형입니다. 그것을 읽는 모든 곳은 값이 바뀔 때 자동으로 다시 렌더링됩니다. `setState` 도, 의존성 배열도, 등록할 스토어도 없습니다.

## 다음은 어디로?

직접 실행해 볼 준비가 되었나요? [시작하기](#!section=docs/page=getting-started)로 가서 15 분 안에 동작하는 앱을 만들어 보세요.
