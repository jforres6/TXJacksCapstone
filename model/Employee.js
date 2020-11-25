const mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
    ID: Number,
    f_name: String,
    l_name: String,
    nickname: String,
    def_pos: String,
    active: Boolean,
    cell_num: String,
    hire_date: String,
    email: String
});

module.exports = mongoose.model('EmployeeInformation', employeeSchema, 'EmployeeInformation');