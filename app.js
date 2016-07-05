//This is the server for our app to be hosted on. This is the development, the heroku has the up-to-date released website. The client folder contains all the frontend files like javascript and/or css

var express = require("express"); //Requiring the server framework
var app = express(); // Giving it another name to make it easier to call upon
var session = require("express-session");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser"); //To parse our data and able to sort it out
var passport = require("passport");

app.use(express.static(__dirname + '/client')); //Serves the necessary files for the frontend
app.use(bodyParser.urlencoded({extended: true})); //Telling the site that the data coming in, to be translated to the UTF-8 library
app.use(bodyParser.json()); //Get the data in JSON format
app.use(session({
	secret: 'itsASecret',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize()); 
app.use(passport.session());
app.set('view engine', 'ejs');

require("./config/auth")(passport);

require("./config/routes")(app, passport);

app.listen(process.env.PORT || 8080); //Run on any port that is available or the port assigned
console.log("Server Running"); //If successful, this should run in the console

module.exports = app;
