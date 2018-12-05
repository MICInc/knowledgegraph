var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_schema = new Schema({
    affiliation: {
        type: String,
        required: true
    },
	bio: {
        type: String,
        trim: true
    },
    date_joined: {
        type: Date,
        unique: false,
        required: true,
        trim: true
    },
    dob: {
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
    ethnicity: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    following: [{
    	type: String
    }],
    grade: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    library: [{
		type: String // content ids
	}],
    liked_articles: [{
    	type: String // content ids
    }],
    liked_papers: [{
    	type: String // content ids
    }],
	password_hash: {
		type: String,
		required: true,
	},
    rank: {
        type: Number,
        required: true
    },
	salt: {
		type: String,
		required: true,
	},
    school: {
        type: String
    },
	subjects: [{
		type: String // entity ids
	}],
    search_history: [{ 
    	type: String
    }],
    url: {
        type: String
    }
});

var conn = mongoose.createConnection('mongodb://localhost:27017/profile', { useNewUrlParser: true });
var User = conn.model('users', user_schema);

module.exports = User;