var express = require('express');
var router = express.Router();
var UserAuth = require('../lib/user-auth');
const config = require('../config.js');
var form = require('../lib/form');
var email = require('../lib/email_handler');
var from = 'noreply@machineintelligence.cc';

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

		if(err) {
			result.errors.email = { ok: true, desc: err }
			res.send({ error: result.errors });
		}
		else {
			res.status(200).json({ status: true, token: token, userInfo: user });
		}
	});
});

router.post('/login', function(req, res, next) {
	if(!require('../db/config/whitelist').includes(req.body.email)) {
		res.status(400).send({ error: 'You are not registered for the beta' });
		return;
	}

	var email = req.body.email;
	var password = req.body.password;

	if(!(email && password)) res.status(200).send({ error: 'Please provide a email and password' });

	UserAuth.loginUser(email, password, function(err, token, user) {
		if(err != null && (err.code == 400 || err.code == 401)) res.status(err.code).send({ error: err.msg });
		else res.json({ token: token, userInfo: user });
	});
});

router.post('/logout', function(req, res, next) {
	UserAuth.end_session(req.body);
});

router.post('/retrieve_login', function(req, res, next) {
	var email = req.body.email;

	UserAuth.findByEmail(email, function(profile) {
		if(user != null) {
			UserAuth.reset_password(email, function(ok) {
				res.status(200).send({ status: 'Please check your email'});
			});
		}
		else res.status(200).send({ status: 'Invalid email'});
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

	UserAuth.verify_token(token, user_email, function(err, decoded) {
		if(err) {
			res.status(401).send({ valid: false });
			return;
		}

		UserAuth.findByEmail({ email: user_email }, function(ok, token, user) {
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
	UserAuth.send_verify_email(req.body.email, function(ok) {
		res.status(ok ? 200 : 400).send({ status: ok });
	});
});

router.post('/verify_token', function(req, res, next) {
	var token = req.body.token;
	var user_email = req.body.email;

	if(token == null) {
		res.status(401).send({ valid: false });
		return;
	}

	UserAuth.verify_token(token, user_email, function(err, decoded) {
		if(err) {
			res.status(401).send({ valid: false });
			return;
		}

		UserAuth.findByEmail(user_email, function(ok, user) {
			if(ok) res.status(200).send({ token: token, userInfo: user });
			else res.status(401).send({ token: '', userInfo: {} });
		});
	});
});

module.exports = router;