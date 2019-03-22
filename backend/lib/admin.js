var db = require('../db/database');

module.exports = {
	// Verify token before accessing this API
	verify_access_level: function(email, callback) {
		db.User.findOne({ email: email }, function(err, profile) {
			/*
			user_type: 0 (general)
					   1 (moderator)
					   2 (admin)
			*/
			callback(err, profile.user_type == 2);
		});
	}
}