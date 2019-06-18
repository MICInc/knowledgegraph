var Content = require('./entity');
var mongoose = require('mongoose');

var content_schema = new mongoose.Schema({
	_id: {
		type: String
	},
	authors: [{}],
	bibtex:{
		type: String
	},
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
	images: [{
		type: String,
		trim: true
	}],
	is_published: {
		type: Boolean,
		required: true
	},
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
	num_views: {
		type: Number,
		required: true
	},
	original_url: {
		type: String
	},
	prereqs: {},
	preview: {
		type: String,
		trim: true
	},
	publication: [{}],
	saved_by: [{
		type: String, //user-ids
		required: true
	}],
	subseqs: {},
	title: {
		type: String,
		trim: true
	},
	url: {
		type: String,
		trim: true
	},
	view_duration: [{}], //list of date object pairs {start_view, end_view},
	year: {
		type: Number,
		required: true
	}
}, Content.options);

module.exports.Content = Content.model.discriminator('Content', content_schema);