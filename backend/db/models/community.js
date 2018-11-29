var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var community_schema = new Schema({
	advisors: [{ 
		first_name: {
			type: String,
			required: true
		},
		last_name: {
			type: String,
			required: true
		}
	}],
	execs: {
		core: [{
			position: {
				type: String,
				required: true
			},
			first_name: {
				type: String,
				required: true
			},
			last_name: {
				type: String,
				required: true
			}
		}],
     	misc: [{
     		first_name: {
     			type: String
     		},
     		last_name: {
     			type: String
     		}
     	}]
    },
    funding: [{
    	amount: {
    		type: Number
    	},
    	frequency: {
    		type: String
    	}, 
    	src: {
    		type: String
    	}
    }],
    members: [{
    	first_name: {
    		type: String,
    		required: true
    	},
    	last_name: {
    		type: String,
    		required: true
    	}
    }],
    name: {
    	type: String
    },
    school: {
    	type: String,
    	required: true
    } 
});

var conn = mongoose.createConnection('mongodb://localhost:27017/profile', { useNewUrlParser: true });
var Community = conn.model('community', community_schema);

module.exports = Community;