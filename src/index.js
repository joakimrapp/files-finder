const path = require( 'path' );
const { fs } = require( '@jrapp/callbacks-to-promises' );
const log = require( '@jrapp/log-emitter' ).log( 'files-find' );
const recursive = ( absolutepath, regexp ) => fs.stat( absolutepath )
	.then( stats => stats.isDirectory() )
	.then( isDirectory =>
		isDirectory ? fs.readdir( absolutepath )
			.then( filenames => filenames.map( filename => path.resolve( absolutepath, filename ) ) )
			.then( absolutepaths => absolutepaths.map( absolutepath => recursive( absolutepath, regexp ) ) )
			.then( promises => Promise.all( promises ) )
			.then( filepaths => Array.prototype.concat( ...filepaths ) ) :
		!regexp.test( path.basename( absolutepath ) ) ? [] :
		log.trace( 'found file', absolutepath ).return( [ absolutepath ] ) );
const find = ( absolutepath, rule ) => log
	.debug( 'start scanning', `${absolutepath} for ${rule}` )
	.timer( recursive( absolutepath, new RegExp( `^${rule.replace( /\*/g, '.*' )}$` ) ) )
	.debug( 'scan finished', ( filepaths ) => `found ${filepaths.length} files matching ${rule}` )
	.promise;
module.exports = ( scanpath, rule = '*' ) => find( path.isAbsolute( scanpath ) ? scanpath :
	path.resolve( path.dirname( require( 'stack-trace' ).get()[ 1 ].getFileName() ), scanpath ), rule );
