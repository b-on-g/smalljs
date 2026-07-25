# smalljs — overnight run status

Автономный прогон через все спринты (0b→6). Обновляется по-фазно. Читать утром.

## Мандат (согласовано 2026-07-25)
- Объём: **все спринты 0b–6**, приоритет — **ширина** (пройти всё вчерне) над лоском Foundation.
- Git: коммит+пуш **в main** по-спринтово (каждый спринт → публичный gh-pages). Сообщения мои, без Co-Authored-By.
- Контент (Getting Started, Guide, уроки, примеры): **молеры пишут черновиком** из `bog/mol_skill/references/` + реальный $mol-код, tone-check. Ревью — за пользователем.
- Развилки, которые PLAN велит согласовывать (отклонение от vuejs.org, ампутация Vue-блока): **делаю ближайшее к Vue, ничего не режу без нужды, спорное — в раздел «Флаги» ниже**.
- `$mol_text` не хватает → расширяю **наследованием** (подкласс), аналогично в похожих случаях.
- Пререндер — `/Users/cmyser/code/mam/bog/mol-prerender-action`.
- Билд-audit зелёный между каждой фазой; tone-check на каждую публичную страницу.
- **Адаптив / mobile-first (ОБЯЗАТЕЛЬНО, сразу, не ретрофитом):** каждый лейаут работает на телефоне. top-nav → hamburger-меню на узких экранах (как vuejs.org); docs 3-col → collapsible sidebar/drawer + скрытый TOC; playground/course — тач-friendly, колонки в стек. Финальный polish-проход по мобиле в конце.
- **Качество / переиспользование (ОБЯЗАТЕЛЬНО):** делать НА СОВЕСТЬ, без слопа. (1) Изучать как задачу решают другие — открывать vuejs.org и другие хорошие docs/course/playground/поиск сайты в Chrome, переносить их подходы. (2) МАКСИМАЛЬНО переиспользовать то, что уже есть в $mol — искать готовые `$mol_*` / `$bog_*` компоненты (каталог, `bog/builderui/*`, node_modules) ПЕРЕД тем как писать своё; хендрол только если готового нет. (3) Расширять существующее наследованием, а не форком.

## Прогресс
| Спринт | Что | Статус |
|---|---|---|
| 0a | Vue-style shell | ✅ было до прогона |
| 0b | Top-nav дропдауны + mobile hamburger | ✅ commit 5e9357f → main. Десктоп-дропдауны проверены в Chrome (работают, Vue 1:1), переиспользован `$mol_pick`. Мобила: hamburger + `@media(max-width:47.9375rem)` в коде — на реальном устройстве НЕ проверено (screenshot-тул не отдаёт мобильный вьюпорт). |
| 1 | Foundation: система контента + Getting Started + Guide + llms.txt + базовый playground | ⏳ **1A готово** (fw контента + Getting Started + Introduction/Views/State/Routing + llms.txt + пререндер-wiring), commit fd46a56→…; осталось: полный Guide (5-7 стр вместо 3 stub-ов), landing copy, базовый view.tree playground |
| 2 | Playground + TS в браузере | — |
| 3 | Семантический поиск (transformers.js) | — |
| 4 | Курс (10–15 уроков) | — |
| 5 | Showcase + Rosetta | — |
| 6 | API reference автоген | — |

## Флаги для пользователя (решения, которые я принял вместо согласования)

### Sprint 0b (дропдауны)
- **«Support» дропдаун**: у vuejs.org НЕТ top-dropdown «Support» — у Vue вместо него ссылка «Sponsor». В нашем shell (0a) «Support» уже был, я его НЕ удалял (правило: не резать существующие nav-пункты), наполнил GitHub Discussions + DEV Community. **Реши:** оставить «Support», переименовать в «Sponsor» (как Vue) или убрать.
- **Внешние URL, которые проставил молер** (проверь, что верные): Official Libraries → `github.com/hyoo-ru/mam_mol/tree/master/{wire,crowd,crus,state/arg}` (crus=Giper Baza?, state/arg=router); Support → `github.com/hyoo-ru/mam/discussions`, `dev.to/t/mol`; Ecosystem/Themes catalog → `mol.hyoo.ru`. Giper Baza-ссылка ведёт на `crus` — уточни, туда ли (может, на giper/baza репо).
- **Внутренние ссылки** (Quick Start/Guide/API/Themes/Plugins/FAQ/Team/…) ведут на `section \docs page \<slug>` — целевые страницы ещё не построены (Sprint 1+). Пока кликаются в стабы.
- Мобильный hamburger реализован в коде — **проверь на реальном телефоне** (мой screenshot-тул не отдаёт мобильный вьюпорт).

