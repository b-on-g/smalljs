namespace $.$$ {

	/**
	 * One line of the project tree: the box-drawing indent, the name, the comment that
	 * followed it in the listing, and a "?" that unfolds why the file or folder is
	 * there. A line of a list is its own component, because a keyed sub-view does not
	 * pass its key down to keyed children.
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

		@ $mol_mem
		sub() {
			return [
				this.Line(),
				... this.open() && this.note() ? [ this.Note() ] : [],
			]
		}

		/**
		 * The explanation unfolds under its line instead of floating over it: the tree
		 * is shown inside scroll containers (docs body, playground sidebar) where a
		 * popup would be clipped, and a tooltip is unreachable on a touch screen. The
		 * same text is on the button's `hint`, so hovering still reads it.
		 */
		@ $mol_action
		help_click( next?: any ) {
			this.open( !this.open() )
			return null
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
