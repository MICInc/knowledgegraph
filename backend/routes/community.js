var express = require('express');
var router = express.Router();
var db = require('../db/database');

router.post('/', function(req, res) {
	console.log(req.body);
	var community = new db.Community(req.body);

	community.collection.dropIndexes(function(err, results) {
		if(err) {
			console.log('community.js: '+err);
		}
	});

	community.save()
	.then(item => {
		console.log('Saved community');
		res.send('Community');
	})
	.catch(err => {
		console.log(err);
		res.status(400).send('Save error');
	});
});

module.exports = router;