const express = require("express"); 
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./model/User");
const EmployeeModel = require("./model/Employee");
const passport = require("passport");
const tipoutModel = require("./model/tipoutModel");

const app = express();

mongoose.connect("mongodb+srv://TJUser1:TexasJackMongoDB@cluster0.b04vt.mongodb.net/TESTDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride('_method'));
app.use(require("express-session")({ 
    secret: "Texas Jacks Good BBQ", 
    resave: false, 
    saveUninitialized: false
}));

app.set('view engine', 'ejs'); 

app.use(passport.initialize()); 
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

//Open login page
app.get("/", function(req, res){
    res.render("login");
});

//Open register page
app.get("/register", function(req,res){
    res.render("register");
})

app.get("/tipout",function(req,res){
    res.render("tipout");
});

//Open home page and display employees
app.get("/home", isLoggedIn, async function(req, res) {
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

//Open settings page
app.get("/settings",function(req,res){
    res.render("settings");
});

//Logout of web app
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
})

//Process login
app.post("/login", passport.authenticate("local", { 
    successRedirect: "/home", 
    failureRedirect: "/login"
}));

//Process registration
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
            if(err) {
                console.log(err);
                return res.render("register");
            }
            passport.authenticate("local") (req, res, function() {
                res.redirect("/home")
    });
});
});

//Add Employees
app.get("/add", function(req,res){
    res.render("add", { Employees: new EmployeeModel()});
});

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

//Modify employee
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
        res.redirect(`/${Employees.id}`);
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

app.get("/:id/tipout", async function(req, res){
    const Tipout = new tipoutModel({});

    try {
        const Employees = await EmployeeModel.findById(req.params.id);
        res.render("tipout", { Employees: Employees, Tipout: Tipout });
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
        res.redirect(`/${Employees.id}`);
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

//Delete employee
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
            res.redirect(`/${Employees.id}`);
        }
    }
});



//Checks to see if user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function() {
    console.log("Server started on port 3000");
});