var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conference_schema = new Schema({
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
    conf_reg: {
        food_allergens: {
            type: String,
            trim: true
        }, 
        message: {
            type: String,
            trim: true
        }
    }
});

var conn = mongoose.createConnection('mongodb://localhost:27017/profile', { useNewUrlParser: true });
var Conference = conn.model('conference', conference_schema);

module.exports = Conference;