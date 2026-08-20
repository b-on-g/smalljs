# 도구

$mol은 어떤 에디터에서도 동작하지만, 소수의 도구를 쓰면 `.view.tree`와 타입이 지정된 스타일이 훨씬 편해집니다. 프로젝트 스캐폴더, 언어 서버, Zed와 VS Code용 에디터 통합, 그리고 LLM 어시스턴트에게 프레임워크를 가르치는 스킬입니다.

## 프로젝트 스캐폴딩

`create-view-tree-lsp`는 바로 실행 가능한 $mol 모듈을 생성하므로 보일러플레이트를 손으로 조립할 필요가 없습니다.

```bash
npx create-view-tree-lsp bog/myapp
```

인자는 모듈 경로(`namespace/name` 또는 동등한 `bog_myapp`)입니다. 동작하는 앱의 `view.tree`, `view.ts`, `view.css.ts`, `index.html`과 함께, 이를 배포하는 GitHub Actions를 작성합니다. 기본적으로 local-first 저장소 **Giper Baza**, **Docker** 설정, **Tauri** 데스크톱 셸도 포함합니다. 어느 것이든 플래그로 끌 수 있습니다.

```bash
npx create-view-tree-lsp bog/myapp --no-baza --no-docker --no-tauri
```

반대로, 몇 가지 요소는 선택적으로 켭니다.

