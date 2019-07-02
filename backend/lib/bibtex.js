module.exports = {
	format: function(article) {
		// @param	article (object)
		// @return 	article (object)
		var auths = article.authors;
		var title = article.title;
		var bib_id = [auths[0].last_name.toLowerCase(), article.year, title.toLowerCase() ].join('');
		var bibtex = [`@article{${ bib_id },`, `${ module.exports.author(auths) }`, `title = {${article.title}},`,
					  `joural = {Machine Intelligence Community},`, `year = {${article.year}},`,
					  `url = {https://machineintelligence.cc/content/${article.url}}`];

		return bibtex.join('\n  ')+'\n}';
	},
	author: function(auths) {
		// @param	auths (array)
		// @return	auths (string)
		var auth_str = [];
		for(var i = 0; i < auths.length; i++) auth_str.push([auths[i].last_name, auths[i].first_name].join(', '));
		return `author = {${ auths.length > 1 ? auth_str.join(' and ') : auth_str }},`;
	},
}