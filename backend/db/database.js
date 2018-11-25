var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var config  = require('./config/db');
var User = require('./models/user.js');
var Paper = require('./models/paper.js');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() 
{
  if (process.env.NODE_ENV != 'production') 
  {
    console.log('db connected');
  }
});

module.exports.User = User;
module.exports.Paper = Paper;