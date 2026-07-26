namespace $.$$ {

	const Content = $bog_smalljs_content

	type Doc = { slug: string, title: string, text: string }

	export class $bog_smalljs_search extends $.$bog_smalljs_search {

		@ $mol_action
		close() { this.open( false ); return null }

		// Focus the input. Called from an action (never from a @$mol_mem —
		// focused() is a reactive setter, and writing another cell inside a
		// mem freezes this component's rendering). $mol defers the actual
		// DOM .focus() a tick, so it lands after the overlay is shown.
		@ $mol_action
		focus() {
			this.Field().focused( true )
			return null
		}

		// Navigate to a doc page. Explicit arg writes (not the link's own
		// href) so a result ALWAYS lands on its page — even when it targets
		// the page you are already on. $mol_link would otherwise treat a
		// "current" link as a toggle and strip the args, bouncing you home.
		@ $mol_action
		go( slug: string ) {
			const arg = this.$.$mol_state_arg
			arg.value( 'section', 'docs' )
			arg.value( 'page', slug )
			this.open( false )
			return null
		}

		@ $mol_action
		pick( slug: string, event?: Event ) {
			event?.preventDefault() // stop $mol_link's toggle navigation
			this.go( slug )
			return null
		}

		// Enter activates the highlighted result (or the first one).
		@ $mol_action
		activate( event?: unknown ) {
			const ids = this.result_ids()
			if( !ids.length ) return null
			this.go( ids[ this.active() ] )
			return null
		}

		// --- Highlighted result (keyboard ↑/↓) ---------------------------
		// Keyed by the current result set so a new query resets to the top,
		// while stays reactive so the highlight re-renders on every move.
		@ $mol_mem_key
		active_at( _key: string, next?: number ) {
			return next ?? 0
		}

		active( next?: number ) {
			return this.active_at( this.result_ids().join( '|' ), next )
		}

		@ $mol_action
		select_next( event?: KeyboardEvent ) {
			event?.preventDefault()
			const n = this.result_ids().length
			if( !n ) return null
			this.active( Math.min( n - 1, this.active() + 1 ) )
			return null
		}

		@ $mol_action
		select_prev( event?: KeyboardEvent ) {
			event?.preventDefault()
			const n = this.result_ids().length
			if( !n ) return null
			this.active( Math.max( 0, this.active() - 1 ) )
			return null
		}

		result_current( slug: string ) {
			const ids = this.result_ids()
			return ids[ this.active() ] === slug
		}

		// All doc pages as a flat search corpus.
		corpus(): readonly Doc[] {
			const seen = new Set< string >()
			const docs = [] as Doc[]
			for( const section of Content.sections() ) {
				for( const group of section.groups ) {
					for( const slug of group.pages ) {
						if( seen.has( slug ) ) continue
						seen.add( slug )
						const page = Content.page( slug )
						if( page ) docs.push( { slug, title: page.title, text: page.md } )
					}
				}
			}
			return docs
		}

		// Full-text scored ranking (works instantly, offline).
		@ $mol_mem
		scored() {
			const query = this.query().trim().toLowerCase()
			if( !query ) return [] as { doc: Doc, score: number }[]
			const terms = query.split( /\s+/ ).filter( Boolean )
			return this.corpus()
				.map( doc => {
					const title = doc.title.toLowerCase()
					const text = doc.text.toLowerCase()
					let score = 0
					for( const term of terms ) {
						if( title.includes( term ) ) score += 10
						let idx = text.indexOf( term ), count = 0
						while( idx >= 0 ) { count++; idx = text.indexOf( term, idx + term.length ) }
						score += count
					}
					return { doc, score }
				} )
				.filter( row => row.score > 0 )
				.sort( ( a, b ) => b.score - a.score )
				.slice( 0, 8 )
		}

		hint_text() {
			const query = this.query().trim()
			if( !query ) return 'Type to search the documentation.'
			const n = this.scored().length
			return n ? `${ n } result${ n > 1 ? 's' : '' } — ↑↓ to move, Enter to open` : 'No matches.'
		}

		result_ids() {
			return this.scored().map( row => row.doc.slug )
		}

		result_rows() {
			return this.result_ids().map( slug => this.Result( slug ) )
		}

		result_arg( slug: string ) {
			return { section: 'docs', page: slug }
		}

		result_title( slug: string ) {
			return Content.page( slug )?.title ?? slug
		}

		result_snippet( slug: string ) {
			const md = ( Content.page( slug )?.md ?? '' )
				.replace( /```[\s\S]*?```/g, ' ' )
				.replace( /[#`*>]/g, ' ' )
				.replace( /\s+/g, ' ' )
				.trim()
			const term = this.query().trim().toLowerCase().split( /\s+/ )[ 0 ] ?? ''
			const at = md.toLowerCase().indexOf( term )
			if( at < 0 ) return md.slice( 0, 130 ) + '…'
			const start = Math.max( 0, at - 40 )
			return ( start > 0 ? '…' : '' ) + md.slice( start, start + 150 ).trim() + '…'
		}

	}

}
