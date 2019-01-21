var mongoose = require('mongoose');
var utils = require('./utils');
var snappy = require('snappy');
var path = require('path');

module.exports = {
	extract: function(req) {
		var title = req.body.title;
		var data = req.body.data;
		var id = req.body.id;
		var user = req.body.user;
		var title = data.title;
		var url = title.length > 0 ? title.toLowerCase().replace(/[^a-z0-9\s]/gi,'').replace(/\s/g, '-') : utils.uniqueID();
		
		console.log('url: '+url);
		console.log('given id: '+id);

		/*
			authors - string combination of session info and coauthors
			description - eventually generated by text summarization model
		*/

		return {
			"_id": id.length > 0 ? id : mongoose.Types.ObjectId(),
			"authors": user.first_name+' '+user.last_name,
			"citations": data.citations.split(','),
			"content": module.exports.compress_html(data.content),
			"date_created": data.date_created,
			"description": "",
			"first_name": user.first_name,
			"hashtags": data.hashtags,
			"last_modified": data.last_modified,
			"last_name": user.last_name,
			"num_citations": 0,
			"num_comments": 0,
			"num_likes": 0,
			"num_saves": 0,
			"num_shares": 0,
			"prereqs": [],
			"published": data.publish,
			"save_by": [],
			"subseqs": [],
			"title": title,
			"url": url,
			"year": (new Date()).getFullYear()
		};
	},

	compress_html: function(data) {
		return data;
	}
}