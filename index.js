const express = require("express"); 
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");

const app = express(); 

app.set('view engine', 'ejs'); 

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("login");
})

app.get("/home", function(req, res){
    res.render("home")
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
})


mongoose.connect("mongodb+srv://TJUser1:TexasJackMongoDB@cluster0.b04vt.mongodb.net/TESTDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

var Schema = mongoose.Schema;

var employeeSchema = new Schema({
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

mongoose.model('EmployeeInformation', employeeSchema, 'EmployeeInformation');

  app.get('/EmployeeInformation', function(req, res) {
      mongoose.model('EmployeeInformation').find({ID: { $gt : 0, $lt : 11}}, function(err, EmployeeInformation) {
          res.send(EmployeeInformation);
      });
  });

  var EmployeeInformation = mongoose.model('EmployeeInformation', employeeSchema)
  EmployeeInformation.find({f_name: 'Ryan'}, {'l_name def_pos':1, '_id':0}, (error, data) => {
      if(error){
          console.log(error)
      } else{
          console.log(data)
      }
  })