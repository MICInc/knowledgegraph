var express = require('express');
var router = express.Router();
var ch = require('../lib/community_handler');

function handleError(err) {
	console.log(err);
}

router.post('/', function(req, res) {
	var community = req.body.school;
	console.log(req.body);

	ch.exists(community, function(err, exists) {
		if(exists) res.send({ error: community+' already exists!' });
		else ch.create(req.body, function(resp) {
			if(resp == 200) res.status(200);
			else res.status(400).send('Please try again.');
		});
	});
});

router.get('/', function(req, res) {
	console.log(req.query.url);
});

module.exports = router;