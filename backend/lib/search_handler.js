module.exports = {
	filter_query: function(query) {
		return query;
	},
	filter_results: function(results) {
		console.log(results);
		return results;
	},
	format: function(query) {
		var query = module.exports.filter_query(query);
		query = { $regex: new RegExp("^" + query.toLowerCase(), "i") };

		return { 'title': query, 'published': true };
	}
}