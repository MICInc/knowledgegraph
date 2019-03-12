module.exports = {
	is_complete: function(form) {
		// errors should contain true if there IS an erorr
		var errors = {};
		var keys = Object.keys(form);

		for(var i in keys) errors[keys[i]] = module.exports.is_empty(form[keys[i]]);

		for(var i in errors) {
			if(errors[i]) {
				// ok indicates if the given FORM is OK
				return { ok: false, errors: errors };
			}
		}
		return { ok: true, errors: {} };
	},
	is_empty: function(data) {
		if(typeof data == 'string' && data.length == 0) return true;
		if(typeof data === 'object' && data == null) return true;
		if(Object.keys(data).length === 0 && data.constructor === Object) return true;
		if(Array.isArray(data) && data.length == 0) return true;
		if(Array.isArray(data)) for(var i in data) return module.exports.is_empty(data[i]);

		var empty = false;
		for(var j in data) return empty || module.exports.is_empty(data[j]);
	}
}