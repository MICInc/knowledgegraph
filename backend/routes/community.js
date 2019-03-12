var express = require('express');
var router = express.Router();
var ch = require('../lib/community_handler');
var form = require('../lib/form');

router.post('/', function(req, res) {
	var submission = req.body;
	var result = form.is_complete(submission);

	if(!result.ok) {
		res.send({ error: result.errors });
		return;
	}

	var community = form.school;

	ch.exists(community, function(exists) {
		if(exists) res.send({ error: community+' already exists!' });
		else ch.create(req.body, function(resp) {
			if(resp == 200) res.status(200);
			else res.status(400).send('Please try again.');
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