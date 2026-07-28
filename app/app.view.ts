namespace $.$$ {

	/** Production origin the site is deployed to (canonical / OG URLs). */
	const prod_base = 'https://b-on-g.github.io/smalljs/'

	const site_name = 'smalljs'

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
		 *  local dev (and its non-SPA file server) working unchanged. */
		static {
			$bog_builderui_router.activate( '/smalljs/' )
		}

		section( next?: string ) {
			return $mol_state_arg.value( 'section', next ) ?? 'home'
		}

		/** Browser tab title. $mol_view writes the root's title() to document.title;
		 *  the default was the class name ("Root"). Mirror the per-page, per-language
		 *  meta title instead ("Views — smalljs", "smalljs — the $mol reactive …"). */
		title() {
			return this.meta().title ?? super.title()
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
			const canonical = prod_base + this.route_path()

			let title = `${ site_name } — the $mol reactive framework`
			let description = default_description

			switch( this.section() ) {
				case 'docs': {
					const slug = this.$.$mol_state_arg.value( 'page' ) || $bog_smalljs_content.default_slug()
					const page_title = $bog_smalljs_content.page_title( slug, lang ) ?? slug
					title = `${ page_title } — ${ site_name }`
					description = $bog_smalljs_content.page_summary( slug, lang ) ?? default_description
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
			}

			const alternates = meta_langs.map( code => ( {
				lang: hreflang_code( code ),
				href: prod_base + this.route_path( [ [ 'mol_locale', code ] ] ),
			} ) )
			alternates.push( { lang: 'x-default', href: canonical } )

			return {
				title,
				description,
				canonical,
				og_title: title,
				og_description: description,
				og_type: 'website',
				og_image: `${ prod_base }bog/smalljs/assets/og.png`,
				alternates,
			}
		}

		override attr() {
			return { ... super.attr(), ... $bog_meta_attr( this ) }
		}

		/** Honor a `?mol_locale=<code>` URL param once on load, so shared
		 *  localized links (and hreflang alternates) select the right language. */
		locale_synced = false

		@ $mol_mem
		locale_sync() {
			if( this.locale_synced ) return null
			const want = this.$.$mol_state_arg.value( 'mol_locale' )
			if( !want ) return null
			this.locale_synced = true
			$mol_wire_async( this.$.$mol_locale ).lang( want )
			return null
		}

		/** Keep <html lang> in step with the active UI language (a11y: screen readers
		 *  announce the right language; SEO: the shell no longer hard-codes one locale).
		 *  The static shell ships lang="en"; this reactively corrects it on switch. */
		@ $mol_mem
		lang_sync() {
			document.documentElement.lang = hreflang_code( this.$.$mol_locale.lang() )
			return null
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
				default: return [ this.Landing() ]
			}
		}

	}

}
