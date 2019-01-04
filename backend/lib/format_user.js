var mongoose = require('mongoose');

module.exports = function(req)
{	
	var user = req.body;
	console.log('user: '+JSON.stringify(user));

	return {
		"id": mongoose.Types.ObjectId(),
		"affiliation": user.affiliation.value,
		"bio": "",
		"date_joined": new Date(),
		"dob": user.dob.value,
		"email": user.email.value,
		"ethnicity": user.ethnicity.value,
		"first_name": user.first_name.value,
		"following": [],
		"grade": user.grade.value,
		"gender": user.gender.value,
		"last_name": user.last_name.value,
		"library": [],
		"liked_articles": [],
		"liked_papers": [],
		"password_hash": "default",
		"rank": 0,
		"salt": "salt",
		"school": user.school.value,
		"search_history": [],
		"subjects": [],
		"url": (user.first_name.value+'-'+user.last_name.value).toLowerCase()
	};
}