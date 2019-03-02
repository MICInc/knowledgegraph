var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../db/database');
var ua = require('../lib/user-auth');

router.post('/', function(req, res) {
	// TODO: should validate email address before querying
	ua.isEmailTaken(req.body.email.value, function(results) {
		if(results.length == 0) {
			ua.registerUser(req.body, function(user_id) {
				res.send(user_id);
			});
		}
		else {
			res.status(400).send('Email already in use.');
		}
	});
});

router.get('/', function(req, res) {
	query = {};
	// console.log(req.query.url);

	db.User.find(query, function(err, results) {
		console.log(results);
		res.send(results);
	});
});

router.post('/library/clear', function(req, res) {
	var user_id = { _id: req.body.user_id };

	console.log(user_id)

	db.User.findOne(user_id, function(err, profile) {
		console.log(profile);
		profile.library = [];

		db.User.updateOne(user_id, profile, function(err) {
			if(err) console.error(err);
			else res.status(200).send('cleared');
		});
	});
});


module.exports = router;