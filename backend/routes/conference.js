var express = require('express');
var router = express.Router();
var db = require('../db/database');

router.post('/', function(req, res) {
	console.log('conference reg data:');
	console.log(req.body);
});

module.exports = router;