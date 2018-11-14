
var express = require('express');
var router = express.Router();
var sender = require('../lib/sender');
var UserAuth = require('../lib/user-auth.js');
var db = require('../db/database');

router.get('/', function(req, res, next) {
	var subjectId = 'all';
	var pageNum = req.query.page;
	
	// arxiv.getSubjectsPapers(subjectId, pageNum, req.query, function(err, papers) {
	// 	res.render('index', {
	// 		isAuthenticated: req.session.isAuthenticated,
	// 		title: "MIC",
	// 		papers: papers,
	// 		pageNum: pageNum,
	// 		error: err,
	// 	});
	// });
});

router.get('/robots.txt', function(req, res)
{
  sender(res, '/path/', 'robots.txt');
});

router.get('/signup', function(req, res, next) {
	sender(res, '/../public/forms', 'signup.html');
});

router.post('/signup', function(req, res, next) {
	var first_name = req.body.firstname;
	var last_name = req.body.lastname;
	var email = req.body.email;
	var password = req.body.password;
	var passwordConf = req.body.passwordConf;
	var dob = req.body.dob;
	var gender = req.body.gender;

	// Need to verify inforation before testing
	// Need to hash password, and salt
	// Need a unique ID generator/checker
	console.log(db.test);
	var new_user = new db.User({
		user_id: 0,
		first_name: first_name,
		last_name: last_name,
		email: email,
		dob: dob,
		gender: gender,
		date_joined: new Date().toString(),
		date_last_updated: new Date().toString(),
		bio: '',
		liked_articles: [],
		liked_papers: [],
		password_hash: password,
		salt: '',
		subjects: [],
		library: [],
		search_history: [],
		following: [],
		rank: 0
	});

	new_user.save(function(err){
		console.log('New user added!');

		if (err){
			console.log(err);
		}
	});

	
	if(!(first_name && last_name && email && password)) {
		res.send({error: 'Please provide your first name, last name, email, and password'});
	}

	UserAuth.registerUser(first_name, last_name, email, password, function(err, user) {
		if (!err) {
			// Set session info
			req.session.isAuthenticated = true;
			req.session.firstname = first_name;
			req.session.lastname = last_name;
			req.session.email = email;

			res.redirect('/user/feed');
		} else {
			res.render('register', {
				title: "MIC - Register", 
				error: err,
				firstname: first_name,
				lastname: last_name,
				email: email
			});
		}
	});
});

router.get('/login', function(req, res, next) {
	sender(res, '/../public/forms', 'login.html');
});

router.post('/login', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	if(!(email && password)) {
		res.send({error: 'Please provide a email and password'});
	}

	UserAuth.loginUser(email, password, function(err, user) {
		if (!err) {
			// Set session info
			req.session.isAuthenticated = true;
			req.session.email = user.email;

			res.redirect('/user/feed');
		} else {
			res.send(err);
		}
	});
});

module.exports = router;