import json

with open('schools.json') as file:
	school = json.load(file)
	print(len(school))
	unique = {}
	clean = []
	# print(school)
	for i in school:
		if i['name'] not in unique:
			unique[i['name']] = 1
			clean.append({"name": i['name']})

	with open('clean.json', 'w') as outfile:
		json.dump(clean, outfile)
