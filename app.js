var colors = require('colors'),
	express = require('express'),
	config = require('./config'),
	socket = require('socket.io'),
	mongo = require('mongodb'),
	http = require('http');
	Log = require('log'),
	fs = require('fs');
 
var app = express();
var server = app.listen(8000);
var log = new Log('info', fs.createWriteStream('nodechat.log'));
var io = require('socket.io').listen(server); 

io.sockets.on("connection", function(client){
 var nickname;
 client.on('message', function (data) {
	var date = new Date();
	var hour = date.getHours();
	var min = date.getMinutes();
	console.log("["+hour+":"+min+"] ".yellow + nickname.blue + " Wrote: ".yellow + data.grey);
	log.info(nickname + " Wrote: " + data);
	io.emit("newmessage", "["+hour+":"+min+"] " + nickname + " Wrote: " + data);
 });

 client.on('join', function(name) {
	nickname = name;
	console.log("Client ".yellow+name.blue+" Connected".yellow);
	log.info("Client "+name+" Connected");
 });

});
 
console.log("\nApplication Started\n".red);