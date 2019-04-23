var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../db/database');
var jwt = require('jsonwebtoken');
var UserAuth = require('../lib/user-auth');
var sh = require('../lib/search_handler');

// This is acutally never hit from /signup. Account creation is executed in index.js
// But forgot if this is hit with conference sign up.
router.post('/', function(req, res) {
	// TODO: should validate email address before querying
	UserAuth.isEmailTaken(req.body.email.value, function(results) {
		if(results.length == 0) {
			UserAuth.registerUser(req.body, function(user_id) {
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
	UserAuth.findById(req.query.user_id, function(err, profile) {
		if(err) {
			console.error(err);
			res.status(400).send('Invalid request');
			return;
		}

		//Note: have to check if editable because section tabs cannot receive props
		// so if user views section tab via direct link, cannot receive prop from main vue component
		// each tab section needs to query the backend itself and determine if it's editable.
		UserAuth.is_editable(req.query, profile, function(editable) {
			if(editable) res.status(200).send({ editable: editable });
			else res.status(200).send({ editable: editable });
		});
	});
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
			}).select('title url preview year num_views').select('-_id');
		});
	});
});

router.get('/library', function(req, res) {
	UserAuth.findByURL(req.query.url, function(err, profile) {
		if(err) {
			console.error(err);
			res.status(400).send('Invalid request');
			return;
		}

		UserAuth.is_editable(req.query, profile, function(editable) {
			db.Content.find({ _id: { $in: profile.library }}, function(err, library) {
				if(err) {
					console.error(err);
					res.status(200).send({ editable: false, library: [] });
				}
				else res.status(200).send({ editable: editable, library: library });
			}).select('title url preview year num_views').select('-_id');
		});
	});
});

router.get('/comments', function(req, res) {
	UserAuth.findByURL(req.query.url, function(err, profile) {
		if(err) {
			console.error(err);
			res.status(400).send('Invalid request');
			return;
		}

		UserAuth.is_editable(req.query, profile, function(editable) {
			res.status(200).send({ editable: editable, comments: profile.comments });
		});
	});
});

router.post('/picture', function(req, res) {
	UserAuth.findByURL(req.body.url, function(err, profile) {
		if(err) {
			console.error(err);
			res.status(400).send('Invalid request');
			return;
		}

		UserAuth.is_editable(req.body, profile, function(editable) {
			if(!editable) {
				res.status(400).send('Invalid request');
				return;
			}

			profile.picture = { src: req.body.src, name: req.body.name, last_modified: req.body.last_modified };

			db.User.updateOne({ _id: profile._id }, profile, function(err) {
				if(err) console.error(err);
				else res.status(200).send('uploaded');
			});
		});
	});
});

router.get('/picture', function(req, res) {
	UserAuth.findByURL(req.query.url, function(err, profile) {
		if(err) {
			console.error(err);
			res.status(400).send('Invalid request');
			return;
		}
		
		if(Object.keys(profile.toObject()).includes('picture')) res.status(200).send({ src: profile.picture.src });
		else res.status(200).send({ src: '' });
	});
});

// This route is already protected with editable flag when initial profile page is requested.
router.post('/follow', function(req, res) {
	UserAuth.verify_token(req.body.token, req.body.email, function(err, decoded) {
		if(err) res.status(401).send('unauthorized');
		else {
			UserAuth.findById(req.body.user_id, function(err, profile) {
				if(err) {
					console.error(err);
					res.status(400).send({ following: 0 });
					return;
				}

				UserAuth.findByURL(req.body.url, function(err, user) {
					if(err) {
						console.error(err);
						res.status(400).send({ following: 0 });
						return;
					}

					profile.following.push(user._id);
					user.followers.push(req.body.user_id);

					db.User.updateOne({ _id: req.body.user_id }, profile, function(err) { 
						if(err) console.error(err);
					});
					db.User.updateOne({ url: req.body.url }, user, function(err) {
						if(err) console.error(err);
					});

					res.status(200).send({ followers: user.followers.length });
				});
			});
		}
	});
});

router.get('/followers', function(req, res) {
	UserAuth.findByURL(req.query.url, function(err, profile) {
		if(err) {
			console.error(err);
			res.status(400).send('Invalid request');
			return;
		}

		sh.find_users(profile.followers, 'first_name last_name url -_id', function(followers) {
			UserAuth.is_editable(req.query, profile, function(editable) {
				res.status(200).send({ editable: editable, followers: followers });
			});
		});
	});
});

router.get('/following', function(req, res) {
	UserAuth.findByURL(req.query.url, function(err, profile) {
		if(err) {
			console.error(err);
			res.status(400).send('Invalid request');
			return;
		}

		sh.find_users(profile.following, 'first_name last_name url -_id', function(following) {
			UserAuth.is_editable(req.query, profile, function(editable) {
				res.status(200).send({ editable: editable, following: following });
			});
		});
	});
});

router.post('/update_email', function(req, res) {
	var new_email = req.body.data;
	var email = req.body.email;
	var token = req.body.token;

	UserAuth.verify_token(token, email, function(err, decoded) {
		if(err) res.status(401).send('unauthorized');
		if(email.length == 0) res.status(400).send('Invalid email');
		else {
			UserAuth.findByEmail(email, function(err, profile) {
				if(err) {
					console.error(err);
					res.status(400).send('Invalid email');
					return;
				}

				//should implement filter for valid emails and then call here

				UserAuth.get_token(email, function(new_token) {
					profile.email = new_email;
					profile.token = new_token;

					db.User.updateOne({ _id: profile._id }, profile, function(err) {
						if(err) console.error(err);
						else res.status(200).send({ email: profile.email, token: profile.token });
					});
				});
			});
		}
	});
});

router.post('/update_url', function(req, res) {
	var email = req.body.email;
	var token = req.body.token;
	var url = req.body.url;

	UserAuth.verify_token(token, email, function(err, decoded) {
		if(err) res.status(401).send('unauthorized');
		if(email.length == 0) res.status(400).send('Invalid email');
		else {
			//check that this url is unique
		}
	});
});

router.post('/update_first_name', function(req, res) {
	var email = req.body.email;
	var token = req.body.token;
	var first_name = req.body.first_name;

	UserAuth.verify_token(token, email, function(err, decoded) {
		if(err) res.status(401).send('unauthorized');
		if(first_name.length == 0) res.status(400).send('Invalid email');
		else {

		}
	});
});

router.post('/update_last_name', function(req, res) {
	var email = req.body.email;
	var token = req.body.token;
	var last_name = req.body.last_name;

	UserAuth.verify_token(token, email, function(err, decoded) {
		if(err) res.status(401).send('unauthorized');
		else {

		}
	});
});

router.post('/update_password', function(req, res) {
	UserAuth.verify_token(req.body.token, req.body.email, function(err, decoded) {
		if(err) res.status(401).send('unauthorized');
		else {
			var data = req.body.data;

			UserAuth.update_password(data.email, data.curr_pw, data.new_pw, data.conf_pw, function(err, ok) {
				if(ok) res.status(200).send(ok);
				else res.status(400).send(err);
			});
		}
	});
});

router.post('/deactivate', function(req, res) {
	UserAuth.verify_token(req.body.token, req.body.email, function(err, decoded) {
		if(err) res.status(401).send('unauthorized');
		else {
			UserAuth.findByEmail(req.body.email, function(err, profile) {
				if(err) {
					console.error(err);
					res.status(400).send('Invalid request');
					return;
				}

				UserAuth.deactivate(email, function(status) {
					res.status(200).send('deactivated');
				});
			});
		}
	});
});

module.exports = router;