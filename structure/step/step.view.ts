namespace $.$$ {

	/** One numbered step of "how to start a project", with the command or path it names. */
	export class $bog_smalljs_structure_step extends $.$bog_smalljs_structure_step {

		/** A step without a command is just the sentence. */
		@ $mol_mem
		body_content() {
			return [
				this.Text(),
				... this.code() ? [ this.Code() ] : [],
			]
		}

	}

}
