namespace $.$$ {

	export class $bog_smalljs_app extends $.$bog_smalljs_app {

		section( next?: string ) {
			return $mol_state_arg.value( 'section', next ) ?? 'home'
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
