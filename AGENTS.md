# smalljs — Agent handoff

Vue-style сайт документации для $mol. MAM-модуль в `bog/smalljs/`. Отдельный git-репо ( origin: `git@github.com:b-on-g/smalljs.git`, ветка `main` ). Дев сервер: `http://localhost:9080/bog/smalljs/app/-/test.html`. Build: `npx mam bog/smalljs` ( из корня mam ). Audit: `cat bog/smalljs/-/web.audit.js`.

Перед работой обязательно прочти **`PLAN.md`** ( основной план разработки ) и **`~/.claude/skills/mol-growth/SKILL.md`** ( правила тона и стратегии ).

## Структура модулей

| Папка | Компонент | Назначение |
|---|---|---|
| `app/` | `$bog_smalljs_app` | Root композит: top + body switcher по `section?`, plugins ( theme ) |
| `top/` | `$bog_smalljs_top` | Top nav Vue-style: Logo · Search · 5 dropdown · Lang · Theme · GitHub |
| `landing/` | `$bog_smalljs_landing` | Главная: Hero · Sponsor banner · Features · Sponsors · Footer |
| `docs/` | `$bog_smalljs_docs` | 3-col layout: sidebar · main · TOC ( пока stub ) |
| `playground/` | `$bog_smalljs_playground` | Заглушка для Sprint 2 |
| `structure/` | `$bog_smalljs_structure` | Дерево проекта с «?» на каждой строке. Разбирает обычный ASCII-листинг, поэтому в доках листинг лежит в markdown (фенс ```structure), на главной и в песочнице дерево собирается кодом |

Каждый подмодуль — отдельная папка с `.view.tree`, `.view.ts`, `.view.css.ts`. `Theme` плагин ( `$bog_theme_auto` ) живёт на root в `app/app.view.tree`, прокинут в Top через `Theme <= Theme`.

## BuilderUI ( цвета, шрифты, темизация )

Проект использует `bog/builderui` ( shadcn-like ) вместо стандартного `$mol_theme`.

- `$bog_smalljs_app` extends `$bog_builderui_div`
- Атрибуты палитры в `app.view.tree`: `bog_builderui_base \zinc`, `bog_builderui_theme \sky`, `bog_builderui_chart \yellow`, `bog_builderui_radius \medium`, `bog_builderui_font_body \inter`, `bog_builderui_font_head \eb-garamond`
- В CSS используй `$bog_builderui_tokens.back/card/field/text/shade/line/hover/focus/control/current/special`, НЕ `$mol_theme.*`
- Хардкод цветов запрещён — только токены

`theme.css` подключён через `app.meta.tree`: `include \/bog/builderui/theme.css`.

## Темизация ( light / dark switch )

`$bog_theme_auto` ставит `mol_theme` атрибут на app. BuilderUI читает `bog_builderui_lights`. Связь сделана в `app/app.view.ts`:

```ts
lights() {
    return this.Theme().is_light_now() ? 'light' : 'dark'
}
```

В `app.view.tree`: `bog_builderui_lights <= lights`. Так клик по sun/moon/system в `$bog_theme_switch` меняет `is_light_now` → `lights` пересчитывается → `bog_builderui_lights` обновляется → все CSS-vars builderui переключаются.

## Scroll-контейнер

`$bog_smalljs_app` сам — scroll-контейнер ( `height: 100vh; overflow: { y: auto }` ). Body не скроллится, app покрыт своим фоном целиком. Top bar внутри app со `sticky position`. **Не возвращай костыли** через `$mol_style_attach` на html/body — это пройденный этап.

## Vue.org match — текущее состояние

Sprint 0a closed. Структурно lendng 1:1 с vuejs.org минус ампутации:
- **Удалено везде**: Twitter и Discord ( в social-icons и в Help/News dropdowns )
- **Sponsors section**: Platinum Sponsors с 3 placeholder-карточками
- **Sponsor banner**: тонкая полоса с border-top/bottom внутри Hero
- **Footer**: 4 колонки ( Docs+About / Support+Resources / Video Courses+Help+News / Official Libraries ) + MIT License + Copyright
- **Top nav**: 5 dropdown ( Docs · Playground · Ecosystem · About · Support ) с chevron-down иконкой
- **Hero CTAs**: 4 стиля как у Vue ( ▶ Why $mol filled / Get Started → secondary / Install / Try Playground ⎘ outlined )
- **Hero title**: 76px / weight 900 / EB Garamond, accent span «micromodule» в `$bog_builderui_tokens.special`
- **Features**: ::first-letter pseudo-class в accent-цвете ( V·U·E )

Контент почти всех ссылок — stub ( navigate by section/page args, целевые страницы ещё не построены ). Это Sprint 0b.

## Правило копирования vuejs.org

**Любое отклонение от vuejs.org обсуждается с пользователем перед удалением.** Не подменяй Vue-блок «привычным $mol-паттерном» ( например, не используй `$mol_book2_catalog` вместо собственного Vue-style top-nav + sidebar ). При сомнении — открой `https://vuejs.org` через chrome-extension и сверь буквально.

## Sprint roadmap ( из PLAN.md )

- ✅ Sprint 0a — Vue-style structural shell
- ⏳ Sprint 0b — наполнение dropdown-ов содержимым ссылок ( Docs / Ecosystem / About / Support / Help / News )
- Sprint 1 — Foundation content ( English Getting Started < 15 мин · Guide · llms.txt + .md endpoints · Landing copy · базовый Playground для view.tree без TS )
- Sprint 2 — Playground + TS in browser
- Sprint 3 — Семантический поиск ( `transformers.js`, in-browser, build-time index )
- Sprint 4 — Курс ( 10–15 уроков, использует Playground )
- Sprint 5 — Showcase ( галерея + Rosetta react/vue ↔ $mol )
- Sprint 6 — API reference автоген из `.view.tree` + TS-типов

## Build / Deploy

- Build из корня mam: `npx mam bog/smalljs` ( таймер 2 мин )
- Audit обязательно: `cat bog/smalljs/-/web.audit.js` ( green = passed )
- Деплой: GitHub Pages через `.github/workflows/deploy.yml` ( scaffold-default )
- Без custom-domain ( решено: `https://b-on-g.github.io/smalljs/` )
- Без Tauri, Giper Baza, Docker ( scaffold с `--no-baza --no-tauri --no-docker` )

## Gotchas / tech debt

- **Commit messages — ВСЕГДА у пользователя спрашивать** ( правило MEMORY.md, нарушал уже несколько раз — не повтори ). Не лепить `Co-Authored-By: Claude`.
- **Inline view.tree syntax не работает**: `<= X $cls title @ \Y arg * key \V` парсится как одна строка для title. Всегда отступы для multi-prop узлов.
- **`width: 1` ❌** в border-spec → нужна Length-строка `width: '1px'` или `rem(0.0625)`. TS2322.
- **`::first-letter` работает** в css.ts через ключ `'::first-letter': { ... }`, но ТОЛЬКО на `display: block` элементах ( $mol_view default flex → надо явно override )
- **`color: 'transparent'` + `WebkitBackgroundClip: 'text'`** — НЕ поддерживается `$mol_style_prop` ( ругается Unknown CSS Property ). Если нужен gradient text — через `$mol_style_attach` raw CSS, не через style_define
- **Lights binding**: если меняешь plugin Theme или переезжаешь Theme в другое место — обнови `lights()` в `app.view.ts`, иначе тема перестанет реагировать
- **Сгенерированный `app.locale=ru.json`** — пустой `{}`. По плану EN-first, RU добавляется по мере перевода

## Связанное

- План: [PLAN.md](./PLAN.md)
- mol-growth playbook: `~/.claude/skills/mol-growth/SKILL.md`
- BuilderUI референс: `bog/builderui/theme.css`, `bog/builderui/tokens/tokens.ts`, `bog/builderui/studio/` ( demo с переключателями )
- Vue референс ( буквально копируем ): `https://vuejs.org/`
- Бенчмарк-форк для перф-абзаца в guide: `https://nin-jin.github.io/js-framework-benchmark/webdriver-ts-results/table.html`
