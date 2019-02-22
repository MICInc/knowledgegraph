module.exports = {
	filter: function(query) {
		return query;
	},
	format: function(query) {
		var query = module.exports.filter(query);
		query = { $regex: new RegExp("^" + query.toLowerCase(), "i") };

		return { 'title': query };
	}
}