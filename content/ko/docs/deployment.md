# 배포

빌드된 $mol 앱은 정적 파일이 담긴 폴더입니다. 돌릴 서버도, 살려 둘 Node 프로세스도, 고를 어댑터도 없습니다. 폴더를 서빙할 수 있는 곳이라면 어디서든 앱이 돕니다.

## 배포하는 것의 정체

빌드는 모든 것을 모듈 안의 `-/` 폴더에 씁니다:

```
my/hello/-/
├── index.html                 배포 경로에 맞게 다시 쓰임
├── web.js                     앱 전체, 파일 하나
├── web.css
├── web.locale=en.json         언어마다 하나
├── manifest.json
└── …                          `deploy` 지시자가 복사해 넣은 것들
```

그 폴더가 곧 사이트입니다. 아무 정적 호스트에서 서빙하면 앱이 동작합니다.

`my/hello/`의 나머지는 소스이고 `-/`는 생성물입니다. 작업 공간의 `.gitignore`가 `-*`를 무시하므로 빌드 결과가 프로젝트 자신의 이력에 들어가는 일은 없습니다. 웹에는 배포 브랜치를 통해 나갑니다.

## 짧은 버전

워크플로는 스캐폴더가 써 주므로, 새 프로젝트는 푸시만으로 배포됩니다:

```bash
npx create-view-tree-lsp my/hello
git push
```

`.github/workflows/deploy.yml`이 모듈을 빌드해 `my/hello/-/`를 `gh-pages` 브랜치로 푸시합니다. **Settings → Pages → Source**가 *Deploy from a branch*이고 `gh-pages`가 선택돼 있으면 GitHub가 그 브랜치를 서빙합니다. 그런 브랜치가 있는 저장소라면 그것이 바로 기본값입니다. URL이 404를 준다면 가장 먼저 확인할 설정입니다.

이후 사이트는 `https://<user>.github.io/<repo>/`에 삽니다.

## 워크플로가 실제로 하는 일

두 개의 액션이 전부를 떠받치고, 각각 입력은 두어 개입니다:

```yaml
- uses: hyoo-ru/mam_build@master2
  with:
      package: "my/hello"     # 빌드할 폴더, 작업 공간 기준 경로
      modules: "app"          # 그 안의 어떤 모듈인지

- uses: hyoo-ru/gh-deploy@v4.4.1
  if: github.ref == 'refs/heads/main'
  with:
      folder: "my/hello/app/-"
```

`mam_build`는 여러분의 패키지 주위에 MAM 작업 공간을 펼치고, 코드 속 `$name` 토큰을 그것들이 사는 저장소로 풀어낸 다음 빌드합니다. 잠금 파일도 `npm install` 단계도 필요 없습니다. 의존성 목록은 `.meta.tree`의 레지스트리 그 자체이며, [프로젝트 구조](#!section=docs/page=structure)에서 설명한 그대로입니다.

`gh-deploy`는 빌드된 폴더를 `gh-pages`에 커밋합니다. `target-folder`를 주면 루트 대신 하위 폴더에 놓이는데, 브랜치 미리보기가 그렇게 만들어집니다:

```yaml
- name: Deploy feature branch
  if: startsWith(github.ref, 'refs/heads/feature/')
  uses: hyoo-ru/gh-deploy@v4.4.1
  with:
      folder: "my/hello/app/-"
      target-folder: ${{ github.ref_name }}
```

그러면 `feature/*` 브랜치마다 같은 Pages 사이트 위에 자기 URL이 생기고, `delete` 트리거가 브랜치가 사라질 때 폴더를 치웁니다.

## 배포에 꼭 필요한 파일 하나

배포되는 패키지에는 옆에 한 줄짜리 `.gitattributes`가 필요합니다:

```
* -text
```

배포란 빌드 결과를 브랜치에 커밋하는 일이고, 그 결과는 텍스트만이 아닙니다. 그 커밋으로 가는 길에 정규화된 폰트와 이미지는 독자에게 깨진 채로 도착하지만, 빌드 자체는 초록으로 남습니다. 파일은 스캐폴더가 써 줍니다. 직접 만든 저장소라면 손으로 추가하세요.

## 사이트 루트에 있어야 하는 파일들

`meta.tree`의 `deploy \/path`는 파일을 `-/`로 복사하되 **작업 공간 기준 경로를 그대로 유지**합니다. 코드가 참조하는 자산에는 맞는 방식이고, 호스트가 루트에서 찾는 파일에는 맞지 않습니다. `CNAME`, `robots.txt`, 서치 콘솔 소유 확인 페이지 같은 것들은 빌드 이후, 배포 단계 이전에 워크플로 한 단계로 복사하세요.

```yaml
- name: Copy root-level files
  run: cp my/hello/public/CNAME my/hello/app/-/CNAME
```

## 정적 호스트에서의 딥링크

경로 라우팅을 쓰는 앱(`#!section=docs`가 아니라 `/section=docs/page=views`)이 호스트에 요구하는 것은 하나입니다. 마운트 아래의 알 수 없는 모든 경로가 앱의 `index.html`을 돌려줘야 합니다. 그러지 않으면 딥링크의 첫 방문은 404가 되고, 홈에서 이동하는 경우만 동작합니다.

GitHub Pages에는 리라이트 규칙이 없으니 길은 그 `404.html`을 지납니다. 알 수 없는 경로마다 이 파일이 나가고, 그 안의 몇 줄이 주소를 `index.html`에 돌려주면 라우터가 진짜 경로로 펼칩니다. 위의 파일들처럼 빌드 결과 옆에 복사하세요.

다른 호스트는 한 줄이면 됩니다. nginx는 `try_files $uri /index.html`, Caddy는 `try_files {path} /index.html`, Netlify는 `/* /index.html 200` 규칙입니다.

해시 라우터(기본값)를 쓰는 앱에는 이 중 아무것도 필요 없습니다. `#` 뒤의 것은 서버까지 가지 않으니까요.

## 푸시 전에 확인하기

빌드는 로컬과 CI가 같으므로, 로컬에서 초록인 감사는 초록인 배포를 뜻합니다:

```bash
npx mam my/hello/app
cat my/hello/app/-/web.audit.js
```

`Audit passed`가 보고서 전부입니다. 진짜 모습을 보려면 아무 정적 서버로 폴더를 서빙하세요:

```bash
npx serve my/hello/app/-
```

## GitHub Pages 너머

위의 어떤 것도 GitHub 전용이 아닙니다. 산출물은 폴더이고 배포는 복사입니다. Netlify, Cloudflare Pages, CDN 뒤의 S3, VPS의 nginx, 그 폴더를 담은 도커 이미지까지 — 빌드 단계는 똑같이 `npx mam my/hello/app`이고, 올리는 것은 `my/hello/app/-`입니다.

오프라인에서도 쓰이는 설치본이 필요하다면 [오프라인](#!section=docs/page=offline)이 번들을 캐시하는 서비스 워커를 더해 주고, 같은 폴더가 설치 가능한 앱이 됩니다.
