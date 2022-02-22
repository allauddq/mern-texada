const mongoose = require('mongoose');
const moment = require('moment');

// Schema
let isoDate = new Date().toISOString().replace('Z', '0');
let i = isoDate.lastIndexOf('.');
let customDate = isoDate.substring(0, i) + '-' + isoDate.substring(i + 1);

let productSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    datetime: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    elevation: {
        type: Number,
        required: true
    }
});
module.exports = Product = mongoose.model('product', productSchema);