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

			data = fc.update_cell(req.body.data.update_cell, results[0], data);
			var article = new db.Content(data);
			var updated = article.toObject();

			delete updated._id;

			db.Content.updateOne(query, updated, function(err) {
				if(err) {
					console.log(err);
				}
				else {
					console.log('updated: '+article._id);
					console.log('url: '+data.url);
					res.send({ id: data._id.toString(), url: data.url });
				}
			});
		}
		else {
			console.log(data['content']);
			// refactor this into format_content()
			data['content'] = [data['content']];
			data['hashtags'] = [data['hashtags']];
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
	console.log('getting content:');
	console.log(req.query.url);
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

module.exports = router;