# 프로젝트 구조

$mol 프로젝트에는 중첩된 네 개의 층위가 있습니다. 여러분이 클론해 온 **워크스페이스**, 그 안의 **패키지**, 그 안의 **모듈**, 그리고 모듈 안의 **파일**입니다. 각 층위는 서로 다른 질문에 답하며, 빌드가 하는 일의 대부분은 무엇이 무엇인지 아는 것에서 따라 나옵니다.

```
mam/                            워크스페이스 — MAM 체크아웃
├── .meta.tree                  레지스트리: 어떤 패키지가 어느 저장소에서 오는지
├── package.json
├── mol/                        패키지 — 프레임워크 자체, 별도의 git 저장소
│   └── button/                 모듈 — 컴포넌트 $mol_button
│       ├── button.view.tree
│       ├── button.view.ts
│       ├── major/              서브모듈 — $mol_button_major
│       └── minor/              서브모듈 — $mol_button_minor
└── my/                         패키지 — 여러분의 것
    ├── .gitattributes          `* -text` — 빌드된 바이너리를 온전하게 유지
    └── hello/                  모듈 — 컴포넌트 $my_hello
        ├── index.html          진입점 (앱 모듈에만)
        ├── hello.view.tree     레이아웃
        ├── hello.view.ts       동작
        ├── hello.view.css.ts   스타일, TypeScript로
        ├── hello.locale=ru.json
        ├── hello.meta.tree     빌드와 배포 지시자
        ├── form/               서브모듈 — $my_hello_form
        ├── -view.tree/         hello.view.tree에서 생성됨
        └── -/                  빌드 산출물
```

## 워크스페이스

MAM은 한 번 클론해 두고 그 안에서 작업합니다. 의존성이 복사되어 들어오는 폴더가 아닙니다. 모든 패키지가 자기 git 체크아웃으로, 히스토리를 지닌 채 거기에 놓여 있으므로, 프레임워크의 소스를 읽고 거기에 `debugger`를 넣고 같은 작업 사본에서 풀 리퀘스트를 열 수 있습니다.

루트의 `.meta.tree`가 이것을 가능하게 하는 레지스트리입니다.

```tree
pack mol git \https://github.com/hyoo-ru/mam_mol.git
pack hyoo git \https://github.com/hyoo-ru/mam_hyoo.git
pack lib git \https://github.com/hyoo-ru/mam_lib.git
```

빌드가 `$mol_view`를 만났는데 아직 `mol/` 폴더가 없으면, 여기서 이름을 찾아 저장소를 클론합니다. 아무것도 벤더링되지 않고 아무것도 평탄화되지 않습니다.

## 패키지

최상위 폴더가 패키지이고, 패키지는 git 저장소입니다. 여러분 자신의 패키지는 그저 여러분이 이름 붙인 폴더입니다. 로컬에 머무는 동안에는 등록이 필요 없고, 이름으로 가져오고 싶어지는 날에 `pack` 한 줄이 필요합니다.

패키지는 중첩됩니다. 패키지는 자기 안의 폴더들을 위한 `pack` 선언을 스스로 지닐 수 있고, MAM은 그것을 그 패키지를 담게 될 폴더의 `meta.tree`에서 읽습니다. 이 사이트는 `bog/smalljs/`에 있고 그 자체로 하나의 저장소이며 `bog/bog.meta.tree`에 등재되어 있습니다. 그리고 그 파일은 루트 `.meta.tree`에 등재된 `bog/` 체크아웃 안에 있습니다.

### 모든 패키지에 필요한 파일 하나

배포되는 패키지에는 단 한 줄짜리 `.gitattributes`가 필요합니다.

```
* -text
```

이것은 git의 줄바꿈 정규화를 끕니다. 이게 중요한 이유는 배포가 빌드 산출물을 브랜치에 커밋하는 일이고, 그 산출물이 텍스트만은 아니기 때문입니다. 이 사이트는 57개의 바이너리 파일을 싣고 다닙니다. 직접 호스팅하는 폰트들과 페이지마다 하나씩의 미리보기 이미지입니다. 들어올 때 정규화되면 독자에게는 깨진 이미지와 폰트로 도착하는데, 정작 빌드 자체는 초록으로 남습니다. MAM 체크아웃도 루트에 같은 파일을 두고 있으며, 거기서는 폰트 형식이 추가로 `binary`로 표시되어 있습니다.

