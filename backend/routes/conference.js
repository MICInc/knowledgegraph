var express = require('express');
var router = express.Router();
var db = require('../db/database');
var file_handler = require('../lib/file_handler');

router.post('/register', function(req, res) {
	console.log('posting conf reg');

	if(Object.keys(req.body).length == 0) {
		console.log('uploading files');
		file_handler(req, res, './storage/conference/resumes');
	}
	else {
		console.log('conference reg data:');
		console.log(Object.keys(req.body).length);
		console.log(req.body);
	}
});

router.get('/register', function(req, res) {
	console.log(req.body);
	res.send('conf_apples');
});

module.exports = router;