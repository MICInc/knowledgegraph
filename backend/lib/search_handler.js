var filter = require('./filter');
var db = require('../db/database');

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
				last_modified: content[i].last_modified,
				date_created: content[i].date_created
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
	find_users: function(users, select, callback) {
		db.User.find({ _id: { $in : users }}, function(err, profiles) {
			callback(profiles);
		}).select(select);
	},
	format_query: function(query) {
		var query = filter.filter_xss(query);
		return { 'title': { $regex: new RegExp("^" + query, "i") }, 'is_published': true };
	}
}