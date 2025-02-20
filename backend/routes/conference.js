var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var db = require('../db/database');
var file_handler = require('../lib/file_handler');
var UserAuth = require('../lib/user-auth');
var ah = require('../lib/application_handler');
var fh = require('../lib/feedback_handler');
const email = require('../lib/email_handler');

router.post('/am_i_registered', function(req, res) {
	UserAuth.verify_token(req.body.token, req.body.email, function(err, decoded) {
		if(err) res.status(401).send('unauthorized');
		else {
			db.Conference.find({ email: req.body.email }, function(err, app) {
				if(err) res.status(200).send({ ok: false });
				else res.status(200).send({ ok: true });
			});
		}
	});
});

router.post('/apply_for_scholarship', function(req, res) {
	UserAuth.verify_token(req.body.token, req.body.email, function(err, decoded) {
		if(err) {
			res.status(401).send('unauthorized');
			return;
		}
		else {
			UserAuth.find_by_email(req.body.email, function(err, profile) {
				var url = req.body.url.split('/').slice(-1).pop();

				db.Content.findOne({ url: url }, function(err, article) {
					if(article == null) {
						res.status(200).send({ error: true });
						return;
					}

					// User is committing plagarism
					if(!profile.publications.some(item => item.id === article._id)) {
						console.error('plagarism\temail: '+req.body.email);
						res.status(200).send({ error: true });
						return;
					}

					// Try to update their scholarship article url
					db.Conference.findOne({ email: req.body.email }, function(err, app) {
						if(err) res.status(400).send('bad request');
						else {
							app.conf_resp.scholarship_article = req.body.url;
							db.Conference.updateOne({ _id: app._id }, app, function(err) {
								if(err) console.error(err);
								else res.status(200).send({ error: false });
							});
						}
					});
				});
			});
		}
	});
});

router.post('/register', function(req, res) {
	ah.save(req.body, function(status) {
		message = email.format_message(req.body.first_name, email.conf.message);

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