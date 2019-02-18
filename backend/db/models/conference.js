var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conference_schema = new Schema({
    demographic: {
        dob: {
            type: Date,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        ethnicity: {
            type: String,
            required: true,
            trim: true
        },
        first_name: {
            type: String,
            required: true,
            trim: true
        },
        gender: {
            type: String,
            required: true,
            trim: true
        },
        grade: {
            type: String,
            required: true,
            trim: true
        },
        last_name: {
            type: String,
            required: true,
            trim: true
        },
        school: {
            type: String,
            required: true,
            trim: true
        }
    },
    reimbursements: { 
        address: {
            apt: {
                type: String,
                trim: true
            },
            city: {
                type: String,
                trim: true
            },
            state: {
                type: String,
                trim: true
            },
            street: {
                type: String,
                trim: true
            },
            zip: {
                type: String,
                trim: true
            }
        },
        travel: [{
            amount: {
                type: Number
            },
            date: {
                type: Date
            },
            dst: {
                type: String,
                trim: true
            },
            src: {
                type: String,
                trim: true
            }
        }],
        hotel: [{
            amount: {
                type: Number
            },
            check_in: {
                type: Date
            },
            check_out: {
                type: Date
            },
            name: {
                type: String,
                trim: true
            }
        }],
        misc: [{
            amount: {
                type: Number
            },
            item: {
                type: String,
                trim: true
            }
        }],
        total: {
            type: Number
        }
    },
    conf_resp: {
        date: {
            type: Date,
            required: true
        },
        food_allergens: {
            type: String,
            trim: true
        }, 
        q1: {
            type: String,
            trim: true
        },
        q2: {
            type: String,
            trim: true
        },
        q3: {
            type: String,
            trim: true
        }
    }
});

var conn = mongoose.createConnection('mongodb://localhost:27017/profile', { useNewUrlParser: true });
var Conference = conn.model('conference', conference_schema);

module.exports = Conference;