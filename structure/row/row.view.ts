namespace $.$$ {

	/**
	 * One line of the project tree: the box-drawing indent, the name, the comment that
	 * followed it in the listing, and a "?" whose tooltip says why the file or folder is
	 * there. A line of a list is its own component, because a keyed sub-view does not
	 * pass its key down to keyed children.
	 *
	 * The explanation is a $mol_pop_over — it opens on hover (and on focus, so the
	 * keyboard reaches it) and renders in the browser's top layer, which is what keeps
	 * it whole inside the scrolling boxes this tree lives in: the docs body and the
	 * playground's side panel would both clip an ordinary absolutely positioned box.
	 * It used to unfold under the line instead, and pushed the rest of the tree down
	 * every time a reader asked what a folder was for.
	 */
	export class $bog_smalljs_structure_row extends $.$bog_smalljs_structure_row {

		/** No comment, no column; no explanation, no question mark. */
		@ $mol_mem
		line_content() {
			return [
				this.Prefix(),
				this.Name(),
				... this.comment() ? [ this.Comment() ] : [],
				... this.note() ? [ this.Help() ] : [],
			]
		}

		/** A whole line is the click target when the host offers a file to open. */
		@ $mol_action
		line_click( next?: any ) {
			if( !this.pickable() ) return null
			this.pick( next )
			return null
		}

	}

}
