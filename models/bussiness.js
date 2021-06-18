let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

//creating model class for patient login
let businessModel = mongoose.Schema({
    name: {
        type: String,
        default: '',
        trim: true,
    },
    title: {
        type: String,
        default: '',
        trim: true,
    },
    email: {
        type: String,
        default: '',
        trim: true, ndex: true, unique: true, sparse: true,
    },
    contact_number: {
        type: String,
        default: '',
        trim: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
},
    {
        collection: "business_contact"
    });

module.exports.businessModel = mongoose.model('businessModel', businessModel);

