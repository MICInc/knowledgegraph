var express = require('express');
var router = express.Router();
var UserAuth = require('../lib/user-auth');
const config = require('../config.js');
var form = require('../lib/form');
var email = require('../lib/email_handler');

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
		if(err) res.send({ error: err });
		else {
			if(require('../db/config/whitelist').includes(req.body.email)) res.json({ token: token, userInfo: user });
			else res.json({ok: true})
			// email.send_verification(from, req.body.email, subject, message, callback
				// req.body.email);
		}
	});
});

router.post('/login', function(req, res, next) {
	if(!require('../db/config/whitelist').includes(req.body.email)) return;

	var email = req.body.email;
	var password = req.body.password;

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

router.post('/date', function(req, res, next) {
	var year = req.body.year;
	var month = req.body.month;
	var day = req.body.day;
	var date = new Date(`${year}-${month}-${day}`);

	if(Boolean(+date) && date.getDate() == day) res.status(200).send({ error: false });
	else res.status(400).send({ error: true });
});

router.post('/session', function(req, res, next) {
	var token = req.body.token;
	var user_email = req.body.email;
	
	if(token == null) {
		res.status(401).send({ valid: false });
		return;
	}

	UserAuth.verify_token({ token: token, email: user_email }, function(err, decoded) {
		if(err) {
			res.status(401).send({ valid: false });
			return;
		}

		User.findByEmail({ email: user_email }, function(ok, token, user) {
			if(ok) res.status(200).send({ token: token, userInfo: user });
			else res.status(400).send({ token: '', userInfo: {} });
		});
	});
});

router.post('/verify_email', function(req, res, next) {
	UserAuth.verify_email_url(req.body.code, function(ok, token, user) {
		res.status(ok ? 200 : 400).send({ token: token, userInfo: user });
	});
});

router.post('/resend_verify', function(req, res, next) {
	UserAuth.resend_verify_email(req.body.code, function(ok) {
		res.status(ok ? 200 : 400).send({ status: ok });
	});
});

module.exports = router;