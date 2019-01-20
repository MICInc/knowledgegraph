var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
const snappy = require('snappy');

module.exports = {
	write: function(req, res, dir, keep_ext=true) {
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
			var dst = path.join(path_split.join('/'), fields['content_id'], file.name);
			fs.rename(src, dst, (err) => {
				if (err) console.error(err);
				console.log('saved!!');
			});
		});
	},

	encode_base64: function(file) {
		// return Buffer.from(fs.readFileSync(file)).toString('base64');
		return Buffer.from(file).toString('base64');
	}
}