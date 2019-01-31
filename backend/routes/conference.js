var express = require('express');
var router = express.Router();
var db = require('../db/database');
var file_handler = require('../lib/file_handler');

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
			// req.app.wss.once('connection', ws => {
			// 	console.log('client socket connected');
			// 	ws.send('Hi, from the server');
			// 	ws.on('message', data => {
			// 		console.log('new msg: '+data);
			// 		ws.send(data);
			// 	});
			// });
		})
		.catch(err => {
			console.log(err);
			res.status(400).send('Failed to register');
		});
	}
});

module.exports = router;