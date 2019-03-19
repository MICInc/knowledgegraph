var db = require('../db/database');
var utils = require('./utils')

module.exports = {
	vote: function(user, content, res) {
		db.User.findOne(user, function(err, profile) {
			var library = profile.library;
			var index = utils.indexOf(library, '_id', content._id);
			var value = 0;

			// user already voted and now wants to change their vote
			if(index > -1 && library[index].liked != 0) {
				// undo vote else 
				if(library[index].liked == content.liked) {
					value = content.liked == 1 ? -1 : 1;
					content.liked = 0;
				}
				else value = content.liked == 1 ? 2 : -2;
			}
			else value = content.liked;

			// update user's library
			if(index == -1) profile.library.push(content);
			else profile.library[index] = content;

			db.User.updateOne(user, profile, function(err) {
				if(err) console.error(err);
			});

			var content_id = { _id: content._id };

			// If user liked this for the first time
			db.Content.findOne(content_id, function(err, result) {
				result.num_likes += value;

				db.Content.updateOne(content_id, (new db.Content(result)).toObject(), function(err) {
					if(err) console.error(err);
					else res.status(200).send({ total: result.num_likes - result.num_dislikes });
				});
			});

		});
	}
}