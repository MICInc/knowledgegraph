var db = require('../db/database');
var crypto = require('crypto');
var mongoose = require('mongoose');
var utils = require('./utils');
var filter = require('./filter');
const token = require('./token');
const email = require('./email_handler');
const EXPIRE_DAYS = 48;
const VERI_LENG = 64;

module.exports = {
	format: function(profile) {
		/*
			user_type: 0 (general)
					   1 (moderator)
					   2 (admin)
		*/
		return {
			active: true,
			id: mongoose.Types.ObjectId(),
			affiliation: filter.filter_xss(profile.affiliation),
			bio: "",
			date_joined: new Date(),
			dob: profile.dob,
			email: profile.email,
			ethnicity: filter.filter_xss(profile.ethnicity),
			first_name: module.exports.format_name(filter.filter_xss(profile.first_name)),
			following: [],
			grade: filter.filter_xss(profile.grade),
			gender: filter.filter_xss(profile.gender),
			last_name: module.exports.format_name(filter.filter_xss(profile.last_name)),
			library: [],
			liked_articles: [],
			liked_papers: [],
			password_hash: '',
			rank: 0,
			salt: '',
			school: filter.filter_xss(profile.school),
			search_history: [],
			subjects: [],
			suspended: false,
			url: (profile.first_name+'-'+profile.last_name).toLowerCase(),
			user_type: 0,
			verification: { code: utils.uniqueID(VERI_LENG), date: new Date(), status: false }
		}
	},
	format_name: function(name) {
		return name.charAt(0).toUpperCase() + name.slice(1);
	},
	// TODO: Update module.exports to match model - replace defaults
	registerUser: function(profile, callback) {
		module.exports.isEmailTaken(profile.email, function(err, exists) {
			if(exists) {
				callback('Email already in use. Please login.', '', {});
				return;
			}

			var salt = crypto.randomBytes(VERI_LENG).toString('base64');

			// Hash password
			crypto.pbkdf2(profile.password, salt, 10000, VERI_LENG, 'sha512', function(err, key) {
				if(err) callback(err, '', null);
				else {
					var user = new db.User(module.exports.format(profile));
					user.salt = salt;
					user.password_hash = key.toString('hex');
					
					user.token = token.sign({ email: user.email }, user.email);

					user.collection.dropIndexes(function(err, results) {
						if(err) console.error(err);
					});

					user.save(function(err, profile) {
						if(err) console.error(err);
						else {
							var ver_url = utils.generate_verification_URL(innerText='here', hash=user.verification.code);
							message = email.verify_acct(user.first_name, ver_url, EXPIRE_DAYS);

							email.send(
								from=email.welcome.email, 
								to=user.email, 
								subject=email.welcome.subject, 
								message=message
							);

							// Successfully registered user
							process.nextTick(function() {
								callback(null, user.token, {
									id: user._id,
									first_name: user.first_name,
									last_name: user.last_name,
									email: user.email,
									sess_id: module.exports.start_session(user, user.token),
									url: user.url,
									picture: Object.keys(user.toObject()).includes('picture') ? user.picture.src : ''
								});
							});
						}
					});
				}
			});
		});
	},
	loginUser: function(email, password, callback) {
		db.User.findOne({ email: filter.filter_xss(email) }, function(err, user) {
			if(err) {
				console.error(err);
				callback({ msg: 'Login failed', code: 400 }, '', {});
				return;
			}

			if(!user.suspended) {
				callback({ msg: 'Account suspended', code: 400 });
				return;
			}
			
			// Remove error messages?
			if(!user.verification.status) {
				callback({ msg: 'Email has not been verified', code: 401 }, '', {});
				return;
			}

			if(user != null) {
				// Salt password to see if hashes will match with the user's salt
				crypto.pbkdf2(password, user.salt, 10000, VERI_LENG, 'sha512', function(err, key) {
					if(err) console.error(err);
					
					// Want a constant time string comparison
					if(user.password_hash == key.toString('hex')) {
						user.token = token.sign({ email: user.email }, user.email);

						process.nextTick(function() {
							callback(null, user.token, {
								id: user._id,
								first_name: user.first_name,
								last_name: user.last_name,
								email: user.email,
								sess_id: module.exports.start_session(user, user.token),
								url: user.url,
								picture: Object.keys(user.toObject()).includes('picture') ? user.picture.src : ''
							});
						});
					}
					else {
						process.nextTick(function() {
							callback({ msg: 'Password was incorrect', code: 400 }, '', null);
						});
					}
				});
			}
			else {
				process.nextTick(function() {
					callback({message: 'Could not find the user: ' + email}, null);
				});
			}
		});
	},
	find_by_email: function(email, callback) {
		if(typeof email == 'undefined') callback('Email undefined', {});

		var email = filter.filter_xss(email);
		db.User.findOne({ email: email }, function(err, user) {
			process.nextTick(function() {
				callback(err, user);
			});
		});
	},
	findById: function(id, callback) {
		db.User.findOne({ _id: filter.filter_xss(id) }, function(err, user) {
			process.nextTick(function() {
				callback(err, user);
			});
		});
	},
	findAllById: function(users, callback) {
		db.User.find({ _id: { $in : users }}, function(err, profiles) {
			process.nextTick(function() {
				callback(err, profiles);
			});
		});
	},
	find_by_url: function(url, callback) {
		db.User.findOne({ url: filter.filter_xss(url) }, function(err, user) {
			process.nextTick(function() {
				callback(err, user);
			});
		});
	},
	isEmailTaken: function(email, callback) {
		module.exports.find_by_email(filter.filter_xss(email), function(err, user) {
			callback(err, user != null);
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
	verify_token(t, email, callback) {
		if(t == null || t.length == 0) callback(new Error('Empty token'), null);
		else token.verify(t, email, callback);
	},
	is_editable(token, email, page, callback) {

		module.exports.verify_token(token, email, function(err, decoded) {
			if(err) callback(false);
			else {
				module.exports.find_by_email(email, function(err, user) {
					if(err) callback(false);
					else callback(user.url == page.url);
				});
			}
		});
	},
	is_article_editable(token, email, article, callback) {
		// is this a valid user
		module.exports.verify_token(token, email, function(err, decoded) {
			if(err) callback(false);
			else {
				// if a valid user and this user's profile contains the article they're currently viewing
				module.exports.find_by_email(email, function(err, user) {
					callback(user.publications.filter((obj) => obj.id === article._id).length == 1);
				});
			}
		});
	},
	get_token(email, callback) {
		callback(token.sign({ email: email }, email));
	},
	deactivate(email, callback) {
		db.User.findOne(email, function(err, profile) {
			if(!err) {
				profile.active = false;
				db.User.updateOne(email, profile, function(err) {
					if(err) console.error(err);
				});
				
				callback(true);
				return;
			}
			callback(false);
		});
	},
	update_password(email, curr_pw, new_pw, conf_pw, callback) {
		if(new_pw != conf_pw) {
			callback('Passwords did not match', false);
			return;
		}

		db.User.findOne(email, function(err, profile) {
			if(err) {
				callback('User does not exist', false);
				return;
			}

			// check current password
			crypto.pbkdf2(curr_pw, profile.salt, 10000, VERI_LENG, 'sha512', function(err, key) {
				if(err) {
					console.error(err);
					callback('Unexpected error', false);
					return;
				}
				
				if(profile.password_hash == key.toString('hex')) {
					var salt = crypto.randomBytes(VERI_LENG).toString('base64');

					crypto.pbkdf2(new_pw, salt, 10000, VERI_LENG, 'sha512', function(err, new_key) {
						if(err) {
							console.error(err);
							callback('Unexpected error', false);
							return;
						}

						profile.salt = salt;
						profile.password_hash = new_key.toString('hex');

						db.User.updateOne(email, profile, function(err) {
							if(err) {
								console.error(err);
								callback('Unexpected error', false);
								return;
							}
							callback('Updated', true);
						});
					});
				}
				else {
					process.nextTick(function() {
						callback({message: 'Password was incorrect'}, '', null);
					});
				}
			});
		});
	},
	verify_email_url(code, callback) {
		db.User.findOne({ 'verification.code': code, 'verification.status': false }, function(err, user) {

			if(err) {
				console.error(err);
				callback(false, '', {});
				return;
			}

			if(user == null) {
				callback(false, '', {});
				return;
			}

			var diff = Math.abs((new Date()).getTime() - user.verification.date.getTime());
			var days = Math.ceil(diff / (1000 * 3600 * EXPIRE_DAYS));

			if(days >= 2) {
				callback(false, '', {});
				return;
			}
			
			user.verification.status = true;
			user.verification.code = '';
			user.token = token.sign({ email: user.email }, user.email);

			db.User.updateOne({_id: user._id }, user, function(err) {
				if(err) console.error(err);
				else process.nextTick(function() {
					callback(true, user.token, {
						id: user._id,
						first_name: user.first_name,
						last_name: user.last_name,
						email: user.email,
						sess_id: module.exports.start_session(user, user.token),
						url: user.url,
						picture: Object.keys(user.toObject()).includes('picture') ? user.picture.src : ''
					});
				});
			});
		});
	},
	send_verify_email(email_addr, callback) {
		db.User.findOne({ email: email_addr }, function(err, user) {
			if(err) {
				console.error(err);
				callback(false);
				return;
			}

			if(user.verification.status) {
				callback(true);
				return;
			}

			// Update verification code and expiration date
			var code = utils.uniqueID(128)
			user.verification = { code: code, date: new Date(), status: false };

			db.User.updateOne({ _id: user._id }, user, function(err) {
				if(err) console.error(err);

				var ver_url = utils.generate_verification_URL(innerText='here', hash=user.verification.code);
				message = email.verify_acct(user.first_name, ver_url, EXPIRE_DAYS);

				email.send(
					from=email.welcome.email, 
					to=user.email, 
					subject=email.welcome.subject, 
					message=message
				);

				callback(true);
			});
		});
	},
	reset_login(email, callback) {
		db.User.find({ email: email }, function(err, user) {
			if(err) {
				console.error(err);
				callback(false);
				return;
			}

			var password = utils.uniqueID(VERI_LENG);
			user.salt = crypto.randomBytes(VERI_LENG).toString('base64');

			// Hash password
			crypto.pbkdf2(password, user.salt, 10000, VERI_LENG, 'sha512', function(err, key) {
				if(err) callback(err, '', null);
				else {
					user.password_hash = key.toString('hex');

					db.User.updateOne({ _id: user._id }, user, function(err) {
						if(err) console.error(err);

						var subject = email.pw_reset.subject;
						var message = 'Your new password: ${password}<br>Please login and change your password.<br><br>The Machine Intelligence Community Team'
						
						email.send(
							from=email.pw_reset.email, 
							to=user.email, 
							subject=subject, 
							message=message
						);

						callback(true);
					});
				}
			});
		});
	}
};