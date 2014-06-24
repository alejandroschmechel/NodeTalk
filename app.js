var colors = require('colors'),
    sanitizer = require('sanitizer'),
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
	var messageDb = {"nickname" : nickname, "message": sanitizer.escape(data), "time": hour+":"+min, "date": date};
	db.messages.save(messageDb, function(err, saved) {
	  if( !err && saved){
	    console.log("new message saved in database");
	  }
	});
	console.log("["+hour+":"+min+"] ".yellow + nickname.blue + " Wrote: ".yellow + sanitizer.escape(data).grey);
	io.emit("newmessage", "["+hour+":"+min+"] " + nickname + " Wrote: " + sanitizer.escape(data));
 });

 client.on('join', function(name) {
	nickname = sanitizer.escape(name);
	console.log("Client ".yellow+name.blue+" Connected".yellow);
	db.users.save({'nickname': nickname, 'date': new Date()}, function(err, saved){
		if( !err && saved){
		    console.log("new user saved in database");
		  }
	})
	db.messages.find(function(err, messages) {
	  if( !err && messages){
	    client.emit("prevmessages", messages);
	  }
	});
	db.users.distinct('nickname', function(err, names){
	  if( !err && names){
	    client.emit("prevusers", names);
	  }
	})
 });

 client.on('messagesloaded', function(name){
 	client.emit('userjoined', name);
 });

 client.on('disconnect', function(data) {
 	if(data == 'transport close'){
 		io.emit("userleft", nickname);
 		console.log("Client ".yellow+nickname.blue+" has left.".yellow);
 	}
 });

});

console.log("\nApplication Started\n".red);