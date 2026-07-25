namespace $.$$ {

	/**
	 * A live view.tree playground. The editor's text is compiled at runtime with
	 * $mol's own toolchain — $mol_tree2_from_string parses it, $mol_view_tree2_to_js
	 * turns it into JS, and the result is evaluated into a live component. We do NOT
	 * write a parser.
	 *
	 * Snippets can only reference components bundled into this app, so the ones
	 * below are force-referenced (in a doc comment, which MAM keeps) to pull them
	 * into the bundle for the runtime to resolve:
	 * $mol_view $mol_button_major $mol_button_minor $mol_string $mol_number
	 * $mol_text $mol_paragraph $mol_list $mol_row $mol_link $mol_check $mol_switch
	 */
	export class $bog_smalljs_playground extends $.$bog_smalljs_playground {

		default_source() {
			const S = String.fromCharCode( 36 ) // "$" — kept out of MAM's dep scan
			return [
				`${ S }my_demo ${ S }mol_view`,
				`\tsub /`,
				`\t\t<= Hello ${ S }mol_view`,
				`\t\t\tsub / <= hello \\Hello from the ${ S }mol playground!`,
				`\t\t<= Tip ${ S }mol_view`,
				`\t\t\tsub / <= tip \\Edit the view.tree on the left — the preview updates as you type.`,
			].join( '\n' ) + '\n'
		}

		// Editor value: immediate for smooth typing, seeded from the URL once.
		@ $mol_mem
		draft( next?: string ) {
			if ( next !== undefined ) {
				this.schedule_commit( next )
				return next
			}
			return this.$.$mol_state_arg.value( 'code' ) || this.default_source()
		}

		// Debounced commit — avoids recompiling on every keystroke.
		commit_timer: $mol_after_timeout | null = null

		@ $mol_action
		schedule_commit( value: string ) {
			this.commit_timer?.destructor()
			this.commit_timer = new this.$.$mol_after_timeout( 400, () => this.commit( value ) )
		}

		@ $mol_action
		commit( value: string ) {
			this.$.$mol_state_arg.value( 'code', value ) // shareable URL
			this.committed( value )
		}

		// The source the preview actually compiles.
		@ $mol_mem
		committed( next?: string ) {
			return next ?? ( this.$.$mol_state_arg.value( 'code' ) || this.default_source() )
		}

		// Compile a view.tree string into a live component using $mol's toolchain.
		compile( src: string ): $mol_view {

			const $ = this.$
			const tree = $.$mol_tree2_from_string( src, 'playground.view.tree' )
			const js_tree = $.$mol_view_tree2_to_js( tree )
			const js_text = $.$mol_tree2_js_to_text( js_tree )
			const js_str = $.$mol_tree2_text_to_string_mapped_js( js_text )

			// Evaluate into a throwaway namespace so real $ isn't polluted:
			// reads fall through to the real $, writes land in `store`.
			const store = {} as Record< string, any >
			const scope = new Proxy( $ as any, {
				get: ( target, key ) => ( key in store ? store[ key as string ] : target[ key as any ] ),
				set: ( _target, key, value ) => { store[ key as string ] = value; return true },
			} )

			const run = new Function( '$', '$mol_mem', '$mol_mem_key', js_str )
			run( scope, ( $ as any ).$mol_mem, ( $ as any ).$mol_mem_key )

			const root = /(\$[\w$]+)/.exec( src )?.[ 1 ]
			if ( !root ) throw new Error( 'No component found — the first line must declare one (a name and a base view).' )
			const Component = store[ root ]
			if ( typeof Component !== 'function' ) {
				throw new Error( `Component ${ root } could not be built.` )
			}
			return new Component() as $mol_view
		}

		error_box( message: string ): $mol_view {
			const box = new this.$.$mol_view()
			;( box as any ).dom_name = () => 'pre'
			;( box as any ).sub = () => [ '⚠ ' + message ]
			return box
		}

		@ $mol_mem
		preview_content(): readonly ( $mol_view | string )[] {
			const src = this.committed()
			try {
				return [ this.compile( src ) ]
			} catch ( error ) {
				return [ this.error_box( error instanceof Error ? error.message : String( error ) ) ]
			}
		}

	}

}
