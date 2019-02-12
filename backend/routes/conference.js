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
				ah.save(user_id, application, function(status) {
					res.send(status);
				});
			});
		}
		else if(results.length == 1) {
			ah.save(results[0]._id, application, function(status) {
				res.send(status);
			});
		}
		else {
			console.log('Error: more than one user with email '+email);
		}
	});
});

router.get('/register', function(req, res) {
	console.log('getting conf apps');

	db.Conference.find({}, function(err, results) {
		console.log(results);
		if(results.length > 0 && results[0].published) {
			res.send(results);
		}
		else {
			res.status(404).send('Article not found');
		}
	});
});

module.exports = router;