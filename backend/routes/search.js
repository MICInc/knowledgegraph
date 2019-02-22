var express = require('express');
var router = express.Router();
var db = require('../db/database');
var sh = require('../lib/search_handler');

router.get('/', function(req, res, next){
	// Need user id to save search history
	// var date = new Date();

	db.Content.find(sh.format(req.query.term.toUpperCase()), function (err, results) {
		res.send(sh.filter_results(results));
	});
});

module.exports = router;