module.exports = {
	escape(str) {
		return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	},
	filter_query: function(query) {
		return module.exports.escape(query);
	},
	filter_results: function(results) {
		return results;
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

		return { 'title': query, 'published': true };
	}
}