### Sprint 1A (docs-фреймворк + Getting Started)
- **Контент встроен как TS, не фетчится.** Deploy шлёт только `app/-`, поэтому рантайм-fetch `.md` в проде сломался бы. `content/gen.cjs` читает `content/en/docs/*.md` и генерит `content/content.ts` (+`content/llms.txt`), эскейпя `$`→`$` и `require(`→`require(`, иначе MAM тащит примеры кода (`$my_hello`, `require('moment')`) в граф зависимостей и валит audit. **Правило: после правки любого `.md` — `node content/gen.cjs`** (иначе прод отдаст старое). Кандидат на CI-шаг (не добавил — не хочу трогать рабочий mam_build без проверки).
- **Edit-on-GitHub** ведёт на `content/en/docs/<slug>.md` (реальный редактируемый источник), ветка `main`.
- **`.md`-эндпоинты + llms.txt в проде** — через новый шаг в `deploy.yml` (копирует `.md` → `app/-/docs/` и `llms.txt` → корень). Работает только на gh-pages после мержа; **в CI не проверено** (нет прогона). llms.txt-ссылки указывают на `https://b-on-g.github.io/smalljs/docs/<slug>.md`.
- **Пререндер** подключён (`b-on-g/mol-prerender-action@v1`) с `continue-on-error` (не блокирует деплой). Экшен варьирует ОДИН route-key → пререндерю по `section` (`docs`/`playground`; docs даёт дефолтную Introduction). Пер-страничный пререндер доков (`section=docs`+`page=X`) экшен из коробки НЕ умеет — флаг на будущее (мультипараметрический пререндер). **В CI не проверено.**
- **Мобильный drawer** (sidebar выезжает, TOC прячется на планшете) — CSS в бандле (брейкпоинты 47.9375/63.9375rem, translateX + attr `bog_smalljs_sidebar_open` подтверждены). **На реальном телефоне не проверено** — screenshot-тул отдаёт только ~1333px вьюпорт (та же проблема, что в 0b).
- **TOC scroll-to** переиспользует якоря самого `$mol_text` (arg-key = `Body.param()`); проверено в Chrome — работает, подсветка активного пункта есть.
- **Audit'ы:** авторитетный — `bog/smalljs/app/-/web.audit.js` (НЕ `bog/smalljs/-/…`, тот проходит даже при ошибках в app). AGENTS.md стоит поправить.
- Guide-страницы Views/State/Routing — короткие (по 1 экрану), реальный $mol-код, но это ещё не полный Guide из PLAN (5-7 глав install→giper baza).

## Что требует ревью / сыро
_(заполняется по ходу)_

## Лог коммитов
- `5e9357f` — Sprint 0b: top-nav dropdowns + mobile hamburger nav (+ uncommitted 0a shell baseline, AGENTS/STATUS docs)
- `fd46a56` — Sprint 1A: docs content framework + Getting Started (content/ модуль, docs-роутинг page→md, sidebar/TOC/prev-next, mobile drawer, 5 страниц)
- `ab057fd` — Sprint 1A: llms.txt + пререндер/`.md`-эндпоинты в deploy.yml + STATUS-флаги. **origin/main = ab057fd, задеплоено.**
- ✅ Sprint 1B — Guide доведён: 8 страниц (introduction, getting-started, installation, views, state, routing, data, giper-baza), 3 группы sidebar (Getting Started / Essentials / Data). Плюс: graceful «Coming soon» для ненаписанных страниц (все ненайденные nav/footer-ссылки деградируют мягко), почин целевых ссылок — hero-CTA лендинга (Why→introduction, Get Started/Install→getting-started) и Docs-дропдаун (Quick Start→getting-started, Guide→views, desktop+mobile). Проверено в Chrome.
