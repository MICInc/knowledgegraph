var express       = require('express');
var app           = express();
var exphbs        = require('express-handlebars');
var bodyParser    = require('body-parser');
var path	        = require('path');
var fs            = require('fs');
var favicon       = require('serve-favicon');
var helmet        = require('helmet');
var mysql         = require('mysql');
var db            = require('./config/db-test');
var connection    = mysql.createPool(db);
var cluster       = require('cluster');
var numCPUs       = require('os').cpus().length;
var port          = process.env.PORT || 7000; //keep this or change as long as greater than 1024
var sender        = require('./app/sender');

app.use(favicon(__dirname + '/public/img/favicon.ico'));

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
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(function (err, req, res, next) 
  {
    var status = err.status || err.statusCode;

    //handles invalid hex encoding in url
    if (typeof status !== 'number' || status >= 500) 
    {
      next(err);
      return;
    }

    sender(res, '/path/', '404.html');
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');

  var router   = express.Router();

  router.use(function(req, res, next) 
  {
  	next();
  });

  app.use(helmet());
  app.use(helmet.xssFilter({ setOnOldIE: true }));
  require('./app/router')(router, connection);
  app.use('/', router);
  app.use(function (req, res) 
  {
    res.redirect('/');
  });  

  app.listen(port);
  console.log('Listening on port ' + port);
}
