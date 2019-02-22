module.exports = {
	is_complete: function(form) {
		// errors should contain true if there IS an erorr
		var errors = {};
		var keys = Object.keys(form);

		for(var i in keys) errors[keys[i]] = (typeof form[keys[i]] == 'string' && form[keys[i]].length == 0) || !form[keys[i]];
		for(var i in errors) {
			if(errors[i]) {
				// ok indicates if the given FORM is OK
				return { ok: false, errors: errors };
			}
		}
		return { ok: true, errors: {} };
	}
}