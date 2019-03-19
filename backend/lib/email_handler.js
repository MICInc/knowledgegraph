var nodemailer = require('nodemailer');
var cred = require('../config/auth');

module.exports = {
	get_verification_link() {
		return '';
	},
	send: function(from, email, subject, message, html, service='gmail') {
		var transporter = nodemailer.createTransport('SMTP', {
			service: service,
			auth: cred.conf_email
		});

		var options = {
			from: from,
			to: email,
			subject: subject,
			text: message,
			html: html
		};

		transporter.sendMail(options, function(error, info) {
			if(error) console.error(error);
			else console.log('Sent!');
		});
	},
	send_verification(to) {
		// var link = module.exports.get_verification_link();
		var message = 'Test';
		module.exports.send('MIC Conference Committee', to, 'Account verification', message, '');
	}
}