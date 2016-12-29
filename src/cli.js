/* eslint strict: "off" */

'use strict';

const childProcess = require( 'child_process' );
const fs = require( 'fs' );
const path = require( 'path' );
const exitCode = require( './lib/exit-code' );

/*
* This function should *not* call process.exit() directly,
* It should only return exit codes. This allows other programs
* to use the function and still control when the program exits.
*
*/

module.exports = function( report, options ) {
	const getESLintFormatter = format => {
		// See https://github.com/eslint/eslint/blob/master/lib/cli-engine.js#L477

		let formatterPath;

		// default is stylish
		format = format || 'stylish';

		// only strings are valid formatters
		if ( typeof format === 'string' ) {
			// replace \ with / for Windows compatibility
			format = format.replace( /\\/g, '/' );

			// if there's a slash, then it's a file
			if ( format.indexOf( '/' ) > -1 ) {
				formatterPath = path.resolve( process.cwd(), format );
			} else {
				formatterPath = 'eslint/lib/formatters/' + format;
			}

			try {
				return require( formatterPath );
			} catch ( ex ) {
				const msg = 'Problem loading formatter: ' + formatterPath + '\nError: ';
				ex.message = msg + ex.message;
				throw ex;
			}
		} else {
			return null;
		}
	};

	const getProcessorNameFromConfig = config => {
		let processorName = config.default || 'lines-modified';

		const argsBranchName = [ 'rev-parse', '--abbrev-ref', 'HEAD' ];
		const head = childProcess.spawnSync( 'git', argsBranchName ).stdout.toString().trim();
		for ( const branch in config ) {
			if ( branch === head ) {
				// branch names could be master, add/topic-branch
				// and any other git branch valid name
				processorName = config[ branch ];
				break;
			}
		}

		return processorName;
	};

	const getProcessor = processorName => {
		try {
			return require( './processors/' + processorName );
		} catch ( ex ) {
			const msg = 'Problem loading processor: ' + processorName + '\nError: ';
			ex.message = msg + ex.message;
			throw ex;
		}
	};

	const config = JSON.parse( fs.readFileSync( '.eslines.json', 'utf-8' ) );
	const processorName = options.processor || getProcessorNameFromConfig( config.processors );
	const processor = getProcessor( processorName );

	/*
	An eslines processor is a regular ESLint formatter, actually.
	ESLint does not allow for passing info to the formatters other than
	trough environment variables. For compatibility reasons,
	we choose to use this mechanism to pass info to the processors,
	as if they were running through ESLint such as:

		eslint --formatter=<eslines-processor>

	This will allow us to reuse processors as formatters in other contexts.
	*/

	process.env.ESLINES_DIFF = options.diff || 'remote';
	const newReport = JSON.parse( processor( report ) );
	delete process.env.ESLINES_DIFF;

	if ( Array.isArray( newReport ) && ( newReport.length > 0 ) ) {
		const formatter = getESLintFormatter( options.format );
		process.stdout.write( formatter( newReport ) );

		// If newReport has any error, exit code will be 1;
		// otherwise it will be 0.
		return exitCode( newReport );
	}

	// it has nothing to show
	return 0;
};