var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	var query = req.query.q;
	console.log(query)
	console.log('searching...');
});

module.exports = router;