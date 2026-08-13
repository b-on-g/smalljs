namespace $ {

	/** Which of the two sides a metric favours. `none` means the metric was not
	 *  compared at all — one side has no reading, or the two readings are of
	 *  kinds that cannot be put on the same scale. It never means "equal": that
	 *  is `tie`, and a tie is a result. */
	export type $bog_smalljs_versus_pair_side = 'left' | 'right' | 'tie' | 'none'

	export type $bog_smalljs_versus_pair_diff = {

		readonly side: $bog_smalljs_versus_pair_side

		/** Share of the bar that belongs to the left side, 0..1, where a bigger
		 *  share always means the better value whichever way the metric points.
		 *  Null when no honest bar can be drawn — a yes/no metric, a negative
		 *  value, a pair that is not numeric. */
		readonly share: number | null

		/** How far the losing value sits from the winning one, always measured
		 *  against the loser so the base of the percentage is never ambiguous:
		 *  percent below the loser for a lower-is-better metric, percent above it
		 *  for a higher-is-better one. */
		readonly percent: number | null

		/** The same distance as a multiplier. Used instead of the percentage once
		 *  the gap passes a doubling, where "400% above" stops reading as a
		 *  quantity and starts reading as a slogan. */
		readonly times: number | null

	}

	const diff_none: $bog_smalljs_versus_pair_diff = { side: 'none', share: null, percent: null, times: null }

	const diff_tie: $bog_smalljs_versus_pair_diff = { side: 'tie', share: 0.5, percent: null, times: null }

	/**
	 * Compares one metric for the two sides of a pair. Pure, so the scoring rule
	 * can be read and tested without a page around it.
	 */
	export class $bog_smalljs_versus_pair_compare extends $mol_object2 {

		/** Whether a value can take part in a comparison at all. A string reading
		 *  is displayable but not rankable, so it is shown and left unscored. */
		static rankable( better: string, value: unknown ) {
			if( better === 'boolean' ) return typeof value === 'boolean'
			if( better !== 'lower' && better !== 'higher' ) return false
			return typeof value === 'number' && Number.isFinite( value )
		}

		static diff( better: string, left: unknown, right: unknown ): $bog_smalljs_versus_pair_diff {

			if( !this.rankable( better, left ) ) return diff_none
			if( !this.rankable( better, right ) ) return diff_none

			if( better === 'boolean' ) {
				if( left === right ) return { side: 'tie', share: null, percent: null, times: null }
				return { side: left === true ? 'left' : 'right', share: null, percent: null, times: null }
			}

			const a = left as number
			const b = right as number

			if( a === b ) return diff_tie

			const lower_wins = better === 'lower'
			const side = ( a < b ) === lower_wins ? 'left' : 'right'

			return {
				side,
				share: this.share( lower_wins, a, b ),
				... this.distance( lower_wins, a, b ),
			}
		}

		/** Left's share of the bar. Both sides are put on one track so the eye
		 *  reads the ratio rather than two lengths it has to hold at once; the
		 *  track is flipped for a lower-is-better metric, so the longer half is
		 *  always the better one and the bar means the same thing in every row.
		 *  A negative reading is refused rather than folded in — it would make
		 *  the two halves add up to something other than the whole, and a bar
		 *  that lies about proportion is worse than no bar. */
		static share( lower_wins: boolean, a: number, b: number ) {

			if( a < 0 || b < 0 ) return null

			const total = a + b
			if( total === 0 ) return 0.5

			return lower_wins ? b / total : a / total
		}

		/** Distance between the two readings, stated against the losing side. */
		static distance( lower_wins: boolean, a: number, b: number ) {

			const min = Math.min( a, b )
			const max = Math.max( a, b )

			// Percent below the loser: the winner is the smaller number, and the
			// loser is what the reader is comparing it against.
			if( lower_wins ) {
				if( max <= 0 ) return { percent: null, times: null }
				return { percent: ( max - min ) / max * 100, times: null }
			}

			// Percent above the loser. With the loser at zero there is no base to
			// measure against, and inventing one would be inventing a number.
			if( min <= 0 ) return { percent: null, times: null }

			return { percent: ( max - min ) / min * 100, times: max / min }
		}

	}

}
