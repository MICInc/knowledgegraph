var express = require('express');
var router = express.Router();
var UserAuth = require('../lib/user-auth');
var admin = require('../lib/admin');

router.post('/', function(req, res) {
	var data = req.body;
	var token = data.token;
	var email = data.email;
	
	if(token == null || email == null) {
		res.status(401).send('unauthorized');
		return;
	}

	UserAuth.verify_token(token, email, function(err, decoded) {
		if(err) {
			console.error(err);
			res.status(401).send('unauthorized');
			return;
		}

		admin.verify_access_level(email, function(err, ok) {
			if(err || !ok) res.status(401).send('unauthorized');
			else res.status(200).send({ status: ok });
		});
	});
});

module.exports = router;