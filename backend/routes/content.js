var express = require('express');
var router = express.Router();
var format_content = require('../lib/format_content');
var file_handler = require('../lib/file_handler');
var utils = require('../lib/utils');
var db = require('../db/database');

router.post('/', function(req, res) {

	var data = format_content(req);
	var article = new db.Content(data);

	db.Content.countDocuments({_id: data._id}, function (err, count) {
		if(count > 0) {
			var updated = article.toObject();
			delete updated._id;

			db.Content.updateOne({_id: data._id}, updated, function(err) {
				if(err) {
					console.log(err);
				}
				else {
					console.log('updated: '+article._id);
					res.send({ id: data._id.toString() });
				}
			});
		}
		else {
			article.collection.dropIndexes(function(err, results) {
				if(err) {
					console.log('content.js: '+err);
				}
			});

			article.save()
			.then(item => {
				console.log('Saved content');
				res.send({ id: data._id.toString() });
			})
			.catch(err => {
				console.log(err);
				res.status(400).send('Save error');
			});
		}
	});
});

router.post('/parse', function(req, res) {
	console.log('parsing paper');
	file_handler(req, res, './storage/content/new');
	// call pdf parsing code here
});

router.get('/', function(req, res) {
	if (req.query.url) {
		var query = { url: req.query.url };

		db.Content.find(query, function(err, results) {
			console.log(results);
			res.send(results);
		});
	}
	else if (req.query.id == -1) {
		var query = {};

		db.Content.find(query, function(err, results) {
			if(err) {
				console.log(err);
			}

			var shuff = utils.shuffle(results);
			console.log(shuff);
			res.send(shuff);
		});
	} 
	else {
		// return recommended content
	}
});

router.get('/img', function(req, res) {
	console.log('sending image');
	res.sendFile('./content/new/parkourtheory.png', {root: './storage'})
});

module.exports = router;