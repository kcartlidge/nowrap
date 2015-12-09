var _ = require('lodash');
var argsList = require('args-list');

var wrapper = {
	wrap: function (subject, before, after) {

		// Wrap up each function on the subject.
		_.each(_.functions(subject), function (func) {

			// Copy the original function.
			var original = subject[func];
			var params = argsList(original);

			// Create a new proxy variant.
			subject[func] = function () {

				// Gather all arguments as an associated array/object.
				var rawArgs = arguments;
				var args = [];
				var idx = 0;
				_.each(params, function (param) {
					args[param] = rawArgs[idx];
					idx++;
				});

				// Call any 'before' handler, passing the name and keyed arguments.
				if (before) {
					before(func, args);
				}

				// Do the original operation.
				var result = original.apply(this, arguments);

				// Call any 'after' handler, passing the name and any result.
				if (after) {
					after(func, result);
				}

				// Return the result as per the original subject.
				return result;
			};
		});

		// Return the wrapped/proxy subject.
		return subject;
	}
};

module.exports = wrapper.wrap;
