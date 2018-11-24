var express = require('express');
var router = express.Router();
var db = require('../db/database');
var mongoose = require('mongoose');

router.post('/', function(req, res) 
{	
	var id = mongoose.Types.ObjectId();
	console.log("_id: "+id+" title: "+req.body.title+" content: "+req.body.content);
	var article = new db.Article({"_id": id, "title": req.body.title, "content": req.body.content});
	console.log('type(article): '+article);

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
		var articles = {};

		results.forEach(function(item){
			articles[item._id] = item;
		});

		console.log(articles);

		res.send(articles);
	});
});

module.exports = router;