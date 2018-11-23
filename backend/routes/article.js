var express = require('express');
var router = express.Router();
var db = require('../db/database');

//filter apis
var filter     = require('../lib/filter');
var searchMove = require('../lib/search');
var sender     = require('../lib/sender');

router.use(function(req, res, next) 
{
  next();
});

router.post('/', function(req, res) 
{
	console.log('Title: '+req.body.title+' Content: '+req.body.content);
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

router.get('/move/*', function(req, res) 
{
  var move = filter(req).replace(/\/move\//, '');
  //console.log(move);
  searchMove(move, res, conn, false);
});

router.get('/api/browse/*', function(req, res) 
{
  	var fileName = req.originalUrl.replace('/api/browse/', '');

    sender(res, '/vids', fileName);
});

module.exports = router;