스캐폴더가 이 파일을 대신 써 줍니다. 여러분이 직접 시작한 저장소라면 손으로 추가하세요.

## 모듈

모듈은 폴더이고, 폴더는 컴포넌트입니다. import 문도 없고 모듈 맵도 없습니다. 클래스 이름 *자체*가 주소이고, 그 안의 각 밑줄은 폴더 구분자입니다.

```
$my_hello          →  my/hello/
$my_hello_form     →  my/hello/form/
$mol_button_major  →  mol/button/major/
$mol_after_frame   →  mol/after/frame/
```

해석 규칙은 이게 전부입니다. 빌더는 여러분의 소스 텍스트에서 `$name` 토큰을 훑고, 각각을 `_`로 쪼개어 폴더를 따라갑니다. 무엇도 의존성을 선언하지 않습니다. 이름을 쓰는 것이 곧 선언입니다.

실무적 귀결은 이렇습니다. **모듈 폴더 이름에는 결코 밑줄이 들어가지 않습니다.** `my/hello_form/`이라는 폴더는 `my/hello/form/`에서 찾게 되어 영영 발견되지 않습니다. 증상은 편집기에서는 컴파일되지만 번들에는 없는 클래스입니다.

서브모듈을 가진 모듈도 두 가지 형태 중 하나로 그 자신이 컴포넌트일 수 있습니다. `$mol_button`은 `major/`, `minor/` 옆의 `mol/button/`에 바로 있습니다. `$mol_view`는 한 단계 더 깊은 `mol/view/view/`에 있는데, `mol/view/`가 `component/`, `selection/`, `tree2/`도 품고 있기 때문입니다. MAM은 겹친 경로를 먼저 시도하고 짧은 쪽으로 물러나므로, 두 배치 모두 해석됩니다.

## 모듈 안의 파일

모든 파일은 선택 사항입니다. 모듈은 그 안에 마침 들어 있는 파일들 자체입니다.

| 파일 | 용도 |
|------|---------|
| `hello.view.tree` | 선언적 레이아웃 |
| `hello.view.ts` | 동작: 생성된 베이스를 확장하는 클래스 |
| `hello.view.css.ts` | 타입이 붙은 스타일. 끝의 `.ts`에 주목하세요. 스타일시트가 아니라 `$mol_style_define`을 호출하는 TypeScript입니다 |
| `hello.ts` | 뷰가 전혀 없는 모듈 — 모델, 유틸리티, 순수 로직 |
| `hello.test.ts` | 테스트. 빌더가 실행합니다 |
| `hello.locale=ru.json` | 번역. `.locale=<lang>.json`으로 끝나는 파일은 모두 수집됩니다 |
| `hello.meta.tree` | 빌드와 배포 지시자 |
| `index.html` | 진입점 — 앱 모듈만 필요로 합니다 |

확장자 앞의 접미사는 파일을 한 환경으로 제한합니다.

- `frame.web.ts` — 브라우저 번들만. `mol/after/frame/frame.web.ts`처럼
- `build.node.ts` — Node 번들만. MAM 빌더 자신처럼
- `hello.test.ts` — 테스트 번들만

빌더는 앱마다 `web` 번들과 `node` 번들을 만들고 다른 쪽으로 표시된 파일은 떨어뜨리므로, 플랫폼 코드가 런타임에 스스로를 방어할 일이 없습니다.

모듈 옆에는 날것의 `.css` 파일도 받아들여집니다. 프레임워크는 타입이 붙은 스타일로 표현할 수 없는 몇 가지, 이를테면 `@keyframes`나 `content:`에 그것을 씁니다. 그 밖의 모든 것은 `.view.css.ts`에 속하며, 거기서는 속성 이름이 검사됩니다.

## 생성된 폴더는 하이픈으로 시작합니다

MAM은 이름이 글자나 숫자로 시작할 때만 그것을 소스로 취급합니다. 그 외에는 빌드에 보이지 않으며, 그래서 생성된 폴더에는 모두 `-` 접두사가 붙습니다. 산출물이 입력 바로 옆에 놓이면서도 다시 입력으로 읽히지 않기 위해서입니다. 워크스페이스의 `.gitignore`가 `-*`를 무시하는 것도 같은 이유입니다.

**`-view.tree/`**는 모든 `.view.tree` 파일 옆에 나타나며, 트리가 컴파일된 결과를 담습니다.

