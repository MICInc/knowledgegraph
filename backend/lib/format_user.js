var mongoose = require('mongoose');

module.exports = function(profile)
{	
	return {
		"id": mongoose.Types.ObjectId(),
		"affiliation": profile.affiliation.value,
		"bio": "",
		"date_joined": new Date(),
		"dob": profile.dob.value,
		"email": profile.email.value,
		"ethnicity": profile.ethnicity.value,
		"first_name": profile.first_name.value,
		"following": [],
		"grade": profile.grade.value,
		"gender": profile.gender.value,
		"last_name": profile.last_name.value,
		"library": [],
		"liked_articles": [],
		"liked_papers": [],
		"password_hash": "default",
		"rank": 0,
		"salt": "salt",
		"school": profile.school.value,
		"search_history": [],
		"subjects": [],
		"url": (profile.first_name.value+'-'+profile.last_name.value).toLowerCase()
	};
}