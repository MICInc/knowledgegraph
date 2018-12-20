var mongoose = require('mongoose');

module.exports = function(req)
{	
	var user = req.body;
	var dob = user.dob || new Date(user.dob_year, user.dob_month, user.dob_day);
	return {
		"id": mongoose.Types.ObjectId(),
		"affiliation": user.affiliation,
		"bio": "",
		"date_joined": new Date(),
		"dob": dob,
		"email": user.email,
		"ethnicity": user.ethnicity,
		"first_name": user.first_name,
		"following": [],
		"grade": user.grade,
		"gender": user.gender,
		"last_name": user.last_name,
		"library": [],
		"liked_articles": [],
		"liked_papers": [],
		"password_hash": "default",
		"rank": 0,
		"salt": "salt",
		"school": user.school,
		"search_history": [],
		"subjects": [],
		"url": (user.first_name+'-'+user.last_name).toLowerCase()
	};
}