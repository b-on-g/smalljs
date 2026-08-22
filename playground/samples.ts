namespace $ {

	/**
	 * Готовые примеры для песочницы.
	 *
	 * Компоненты, на которые они ссылаются, обязаны быть в бандле: код примера
	 * компилируется в браузере и обращается к настоящим классам. В коде примеров
	 * `$` собирается через String.fromCharCode, чтобы не попадать в разбор
	 * зависимостей, поэтому перечисляем нужное здесь — в TS только `/** *\/`
	 * тащит модули в граф:
	 * $mol_view $mol_string $mol_button_major $mol_button_minor $mol_row
	 * $mol_fetch $mol_state_arg $mol_state_local
	 */
	export type $bog_smalljs_playground_sample = {
		/** Корневой компонент примера — по нему видно, что редактор всё ещё на нём. */
		root: string
		tree: string
		ts: string
		css: string
	}

	const S = String.fromCharCode( 36 ) // "$" — вне разбора зависимостей MAM
	const lines = ( ...rows: string[] ) => rows.join( '\n' ) + '\n'

	export const $bog_smalljs_playground_samples: Record< string, $bog_smalljs_playground_sample > = {

		hello: {
			root: `${ S }my_hello`,
			tree: lines(
				`${ S }my_hello ${ S }mol_view`,
				`\tname? \\world`,
				`\tgreeting \\`,
				`\tsub /`,
				`\t\t<= Field ${ S }mol_string`,
				`\t\t\tvalue? <=> name?`,
				`\t\t\thint \\Your name`,
				`\t\t<= Greeting ${ S }mol_view`,
				`\t\t\tsub / <= greeting`,
			),
			// Приветствие view.tree сам не соберёт — за него отвечает класс.
			ts: lines(
				`class ${ S }my_hello extends ${ S }.${ S }my_hello {`,
				`\tgreeting() {`,
				`\t\treturn 'Hello, ' + ( this.name() || 'stranger' ) + '!'`,
				`\t}`,
				`}`,
			),
			css: lines(
				`namespace ${ S } {`,
				`\t${ S }mol_style_define( ${ S }my_hello, {`,
				`\t\tflex: { direction: 'column', gap: '1rem' },`,
				`\t\tpadding: '1.5rem',`,
				`\t\tGreeting: {`,
				`\t\t\tfont: { size: '1.5rem', weight: 700 },`,
				`\t\t\tcolor: '#0088ff',`,
				`\t\t},`,
				`\t} )`,
				`}`,
			),
		},

		counter: {
			root: `${ S }my_demo`,
			tree: lines(
				`${ S }my_demo ${ S }mol_view`,
				`\tcount_text \\0`,
				`\tinc? null`,
				`\tsub /`,
				`\t\t<= Value ${ S }mol_view`,
				`\t\t\tsub / <= count_text`,
				`\t\t<= Button ${ S }mol_button_major`,
				`\t\t\tclick? <=> inc?`,
				`\t\t\tsub / <= button_label \\Count up`,
			),
			ts: lines(
				`class ${ S }my_demo extends ${ S }.${ S }my_demo {`,
				`\t@ ${ S }mol_mem count( next?: number ) { return next ?? 0 }`,
				`\t@ ${ S }mol_action inc() { this.count( this.count() + 1 ) }`,
				`\tcount_text() { return String( this.count() ) }`,
				`}`,
			),
			css: lines(
				`namespace ${ S } {`,
				`\t${ S }mol_style_define( ${ S }my_demo, {`,
				`\t\tflex: { direction: 'column', gap: '1rem' },`,
				`\t\tpadding: '1.5rem',`,
				`\t\tValue: {`,
				`\t\t\tfont: { size: '2rem', weight: 700 },`,
				`\t\t\tcolor: '#0088ff',`,
				`\t\t\tpadding: { bottom: '0.5rem' },`,
				`\t\t},`,
				`\t} )`,
				`}`,
			),
		},

		fetch: {
			root: `${ S }my_fetch`,
			tree: lines(
				`${ S }my_fetch ${ S }mol_view`,
				`\trepo \\`,
				`\tstars \\`,
				`\tabout \\`,
				`\tsub /`,
				`\t\t<= Repo ${ S }mol_view`,
				`\t\t\tsub / <= repo`,
				`\t\t<= Stars ${ S }mol_view`,
				`\t\t\tsub / <= stars`,
				`\t\t<= About ${ S }mol_view`,
				`\t\t\tsub / <= about`,
			),
			// Ждать ответ не нужно: чтение подвисает, пока данные не придут,
			// а $mol сам показывает заглушку и дорисовывает по готовности.
			ts: lines(
				`class ${ S }my_fetch extends ${ S }.${ S }my_fetch {`,
				``,
				`\t@ ${ S }mol_mem data() {`,
				`\t\treturn ${ S }mol_fetch.json(`,
				`\t\t\t'https://api.github.com/repos/hyoo-ru/mam_mol'`,
				`\t\t) as { full_name: string, stargazers_count: number, description: string }`,
				`\t}`,
				``,
				`\trepo() { return this.data().full_name }`,
				`\tstars() { return String( this.data().stargazers_count ) + ' stars' }`,
				`\tabout() { return this.data().description }`,
				``,
				`}`,
			),
			css: lines(
				`namespace ${ S } {`,
				`\t${ S }mol_style_define( ${ S }my_fetch, {`,
				`\t\tflex: { direction: 'column', gap: '0.5rem' },`,
				`\t\tpadding: '1.5rem',`,
				`\t\tRepo: { font: { size: '1.25rem', weight: 700 } },`,
				`\t\tStars: { color: '#0088ff' },`,
				`\t\tAbout: { opacity: 0.7 },`,
				`\t} )`,
				`}`,
			),
		},

		args: {
			root: `${ S }my_args`,
			tree: lines(
				`${ S }my_args ${ S }mol_view`,
				`\tpage? \\home`,
				`\tgo_home? null`,
				`\tgo_about? null`,
				`\ttitle \\`,
				`\tsub /`,
				`\t\t<= Menu ${ S }mol_row`,
				`\t\t\tsub /`,
				`\t\t\t\t<= Home ${ S }mol_button_minor`,
				`\t\t\t\t\tclick? <=> go_home?`,
				`\t\t\t\t\tsub / \\Home`,
				`\t\t\t\t<= About ${ S }mol_button_minor`,
				`\t\t\t\t\tclick? <=> go_about?`,
				`\t\t\t\t\tsub / \\About`,
				`\t\t<= Title ${ S }mol_view`,
				`\t\t\tsub / <= title`,
			),
			// Адресная строка и есть состояние: экран переживает перезагрузку,
			// работает «назад» и ссылкой можно поделиться. Это же и роутинг.
			ts: lines(
				`class ${ S }my_args extends ${ S }.${ S }my_args {`,
				``,
				`\t@ ${ S }mol_mem page( next?: string ) {`,
				`\t\t// ключ свой, чтобы не спорить с аргументами самого сайта`,
				`\t\treturn ${ S }mol_state_arg.value( 'demo_page', next ) ?? 'home'`,
				`\t}`,
				``,
				`\t@ ${ S }mol_action go_home() { this.page( 'home' ); return null }`,
				`\t@ ${ S }mol_action go_about() { this.page( 'about' ); return null }`,
				``,
				`\ttitle() {`,
				`\t\treturn this.page() === 'about'`,
				`\t\t\t? 'About — the address bar changed too'`,
				`\t\t\t: 'Home — switch and look at the URL'`,
				`\t}`,
				``,
				`}`,
			),
			css: lines(
				`namespace ${ S } {`,
				`\t${ S }mol_style_define( ${ S }my_args, {`,
				`\t\tflex: { direction: 'column', gap: '1rem' },`,
				`\t\tpadding: '1.5rem',`,
				`\t\tMenu: { gap: '0.5rem' },`,
				`\t\tTitle: { font: { size: '1.25rem', weight: 700 } },`,
				`\t} )`,
				`}`,
			),
		},

		state: {
			root: `${ S }my_state`,
			tree: lines(
				`${ S }my_state ${ S }mol_view`,
				`\tnote? \\`,
				`\tsub /`,
				`\t\t<= Hint ${ S }mol_view`,
				`\t\t\tsub / \\Type something, then reload the page`,
				`\t\t<= Note ${ S }mol_string`,
				`\t\t\tvalue? <=> note?`,
				`\t\t\thint \\It survives a reload`,
			),
			// Единственное отличие от обычного поля — где лежит значение.
			ts: lines(
				`class ${ S }my_state extends ${ S }.${ S }my_state {`,
				`\t@ ${ S }mol_mem note( next?: string ) {`,
				`\t\treturn ${ S }mol_state_local.value( 'my_demo_note', next ) ?? ''`,
				`\t}`,
				`}`,
			),
			css: lines(
				`namespace ${ S } {`,
				`\t${ S }mol_style_define( ${ S }my_state, {`,
				`\t\tflex: { direction: 'column', gap: '0.75rem' },`,
				`\t\tpadding: '1.5rem',`,
				`\t\tHint: { opacity: 0.7 },`,
				`\t} )`,
				`}`,
			),
		},

		login: {
			root: `${ S }my_login`,
			tree: lines(
				`${ S }my_login ${ S }mol_view`,
				`\tmail? \\`,
				`\tpass? \\`,
				`\thint \\`,
				`\tvalid false`,
				`\tsubmit? null`,
				`\tsub /`,
				`\t\t<= Mail ${ S }mol_string`,
				`\t\t\tvalue? <=> mail?`,
				`\t\t\thint \\E-mail`,
				`\t\t<= Pass ${ S }mol_string`,
				`\t\t\tfield *`,
				`\t\t\t\t^`,
				`\t\t\t\ttype \\password`,
				`\t\t\tvalue? <=> pass?`,
				`\t\t\thint \\Password`,
				`\t\t<= Hint_text ${ S }mol_view`,
				`\t\t\tsub / <= hint`,
				`\t\t<= Send ${ S }mol_button_major`,
				`\t\t\tenabled <= valid`,
				`\t\t\tclick? <=> submit?`,
				`\t\t\tsub / \\Sign in`,
			),
			// Кнопка и подсказка ничего не хранят — они пересчитываются из полей.
			ts: lines(
				`class ${ S }my_login extends ${ S }.${ S }my_login {`,
				``,
				`\tmail_ok() { return /.+@.+\\..+/.test( this.mail() ) }`,
				`\tpass_ok() { return this.pass().length >= 8 }`,
				`\tvalid() { return this.mail_ok() && this.pass_ok() }`,
				``,
				`\t@ ${ S }mol_mem sent( next?: boolean ) { return next ?? false }`,
				`\t@ ${ S }mol_action submit() { this.sent( true ); return null }`,
				``,
				`\thint() {`,
				`\t\tif( this.sent() ) return 'Signed in as ' + this.mail()`,
				`\t\tif( !this.mail() && !this.pass() ) return 'Fill both fields'`,
				`\t\tif( !this.mail_ok() ) return 'This e-mail looks wrong'`,
				`\t\tif( !this.pass_ok() ) return 'Password: 8 characters or more'`,
				`\t\treturn 'Looks good'`,
				`\t}`,
				``,
				`}`,
			),
			css: lines(
				`namespace ${ S } {`,
				`\t${ S }mol_style_define( ${ S }my_login, {`,
				`\t\tflex: { direction: 'column', gap: '0.75rem' },`,
				`\t\tpadding: '1.5rem',`,
				`\t\tmaxWidth: '20rem',`,
				`\t\tHint_text: { opacity: 0.7, font: { size: '0.875rem' } },`,
				`\t} )`,
				`}`,
			),
		},

	}

	/** Порядок в выпадашке. */
	export const $bog_smalljs_playground_sample_ids = [ 'hello', 'counter', 'fetch', 'args', 'state', 'login' ]

}
