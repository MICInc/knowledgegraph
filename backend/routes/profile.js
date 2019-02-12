var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../db/database');
var uh = require('../lib/user_handler');

router.post('/', function(req, res) {
	// TODO: should validate email address before querying
	uh.find_by_email(req.body.email.value, function(results) {
		if(results.length == 0) {
			uh.save(req.body, function(user_id) {
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