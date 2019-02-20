module.exports = {
	is_complete: function(form) {
		var errors = {};
		var keys = Object.keys(form);

		for(var i in keys) errors[keys[i]] = !form[keys[i]];

		for(var i in errors) {
			if(errors[i]) {
				return { ok: false, errors: errors };
			}
		}
	}
}