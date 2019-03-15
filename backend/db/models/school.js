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

School.estimatedDocumentCount({}, function(err, total) {
	if(total == 0) {
		var file = require('../schools.json');
		School.create(file, function(err, result) {
			if(err) console.error(err);
		});
	}
});

module.exports = School;