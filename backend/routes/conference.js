var express = require('express');
var router = express.Router();
var db = require('../db/database');
var file_handler = require('../lib/file_handler');

router.post('/register', function(req, res) {
	console.log('posting conf reg');

	if(Object.keys(req.body).length == 0) {
		console.log('uploading files');
		file_handler(req, res, './storage/conference/resumes');
	}
	else {
		var conf = new db.Conference(req.body);
		console.log(req.body);
		
		conf.collection.dropIndexes(function(err, results) {
			if(err) {
				console.log('conferece.js: '+err);
			}
		});

		conf.save()
		.then(item => {
			var msg = 'Saved conf application';
			console.log(msg);
			res.send(msg);
		})
		.catch(err => {
			console.log(err);
			res.status(400).send('Failed to register');
		});
	}
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