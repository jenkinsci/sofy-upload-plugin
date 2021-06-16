'use strict';

module.exports = {
	diff: true,
	extension: 'js',
	reporter: 'spec',
	slow: 100,
	timeout: 10000,
	ui: 'bdd',
	recursive: true,
	exit: true,
	package: './package.json',
	require: [
		'./test/common.js'
	]
}