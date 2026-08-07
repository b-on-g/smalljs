namespace $ {

	export type $bog_smalljs_outline_section = {
		/** Heading depth (2 or 3). 0 marks the preamble before the first heading. */
		level: number
		/** Heading text, verbatim. Empty for the preamble. */
		title: string
		/** Section source, heading line included. */
		md: string
	}

	/**
	 * Splits a documentation page into sections at its `##`/`###` headings.
	 *
	 * The docs table of contents and the search index both go through here so
	 * their headings cannot drift apart: `title` is used as the value of the
	 * anchor URL argument, and $mol_text only scrolls to a heading when that
	 * value matches its own header text character for character (see
	 * `$bog_smalljs_docs.toc_arg` and `$mol_text.header_arg`).
	 *
	 * The first entry is always the preamble, even when it is empty, and the
	 * sections concatenate back to the input — search relies on that to score a
	 * page by summing over its sections.
	 */
	export class $bog_smalljs_outline extends $mol_object2 {

		static sections( md: string ): readonly $bog_smalljs_outline_section[] {

			const sections = [ { level: 0, title: '', lines: [] as string[] } ]
			let in_code = false

			for( const line of md.split( '\n' ) ) {
				if( /^```/.test( line ) ) {
					in_code = !in_code
				} else if( !in_code ) {
					const match = /^(#{2,3})\s+(.+?)\s*$/.exec( line )
					if( match ) sections.push( { level: match[ 1 ].length, title: match[ 2 ], lines: [] } )
				}
				sections[ sections.length - 1 ].lines.push( line )
			}

			return sections.map( section => ( {
				level: section.level,
				title: section.title,
				md: section.lines.join( '\n' ),
			} ) )
		}

	}

}
