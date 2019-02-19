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


module.exports = router;