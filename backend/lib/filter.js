var xss = require('xss');
var options = {
	whiteList: {
		a: ['b', 'i', 'u', 'img', 'a']
	}
};
var filter = new xss.FilterXSS(options);

module.exports = {
	alphanumeric(str) {
		return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
	},
	filter_xss: function(str) {
		return str;
		// return filter.process(str);
	},
	is_valid: function(str) {
		if(!str.match(/^[a-zA-Z0-9\-\/%]+$/)) return null;
		return str;
	},
	remove_tags(str) {
		return str.replace(/(<([^>]+)>)/ig,"");
	}
}
