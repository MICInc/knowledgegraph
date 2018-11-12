var express = require('express');
var router = express.Router();

//filter apis
var filter     = require('../lib/filter');
var sender     = require('../lib/sender');
var searchMove = require('../lib/search');

router.use(function(req, res, next) 
{
  next();
});


router.get('/category/*', function(req, res) 
{
  searchMove(filter(req), res, conn, false);
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

router.get('/results*', function(req, res) 
{   
    var query_move = filter(req);

    if(query_move != null && query_move.length > 1)
    {
        query_move = '%'+query_move+'%';
    }

    searchMove(query_move, res, conn, true);
});

module.exports = router;