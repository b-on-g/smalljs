namespace $.$$ {

	/**
	 * The tiny reactive component mounted live in the landing hero, right next to
	 * its own view.tree source. Typing in the field re-derives the greeting with no
	 * wiring — that automatic reactivity is the one thing the hero has to prove.
	 */
	export class $bog_smalljs_demo extends $.$bog_smalljs_demo {

		// Ровно то, что написано в соседнем окне с кодом: двойник обещает, что
		// показанный код и есть работающий.
		greeting() {
			return `Hello, ${ this.name() || this.guest() }!`
		}

	}

}
