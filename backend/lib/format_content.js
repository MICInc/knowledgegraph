var mongoose = require('mongoose');
var utils = require('./utils');
var path = require('path');
var db = require('../db/database');

module.exports = {
	extract: function(req) {
		var title = req.body.title;
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
			"description": "",
			"hashtag": hashtag,
			"last_modified": data.last_modified,
			"num_citations": 0,
			"num_comments": 0,
			"num_dislikes": 0,
			"num_likes": 0,
			"num_saves": 0,
			"num_shares": 0,
			"prereqs": [],
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
		console.log('format_hashtags');
		if(cell['html'] != undefined) {
			console.log(cell['html']);
			cell['hashtag'] = module.exports.unique(cell['html'].match(/(?:^|[ ])#([a-zA-Z]+)/gm));
			console.log('before:');
			console.log(cell['hashtag']);
			for(var i in cell['hashtag']) {
				var tag = module.exports.escape(cell['hashtag'][i].trim());
				var atag = '<a class=\"hashtag\" style=\"color:black;\" href=/search?term='+tag.substring(1)+'>'+tag+'</a>';
				cell['html'] = cell['html'].replace((new RegExp(tag, 'g')), atag);
			}
			console.log('after:');
			console.log(cell['hashtag']);
		}
	
		return cell;
	},
	generate_url: function(title) {
		return title.length > 0 ? title.toLowerCase().replace(/[^a-z0-9\s]/gi,'').replace(/\s/g, '-') : utils.uniqueID();
	},
	unique(array) {
		return [...new Set(array)];
	},
	verify_vote(vote) {
		return vote;
	}
}