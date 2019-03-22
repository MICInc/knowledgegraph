var express = require('express');
var router = express.Router();
var UserAuth = require('../lib/user-auth');
var admin = require('../lib/admin');

router.post('/', function(req, res) {
	var data = req.body;
	var token = data.token;
	var email = data.email;
	
	if(token == null || email == null) {
		res.status(400).send('Access denied');
		return;
	}

	UserAuth.verify_token(token, email, function(err, decoded) {
		if(err) {
			console.error(err);
			res.status(400).send('Access denied');
			return;
		}

		admin.verify_access_level(email, function(err, ok) {
			if(err || !ok) res.status(400).send('Access denied');
			else res.status(200).send({ status: ok });
		});
	});
});

module.exports = router;