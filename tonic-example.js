/*
 Tonic dumps the final result to the console itself, which
 is why it shows again following the 'after' hook.
 */

var wrap = require('./index');

// Load a module to use as an example.
var path = require('path');

// Create a function to be called before a wrapped one.
var beforeFunc = function (name, args) {
	console.log("Actually calling '" + name + "' with ", args);
};

// Create a function to be called after a wrapped one.
var afterFunc = function (name, result) {
	console.log("The call returned:", result);
};

// Sample substitutions.
// The path goes uppercase., which means 'file' also becomes 'FILE'.
// The ext becomes 'ORIGINAL', which then matches the input and so is removed.
var substitutions = {
	basename: {
		path: function(original) {
			return original.toUpperCase();
		},
		ext: '.ORIGINAL'
	}
};

// Wrap the main functions and re-run.
wrap(path, beforeFunc, afterFunc, substitutions);
console.log("Appears to be calling 'basename' with ('/path/file.original', '.ext').");
var result = path.basename('/path/file.original', '.ext');

/*
The existing path.basename takes 2 parameters. The first is
the complete path & file name, and the second is an extention.
It returns the filename without the path. If the extention
matches that provided as the second parameter it is stripped
from the resulting file.

The normal return for the sample call would be 'file.original'
which is the path/file given, minus the path, and including the
extention as it does not match the parameter value of '.ext'.

The substitution means effectively the call translates to:
  path.basename('/PATH/FILE.ORIGINAL', '.ORIGINAL')
Now, therefore, the extention matches. The path is dropped
and we get back the filename of 'FILE'.

The before and after functions here just display activity.
*/