```
my/hello/-view.tree/
├── hello.view.tree.js            생성된 베이스 클래스
├── hello.view.tree.d.ts          그 타입 인터페이스
└── hello.view.tree.locale=en.json  추출된 @ 문자열
```

여러분의 `hello.view.ts`는 그 안의 클래스를 확장합니다. 두 파일 사이의 관계는 그것이 전부입니다. [TypeScript에서 view.tree로](#!section=docs/page=from-ts-to-view-tree)가 생성된 코드를 한 줄씩 짚어 갑니다.

**`-css/`**는 날것의 `.css` 파일 옆에 나타나며, 스타일시트를 `$mol_style_attach` 호출로 감싼 생성된 `.ts`를 담습니다. 덕분에 스타일시트는 `<link>`를 요구하는 대신 번들과 함께 실려 갑니다.

**`-/`**는 여러분이 빌드한 모듈의 빌드 산출물입니다. 앱이라면 `web.js`, `web.css`, `web.audit.js`, `web.d.ts`, `web.deps.json`, 언어마다 하나씩의 `web.locale=<lang>.json`, 그에 대응하는 `node` 쪽 파일들, 다시 쓰인 `index.html`, 그리고 생성된 `package.json`과 `manifest.json`이 들어 있습니다. 여러분이 배포하는 것이 바로 이 폴더입니다. `app/-`를 정적 호스트에 게시하는 것이 배포 단계의 전부입니다.

이 가운데 어느 것도 손으로 편집하지 않습니다. 소스가 바뀔 때마다 빌더가 다시 쓰므로, 거기에 가한 수정은 다음 저장에서 사라지고 이유를 알려 주는 오류도 없습니다. `.view.tree`나 `.css`, 또는 소스를 바꾸고 다시 빌드하세요.

## meta.tree가 실제로 하는 일

`meta.tree`는 패키지 매니페스트가 아니고 의존성을 나열하지도 않습니다. 의존성은 코드에서 오며, 거기서는 `$mol_view` 토큰이 이미 선언 전체입니다. `meta.tree`가 지니는 것은 코드가 스스로 말할 수 없는 몇 가지뿐입니다. 이 사이트의 `app/app.meta.tree`는 이것이 파일 전체입니다.

```tree
include \/mol/offline/install
include \/bog/builderui/theme.css
deploy \/bog/smalljs/assets
```

- **`deploy \/path`**는 파일이나 폴더를 `-/` 안으로 복사하면서 워크스페이스 기준 경로를 유지합니다. `\/bog/smalljs/assets`는 `app/-/bog/smalljs/assets/`에 놓입니다. 배포가 실어 날라야 하지만 어떤 코드도 임포트하지 않는 정적 파일, 곧 이미지, 폰트, 아이콘을 위한 것입니다.
- **`include \/path`**와 **`require \/path`**는 아무것도 참조하지 않는 모듈을 강제로 끌어옵니다. 이를테면 `\/mol/offline/install`은 로드 시 등록하는 service worker가 존재 이유의 전부입니다. 둘의 차이는 순서뿐입니다. `require`는 그 모듈을 끌어온 코드보다 앞에, `include`는 뒤에 둡니다.
- **`pack <name> git \<url>`**는 위에서 설명한 레지스트리 항목이며, 그 패키지를 담게 될 폴더의 meta 파일에서 읽힙니다.

MAM은 한 폴더의 `*.meta.tree` 파일을 모두 읽으므로, 이름은 관례를 넘어선 의미를 갖지 않습니다. 모듈 옆이라면 `<module>.meta.tree`, 워크스페이스 루트라면 `.meta.tree`입니다.

실제로 `deploy`, `include`, `require`는 앱 모듈의 것입니다. 빌드되고 배포되는 것이 그것이기 때문입니다. 평범한 컴포넌트는 자기 코드에서 모든 것을 해석하므로 meta 파일이 아예 필요 없습니다. 라이브러리 모듈이 그것을 갖는 것은 정말로 참조되지 않는 의존성이 있을 때뿐입니다. `mol/assert/assert.meta.tree`는 `include \/mol/dev/format` 한 줄이고, 그것이 전형적인 크기입니다.

지시자에 대한 더 자세한 내용은 [모듈 메타데이터](#!section=docs/page=meta)를 참조하세요.

## 다음

[설치](#!section=docs/page=installation)는 개발 서버와 프로덕션 빌드를 다루고, [도구](#!section=docs/page=tooling)에는 올바른 모듈 배치를 대신 써 주는 스캐폴더가 있습니다.
