var Content = require('./entity');
var mongoose = require('mongoose');

var content_schema = new mongoose.Schema({
	_id: {
		type: String
	},
	authors: [{}],
	citations: [{
		type: String
	}],
	content: [{}],
	date_created: {
		type: Date,
		required: true
	},
	hashtag:[{
		type: String,
		trim: true
	}],
	hints: [{
		type: String,
		trim: true
	}],
	images: [{
		type: String,
		trim: true
	}],
	last_modified: {
		type: Date,
		required: true
	},
	num_citations: {
		type: Number,
		required: true
	},
	num_comments: {
		type: Number,
		required: true
	},
	num_dislikes: {
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
	preview: {
		type: String,
		trim: true
	},
	published: {
		type: Boolean,
		required: true
	},
	saved_by: [{
		type: String, //user-ids
		required: true
	}],
	subseqs: [{
		type: String, //content-ids
		required: true
	}],
	title: {
		type: String,
		trim: true
	},
	url: {
		type: String,
		trim: true
	},
	view_duration: [{}] //list of date object pairs {start_view, end_view}
}, Content.options);

module.exports.Content = Content.model.discriminator('Content', content_schema);