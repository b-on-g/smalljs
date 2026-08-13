namespace $ {

	/** One entry of the metric registry: what a metric is called, which direction
	 *  is better, the sentence that turns the number into something a reader can
	 *  act on, and how the number was obtained. */
	export type $bog_smalljs_versus_pair_meta = $bog_smalljs_versus_data_metric

	/** One measurement. There is no entry for a metric nobody measured — absence
	 *  is how "we do not know" is written down, so nothing here is ever a
	 *  placeholder zero. */
	export type $bog_smalljs_versus_pair_measure = $bog_smalljs_versus_data_value

	export type $bog_smalljs_versus_pair_framework = $bog_smalljs_versus_data_framework

	/**
	 * Reading side of `versus/data`.
	 *
	 * The measurements themselves live in `$bog_smalljs_versus_data`, generated
	 * from the JSON files next to it and compiled into the bundle. This sits in
	 * front of them and answers the questions a page actually asks — what is this
	 * framework called, what does it report for this metric, which metrics belong
	 * to this category — with answers that hold even when the id is one nobody
	 * has written a file for.
	 *
	 * That last part is the whole point of the layer. A framework with no data is
	 * a normal state of this section, not an error: ids arrive from the URL, and
	 * the roster grows one file at a time. So an unknown id resolves to a
	 * framework with no metrics rather than to null, and every page above renders
	 * the same dash it renders for a metric that was never measured.
	 */
	export class $bog_smalljs_versus_pair_data extends $mol_object2 {

		static source() {
			return this.$.$bog_smalljs_versus_data
		}

		/** Whether anything at all is on file for this id. Tells "we have no file
		 *  for this framework" apart from "we have a file and it is thin". */
		static known( id: string ) {
			return this.source().item( id ) !== null
		}

		/** Never null, so nothing above has to branch on an id it got from a URL.
		 *  An unknown one comes back with no metrics and no runner, which is the
		 *  truth about it. */
		@ $mol_mem_key
		static framework( id: string ): $bog_smalljs_versus_pair_framework {
			return this.source().item( id ) ?? { id, title: id, runner: false, metrics: {} }
		}

		static registry() {
			return this.source().registry()
		}

		/** Display name. An id with no file keeps the id: a name nobody wrote
		 *  down is as made up as a number nobody measured. */
		static title( id: string ) {
			return this.framework( id ).title
		}

		static measure( id: string, metric: string ): $bog_smalljs_versus_pair_measure | null {
			return this.framework( id ).metrics[ metric ] ?? null
		}

		static meta( metric: string ): $bog_smalljs_versus_pair_meta | null {
			return this.source().metric( metric )
		}

		/** Metric ids of a category, in the order the registry lists them. Pages
		 *  reorder them by their own canonical list and append whatever they do
		 *  not know about, so a metric added to the registry alone still reaches
		 *  the reader. */
		@ $mol_mem_key
		static category_metrics( category: string ): readonly string[] {
			return Object.entries( this.registry() )
				.filter( ( [ , meta ] ) => meta.category === category )
				.map( ( [ id ] ) => id )
		}

	}

}
