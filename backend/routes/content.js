var express = require('express');
var router = express.Router();
var fc = require('../lib/format_content');
var fh = require('../lib/file_handler');
var utils = require('../lib/utils');
var db = require('../db/database');
var path = require('path');
var fs = require('fs-extra');
var vote = require('../lib/vote');
var UserAuth = require('../lib/user-auth');
const article_storage = './storage/content/article';

router.post('/', function(req, res, next) {
	var token = req.body.token;
	
	if(token == null) {
		res.status(400).send('Invalid post');
		return;
	}

	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			console.error(err);
			res.status(400).send('Invalid post');
			return;
		}

		var data = fc.extract(req);
		var query = { _id: data._id };

		db.Content.findOne(query, function (err, article) {
			if(err) {
				console.error(err);
				res.status(400).send('Bad request');
				return;
			}

			if(article != null) {
				var index = req.body.data.update_cell;
				article = fc.update(index, data, article);

				db.Content.updateOne(query, article, function(err) {
					if(err) console.error(err);
					else res.send({ id: data._id.toString(), url: data.url });
				});
			}
			else {
				var article = new db.Content(data);

				article.collection.dropIndexes(function(err, result) {
					if(err) console.error('content.js: '+err);
				});

				article.save()
				.then(item => {
					res.send({ id: data._id.toString(), url: data.url });
				})
				.catch(err => {
					console.error(err);
					res.status(400).send('Save error');
				});

				var user = { _id: req.body.user_id, token: req.body.token };
				
				db.User.findOne(user, function(err, profile) {
					// only store article id so that forced to get latest url and 
					// content incase article renamed, which will generate url
					profile.publications.push(data._id.toString());
					
					db.User.updateOne(user, profile, function(err) {
						if(err) console.error(err);
					});
				});
			}
		});
	});
});

router.post('/add', function(req, res) {
	var token = req.body.token;
	
	if(token == null) {
		res.status(400).send('Invalid post');
		return;
	}

	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			res.status(400).send('Invalid post');
			return;
		}

		var data = req.body;
		var query = { _id: data.id };

		db.Content.findOne(query, function(err, article) {
			if(article != null) {
				article.content.splice(data.index, 0, {});
				
				for(var i = data.index; i < article.content.length; i++) {
					article.content[i].index += 1;
				}

				db.Content.updateOne(query, article, function(err) {
					if(err) console.error(err);
				});
			}
		});
	});
});

router.post('/remove', function(req, res) {
	var token = req.body.token;
	
	if(token == null) {
		res.status(400).send('Invalid post');
		return;
	}

	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			res.status(400).send('Invalid post');
			return;
		}

		var data = req.body;
		var query = { _id: data.id };

		db.Content.findOne(query, function (err, article) {		
			if(article != null) {
				if(data.index < article.content.length) article.content.splice(data.index, 1);
				
				for(var i = 0; i < article.content.length; i++) {
					article.content[i].index -= 1;
				}

				db.Content.updateOne(query, article, function(err) {
					if(err) console.error(err);
					else res.status(200).send('removed cell '+data.index);
				});
			}
		});
	});
});

router.get('/', function(req, res) {
	if(req.query.url) {
		var query = { url: req.query.url };
		var user_id = req.query.user.length > 0 ? req.query.user : '';

		db.Content.findOne(query, function(err, article) {

			if(article != null && article.is_published) {
				var start = new Date();

				res.status(200).send(fc.filter_results(article));
				article.view_duration.push({ start: start });

				db.Content.updateOne(query, article, function(err) {
					if(err) console.error(err);
				});

				if(user_id.length > 0) {
					var user = { _id: user_id };

					db.User.findOne(user, function(err, profile) {
						profile.view_duration.push({ start: start, content: article._id});

						db.User.updateOne(user, profile, function(err) {
							if(err) console.error(err);
						});
					});
				}
			}
			else res.status(404).send('Article not found');
		});
	}
	else if(req.query.id == -1) {
		var query = {};

		db.Content.find(query, function(err, results) {
			if(err) console.error(err);

			var shuff = utils.shuffle(results);
			res.send(shuff);
		});
	} 
	else {
		// return recommended content
	}
});

router.get('/img', function(req, res) {
	// console.log('article: '+req.query.content_id+' retrieve image: '+req.query.name);
});

router.post('/upvote', function(req, res) {
	var token = req.body.token;
	
	if(token == null) {
		res.status(400).send('Invalid post');
		return;
	}
	
	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			res.status(400).send('Invalid post');
			return;
		}

		var ballot = { _id: req.body.content_id, liked: 1, date: new Date() };
		vote.vote(req.body.profile_id, ballot, res);
	});
});

router.post('/downvote', function(req, res) {
	var token = req.body.token;
	
	if(token == null) {
		res.status(400).send('Invalid post');
		return;
	}
	
	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			res.status(400).send('Invalid post');
			return;
		}

		var ballot = { _id: req.body.content_id, liked: -1, date: new Date() };
		vote.vote(req.body.profile_id, ballot, res);
	});
});

router.options('/cleanup', function(req, res) {
	var token = req.body.token;
	
	if(token == null) {
		res.status(400).send('Invalid post');
		return;
	}
	
	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			res.status(400).send('Invalid post');
			return;
		}

		var content_id = { _id: req.body.content_id };
		var user_id = { _id: req.body.user_id };

		db.Content.findOne(content_id, function(err, article) {
			if(article != null) {
				article.view_duration['end'] = new Date();

				db.Content.updateOne(content_id, article, function(err) {
					if(err) console.error(err);
				});
			}
		});

		db.User.findOne(user_id, function(err, profile) {
			if(profile != null) {
				profile.view_duration['end'] = new Date();
				db.User.updateOne(user_id, profile, function(err) {
					if(err) console.error(err);
				});
			}
		});
	});
});

router.post('/parse', function(req, res, next) {
	var token = req.body.token;
	
	if(token == null) {
		res.status(400).send('Invalid post');
		return;
	}
	
	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			res.status(400).send('Invalid post');
			return;
		}
		fh.write(req, res, article_storage);
		// call pdf parsing code here
	});
});

module.exports = router;