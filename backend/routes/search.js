var express = require('express');
var router = express.Router();
var db = require('../db/database');
var sh = require('../lib/search_handler');

router.get('/', function(req, res, next){
	// Need user id to save search history
	// var date = new Date();
	console.log(req.query.term);

	db.Content.find(sh.format(req.query.term.toUpperCase()), function (err, results) {
		console.log(results);
		res.send(results);
	});
});

module.exports = router;