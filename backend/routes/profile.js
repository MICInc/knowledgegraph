var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../db/database');


router.post('/', function(req, res) {
	console.log(req.body);
	var data = {
		"id": mongoose.Types.ObjectId(),
		"first_name": req.body.first_name
	};

	var user = new db.User(data);

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

	db.User.find(query, function(err, results) {
		console.log(results);
		res.send(results);
	});
});


module.exports = router;