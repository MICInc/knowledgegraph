var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

module.exports = function(req, res, dir, keep_ext=true) {
	var form = new formidable.IncomingForm();
	form.uploadDir = dir;
	form.keepExtensions = keep_ext;

	form.parse(req, function(err, fields, files) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		file_id = Object.keys(files)[0];
		var file = files[file_id];
		var src = file.path;
		var path_split = src.split('/');
		path_split.pop();

		fs.rename(src, path.join(path_split.join('/'), fields['content_id'], file.name), (err) => {
			if (err) console.error(err);
			console.log('saved!!');
		});
	});
}