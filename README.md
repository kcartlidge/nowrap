# NoWrap v0.3.2
## Wraps the top level functions of an object to allow before/after intercepts. Supports parameter substitutions via value or function.

[By K Cartlidge](http://www.kcartlidge.com).

### Licence

[MIT Licence (very permissive)](http://opensource.org/licenses/MIT).
[See the GitHub licence summary bullet points here](http://choosealicense.com/licenses/mit/).

A copy of the licence is within the package source.

### Current Status

* Tested and working.
* Includes optional parameter substitutions.

### What Problem does it Solve?

It allows you to intercept calls to functions (on your own objects/modules
or core/third party ones) and register handlers which get called before
and/or after the intercepted one.

The real thing behaves as normal. Your *before* hook is told all the original
parameters. Your *after* hook is told the result.

## Installation

It's an npm module:

``` sh
npm install nowrap
```

## Usage:

Require *nowrap* and the thing you want to wrap:

``` javascript
var wrap = require('nowrap');

// Load a module to use as an example.
var path = require('path');
```

Create either/both your *before* and *after* hooks:

``` javascript
// Create a function to be called before a wrapped one.
var beforeFunc = function (name, args) {
	console.log("Actually calling '" + name + "' with ", args);
};

// Create a function to be called after a wrapped one.
var afterFunc = function (name, result) {
	console.log("The call returned:", result);
};
```

Create any *substitutions* required for parameters.
Using these, you can dynamically alter what the function
is given and so influence the result:

``` javascript
// The path goes uppercase.
// The ext becomes '.ORIGINAL'.
var substitutions = {
	basename: {
		path: function(original) {
			return original.toUpperCase();
		},
		ext: '.ORIGINAL'
	}
};
```
This is an object whose top level name should be the name
of the function for which the substitution occurs. Within
that, the next nested name is the parameter name and the
that contains the value to be fed to the parameter.

If the value is anything *other* than a function it is fed
in unchanged. If it is a *function* it is called with the value
that would normally be passed at this time, and is expected to
then return a replacement for passing in instead.

In the example above, when *basename.path('file.original','.ext')* is called
then 'file.original' is changed to 'FILE.ORIGINAL' via the function and '.ext' is changed
to '.ORIGINAL' via the value substitution.

Wrap the thing and use it:

``` javascript
// Wrap the main functions and re-run.
wrap(path, beforeFunc, afterFunc, substitutions);
console.log("Appears to be calling 'basename' with ('/path/file.original', '.ext').");
var result = path.basename('/path/file.original', '.ext');
```

The output is similar to:

	Appears to be calling 'basename' with ('/path/file.original', '.ext').
	Actually calling 'basename' with  [ path: '/PATH/FILE.ORIGINAL', ext: '.ORIGINAL' ]
	The call returned: FILE

The args passed to the *before* function, being an associative
array, can also be accessed as so:

``` javascript
var beforeFunc = function(name, args) {
	console.log(args.path);
};
```

## Test Coverage

You can run the tests using *npm*:

``` sh
npm test
```

## Examples

[You can try it live on the npm page](https://www.npmjs.com/package/nowrap).
This will run the *tonic-example.js* file (which is included).
