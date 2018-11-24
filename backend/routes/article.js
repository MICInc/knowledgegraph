var express = require('express');
var router = express.Router();
var db = require('../db/database');
var mongoose = require('mongoose');

router.post('/', function(req, res) 
{	
	var data = {
		"id": mongoose.Types.ObjectId(), 
		"content": req.body.content,
		"date_created": new Date(),
		"description": req.body.content,
		"num_likes": 0,
		"num_shares": 0,
		"num_comments": 0,
		"title": req.body.title
	};

	var article = new db.Article(data);

	article.save()
	.then(item => {
		console.log('Saved');
		res.send('Article saved to knowledge graph');
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