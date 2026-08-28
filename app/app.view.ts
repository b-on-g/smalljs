namespace $.$$ {

	/** Production origin the site is deployed to (canonical / OG URLs). */
	const prod_base = 'https://b-on-g.github.io/smalljs/'

	const site_name = '$mol'

	const default_description =
		'Documentation, playground, and interactive course for $mol — a reactive web framework with typed views, automatic reactivity, and no virtual DOM.'

	/** UI languages, in nav order. The `_` variants are app locale codes; the
	 *  hreflang attribute uses the BCP-47 form (zh_hk → zh-HK). */
	const meta_langs = [ 'en', 'ru', 'zh', 'zh_hk', 'ja', 'ko', 'fr', 'de', 'pt', 'it', 'uk', 'pl', 'cs', 'fa', 'bn' ]

	function hreflang_code( lang: string ) {
		return lang === 'zh_hk' ? 'zh-HK' : lang
	}

	export class $bog_smalljs_app extends $.$bog_smalljs_app {

		/** Path-based routing: clean `/smalljs/section=docs/page=views` URLs on the
		 *  deployed site, so every page is a distinct, crawlable URL for bots and
		 *  social unfurls. $bog_builderui_router is a drop-in $mol_state_arg.
		 *
		 *  We pass the explicit production mount `/smalljs/` rather than relying on
		 *  no-arg auto-detection: activate() then installs only when the current
		 *  pathname already starts with `/smalljs/` (its own guard). On the mam dev
		 *  server the path is `/bog/smalljs/app/-/test.html`, which does not — so this
		 *  is a clean no-op there and the standard hash router stays active, keeping
		 *  local dev (and its non-SPA file server) working unchanged.
		 *
		 *  $bog_smalljs_router is that router with one behaviour changed: a click
		 *  goes exactly where the link points, instead of dragging along keys of the
		 *  current address that the link never mentions. Without it `lesson`, `a` and
		 *  `b` leak out of the course and the comparison section into every address
		 *  after them. See the class for the full reasoning. */
		static {

			$bog_smalljs_router.activate( '/smalljs/' )

			/** Язык из адреса — до первого рендера.
			 *
			 *  Страница `/mol_locale=ru/…` приезжает статикой на русском, но
			 *  `$mol_locale.lang()` о ней ничего не знает: он читает localStorage и
			 *  язык браузера. Раньше адрес доезжал до локали отдельным проходом
			 *  ( `$mol_wire_async` из рендера — писать в чужую ячейку прямо из него
			 *  нельзя ), и читатель успевал увидеть английский текст поверх русской
			 *  статики. Сюда же запись попадает на загрузке модуля, когда рендера
			 *  ещё не было: первый проход сразу на нужном языке, прыгать нечему.
			 *
			 *  Роутер активирован строкой выше, поэтому `$mol_state_arg` уже читает
			 *  путь, а не только хеш. */
			const lang_asked = $mol_state_arg.value( 'mol_locale' )
			if( lang_asked ) $mol_state_local.value( 'locale', lang_asked )

			/** Focus that goes nowhere.
			 *
			 *  $mol tracks the focused element from a capture listener on `focus`,
			 *  and refreshes its cell only when that fires. Clicking blank space
			 *  moves the document's active element to <body> without raising
			 *  `focus` on anything, so nothing invalidates the cell and it keeps
			 *  naming whatever held focus before the click.
			 *
			 *  What that looks like here: type into either picker on the comparison
			 *  page, then click the background. The suggestion list stays open,
			 *  because $mol_search only shows it while `focused()` is true — and it
			 *  is still true. Clicking another field closes it, clicking nothing
			 *  does not.
			 *
			 *  `focusout` carries `relatedTarget`: the element about to take focus,
			 *  null when none will, which is exactly what the cell should hold. The
			 *  same fix is open upstream as hyoo-ru/mam_mol#877; once it lands this
			 *  listener notifies the cell with the value it already has and can go.
			 */
			const doc = $mol_dom_context.document
			doc?.addEventListener( 'focusout', ( event: Event ) => {
				const next = ( event as FocusEvent ).relatedTarget as HTMLElement | null
				$mol_view_selection.focused( $mol_maybe( next ), 'notify' )
			}, true )

		}

		section( next?: string ) {
			return $mol_state_arg.value( 'section', next ) ?? 'home'
		}

		/** Browser tab title. $mol_view writes the root's title() to document.title;
		 *  the default was the class name ("Root"). Mirror the per-page, per-language
		 *  meta title instead ("Views — $mol", "$mol — the reactive micromodule …"). */
		title() {
			return this.meta().title ?? super.title()
		}

		/** The two frameworks of a comparison, always alphabetical by id.
		 *
		 *  `a=react/b=vue` and `a=vue/b=react` are the same comparison, and a
		 *  search engine indexing both would split one page in two. So one order
		 *  is canonical, the address is corrected to it (see route_canonical),
		 *  and everything downstream — the page, the title, the canonical link —
		 *  reads the pair from here rather than from the raw args.
		 *
		 *  Null when only one side is named: `section=versus/a=react` is the
		 *  section front page with React already picked, not a comparison.
		 *
		 *  The comparison is by code unit, not by locale: framework ids are
		 *  lower-case ascii slugs, so no collation rule can reorder them and the
		 *  same URL is canonical in every language. */
		versus_pair(): readonly [ string, string ] | null {
			if( this.section() !== 'versus' ) return null
			const a = this.$.$mol_state_arg.value( 'a' ) || ''
			const b = this.$.$mol_state_arg.value( 'b' ) || ''
			if( !a || !b || a === b ) return null
			return a < b ? [ a, b ] : [ b, a ]
		}

		versus_a() {
			return this.versus_pair()?.[ 0 ] ?? ''
		}

		versus_b() {
			return this.versus_pair()?.[ 1 ] ?? ''
		}

		/** Keeps the address honest about which page is open.
		 *
		 *  Two corrections, both rewrites in place rather than navigations — the
		 *  user asked for this page, only its spelling changes, so there is no
		 *  extra entry to press Back through:
		 *
		 *  - a reversed pair (`a=vue/b=react`) is put back in canonical order;
		 *  - `a`/`b` are dropped outside the comparison section, where the
		 *    path router would otherwise carry them from link to link (it keeps
		 *    the keys a link does not mention) and leave `a=react` hanging in
		 *    the address of a documentation page.
		 *
		 *  This cell only decides what the address should say. The writing itself
		 *  happens in the action below, reached through $mol_wire_async so it
		 *  lands outside this memoized body: setting $mol_state_arg from inside
		 *  one is the invalidation loop $mol forbids. */
		@ $mol_mem
		route_canonical() {

			const arg = this.$.$mol_state_arg
			const a = arg.value( 'a' )
			const b = arg.value( 'b' )
			if( !a && !b ) return null

			let next_a = a
			let next_b = b

			if( this.section() !== 'versus' ) {
				next_a = null
				next_b = null
			} else if( a && b && a > b ) {
				next_a = b
				next_b = a
			}

			if( next_a === a && next_b === b ) return null

			$mol_wire_async( this ).route_rewrite( next_a, next_b )

			return null
		}

		/** Rewrites `a`/`b` in place — no history entry, because this corrects
		 *  the spelling of the address the reader already asked for. */
		@ $mol_action
		route_rewrite( a: string | null, b: string | null ) {
			const arg = this.$.$mol_state_arg
			arg.dict({ ... arg.dict(), a, b })
			return null
		}

		/** Ordered arg pairs describing the current screen ($mol hash-router state). */
		route_args(): [ string, string ][] {
			switch( this.section() ) {
				case 'docs': {
					const slug = this.$.$mol_state_arg.value( 'page' ) || $bog_smalljs_content.default_slug()
					return [ [ 'section', 'docs' ], [ 'page', slug ] ]
				}
				case 'playground': return [ [ 'section', 'playground' ] ]
				case 'course': return [ [ 'section', 'course' ] ]
				case 'versus': {
					const pair = this.versus_pair()
					if( !pair ) return [ [ 'section', 'versus' ] ]
					return [ [ 'section', 'versus' ], [ 'a', pair[ 0 ] ], [ 'b', pair[ 1 ] ] ]
				}
				default: return []
			}
		}

		/** Serialize arg pairs into a router pathname segment (`section=docs/page=views`),
		 *  matching exactly what $bog_builderui_router.make_link writes to the URL on
		 *  the deploy. Empty (home) → '', so `prod_base + route_path()` stays the bare
		 *  site root. */
		route_path( extra: [ string, string ][] = [] ) {
			const pairs = [ ... extra, ... this.route_args() ]
			return pairs.map( ( [ k, v ] )=> `${ k }=${ v }` ).join( '/' )
		}

		/** Per-page, per-language SEO/social metadata. Read by $bog_meta_attr →
		 *  `data-bog-meta` on the root, which the SEO prerenderer injects into
		 *  <head> as <title>/<meta>/<link> for bots and social unfurls. */
		meta(): $bog_meta_data {
			const lang = this.$.$mol_locale.lang()
			// Безъязыкий адрес страницы: канонический для английской версии и
			// один на весь hreflang-кластер как x-default.
			const bare = prod_base + this.route_path()

			// Каноническая ссылка обязана быть само-ссылающейся: страница
			// /mol_locale=ru/… указывает на себя. Иначе поисковик считает все
			// пятнадцать языков дублями английской версии, схлопывает кластер
			// на неё и языковые страницы в индекс просто не попадают — то есть
			// пререндер языков оказывается выброшенным впустую.
			const url_locale = this.$.$mol_state_arg.value( 'mol_locale' )
			const canonical = url_locale
				? prod_base + this.route_path( [ [ 'mol_locale', url_locale ] ] )
				: bare

			let title = `${ site_name } — the reactive micromodule framework`
			let description = default_description
			// Generic brand card by default; docs pages get a per-slug card below.
			let og_image = `${ prod_base }bog/smalljs/assets/og.png`

			switch( this.section() ) {
				case 'docs': {
					const slug = this.$.$mol_state_arg.value( 'page' ) || $bog_smalljs_content.default_slug()
					const page_title = $bog_smalljs_content.page_title( slug, lang ) ?? slug
					title = `${ page_title } — ${ site_name }`
					description = $bog_smalljs_content.page_summary( slug, lang ) ?? default_description
					og_image = `${ prod_base }bog/smalljs/assets/og/${ slug }.png`
					break
				}
				case 'playground':
					title = `Playground — ${ site_name }`
					description = 'Write $mol view.tree and TypeScript in the browser and see it render live — no install required.'
					break
				case 'course':
					title = `Interactive Course — ${ site_name }`
					description = 'Learn $mol step by step: reactive views, state, events, and routing, each in a live editor.'
					break
				case 'versus': {
					const pair = this.versus_pair()
					if( pair ) {
						// Names come from the data files, so the title says "$mol"
						// and "Vue.js" exactly as the framework spells itself.
						const left = this.Versus().framework_title( pair[ 0 ] )
						const right = this.Versus().framework_title( pair[ 1 ] )
						title = `${ left } vs ${ right } — ${ site_name }`
						description = `${ left } vs ${ right }: edge cases, code, weight and loading, speed, built-in features, ecosystem and cost of ownership. Every number carries the source it came from and the date it was measured.`
					} else {
						title = `Compare — ${ site_name }`
						description = 'Pick two frameworks and compare them on code, weight, speed, built-in features, ecosystem and cost of ownership — plus crash tests that run in your own browser.'
					}
					break
				}
			}

			const alternates = meta_langs.map( code => ( {
				lang: hreflang_code( code ),
				href: prod_base + this.route_path( [ [ 'mol_locale', code ] ] ),
			} ) )
			alternates.push( { lang: 'x-default', href: bare } )

			return {
				title,
				description,
				canonical,
				og_title: title,
				og_description: description,
				og_type: 'website',
				og_image,
				alternates,
			}
		}

		override attr() {
			return { ... super.attr(), ... $bog_meta_attr( this ) }
		}

		/** Keep <html lang> in step with the active UI language (a11y: screen readers
		 *  announce the right language; SEO: the shell no longer hard-codes one locale).
		 *  The static shell ships lang="en"; this reactively corrects it on switch. */
		@ $mol_mem
		lang_sync() {
			document.documentElement.lang = hreflang_code( this.$.$mol_locale.lang() )
			return null
		}

		/** URL argument key $mol_text uses for heading anchors on the docs page.
		 *  Search results deep-link to a section by writing it, exactly as the
		 *  right-hand table of contents does ($bog_smalljs_docs.toc_arg). The key
		 *  is derived from the text component's own id, so it has to be read off
		 *  that very instance rather than spelled out here. */
		docs_anchor_key() {
			return this.Docs().Body().param()
		}

		@ $mol_action
		open_search() {
			this.search_open( true )
			this.Search().focus()
			return null
		}

		@ $mol_action
		search_toggle() {
			if( this.search_open() ) this.search_open( false )
			else this.open_search()
			return null
		}

		// Global ⌘K / Ctrl+K opens the search overlay. Registered on window
		// (via the `auto` binding) rather than a $mol_hotkey plugin: when
		// nothing inside the app is focused the keydown targets <body>, which
		// never reaches a plugin bound to the app-root element. `event.code`
		// is layout-independent so it matches the physical K key.
		@ $mol_mem
		hotkeys() {
			const win = this.$.$mol_dom_context
			win.addEventListener( 'keydown', ( event: KeyboardEvent ) => {
				if( event.defaultPrevented ) return
				if( !( event.metaKey || event.ctrlKey ) ) return
				if( event.code !== 'KeyK' ) return
				event.preventDefault()
				this.open_search()
			} )
			return null
		}

		lights() {
			return this.Theme().is_light_now() ? 'light' : 'dark'
		}

		/** Right-to-left layout for RTL languages (currently Persian). */
		dir() {
			return this.$.$mol_locale.lang() === 'fa' ? 'rtl' : 'ltr'
		}

		body_content() {
			switch( this.section() ) {
				case 'docs': return [ this.Docs() ]
				case 'playground': return [ this.Playground() ]
				case 'course': return [ this.Course() ]
				// Both sides named — the comparison; one or none — the section
				// front page, with whatever was named already picked in a field.
				case 'versus': return this.versus_pair() ? [ this.Pair() ] : [ this.Versus() ]
				default: return [ this.Landing() ]
			}
		}

	}

}
