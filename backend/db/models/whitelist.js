var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var whitelist_schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
});

var conn = mongoose.createConnection('mongodb://localhost:27017/profile', { useNewUrlParser: true });
var Whitelist = conn.model('whitelist', whitelist_schema);

module.exports = Whitelist;