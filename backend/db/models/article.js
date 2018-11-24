var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var article_schema = new Schema({
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
	}
});

var Article = mongoose.model('Knowledge', article_schema);

module.exports = Article;