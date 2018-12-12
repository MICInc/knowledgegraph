var Content = require('./entity');
var mongoose = require('mongoose');

var content_schema = new mongoose.Schema({
	authors: [{
		type: String,
		required: true
	}],
	citations: [{
		type: String,
		required: true
	}],
	content:  [{
		type: String,
		required: true,
		trim: true
	}],
	date_created: {
		type: Date,
		required: true
	},
	description: {
		type: String,
		trim: true
	},
	first_name:  {
		type: String,
		required: true,
		trim: true
	},
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
	questions: [{
		type: String,
		required: true,
		trim: true
	}],
	saved_by: [{
		type: String, //user-ids
		required: true
	}],
	solutions: [{
		type: String,
		required: true,
		trim: true
	}],
	subseqs: [{
		type: String, //content-ids
		required: true
	}],
	table_of_contents: [{
		type: String,
		required: true,
		trim: true
	}],
	tags: [{
		type: String,
		required: true
	}]
}, Content.options);

module.exports.Content = Content.model.discriminator('Content', content_schema);