var mongoose = require('mongoose');
var utils = require('./utils');

module.exports = function(req)
{
	var title = req.body.title;
	var content = req.body.content;
	var id = req.body.id;
	var user = req.body.user;
	var url = title.length > 0 ? title.toLowerCase().replace(/\s/g, '-') : utils.uniqueID();

	console.log('given id: '+id);

	/*
		authors - string combination of session info and coauthors
		description - eventually generated by text summarization model
	*/

	return {
		"_id": id.length > 0 ? id : mongoose.Types.ObjectId(),
		"authors": user.first_name+','+user.last_name,
		"citations": content.citations.split(','),
		"content": content.content,
		"date_created": content.date_created,
		"description": "",
		"first_name": user.first_name,
		"last_modified": content.last_modified,
		"last_name": user.last_name,
		"num_citations": 0,
		"num_comments": 0,
		"num_likes": 0,
		"num_saves": 0,
		"num_shares": 0,
		"prereqs": [],
		"published": content.publish,
		"save_by": [],
		"subseqs": [],
		"tags": content.tags.split(','),
		"title": title,
		"url": url,
		"year": (new Date()).getFullYear()
	};
}