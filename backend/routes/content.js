var express = require('express');
var router = express.Router();
var db = require('../db/database');
var mongoose = require('mongoose');

router.post('/', function(req, res) 
{	
	var article = req.body.article;
	var user = req.body.user;

	var data = {
		"id": mongoose.Types.ObjectId(),
		"citations": article.citations.split(','),
		"content": article.content,
		"content_type": 'article',
		"date_created": new Date(),
		"description": article.content,
		"first_name": user.first_name,
		"last_modified": new Date(),
		"last_name": user.last_name,
		"num_citations": 0,
		"num_comments": 0,
		"num_likes": 0,
		"num_saves": 0,
		"num_shares": 0,
		"prereqs": [],
		"save_by": [],
		"subseqs": [],
		"tags": article.tags.split(','),
		"title": article.title
	};

	var article = new db.Article(data);

	article.collection.dropIndexes(function(err, results) {
		if(err) {
			console.log('content.js: '+err);
		}
	});

	article.save()
	.then(item => {
		console.log('Saved');
		res.send('Content saved to knowledge graph');
	})
	.catch(err => {
		console.log(err);
		res.status(400).send('Save error');
	});
});

router.get('/', function(req, res) 
{
	query = req.query.id;
	query = {};

	db.Article.find(query, function(err, results) {
		console.log(results);
		res.send(results);
	});
});

module.exports = router;