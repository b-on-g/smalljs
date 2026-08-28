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
			// code = $mol_locale key (must be [A-Za-z0-9_] — MAM's locale-file
			// regex rejects hyphens, so Traditional Chinese is `zh_hk`, not `zh-hk`).
			// label = the language's own native name. Add a language by adding a row
			// here plus its *.locale=<code>.json files and content/<code>/docs/*.md.
			return [
				{ code: 'en', label: 'English' },
				{ code: 'zh', label: '简体中文' },
				{ code: 'zh_hk', label: '繁體中文' },
				{ code: 'ja', label: '日本語' },
				{ code: 'ko', label: '한국어' },
				{ code: 'fr', label: 'Français' },
				{ code: 'de', label: 'Deutsch' },
				{ code: 'pt', label: 'Português' },
				{ code: 'it', label: 'Italiano' },
				{ code: 'ru', label: 'Русский' },
				{ code: 'uk', label: 'Українська' },
				{ code: 'pl', label: 'Polski' },
				{ code: 'cs', label: 'Čeština' },
				{ code: 'fa', label: 'فارسی' },
				{ code: 'bn', label: 'বাংলা' },
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

		/** Выбор языка уезжает и в адрес.
		 *
		 *  Без этого перезагрузка приходила на английскую статику: пререндер
		 *  раскладывает по языкам ( `/mol_locale=ru/…` ), а голый адрес — это
		 *  x-default, то есть английский. Читатель видел английский текст, пока
		 *  бандл не поднимется и не вспомнит его выбор из localStorage. С языком
		 *  в адресе он с первого байта получает свою страницу, а ссылкой на неё
		 *  можно поделиться. */
		@ $mol_action
		lang_select( code: string ) {
			this.lang( code )
			this.$.$mol_state_arg.value( 'mol_locale', code )
			this.Lang_pick().showed( false )
			return null
		}

	}

}
