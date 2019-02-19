var db = require('../db/database');
var crypto = require('crypto');
var mongoose = require('mongoose');

function handleError(err) {
	console.log(err);
}

module.exports = {
	filter: function(data) {
		// TODO: Extend to filter for real names and profanity
		return data == null ? '' : data.value;
	},
	format: function(profile) {
		return {
			id: mongoose.Types.ObjectId(),
			affiliation: module.exports.filter(profile.affiliation),
			bio: "",
			date_joined: new Date(),
			dob: profile.dob.value,
			email: profile.email.value,
			ethnicity: module.exports.filter(profile.ethnicity),
			first_name: module.exports.filter(profile.first_name),
			following: [],
			grade: module.exports.filter(profile.grade),
			gender: module.exports.filter(profile.gender),
			last_name: module.exports.filter(profile.last_name),
			library: [],
			liked_articles: [],
			liked_papers: [],
			password_hash: '',
			rank: 0,
			salt: '',
			school: module.exports.filter(profile.school),
			search_history: [],
			subjects: [],
			url: (profile.first_name.value+'-'+profile.last_name.value).toLowerCase()
		}
	},
	// TODO: Update module.exports to match model - replace defaults
	registerUser: function(profile, callback) {
		// Username and Email are unique
		var salt = crypto.randomBytes(64).toString('base64');

		// Hash password
		crypto.pbkdf2(profile.password.value, salt, 10000, 64, 'sha512', function(err, key) {
			if (err) handleError(err);

			var user = new db.User(module.exports.format(profile));
			user.salt = salt;
			user.password_hash = key.toString('hex');

			user.collection.dropIndexes(function(err, results) {
				if(err) {
					console.log('content.js: '+err);
				}
			});

			user.save(function(err, user) {
				if (err) handleError(err);
				// Successfully registered user
				process.nextTick(function() {
					callback(null, user);
				});
			});
		});
	},

	loginUser: function(email, password, callback) {
		User.findOne({email: email}, function(err, user) {
			if (err) handleError(err);

			if (user != null) {
				// console.log(user)
				// Salt password to see if hashes will match with the user's salt
				crypto.pbkdf2(password, user.salt, 10000, 64, 'sha512', function(err, key){
					if (err) handleError(err);
					
					if (user.password_hash == key.toString('hex')) {
						process.nextTick(function() {
							callback(null, user);
						});
					} else {
						process.nextTick(function() {
							callback({message: 'Password was incorrect'}, null);
						});
					}
				});
			} else {
				process.nextTick(function() {
					callback({message: 'Could not find the user: ' + email}, null);
				});
			}
		});
	},

	isEmailTaken: function(email, callback) {
		db.User.findOne({email: email}, function(err, user) {
			if (err) handleError(err);

			if (user != null) {
				process.nextTick(function() {
					callback(true);
				});
			
			} else {
				process.nextTick(function() {
					callback(false);
				});
			}
		});
	},
};