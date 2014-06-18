var colors = require('colors'),
	express = require('express'),
	socket = require('socket.io'),
	mongo = require('mongodb'),
	http = require('http');
 
var app = express();
var server = app.listen(8080);
var io = require('socket.io').listen(server); 

io.sockets.on("connection", function(client){
 console.log("\nClient connected!\n".yellow);
});
 
console.log("\nApplication Started\n".red);