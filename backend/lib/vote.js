var db = require('../db/database');
var utils = require('./utils')

module.exports = {
	vote: function(user, ballot, res) {
		db.User.findOne({ _id: user }, function(err, profile) {
			if(err) {
				console.error(err);
				return;
			}

			var library = profile.library;
			var index = utils.indexOf(library, '_id', ballot._id);
			var value = 0;

			// user already voted
			if(index != -1) {
				// un-vote else switch vote
				if(library[index].liked == ballot.liked) {
					value = ballot.liked == 1 ? -1 : 1;
					ballot.liked = 0;
					profile.library.splice(index, 1);
				}
				else {
					value = ballot.liked == 1 ? 2 : -2;
					profile.library[index] = ballot;
				}
			}
			else {
				value = ballot.liked;
				profile.library.push(ballot);
			}

			db.User.updateOne({ _id: user }, profile, function(err) {
				if(err) console.error(err);
			});

			var ballot_id = { _id: ballot._id };

			// If user liked this for the first time
			db.Content.findOne(ballot_id, function(err, result) {
				if(err) console.error(err);
				
				result.num_likes += value;

				db.Content.updateOne(ballot_id, (new db.Content(result)).toObject(), function(err) {
					if(err) console.error(err);
					else res.status(200).send({ total: result.num_likes - result.num_dislikes });
				});
			});

		});
	}
}