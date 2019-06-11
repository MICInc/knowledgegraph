const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const credentials = abs_path('config/gmail/noreply/credentials.json');
const TOKEN_PATH = abs_path('config/gmail/noreply/token.json');
var conf = require('../email/conference.json');
var welcome = require('../email/welcome.json');
var pw_reset = require('../email/pw-reset.json');
var utils = require('./utils');

// If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var SCOPES = [
	'https://mail.google.com/',
	'https://www.googleapis.com/auth/gmail.modify',
	'https://www.googleapis.com/auth/gmail.compose',
	'https://www.googleapis.com/auth/gmail.send'
];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

module.exports = {
	welcome: welcome,
	pw: pw_reset,
	conf: conf,
	send: function(from, to, subject, message) {
		// Load client secrets from a local file.
		fs.readFile(credentials, (err, content) => {
			if (err) console.error('Error loading client secret file:', err);
			// Authorize a client with credentials, then call the Gmail API.
			var mail = {
				from: from,
				to: to,
				subject: subject,
				message: message
			}

			module.exports.authorize(JSON.parse(content), mail, module.exports.sendMessage);
		});
	},
	authorize: function(credentials, mail, callback) {
		/**
		* Create an OAuth2 client with the given credentials, and then execute the
		* given callback function.
		* @param {Object} credentials The authorization client credentials.
		* @param {function} callback The callback to call with the authorized client.
		*/

		const {client_secret, client_id, redirect_uris} = credentials.installed;
		const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

		// Check if we have previously stored a token.
		fs.readFile(TOKEN_PATH, (err, token) => {
			if (err) return module.exports.getNewToken(oAuth2Client, callback);
			oAuth2Client.setCredentials(JSON.parse(token));
			callback(oAuth2Client, mail);
		});
	},
	makeBody: function (to, from, subject, message) {
		var str = ["Content-Type: text/html; charset=\"UTF-8\"\n",
			"MIME-Version: 1.0\n",
			"Content-Transfer-Encoding: 7bit\n",
			"to: ", to, "\n",
			"from: ", from, "\n",
			"subject: ", subject, "\n\n",
			message
		].join('');

		var encodedMail = new Buffer.from(str, 'utf8').toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
		return encodedMail;
	},
	sendMessage: function(auth, mail) {
		const gmail = google.gmail({version: 'v1', auth});
		var raw = module.exports.makeBody(mail.from, mail.to, mail.subject, mail.message);

		gmail.users.messages.send({
			auth: auth,
			userId: 'me',
			resource: {
				raw: raw
			}
		}, 
		function(err, response) {
			if(err) console.error(err);
		});
	},
	getNewToken: function(oAuth2Client, callback) {
		/**
		* Get and store new token after prompting for user authorization, and then
		* execute the given callback with the authorized OAuth2 client.
		* @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
		* @param {getEventsCallback} callback The callback for the authorized client.
		*/

		const authUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: SCOPES,
		});

		console.log('Authorize this app by visiting this url:', authUrl);

		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		rl.question('Enter the code from that page here: ', (code) => {
			rl.close();
			oAuth2Client.getToken(code, (err, token) => {
				if (err) return console.error('Error retrieving access token', err);
				
				oAuth2Client.setCredentials(token);

				// Store the token to disk for later program executions
				fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
					if (err) return console.error(err);
					console.log('Token stored to', TOKEN_PATH);
				});

				callback(oAuth2Client);
			});
		});
	}
}