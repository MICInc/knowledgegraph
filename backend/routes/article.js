var express = require('express');
var router = express.Router();
var db = require('../db/database');

router.post('/', function(req, res) 
{
	var article = new db.Article({"title": req.body.title, "content": req.body.content});

	article.save()
	.then(item => {
		console.log('Saved');
		res.send('Article saved to knowledge graph');
	})
	.catch(err => {
		console.log('Error saving');
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

		res.send(articles);
	});
});

module.exports = router;