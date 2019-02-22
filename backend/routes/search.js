var express = require('express');
var router = express.Router();
var db = require('../db/database');

router.get('/', function(req, res, next){
	console.log(req.query);
});

module.exports = router;