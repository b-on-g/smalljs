# 시작하기

이 페이지는 빈 폴더에서 실행되는 리액티브 $mol 앱까지 안내합니다. 약 15분 정도 걸립니다. 아래의 모든 코드 조각은 실제로 동작하는 코드입니다 — 그대로 복사하세요.

컴포넌트는 평범한 TypeScript로 작성합니다. $mol에는 컴포넌트를 기술하는 더 짧은 형식인 `view.tree`도 있고, 다음 페이지에서 만나게 됩니다. 여기서는 필요 없습니다. 어느 쪽으로 쓰든 $mol 컴포넌트는 평범한 클래스입니다.

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

`npm start`는 `http://localhost:9080/`에서 개발 서버를 띄웁니다. 파일을 감시하며 자동으로 다시 빌드하니, 전용 터미널에서 계속 돌아가게 두세요.

## 2. 모듈 만들기

$mol 앱은 그냥 폴더 하나입니다. 네임스페이스(당신의 것, 예를 들어 `my`)와 이름(`hello`)을 정하세요.

```bash
mkdir -p my/hello
```

> **기억해 둘 규칙 하나:** 컴포넌트 이름의 밑줄은 폴더 구분자입니다. `$my_hello`는 `my/hello/`에, `$my_hello_form`이라면 `my/hello/form/`에 놓입니다. 모듈 폴더 이름에는 밑줄이 절대 들어가지 않습니다.

이제 `my/hello/` 안에 파일 두 개를 추가하세요.

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

`mol_view_root="$my_hello"` 속성이 페이지 로드 시 컴포넌트를 마운트합니다.

### hello.view.ts — 컴포넌트

```typescript
namespace $ {

	export class $my_hello extends $mol_page {

		title() {
			return 'Greeting'
		}

		body() {
			return [ this.Name(), this.Message() ]
		}

		@ $mol_mem
		Name() {
			const obj = new this.$.$mol_string
			obj.hint = () => 'Enter your name'
			obj.value = ( next?: string ) => this.name( next )
			return obj
		}

		@ $mol_mem
		name( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		Message() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.greeting() ]
			return obj
		}

		greeting() {
			const name = this.name()
			return name ? `Hello, ${ name }!` : 'Please enter your name'
		}

	}

}
```

위에서 아래로 읽어보면:

- `$my_hello`는 모든 $mol 컴포넌트가 사는 주변 네임스페이스 `namespace $` 안에 있습니다. 제목과 본문을 갖춘 내장 페이지 껍데기 `$mol_page`를 확장합니다. 아래쪽의 `$mol_string`은 내장 텍스트 입력입니다.
- `body()`는 자식들을 돌려줍니다. 여기서 자식은 마크업이 아니라 프로퍼티입니다. `Name`과 `Message`는 호출할 수 있고, 서브클래스에서 재정의할 수 있고, 스타일시트에서 이름으로 겨냥할 수 있는 메서드입니다.
- `Name()`은 입력 필드를 만들고 배선합니다. 그 프로퍼티마다 값이 아니라 **화살표 함수**가 들어갑니다. 자식은 데이터가 필요할 때 그 화살표를 호출하므로 언제나 현재 값을 읽습니다.
- `name( next?: string )`이 상태입니다. 인자 없이 부르면 읽고, 인자와 함께 부르면 씁니다. 이 함수 전체를 `obj.value`에 넘겼기 때문에 필드에 입력하면 `name`이 갱신됩니다.
- `@ $mol_mem`은 프로퍼티를 인스턴스 단위로 캐시합니다. `name`에 붙으면 값이 보관되고, 그 값을 읽었던 모든 것이 값이 바뀔 때 다시 계산됩니다. `Name`과 `Message`에 붙으면 호출할 때마다 새로 만드는 대신 한 번 만들어진 자식 컴포넌트 하나가 유지됩니다.
- `greeting()`은 `name()`을 읽습니다. 그 읽기가 *곧* 구독입니다. `name`이 바뀌면 `greeting`이 다시 계산되고 화면의 글자가 따라옵니다. 선언할 이펙트도, 의존성 배열도, 재렌더 호출도 없습니다.

## 3. 실행하기

1단계의 개발 서버가 이미 감시 중입니다. 그냥 열면 됩니다.

```
http://localhost:9080/my/hello/
```

이름을 입력하면 타이핑에 맞춰 인사말이 갱신됩니다. 이것이 $mol의 리액티비티입니다. 상태가 스스로 뷰로 흘러갑니다.

## 4. 두 번째 리액티브 값 더하기

리액티비티는 조합됩니다. 추가 배선 없이 같은 `name`을 읽는 길이 카운터를 더해 봅시다.

`body()`에 넣습니다.

```typescript
		body() {
			return [ this.Name(), this.Message(), this.Counter() ]
		}
```

그 뒤의 프로퍼티 두 개를 덧붙입니다.

```typescript
		@ $mol_mem
		Counter() {
			const obj = new this.$.$mol_view
			obj.sub = () => [ this.counter() ]
			return obj
		}

		counter() {
			return `${ this.name().length } characters`
		}
```

`greeting`도 `counter`도 `name`을 읽고, 둘이 함께 갱신됩니다. 세 번째를 더해도, 열 번째를 더해도 리액티브한 절반은 모양이 바뀌지 않습니다.

나머지 절반은 바뀝니다. 세 줄의 로직이 여섯 줄의 배관을 데려왔습니다 — 팩토리, `new`, 화살표, `return obj`. 실제 화면의 자식 수만큼 곱해 보면 `view.tree`가 존재하는 이유가 나옵니다.

## 5. 빌드 확인하기

MAM은 모든 앱 옆에 진단 파일을 씁니다. 빌드 후 열어보세요.

```
http://localhost:9080/my/hello/-/web.audit.js
```

깨끗한 감사는 사용하지 않는 의존성도 없고, 타입 문제도 없고, 고칠 것이 아무것도 없음을 뜻합니다. 흘긋 보는 습관을 들이세요 — 브라우저에 도달하기 전에 실수를 잡아줍니다.

## $mol 앱을 만들었습니다

양방향 바인딩과 파생 상태를 갖춘 리액티브 컴포넌트가, 파일 하나에, 설정 제로로.

이제 바로 그 파일이 줄어드는 모습을 보세요. **[TypeScript에서 view.tree로](#!section=docs/page=from-ts-to-view-tree)**
