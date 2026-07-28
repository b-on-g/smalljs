# smalljs — overnight run status

## ✅ ДОРОЖНАЯ КАРТА 0b→6 ЗАКРЫТА ЦЕЛИКОМ (за ночь, 11 коммитов, всё на проде gh-pages)
Каждый спринт: audit `app/-/web.audit.js` green, проверен в Chrome, запушен в main, задеплоен.
Сайт: Vue-style лендинг · top-nav с дропдаунами+мобильным hamburger · **9-главный Guide** · **живой view.tree playground с TS-в-браузере** · **интерактивный курс (5 уроков)** · **⌘K full-text поиск** · **Showcase+Rosetta** · **автоген API-справочник (15 компонентов)** · llms.txt · 26 docs-страниц.

**Осознанно отложено (в «Флаги»/«ревью» ниже, с готовыми дизайнами — твои решения):** семантический поиск (ONNX; full-text работает), Giper Baza-урок курса (нужен baza-рантайм), скриншоты Showcase + сверка части URL, финальный mobile pixel-polish (CSS есть, реальное устройство не проверялось), `$mol_view` API-страница.

Автономный прогон через все спринты (0b→6). Читать утром — детали по фазам ниже.

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

## Post-review фиксы (2026-07-26, по фидбеку пользователя)
- `ee7d131` — **fix билда**: prerender action `@v1`→`@main` (тега v1 не было, деплой падал).
- `7586d9f` — **Batch A** nav/cleanup: убран Support-дропдаун, Platinum Sponsors+banner, пустые страницы (Glossary/Migration/Themes/Plugins/CoC/Privacy/News→*), футер на 4 колонки только с реальными ссылками. Github→`hyoo-ru/mam_mol`. Giper Baza→`giper-dev/baza` (было crus). Official Libraries: wire/fetch/compare_deep/state_arg/crowd/baza (все curl-200). About: faq/team/releases.md.
  - **Ждём:** ТГ-канал «гипер дев» от пользователя (битый `mam/discussions` убран, ссылки нет — не критично).
- `3e7fffc` — **Batch B** фиксы поиска (все 4 бага, проверены в Chrome): ⌘K (window keydown listener — hotkey-плагин ловил только фокус внутри app), автофокус инпута (`@$mol_action`), клавнавигация ↑↓+Enter, баг повторного выбора (`$mol_link` arg=toggle зануляет section→home; фикс preventDefault + явный `$mol_state_arg.value`). Найден **2-й MAM-баг**: keyed `<=>` event-handler не генерит stub (TS2339).
- **Batch C** (багфиксы) — пункты 2-5 готовы (commits 38cc1d4/c9e19e1/3ae4416/7529423, audit green): playground-ts дефолтный счётчик · git pre-commit hook на `gen.cjs` (`.githooks/`, `core.hooksPath`) · `bog/smalljs/MAM_BUGS.md` (оба MAM-бага под issue) · **реальный mobile-polish** (лендинг БЕЗ мобильного брейкпоинта был — hero вылезал/Features 3 кол/футер уезжал → починено; топбар-overflow; курс-playground minWidth:0). Проверено на 390px.
  - **#1 дрейф скролла — НЕ воспроизведён** молером (нет виртуализации/rogue-transform; вектор — `$mol_text.auto_scroll` + зависший арг `Docs.Body`). **Ждём точный repro от пользователя** (страница/действие/трекпад-momentum vs колесо).
