# smalljs — План сайта документации $mol

Рабочее название модуля: `bog/smalljs`. Финальное имя/домен под вопросом ( см. «Открытые вопросы» ).

Цель: Vue-style сайт с документацией для $mol/$hyoo. По плану `mol-growth` закрывает **Этап 1** ( убрать барьер входа ) и подводит к **Этапу 2** ( инкрементальная адаптируемость ).

Главный критерий каждого решения: снижает ли барьер входа и враждебность к проекту. Не «правда vs неправда», а «попробовал за 15 минут или ушёл».

## Базовый процесс копирования vuejs.org

Структуру / разделы / порядок / тон берём с **vuejs.org** как референс. Своё придумываем только там, где у Vue нет аналога ( например, наш playground под view.tree, наш курс ).

**Правило:** перед каждым «вырезаем X» / «не делаем Y из Vue» / «упрощаем Z» — **обязательно спросить пользователя**. Не решать в одиночку, что Vue-блок не нужен. Решает пользователь, я только показываю что у Vue есть и предлагаю варианты.

---

## Скоуп

### Блок A. Foundation ( MVP, без этого нет смысла запускать )
1. **Landing** — английский, 1 экран. Что такое $mol, для кого, главный CTA «попробовать в песочнице».
2. **Getting Started** — лендинг → Hello World за **< 15 мин**, английский. Пошагово, не лонгрид про идеи. Самая окупаемая инвестиция ( урок Vue/Svelte ).
3. **Guide** — структурированный progression: install → views → state → routing → data → giper baza. 5–7 страниц.
4. **API reference** — авто-генерация из `.view.tree` + TS-типов. Аналог Vue API.
5. **Playground / REPL** — `view.tree` редактируется и рендерится в браузере без установки MAM. Базис для курса и для шаринга примеров.
6. **AI-friendly формат** — `llms.txt` в корне + `.md`-версия каждой страницы доступна по URL ( `/guide/views.md` ). Чтобы Claude/Cursor цитировали доку.

### Блок B. Большие фичи ( после foundation, можно параллелить )
7. **Семантический поиск на маленькой LLM в браузере**
   - Embed-модель ONNX через `transformers.js` ( кандидат: `all-MiniLM-L6-v2` ~25 MB, или поменьше типа `bge-micro` )
   - Индекс эмбеддингов строится на build-time, лежит статикой
   - Векторный поиск ( cosine ) полностью клиентский, без сервера
   - UI поиска поверх обычного full-text fallback ( пока модель грузится )
8. **Мини онлайн-курс с TS в браузере**
   - TS-компилятор: `sucrase` для скорости, либо `typescript.js` бандл для точности диагностики ( решить на прототипе )
   - Прогрессия: Hello World → state → события → роутинг → Giper Baza
   - 10–15 уроков, автопроверка через сравнение output / type-check
   - Прогресс юзера в localStorage, шаринг через URL hash

### Блок C. Proof & Showcase
9. **Showcase реальных приложений** — vas3k.club, blitz, styler, wiki, bog/vk, mam, view-tree-lsp. Скриншоты + ссылка + 1–2 предложения про роль $mol.
10. **Rosetta-таблица** — «React component → $mol», «Vue ref → $mol_mem», «Svelte store → $mol_wire». Нейтрально, с признанием сильных сторон чужих решений ( pre-publish tone check ).

Про перф: отдельной страницы / бенч-репо НЕ делаем ( у Vue тоже нет ). Виртуализация упоминается одним абзацем в guide про рендеринг — архитектурный факт + ссылка на форк js-framework-benchmark с результатами $mol: `https://nin-jin.github.io/js-framework-benchmark/webdriver-ts-results/table.html`.

### Блок D. Polish ( после )
11. Темизация ( light / dark, как у Vue ).
12. Версионирование доки — отложить, пока не нужно.
13. i18n — **EN-first**, RU по остаточному принципу. Не RU-first, иначе застрянем в нише.
14. Changelog / блог — отложить.
15. Discord / Telegram ссылки в footer.

