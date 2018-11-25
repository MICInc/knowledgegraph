var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../db/database');
var format_user = require('../lib/format_user');

router.post('/', function(req, res) {
	var user = new db.User(format_user(req));

	user.collection.dropIndexes(function(err, results) {
		if(err) {
			console.log('profile.js: '+err);
		}
	});

	user.save()
	.then(item => {
		console.log('Saved');
		res.send('User saved to db');
	})
	.catch(err => {
		console.log(err);
		res.status(400).send('Save error');
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