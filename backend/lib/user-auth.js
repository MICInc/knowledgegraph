var db = require('../db/database');
var crypto = require('crypto');
var mongoose = require('mongoose');
var utils = require('./utils');
var filter = require('./filter');
var fs = require('fs');
var jwt = require('jsonwebtoken');
const private_key = fs.readFileSync('./config/private.pem', 'utf8');
const public_key = fs.readFileSync('./config/public.pem', 'utf8');

module.exports = {
	format: function(profile) {
		return {
			id: mongoose.Types.ObjectId(),
			affiliation: filter.filter_xss(profile.affiliation),
			bio: "",
			date_joined: new Date(),
			dob: profile.dob,
			email: profile.email,
			ethnicity: filter.filter_xss(profile.ethnicity),
			first_name: filter.filter_xss(profile.first_name),
			following: [],
			grade: filter.filter_xss(profile.grade),
			gender: filter.filter_xss(profile.gender),
			last_name: filter.filter_xss(profile.last_name),
			library: [],
			liked_articles: [],
			liked_papers: [],
			password_hash: '',
			rank: 0,
			salt: '',
			school: filter.filter_xss(profile.school),
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
			if(err) callback(err, '', null);
			else {
				var user = new db.User(module.exports.format(profile));
				user.salt = salt;
				user.password_hash = key.toString('hex');
				var signOpt = {
					issuer: "Machine Intelligence Community",
					subject: profile.email,
					audience: "http://machineintelligence.cc",
					expiresIn: "24h",
					algorithm: "RS256"
				};

				user.token = jwt.sign({ email: profile.email }, private_key, signOpt);

				user.collection.dropIndexes(function(err, results) {
					if(err) console.error(err);
				});

				user.save(function(err, profile) {
					if(err) console.error(err);
					else {
						// Successfully registered user
						process.nextTick(function() {
							callback(null, user.token, {
									id: user._id,
									first_name: user.first_name,
									last_name: user.last_name,
									sess_id: module.exports.start_session(user, user.token),
									url: user.url,
									picture: Object.keys(user.toObject()).includes('picture') ? user.picture.src : ''
								}
							);
						});
					}
				});
			}
		});
	},
	loginUser: function(email, password, callback) {
		db.User.findOne({ email: filter.filter_xss(email) }, function(err, user) {
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
		db.User.findOne({ email: filter.filter_xss(email) }, function(err, user) {
			if (err) console.error(err);

			process.nextTick(function() {
				callback(user);
			});
		});
	},
	findById: function(id, callback) {
		db.User.findOne({ _id: filter.filter_xss(id) }, function(err, user) {
			if(err) console.error(err);

			process.nextTick(function() {
				callback(user);
			});
		});
	},
	findAllById: function(users, callback) {
		db.User.find({ _id: { $in : users }}, function(err, profiles) {
			if(err) console.error(err);
			callback(profiles);
		});
	},
	isEmailTaken: function(email, callback) {
		module.exports.findByEmail(filter.filter_xss(email), function(user) {
			callback(user != null);
		});
	},
	start_session: function(user, token) {
		// May want to have user send back a date object beforeDestroyed to get a more accurate time
		var sess_id = utils.uniqueID();
		
		user.session_history.push({ sess_id: sess_id, start: new Date(), end: undefined });
		user.token = token;

		db.User.updateOne({ _id: user._id }, user, function(err) {
			if(err) console.error(err);
		});

		return sess_id;
	},
	end_session: function(user) {
		// May want to have user send back a date object beforeDestroyed to get a more accurate time
		var user_id = { _id: user.id };

		db.User.findOne(user_id, function(err, profile) {
			if(profile != null) {
				profile.token = '';
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