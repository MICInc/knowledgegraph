var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedback_schema = new Schema({
	date: {
		type: Date,
		required: true
	},
	liked: {
		type: String,
		trim: true
	},
	overall: {
		type: String,
		trim: true
	},
	panels: [{
		type: String,
		trim: true
	}]
});

var conn = mongoose.createConnection('mongodb://localhost:27017/profile', { useNewUrlParser: true });
var Feedback = conn.model('feedback', feedback_schema);
module.exports = Feedback;