var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var config  = require('./config/db');
var User = require('./models/user.js');
var Article = require('./models/article.js');

var db_uri = 'mongodb://';
// db_uri += config.user + ':';
// db_uri += config.password + '@';
// db_uri += config.host + '/';
// db_uri += config.database;
// db_uri += '?authSource=admin';
db_uri += 'localhost:27017/article';

mongoose.connect(db_uri, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() 
{
  if (process.env.NODE_ENV != 'production') 
  {
    console.log('db connected');
  }
});

var test = "this is a test string";

module.exports.db = db;
module.exports.User = User;
module.exports.Article = Article;
