var express = require('express');
var router = express.Router();
var ch = require('../lib/community_handler');
var form = require('../lib/form');
var UserAuth = require('../lib/user-auth');

router.post('/', function(req, res) {
	if(req.body.token == null || req.body.token.length == 0) {
		console.error('Invalid user');
		res.status(400).send('Invalid submission');
		return;
	}

	UserAuth.find_by_email(req.body.email, function(err, profile) {
		if(err || profile == null) {
			console.error(err);
			res.status(400).send('Invalid submission');
			return;
		}

		UserAuth.verify_token(req.body.token, req.body.email, function(err, decoded) {
			if(err) {
				console.error(err);
				res.status(401).send('unauthorized');
				return;
			}

			var submission = req.body.organization;
			var result = form.is_complete(submission);

			if(!result.ok) {
				res.send({ error: result.errors });
				return;
			}

			var community = submission.school;

			ch.exists(community, function(exists) {
				if(exists) res.send({ error: community+' already exists!' });
				else ch.create(submission, function(resp) {
					if(resp == 200) res.status(200).send(200);
					else res.status(400).send('Please try again.');
				});
			});
		});
	});
});

router.get('/', function(req, res) {
	if(Object.keys(req.body).length === 0 && req.body.constructor === Object) {
		ch.get_all({}, function(communities) {
			res.send(communities);
		});
	}
});

module.exports = router;