var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var db = require('../db/database');
var file_handler = require('../lib/file_handler');
var uh = require('../lib/user_handler');
var ah = require('../lib/application_handler');

router.post('/register', function(req, res) {
	var application = req.body;
	var email = req.body.demographic.email.value;

	uh.find_by_email(email, function(results) {
		if(results.length == 0) {

			// Create a user profile before saving the conference application so can associate the 
			// user id with the application
			uh.save(req.body.profile, function(user_id) {

				ah.save(application, function(status) {
					res.send(status);
				});
			});
		}
		else if(results.length == 1) {
			application.profile = results[0]._id

			ah.save(application, function(status) {
				res.send(status);
			});
		}
		else {
			console.log('Error: more than one user with email '+email);
		}
	});
});

router.get('/register', function(req, res) {
	db.Conference.find({}, function(err, apps) {
		
		res.send(apps);
	}).select('-reimbursements').select('-__v');
});

module.exports = router;