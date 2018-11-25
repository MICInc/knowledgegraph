var mongoose = require('mongoose');

module.exports = function(req)
{	
	var user = req.body;

	return {
		"id": mongoose.Types.ObjectId(),
		"bio": "",
		"date_joined": new Date(),
		"dob": user.dob,
		"email": user.email,
		"first_name": user.first_name,
		"following": [],
		"gender": user.gender,
		"last_name": user.last_name,
		"library": [],
		"liked_articles": [],
		"liked_papers": [],
		"password_hash": "default",
		"rank": 0,
		"salt": "salt",
		"search_history": [],
		"subjects": [],
		"url": (user.first_name+'-'+user.last_name).toLowerCase()
	};
}