var express = require('express');
var router = express.Router();
var UserAuth = require('../lib/user-auth');
var jwt = require('jsonwebtoken');
const config = require('../config.js');
var form = require('../lib/form');

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

// https://stackoverflow.com/questions/14709802/exit-after-res-send-in-express-js
// TODO: update error handling as res.send does not exit method
router.post('/signup', function(req, res) {
	var profile = req.body;
	var first_name = profile.first_name;
	var last_name = profile.last_name;
	var dob = profile.dob;
	var email = profile.email;
	var gender = profile.gender;
	var password = profile.password;
	var passwordConf = profile.confirm_password;

	var result = form.is_complete(profile);

	if(!result.ok) {
		res.send({ error: result.errors });
		return;
	}

	UserAuth.registerUser(req.body, function(err, user) {
		if (!err) {
			let token = jwt.sign({email: email}, config.secret, {expiresIn: '24h'});

			res.json({
				message: 'User successfully created.',
				token: token
			});

		} else {
			res.send({error: err.message})
		}
	});
});

router.post('/login', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	if(!(email && password)) {
		res.send({error: 'Please provide a email and password'});
	}

	UserAuth.loginUser(email, password, function(err, user) {
		if (!err) {
			let token = jwt.sign({email: email}, config.secret, {expiresIn: '24h'});

			res.json({
				message: 'User successfully authenticated.',
				token: token
			});

		} else {
			console.log(err)
			res.send({error: err.message})
		}
	});
});

module.exports = router;