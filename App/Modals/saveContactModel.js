const mongoose = require('mongoose');

// Define the schema for the "aimsandscope" collection
const savecontactSchema = new mongoose.Schema({
    contactDetails: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    keywords: {
        type: [String], // An array of strings
        required: true,
    },
    metatitle: {
        type: String,
        required: true,
    }
});

// Create the AimAndScope model
const Contactinfo = mongoose.model('Contactinfo', savecontactSchema);

module.exports = Contactinfo;