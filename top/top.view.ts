namespace $.$$ {

	export class $bog_smalljs_top extends $.$bog_smalljs_top {

		@ $mol_action
		nav_pick() {
			this.Docs_pick().showed( false )
			this.Ecosystem_pick().showed( false )
			this.About_pick().showed( false )
			this.Burger().showed( false )
		}

		// --- Language (EN ↔ RU) ------------------------------------------------
		// Reuses the framework-native $mol_locale: lang() reads/writes the current
		// locale, persisted in localStorage. Every localized `@ \…` string and the
		// docs content recompute reactively because they read $mol_locale.lang().

		lang( next?: string ) {
			return this.$.$mol_locale.lang( next )
		}

		@ $mol_action
		lang_open() {
			this.lang( this.lang() === 'ru' ? 'en' : 'ru' )
			return null
		}

		lang_label() {
			return this.lang() === 'ru' ? 'RU' : 'EN'
		}

	}

}
