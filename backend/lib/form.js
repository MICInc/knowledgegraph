module.exports = {
	is_complete: function(form) {
		var errors = {};
		var keys = Object.keys(form);

		for(var i in keys) errors[keys[i]] = (typeof form[keys[i]] == 'string' && form[keys[i]].length == 0) || !form[keys[i]];
		for(var i in errors) {
			if(errors[i]) {
				return { ok: false, errors: errors };
			}
		}
	}
}