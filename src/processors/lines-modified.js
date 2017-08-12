const fs = require( 'fs' );
const eslines = require( '../lib/eslines' );
const differ = require( '../lib/differ' );
const gitDiffCalculator = require( '../lib/git-diff-calculator' );

const config = JSON.parse( fs.readFileSync( '.eslines.json', 'utf-8' ) );

module.exports = function( report ) {
	const remote = config.processors[ 'lines-modified' ].remote || 'origin/master';
	const lines = differ( gitDiffCalculator( remote ) );
	return JSON.stringify( eslines( report, lines ) );
};
