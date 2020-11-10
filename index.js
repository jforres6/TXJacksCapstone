const express = require("express"); 
const bodyParser = require("body-parser"); 

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

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://TJUser1:TexasJackMongoDB@cluster0.b04vt.mongodb.net/TexasJacks?retryWrites=true&w=majority", {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connectionasdf error:'));
 
db.once('open', function() {
  console.log("Successfully connected to MongoDB!");
});