- `2d60a8a` — **Batch E #2**: доки Plugins/Meta/Ghost (группа sidebar «Advanced», факты из исходников mol/). Git-hook сработал (перегенерил content.ts).
- `6abea7c` — **Batch E #1 семантический поиск РАБОТАЕТ** (не откат): `all-MiniLM-L6-v2` 384-dim, build-time `embed.cjs`→embeddings.ts (~100КБ), рантайм лениво CDN через `$mol_import.module`, full-text мгновенно + семантика домешивается (cosine-мёрж 0.6/0.9), индикатор загрузки. Проверено (plugins 15→5 место на «bind a keyboard shortcut»). Escape-hatch: откат на full-text при loading/ошибке/оффлайне. Гоча решена: `allowLocalModels=false`. **Флаги: 1-й поиск качает ~30МБ модель с HF (потом cache); мёрж-веса на глаз; индекс включает 15 API-страниц (можно исключить).**
- `a487a54`+`d8a5e31` — **Batch D переводы RU** (отдельный молер): механизм i18n через `$mol_locale` (Lang-тоггл EN↔RU видим+мобайл, персист, реактивно, контент по языку с EN-фолбэком). Переведено: все UI-строки + 17 прозаических страниц + лендинг; на EN-фолбэке 15 авто-API-страниц. **Сверка всех ссылок: внешние все 200, внутренние все резолвятся, 1 битая (rendering бенч `<url>`) починена.** audit green, Chrome-проверено RU↔EN. Гоча: не-en локали в папку модуля (не `-view.tree/`).
- **Деплой чинён** (`@main`) — gh-pages снова обновляется (прогоны success). Юзер видел старое ДО этих деплоев; ⌘K/поиск/переключатель на самом деле работают.
- `9a5190d`+`6bf4271` — **Batch F готово** (audit green, Chrome-проверено): (1) **дрейф `::before` ПОЧИНЕН** (`9a5190d`→`664953b`): `position:relative` на **`[mol_text_list]`** (не на пункт!) в docs-скоупе через `$mol_style_attach`. Первый заход был на пункт — но у пункта `overflow:auto` (дефолт $mol_view) клипал маркер, торчащий в левый gutter (юзер увидел 75% срезано); перенёс на список (`overflow:visible`) → маркер и не дрейфует, и не клипается. Проверено скроллом; (2) **ТГ `t.me/giper_dev`** в футер + About-дропдаун (curl 200); (3) **Lang → дропдаун-список** `$mol_pick` (English/Русский, data-driven `langs()`, галочка на активном, расширяемо; EN↔RU реактивно + персист). Флаги: подтвердились оба MAM keyed-binding бага (обойдены).
- **Batch G — полиш-фиксы по фидбеку** (все на проде): `4ef6959` скругление верхних углов поля поиска · `c4ffcc9` hero не вылезает на телефоне (2rem+break-word) + фичи спеллятся **MOL** (accent-первые-буквы) · `abaa5e0` вариант Димы: Minimalistic/Optimal/Lazy (МОЛ) · `c57c779` футер центрирован на широких экранах (был margin-top:auto only) · `b305ca8` **deep-link на заголовок**: `scroll-margin-top:5rem` на docs-заголовки (садились под 64px sticky-топбаром — фикс проверен в браузере, заголовок теперь под баром виден).
- ⏳ **Batch H — языковой паритет с Vue** (14 языков + en): ✅ **все 15 в селекторе** (`62fd6f9`), ✅ **UI-локали всех 15**, ✅ **Introduction на всех 15** (`c32e6fc`), ✅ **Getting Started на всех 15** (`bddefde`/`482e279`/`23bdb4a` добили ko/fr/de/pt/it/uk/pl/cs/fa/bn), ✅ **RTL для fa работает** (`dir=rtl` на app при lang==='fa', лейаут зеркалится, код остаётся LTR). Итого: **паритет 15/15 по Introduction + Getting Started**. **Пользователь выбрал полный паритет** → **Moler-langs3** переводит ВЕСЬ остальной контент (~30 стр × 13 языков) на 13 языков, коммит+пуш ПОСЛЕ КАЖДОЙ страницы (атомарно, чтобы обрыв терял максимум 1 стр). Порядок: Guide-главы → showcase/rosetta → plugins/meta/ghost/faq/team/releases → API. Долгий грайнд на несколько молер-циклов (self-heal: обрыв → подбираю + перезапускаю). Прогресс проверять: `ls content/<lang>/docs/*.md`. **Флаг: переводы LLM (машинные), нужно ревью носителей** (у Vue — community). Стрэй-правку фона app (`back`→`card`) от Moler-langs откатил.

