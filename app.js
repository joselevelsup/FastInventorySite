//This is the server for our app to be hosted on. This is the development, the heroku has the up-to-date released website. The client folder contains all the frontend files like javascript and/or css

var express = require("express"); //Requiring the server framework
var app = express(); // Giving it another name to make it easier to call upon
var bodyParser = require("body-parser"); //To parse our data and able to sort it out
var firebase = require("firebase"); //Call upon our database framework

//Initialize the database with this website
firebase.initializeApp({
  serviceAccount: "fastinventory-d4a84b88f0b2.json",
 databaseURL: "https://fastinventory-abfd1.firebaseio.com"
});
var db = firebase.database().ref(); //Set it into a variable to make it easier to call upon

app.use(express.static(__dirname + '/client')); //Serves the necessary files for the frontend
app.use(bodyParser.urlencoded({'extended':'true'})); //Telling the site that the data coming in, to be translated to the UTF-8 library
app.use(bodyParser.json()); //Get the data in JSON format

//Once the link to the site is typed in the url bar, we serve this page. Angularjs will handle the rest of the routing
app.get("*", function(request, respond){
  respond.sendFile(__dirname+'/client/index.html');
});

app.listen(process.env.PORT || 8080); //Run on any port that is available or the port assigned
console.log("Server Running"); //If successful, this should run in the console
