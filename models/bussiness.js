let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');


//creating model class for patient login
let bussinessModel = mongoose.Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'name is required'
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
        collection: "examination"
    });

//configure options for Preliminary examination model

let options = ({ missingPasswordError: 'Wrong / Missing Password' });
bussinessModel.plugin(passportLocalMongoose, options);
module.exports.bussinessModel = mongoose.model('bussinessModel', bussinessModel);

