var wrap = require('nowrap');

// Load a module to use as an example.
var path = require('path');

// Create a function to be called before a wrapped one.
var beforeFunc = function(name, args) {
	console.log("Calling '" + name + "' with ", args);
};

// Create a function to be called after a wrapped one.
var afterFunc = function(name, result) {
	console.log("It returned the caller ", result);
};

// Wrap the main functions and re-run.
wrap(path, beforeFunc, afterFunc);
var result = path.parse('/test/path');
