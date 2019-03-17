var filter = require('./filter');

module.exports = {
	filter_query: function(query) {
		return filter.filter_xss(query);
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
		var query = filter.filter_xss(query);
		return { 'title': { $regex: new RegExp("^" + query, "i") }, 'is_published': true };
	}
}