const importer = require('./import');
var numCPUs	= require('os').cpus().length;
var express	= require('express');
var app	= express();
var bodyParser = require('body-parser');
var fs = require('fs');
var favicon	= require('serve-favicon');
var helmet = require('helmet');
var cluster = require('cluster');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var morgan = require('morgan');
var cors = require('cors');
var port = process.env.PORT || 7000; //keep this or change as long as greater than 1024
const ws = require('ws');
const db = require('./db/database');

// master process
if(cluster.isMaster)  {
	//Load database
	db.School.estimatedDocumentCount({}, function(err, total) {
		if(total == 0) {
			var file = require('./db/schools.json');
			db.School.create(file, function(err, result) {
				if(err) console.error(err);
			});
		}
	});

	// Fork workers.
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('online', function(worker, code, signal) {
		console.log(worker.process.pid + ' online');
	});

	process.on('SIGHUP', function() {
		cluster.workers.forEach(function(worker) {
			worker.disconnect();
			cluster.fork();
		});
	});

	cluster.on('exit', function(worker, code, signal) {
		console.log(worker.process.pid + ' died');
	});

	//Ping no-reply indicating server started
	var email_handler = require('./lib/email_handler');
	var email = 'no-reply@machineintelligence.cc';
	email_handler.send(
		from=email, 
		to=email, 
		subject='Launched', 
		message=(new Date()).toUTCString()+'\nserver listening on port '+port,
		function(err) {
			console.error(err);
		}
	);
} 
else {
	// Session middleware
	var sessionSecret = '53qS4aDGS5078hefFD7alI';

	if (process.env.NODE_ENV == 'production') {
		sessionSecret = process.env.SESSION_SECRET;
	}
	var sess = {
		secret: sessionSecret,
		cookie: {maxAge: 5184000},
		resave: false,
		saveUninitialized: true,
	};

	if (process.env.NODE_ENV === 'production') {
		// TODO: Use secure cookies?
		//app.set('trust proxy', 1); // trust first proxy
		//sess.cookie.secure = true; // serve secure cookies
	}

	app.use(session(sess));

	var errors = require('./routes/errors');
	var index_route = require('./routes/index');
	var mic_route = require('./routes/mic');
	var content_route = require('./routes/content');
	var search_route = require('./routes/search');
	var profile_route = require('./routes/profile');
	var conf_route = require('./routes/conference');
	var community_route = require('./routes/community');
	var admin_route = require('./routes/admin');
	var size = 2;
	var unit = 'mb';
	var upload_limit = size+unit;

	app.use(bodyParser.json({limit: upload_limit, extended: true}))
	app.use(bodyParser.urlencoded({limit: upload_limit, extended: true}))
	app.use(errors);
	app.use(morgan('tiny'));
	app.use(cors({credentials: true, origin: true}));

	app.use(helmet());
	app.use(helmet.xssFilter({ setOnOldIE: true }));
	app.use('/api/index', index_route);
	app.use('/api/mic', mic_route);
	app.use('/api/content', content_route);
	app.use('/api/profile', profile_route);
	app.use('/api/search', search_route);
	app.use('/api/conference', conf_route);
	app.use('/api/community', community_route);
	app.use('/api/admin', admin_route);

	var server = app.listen(port);
	
	console.log('Listening on port ' + port);
}