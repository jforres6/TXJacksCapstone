const mongoose = require("mongoose");

var tipoutSchema = new mongoose.Schema({
    ID: Number,
    Date: String,
    TS: Number,
    Total_Tips: Number,
    TCO: Number
});

module.exports = mongoose.model('Tipouts', tipoutSchema, 'Tipouts');