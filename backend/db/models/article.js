var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var article_schema = new Schema({
	// id: {
	// 	type: String,
	// 	unique: true,
	// 	required: true,
	// },
	// date_created: {
	// 	type: Date,
	// 	required: true
	// },
	// last_updated_date: {
	// 	type: Date,
	// 	required: true
	// },
	title: {
		type: String,
		required: true,
		trim: true
	},
	// references: [Number],
	// prev_article_links: [String],
	// next_article_links: [String],
	content:  {
		type: String,
		required: true,
		trim: true
	} //,
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
	// likes: {
	// 	type: [Number]
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