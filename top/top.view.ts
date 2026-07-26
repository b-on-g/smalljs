namespace $.$$ {

	export class $bog_smalljs_top extends $.$bog_smalljs_top {

		@ $mol_action
		nav_pick() {
			this.Docs_pick().showed( false )
			this.Ecosystem_pick().showed( false )
			this.About_pick().showed( false )
			this.Burger().showed( false )
		}

		// --- Language dropdown -------------------------------------------------
		// Reuses the framework-native $mol_locale: lang() reads/writes the current
		// locale, persisted in localStorage. Every localized `@ \…` string and the
		// docs content recompute reactively because they read $mol_locale.lang().
		//
		// The list is data-driven — add a language by adding one row here.

		langs() {
			return [
				{ code: 'en', label: 'English' },
				{ code: 'ru', label: 'Русский' },
			]
		}

		lang( next?: string ) {
			return this.$.$mol_locale.lang( next )
		}

		lang_label() {
			return this.lang().toUpperCase()
		}

		lang_options() {
			return this.langs().map( item => this.Lang_option( item.code ) )
		}

		lang_option_label( code: string ) {
			return this.langs().find( item => item.code === code )?.label ?? code
		}

		/** Wire each option's click to its own language (keyed handler by closure). */
		@ $mol_mem_key
		Lang_option( code: string ) {
			const option = super.Lang_option( code )
			option.click = () => this.lang_select( code )
			return option
		}

		/** Show the check only next to the active language. */
		@ $mol_mem_key
		Lang_option_check( code: string ): any {
			if( this.lang() !== code ) return null
			return super.Lang_option_check( code )
		}

		@ $mol_action
		lang_select( code: string ) {
			this.lang( code )
			this.Lang_pick().showed( false )
			return null
		}

	}

}
