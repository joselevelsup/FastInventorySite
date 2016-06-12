//This is the server for our app to be hosted on. This is the development, the heroku has the up-to-date released website. The client folder contains all the frontend files like javascript and/or css

var express = require("express"); //Requiring the server framework
var app = express(); // Giving it another name to make it easier to call upon
var bodyParser = require("body-parser"); //To parse our data and able to sort it out
var mysql = require('mysql');
var passport = require("passport").Strategy;
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'skipmaster12',
  database : 'fastinventory'
});

db.connect();

app.use(express.static(__dirname + '/client')); //Serves the necessary files for the frontend
app.use(bodyParser.urlencoded({'extended':'true'})); //Telling the site that the data coming in, to be translated to the UTF-8 library
app.use(bodyParser.json()); //Get the data in JSON format

function loggedin(val){
  if(val){
    return true;
  } else{
    return false;
  }
}

//Once the link to the site is typed in the url bar, we serve this page. Angularjs will handle the rest of the routing
app.get("/", function(request, respond){
  respond.sendFile(__dirname+'/client/index.html');
});

app.get("/example", function(request, respond){
  respond.sendFile(__dirname+'/client/Inventory.html');
});

app.get("/login", function(request, respond){
  respond.sendFile(__dirname+'/client/Login.html');
});

app.post('/api/logindata', function(request, respond, next){
  var user = "'"+request.body.email+"'";
  var pass = "'"+request.body.pass+"'";
  db.query("select * from useraccount where username = "+user+" and pass = "+pass+"", function(err, rows, fields){
    if(err){
      console.log(err);
    }
    else{
      console.log("Ok Login");
      return respond.json(rows);
    }
  });
});


app.listen(process.env.PORT || 8080); //Run on any port that is available or the port assigned
console.log("Server Running"); //If successful, this should run in the console
