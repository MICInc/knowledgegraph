var express = require('express');
var router = express.Router();
var filter = require('../lib/filter');
var search = require('../lib/search');

router.get('/', function(req, res, next){
	var query = filter(req.query.q_);
	console.log(query);
	
	if(query_move != null && query_move.length > 1)
	{
		query_move = '%'+query_move+'%';
	}

	searchMove(query_move, res, conn, true);
});

module.exports = router;