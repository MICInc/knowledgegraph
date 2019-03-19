var fs = require('fs');
var jwt = require('jsonwebtoken');

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
			issuer: "Machine Intelligence Community",
			subject: user,
			audience: "http://machineintelligence.cc",
			expiresIn: "24h",
			algorithm: "RS256"
		}

		return jwt.sign(payload, private_key, signOpt);
	},
	verify: function(token, user, callback) {
		verifyOpt = {
			issuer: "Machine Intelligence Community",
			subject: user,
			audience: "http://machineintelligence.cc",
			expiresIn: "24h",
			algorithms: ["RS256"]
		}

		// try {
		// 	return jwt.verify(token, public_key, verifyOpt);
		// }
		// catch(err) {
		// 	return err;
		// }
		jwt.verify(token, public_key, verifyOpt, callback);
	}
}