# 뷰

뷰는 컴포넌트입니다. UI 트리의 노드로서 자체 레이아웃, 동작, 스타일을 가집니다. 이 장에서는 뷰를 어떻게 선언하고, 로직에 연결하고, 조합하고, 재사용하는지 다룹니다.

## 세 개의 파일, 하나의 컴포넌트

컴포넌트 `$my_card` 는 `my/card/` 에 있으며 최대 세 개의 파일로 기술되고, 각 파일은 명확한 역할을 가집니다.

- `card.view.tree` — 컴포넌트가 **무엇**인지: 구조와 기본 바인딩.
- `card.view.ts` — **어떻게** 동작하는지: TypeScript 메서드, 반응형 상태.
- `card.view.css.ts` — 어떻게 보이는지: 컴파일러가 검사하는 타입 붙은 스타일.

구조, 동작, 스타일을 분리한 것은 의도적입니다. 각 파일은 작고 읽기 쉬운 상태로 유지되며, 레이아웃이 로직과 뒤엉키지 않습니다.

## view.tree 언어

`view.tree` 는 구조를 선언적으로 기술합니다. 들여쓰기가 곧 중첩이며, 닫는 태그가 없습니다.

```tree
$my_card $mol_view
	sub /
		<= Title $mol_view
			sub / <= title \
		<= Body $mol_view
			sub / <= text \
```

- `$my_card $mol_view` — 당신의 컴포넌트는 기반 클래스 `$mol_view` 를 상속합니다.
- `sub /` — 자식 목록.
- `<= Title $mol_view` — 이름 붙은 서브뷰로, TypeScript 에서 `this.Title()` 로 접근할 수 있습니다.
- `<= title \` — 기본 원시 문자열 값을 가진 바인딩 가능한 프로퍼티 (`\` 는 원시 문자열의 시작).

대문자로 시작하는 이름(`Title`, `Body`)은 모두 접근, 오버라이드, 스타일링할 수 있는 실제 프로퍼티가 됩니다. 소문자 바인딩(`title`, `text`)은 모두 `.view.ts` 에서 계산할 수 있는 값이 됩니다.

## 프로퍼티 바인딩

두 연산자가 프로퍼티를 그 출처에 연결합니다.

- `<=` **단방향**: 자식이 소유자로부터 값을 읽습니다.
- `<=>` **양방향**: 값이 양쪽 방향으로 흐릅니다. 입력에 사용합니다.

```tree-no-run
$my_form $mol_view
	sub /
		<= Field $mol_string
			value? <=> text? \
```

여기서 입력의 `value` 와 소유자의 `text` 는 자동으로 동기화됩니다. 필드에 입력하면 `text` 가 갱신되고, 코드에서 `text` 를 설정하면 필드가 이를 반영합니다.

## 동작에 연결하기

기본값이 없는 바인딩은 `.view.ts` 에서 구현합니다. 클래스는 같은 이름의 생성된 기반 클래스를 상속합니다.

```typescript
namespace $.$$ {
	export class $my_card extends $.$my_card {
		@ $mol_mem
		title() {
			return 'Untitled'
		}
	}
}
```

템플릿이 바인딩하는 무엇이든(`title`, `text`, 서브뷰의 프로퍼티)에 여기서 로직을 부여할 수 있습니다. 반응성이 이 값들을 살아 있게 만듭니다.

## 속성과 요소 타입

`dom_name` 으로 밑바탕 HTML 요소를 바꾸고, `attr` 로 속성을 설정합니다.

```tree
$my_banner $mol_view
	dom_name \section
	attr *
		^
		role \note
```

`^` 는 부모의 속성을 상속하므로 `$mol_view` 가 이미 설정한 것들을 잃지 않습니다.

## 목록과 키가 있는 뷰

끝의 `*` 는 서브뷰를 패밀리로 바꿉니다. 키마다 인스턴스 하나입니다. 행에 사용하세요.

```tree
$my_list $mol_list
	rows /
		<= Row* $mol_view
			sub / <= row_title* \
```

프레임워크는 당신이 제공하는 각 키에 대해 `Row` 를 만들고, [가상화 렌더링](#!section=docs/page=rendering) 덕분에 화면에 있는 것만 구축합니다.

> 키가 있는 뷰 자체가 키가 있는 자식을 포함하면, 바깥쪽은 `Name*0` 이 아니라 `Name*` 로 키를 붙이세요. 인덱스가 붙은 형태는 중첩된 자식을 렌더링되지 않은 채로 둡니다.

## 조건부 뷰

`null` 을 할당하면 뷰가 렌더링에서 제거됩니다. 서브클래싱하여 어떤 변형에 필요 없는 것을 null 로 지우세요.

```tree
$my_page_readonly $my_page
	Edit_button null
```

## 조합과 재사용

뷰는 중첩으로 조합하고 확장으로 특수화합니다. 목록 안에서 사용되는 카드.

```tree
$my_user_card $mol_view
	sub /
		<= Name $mol_view
			sub / <= name \
		<= Email $mol_view
			sub / <= email \

$my_users_list $mol_list
	rows /
		<= User* $my_user_card
			name <= user_name* \
			email <= user_email* \
```

`$my_users_list` 는 카드의 모습을 다시 정의하지 않습니다. `$my_user_card` 를 재사용하고 각 인스턴스에 데이터를 먹입니다. 이것이 조합 모델의 전부입니다. 작은 뷰들을 서로 연결하고, 변형이 필요할 때 `extends` 로 특수화합니다.

## 다음

뷰는 구조를 기술합니다. 그것들을 살아 움직이게 하는 것은 반응형 데이터입니다. [상태와 반응성](#!section=docs/page=state) 으로 이어집니다.
