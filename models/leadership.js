// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leadershipSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: { 
        type: String, 
        default: '' 
    },
    designation: { 
        type: String, 
        default: '' 
    },
    abbr: { 
        type: String, 
        default: '' 
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Leaders = mongoose.model('Leadership', leadershipSchema);

// make this available to our Node applications
module.exports = Leaders;