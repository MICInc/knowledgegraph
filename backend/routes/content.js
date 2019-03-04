var express = require('express');
var router = express.Router();
var fc = require('../lib/format_content');
var fh = require('../lib/file_handler');
var utils = require('../lib/utils');
var db = require('../db/database');
var path = require('path');
var fs = require('fs-extra');
var vote = require('../lib/vote');

const article_storage = './storage/content/article';

router.post('/', function(req, res, next) {

	var data = fc.extract(req);
	var query = {_id: data._id};

	db.Content.find(query, function (err, results) {
		if(results.length > 0) {
			var article = results[0];
			var index = req.body.data.update_cell;

			if(data.publish) article['hashtag'] = fc.update_hashtags(article['hashtag'], data['hashtag']);

			var is_null = data['content'] == null;
			var is_obj = data['content'].constructor === Object;
			var has_obj = Object.keys(data['content']).length > 0;

			// update cell content
			if(!is_null && is_obj && has_obj) {
				// update existing cell else add new cell
				if(index < article['content'].length) article['content'][index] = data['content'];
				else article['content'].push(data['content']);

				data['content'] = article['content'];
			}

			article = new db.Content(data);
			var updated = article.toObject();

			delete updated._id;

			db.Content.updateOne(query, updated, function(err) {
				if(err) console.error(err);
				else res.send({ id: data._id.toString(), url: data.url });
			});
		}
		else {
			// refactor this into format_content()
			data['content'] = [data['content']];
			var article = new db.Content(data);

			article.collection.dropIndexes(function(err, results) {
				if(err) console.log('content.js: '+err);
			});

			article.save()
			.then(item => {
				console.log('Saved url: '+data.url);
				res.send({ id: data._id.toString(), url: data.url });
			})
			.catch(err => {
				console.error(err);
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
	if(req.query.url) {
		var query = { url: req.query.url };
		var user_id = req.query.user.length > 0 ? req.query.user : '';

		db.Content.findOne(query, function(err, article) {
			if(article.published) {
				var start = new Date();

				res.status(200).send(article);
				article.view_duration.push({ start: start, end: undefined });

				db.Content.updateOne(query, article, function(err) {
					if(err) console.error(err);
				});

				if(user_id.length > 0) {
					var user = { _id: user_id };

					db.User.findOne(user, function(err, profile) {
						profile.view_duration.push({ start: start, end: undefined, content: article._id});

						db.User.updateOne(user, profile, function(err) {
							if(err) console.error(err);
						});
					});
				}
			}
			else res.status(404).send('Article not found');
		});
	}
	else if(req.query.id == -1) {
		var query = {};

		db.Content.find(query, function(err, results) {
			if(err) console.error(err);

			var shuff = utils.shuffle(results);
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
		
		if(data.index < content.length) content.splice(data.index, 1);

		results[0]['content'] = content;
		
		var article = new db.Content(results[0]);
		var updated = article.toObject();

		delete updated._id;

		db.Content.updateOne(query, updated, function(err) {
			if(err) console.error(err);
			else res.status(200).send('removed cell '+data.index);
		});
	});
});

router.post('/upvote', function(req, res) {
	var ballot = fc.verify_vote(req.body);
	var user = { _id: ballot.profile_id };
	var content = { _id: ballot.content_id, liked: 1, date: new Date() };
	vote.vote(user, content, res);
});

router.post('/downvote', function(req, res) {
	var ballot = fc.verify_vote(req.body);
	var user = { _id: ballot.profile_id };
	var content = { _id: ballot.content_id, liked: -1, date: new Date() };;
	vote.vote(user, content, res);
});

router.post('/cleanup', function(req, res) {
	var content_id = { _id: req.body.content_id };
	var user_id = { _id: req.body.user_id };

	db.Content.findOne(content_id, function(err, article) {
		article.view_duration.end = new Date();

		db.Content.updateOne(content_id, article, function(err) {
			if(err) console.error(err);
		});
	});

	db.User.findOne(user_id, function(err, profile) {
		profile.view_duration.end = new Date();
		db.User.updateOne(user_id, profile, function(err) {
			if(err) console.error(err);
		})
	});
});

module.exports = router;