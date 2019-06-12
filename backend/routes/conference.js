var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var db = require('../db/database');
var file_handler = require('../lib/file_handler');
var UserAuth = require('../lib/user-auth');
var ah = require('../lib/application_handler');
var fh = require('../lib/feedback_handler');
const email = require('../lib/email_handler');

router.post('/register', function(req, res) {
	ah.save(req.body, function(status) {
		message = email.format_message(req.body.first_name);

		email.send(from=email.conf.email, 
			to=req.body.email, 
			subject=email.conf.subject+' '+(new Date()).getFullYear(), 
			message=message);

		res.send(status);
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