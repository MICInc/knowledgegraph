var db = require('../db/database');

module.exports = {
	vote: function(user, content, value, res) {
		db.User.findOne(user, function(err, profile) {
			var voted = module.exports.is_valid(user, profile, content);
			console.log(voted)

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
	is_valid: function(user, profile, content) {
		var library = profile.library;
		var index = -1;

		for(var i = 0; i < library.length; i++) {
			if (library[i]._id == content._id) index = i;
		}

		var change_vote = (index > -1 && library[index].liked != content.liked);
		var hasnt_voted = index == -1;
	
		if(index == -1) profile.library.push(content);
		else profile.library[index] = content;

		db.User.updateOne(user, profile, function(err) {
			if(err) console.error(err);
		});

		return change_vote || hasnt_voted;
	}
}