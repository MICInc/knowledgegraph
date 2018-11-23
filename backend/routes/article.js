var express = require('express');
var router = express.Router();

//filter apis
var filter     = require('../lib/filter');
var searchMove = require('../lib/search');
var sender     = require('../lib/sender');

router.use(function(req, res, next) 
{
  next();
});

router.get('/', function(req, res) 
{
  res.send([{message:'Hello, articles'}]);
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