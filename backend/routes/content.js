var express = require('express');
var router = express.Router();
var fc = require('../lib/format_content');
var fh = require('../lib/file_handler');
var utils = require('../lib/utils');
var db = require('../db/database');
var path = require('path');
var fs = require('fs-extra');
var btx = require('../lib/bibtex');
var vote = require('../lib/vote');
var UserAuth = require('../lib/user-auth');
const article_storage = './storage/content/article';

router.post('/', function(req, res, next) {
	var token = req.body.token;
	
	if(token == null) {
		res.status(401).send('unauthorized');
		return;
	}

	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			// call force logout here!
			res.status(401).send('unauthorized');
			return;
		}

		var data = fc.extract(req);
		var query = { _id: data._id };

		db.Content.findOne(query, function (err, article) {
			if(err) {
				console.error(err);
				res.status(400).send({ error: 'Bad request' });
				return;
			}

			if(article != null) {
				// check that the title is unique
				db.Content.countDocuments({ title: article.title }, function(err, total) {
					if(total > 1 && req.body.publish) {
						res.status(200).send({ error: data.title+' already exists' });
						return;
					}

					var index = req.body.data.update_cell;
					article = fc.update(index, data, article);

					db.Content.updateOne(query, article, function(err) {
						if(err) console.error(err);
						else res.send({ id: data._id.toString(), url: data.url });
					});

					// update user profile if an article published status changes
					var user = { _id: req.body.user_id, token: req.body.token };
					db.User.findOne(user, function(err, profile) {
						var index = profile.publications.map(function(e) { return e.id; }).indexOf(data._id.toString());

						if(index > -1) profile.publications[index].is_published = req.body.publish;

						db.User.updateOne(user, profile, function(err) {
							if(err) console.error(err);
						});
					});
				}).select();
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
					profile.publications.push({ id: data._id.toString(), is_published: req.body.publish });
					
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
		res.status(401).send('unauthorized');
		return;
	}

	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			res.status(401).send('unauthorized');
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
		res.status(401).send('unauthorized');
		return;
	}

	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			res.status(401).send('unauthorized');
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
		var user_id = req.query.user_id.length > 0 ? req.query.user_id : '';

		db.Content.findOne(query, function(err, article) {

			if(article != null && article.is_published) {
				var start = new Date();
				article.bibtex = btx.format(article);

				res.status(200).send(fc.filter_results(article));
				article.view_duration.push({ start: start });
				article.num_views += 1;

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

router.get('/edit', function(req, res) {
	UserAuth.findById(req.query.user_id, function(err, profile) {
		if(err) {
			res.status(400).send('Invalid request');
			return;
		}

		db.Content.findOne({ url: req.query.url }, function(err, article) {
			if(err || article == null) {
				res.status(200).send({ editable: false });
				return;
			}

			if(!profile.publications.some(item => item.id === article._id)) {
				res.status(200).send({ editable: false });
				return;
			}

			UserAuth.is_editable(req.query, article, function(editable) {
				if(editable) res.status(200).send({ editable: editable });
				else res.status(200).send({ editable: editable });
			});
		});
	});
});

router.get('/reload', function(req, res) {
	var data = req.query;
	var token = data.token;

	if(token == null) {
		res.status(401).send('unauthorized');
		return;
	}

	UserAuth.verify_token(token, req.query.email, function(err, decoded) {
		if(err) {
			res.status(401).send('unauthorized');
			return;
		}

		db.Content.findOne({ url: data.url }, function(err, article) {	
			if(err) {
				console.error(err);
				return;
			}

			if(article != null) res.status(200).send(article);
			else res.status(400);
		});
	});
});

router.get('/img', function(req, res) {
	// console.log('article: '+req.query.content_id+' retrieve image: '+req.query.name);
});

router.post('/upvote', function(req, res) {
	var token = req.body.token;
	
	if(token == null) {
		res.status(401).send('unauthorized');
		return;
	}
	
	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			res.status(401).send('unauthorized');
			return;
		}

		var ballot = { _id: req.body.content_id, liked: 1, date: new Date() };
		vote.vote(req.body.profile_id, ballot, res);
	});
});

router.post('/downvote', function(req, res) {
	var token = req.body.token;
	
	if(token == null) {
		res.status(401).send('unauthorized');
		return;
	}
	
	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			res.status(401).send('unauthorized');
			return;
		}

		var ballot = { _id: req.body.content_id, liked: -1, date: new Date() };
		vote.vote(req.body.profile_id, ballot, res);
	});
});

router.options('/cleanup', function(req, res) {
	var token = req.body.token;
	
	if(token == null) {
		res.status(401).send('unauthorized');
		return;
	}
	
	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			res.status(401).send('unauthorized');
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
		res.status(401).send('unauthorized');
		return;
	}
	
	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			res.status(401).send('unauthorized');
			return;
		}
		fh.write(req, res, article_storage);
		// call pdf parsing code here
	});
});

router.post('/report', function(req, res, next) {
	var data = req.body;
	data['date'] = new Date();
	var report = new db.Abuse(data);

	report.collection.dropIndexes(function(err, result) {
		if(err) console.error(err);
	});

	report.save()
	.then(item => {
		res.status(200).send(true);
	})
	.catch(err => {
		console.error(err);
		res.status(400).send(false);
	});
});

router.post('/title', function(req, res, next) {
	var token = req.body.token;

	if(token == null) {
		res.status(401).send('unauthorized');
		return;
	}

	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			res.status(401).send('unauthorized');
			return;
		}

		var title = req.body.title;
		fc.is_title_unique(title, req.body.id, function(is_unique) {
			res.status(200).send({ ok: is_unique, desc: title+' already exists.' });
		});
	});
});

router.post('/disjoint', function(req, res, next) {
	var token = req.body.token;

	if(token == null) {
		res.status(401).send('unauthorized');
		return;
	}

	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			res.status(401).send('unauthorized');
			return;
		}

		var is_disjoint = fc.is_disjoint(req.body.prereq, req.body.subseq);
		if(is_disjoint) res.status(200).send({ ok: true, desc: ''});
		else res.status(200).send({ ok: false, desc: 'Prerequisite and subsequent concepts must be disjoint.'});
	});
});

router.post('/unpublish', function(req, res, next) {
	var token = req.body.token;

	if(token == null) {
		res.status(401).send('unauthorized');
		return;
	}

	UserAuth.verify_token(token, req.body.email, function(err, decoded) {
		if(err) {
			res.status(401).send('unauthorized');
			return;
		}

		var article_id = { _id: req.body.content_id };
		db.Content.findOne(article_id, function(err, article) {
			if(err) {
				res.status(400).send();
				return;
			}

			article.is_published = false;

			db.Content.updateOne(article_id, article, function(err) {
				if(err) res.status(400).send({ ok: false });
				else res.status(200).send({ ok: true });
			});
		});
	});
});

module.exports = router;