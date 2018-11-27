
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var subjectId = 'all';
	var pageNum = req.query.page;

	res.send(
		{
			user: {
				id: 0,
				communities: [
					{name: 'MIT MIC', channels: ['conference', 'conference_cr', 'general', 'random']},
					{name: 'McGill AI Society', channels: ['workshops', 'memes 1', 'memes 2']}
				]

			},
			feed: [
				{
					title: 'article 1', 
					content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec varius magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec suscipit neque, et mollis nunc. Sed feugiat imperdiet mauris, et sagittis orci venenatis ut. Fusce nec tempor massa, quis blandit velit. Donec vel purus id quam commodo cursus quis in massa. Mauris tincidunt vestibulum egestas. Aliquam molestie neque id purus lacinia, vehicula condimentum nisl dictum. Etiam sodales leo volutpat dolor pellentesque, non feugiat quam vestibulum.',
					meta: ['neural networks', 'meta-learning']
				},
				{
					title: 'article 2', 
					content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec varius magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec suscipit neque, et mollis nunc. Sed feugiat imperdiet mauris, et sagittis orci venenatis ut. Fusce nec tempor massa, quis blandit velit. Donec vel purus id quam commodo cursus quis in massa. Mauris tincidunt vestibulum egestas. Aliquam molestie neque id purus lacinia, vehicula condimentum nisl dictum. Etiam sodales leo volutpat dolor pellentesque, non feugiat quam vestibulum.',
					meta: ['neural networks', 'active learning']
				}
			]
		}
	);
});

router.get('/category/*', function(req, res, next) 
{
});

router.get('/robots.txt', function(req, res, next)
{
});

router.get('/signup', function(req, res) {
});

router.post('/signup', function(req, res) {
	var first_name = req.body.firstname;
	var last_name = req.body.lastname;
	var email = req.body.email;
	var password = req.body.password;
	var passwordConf = req.body.passwordConf;
	var dob = req.body.dob;
	var gender = req.body.gender;

	if(password != passwordConf) {
		res.send({error: 'Passwords did not match'});
	}
	
	if(!(first_name && last_name && email && password)) {
		res.send({error: 'Please provide your first name, last name, email, and password'});
	}

	UserAuth.registerUser(first_name, last_name, email, password, dob, gender, function(err, user) {
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