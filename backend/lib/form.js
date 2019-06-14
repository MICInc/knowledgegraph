var filter = require('./filter');

module.exports = {
	is_complete: function(form) {
		var errors = {};
		var keys = Object.keys(form);
		// errors should contain true if there IS an erorr
		// ok indicates if the given FORM is OK
		for(var i = 0; i < keys.length; i++) errors[keys[i]] = { ok: module.exports.is_empty(form[keys[i]]), desc: '' };
		for(var i in errors) if(errors[i].ok) return { ok: false, errors: errors };

		return { ok: true, errors: errors };
	},
	is_empty: function(data) {
		if(typeof data === undefined && data) return true;
		if(typeof data == 'string' && filter.filter_xss(data).length == 0) return true;
		if(typeof data === 'object' && data == null) return true;
		if(Object.keys(data).length === 0 && data.constructor === Object) return true;
		if(Array.isArray(data) && data.length == 0) return true;
		if(Array.isArray(data)) for(var i in data) return module.exports.is_empty(data[i]);
		if(typeof data == 'string' && filter.filter_xss(data).length > 0) return false;

		var empty = false;
		for(var j in data) return empty || module.exports.is_empty(data[j]);
	}
}