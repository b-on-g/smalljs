namespace $.$$ {

	export class $bog_smalljs_versus extends $.$bog_smalljs_versus {

		/** Crash-test cases in reading order. Each one is a $bog_smalljs_versus_case
		 *  declared in the tree with its own `case_id`; the id is what the case passes
		 *  to every runner iframe as `runner.html?case=<id>`. Adding a case means one
		 *  declaration there plus one line here — the page itself stays static. */
		cases(): readonly $mol_view[] {
			return [
				this.Case_race(),
				this.Case_virtual(),
				this.Case_leak(),
				this.Case_crash(),
			]
		}

	}

}
