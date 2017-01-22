// grab the things we need
var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose)
var Schema = mongoose.Schema;
var Currency = mongoose.Types.Currency

var promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: { 
        type: String, 
        default: '' 
    },
    label: { 
        type: String, 
        default: '' 
    },
    price: { 
        type: Currency, 
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
var Promotions = mongoose.model('Promotion', promotionSchema);

// make this available to our Node applications
module.exports = Promotions;