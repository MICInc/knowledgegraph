var mongoose = require('mongoose');

module.exports = function(req)
{
	var paper = req.body.content;
	var user = req.body.user;
	var authors = paper.authors.split(',');
	var first_author = authors[0];
	var author_last_name = first_author.split(' ').pop();
	var url = req.originalUrl+'/'+paper.year+'-'+author_last_name+'-'+paper.title;
	url = url.toLowerCase().replace(/\s/g, '_');

	return {
		"id": mongoose.Types.ObjectId(),
		"citations": paper.citations.split(','),
		"content": paper.content,
		"content_type": 'article',
		"date_created": new Date(),
		"description": paper.content,
		"first_name": user.first_name,
		"last_modified": new Date(),
		"last_name": user.last_name,
		"num_citations": 0,
		"num_comments": 0,
		"num_likes": 0,
		"num_saves": 0,
		"num_shares": 0,
		"prereqs": [],
		"save_by": [],
		"subseqs": [],
		"tags": paper.tags.split(','),
		"title": paper.title,
		"url": url,
		"year": paper.year
	};

}