var db = require('../db/database');
var crypto = require('crypto');
var mongoose = require('mongoose');
var utils = require('./utils');

module.exports = {
	filter: function(data) {
		// TODO: Extend to filter for real names and profanity
		return data == null ? '' : data;
	},
	format: function(profile) {
		return {
			id: mongoose.Types.ObjectId(),
			affiliation: module.exports.filter(profile.affiliation),
			bio: "",
			date_joined: new Date(),
			dob: profile.dob,
			email: profile.email,
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
			url: (profile.first_name+'-'+profile.last_name).toLowerCase()
		}
	},
	// TODO: Update module.exports to match model - replace defaults
	registerUser: function(profile, callback) {
		// Username and Email are unique
		var salt = crypto.randomBytes(64).toString('base64');

		// Hash password
		crypto.pbkdf2(profile.password, salt, 10000, 64, 'sha512', function(err, key) {
			if (err) console.error(err);

			var user = new db.User(module.exports.format(profile));
			user.salt = salt;
			user.password_hash = key.toString('hex');

			user.collection.dropIndexes(function(err, results) {
				if(err) {
					console.log('content.js: '+err);
				}
			});

			user.save(function(err, user) {
				if (err) console.error(err);
				// Successfully registered user
				process.nextTick(function() {
					callback(null, user);
				});
			});
		});
	},
	loginUser: function(email, password, callback) {
		db.User.findOne({email: email}, function(err, user) {
			if (err) console.error(err);

			if (user != null) {
				// Salt password to see if hashes will match with the user's salt
				crypto.pbkdf2(password, user.salt, 10000, 64, 'sha512', function(err, key){
					if (err) console.error(err);
					
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
	findByEmail: function(email, callback) {
		db.User.findOne({email: email}, function(err, user) {
			if (err) console.error(err);

			process.nextTick(function() {
				callback(user);
			});
		});
	},
	isEmailTaken: function(email, callback) {
		module.exports.findByEmail({email: email}, function(user) {
			callback(user != null);
		});
	},
	startSession: function(user) {
		// May want to have user send back a date object beforeDestroyed to get a more accurate time
		var sess_id = utils.uniqueID();
		
		user.session_history.push({ sess_id: sess_id, start: new Date(), end: undefined });
		db.User.updateOne({ _id: user._id }, user, function(err) {
			if(err) console.error(err);
		});

		return sess_id;
	},
	endSession: function(user) {
		// May want to have user send back a date object beforeDestroyed to get a more accurate time
		var user_id = {_id: user.id};

		db.User.findOne(user_id, function(err, profile) {
			if(profile != null) {
				var index = utils.indexOf(profile.session_history, 'sess_id', user.sess_id);
				if(index > -1) {
					profile.session_history[index]['end'] = new Date();

					db.User.updateOne(user_id, profile, function(err) {
						if(err) console.error(err);
					});
				}
			}
		});
	},
	resetPassword() {
		return utils.uniqueID(15);
	}
};