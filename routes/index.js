
var express = require('express');
var router = express.Router();
var sender = require('../lib/sender');
var UserAuth = require('../lib/user-auth.js');

router.get('/', function(req, res, next) {
	var subjectId = 'all';
	var pageNum = req.query.page;
	
	// arxiv.getSubjectsPapers(subjectId, pageNum, req.query, function(err, papers) {
	// 	res.render('index', {
	// 		isAuthenticated: req.session.isAuthenticated,
	// 		title: "Arxival",
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
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var password = req.body.password;
	var passwordConf = req.body.passwordConf;
	var dob = req.body.dob;
	var gender = req.body.gender;

	if(!(firstname && lastname && email && password)) {
		res.send({error: 'Please provide your first name, last name, email, and password'});
	}

	UserAuth.registerUser(firstname, lastname, email, password, function(err, user) {
		if (!err) {
			// Set session info
			req.session.isAuthenticated = true;
			req.session.firstname = firstname;
			req.session.lastname = lastname;
			req.session.email = email;

			res.redirect('/user/feed');
		} else {
			res.render('register', {
				title: "Arxival - Register", 
				error: err,
				firstname: firstname,
				lastname: lastname,
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