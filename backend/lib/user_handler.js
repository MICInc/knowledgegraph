var db = require('../db/database');
var format_user = require('../lib/format_user');

module.exports = {
	find_by_email: function(email, callback) {
		db.User.find({ email: email }, function(err, results) {
			callback(results);
		});
	},
	save: function(profile, callback) {
		var user = new db.User(format_user(profile));

		user.collection.dropIndexes(function(err, results) {
			if(err) {
				console.log('profile.js: '+err);
			}
		});

		user.save().then(item => {
			console.log('Saved profile: '+user._id.toString());
			callback(user._id.toString());
		}).catch(err => {
			console.log(err);
			callback(err);
		});
	}
}