namespace $ {

	/**
	 * The site's router: a link leads exactly where it points.
	 *
	 * `$bog_builderui_router` merges by default — segments of the current address
	 * whose key the link never mentions are carried into the next one. That suits
	 * apps whose screens share keys, and four of them rely on it, so the default
	 * stays as it is. This site is the other kind: every screen owns its own keys,
	 * and carrying them across is pure damage.
	 *
	 * What it fixed here. The course writes `lesson`, the comparison section writes
	 * `a` and `b`, and no link in the top bar names any of the three — so leaving
	 * either screen used to produce `lesson=hello/section=docs/page=views`. Three
	 * consequences: the address stopped matching the link the reader had just
	 * clicked; a shared link carried a stale key from wherever its author happened
	 * to be standing; and crawlers were handed endless spellings of one page, which
	 * is exactly what the canonical pair order in the sitemap exists to prevent.
	 *
	 * Nothing is lost by dropping the merge, because the link already carries the
	 * full target: `$mol_state_arg.link()` folds the current address in through
	 * `dict_cut()` while building the href. One caveat worth knowing — `dict_cut`
	 * stops at the first key the link mentions and drops everything after it in the
	 * address. Harmless here, since `section` leads every address and every link
	 * sets it, so the cut always lands at the start. A link that sets a later key
	 * while expecting still later ones to survive would need more care.
	 *
	 * @see bog/builderui/router/router.web.ts — the seam and why its default holds
	 * @see bog/builderui/router/router.web.test.ts — both behaviours, pinned
	 */
	export class $bog_smalljs_router extends $bog_builderui_router {

		/** Ключ, который переживает переход: язык. */
		static readonly sticky = 'mol_locale='

		static override route_target( anchor_path: string, current_path: string ) {

			const carried = anchor_path.split( '/' ).some( part => part.startsWith( this.sticky ) )
			if( carried ) return anchor_path

			// Язык — свойство читателя, а не экрана, и ссылки в шапке про него
			// молчат. Без этого исключения первый же переход возвращал адрес к
			// безъязыкому, а безъязыкий адрес — это пререндер на английском:
			// следующая загрузка показывала английскую статику и только потом
			// переключалась на выбранный язык. Отсюда и «язык прыгает».
			const lang = current_path.split( '/' ).find( part => part.startsWith( this.sticky ) )
			if( !lang ) return anchor_path

			return [ lang, anchor_path ].filter( Boolean ).join( '/' )
		}

	}

}
