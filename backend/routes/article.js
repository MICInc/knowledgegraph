var express = require('express');
var router = express.Router();
var db = require('../db/database');
var mongoose = require('mongoose');

router.post('/', function(req, res) 
{	
	var data = {
		"id": mongoose.Types.ObjectId(), 
		"title": req.body.title, 
		"content": req.body.content,
		"description": req.body.content,
		"num_liked": 0,
		"num_shared": 0,
		"num_commented": 0
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
		res.send(results);
	});
});

module.exports = router;