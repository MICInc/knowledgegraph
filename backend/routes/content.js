var express = require('express');
var router = express.Router();
var format_content = require('../lib/format_content');
var file_handler = require('../lib/file_handler');
var utils = require('../lib/utils');
var db = require('../db/database');
var path = require('path');
var fs = require('fs-extra');

const article_storage = './storage/content/article';

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
				fs.ensureDir(path.join(article_storage, data._id.toString()));
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
	file_handler(req, res, article_storage);
	// call pdf parsing code here
});

router.get('/', function(req, res) {
	console.log('getting content:');
	console.log(req.query.url);
	if (req.query.url) {
		var query = { url: req.query.url };

		db.Content.find(query, function(err, results) {
			console.log(results);
			if(results[0].published) {
				res.send(results);
			}
			else {
				res.status(404).send('Article not found');
			}
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