## ОЧЕРЕДЬ задач (серийно — один активный билдер, чтобы не конфликтовать)
1. ✅ **Moler-fixes** (008c890 витрина / 71f739f RU+EN хинты / 49c3592 playground view.css.ts) — на проде, audit green. Витрина: живые ссылки (Bog Music/Blitz/VDO Rebalance/$hyoo_budget/$hyoo_talks/avatar/BuilderUI), vas3k+WikiLive убраны, Styler→BuilderUI, каталог→`#!section=demos` (3 места), хакатоны/коммерция. RU-хинты + фикс EN-тултипов темы (были на русском). Playground css.ts-таб. Флаг: `$mol_state_arg` live-hash обновляется не сразу на дебаунс (общее, не css; round-trip работает — вне скоупа).
2. ✅ **Content-фиксы** (`031f68d` meta-fix / `388ab01` Data Schemas) — на проде. meta.md: директивы сверены по build.node.ts (require/include/deploy/pack + «зачем»). Новая страница **Data Schemas** (`data-schema`, группа Data): `$mol_data`+`$mol_schema`, сверено по исходникам.
   _(было в очереди:)_ (а) `meta.md` — добавить директиву **`require`** (+`pack`): deploy=копирует файл в дист; require/include=включить модуль в зависимости даже если код не ссылается (use-case: каталог компонентов), require=код модуля ДО кода meta.tree-владельца, иначе include; pack=адрес удалённого репо подмодуля. (б) Новая страница про **бэк: `$mol_schema` + `$mol_data`** (валидация/типизация данных), в группу Data.
3. ⏳ **Грайнд переводов** (Moler-fixes, атомарные per-page коммиты, всё на проде, audit green). ✅✅ **ГРАЙНД ПЕРЕВОДОВ ЗАВЕРШЁН ПОЛНОСТЬЮ — 33 страницы × 13 языков** (18 прозы + 15 API), HEAD b7d6976, build+audit green. API-переводы = override-файлы `content/<lang>/docs/api-mol-*.md` (gen.cjs подхватывает; переведены Extends/описание/Properties/шапка таблицы/Access, имена/типы/код/URL — нет). Флаг: все переводы машинные (LLM), нужно ревью носителей (особ. fa RTL, bn).

✅ **DESLOP ЗАВЕРШЁН** (HEAD 3b1f590). Вердикт: контент уже был написан на настоящем doc-голосе (Vue/MDN-уровень) — grep по всему хайп-списку (powerful/seamless/robust/blazing/leverage/moreover/"in the world of"/"let's dive in" и т.д.) = 0 совпадений, ни эмодзи, ни восклицаний в прозе. Единственный реальный слоп — перебор тире: поправлено 5 абзацев (пары тире → скобки/запятые) в routing/data-schema/showcase/ghost. Технических неточностей не найдено.

🌙 **НОЧНОЙ ПРОГОН улучшений (2026-07-28), автономно WS3→WS4→WS5:**
- WS1 ✅ Код: подсветка view.tree/TS + Copy + Open-in-Playground (`71a402b`)
- WS2 ✅ SEO/соц: per-page meta + hreflang×15 + sitemap/robots/llms + og:image + $bog_seo (`12a8368`; shared bog `6aab751`)
- WS2b ✅ Path-routing: `$bog_builderui_router.activate('/smalljs/')` + 404.html + pathname canonical/sitemap (`61a68d2`). NB: нашли баг — no-arg `activate()` без dev-guard (задевает studio), обошли явным mount; рекомендация владельцу починить централизованно.
- WS3 ✅ Zed-редизайн (`3655396`). Сигнатура «hero = view.tree» (живое демо $bog_smalljs_demo + подсвеченный код → результат), EB Garamond weight 500 + трекинг −0.02em, mono-eyebrow'ы, акцент=цвета подсветки (blue/orange, per-lights AA), крисп-кнопки, hero-rise анимация + focus-visible + reduced-motion, docs active accent-bar. Обе темы проверены скриншотами. Moler-design упал до коммита — подобрал и закоммитил сам.
- WS4 🔧 Живые примеры + контент (Moler-live). Приоритет: inline-live-примеры в доке (view.tree→результат, переиспользуя demo/playground+подсветку) → feedback-виджет → self-host шрифтов → Lighthouse → (стретч) cookbook/enrich API.
- WS5 ⏳ Истории успеха (источник: mol.hyoo.ru «Истории успеха» xanlom_yimh6x)