---

## Архитектура

- **Сайт** — `$mol`-app в `bog/smalljs/`, scaffold через `npm create view-tree-lsp@latest bog/smalljs`.
- **Контент** — markdown файлы в `bog/smalljs/content/<lang>/<section>/...`. Парсятся в рантайме / пререндерятся на build.
- **Билд** — `$mol_build` + prerender для SEO ( статический HTML + гидрация ). Это критично: Vue хорошо ранжируется именно за prerender.
- **Хостинг** — GitHub Pages, без custom domain. URL `https://hyoo-ru.github.io/smalljs/` ( или где разместим репо ).
- **Embed-модели и WASM** — статикой рядом, ленивая загрузка только при первом запросе поиска. Без `crossOriginIsolated` ( gh pages не даёт нужные headers ), значит SharedArrayBuffer-зависимые модели исключены — `@xenova/transformers` стандартный режим OK.

---

## Этапы / приоритет

Не перепрыгивать. Без блока A не запускать ничего публично.

### Sprint 0a. Vue-style structural shell ( ~1 неделя )
- ✅ `npm create view-tree-lsp@latest bog/smalljs -- --no-baza --no-tauri --no-docker`
- ✅ Темизация ( light/dark, `$bog_theme_auto` из scaffold )
- ✅ git init + `git remote add origin git@github.com:b-on-g/smalljs.git`
- Top bar **точно как vuejs.org** ( Logo · Search-placeholder · 8 dropdown-кнопок · Lang · Theme · GitHub icon ). Без Twitter и Discord ( в social и в dropdowns ).
- Landing layout: Hero + Features 3-col + Sponsors-placeholder + многоколоночный Footer ( все content — stub )
- Docs layout: 3 колонки ( left sidebar collapsible / main / right TOC ), bottom edit-on-github + prev/next — всё stub
- Routing по top-nav секциям через `$mol_state_arg`
- Markdown renderer: $mol_text встроен, готов; `marked` ( npm ) — добавляем когда понадобится

### Sprint 0b. Наполнение top-nav dropdown-ов ( ~1 неделя )
Mapping наших разделов в Vue-структуру ( следуем буквально ):
- **Docs dropdown**: Quick Start · Guide · Tutorial ( = наш Course ) · Examples ( = наш Showcase ) · API · Glossary · Error Reference · Migration. Course и Showcase **внутри Docs**, не отдельные top-level — это Vue-way.
- **Playground**: отдельный top-level link
- **Ecosystem dropdown**: наши Themes · UI Components ( $mol catalog ) · Plugins · Jobs ( опционально )
- **Official Libraries dropdown**: $mol_wire · Giper Baza · $hyoo_crowd · $mol_router
- **Video Courses dropdown**: наш встроенный курс + внешние если появятся
- **Help dropdown**: GitHub Discussions · DEV Community ( без Discord )
- **News dropdown**: Blog · Events · Newsletters ( без Twitter )
- **About dropdown**: FAQ · Team · Releases · Code of Conduct · Privacy

Этап 0b чисто content/links, без architectural work.

### Sprint 1. Foundation content ( 2–3 недели ) — закрывает Этап 1 mol-growth
- Английский Getting Started ( измерять медиану «лендинг → Hello World» на юзер-тесте, цель < 15 мин )
- Guide ( 5–7 страниц )
- `llms.txt` + `.md`-endpoint для каждой страницы
- Landing
- Playground для view.tree ( базовый, без TS — пока только дерево → DOM )

### Sprint 2. Playground + TS in browser ( 2–3 недели )
- TS-компиляция в браузере
- view.tree → TS код → запуск
- Сохранение состояния в URL hash, шаринг
- Это база для курса

