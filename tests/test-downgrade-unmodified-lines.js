const test = require( 'tape' );
const downgradeUnmodifiedLines = require( '../src/lib/downgrade-unmodified-lines.js' );

// fixtures
const baseReport = require( './fixtures/eslint.json' );
const linesModifiedReport = require( './fixtures/eslint-lines-modified.json' );
const linesAndRulesReport = require( './fixtures/eslint-lines-and-rules.json' );
const onlyRulesReport = require( './fixtures/eslint-only-rules.json' );
const lines = require( './fixtures/lines.json' );

test( 'downgrade-unmodified-lines - empty array if original report is empty', t => {
	const newReport = downgradeUnmodifiedLines( [], lines );

	// newReport should be [] as well
	t.ok( Array.isArray( newReport ) );
	t.equals( newReport.length, 0 );
	t.end();
} );

test( 'downgrade-unmodified-lines - all rules as warnings if lines parameter is empty, except those not to downgrade', t => { // eslint-disable-line max-len
	const newReport = downgradeUnmodifiedLines( baseReport, {}, [ 'max-len' ] );

	// t.equals( JSON.stringify( newReport ), JSON.stringify( downgradedReport ) );
	t.equals( newReport[ 0 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 0 ].warningCount, onlyRulesReport[ 0 ].warningCount );
	t.equals( newReport[ 0 ].errorCount, onlyRulesReport[ 0 ].errorCount );
	t.equals( newReport[ 1 ].messages[ 0 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 1 ].messages[ 1 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 1 ].messages[ 2 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 1 ].warningCount, onlyRulesReport[ 1 ].warningCount );
	t.equals( newReport[ 1 ].errorCount, onlyRulesReport[ 1 ].errorCount );
	t.equals( newReport[ 2 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 2 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 2 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 2 ].warningCount, onlyRulesReport[ 2 ].warningCount );
	t.equals( newReport[ 2 ].errorCount, onlyRulesReport[ 2 ].errorCount );
	t.equals( newReport[ 3 ].messages.length, 0 );
	t.equals( newReport[ 3 ].warningCount, onlyRulesReport[ 3 ].warningCount );
	t.equals( newReport[ 3 ].errorCount, onlyRulesReport[ 3 ].errorCount );
	t.equals( newReport[ 4 ].messages[ 0 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 4 ].messages[ 1 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 4 ].messages[ 2 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 4 ].messages[ 3 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 4 ].messages[ 4 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 4 ].messages[ 5 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 6 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 7 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 8 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 9 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 10 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 11 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 12 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 13 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 4 ].warningCount, onlyRulesReport[ 4 ].warningCount );
	t.equals( newReport[ 4 ].errorCount, onlyRulesReport[ 4 ].errorCount );
	t.equals( newReport[ 5 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 5 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 5 ].warningCount, onlyRulesReport[ 5 ].warningCount );
	t.equals( newReport[ 5 ].errorCount, onlyRulesReport[ 5 ].errorCount );
	t.equals( newReport[ 6 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 6 ].warningCount, onlyRulesReport[ 6 ].warningCount );
	t.equals( newReport[ 6 ].errorCount, onlyRulesReport[ 6 ].errorCount );
	t.equals( newReport[ 7 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 7 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 7 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 7 ].warningCount, onlyRulesReport[ 7 ].warningCount );
	t.equals( newReport[ 7 ].errorCount, onlyRulesReport[ 7 ].errorCount );
	t.equals( newReport[ 8 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 4 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 5 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 6 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 7 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 8 ].messages[ 8 ].severity, 1 );
	t.equals( newReport[ 8 ].warningCount, onlyRulesReport[ 8 ].warningCount );
	t.equals( newReport[ 8 ].errorCount, onlyRulesReport[ 8 ].errorCount );
	t.end();
} );

