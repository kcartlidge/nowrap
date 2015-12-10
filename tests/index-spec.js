var assert = require('assert');
var wrap = require('../index');

// For testing against.
var path = require('path');

console.log(path.basename('/path/file.ext', '.ext'));


// Flags to catch the results for checking.
var calledBefore, calledWith, calledAfter, calledReturning, callSequence;

// Create functions to be called before/after a wrapped one.
// These will update the flags to allow testing.
var beforeFunc = function (name, args) {
	calledBefore = name;
	calledWith = args;
	callSequence += 'Before';
};
var afterFunc = function (name, result) {
	calledAfter = name;
	calledReturning = result;
	callSequence += 'After';
};

// Wrap it for the tests.
// Note that the 'basename' function gets parameter substitutions.
wrap(path, beforeFunc, afterFunc, {
		basename: {
			path: function(original) {
				return original.toUpperCase();
			},
			ext: '.SWITCHED'
		}
	}
);

describe("when nowrap is attached", function () {

	beforeEach(function () {
		calledBefore = false;
		calledAfter = false;
		calledWith = false;
		calledReturning = false;
		callSequence = '';
	});

	it("the original function should work as expected", function () {
		var result = path.parse('/test/path');
		assert(result.root === "/");
		assert(result.name === "path");
	});

	it("calling the function should hit the 'before' hook", function () {
		path.parse('/test/path');
		waitsFor(function () {
			return calledBefore === 'parse';
		}, "the calledBefore flag should be set to the function name", 1000);
	});

	it("calling the function should hit the 'after' hook", function () {
		path.parse('/test/path');
		waitsFor(function () {
			return calledAfter === 'parse';
		}, "the calledAfter flag should be set to the function name", 1000);
	});

	it("calling the function should hit the 'before' hook prior to the 'after'", function () {
		path.parse('/test/path');
		waitsFor(function () {
			return callSequence === 'BeforeAfter';
		}, "the callSequence should be set to BeforeAfter", 1000);
	});

	it("calling the function should give 'before' the correct argument", function () {
		path.parse('/test/path');
		waitsFor(function () {
			return calledWith.pathString === '/test/path';
		}, "calledWith should be set to the original arguments", 1000);
	});

	it("calling the function should give 'after' the correct result", function () {
		path.parse('/test/path');
		waitsFor(function () {
			return calledReturning.name === 'path';
		}, "calledReturning should be set to the correct result", 1000);
	});

	describe("and parameter substitutions are required", function () {

		it("the original function should be given a substitute object parameter", function () {
			path.basename('/path/file.ext', '.ext');
			waitsFor(function () {
				return calledWith.ext === '.SWITCHED';
			}, "calledWith should be given the switched parameter", 1000);
		});

		it("the original function should be given a substitute parameter via a function", function () {
			path.basename('/path/file.ext', '.ext');
			waitsFor(function () {
				return calledWith.path === '/PATH/FILE.EXT';
			}, "calledWith should be given the switched parameter", 1000);
		});

		it("the original function should return based on the substitutions", function () {
			console.log('GO!');
			path.basename('/path/file.switched', '.ext');
			waitsFor(function () {
				return calledReturning === 'FILE';
			}, "calledReturning should reflect the switched parameters", 1000);
		});

	});

});
