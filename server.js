var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var path	        = require('path');
var fs            = require('fs');
var favicon       = require('serve-favicon');
var helmet        = require('helmet');
var cluster       = require('cluster');
var numCPUs       = require('os').cpus().length;
var port          = process.env.PORT || 7000; //keep this or change as long as greater than 1024
var sender        = require('./app/sender');
var database      = require('./app/db/database')

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
  var errors = require('./app/routes/errors');
  var index_route = require('./app/routes/index');
  var mic_route = require('./app/routes/mic')
  var article_route = require('./app/routes/article');
  var user_route = require('./app/routes/user');
  var search_route = require('./app/routes/search')

  app.use(favicon(__dirname + '/public/img/favicon.ico'));
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(errors);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

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
