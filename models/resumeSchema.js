const mongoose = require('mongoose');

const { Schema } = mongoose;

//-----User model----
const uploadmodel= new Schema({
    file: { type: String, required: true }, // You can adjust the type based on your requirements
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Upload',uploadmodel);
