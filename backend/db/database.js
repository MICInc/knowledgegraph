var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var config  = require('./config/db');
var User = require('./models/user.js');
var Content = require('./models/content.js');
var Community = require('./models/community.js');
var Conference = require('./models/conference.js');
var Feedback = require('./models/feedback.js');
var Search = require('./models/search.js');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() 
{
  if (process.env.NODE_ENV != 'production') 
  {
    console.log('db connected');
  }
});

module.exports.save = function() {
	console.log('db.save()');
}

module.exports.User = User;
module.exports.Content = Content.Content;
module.exports.Community = Community;
module.exports.Conference = Conference;
module.exports.Feedback = Feedback;
module.exports.Search = Search;