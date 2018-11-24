var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var article_schema = new Schema({
	content:  {
		type: String,
		required: true,
		trim: true
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
	num_likes: {
		type: Number
	},
	num_comments: {
		type: Number
	},
	num_shares: {
		type: Number
	},
	title: {
		type: String,
		required: true,
		trim: true
	}
	// last_updated_date: {
	// 	type: Date,
	// 	required: true
	// },
	// references: [Number],
	// prev_article_links: [String],
	// next_article_links: [String],
	// author:  {
	// 	type: Number,
	// 	unique: true,
	// 	required: true,
	// 	trim: true
	// },
	// tags: [String],
	// num_saves: {
	// 	type: Number,
	// 	required: true
	// },
	// saves: [String],
	// num_likes: {
	// 	type: Number,
	// 	required: true
	// },
	// num_citations: {
	// 	type: Number
	// },
	// citations: {
	// 	type: [Number]
	// },
	// content_type: {
	// 	type: Number,
	// 	unique: true
	// }
});

var Article = mongoose.model('Knowledge', article_schema);

module.exports = Article;