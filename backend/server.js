var numCPUs     = require('os').cpus().length;
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var path	      = require('path');
var fs          = require('fs');
var favicon     = require('serve-favicon');
var helmet      = require('helmet');
var cluster     = require('cluster');
var session     = require('express-session');
var MongoStore  = require('connect-mongo')(session);
var morgan      = require('morgan');
var cors        = require('cors');
var port        = process.env.PORT || 7000; //keep this or change as long as greater than 1024


// master process
if(cluster.isMaster) 
{
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) 
  {
    cluster.fork();
  }

  cluster.on('online', function(worker, code, signal) 
  {
    console.log(worker.process.pid + ' online');
  });

  process.on('SIGHUP', function()
  {
    cluster.workers.forEach(function(worker)
    {
      worker.disconnect();
      cluster.fork();
    });
  });

  cluster.on('exit', function(worker, code, signal) 
  {
    console.log(worker.process.pid + ' died');
  });
} 
else 
{
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

  app.use(errors);
  app.use(morgan('combined'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors({credentials: true, origin: true}));


  app.use(helmet());
  app.use(helmet.xssFilter({ setOnOldIE: true }));
  app.use('/', index_route);
  app.use('/mic', mic_route);
  app.use('/content', content_route);
  app.use('/profile', profile_route);
  app.use('/search', search_route);
  app.use('/conference', conf_route);
  app.use('/community', community_route);

  app.all('*', function (req, res, next) {
    origin = req.get('origin');
    var whitelist = ['http://localhost:8080', 'http://localhost:8081']; // Development whitelist
    corsOptions = {
        origin: function (origin, callback) {
            var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
            callback(null, originIsWhitelisted);
        }
    };
    next();
});


  var server = app.listen(port);
  console.log('Listening on port ' + port);
}
