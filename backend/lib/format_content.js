var mongoose = require('mongoose');

module.exports = function(req)
{
	var bibtex = req.body.bibtex.values;
	var content = req.body.content;
	var user = req.body.user;

	console.log(content);
 
	/*
		authors - string combination of session info and coauthors
		description - eventually generated by text summarization model
	*/

	return {
		"id": mongoose.Types.ObjectId(),
		"authors": user.first_name+','+user.last_name,
		"citations": content.citations.split(','),
		"content": content.info,
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
		"save_by": [],
		"subseqs": [],
		"tags": content.tags.split(','),
		"title": bibtex.title,
		"url": bibtex.title.toLowerCase().replace(/\s/g, '_'),
		"year": bibtex.year
	};
}