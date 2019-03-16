var xss = require('xss');
var options = {
	whiteList: {
		a: ['b', 'i', 'u', 'img', 'a']
	}
};

module.exports = {
	escape(str) {
		return xss(str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), options);
	},
	filter_query: function(query) {
		return module.exports.escape(query);
	},
	filter_results: function(content) {
		var filtered = [];

		for(var i in content) {
			filtered.push({ 
				id: content[i]._id,
				title: content[i].title,
				authors: content[i].authors,
				preview: content[i].preview,
				url: content[i].url,
				likes: content[i].num_likes,
				dislikes: content[i].num_dislikes,
			});
		}
		
		return filtered;
	},
	filter_users: function(users) {
		var filtered = [];

		for(var i in users) {
			filtered.push({ 
				first_name: users[i].first_name, 
				last_name: users[i].last_name,
				rank: users[i].rank,
				url: users[i].url
			});
		}
		
		return filtered;
	},
	format_query: function(query) {
		var query = module.exports.filter_query(query);
		query = { $regex: new RegExp("^" + query.toLowerCase(), "i") };

		return { 'title': query, 'is_published': true };
	}
}