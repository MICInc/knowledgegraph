var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var abuse_schema = new Schema({
	abuse: {
		type: Object,
		required: true
	},
	content_id: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	details: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	user: {
		type: Object,
		required: true
	}
});

var conn = mongoose.createConnection('mongodb://localhost:27017/report', { useNewUrlParser: true });
var Abuse = conn.model('abuse', abuse_schema);
module.exports = Abuse;