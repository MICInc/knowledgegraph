var db = require('../db/database');

module.exports = {
	format: function(feedback) {
		feedback.date = new Date();
		return feedback;
	},
	save: function(feedback, callback) {
		var conf = new db.Feedback(feedback);

		conf.collection.dropIndexes(function(err, results) {
			if(err) {
				console.log('feedback_handler.js: '+err);
			}
		});

		conf.save()
		.then(item => {
			callback('Saved feedback');
		})
		.catch(err => {
			callback('Error saving feedback');
		});
	}
}