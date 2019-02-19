var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var db = require('../db/database');
var file_handler = require('../lib/file_handler');
var ua = require('../lib/user-auth');
var ah = require('../lib/application_handler');
var fh = require('../lib/feedback_handler');

router.post('/register', function(req, res) {
	var application = req.body;
	var email = req.body.demographic.email.value;

	ua.isEmailTaken(email, function(exists) {
		if(!exists) {

			// Create a user profile before saving the conference application so can associate the 
			// user id with the application
			ua.registerUser(req.body.profile, function(user_id) {

				ah.save(application, function(status) {
					res.send(status);
				});
			});
		}
		else {
			application.profile = results[0]._id

			ah.save(application, function(status) {
				res.send(status);
			});
		}
	});
});

router.get('/register', function(req, res) {
	db.Conference.find({}, function(err, apps) {
		res.send(ah.flatten_demographic_and_resp(apps));
	}).select('-reimbursements').select('-__v');
});

router.post('/feedback', function(req, res) {
	fh.save(fh.format(req.body), function(resp) {
		console.log(resp);
	})
});

module.exports = router;