const express = require("express"); 
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");

const app = express(); 

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://TJUser1:TexasJackMongoDB@cluster0.b04vt.mongodb.net/TESTDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
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

const EmployeeModel = mongoose.model('EmployeeInformation', employeeSchema, 'EmployeeInformation');

app.set('view engine', 'ejs'); 

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("login");
})

app.get("/home", function(req, res) {
    EmployeeModel.find({}, function(err, data){
        res.render("home", { Employee: data});
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
})



