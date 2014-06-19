var colors = require('colors'),
	express = require('express'),
	socket = require('socket.io'),
	mongo = require('mongodb'),
	http = require('http');
	config = require('./config')
 
var app = express();
var server = app.listen(8080);
var io = require('socket.io').listen(server); 

io.sockets.on("connection", function(client){
 var nickname;
 client.on('message', function (data) {
	var date = new Date();
	var hour = date.getHours();
	var min = date.getMinutes();
	console.log("["+hour+":"+min+"] " + nickname.blue + " Wrote: " + data);
	io.emit("newmessage", "["+hour+":"+min+"] " + nickname + " Wrote: " + data);
 });

 client.on('join', function(name) {
	nickname = name;
	console.log("Client ".yellow+name.blue+" Connected".yellow);
 });

});
 
console.log("\nApplication Started\n".red);