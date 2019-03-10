var mongoose = require('mongoose');
var utils = require('./utils');
var path = require('path');
var db = require('../db/database');

module.exports = {
	extract: function(req) {
		var data = req.body.data;
		var id = req.body.id;
		var authors = req.body.authors;
		var title = data.title;
		var hashtag = [];

		// only optimize and create hashtags if published
		if(data.publish && data.cell != null) data.cell = module.exports.format_hashtags(data.cell);
		if(data.cell != null) hashtag = data.cell.hashtag;

		/*
			authors - string combination of session info and coauthors
			description - eventually generated by text summarization model
		*/

		return {
			"_id": id.length > 0 ? id : mongoose.Types.ObjectId(),
			"authors": authors,
			"citations": data.citations.split(','),
			"content": data.cell,
			"date_created": data.date_created,
			"hashtag": hashtag,
			"last_modified": data.last_modified,
			"num_citations": 0,
			"num_comments": 0,
			"num_dislikes": 0,
			"num_likes": 0,
			"num_saves": 0,
			"num_shares": 0,
			"prereqs": [],
			"preview": '',
			"published": data.publish,
			"save_by": [],
			"subseqs": [],
			"title": title,
			"url": module.exports.generate_url(title),
			"year": (new Date()).getFullYear()
		};
	},
	compress_html: function(cell) {
		return cell;
	},
	escape(str) {
		return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	},
	update_hashtags: function(src, target) {
		if(src == null || target == null) return [];

		for(var i = 0; i < target.length; i++) src.push(target[i]);
		return  module.exports.unique(src);
	},
	format_hashtags: function(cell) {

		if(cell['html'] != undefined) {

			cell['hashtag'] = module.exports.unique(cell['html'].match(/(?:^|[ ])#([a-zA-Z]+)/gm));

			for(var i in cell['hashtag']) {
				var tag = module.exports.escape(cell['hashtag'][i].trim());
				var atag = '<a class=\"hashtag\" style=\"color:black;\" href=/search?term='+tag.substring(1)+'>'+tag+'</a>';
				cell['html'] = cell['html'].replace((new RegExp(tag, 'g')), atag);
			}
		}
	
		return cell;
	},
	update(index, src, tgt) {
		if(src.title != tgt.title) tgt.title = src.title;

		if(src.published) {
			// need to iterate through all saved cells and extract hashtags
			// right now it's only looking at the most recently updated cell.
			tgt.published = src.published;
			tgt.hashtag = module.exports.update_hashtags(tgt.hashtag, src.hashtag);
			if(tgt.content.length > 0) tgt.preview = module.exports.preview(tgt.content[0].text);
			if(src.url != tgt.url) tgt.url = module.exports.generate_url(tgt.title);
		}

		// update existing cell else add new cell
		if(index < tgt['content'].length) tgt['content'][index] = src['content'];
		else tgt['content'].push(src['content']);

		return tgt;
	},
	generate_url: function(title) {
		return title.length > 0 ? title.toLowerCase().replace(/[^a-z0-9\s]/gi,'').replace(/\s/g, '-') : '';
	},
	preview(text, limit=151) {
		if(text.length >= limit) return text.substring(0, limit).trim()+'...';
		return text;
	},
	unique(array) {
		return [...new Set(array)];
	},
	verify_vote(vote) {
		return vote;
	}
}