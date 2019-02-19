var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var community_schema = new Schema({
	advisors: [{ 
		first_name: {
			type: String,
			required: true,
            trim: true
		},
		last_name: {
			type: String,
			required: true,
            trim: true
		},
        email: {
            type: String,
            required: true,
            trim: true
        }
	}],
    affiliation: {
        name: {
            type: String
        },
        contact: {
            email: {
                type: String
            },
            name: {
                type: String
            }
        }
    },
    established: {
        type: Number
    }
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
			},
            email: {
                type: String,
                required: true,
                trim: true
            }
		}],
     	misc: [{
            position: {
                type: String,
                required: true
            },
     		first_name: {
     			type: String
     		},
     		last_name: {
     			type: String
     		},
            email: {
                type: String,
                required: true,
                trim: true
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