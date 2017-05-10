require( '../../../helpers/unit.js' )( ( finder ) => ( {
	setup: require( '@jrapp/log-emitter' ).on( 'debug', () => {} )
} ) )
	.it( 'should find all files in absolute path matching a rule', ( assert, finder ) =>
		finder( require( 'path' ).resolve( __dirname, '../../..' ), '*.js' )
			.then( absolutepaths => absolutepaths.map( absolutepath => require( 'path' ).basename( absolutepath ) ) )
	 		.then( filenames => assert.deepEqual( filenames, [ 'unit.js', 'index.js.test.js' ] ) ) )
	.it( 'should find all files in relative path matching a rule', ( assert, finder ) =>
		finder( '../../..', '*.js' )
			.then( absolutepaths => absolutepaths.map( absolutepath => require( 'path' ).basename( absolutepath ) ) )
	 		.then( filenames => assert.deepEqual( filenames, [ 'unit.js', 'index.js.test.js' ] ) ) )
	.it( 'should throw exception if absolute path does not exists', ( assert, finder ) => new Promise( resolve =>
		finder( '/wefjofewjo/FewfewFUEWF/fwef', '*.js' ).catch( err => resolve() ) ) )
.done();
