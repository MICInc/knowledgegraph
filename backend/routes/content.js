var express = require('express');
var router = express.Router();
var db = require('../db/database');
// var test_db = require('../db/test_db');
var format_paper = require('../lib/format_paper');
var utils = require('../lib/utils');

router.post('/', function(req, res) {	
	var data = format_paper(req);
	var article = new db.Paper(data);

	article.collection.dropIndexes(function(err, results) {
		if(err) {
			console.log('content.js: '+err);
		}
	});

	article.save()
	.then(item => {
		console.log('Saved content');
		res.send('Content saved to knowledge graph');
	})
	.catch(err => {
		console.log(err);
		res.status(400).send('Save error');
	});
});

router.get('/', function(req, res) {
	if (req.query.url) {
		var query = { url: req.query.url };

		db.Paper.find(query, function(err, results) {
			console.log(results);
			res.send(results);
		});
	}
	else if (req.query.id == -1) {
		var query = {};

		db.Paper.find(query, function(err, results) {
			if(err) {
				console.log(err);
			}

			var shuff = utils.data.shuffle(results);
			console.log(shuff);
			res.send(shuff);
		});
	} 
	else {
		// return recommended content
	}
});

module.exports = router;