Дизайн-скил: официальный **frontend-design** из `anthropics/skills` (`/plugin marketplace add anthropics/skills`), установлен юзером.

---
(архив) 🏁 **Ранее: перевод-паритет + deslop закрыты.** Сайт собран (все спринты 0b→6), пост-ревью полиш, 33 стр × 13 языков (+ru, +en = 15 локалей селектора; API через генераторный i18n), deslop. Осталось на усмотрение юзера: (1) ревью машинных переводов носителями (особ. fa RTL, bn); (2) опциональный ресинк переводов под desloped-EN (дифф минимальный — 5 абзацев). Self-heal при обрыве. Флаг: переводы LLM (машинные), нужно ревью носителей (особенно fa RTL, bn).
4. **Deslop-молер (ПОСЛЕДНИМ, после ВСЕХ переводов — явное указание юзера)**: убрать слоп-обороты, позаимствовать стиль реальной документации.

_Заметка: `landing.view.tree` hero пересобран в pre/accent/post-спаны (intentional) — не откатывать._

## Прогресс
| Спринт | Что | Статус |
|---|---|---|
| 0a | Vue-style shell | ✅ было до прогона |
| 0b | Top-nav дропдауны + mobile hamburger | ✅ commit 5e9357f → main. Десктоп-дропдауны проверены в Chrome (работают, Vue 1:1), переиспользован `$mol_pick`. Мобила: hamburger + `@media(max-width:47.9375rem)` в коде — на реальном устройстве НЕ проверено (screenshot-тул не отдаёт мобильный вьюпорт). |
| 1 | Foundation: система контента + Getting Started + Guide + llms.txt + базовый playground | ✅ **1A+1B готово** (fw контента, Getting Started, Guide 8 стр, llms.txt, пререндер-wiring, graceful coming-soon, почин nav-ссылок). commits fd46a56/ab057fd/e8c31683 → main, задеплоено. Осталось: базовый view.tree playground (⏳ запущен). Landing-копирайт не трогали (уже Vue-style, хороший). |
| 2 | Playground + TS в браузере | ✅ commit c190cb4 → main. Вкладки view.tree\|view.ts, `typescript.transpileModule` (lazy CDN), subclass-склейка, рабочий счётчик, шаринг обоих источников. audit green. |
| 3 | Семантический поиск (transformers.js) | ✅ commit 9c82264 → main — но **full-text**, не семантика. ⌘K-оверлей ожил, scored-поиск со сниппетами, клик→страница, `$mol_string/list/link/hotkey`. audit green. **Семантику (ONNX) сознательно отложил** (см. решение ниже) — full-text для 9 доков достаточно, семантика = риск/вес на будущее с готовым дизайном. |
| 4 | Курс (10–15 уроков) | ✅ commit e4815b7 → main. Платформа (инструкция\|редактор\|превью) = встроенный playground per-урок, 5 уроков (Hello→Views→State→Events→Routing), автопроверка (substring) + прогресс localStorage + Show solution. audit green. Осталось: доп.уроки + Giper Baza-урок (нужен baza-рантайм, scaffold --no-baza). |
| 5 | Showcase + Rosetta | ✅ commit c9a96a0 → main. Showcase-галерея реальных $mol-приложений + Rosetta-таблица React/Vue/Svelte→$mol (нейтральный tone, признание чужих сильных сторон). Docs→Examples подключён, 11 docs-страниц. audit green. Флаг: скриншотов нет, часть URL (Blitz/Styler/WikiLive/Bog Music) по описанию из памяти — сверь ссылки. |
| 6 | API reference автоген | ✅ commit f1ea618 → main. Build-time парсер `.view.tree.d.ts` 15 ядровых компонентов (extends, свойства read/rw+типы, под-компоненты) → API-страницы, sidebar-группа «API», GitHub-ссылки. Автоген (не ручное). audit green. Флаг: `$mol_view` пропущен (нет .view.tree, чисто-TS база); типы упрощены; только declared-свойства. |

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
- **Sprint 2 TS-компилятор с CDN** (jsdelivr typescript 5.4.5, ~8МБ lazy) — внешняя рантайм-зависимость. Выбор верный (sucrase не тянет `@$mol_mem`-декораторы), но если против CDN — перевендорить. view.tree-режим работает офлайн.
- **Курс: автопроверка = substring** в исходнике (простая, детерминированная), не rendered-output/type-check. Углубить — на будущее.
- **Giper Baza-урок** в курсе не сделан — нужен baza-рантайм (scaffold `--no-baza`). Отдельная работа.
- **Найден баг MAM-генератора**: последний keyed-биндинг на keyed-субкомпоненте не попадает в тип базового класса (TS2339). Молер обошёл (props с дефолтами + override). **Стоит завести баг в mam/mam_mol.**
- **Мобильный polish**: 0b hamburger, docs drawer, course-стек — CSS есть, но пиксельно НЕ проверены (screenshot-тул отдаёт ~1333px). Нужен проход на реальном телефоне + финальный mobile polish.
- Playground/курс видят только **whitelist** забандленных `$mol_*` компонентов — расширяется форс-референсом.
- **РЕШЕНИЕ на твоё ревью — семантический поиск НЕ реализован** (Sprint 3 = full-text). PLAN хотел in-browser LLM-поиск как одну из 3 больших фич. Отложил осознанно: корпус 9 доков (full-text уже релевантен), ONNX = 25МБ+ модель на 1-й поиск + `@xenova` в node на build склонен течь до OOM. **Дизайн готов** (pluggable `scored()` в `search.view.ts`: build-time — эмбеддер в gen.cjs, MiniLM-L6 384-dim, эмбеддинги 9 доков в статику ~3.5к float; рантайм — ленивый CDN @xenova + cosine + мёрж с full-text). Если хочешь семантику как тех-демо — скажи, поднимем быстро.

