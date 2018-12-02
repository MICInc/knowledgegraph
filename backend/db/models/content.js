var mongoose = require('mongoose');

var options = { discriminatorKey: 'kind' };
var content_schema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true,
		trim: true
	}
}, options);

var conn = mongoose.createConnection('mongodb://localhost:27017/knowledge', { useNewUrlParser: true });
var model = conn.model('paper', content_schema);

module.exports.model = model;
module.exports.options = options;