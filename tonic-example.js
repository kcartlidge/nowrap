/*
 Tonic dumps the final result to the console itself, which
 is why it shows again following the 'after' hook.
 */

var wrap = require('nowrap');

// Load a module to use as an example.
var path = require('path');

// Create a function to be called before a wrapped one.
var beforeFunc = function (name, args) {
	console.log("Calling '" + name + ".");
	console.log(args);
};

// Create a function to be called after a wrapped one.
var afterFunc = function (name, result) {
	console.log("It returned from the caller.");
	console.log(result);
};

// Wrap the main functions and re-run.
wrap(path, beforeFunc, afterFunc);
var result = path.parse('/test/path');
