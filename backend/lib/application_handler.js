var db = require('../db/database');

module.exports = {
	is_function: function(value) {
		return value && {}.toString.call(value) === '[object Function]';
	},
	save: function(application, callback) {
		application.conf_resp.date = new Date();
		var conf = new db.Conference(application);

		conf.collection.dropIndexes(function(err, results) {
			if(err) {
				console.log('application_handler.js: '+err);
			}
		});

		conf.save()
		.then(item => {
			callback({ status: true });
		})
		.catch(err => {
			console.log(err);
			callback({ status: false, error: 'Internal error'});
		});
	},

	/*
		API for admin console to view conference registrations
	*/
	flatten_demographic_and_resp: function(applications) {
		var flat_apps = [];
		var blacklist = ['$init'];

		for(var i=0; i < applications.length; i++) {
			var app = {};

			delete applications[i].demographic['$init'];
			delete applications[i].conf_resp['$init'];

			for(var key in applications[i].demographic) {
				if(key in blacklist) break;

				var value = applications[i].demographic[key];
				if(!module.exports.is_function(value)) {
					app[key] = value;
				}
			}

			for(var key in applications[i].conf_resp) {
				if(key in blacklist) break;

				var value = applications[i].conf_resp[key];
				if(!module.exports.is_function(value)) {
					app[key] = value;
				}
			}
			flat_apps.push(app);
		}

		return flat_apps;
	}
}