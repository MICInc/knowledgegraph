var db = require('../db/database');

module.exports = {
	create: function(community, callback) {
		if(community.name.length > 0) {
			community.url = community.name.replace(/ /g, '-').toLowerCase();
		}
		else if(community.affiliation.name.length > 0) {
			community.url = community.affiliation.name.replace(/ /g, '-').toLowerCase()
		}

		var community = new db.Community(community);
		community.collection.dropIndexes(function(err, results) {
			if(err) console.log('community.js: '+err);
		});

		community.save()
		.then(item => {
			console.log('Saved community');
			callback(200);
		})
		.catch(err => {
			console.log(err);
			callback(400);
		});
	},
	exists: function(community, callback) {
		module.exports.find(community, function(org) {
			callback(org != null);
		});
	},
	find: function(community, callback) {
		db.Community.findOne({ name: community }, function(err, org) {
			if(err) console.error(err);
			console.log(org);
			callback(org);
		});
	},
	get_all: function(query, callback) {
		db.Community.find(query, function(err, results) {
			callback(results);
		});
	}
}