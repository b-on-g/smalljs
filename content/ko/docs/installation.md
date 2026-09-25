# 설치

[시작하기](#!section=docs/page=getting-started) 는 첫 앱을 단계별로 안내합니다. 이 페이지는 레퍼런스입니다. $mol 프로젝트가 어떻게 구성되고 빌드가 어떻게 동작하는지 설명합니다.

## 요구 사항

- **Node.js 18+** 와 **git**. 그 외에 전역으로 설치할 것은 없습니다.

## MAM 워크스페이스

$mol 앱은 빌드 도구이자 모듈 레지스트리인 **MAM** 안에서 동작합니다. 한 번 클론한 뒤 그 안에서 모듈을 개발합니다.

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam
cd mam
npm install
npm start
```

`npm start` 는 `http://localhost:9080/` 에서 감시(watch) 개발 서버를 실행합니다. 저장할 때마다 다시 빌드하고 의존성을 자동으로 해석합니다. 번들러 설정을 유지 관리할 필요가 전혀 없습니다.

## 모듈 이름 규칙

모든 컴포넌트 이름은 폴더 경로에 대응하며, **각 밑줄은 폴더 구분자**입니다.

```
$my_app          →  my/app/
$my_app_header   →  my/app/header/
```

모듈 폴더 이름에는 밑줄이 들어가지 않습니다. 여러 단어로 된 이름에는 중첩 폴더를 사용하세요. 사용하는 컴포넌트가 번들에 나타나지 않는다면 거의 항상 폴더 경로가 클래스 이름과 맞지 않는 것입니다.

## 모듈의 구조

컴포넌트는 최대 네 개의 파일을 가진 폴더입니다.

| 파일 | 용도 |
|------|------|
| `name.view.tree` | 선언적 레이아웃 |
| `name.view.ts` | 동작 (TypeScript) |
| `name.view.css.ts` | 타입이 붙은 스타일 |
| `name.view.tree`, `index.html` | 앱 모듈의 진입점 |

앱의 `index.html` 은 루트 컴포넌트를 마운트합니다.

```html
<body mol_view_root>
	<div mol_view_root="$my_app"></div>
	<script src="web.js"></script>
</body>
```

## 프로덕션 빌드

개발 서버는 즉석에서 빌드하지만, 워크스페이스 루트에서 임의의 모듈을 명시적으로 빌드할 수도 있습니다.

```bash
npm run start my/app
```

결과물은 `my/app/-/` 에 생성되며 `web.js`, `web.css`, `web.audit.js` 를 포함합니다. **항상 감사(audit) 파일을 확인하세요.** 깨끗한 `web.audit.js` 는 사용되지 않는 의존성이 없고 타입 오류도 없다는 뜻입니다.

## npm 패키지 추가

`require` 로 패키지를 참조하면 MAM 이 다음 빌드에서 설치하고 번들에 넣습니다.

```typescript
const dayjs = require( 'dayjs' ) as typeof import( 'dayjs' )
```

### 런타임에 패키지 불러오기

한 화면에서만 쓰는 무거운 라이브러리를 `web.js` 에 넣어 둘 필요는 없습니다. 미리 빌드된 브라우저용 파일을 번들 옆에 두고 처음 쓸 때 불러옵니다.

모듈의 `meta.tree` 에 파일을 적습니다.

```tree
deploy \/node_modules/@turf/turf/turf.min.js
```

`deploy` 는 패키지가 없으면 설치하고 파일을 `-/node_modules/@turf/turf/turf.min.js` 로 복사합니다. 개발 서버에서도 프로덕션 빌드에서도 마찬가지입니다. `$mol_import.script` 로 불러옵니다.

```typescript
namespace $ {
	export class $my_app_turf extends $mol_object {

		@ $mol_mem
		static api() {
			$mol_import.script( './node_modules/@turf/turf/turf.min.js' )
			return ( globalThis as any ).turf as typeof import(
				'@turf/turf'
			)
		}

	}
}
```

- 경로는 상대 경로이고 `-/` 에 있는 페이지를 기준으로 해석되므로, 같은 코드가 개발 서버에서도, `test.html` 에서도, 하위 경로 배포에서도 동작합니다. 앞에 붙은 `/` 는 앱이 도메인 루트에 있을 때만 동작합니다.
- `$mol_import.script` 는 스크립트가 로드될 때까지 파이버를 멈추고 URL 별로 캐시합니다. 파일은 한 번만 받아 오고, `$mol_mem` 안에서 `$my_app_turf.api()` 를 읽는 쪽은 그저 기다립니다.
- 전역 이름(여기서는 `turf`)은 라이브러리의 브라우저용 빌드가 정하는 이름입니다. 어떤 이름인지는 README 에 나와 있습니다.
- `typeof import( … )` 로 완전한 타입을 얻습니다. 패키지 이름은 별도 줄에 두세요. 빌더는 한 줄에 쓴 `require( '…' )` 와 `import( '…' )` 를 의존성으로 보고, 결국 패키지 전체를 `web.js` 에 넣게 됩니다.

## 다음

워크스페이스가 준비되면 UI 자체를 어떻게 기술하는지 배워 봅시다. [뷰](#!section=docs/page=views) 로 이어집니다.
