var assert = require('assert');
var wrap = require('../index');

// For testing against.
var path = require('path');

// Flags to catch the results for checking.
var calledBefore, calledWith, calledAfter, calledReturning, callSequence;

// Create functions to be called before/after a wrapped one.
// These will update the flags to allow testing.
var beforeFunc = function(name, args) {
	calledBefore = name;
	calledWith = args;
	callSequence += 'Before';
};
var afterFunc = function(name, result) {
	calledAfter = name;
	calledReturning = result;
	callSequence += 'After';
};

// Wrap it for the tests.
wrap(path, beforeFunc, afterFunc);

describe("when nowrap is attached", function() {

	beforeEach(function(){
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

	it("calling the function should hit the 'before' hook", function() {
		path.parse('/test/path');
		waitsFor(function(){
			return calledBefore === 'parse';
		}, "the calledBefore flag should be set to the function name", 1000);
	});

	it("calling the function should hit the 'after' hook", function() {
		path.parse('/test/path');
		waitsFor(function(){
			return calledAfter === 'parse';
		}, "the calledAfter flag should be set to the function name", 1000);
	});

	it("calling the function should hit the 'before' hook prior to the 'after'", function() {
		path.parse('/test/path');
		waitsFor(function(){
			return callSequence === 'BeforeAfter';
		}, "the callSequence should be set to BeforeAfter", 1000);
	});

	it("calling the function should give 'before' the correct argument", function() {
		path.parse('/test/path');
		waitsFor(function(){
			return calledWith.pathString === '/test/path';
		}, "calledWith should be set to the original arguments", 1000);
	});

	it("calling the function should give 'after' the correct result", function() {
		path.parse('/test/path');
		waitsFor(function(){
			return calledReturning.name === 'path';
		}, "calledReturning should be set to the correct result", 1000);
	});

});