test( 'downgrade-unmodified-lines - errors in files&lines not modified downgraded to warnings', t => { // eslint-disable-line max-len
	const newReport = downgradeUnmodifiedLines( baseReport, lines );

	// t.equals( JSON.stringify( newReport ), JSON.stringify( downgradedReport ) );
	t.equals( newReport[ 0 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 0 ].warningCount, linesModifiedReport[ 0 ].warningCount );
	t.equals( newReport[ 0 ].errorCount, linesModifiedReport[ 0 ].errorCount );
	t.equals( newReport[ 1 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 1 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 1 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 1 ].warningCount, linesModifiedReport[ 1 ].warningCount );
	t.equals( newReport[ 1 ].errorCount, linesModifiedReport[ 1 ].errorCount );
	t.equals( newReport[ 2 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 2 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 2 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 2 ].warningCount, linesModifiedReport[ 2 ].warningCount );
	t.equals( newReport[ 2 ].errorCount, linesModifiedReport[ 2 ].errorCount );
	t.equals( newReport[ 3 ].messages.length, 0 );
	t.equals( newReport[ 3 ].warningCount, linesModifiedReport[ 3 ].warningCount );
	t.equals( newReport[ 3 ].errorCount, linesModifiedReport[ 3 ].errorCount );
	t.equals( newReport[ 4 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 4 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 5 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 6 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 7 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 8 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 9 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 10 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 11 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 12 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 13 ].severity, 1 );
	t.equals( newReport[ 4 ].warningCount, linesModifiedReport[ 4 ].warningCount );
	t.equals( newReport[ 4 ].errorCount, linesModifiedReport[ 4 ].errorCount );
	t.equals( newReport[ 5 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 5 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 5 ].warningCount, linesModifiedReport[ 5 ].warningCount );
	t.equals( newReport[ 5 ].errorCount, linesModifiedReport[ 5 ].errorCount );
	t.equals( newReport[ 6 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 6 ].warningCount, linesModifiedReport[ 6 ].warningCount );
	t.equals( newReport[ 6 ].errorCount, linesModifiedReport[ 6 ].errorCount );
	t.equals( newReport[ 7 ].messages[ 0 ].severity, 1, '8th / 1st: file modified, line not' );
	t.equals( newReport[ 7 ].messages[ 1 ].severity, 2, '8th / 2nd: file & line modified' );
	t.equals( newReport[ 7 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 7 ].warningCount, linesModifiedReport[ 7 ].warningCount );
	t.equals( newReport[ 7 ].errorCount, linesModifiedReport[ 7 ].errorCount );
	t.equals( newReport[ 8 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 4 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 5 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 6 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 7 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 8 ].severity, 1 );
	t.equals( newReport[ 8 ].warningCount, linesModifiedReport[ 8 ].warningCount );
	t.equals( newReport[ 8 ].errorCount, linesModifiedReport[ 8 ].errorCount );
	t.end();
} );

test( 'downgrade-unmodified-lines - errors in files&lines not modified downgraded to warnings, except those to not downgrade', t => { // eslint-disable-line max-len
	const newReport = downgradeUnmodifiedLines( baseReport, lines, [ 'max-len' ] );

	// t.equals( JSON.stringify( newReport ), JSON.stringify( downgradedReport ) );
	t.equals( newReport[ 0 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 0 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 0 ].warningCount, linesAndRulesReport[ 0 ].warningCount );
	t.equals( newReport[ 0 ].errorCount, linesAndRulesReport[ 0 ].errorCount );
	t.equals( newReport[ 1 ].messages[ 0 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 1 ].messages[ 1 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 1 ].messages[ 2 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 1 ].warningCount, linesAndRulesReport[ 1 ].warningCount );
	t.equals( newReport[ 1 ].errorCount, linesAndRulesReport[ 1 ].errorCount );
	t.equals( newReport[ 2 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 2 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 2 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 2 ].warningCount, linesAndRulesReport[ 2 ].warningCount );
	t.equals( newReport[ 2 ].errorCount, linesAndRulesReport[ 2 ].errorCount );
	t.equals( newReport[ 3 ].messages.length, 0 );
	t.equals( newReport[ 3 ].warningCount, linesAndRulesReport[ 3 ].warningCount );
	t.equals( newReport[ 3 ].errorCount, linesAndRulesReport[ 3 ].errorCount );
	t.equals( newReport[ 4 ].messages[ 0 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 4 ].messages[ 1 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 4 ].messages[ 2 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 4 ].messages[ 3 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 4 ].messages[ 4 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 4 ].messages[ 5 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 6 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 7 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 8 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 9 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 10 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 11 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 12 ].severity, 1 );
	t.equals( newReport[ 4 ].messages[ 13 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 4 ].warningCount, linesAndRulesReport[ 4 ].warningCount );
	t.equals( newReport[ 4 ].errorCount, linesAndRulesReport[ 4 ].errorCount );
	t.equals( newReport[ 5 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 5 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 5 ].warningCount, linesAndRulesReport[ 5 ].warningCount );
	t.equals( newReport[ 5 ].errorCount, linesAndRulesReport[ 5 ].errorCount );
	t.equals( newReport[ 6 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 6 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 6 ].warningCount, linesAndRulesReport[ 6 ].warningCount );
	t.equals( newReport[ 6 ].errorCount, linesAndRulesReport[ 6 ].errorCount );
	t.equals( newReport[ 7 ].messages[ 0 ].severity, 1, '8th / 1st: file modified, line not' );
	t.equals( newReport[ 7 ].messages[ 1 ].severity, 2, '8th / 2nd: file & line modified' );
	t.equals( newReport[ 7 ].messages[ 2 ].severity, 1, '8th / 3rd: file modified, line not' );
	t.equals( newReport[ 7 ].warningCount, linesAndRulesReport[ 7 ].warningCount );
	t.equals( newReport[ 7 ].errorCount, linesAndRulesReport[ 7 ].errorCount );
	t.equals( newReport[ 8 ].messages[ 0 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 1 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 2 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 3 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 4 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 5 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 6 ].severity, 1 );
	t.equals( newReport[ 8 ].messages[ 7 ].severity, 2, 'max-len rule not to donwgrade' );
	t.equals( newReport[ 8 ].messages[ 8 ].severity, 1 );
	t.equals( newReport[ 8 ].warningCount, linesAndRulesReport[ 8 ].warningCount );
	t.equals( newReport[ 8 ].errorCount, linesAndRulesReport[ 8 ].errorCount );
	t.end();
} );
