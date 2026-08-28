namespace $.$$ {

	/** One parsed line of the ASCII tree. */
	type row_data = {
		/** The box-drawing glyphs that indent the line. */
		prefix: string
		/** File or folder name, a folder keeping its trailing slash. */
		name: string
		/** Whatever the source line wrote after the name, aligned into a column. */
		comment: string
		/** Role of the line — picks the hint and the colour. */
		kind: string
	}

	/** Glyphs a line may be indented with, plus the spaces between them. */
	const indent_re = /^[│├└─┌┐┘┤┬┴┼| ]*/

	/**
	 * What a line is, derived from its name and depth rather than declared per tree.
	 * The same classifier serves the docs page (a workspace with one project in it)
	 * and the playground sidebar (the same workspace with the current example in it),
	 * so a tree written in markdown needs no annotations beyond its own text.
	 */
	function classify( name: string, depth: number ) {
		const dir = name.endsWith( '/' )
		const bare = dir ? name.slice( 0, -1 ) : name
		if( depth === 0 ) return 'workspace'
		if( bare === '.meta.tree' ) return 'registry'
		if( bare === '.gitattributes' ) return 'gitattributes'
		if( /\.meta\.tree$/.test( bare ) ) return 'registry_own'
		if( dir && bare === 'mol' ) return 'framework'
		if( dir && depth === 1 ) return 'package'
		if( dir && depth === 2 ) return 'project'
		if( dir ) return 'submodule'
		if( bare === 'index.html' ) return 'entry'
		if( /\.view\.css\.ts$/.test( bare ) ) return 'css'
		if( /\.view\.tree$/.test( bare ) ) return 'tree'
		if( /\.view\.ts$/.test( bare ) ) return 'ts'
		return 'file'
	}

	/** Files the reader can open when the host offers editors for them. */
	const editable = new Set( [ 'tree', 'ts', 'css' ] )

	/**
	 * A project layout drawn as the reader would see it in a file manager, with a "?"
	 * on every line that explains why the folder is there at all.
	 *
	 * The tree is not hard-coded: the host passes the same plain ASCII listing that a
	 * markdown page would print, and this parses it. That keeps one source of truth per
	 * place it is shown — the docs page keeps its listing inside the .md (so the raw
	 * .md endpoint still reads correctly), and the playground builds one from the
	 * example currently open.
	 */
	export class $bog_smalljs_structure extends $.$bog_smalljs_structure {

		/**
		 * Parsed lines, keyed by index so a repeated file name (two `index.html`) still
		 * gets a view of its own. The key carries the name after the colon, so a host
		 * handling a click reads the file name straight off it.
		 */
		@ $mol_mem
		lines(): readonly row_data[] {
			const rows: row_data[] = []
			for( const line of this.tree().split( '\n' ) ) {
				if( !line.trim() ) continue
				const prefix = indent_re.exec( line )?.[ 0 ] ?? ''
				const rest = line.slice( prefix.length )
				const parts = /^(\S+)(?:\s{2,}(.*))?$/.exec( rest )
				if( !parts ) continue
				const name = parts[ 1 ]
				// Four characters per level is what the box-drawing listings use.
				const depth = Math.round( prefix.length / 4 )
				rows.push( {
					prefix,
					name,
					comment: ( parts[ 2 ] ?? '' ).trim(),
					kind: classify( name, depth ),
				} )
			}
			return rows
		}

		/** Row keys: index for uniqueness, name for whoever handles a click. */
		@ $mol_mem
		keys(): readonly string[] {
			return this.lines().map( ( row, index ) => `${ index }:${ row.name }` )
		}

		line( key: string ): row_data {
			return this.lines()[ Number( key.split( ':' )[ 0 ] ) ]
		}

		/** Name of the file or folder a row key points at. */
		static file( key: string ) {
			return key.slice( key.indexOf( ':' ) + 1 )
		}

		rows() {
			return this.keys().map( key => this.Row( key ) )
		}

		sub() {
			return [
				this.Tree(),
				... this.steps_showed() ? [ this.Steps() ] : [],
			]
		}

		/**
		 * Comments line up in a column the way they do in the source listing: the name
		 * is padded to the width of the longest line, in the same monospace font. Doing
		 * it here rather than with a grid keeps a row a plain flex line, so the "?" and
		 * its explanation can sit inside it.
		 */
		@ $mol_mem
		width() {
			return this.lines().reduce( ( max, row ) => Math.max( max, row.prefix.length + row.name.length ), 0 ) + 2
		}

		/** A listing with nothing to align needs no column: the "?" follows the name. */
		@ $mol_mem
		commented() {
			return this.lines().some( row => !!row.comment )
		}

		row_prefix( key: string ) {
			return this.line( key ).prefix
		}

		row_name( key: string ) {
			return this.line( key ).name
		}

		row_pad( key: string ) {
			if( !this.commented() ) return ''
			const row = this.line( key )
			return ' '.repeat( Math.max( 1, this.width() - row.prefix.length - row.name.length ) )
		}

		row_comment( key: string ) {
			return this.line( key ).comment
		}

		row_kind( key: string ) {
			return this.line( key ).kind
		}

		row_active( key: string ) {
			return !!this.active() && $bog_smalljs_structure.file( key ) === this.active()
		}

		row_pickable( key: string ) {
			return this.pickable() && editable.has( this.line( key ).kind )
		}

		/**
		 * A click on a row leaves as the file name, not as a row key: the host binds a
		 * plain `file?` and gets `hello.view.ts`. The key is this component's own
		 * business, and a keyed property cannot be bound from outside anyway.
		 */
		@ $mol_action
		pick( key: string, next?: any ) {
			this.file( $bog_smalljs_structure.file( key ) )
			return null
		}

		/** The "why is this here" text, one per role rather than one per line. */
		row_note( key: string ) {
			switch( this.line( key ).kind ) {
				case 'workspace': return this.hint_workspace()
				case 'registry': return this.hint_registry()
				case 'framework': return this.hint_framework()
				case 'package': return this.hint_package()
				case 'gitattributes': return this.hint_gitattributes()
				case 'registry_own': return this.hint_registry_own()
				case 'project': return this.hint_project()
				case 'entry': return this.hint_entry()
				case 'tree': return this.hint_tree()
				case 'ts': return this.hint_ts()
				case 'css': return this.hint_css()
				case 'submodule': return this.hint_submodule()
				default: return ''
			}
		}

	}

}
