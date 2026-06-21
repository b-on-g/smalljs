namespace $.$$ {

	export class $bog_smalljs_app extends $.$bog_smalljs_app {

		section( next?: string ) {
			return $mol_state_arg.value( 'section', next ) ?? 'home'
		}

		body_content() {
			switch( this.section() ) {
				case 'docs': return [ this.Docs() ]
				case 'playground': return [ this.Playground() ]
				default: return [ this.Landing() ]
			}
		}

	}

}
