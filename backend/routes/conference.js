var express = require('express');
var router = express.Router();
var db = require('../db/database');
var file_handler = require('../lib/file_handler');
const ws = require('ws');

router.post('/register', function(req, res) {
	let ws = req.ws;
	console.log('posting conf reg');

	if(Object.keys(req.body).length == 0) {
		console.log('uploading files');
		file_handler(req, res, './storage/conference/resumes');
	}
	else {
		var conf = new db.Conference(req.body);
		console.log(req.body);
		
		conf.collection.dropIndexes(function(err, results) {
			if(err) {
				console.log('conferece.js: '+err);
			}
		});

		conf.save()
		.then(item => {
			var msg = 'Saved conf application';
			console.log(msg);
			res.send(msg);
			var wss = req.app.get('wss');
			wss.on('message', function incoming(data) {
				console.log('new app '+data);
				wss.send('new app');
			});
		})
		.catch(err => {
			console.log(err);
			res.status(400).send('Failed to register');
		});
	}
});

module.exports = router;