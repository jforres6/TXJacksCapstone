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


var mongoose = require('mongoose'), Admin = mongoose.mongo.Admin;
var connection = mongoose.createConnection("mongodb+srv://TJUser1:TexasJackMongoDB@cluster0.b04vt.mongodb.net/TexasJacks?retryWrites=true&w=majority");
connection.on('open', function() {
    // connection established
    new Admin(connection.db).listDatabases(function(err, result) {
        console.log('listDatabases succeeded');
        // database list stored in result.databases
        console.log(result.databases);    
    });
});