## Лог коммитов
- `5e9357f` — Sprint 0b: top-nav dropdowns + mobile hamburger nav (+ uncommitted 0a shell baseline, AGENTS/STATUS docs)
- `fd46a56` — Sprint 1A: docs content framework + Getting Started (content/ модуль, docs-роутинг page→md, sidebar/TOC/prev-next, mobile drawer, 5 страниц)
- `ab057fd` — Sprint 1A: llms.txt + пререндер/`.md`-эндпоинты в deploy.yml + STATUS-флаги. **origin/main = ab057fd, задеплоено.**
- ✅ Sprint 1B — Guide доведён: 8 страниц, 3 группы sidebar. Плюс: graceful «Coming soon» для ненаписанных страниц, почин целевых ссылок (hero-CTA, Docs-дропдаун desktop+mobile). Проверено в Chrome.
- `b820c34` — Guide финализирован: **9 глав** (+ Rendering: no-vDOM/виртуализация как арх-факт + бенч-ссылка без своих цифр; углублены Views/State/Routing до полных глав). API-точность проверена grep по mol/. next-цепочка: getting-started→installation→views→state→routing→rendering→data→giper-baza. **origin/main = b820c34, задеплоено, audit green.**
- `d0287f8` — базовый view.tree playground: **рантайм-компиляция** тем же тулчейном, что mam_build (`$mol_tree2_from_string`→`$mol_view_tree2_to_js`→…→eval в Proxy-`$`), редактор `$mol_textarea` с подсветкой, живой рендер, debounce 400мс, шаринг через URL-hash, graceful-ошибки. **origin/main = d0287f8, задеплоено, audit green. Sprint 1 Foundation ЗАКРЫТ.**
  - Флаги playground: (1) сниппеты видят только whitelist забандленных компонентов (`$mol_view/button/text/string/number/list/row/link/check/switch`) — расширяется добавлением в форс-референс; (2) без TS (Sprint 2) — статичные композиции + литеральные пропы; биндинги с TS-логикой рендерятся пусто; (3) длинный сниппет → длинный URL (Sprint 2: сжатие); (4) мобильный стек в CSS, пиксельно не проверен.
- ⏳ Sprint 2 — TS-в-браузере поверх playground (запущен).
