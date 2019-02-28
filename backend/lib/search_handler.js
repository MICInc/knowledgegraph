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
	format_query: function(query) {
		var query = module.exports.filter_query(query);
		query = { $regex: new RegExp("^" + query.toLowerCase(), "i") };

		return { 'title': query, 'published': true };
	}
}