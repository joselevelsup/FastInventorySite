var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Firebase = require("firebase");

app.use(express.static(__dirname + '/client')); //Serves the necessary files for the frontend
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.get("*", function(request, respond){
  respond.sendFile(__dirname+'.../client/index.html');
});

app.listen(process.env.PORT || 8080);
console.log("Server Running");
