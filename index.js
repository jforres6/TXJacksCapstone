const express = require("express"); 
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const app = express(); 



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

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride('_method'));


app.get("/", function(req, res){
    res.render("login");
});

//Display Employees
app.get("/home", async function(req, res) {
    if (req.query.empID != null && req.query.empID !== ""){
        const Employee = await EmployeeModel.find({ID: req.query.empID})
        res.render("home", { Employees: Employee});
    } else if ((req.query.firstName != null && req.query.firstName !== "") && (req.query.lastName != null && req.query.lastName !== "")) {
        const Employee = await EmployeeModel.find({f_name: req.query.firstName, l_name: req.query.lastName})
        res.render("home", { Employees: Employee});
    } else{
        const Employee = await EmployeeModel.find()
        res.render("home", { Employees: Employee});
    }
    
});

//New Employees
app.get("/add", function(req,res){
    res.render("add", { Employees: new EmployeeModel()});
});

//Add Employees
app.post("/home", async function(req, res){
    const Employees = new EmployeeModel({
        ID: req.body.empID,
        f_name: req.body.firstName,
        l_name: req.body.lastName,
        nickname: req.body.nickname,
        def_pos: req.body.def_pos,
        active: req.body.active,
        cell_num: req.body.cell_num,
        hire_date: req.body.hire_date,
        email: req.body.email
    });
    try{
        const newEmployee = await Employees.save();
        res.redirect(`/${newEmployee.id}`);
    } catch {
            res.render("add", {
                Employees: Employees,
                errorMessage: "Error Creating Employee"
        
            });
    }
});

//Employee Profile
app.get("/:id", async function(req, res) {
    try {
    const Employees = await EmployeeModel.findById(req.params.id);
        res.render("profile", { Employees: Employees});
    }catch (err){
        console.log(err);
    }
});

//Modify Employee
app.get("/:id/modify", async function(req, res){
    try {
        const Employees = await EmployeeModel.findById(req.params.id);
        res.render("modify", { Employees: Employees });
    } catch {
        console.log(err);
    }
});


app.put("/:id", async function(req, res){
    let Employees;

    try {
        Employees = await EmployeeModel.findById(req.params.id);

        Employees.ID = req.body.empID;
        Employees.f_name = req.body.firstName;
        Employees.l_name = req.body.lastName;
        Employees.nickname = req.body.nickname;
        Employees.def_pos = req.body.def_pos;
        Employees.active = req.body.active;
        Employees.cell_num = req.body.cell_num;
        Employees.hire_date = req.body.hire_date;
        Employees.email = req.body.email;

        await Employees.save();
        res.redirect("/${Employees.id}");
    } catch {
        if (Employees == null) {
            res.redirect("home");
        }
        else {
            res.render("modify", {
                Employees: Employees,
                errorMessage: "Error Modifying Employee"
            });
        }
    }
});

app.delete("/:id", async function(req, res){
    let Employees
    try {
        Employees = await EmployeeModel.findById(req.params.id)
        await Employees.remove()
        res.redirect("home")
    } catch {
        if (Employees == null) {
            res.redirect("home");
        }
        else {
            res.redirect("/${Employees.id}");
        }
    }
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
})