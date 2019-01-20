var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

module.exports = {
	write: function(req, res, dir, callback, keep_ext=true) {
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

			// save image file to disk
			fs.rename(src, path.join(path_split.join('/'), fields['content_id'], file.name), (err) => {
				if (err) console.error(err);
				console.log('saved!!');
			});

			// return image base64 data for <img> src on GET req
			if(file.type.split('/')[0] == 'image') {
				var image = `'data:${file.type};base64,${module.exports.encode_base64(file.path)}'`;
				callback({content_id: fields['content_id'], image: image});
			}
		});
	},

	encode_base64: function(file) {
		return Buffer.from(fs.readFileSync(file)).toString('base64');
	}
}