var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_schema = new Schema({
	first_name: {
        type: String,
        required: true,
        trim: true
    } //,
	// last_name: {
 //        type: String,
 //        unique: false,
 //        required: true,
 //        trim: true
 //    },

	// email: {
 //        type: String,
 //        unique: true,
 //        required: true,
 //        trim: true
 //    }, 
 //    dob: {
 //        type: String,
 //        unique: false,
 //        required: true,
 //        trim: true
 //    },
 //    gender: {
 //        type: String,
 //        unique: true,
 //        required: true,
 //        trim: true
 //    },
 //    date_joined: {
 //        type: Date,
 //        unique: false,
 //        required: true,
 //        trim: true
 //    },
 //    date_last_updated: {
 //        type: Date,
 //        unique: false,
 //        required: true,
 //        trim: true
 //    },
 //    bio: {
 //        type: String,
 //        unique: false,
 //        required: false,
 //        trim: true
 //    },
 //    liked_articles: [String],
 //    liked_papers: [String],
	// password_hash: {
	// 	type: String,
	// 	required: true,
	// },
	// salt: {
	// 	type: String,
	// 	required: true,
	// },
	// subjects: [String],
	// library: [String],
 //    search_history: [String],
 //    following: [String],
 //    rank: Number

});

var conn = mongoose.createConnection('mongodb://localhost:27017/profile', { useNewUrlParser: true });
var User = conn.model('user', user_schema);

module.exports = User;