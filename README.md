# NoWrap
## Wraps the top level functions of an object to allow before/after intercepts.

[By K Cartlidge](http://www.kcartlidge.com).

### Licence

[MIT Licence (very permissive)](http://opensource.org/licenses/MIT).
[See the GitHub licence summary bullet points here](http://choosealicense.com/licenses/mit/).

A copy of the licence is within the package source.

### Current Status

* Tested and fully usable.
* Coming shortly - live parameter substitutions.

### What Problem does it Solve?

It allows you to intercept calls to functions (on your own objects/modules
or core/third party ones) and register handlers which get called before
and/or after the intercepted one.

The real thing behaves as normal. Your *before* hook is told all the original
parameters. Your *after* hook is told the result.

## Installation

It's an npm module:

	npm install nowrap

## Usage:

Require *nowrap* and the thing you want to wrap:

	var wrap = require('nowrap');
	
	// Load a module to use as an example.
	var path = require('path');

Create either/both your *before* and *after* hooks:

	// Create a function to be called before a wrapped one.
	var beforeFunc = function(name, args) {
		console.log("Calling '" + name + "' with ", args);
	};
	
	// Create a function to be called after a wrapped one.
	var afterFunc = function(name, result) {
		console.log("It returned the caller ", result);
	};

Wrap the thing and use it:

	// Wrap the main functions and re-run.
	wrap(path, beforeFunc, afterFunc);
	var result = path.parse('/test/path');

The args passed to the *before* function, being an associative
array, can also be accessed as so:

	var beforeFunc = function(name, args) {
		console.log(args.pathString);
	};

## Test Coverage

You can run the tests using *npm*:

	npm test

## Examples

[You can try it live on the npm page](https://www.npmjs.com/package/nowrap).
This will run the *tonic-example.js* file (which is included).

There is an *example* folder which contains a trivial but
demonstrative example:

	npm run example
