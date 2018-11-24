var express = require('express');
var router = express.Router();
var db = require('../db/database');

router.get('/', function(req, res, next){
	console.log(req.query.q_);
	
	if(query_move != null && query_move.length > 1)
	{
		query_move = '%'+query_move+'%';
	}

});

module.exports = router;