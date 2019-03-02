var db = require('../db/database');

module.exports = {
	vote: function(user, content, value, res) {
		db.User.findOne(user, function(err, profile) {
			var voted = module.exports.has_voted(profile, content);

			db.User.updateOne(user, profile, function(err) {
				if(err) console.error(err);
			});

			if(voted) {
				var content_id = { _id: content._id };

				// If user liked this for the first time
				db.Content.findOne(content_id, function(err, result) {
					result.num_likes += value;

					db.Content.updateOne(content_id, (new db.Content(result)).toObject(), function(err) {
						if(err) console.error(err);
						else res.status(200).send({ total: result.num_likes - result.num_dislikes });
					});
				});
			}
			else {
				// Only allowed to like an article once
				res.status(200).send({ total: undefined });
			}
		});
	},
	has_voted: function(profile, content) {
		var library = profile.library;
		var index = -1;

		for(var i = 0; i < library.length; i++) {
			if (library[i]._id == content._id && library[i].liked == content.liked) index = i;
		}
	
		if(index == -1) library.push(content);
		else library[index] = content;

		return index == -1;
	}
}