namespace $ {

	$mol_test({

		'docs layout holds at 1280 and 400'() {
			const out = $bog_probe_test( 'bog/smalljs/probe/-/node.js', 'bog_smalljs_probe_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_smalljs_probe_ok ) )
		},

	})

}
