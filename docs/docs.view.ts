namespace $.$$ {

	const section = 'docs'

	export class $bog_smalljs_docs extends $.$bog_smalljs_docs {

		/** Current page slug, mirrored to the `page` URL argument. */
		page( next?: string ) {
			return this.$.$mol_state_arg.value( 'page', next ) ?? $bog_smalljs_content.default_slug()
		}

		current() {
			return $bog_smalljs_content.page( this.page() )
		}

		/** Active UI language; reading it makes the page reactive to switches. */
		lang() {
			return this.$.$mol_locale.lang()
		}

		page_md() {
			const md = $bog_smalljs_content.page_md( this.page(), this.lang() )
			if( md ) return md
			// Unbuilt page — degrade gracefully instead of a bare error.
			return [
				`# Coming soon`,
				``,
				`This page hasn't been written yet — the docs are a work in progress.`,
				``,
				`In the meantime, start with **[Getting Started](#!section=docs/page=getting-started)**`,
				`or read the [Introduction](#!section=docs/page=introduction).`,
			].join( '\n' )
		}

		title_text() {
			return $bog_smalljs_content.page_title( this.page(), this.lang() ) ?? 'Coming soon'
		}

		edit_uri() {
			const page = this.current()
			if( !page ) return 'https://github.com/b-on-g/smalljs'
			return `https://github.com/b-on-g/smalljs/edit/main/${ page.file }`
		}

		// --- Mobile drawer ------------------------------------------------

		@ $mol_action
		menu_toggle() {
			this.sidebar_open( !this.sidebar_open() )
		}

		@ $mol_action
		nav_click() {
			this.sidebar_open( false )
			return null
		}

		// --- "Was this helpful?" ------------------------------------------
		// Local-only UX affordance: the choice is remembered per page in
		// localStorage (so we don't re-ask), but nothing is sent anywhere — this is
		// a placeholder hook for a future feedback backend.

		feedback_value( next?: string ) {
			return this.$.$mol_state_local.value( `smalljs/feedback/${ this.page() }`, next ) ?? ''
		}

		@ $mol_action
		feedback_yes() { this.feedback_value( 'yes' ); return null }

		@ $mol_action
		feedback_no() { this.feedback_value( 'no' ); return null }

		feedback_content() {
			if( this.feedback_value() ) return [ this.Feedback_thanks() ] as readonly $mol_view[]
			return [ this.Feedback_prompt(), this.Feedback_yes(), this.Feedback_no() ] as readonly $mol_view[]
		}

		// --- Sidebar ------------------------------------------------------

		groups_data() {
			return $bog_smalljs_content.sections().find( s => s.id === section )?.groups ?? []
		}

		sidebar_groups() {
			return this.groups_data().map( ( _, index ) => this.Group( index ) )
		}

		group_title_text( index: number ) {
			return this.groups_data()[ index ].title
		}

		group_content( index: number ) {
			const group = this.groups_data()[ index ]
			return [
				this.Group_title( index ),
				...group.pages.map( slug => this.Link( slug ) ),
			] as readonly $mol_view[]
		}

		link_title( slug: string ) {
			return $bog_smalljs_content.page_title( slug, this.lang() ) ?? slug
		}

		link_arg( slug: string ) {
			return { section, page: slug }
		}

		// --- Table of contents (headings of the current page) -------------

		toc_data() {
			const items = [] as { level: number, text: string }[]
			let in_code = false
			for( const line of this.page_md().split( '\n' ) ) {
				if( /^```/.test( line ) ) { in_code = !in_code; continue }
				if( in_code ) continue
				const match = /^(#{2,3})\s+(.+?)\s*$/.exec( line )
				if( match ) items.push( { level: match[ 1 ].length, text: match[ 2 ] } )
			}
			return items
		}

		toc_links() {
			return this.toc_data().map( ( _, index ) => this.Toc_link( index ) )
		}

		toc_text( index: number ) {
			return this.toc_data()[ index ].text
		}

		/**
		 * Reuse $mol_text's own anchor mechanism: each heading renders a link
		 * whose arg key is the text component's `param`. Setting that arg makes
		 * the matching header `current`, and $mol_text auto-scrolls to it.
		 */
		toc_arg( index: number ) {
			return { [ this.Body().param() ]: this.toc_data()[ index ].text }
		}

		// --- Prev / next --------------------------------------------------

		order() {
			return $bog_smalljs_content.order( section )
		}

		nav_index() {
			return this.order().indexOf( this.page() )
		}

		prev_slug() {
			const index = this.nav_index()
			return index > 0 ? this.order()[ index - 1 ] : ''
		}

		next_slug() {
			const index = this.nav_index()
			const order = this.order()
			return index >= 0 && index < order.length - 1 ? order[ index + 1 ] : ''
		}

		prev_arg() {
			return { section, page: this.prev_slug() }
		}

		next_arg() {
			return { section, page: this.next_slug() }
		}

		prev_title() {
			return $bog_smalljs_content.page_title( this.prev_slug(), this.lang() ) ?? ''
		}

		next_title() {
			return $bog_smalljs_content.page_title( this.next_slug(), this.lang() ) ?? ''
		}

		nav_links() {
			const links = [] as $mol_view[]
			if( this.prev_slug() ) links.push( this.Prev() )
			if( this.next_slug() ) links.push( this.Next() )
			return links
		}

	}

}
