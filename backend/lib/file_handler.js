var formidable = require('formidable');
var fs = require('fs-extra');

module.exports = function(req, res, dir, keep_ext=true) {
	var form = new formidable.IncomingForm();
	form.uploadDir = dir;
	form.keepExtensions = keep_ext;

	form.parse(req, function(err, fields, files) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		console.log('uploaded:\n'+Object.keys(files));
	});
}