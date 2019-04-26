var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_schema = new Schema({
    active: {
        type: Boolean,
        required: true
    },
    affiliation: {
        type: String,
        sparse: true
    },
    bio: {
        type: String,
        trim: true,
        sparse: true
    },
    comments: [{
        type: String,
        trim: true
    }],
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
    followers: [{
        type: String,
        sparse: true,
        trim: true
    }],
    following: [{
        type: String,
        sparse: true,
        trim: true
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
    library: [{}],
    num_citations: {
        type: Number
    },
    password_hash: {
        type: String,
        required: true
    },
    publications: [{
        type: String,
        sparse: true
    }],
    picture: {},
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
    session_history: [{}],
    subjects: [{
        type: String, // entity ids
        sparse: true
    }],
    search_history: [{}],
    token: {
        type: String
    },
    url: {
        type: String,
        required: true
    },
    user_type: {
        type: Number,
        required: true
    },
    verification: {
        code: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        }
    },
    view_duration: [{}]
});

var conn = mongoose.createConnection('mongodb://localhost:27017/profile', { useNewUrlParser: true });
var User = conn.model('users', user_schema);

module.exports = User;