namespace $.$$ {

	export class $bog_smalljs_landing extends $.$bog_smalljs_landing {

		/**
		 * Source shown in the hero, left panel. It is the same shape as the live
		 * component mounted to the right ($bog_smalljs_demo): a two-way-bound field
		 * and a derived greeting — the whole thing, no wiring.
		 *
		 * The leading dollar of each token is spliced in from `d` so MAM's dependency
		 * -graph regex doesn't read the display-only component name as a (non-existent)
		 * module. Tabs, because view.tree is tab-indented and the grammar highlighter
		 * expects it.
		 */
		code() {
			const d = String.fromCharCode( 36 )
			return [
				`${ d }my_hello ${ d }mol_view`,
				'\tname? \\mol',
				'\tsub /',
				`\t\t<= Name ${ d }mol_string`,
				'\t\t\tvalue? <=> name?',
				`\t\t<= Greeting ${ d }mol_view`,
				'\t\t\tsub /',
				'\t\t\t\t<= greeting \\Hello, mol!',
			].join( '\n' )
		}

	}

}
