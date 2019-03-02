var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var search_schema = new Schema({
    date: {
        type: Date,
        required: true
    },
    query: {
        type: String,
        required: true
    }
});

var conn = mongoose.createConnection('mongodb://localhost:27017/search', { useNewUrlParser: true });
var Search = conn.model('logs', search_schema);

module.exports = Search;