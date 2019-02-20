var db = require('../db/database');

module.exports = {
	create: function(community, callback) {
		var community = new db.Community(community);
		community.collection.dropIndexes(function(err, results) {
			if(err) console.log('community.js: '+err);
		});

		community.save()
		.then(item => {
			console.log('Saved community');
			callback(true);
		})
		.catch(err => {
			console.log(err);
			callback(false);
		});
	},
	exists: function(community, callback) {
		db.Community.findOne({name: community}, function(err, org) {
			var exists = org != null;
			if(err) handleError(err);
			callback(exists);
		});
	}
}