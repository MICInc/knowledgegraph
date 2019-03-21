var express = require('express');
var router = express.Router();
var UserAuth = require('../lib/user-auth');
const config = require('../config.js');
var form = require('../lib/form');
var eh = require('../lib/email_handler');

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
	var result = form.is_complete(req.body);

	if(!result.ok) {
		res.send({ error: result.errors });
		return;
	}

	UserAuth.registerUser(req.body, function(err, token, user) {
		if(err) res.send({ error: 'Registration failed' });
		else {
			res.json({ token: token, userInfo: user });
			// eh.send_verification(email);
		}
	});
});

router.post('/login', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
	var whitelist = [
		'ch3njus@gmail.com', 
		'devin@machineintelligence.cc', 
		'ajay@machineintelligence.cc', 
		'jackie@machineintelligence.cc',
		'kate@machineintelligence.cc',
		'nmurthy@mit.edu',
		'mnadeem@mit.edu',
		'juliusf@bu.edu',
		'rexwangcc@gmail.com',
		'zui@bu.edu',
		'vram@bu.edu',
		'vpetsiuk@bu.edu',
		'timplump@mit.edu',
		'yutsumi@mit.edu'];

	if(!whitelist.includes(email)) return;

	if(!(email && password)) res.send({error: 'Please provide a email and password'});

	UserAuth.loginUser(email, password, function(err, token, user) {
		if(err) res.send({ error: 'Login failed' });
		else res.json({ token: token, userInfo: user });
	});
});

router.post('/logout', function(req, res, next) {
	UserAuth.end_session(req.body);
});

router.post('/forgot', function(req, res, next) {
	var email = req.body.email;

	UserAuth.findByEmail(email, function(profile) {
		if(user != null) {
			var new_pw = UserAuth.resetPassword();

			let transporter = nodemailer.createTransport({
				host: '',
				port: 465,
				secure: true,
				auth: {
					user: '',
					pass: ''
				}
			});

			let mailOptions = {
				from: '"MIC Team" <tech@machineintelligence.cc>',
				to: email,
				subject: 'MIC Password Recovery',
				text: 'Fuck off - Gordon Ramsay...btw here\'s your new password: '+new_pw,
				html: '<b>Here\'s your password</b>'
			}

			transporter.sendMail(mailOptions);
			
			res.status(200).send('Please check your email');
		}
		else res.status(200).send('Email does not exist');
	});
});

module.exports = router;