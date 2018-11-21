var numCPUs       = require('os').cpus().length;
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const path	      = require('path');
const fs          = require('fs');
const favicon     = require('serve-favicon');
const helmet      = require('helmet');
const cluster     = require('cluster');
const sender      = require('./lib/sender');
const database    = require('./db/database');
const session     = require('express-session');
const MongoStore  = require('connect-mongo')(session);
const morgan      = require('morgan');
const cors        = require('cors');
const port        = process.env.PORT || 7000; //keep this or change as long as greater than 1024



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

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  var errors = require('./routes/errors');
  var index_route = require('./routes/index');
  var mic_route = require('./routes/mic')
  var article_route = require('./routes/article');
  var user_route = require('./routes/user');
  var search_route = require('./routes/search');
  var profile_route = require('./routes/profile');

  app.use(favicon(__dirname + '/public/img/favicon.ico'));
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(errors);
  app.use(morgan('combined'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  app.use(helmet());
  app.use(helmet.xssFilter({ setOnOldIE: true }));
  app.use('/', index_route);
  app.use('/mic', mic_route);
  app.use('/article', article_route);
  app.use('/user', user_route);
  app.use('/search', search_route);

  app.listen(port);
  console.log('Listening on port ' + port);
}