- `--backend`는 `node:sqlite` 저장소와 공유 TypeScript 아이템 타입을 갖춘 `$mol_server` REST 백엔드를 추가합니다
- `--prerender`와 `--seo`는 검색 엔진 가시성을 추가하며, 아래 [지속적 통합](#!section=docs/page=tooling/Docs.Body=%EC%A7%80%EC%86%8D%EC%A0%81%20%ED%86%B5%ED%95%A9)에서 설명합니다

스캐폴더는 언어 서버의 CLI를 감싼 얇은 래퍼이므로, `npx view-tree-lsp create bog/myapp`도 같은 일을 직접 수행합니다.

## 번역

번역은 자기 모듈 옆, `<module>/<name>.locale=<lang>.json` 에 놓입니다. 코드 입장에서는 편하지만 번역자에게는 그렇지 않습니다. 문구 목록 하나가 아니라 잘게 쪼개진 파일 서른 개를 받게 되니까요.

**[$yuf_localizer](https://zerkalica.github.io/yuf/#!demo=yuf_localizer_demo)** 가 그 간극을 메웁니다. 프로젝트 주소와 언어 코드를 알려주면 모든 키를 검색 가능한 하나의 목록으로 보여주고, 아직 남은 것들을 표시해 줍니다. 영어로만 있는 키, 고쳤지만 아직 확정하지 않은 키, 프로젝트에 더는 없는 낡은 키가 그렇습니다. 번역은 내보내기 전까지 브라우저에 남아 있어 작업을 중단해도 사라지지 않습니다.

번역자가 끝내면 결과를 내보내고 다시 모듈별로 나눕니다.

```bash
# MAM 루트에서 실행
npx view-tree-lsp locale bog/myapp/app/- --exclude=mol --update
```

인자로는 폴더도, 로케일 파일 하나도 줄 수 있습니다. 옵션은 다음과 같습니다.

- `--include=` 는 경로 조각을 받아 그것이 포함된 모듈만 남깁니다. 몇 번이든 반복할 수 있습니다
- `--exclude=` 는 반대로 그런 모듈을 건너뜁니다. `--exclude=mol` 은 프레임워크 자체 패키지를 그대로 둡니다
- `--update` 는 기존 파일에 병합합니다. 입력 쪽 값이 이기고, 입력에 없는 키는 남습니다
- `--dry` 는 계획만 출력하고 아무것도 쓰지 않습니다

각 키는 자기 모듈 경로를 품고 있어서 `$my_page_greeting` 은 자신이 속한 소스 옆인 `my/page/page.locale=ru.json` 에 놓입니다. 다만 그 모듈을 알아내는 일은 보기보다 까다롭습니다. `_` 는 폴더 구분자이면서 단어 구분자이기도 해서 "가장 길게 일치하는 경로"는 틀린 답입니다. `$my_page_lang_hint` 에서 속성 이름은 `lang` 으로 시작하는데, 옆에 실제 `my/page/lang` 서브모듈이 있다면 그 키를 삼켜버립니다. 그래서 이 명령은 후보 모듈마다 어떤 키를 선언했는지 묻습니다. MAM 이 바로 그 키들을 해당 모듈의 `-view.tree` 로케일 파일에 기록해 두므로, 키는 진짜 주인에게 돌아갑니다.

## 지속적 통합

스캐폴더는 GitHub Actions를 `.github/workflows/`에 작성하므로, 새 프로젝트는 별도 설정 없이 배포되고 릴리스됩니다.

`deploy.yml`은 모든 푸시에서 실행됩니다. `hyoo-ru/mam_build`로 앱을 빌드하고, `main`에서 `app/-`을 **GitHub Pages**에 게시하며, 각 `feature/*` 브랜치에 자체 미리보기 폴더를 부여합니다. 브랜치가 삭제되면 자동으로 제거됩니다.

### SEO

두 가지 독립적인 옵션이며, 둘 다 `v*` 태그에서 트리거됩니다.

- **`--prerender`**는 `b-on-g/mol-prerender-action`으로 나열한 화면(예: `home`)을 정적 HTML로 렌더링하므로, 크롤러와 링크 미리보기가 실제 콘텐츠를 봅니다.
- **`--seo`**는 `$bog_seo` 런타임을 추가합니다. 사이트맵, `robots.txt`, `llms.txt`, 페이지별 메타 주입을 갖춘 pathname 라우터입니다. 이 잡은 빌드를 서빙하고, 정규 프리렌더 HTML을 덤프하여 배포에 다시 접어 넣습니다.

소수의 공개 화면이 크롤 가능해야 할 때는 prerender 액션을, 사이트맵과 페이지별 메타데이터가 필요할 때는 `$bog_seo`를 선택하세요.

### Tauri 데스크톱

Tauri 옵션을 쓰면, `tauri.yml`이 재사용 가능한 워크플로 `b-on-g/tauri-mol-workflow-template`을 통해 `v*` 태그에서(또는 필요 시) 데스크톱 바이너리를 빌드합니다. 웹에 배포하는 것과 같은 모듈에서요.

## 언어 서버

`view-tree-lsp`는 `view.tree` 형식을 위한 Language Server Protocol 구현입니다. 전역 설치 없이 npx로 필요할 때 실행하세요.

```bash
npx view-tree-lsp@latest
```

워크스페이스를 스캔하여 LSP를 지원하는 모든 에디터에 다음을 제공합니다.

- `$mol_*` 컴포넌트와 자신의 프로젝트에 정의된 컴포넌트 및 프로퍼티에 대한 자동 완성
- 커서 아래 컴포넌트로 한정된 프로퍼티 제안
- 탐색용 컴포넌트 선언 개요
- 파일이 바뀌는 대로 반영되는 실시간 업데이트

LSP를 말하므로, 어떤 에디터의 언어 클라이언트든 `npx view-tree-lsp`로 향하게 할 수 있습니다. 아래 두 통합이 대신 연결해 줍니다.

## Zed

**View Tree Syntax Highlighting for $mol** 확장은 tree-sitter 문법, 언어 서버, 선택적 아이콘 테마를 묶습니다. Zed의 확장 관리자에서 설치하세요.

1. 명령 팔레트를 엽니다(`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. **zed: extensions**를 실행합니다
3. `view.tree` 또는 `mol`을 검색하여 확장을 설치합니다

`.view.tree` 파일의 구문 강조, 자동 완성, 개요를 얻습니다. [소스](https://github.com/Dev-cmyser/zed-view.tree-mol-support)와 어울리는 [아이콘 테마](https://github.com/Dev-cmyser/zed-viewtree-icon-theme)는 GitHub에 있습니다.

## VS Code

MAM 워크스페이스는 이미 자체 VS Code 설정을 갖고 있습니다. 클론한 `mam` 폴더를 열면, VS Code는 `.vscode/extensions.json`의 권장 확장 설치를 제안합니다.

- `nin-jin.vscode-language-tree` — `view.tree` 언어 지원
- `stan-donarise.view-tree-language` — 구문과 문법
- `editorconfig.editorconfig` — 일관된 포매팅

같은 폴더는 `mol.code-snippets`도 제공하므로, 컴포넌트와 바인딩 스니펫을 별도 설정 없이 쓸 수 있습니다. 프롬프트를 수락하면 `.view.tree`와 TypeScript 파일이 기본으로 강조됩니다.

## LLM 스킬

`mol_skill`은 AI 어시스턴트가 $mol을 작성하는 데 필요한 맥락을 제공합니다. `view.tree` 문법, MAM 모듈 구조, `view.ts`와 `view.css.ts`의 역할 분담, Giper Baza 데이터 모델링, Tauri 패키징입니다. 형태는 평범한 스킬 폴더로, `SKILL.md` 워크플로와 레퍼런스 문서가 전부여서 skills 형식을 읽는 LLM 도구라면 Claude Code든 Cursor든 불러올 수 있습니다. skills CLI로 설치합니다:

```bash
npx skills add b-on-g/mol_skill --all -g
```

그다음에는 자기 말로 물어보면 됩니다("MAM 모듈 구조", "Giper Baza의 CRUD와 역할"). 어시스턴트가 답하기 전에 해당 레퍼런스를 열기 때문에, 작성되는 코드가 이 문서의 관례를 따릅니다. [소스](https://github.com/b-on-g/mol_skill)는 GitHub에 있고, 직접 읽는 편이 좋다면 레퍼런스 파일만 따로 읽어도 충분합니다.

## 링크

- 스캐폴더 — [create-view-tree-lsp](https://github.com/Dev-cmyser/create-view-tree-lsp)
- 언어 서버 — [view-tree-lsp](https://github.com/Dev-cmyser/view.tree)
- Zed 확장 — [zed-view.tree-mol-support](https://github.com/Dev-cmyser/zed-view.tree-mol-support)
- LLM 스킬 — [mol_skill](https://github.com/b-on-g/mol_skill)
