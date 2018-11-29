var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var community_schema = new Schema({
	
});

var conn = mongoose.createConnection('mongodb://localhost:27017/profile', { useNewUrlParser: true });
var Community = conn.model('users', community_schema);

module.exports = Community;