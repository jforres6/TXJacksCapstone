const mongoose = require("mongoose");

var tipoutSchema = new mongoose.Schema({
    empID: String,
    Date: String,
    TS: Number,
    TS_Waiter: Number,
    TS_Bar: Number,
    Total_Tips: Number,
    TCO: Number,
    TCO_Waiter: Number,
    TCO_Bar: Number,
    Cash_Auto_Grat: Number,
    ACO: Number,
    Collect_Money: String,
    Collected_Money: Number,
    TO_Rate: Number,
    TO_Waiter: Number,
    TO_Bar: Number,
})

module.exports = mongoose.model('Tipout', employeeSchema, 'Tipout');