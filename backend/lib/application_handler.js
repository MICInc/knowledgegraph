var db = require('../db/database');

module.exports = {
	save: function(user_id, application, callback) {
		var conf = new db.Conference(application);

		conf.collection.dropIndexes(function(err, results) {
			if(err) {
				console.log('conferece.js: '+err);
			}
		});

		conf.save()
		.then(item => {
			callback('Saved conf application');
		})
		.catch(err => {
			console.log(err);
			callback('Could not save application');
		});
	}
}