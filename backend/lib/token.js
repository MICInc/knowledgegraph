var fs = require('fs');
var jwt = require('jsonwebtoken');
const expiration = "336h";
const audience = "https://machineintelligence.cc";
const algorithm = "RS256";
const issuer = "Machine Intelligence Community";

/*
	Steps for generating ssh key in pem format without passphrase:
	1. openssl genrsa -out private.pem 2048
	2. openssl rsa -in private.pem -outform PEM -pubout -out public.pem
*/
const private_key = fs.readFileSync(__dirname+'/../config/private.pem', 'utf8');
const public_key = fs.readFileSync(__dirname+'/../config/public.pem', 'utf8');

module.exports = {
	decode: function(token) {
		return jwt.decode(token, {complete: true});
	},
	sign: function(payload, user) {
		var signOpt = {
			issuer: issuer,
			subject: user,
			audience: audience,
			expiresIn: expiration,
			algorithm: algorithm
		}

		return jwt.sign(payload, private_key, signOpt);
	},
	verify: function(token, user, callback) {
		verifyOpt = {
			issuer: issuer,
			subject: user,
			audience: audience,
			expiresIn: expiration,
			algorithms: [algorithm]
		}

		jwt.verify(token, public_key, verifyOpt, callback);
	}
}