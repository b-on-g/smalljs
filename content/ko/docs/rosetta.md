# React, Vue, Svelte에서

React, Vue, Svelte로 UI를 만들어 봤다면, $mol이 하는 일의 대부분을 이미 이해하고 있습니다——이름만 다를 뿐입니다. 이 프레임워크들은 그럴 만한 이유로 훌륭하고 인기가 많습니다; 이 페이지는 경쟁이 아니라 번역 대조표로, 여러분이 빨리 익숙해지도록 돕기 위한 것입니다.

## 개념 대응

| 개념 | React | Vue | Svelte | $mol |
|------|-------|-----|--------|------|
| 컴포넌트 | 함수 / 클래스 | SFC(`.vue`) | `.svelte` 파일 | `.view.tree` + `.view.ts` |
| 로컬 상태 | `useState` | `ref` / `reactive` | `let x` | `@ $mol_mem` |
| 파생 값 | `useMemo` | `computed` | `$: y = …` | `@ $mol_mem`(다른 셀을 읽음) |
| 부수 효과 | `useEffect` | `watchEffect` | `$: { … }` | `@ $mol_action`(명시적, 결코 자동이 아님) |
| Props | props | props | `export let` | `view.tree`의 바인딩 |
| 이벤트 | `onClick` | `@click` | `on:click` | `click? <=> handler?` |
| 양방향 입력 | 제어된 입력 | `v-model` | `bind:value` | `value? <=> field?` |
| 리스트 | `items.map()` | `v-for` | `{#each}` | 키가 있는 `Row*` |
| 조건 | `cond && …` | `v-if` | `{#if}` | 제거하려면 `null` 할당 |
| 공유 상태 | Redux / Context | Pinia / provide | 스토어 | `@ $mol_mem`을 가진 임의의 객체 |
| 라우팅 | React Router | Vue Router | SvelteKit | `$mol_state_arg` |
| 스타일링 | CSS-in-JS | 스코프된 `<style>` | `<style>` | 타입이 있는 `.view.css.ts` |

## 대개 새롭게 느껴지는 것

- **반응성은 자동이고 선택 사항이 아닙니다.** Vue의 `ref`나 Svelte의 `$:`처럼, `@ $mol_mem` 값은 스스로 자신의 독자를 갱신합니다——하지만 유지할 의존성 배열도, 어디에도 수동 구독도 없습니다.
- **효과는 계산과 분리되어 있습니다.** React는 파생과 효과를 훅에 접어 넣지만, $mol은 그것들을 따로 둡니다: `@ $mol_mem`은 계산만, `@ $mol_action`은 효과를 수행합니다. 바로 이 분리가 "왜 이게 두 번 실행됐지?"라는 대부분의 수수께끼를 없앱니다.
- **상태는 그저 객체입니다.** 채택할 전용 스토어 라이브러리가 없습니다——공유 값은 임의의 객체 위의 반응형 속성이므로, 전역 상태와 컴포넌트 상태가 같은 방식으로 동작합니다.

## 번역을 시도해 보세요

대응을 체화하는 가장 빠른 방법은 둘 다 조금씩 써 보는 것입니다: [플레이그라운드](#!section=playground)를 열어, 여러분이 아는 작은 컴포넌트를 옮겨 보고 어떻게 되는지 보세요. 아니면 [시작하기](#!section=docs/page=getting-started)에서 시작하세요.
