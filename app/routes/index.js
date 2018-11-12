
var express = require('express');
var router = express.Router();
var sender = require('../sender');

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


router.post('/signup', function(req, res, next) {
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;

	sender(res, '/vids', 'signup');

	if(!(username && email && password)) {
		res.send({error: 'Please provide a username, email, and password'});
	}

	// UserAuth.registerUser(username, email, password, function(err, user) {
	// 	if (!err) {
	// 		// Set session info
	// 		req.session.isAuthenticated = true;
	// 		req.session.username = user.username;

	// 		res.redirect('/user/feed');
	// 	} else {
	// 		res.render('register', {
	// 			title: "Arxival - Register", 
	// 			error: err,
	// 			username: username,
	// 			email: email
	// 		});
	// 	}
	// });
});

router.get('/signup', function(req, res, next) {
	sender(res, '/forms', 'signup');
	// res.render('signup', {
	// 			title: "MIC - Sign up", 
	// 		});
});

router.get('/login', function(req, res, next) {
	sender(res, '/forms', 'login.html');
	// res.render('login', {
	// 	title: "Arxival - Login", 
	// });
});

router.post('/login', function(req, res, next) {
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var passwordConf = req.body.passwordConf;

	console.log(email);
	console.log(username);
	console.log(password);
	console.log(passwordConf);

	if(!(username && password)) {
		res.send({error: 'Please provide a username/email and password'});
	}

	// UserAuth.loginUser(usernameOrEmail, password, function(err, user) {
	// 	if (!err) {
	// 		// Set session info
	// 		req.session.isAuthenticated = true;
	// 		req.session.username = user.username;

	// 		res.redirect('/user/feed');
	// 	} else {
	// 		res.send(err);
	// 	}
	// });
});

module.exports = router;