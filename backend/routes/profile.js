var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../db/database');
var ua = require('../lib/user-auth');
var jwt = require('jsonwebtoken');

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
	db.User.findOne({ url: req.query.url }, function(err, profile) {
		if(profile) res.status(200).send(profile);
		else res.status(400).send();
	});
});

router.post('/library/clear', function(req, res) {
	var user_id = { _id: req.body.user_id };

	db.User.findOne(user_id, function(err, profile) {
		if(err) console.error(err);
		else {
			profile.library = [];

			db.User.updateOne(user_id, profile, function(err) {
				if(err) console.error(err);
				else res.status(200).send('cleared');
			});
		}
	});
});

router.post('/picture', function(req, res) {
	var user_id = { _id: req.body.user_id };

	db.User.findOne(user_id, function(err, profile) {
		if(err) console.error(err);
		else {
			profile.picture = { src: req.body.src, name: req.body.name, last_modified: req.body.last_modified };

			db.User.updateOne(user_id, profile, function(err) {
				if(err) console.error(err);
				else res.status(200).send('uploaded');
			});
		}
	});
});

router.get('/picture', function(req, res) {
	var query = { _id: req.query.user_id, token: req.query.token };
	
	db.User.findOne(query, function(err, profile) {
		if(err) console.error(err);
		if(profile) res.status(200).send({ src: profile.picture.src });
		else res.status(200).send({ src: '' });
	});
});


module.exports = router;