var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../db/database');
var ua = require('../lib/user-auth');
var jwt = require('jsonwebtoken');
var UserAuth = require('../lib/user-auth');

// This is acutally never hit from /signup. Account creation is executed in index.js
// But forgot if this is hit with conference sign up.
router.post('/', function(req, res) {
	// TODO: should validate email address before querying
	ua.isEmailTaken(req.body.email.value, function(results) {
		if(results.length == 0) {
			ua.registerUser(req.body, function(user_id) {
				res.send(user_id);
			});
		}
		else {
			res.status(400).send('Email already in use.');
		}
	});
});

router.get('/', function(req, res) {
	db.User.findOne({ url: req.query.url }, function(err, profile) {
		var data = {
			first_name: profile.first_name,
			last_name: profile.last_name,
			comments: profile.comments.length,
			publications: profile.publications.length,
			library: profile.library.length,
			followers: profile.followers.length,
			following: profile.following.length
		};

		if(profile) res.status(200).send(data);
		else res.status(400).send();
	});
});

router.get('/edit', function(req, res) {
	UserAuth.findByURL(req.query.url, function(err, profile) {
		if(err) {
			console.error(err);
			res.status(400).send('Invalid request');
			return;
		}

		UserAuth.is_editable(req.query, profile, function(editable) {
			if(editable) res.status(200).send({ editable: editable });
			else res.status(200).send({ editable: editable });
		});
	})
});

router.get('/publications', function(req, res) {
	UserAuth.findByURL(req.query.url, function(err, profile) {
		if(err) {
			console.error(err);
			res.status(400).send('Invalid request');
			return;
		}

		UserAuth.is_editable(req.query, profile, function(editable) {
			db.Content.find({ _id: { $in: profile.publications }}, function(err, publications) {
				if(err) {
					console.error(err);
					res.status(200).send({ editable: false, publications: [] });
				}
				else res.status(200).send({ editable: editable, publications: publications });
			}).select('title url').select('-_id');
		});
	});
});

router.get('/library', function(req, res) {
	UserAuth.findByURL(req.query.url, function(err, profile) {
		if(err) console.error(err);

		var editable = profile._id == req.query.user_id && profile.token == req.query.token;
		
		if(profile && profile.url == req.query.url) {
			db.Content.find({ _id: { $in: profile.library }}, function(err, library) {
				res.status(200).send({ editable: editable, library: library });
			}).select('title url').select('-_id');
		}
		else res.status(200).send({ editable: editable, library: [] })
	});
});

router.post('/library/clear', function(req, res) {
	var user_id = { _id: req.body.user_id };

	db.User.findOne(user_id, function(err, profile) {
		if(err) console.error(err);
		else {
			profile.library = [];

			db.User.updateOne(user_id, profile, function(err) {
				if(err) console.error(err);
				else res.status(200).send('cleared');
			});
		}
	});
});

router.post('/picture', function(req, res) {
	var user_id = { _id: req.body.user_id };

	db.User.findOne(user_id, function(err, profile) {
		if(err) console.error(err);
		else {
			profile.picture = { src: req.body.src, name: req.body.name, last_modified: req.body.last_modified };

			db.User.updateOne(user_id, profile, function(err) {
				if(err) console.error(err);
				else res.status(200).send('uploaded');
			});
		}
	});
});

router.get('/picture', function(req, res) {
	var query = { url: req.query.url };
	
	db.User.findOne(query, function(err, profile) {
		if(err) console.error(err);
		
		if(Object.keys(profile.toObject()).includes('picture')) res.status(200).send({ src: profile.picture.src });
		else res.status(200).send({ src: '' });
	});
});

router.get('/comments', function(req, res) {
	db.User.findOne({ url: req.query.url }, function(err, profile) {
		if(err) console.error(err);

		var editable = profile._id == req.query.user_id && profile.token == req.query.token;
		if(profile && profile.url == req.query.url) res.status(200).send({ editable: editable, comments: profile.comments });
		else res.status(200).send({ editable: editable, comments: [] })
	});
});

router.post('/follow', function(req, res) {
	var me = { _id: req.body.user_id, token: req.body.token };

	db.User.findOne(me, function(err, profile) {
		if(profile) {
			var follow = { url: req.body.url };
			db.User.findOne(follow, function(err, user) {
				profile.following.push(user._id);
				user.followers.push(me._id);

				db.User.updateOne(me, profile, function(err) { 
					if(err) console.error(err);
				});
				db.User.updateOne(follow, user, function(err) {
					if(err) console.error(err);
				});
				res.status(200).send({ followers: user.followers.length });
			});
		}
		else {
			res.status(400).send({ following: 0 });
		}
	});
});

router.get('/followers', function(req, res) {
	db.User.findOne({ url: req.query.url }, function(err, profile) {
		if(err) console.error(err);

		var editable = profile._id == req.query.user_id && profile.token == req.query.token;
		if(profile && profile.url == req.query.url) res.status(200).send({ editable: editable, followers: profile.followers });
		else res.status(200).send({ editable: editable, followers: [] })
	});
});

router.get('/following', function(req, res) {
	db.User.findOne({ url: req.query.url }, function(err, profile) {
		if(err) console.error(err);

		var editable = profile._id == req.query.user_id && profile.token == req.query.token;
		if(profile && profile.url == req.query.url) res.status(200).send({ editable: editable, following: profile.following });
		else res.status(200).send({ editable: editable, following: [] })
	});
});

module.exports = router;