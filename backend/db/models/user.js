var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_schema = new Schema({
    affiliation: {
        type: String,
        sparse: true
    },
    bio: {
        type: String,
        trim: true,
        sparse: true
    },
    date_joined: {
        type: Date,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
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
        sparse: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    following: [{
        type: String,
        sparse: true
    }],
    grade: {
        type: String,
        sparse: true
    },
    gender: {
        type: String,
        trim: true,
        sparse: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    library: [{
        type: String, // content ids
        sparse: true
    }],
    liked_articles: [{
        type: String, // content ids
        sparse: true
    }],
    liked_papers: [{
        type: String, // content ids
        sparse: true
    }],
    password_hash: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true,
        sparse: true
    },
    salt: {
        type: String,
        required: true
    },
    school: {
        type: String,
        sparse: true
    },
    subjects: [{
        type: String, // entity ids
        sparse: true
    }],
    search_history: [{ 
        type: String,
        sparse: true
    }],
    url: {
        type: String,
        required: true
    }
});

var conn = mongoose.createConnection('mongodb://localhost:27017/profile', { useNewUrlParser: true });
var User = conn.model('users', user_schema);

module.exports = User;