### Sprint 3. Семантический поиск ( 2 недели )
- Подбор embed-модели ( размер vs качество )
- Build-time индексирование контента
- Клиентский векторный поиск
- UI с fallback на full-text

### Sprint 4. Курс ( 3–4 недели )
- Платформа: главы, прогресс, задания, автопроверка
- 10–15 уроков
- Использует Playground из Sprint 2

### Sprint 5. Showcase ( 1 неделя )
- Showcase галерея
- Rosetta-таблица

### Sprint 6. API reference автоген ( 1–2 недели )
- Парсер `.view.tree` + извлечение TS-типов
- Генератор страниц API

Параллелизация: A → ( B можно разбивать по людям ) → C. Sprint 0–1 строго последовательно.

---

## Стек ( кандидаты, не финальный )

- Фронт: `$mol`
- Markdown: `marked` либо своё через `$mol`-парсер
- TS в браузере: `sucrase` ( быстро ) или `typescript` bundle ( диагностика )
- Embeddings: `@xenova/transformers` ( ONNX runtime )
- Вектор-поиск: своя cosine-similarity in-memory, либо `voy-search` ( WASM, mini-HNSW )
- Prerender: `$mol_build`
- Hosting: GitHub Pages + custom domain ( cf-pages если headers нужны )

---

## Tone gates ( прогонять на КАЖДУЮ страницу перед публикацией )

Из `mol-growth` pre-publish tone check:
- [ ] Без атак, сарказма, принижения конкурентов / людей
- [ ] Польза читателя, а не правота автора
- [ ] Перф-заявления — только с воспроизводимым репо ( или вообще без перф-заявлений )
- [ ] Понятно человеку, который $mol не знает
- [ ] Без «мы лучше всех» — конкретная выгода в конкретном случае
- [ ] Один ясный CTA на страницу

Дополнительно — **процесс копирования vuejs.org**:
- [ ] При удалении / упрощении любого Vue-блока — согласовано с пользователем

---

## Решённые вопросы

- **Имя**: `smalljs` финальное, просто красивый URL, ничего личного. Не лепим «small bundle» на лендинг как фичу.
- **Co-евангелисты**: на самом сайте имён людей нет. ( Со-евангелисты — отдельная история уровня mol-growth Этап 0, для соцсетей / Хабра, не для этого репо ).
- **Перф-страница / бенч-репо**: НЕ делаем. У Vue нет — у нас тоже нет. Виртуализация упоминается одним абзацем в guide про рендеринг.
- **Курс**: копируем структуру / прогрессию tutorial с vuejs.org, режем то, что нам неактуально. Перед каждой ампутацией — спросить пользователя.
- **Домен**: не нужен. Хостимся на GitHub Pages.
- **Перф-абзац в guide**: пишем про виртуализацию как архитектурный факт + ссылка на форк js-framework-benchmark ( `nin-jin.github.io/js-framework-benchmark/webdriver-ts-results/table.html` ) как воспроизводимый источник цифр. Это закрывает требование «перф только с репо».
- **Top-nav секции**: берём ровно как vuejs.org, ничего не режем, КРОМЕ Twitter и Discord ( убраны везде — и в social-icons, и в dropdown-ах Help/News ). Single social icon = GitHub.
- **Course и Showcase в навигации**: внутри Docs dropdown как Tutorial и Examples ( Vue-way ), не отдельные top-level.
- **Language selector**: остаётся ( EN-first как default, RU и др. — по мере появления переводов ).
- **Поиск в top bar**: placeholder в shell, реальная реализация — Sprint 3 ( семантический поиск на LLM в браузере ).

---

## Связанные референсы

- `~/.claude/skills/mol-growth/SKILL.md` — стратегия и tone rules
- `~/.claude/skills/mol-growth/references/vue-playbook.md` — что копируем у Vue
- `bog/mol/references/MOL_QUICK_START.md` — `$mol` essentials
- `bog/mol/references/MOL_POSITioning.md` — как сравнивать без атак
