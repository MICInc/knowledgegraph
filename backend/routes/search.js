var express = require('express');
var router = express.Router();
var db = require('../db/database');
var sh = require('../lib/search_handler');

router.get('/', function(req, res, next){
	var term = req.query.term;
	console.log(req.query);
	if(term != undefined) {
		// save user's query if logged in and has an account
		if('user' in req.query) {
			var user = {_id: req.query.user};
			var log = {query: term, date: new Date()};

			db.User.findOne(user, function(err, profile) {
				if(profile != null) {
					profile.search_history.push(log);
					db.User.updateOne(user, profile, function(err) {
						if(err) console.err(err);
					});
				}
			});
		}

		// save everyone's searches
		var log = new db.Search(log);

		log.collection.dropIndexes(function(err, results) {
			if(err) console.error(err);
		});

		log.save().then(item => {}).catch(err => {
			console.error(err);
		});

		// do search and return results
		db.Content.find(sh.format_query(req.query.term), function (err, results) {
			res.send(sh.filter_results(results));
		});
	}
});

module.exports = router;