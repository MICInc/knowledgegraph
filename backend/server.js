var numCPUs	= require('os').cpus().length;
var express	= require('express');
var app	= express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var favicon	= require('serve-favicon');
var helmet = require('helmet');
var cluster = require('cluster');
var session = require('express-session');
var morgan = require('morgan');
var cors = require('cors');
var port = process.env.PORT || 7000; //keep this or change as long as greater than 1024
const ws = require('ws');
const db = require('./db/database');
var https = require('https');

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
		console.log(worker.process.pid + ' online at port '+port);
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

	app.all('*', function (req, res, next) {
		origin = req.get('origin');

		// Development whitelist
		var whitelist = ['http://localhost:8080', 'http://localhost:8081'];
		
		corsOptions = {
			origin: function (origin, callback) {
					var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
					callback(null, originIsWhitelisted);
			}
		};
		
		next();
	});

	/*
	Steps for generating ssh private key and SSL cert:
	1. openssl req -newkey rsa:2048 -new -nodes -keyout key.pem -out csr.pem
	2. openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out server.crt
	*/
	var privateKey = fs.readFileSync('./ssl/key.pem');
	var serverCert = fs.readFileSync('./ssl/server.crt');

	const options = {
		key: privateKey,
		cert: serverCert,
		passphrase: "y:_+\7d0]*!',/^>hpuLD6>/_.2?1+?64Z|>8A@4}7@1,}5S/4C>36~/%=cO"
	};

	https.createServer(options, app).listen(port);
}
