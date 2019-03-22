var db = require('../db/database');

module.exports = {
	// Verify token before accessing this API
	verify_access_level: function(email, callback) {
		db.User.findOne({ email: email }, function(err, profile) {
			callback(err, profile.user_type == 2);
		});
	}
}