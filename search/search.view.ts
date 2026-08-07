namespace $.$$ {

	const Content = $bog_smalljs_content

	// In-browser embedder, same model as the build-time index. Loaded lazily
	// via $mol_import.module so the ~30MB model is only fetched on first use.
	const SEMANTIC_CDN = 'https://esm.sh/@xenova/transformers@2.17.2'

	// One searchable page. All four haystacks are pre-lowercased: the corpus is
	// rebuilt only when the language changes, so matching stays a plain
	// substring scan on every keystroke. `*_en` holds the English original —
	// see corpus() for why it is kept alongside the translation.
	type Doc = {
		slug: string,
		title: string,
		text: string,
		title_en: string,
		text_en: string,
	}

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

		/** Active UI language; reading it makes search reactive to switches. */
		lang() {
			return this.$.$mol_locale.lang()
		}

		// All doc pages as a flat search corpus, in the current UI language.
		// Both the translation and the English original are kept, because on a
		// non-English locale people still type English terms ("routing", "mem")
		// and those have to keep matching. On English — or on a page with no
		// translation — page_md/page_title return the very same strings, so the
		// two halves share one lowercased copy and are scored once.
		@ $mol_mem
		corpus(): readonly Doc[] {
			const lang = this.lang()
			const seen = new Set< string >()
			const docs = [] as Doc[]
			for( const section of Content.sections() ) {
				for( const group of section.groups ) {
					for( const slug of group.pages ) {
						if( seen.has( slug ) ) continue
						seen.add( slug )
						const page = Content.page( slug )
						if( !page ) continue
						const title = Content.page_title( slug, lang ) ?? page.title
						const md = Content.page_md( slug, lang ) ?? page.md
						const title_low = title.toLowerCase()
						const text_low = md.toLowerCase()
						docs.push( {
							slug,
							title: title_low,
							text: text_low,
							title_en: title === page.title ? title_low : page.title.toLowerCase(),
							text_en: md === page.md ? text_low : page.md.toLowerCase(),
						} )
					}
				}
			}
			return docs
		}

		// --- Full-text (instant, offline) --------------------------------
		// Raw keyword score for every page, keyed by slug. Works with zero
		// network and is what shows the moment you type.
		@ $mol_mem
		full_text_scores(): Map< string, number > {
			const scores = new Map< string, number >()
			const query = this.query().trim().toLowerCase()
			if( !query ) return scores
			const terms = query.split( /\s+/ ).filter( Boolean )
			for( const doc of this.corpus() ) {
				// Untranslated page (or English locale): both halves are the same
				// string, so scan it once instead of double-counting every hit.
				const titles = doc.title === doc.title_en ? [ doc.title ] : [ doc.title, doc.title_en ]
				const texts = doc.text === doc.text_en ? [ doc.text ] : [ doc.text, doc.text_en ]
				let score = 0
				for( const term of terms ) {
					for( const title of titles ) if( title.includes( term ) ) score += 10
					for( const text of texts ) score += this.term_count( text, term )
				}
				if( score > 0 ) scores.set( doc.slug, score )
			}
			return scores
		}

		/** Occurrences of `term` in already-lowercased `text`. */
		term_count( text: string, term: string ) {
			let idx = text.indexOf( term ), count = 0
			while( idx >= 0 ) { count++; idx = text.indexOf( term, idx + term.length ) }
			return count
		}

		// --- Semantic (lazy, in-browser) ---------------------------------
		// The embedder is loaded from a CDN on demand and suspends until ready.
		// Reads of these suspend; callers catch the suspense so full-text keeps
		// showing, and re-render once the model resolves. If anything fails,
		// full-text remains the result — semantics are strictly additive.

		@ $mol_mem
		extractor(): ( ( text: string, opts: unknown ) => Promise< { data: ArrayLike< number > } > ) {
			const mod = this.$.$mol_import.module( SEMANTIC_CDN ) as {
				pipeline: ( task: string, model: string ) => Promise< unknown >,
				env: { allowLocalModels: boolean, useBrowserCache: boolean },
			}
			// Fetch weights from the HF hub, not from this dev server's /models/
			// (which returns a non-JSON error page). Cache in the browser.
			mod.env.allowLocalModels = false
			mod.env.useBrowserCache = true
			return $mol_wire_sync( this ).build_pipeline( mod ) as never
		}

		build_pipeline( mod: { pipeline: ( task: string, model: string ) => Promise< unknown > } ) {
			return mod.pipeline( 'feature-extraction', $bog_smalljs_embeddings.model() )
		}

		// Embed the current query into a normalized vector (suspends while the
		// model loads / infers).
		@ $mol_mem
		query_vector(): readonly number[] {
			const query = this.query().trim()
			if( !query ) return []
			const pipe = this.extractor()
			const out = $mol_wire_sync( this ).run_embed( pipe, query )
			return Array.from( out.data )
		}

		run_embed( pipe: ( text: string, opts: unknown ) => Promise< { data: ArrayLike< number > } >, query: string ) {
			return pipe( query, { pooling: 'mean', normalize: true } )
		}

		// Cosine similarity per page. Empty until the query vector is ready.
		semantic_scores(): Map< string, number > {
			const scores = new Map< string, number >()
			let vec: readonly number[] = []
			try { vec = this.query_vector() }
			catch( error ) { if( error instanceof Promise ) return scores; throw error }
			if( !vec.length ) return scores
			for( const row of $bog_smalljs_embeddings.index() ) {
				let dot = 0
				const v = row.vector
				for( let i = 0; i < vec.length; i++ ) dot += vec[ i ] * v[ i ] // both L2-normalized → dot = cosine
				scores.set( row.slug, dot )
			}
			return scores
		}

		// 'idle' | 'loading' | 'ready' | 'error' — drives the hint.
		model_status(): string {
			if( !this.query().trim() ) return 'idle'
			try { this.query_vector(); return 'ready' }
			catch( error ) { return error instanceof Promise ? 'loading' : 'error' }
		}

		// --- Merge -------------------------------------------------------
		@ $mol_mem
		ranked(): { slug: string, score: number }[] {
			const ft = this.full_text_scores()
			const sem = this.semantic_scores()

			if( sem.size === 0 ) {
				// Full-text only (semantics not ready / unavailable).
				return [ ...ft.entries() ]
					.sort( ( a, b ) => b[ 1 ] - a[ 1 ] )
					.slice( 0, 8 )
					.map( ( [ slug, score ] ) => ( { slug, score } ) )
			}

			// Blend: normalize full-text to 0..1, add cosine. Keyword hits stay
			// strong; semantic surfaces relevant pages with no literal match.
			const ft_max = Math.max( 1, ...ft.values() )
			const slugs = new Set( [ ...ft.keys(), ...sem.keys() ] )
			const rows: { slug: string, score: number }[] = []
			for( const slug of slugs ) {
				const f = ( ft.get( slug ) ?? 0 ) / ft_max
				const s = Math.max( 0, sem.get( slug ) ?? 0 )
				const score = f * 0.6 + s * 0.9
				if( score > 0.15 ) rows.push( { slug, score } )
			}
			return rows.sort( ( a, b ) => b.score - a.score ).slice( 0, 8 )
		}

		hint_text() {
			const query = this.query().trim()
			if( !query ) return 'Type to search the documentation.'
			const n = this.ranked().length
			const status = this.model_status()
			const tail = status === 'loading' ? ' · loading semantic…' : status === 'ready' ? ' · semantic' : ''
			return n ? `${ n } result${ n > 1 ? 's' : '' } — ↑↓ to move, Enter to open${ tail }` : 'No matches.'
		}

		result_ids() {
			return this.ranked().map( row => row.slug )
		}

		result_rows() {
			return this.result_ids().map( slug => this.Result( slug ) )
		}

		result_arg( slug: string ) {
			return { section: 'docs', page: slug }
		}

		result_title( slug: string ) {
			return Content.page_title( slug, this.lang() ) ?? slug
		}

		// Snippet always comes from the page in the reader's language, matching
		// the sidebar and the page itself. When the hit was on the English
		// original only, the term is absent here and we fall back to the head of
		// the translated page rather than quoting a language nobody picked.
		result_snippet( slug: string ) {
			const md = ( Content.page_md( slug, this.lang() ) ?? '' )
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
