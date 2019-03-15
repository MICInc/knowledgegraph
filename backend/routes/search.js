var express = require('express');
var router = express.Router();
var db = require('../db/database');
var sh = require('../lib/search_handler');
var ch = require('../lib/community_handler');

router.get('/', function(req, res, next){
	var term = req.query.term;
	
	if(term != undefined) {
		// save user's query if logged in and has an account
		if('user' in req.query) {
			var user = { _id: req.query.user };
			var log = { query: term, date: new Date() };

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

		var term = req.query.term;

		db.Content.find(sh.format_query(term), function (err, articles) {
			var results = {};

			if(err) console.error(err);
			if(articles.length > 0) results['content'] = sh.filter_results(articles);
			
			var regx = new RegExp(term, "i");

			db.User.find({ $or:[ { first_name: regx }, { last_name: regx }]}, function(err, profiles) {
				if(err) console.error(err);
				if(profiles.length > 0) results['users'] = sh.filter_users(profiles);
				res.send(results);
				// ch.find({ $or:[ { name: regx }, { school: regx }]}, function(communities) {
				// 	if(communities != null && communities.length > 0) results['communities'] = communities;
				// 	res.send(results);
				// });
			});
		});
	}
});

router.get('/school', function(req, res) {
	db.School.find({ name: new RegExp('^'+req.query.name, "i")}, function(err, schools) {
		if(schools) res.status(200).send(schools);
		else res.status(400).send({});
	}).select('-_id').select('-__v');
});

module.exports = router;