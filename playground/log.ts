namespace $ {

	export type $bog_smalljs_playground_log_entry = {
		level: 'log' | 'info' | 'warn' | 'error'
		text: string
	}

	/**
	 * Журнал песочницы: вывод примера и необработанные ошибки.
	 *
	 * Перехват глобальный, потому что превью живёт в том же документе, что и сайт,
	 * и отделить его вывод было бы гаданием по стеку. Это допустимо по измерению:
	 * за полный цикл работы песочницы — загрузка, переключение примеров, сбросы —
	 * сам сайт не пишет в консоль ничего, так что в журнале оказывается только
	 * то, что напечатал пример. Если сайт когда-нибудь станет разговорчивым,
	 * это перестанет быть правдой и журнал придётся уводить в iframe.
	 */
	export class $bog_smalljs_playground_log extends $mol_object {

		static limit = 50

		static entries: $bog_smalljs_playground_log_entry[] = []

		static installed = false

		/** Отложенный сигнал о новых записях; держим ссылку, чтобы его не убрали. */
		static ticket: unknown = null

		@ $mol_mem
		static version( next?: number ) { return next ?? 0 }

		static one( arg: unknown ): string {
			if ( typeof arg === 'string' ) return arg
			if ( arg instanceof Error ) return arg.message
			try { return JSON.stringify( arg ) ?? String( arg ) }
			catch { return String( arg ) }
		}

		static text( args: unknown[] ) {

			const rest = args.slice()
			let out = ''

			// Первый аргумент может быть шаблоном с подстановками — так печатает
			// и сам $mol. Без разбора в журнал попадала сырая строка вида
			// «%c%s: %s color:orangered place $mol_storage», в которой не видно
			// ни сообщения, ни его источника.
			if ( typeof rest[ 0 ] === 'string' && /%[sdifoOjc]/.test( rest[ 0 ] ) ) {
				const template = rest.shift() as string
				out = template.replace( /%([sdifoOjc%])/g, ( _, kind ) => {
					if ( kind === '%' ) return '%'
					const value = rest.shift()
					if ( kind === 'c' ) return ''          // это стили, а не текст
					if ( kind === 'd' || kind === 'i' ) return String( parseInt( String( value ) ) )
					if ( kind === 'f' ) return String( parseFloat( String( value ) ) )
					return this.one( value )
				} )
			}

			const tail = rest.map( arg => this.one( arg ) ).join( ' ' )
			return ( out ? out + ( tail ? ' ' + tail : '' ) : tail ).trim().slice( 0, 400 )
		}

		static push( level: $bog_smalljs_playground_log_entry[ 'level' ], args: unknown[] ) {

			this.entries.push( { level, text: this.text( args ) } )
			if ( this.entries.length > this.limit ) this.entries.shift()

			// Печать может случиться прямо посреди отрисовки, а писать состояние
			// оттуда нельзя. Откладываем на тик — не на кадр: в фоновой вкладке
			// requestAnimationFrame не крутится, и журнал бы застыл.
			this.ticket = new $mol_after_tick( () => this.version( this.version() + 1 ) )
		}

		static clear() {
			this.entries = []
			this.version( this.version() + 1 )
		}

		static install() {

			if ( this.installed ) return
			if ( typeof console === 'undefined' ) return
			this.installed = true

			for ( const level of [ 'log', 'info', 'warn', 'error' ] as const ) {
				const origin = console[ level ].bind( console )
				console[ level ] = ( ... args: unknown[] ) => {
					origin( ... args )
					this.push( level, args )
				}
			}

			// Ошибки, до которых $mol не дотянулся: обработчики событий, промисы.
			$mol_dom_context.addEventListener?.( 'error', ( event: any ) => {
				this.push( 'error', [ event?.message ?? event?.error ?? 'Error' ] )
			} )
			$mol_dom_context.addEventListener?.( 'unhandledrejection', ( event: any ) => {
				this.push( 'error', [ event?.reason ?? 'Unhandled rejection' ] )
			} )
		}

	}

}
