namespace $.$$ {

	const repo = 'https://github.com/b-on-g/smalljs/blob/main/'

	function fill( template: string, values: Record< string, string > ) {
		return template.replace( /\{(\w+)\}/g, ( whole, key ) => values[ key ] ?? whole )
	}

	/**
	 * The two implementations of one crash-test scenario, side by side, under the
	 * frames that just ran them.
	 *
	 * This is the whole answer to "readability" in the comparison, and it is
	 * deliberately not a number. Nobody can defend a readability score, and a
	 * reader who disagrees with one has no way to check it; two blocks of code
	 * next to each other need no defending, because the reader is looking at the
	 * evidence rather than at our reading of it.
	 *
	 * Collapsed by default. The section argues by behaviour first — the frames
	 * above have already shown what happens — and the code is there for whoever
	 * asks why, not as a wall to get past on the way down the page.
	 */
	export class $bog_smalljs_versus_code extends $.$bog_smalljs_versus_code {

		snippets() {
			return this.$.$bog_smalljs_versus_code_data[ this.case_id() ] ?? {}
		}

		/** Sides that actually have a runner, in the pair's own order. A framework
		 *  nobody wrote a scenario for is left out rather than shown empty: an
		 *  empty column reads as "this framework needs no code", which is the
		 *  opposite of the truth. */
		sides() {
			return [ this.left(), this.right() ].filter( id => !!this.snippets()[ id ] )
		}

		columns() {
			return this.sides().map( id => this.Column( id ) )
		}

		snippet( id: string ) {
			return this.snippets()[ id ]
		}

		column_name( id: string ) {
			return id === 'mol' ? '$mol' : id[ 0 ].toUpperCase() + id.slice( 1 )
		}

		column_text( id: string ) {
			return this.snippet( id )?.text ?? ''
		}

		column_file( id: string ) {
			return this.snippet( id )?.file ?? ''
		}

		/** Straight at the file the snippet was lifted from, so "generated from
		 *  the runners" is a claim the reader can check in one click. */
		column_uri( id: string ) {
			const file = this.column_file( id )
			return file ? repo + 'bog/smalljs/' + file : ''
		}

		missing_text() {
			const absent = [ this.left(), this.right() ].filter( id => !this.snippets()[ id ] )
			if( !absent.length ) return ''
			return fill( this.missing(), { a: this.column_name( absent[ 0 ] ) } )
		}

		/** What the block is made of. Built as a list rather than by returning
		 *  null from a factory: the tree is where a $mol component declares what
		 *  it can contain, and switching a child off by type fights that.
		 *
		 *  Nothing at all when neither side has a runner — a disclosure that
		 *  opens onto nothing is worse than no disclosure. */
		body(): readonly $mol_view[] {
			const parts: $mol_view[] = []
			if( this.sides().length ) parts.push( this.Expander() )
			if( this.sides().length < 2 && this.missing_text() ) parts.push( this.Missing() )
			return parts
		}

	}

}
