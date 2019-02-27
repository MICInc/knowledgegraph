var express = require('express');
var router = express.Router();
var fc = require('../lib/format_content');
var fh = require('../lib/file_handler');
var utils = require('../lib/utils');
var db = require('../db/database');
var path = require('path');
var fs = require('fs-extra');

const article_storage = './storage/content/article';

router.post('/', function(req, res, next) {

	var data = fc.extract(req);
	var query = {_id: data._id};

	db.Content.find(query, function (err, results) {
		if(results.length > 0) {
			var article = results[0];
			var index = req.body.data.update_cell;

			if(data.publish) article['hashtag'] = fc.update_hashtags(article['hashtag'], data['hashtag']);
			console.log('hashtag');
			console.log(article['hashtag']);

			// update cell content
			if(data['content'] != undefined) {
				if(index < article['content'].length) {
					// update existing cell
					article['content'][index] = data['content'];
				}
				else {
					// add cell
					article['content'].push(data['content']);
				}
				data['content'] = article['content'];
			}

			article = new db.Content(data);
			var updated = article.toObject();

			delete updated._id;

			db.Content.updateOne(query, updated, function(err) {
				if(err) {
					console.log(err);
				}
				else {
					res.send({ id: data._id.toString(), url: data.url });
				}
			});
		}
		else {
			// refactor this into format_content()
			data['content'] = [data['content']];
			var article = new db.Content(data);

			article.collection.dropIndexes(function(err, results) {
				if(err) {
					console.log('content.js: '+err);
				}
			});

			article.save()
			.then(item => {
				console.log('Saved url: '+data.url);
				res.send({ id: data._id.toString(), url: data.url });
			})
			.catch(err => {
				console.log(err);
				res.status(400).send('Save error');
			});
		}
	});
	// next();
});

router.post('/parse', function(req, res, next) {

	fh.write(req, res, article_storage);
	// call pdf parsing code here
});

router.get('/', function(req, res) {
	if (req.query.url) {
		var query = { url: req.query.url };

		db.Content.find(query, function(err, results) {
			console.log(results);
			if(results.length > 0 && results[0].published) {
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
	console.log('article: '+req.query.content_id+' retrieve image: '+req.query.name);
});

router.post('/remove', function(req, res) {
	var data = req.body;
	var query = { _id: data.id };

	db.Content.find(query, function (err, results) {
		var content = results[0]['content'];
		
		if(data.index < content.length) {
			content.splice(data.index, 1);
		}

		results[0]['content'] = content;
		
		var article = new db.Content(results[0]);
		var updated = article.toObject();

		delete updated._id;

		db.Content.updateOne(query, updated, function(err) {
			if(err) {
				console.log(err);
			}
			else {
				res.status(200).send('removed cell '+data.index);
			}
		});
	});
});

module.exports = router;