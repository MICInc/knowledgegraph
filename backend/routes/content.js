var express = require('express');
var router = express.Router();
var db = require('../db/database');
var mongoose = require('mongoose');
var format_paper = require('../lib/format_paper');

router.post('/', function(req, res) 
{	
	var data = format_paper(req);
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