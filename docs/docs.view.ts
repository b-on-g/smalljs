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

		page_md() {
			const page = this.current()
			if( !page ) return `# Not found\n\nThere is no page \`${ this.page() }\`.`
			return page.md
		}

		title_text() {
			return this.current()?.title ?? 'Docs'
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
			return $bog_smalljs_content.page( slug )?.title ?? slug
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
			return $bog_smalljs_content.page( this.prev_slug() )?.title ?? ''
		}

		next_title() {
			return $bog_smalljs_content.page( this.next_slug() )?.title ?? ''
		}

		nav_links() {
			const links = [] as $mol_view[]
			if( this.prev_slug() ) links.push( this.Prev() )
			if( this.next_slug() ) links.push( this.Next() )
			return links
		}

	}

}
