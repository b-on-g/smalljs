# 시작하기

이 페이지는 빈 폴더에서 실행되는 리액티브 $mol 앱까지 안내합니다. 약 15분 정도 걸립니다. 아래의 모든 코드 조각은 실제로 동작하는 코드입니다 — 그대로 복사하세요.

## 필요한 것

- **Node.js 18+** 와 **git**. 목록은 이게 전부입니다.

전역 CLI를 설치하거나 나중에 이해해야 할 보일러플레이트를 생성할 필요가 없습니다. $mol 앱은 MAM 워크스페이스 안에서 살아가며, 이 워크스페이스는 이미 빌드하고 서빙하는 방법을 알고 있습니다.

## 1. 워크스페이스 받기

MAM은 $mol의 빌드 도구이자 모듈 레지스트리입니다. 한 번 클론하고 설치하세요.

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start`는 `http://localhost:9080/` 에서 개발 서버를 시작합니다. 파일을 감시하고 자동으로 다시 빌드하므로, 별도의 터미널에서 계속 실행되도록 두세요.

## 2. 모듈 만들기

$mol 앱은 그냥 폴더입니다. 네임스페이스(당신의 것, 예: `my`)와 이름(`hello`)을 고르세요.

```bash
mkdir -p my/hello
```

> **기억해야 할 한 가지 규칙:** 컴포넌트 이름 안의 밑줄은 폴더 구분자입니다. `$my_hello`는 `my/hello/`에, `$my_hello_form`은 `my/hello/form/`에 놓입니다. 모듈 폴더 이름에는 절대 밑줄이 포함되지 않습니다.

이제 `my/hello/` 안에 세 개의 파일을 추가합니다.

### index.html — 진입점

```html
<!doctype html>
<html mol_view_root>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>
	<body mol_view_root>
		<div mol_view_root="$my_hello"></div>
		<script src="web.js"></script>
	</body>
</html>
```

`mol_view_root="$my_hello"` 속성이 페이지가 로드될 때 당신의 컴포넌트를 마운트합니다.

### hello.view.tree — 레이아웃

```tree-no-run
$my_hello $mol_page
	title @ \Greeting
	body /
		<= Name $mol_string
			hint @ \Enter your name
			value? <=> name? \
		<= Message $mol_view
			sub / <= greeting \
```

짚어둘 만한 몇 가지가 있습니다.

- `$mol_page`와 `$mol_string`은 내장 컴포넌트입니다 — 페이지 셸과 텍스트 입력입니다.
- `<=`는 프로퍼티를 단방향으로, `<=>`는 양방향으로 바인딩합니다. 그래서 `value? <=> name?`는 입력과 `name` 상태를 동기화된 상태로 유지합니다.
- `@`는 로컬라이즈 가능한 문자열을 표시하고, `\`는 원시 문자열을 시작합니다.

### hello.view.ts — 동작

```typescript
namespace $.$$ {
	export class $my_hello extends $.$my_hello {
		@ $mol_mem
		greeting() {
			const name = this.name()
			return name ? `Hello, ${name}!` : 'Please enter your name'
		}
	}
}
```

`@ $mol_mem`은 `greeting`을 리액티브하고 캐시되는 프로퍼티로 만듭니다. 이 프로퍼티는 `name()`을 읽으므로, `name`이 바뀌는 순간 `greeting`이 다시 계산되고 화면의 메시지가 갱신됩니다. 구독도, 이펙트도, 다시 렌더링 호출도 직접 작성하지 않았습니다.

## 3. 실행하기

1단계의 개발 서버가 이미 감시하고 있습니다. 그냥 여세요.

```
http://localhost:9080/my/hello/
```

이름을 입력해 보세요 — 입력하는 대로 인사말이 갱신됩니다. 이것이 $mol의 리액티비티입니다. 상태는 스스로 뷰로 흘러갑니다.

## 4. 두 번째 리액티브 값 추가하기

리액티비티는 조합됩니다. 추가 배선 없이 같은 `name`에 의존하는 길이 카운터를 추가해 봅시다.

`hello.view.tree`의 `Message` 아래에 한 줄을 추가하세요.

```tree
		<= Counter $mol_view
			sub / <= counter \
```

`hello.view.ts`에 메서드를 추가하세요.

```typescript
		@ $mol_mem
		counter() {
			return `${this.name().length} characters`
		}
}
```

`greeting`과 `counter` 둘 다 `name`을 읽습니다. 둘 다 함께 갱신됩니다. 세 번째를 추가하든, 열 번째를 추가하든 — 패턴은 바뀌지 않습니다. 이것이 기능이 쌓여도 $mol 코드가 평평하게 유지되는 이유입니다.

## 5. 빌드 확인하기

MAM은 모든 앱 옆에 진단 파일을 씁니다. 빌드 후에 여세요.

```
http://localhost:9080/my/hello/-/web.audit.js
```

깨끗한 감사는 사용하지 않는 의존성도 없고, 타입 문제도 없고, 고칠 것이 아무것도 없음을 뜻합니다. 흘긋 보는 습관을 들이세요 — 브라우저에 도달하기 전에 실수를 잡아줍니다.

## $mol 앱을 만들었습니다

당신은 리액티브 컴포넌트, 양방향 바인딩, 그리고 파생 상태를 가지게 되었습니다 — 세 개의 작은 파일과 설정 제로로.

계속 나아가세요. **[가이드](#!section=docs/page=installation)**는 설치, 뷰, 상태, 라우팅, 데이터를 깊이 다루고 — 이 Hello World를 진짜 무언가로 바꿉니다.
