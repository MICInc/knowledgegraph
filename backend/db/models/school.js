var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var school_schema = new Schema({
	name: {
		type: String,
		required: true
	}
});

var conn = mongoose.createConnection('mongodb://localhost:27017/school', { useNewUrlParser: true });
var School = conn.model('school', school_schema);

module.exports = School;