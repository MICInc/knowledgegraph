var mongoose = require('mongoose');
var utils = require('./utils');
var path = require('path');
var db = require('../db/database');
var filter = require('./filter');

module.exports = {
	extract: function(req) {
		var data = req.body.data;
		var id = req.body.id;
		var authors = req.body.authors;
		var title = filter.filter_xss(data.title);
		var hashtag = [];
		var publish = req.body.publish;

		// only optimize and create hashtags if published
		if(publish && data.cell != null) data.cell = module.exports.format_hashtags(data.cell);
		if(data.cell != null) hashtag = data.cell.hashtag;

		/*
			authors - string combination of session info and coauthors
			description - eventually generated by text summarization model
		*/

		return {
			"_id": id.length > 0 ? id : mongoose.Types.ObjectId(),
			"authors": authors,
			"bibtex": '',
			"citations": data.citations.split(','),
			"content": data.cell,
			"date_created": data.date_created,
			"hashtag": hashtag,
			"is_published": publish,
			"last_modified": data.last_modified,
			"num_citations": 0,
			"num_comments": 0,
			"num_dislikes": 0,
			"num_likes": 0,
			"num_saves": 0,
			"num_shares": 0,
			"num_views": 0,
			"prereqs": module.exports.check_edges(data.prereqs),
			"preview": '',
			"publication": [],
			"save_by": [],
			"subseqs": module.exports.check_edges(data.subseqs),
			"title": title,
			"url": module.exports.generate_url(title),
			"year": data.date_created.split('-')[0]
		};
	},
	is_disjoint: function(prereq, subseq) {
		return prereq.filter(value => subseq.includes(value)).length == 0;
	},
	is_title_unique: function(title, id, callback) {
		db.Content.find({ title: title }, function(err, results) {
			if(err) console.error(err);
			callback(results.length == 0 || (results.length == 1 && results[0]._id == id));
		});
	},
	check_edges: function(edges) {
		// @param prereqs (array)
		// @return 	(array)
		var hrefs = []
		for(var i in edges) hrefs.push({ innerText: edges[i], href: module.exports.generate_url(edges[i])});
		
		return hrefs;
	},
	compress_html: function(cell) {
		return cell;
	},
	update_hashtags: function(article) {
		if(article.content.length == 0) return article;

		var hashtag = [];
		var content = article.content;

		for(var i = 0; i < content.length; i++) {
			if(content[i] != null) {
				content[i] = module.exports.format_hashtags(content[i]);
				if(content[i].hashtag != null) hashtag.push(...content[i].hashtag);
			}
		}

		article.hashtag.push(...hashtag);
		article.hashtag = module.exports.unique(article.hashtag);

		return article;
	},
	filter_results: function(article) {
		var authors = [];

		for(var i = 0; i < article.authors.length; i++) {
			var a = article.authors[i];
			authors.push({ first_name: a.first_name, last_name: a.last_name, url: a.url });
		}

		return {
			id: article._id,
			authors: authors,
			bibtex: article.bibtex,
			citations: article.citations,
			date_created: article.date_created,
			last_modified: article.last_modified,
			num_citations: article.num_citations,
			num_likes: article.num_likes,
			num_dislikes: article.num_dislikes,
			num_shares: article.num_shares,
			prereqs: article.prereqs,
			publication: article.publication,
			subseqs: article.subseqs,
			title: article.title,
			url: article.url,
		};
	},
	format_hashtags: function(cell) {
		if(cell != null && cell.html != null) {

			var tags = module.exports.unique(cell.html.match(/(?:^|[ ])#([a-zA-Z]+)/gm));

			if(tags.length > 0) {
				cell.hashtag = tags;

				for(var i in cell.hashtag) {
					var tag = filter.filter_xss(cell['hashtag'][i].trim());
					var atag = '<a class=\"hashtag\" style=\"color:black;\" href=/search?term='+tag.substring(1)+'>'+tag+'</a>';
					cell['html'] = cell['html'].replace((new RegExp(tag, 'g')), atag);
				}
			}
		}
	
		return cell;
	},
	update(index, src, tgt) {

		if(src.title != tgt.title) tgt.title = src.title;

		// update existing cell else add new cell
		if(src['content'] != null) {
			// 
			if(index < tgt['content'].length) tgt['content'][index] = src['content'];
			else tgt['content'].push(src['content']);
		}

		if(src.is_published) {
			// once published (asserted), permanently published!
			tgt.is_published = src.is_published;
			tgt = module.exports.update_hashtags(tgt);

			// update search preview text and, if needed, article url
			if(tgt.content.length > 0 && tgt.content[0] != null) tgt.preview = module.exports.preview(tgt.content[0].text);
			if(src.url != tgt.url) tgt.url = module.exports.generate_url(tgt.title);

			tgt.publication = tgt.content;
		}

		// update prereqs and subseqs
		tgt.prereqs = src.prereqs;
		tgt.subseqs = src.subseqs;

		return tgt;
	},
	generate_url: function(title) {
		return title.length > 0 ? title.toLowerCase().replace(/[^a-z0-9\s]/gi,'').replace(/\s/g, '-') : utils.uniqueID();
	},
	preview(text, limit=151) {
		if(text == null) return '';
		if(text.length >= limit) return text.substring(0, limit).trim()+'...';
		return text;
	},
	unique(array) {
		return [...new Set(array)];
	},
	verify_vote(vote) {
		return vote;
	},
	published_count(data, editable) {
		// @params (array) data
		// @return (array) count of published articles
		console.log('fc.published_count (editable): '+editable);
		
		if(editable) return data.length;
		return data.filter((obj) => obj.is_published === true).length;
	}
}