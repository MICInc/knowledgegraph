var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paper_schema = new Schema({
	authors: [{
		type: String,
		required: true
	}],
	citations: [{
		type: String,
		required: true
	}],
	content:  {
		type: String,
		required: true,
		trim: true
	},
	content_type: {
		type: String,
		required: true
	},
	date_created: {
		type: Date,
		required: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
	first_name:  {
		type: String,
		required: true,
		trim: true
	},
	last_modified: {
		type: Date,
		required: true
	},
	last_name:  {
		type: String,
		required: true,
		trim: true
	},
	num_citations: {
		type: Number,
		required: true
	},
	num_comments: {
		type: Number,
		required: true
	},
	num_likes: {
		type: Number,
		required: true
	},
	num_saves: {
		type: Number,
		required: true
	},
	num_shares: {
		type: Number,
		required: true
	},
	original_url: {
		type: String
	},
	prereqs: [{
		type: String, // content-ids
		required: true
	}],
	saved_by: [{
		type: String, //user-ids
		required: true
	}],
	subseqs: [{
		type: String, //content-ids
		required: true
	}],
	tags: [{
		type: String,
		required: true
	}],
	title: {
		type: String,
		required: true,
		trim: true
	},
	url: {
		type: String,
		required: true,
		trim: true
	}
});

var conn = mongoose.createConnection('mongodb://localhost:27017/knowledge', { useNewUrlParser: true });
var Paper = conn.model('paper', paper_schema);

module.exports = Paper;