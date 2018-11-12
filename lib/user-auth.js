var User = require('../db/models/user.js');
var crypto = require('crypto');

function handleError(err) {
	console.log(err);
}

module.exports = {
	
	registerUser: function(firstname, lastname, email, password, callback) {
		var self = this;
				
		self.isEmailTaken(email, function(isEmailTaken) {
			if(!isEmailTaken) {
				// Username and Email are unique
				var salt = crypto.randomBytes(64).toString('base64');

				// Hash password
				crypto.pbkdf2(password, salt, 10000, 64, 'sha512', function(err, key){
					if (err) handleError(err);

					var newUser = new User({
						firstname: firstname,
						lastname: lastname,
						email: email,
						passwordHash: key.toString('hex'),
						salt: salt
					});

					newUser.save(function(err, user) {
						if (err) handleError(err);
						// Successfully registered user
						process.nextTick(function() {
							callback(null, user);
						});
					});
				});
			} else {
				process.nextTick(function() {
					callback({message: 'Email is in use.'}, null);
				});
			}
		});
	},

	loginUser: function(email, password, callback) {
		User.findOne({email: email}, function(err, user) {
			if (err) handleError(err);

			if (user != null) {
				// Salt password to see if hashes will match with the user's salt
				crypto.pbkdf2(password, user.salt, 10000, 64, 'sha512', function(err, key){
					if (err) handleError(err);

					if (user.passwordHash == key.toString('hex')) {
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
		User.findOne({email: email}, function(err, user) {
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