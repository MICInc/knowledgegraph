var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bibtex_schema = new Schema({
	address: {
		type: String,
		trim: true
	},
	annotate: {
		type: String,
		trim: true
	},
	author: {
		type: String,
		trim: true
	},
	booktitle: {
		type: String,
		trim: true
	},
	chapter: {
		type: String,
		trim: true
	},
	crossref: {
		type: String,
		trim: true
	},
	doi: {
		type: String,
		trim: true
	},
	edition: {
		type: String,
		trim: true
	},
	editor: {
		type: String,
		trim: true
	},
	howpublished: {
		type: String,
		trim: true
	},
	institution: {
		type: String,
		trim: true
	},
	journal: {
		type: String,
		trim: true
	},
	key: {
		type: String,
		trim: true
	},
	month: {
		type: String,
		trim: true
	},
	note: {
		type: String,
		trim: true
	},
	number: {
		type: String,
		trim: true
	},
	organization: {
		type: String,
		trim: true
	},
	pages: {
		type: String,
		trim: true
	},
	publisher: {
		type: String,
		trim: true
	},
	school: {
		type: String,
		trim: true
	},
	series: {
		type: String,
		trim: true
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	type: {
		type: String,
		trim: true
	},
	volume: {
		type: String,
		trim: true
	},
	year: {
		type: String,
		trim: true
	}
});

var conn = mongoose.createConnection('mongodb://localhost:27017/knowledge', { useNewUrlParser: true });
var Bibtex = conn.model('bibtex', bibtex_schema);

module.exports = Bibtex;