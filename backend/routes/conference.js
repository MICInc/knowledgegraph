var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var db = require('../db/database');
var file_handler = require('../lib/file_handler');
var uh = require('../lib/user_handler');
var ah = require('../lib/application_handler');

router.post('/register', function(req, res) {
	var application = {'reimbursements': req.body.reimbursements, 'conf_resp': req.body.conf_resp};
	var email = req.body.profile.email.value;

	uh.find_by_email(email, function(results) {
		if(results.length == 0) {

			// Create a user profile before saving the conference application so can associate the 
			// user id with the application
			uh.save(req.body.profile, function(user_id) {
				application.profile = user_id;

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
		var profiles = [];
		var applications = []
		for(var i=0; i < apps.length; i++) profiles.push(mongoose.Types.ObjectId(apps[i].profile));

		db.User.find({'_id': { $in: profiles}}, function(err, users) {
			var user_dict = {};
			for(var i=0; i < users.length; i++) user_dict[users[i]._id] = users[i]

			for(var i=0; i < apps.length; i++) {
				var user_id = apps[i].profile;

				if(user_id in user_dict) {
					applications.push({profile: user_dict[user_id], 
									   reimbursements: apps[i].reimbursements, 
									   conf_resp: apps[i].conf_resp});
				}
			}

			res.send(applications);
		});
	});
});

module.exports = router;