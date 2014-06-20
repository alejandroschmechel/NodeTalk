var colors = require('colors'),
	express = require('express'),
	config = require('./config'),
	socket = require('socket.io'),
	http = require('http'),
	db = require('./db'),
	fs = require('fs');
 
var app = express();
var server = app.listen(8000);
var io = require('socket.io').listen(server); 

io.sockets.on("connection", function(client){
 var nickname;
 client.on('message', function (data) {
	var date = new Date();
	var hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();;
	var min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();;
	var messageDb = {"nickname" : nickname, "message": data, "time": hour+":"+min, "date": date};
	db.messages.save(messageDb, function(err, saved) {
	  if( !err && saved){
	    console.log("nem message saved in database");
	  }
	});
	console.log("["+hour+":"+min+"] ".yellow + nickname.blue + " Wrote: ".yellow + data.grey);
	io.emit("newmessage", "["+hour+":"+min+"] " + nickname + " Wrote: " + data);
 });

 client.on('join', function(name) {
	nickname = name;
	console.log("Client ".yellow+name.blue+" Connected".yellow);
	db.messages.find(function(err, messages) {
	  if( !err && messages){
	    io.emit("prevmessages", messages);
	  }
	});
 });

});

console.log("\nApplication Started\n".red);