var express = require('express');
var router = express.Router();
var UserAuth = require('../lib/user-auth');
var jwt = require('jsonwebtoken');
const config = require('../config.js');
var form = require('../lib/form');

router.get('/', function(req, res, next) {
	var subjectId = 'all';
	var pageNum = req.query.page;

	res.send({});
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
	console.log(result);

	if(!result.ok) {
		res.send({ error: result.errors });
		return;
	}

	UserAuth.registerUser(req.body, function(err, user) {
		if (!err) {
			let token = jwt.sign({email: email}, config.secret, {expiresIn: '24h'});

			res.json({
				message: 'User successfully created.',
				token: token,
				userInfo: {
					id: user._id,
					firstName: user.first_name,
					lastName: user.last_name,
				}
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
				token: token,
				userInfo: {
					id: user._id,
					firstName: user.first_name,
					lastName: user.last_name
				}
			});

		} else {
			console.log(err)
			res.send({error: err.message})
		}
	});
});

module.exports = router;