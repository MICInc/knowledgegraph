var mongoose = require('mongoose');

var user_schema = mongoose.Schema({
    user_id: {
        type: Number,
        unique: true,
        required: true
    },
	first_name: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },

	last_name: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },

	email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }, 
    dob: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    date_joined: {
        type: Date,
        unique: false,
        required: true,
        trim: true
    },
    date_last_updated: {
        type: Date,
        unique: false,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        unique: false,
        required: false,
        trim: true
    },
    liked_articles: [String],
    liked_papers: [String],
	password_hash: {
		type: String,
		required: true,
	},
	salt: {
		type: String,
		required: true,
	},
	subjects: [String],
	library: [String],
    search_history: [String],
    following: [String],
    rank: Number

});

var User = mongoose.model('User', user_schema);

module.exports = User;