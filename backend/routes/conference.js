var express = require('express');
var router = express.Router();
var db = require('../db/database');
var file_handler = require('../lib/file_handler');

router.post('/', function(req, res) {
	console.log('conference reg data:');
	console.log(req.body);
	// file_handler(req, res, './');
});

module.exports = router;